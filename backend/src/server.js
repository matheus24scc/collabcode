const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collabcode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CollabCode API is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a room (room represents a workspace/project)
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.userId = userId;
    socket.roomId = roomId;

    // Notify others in the room that a user joined
    socket.to(roomId).emit('user-joined', { userId, userName: `User-${userId.substring(0, 5)}` });

    // Send confirmation to the user
    socket.emit('joined-room', { roomId, userId });
  });

  // Leave a room
  socket.on('leave-room', (roomId) => {
    if (socket.roomId) {
      socket.leave(socket.roomId);
      socket.to(socket.roomId).emit('user-left', { userId: socket.userId });
      socket.roomId = null;
      socket.userId = null;
    }
  });

  // Handle code changes
  socket.on('code-change', (data) => {
    // Broadcast to others in the same room
    socket.to(data.roomId).emit('code-update', {
      userId: socket.userId,
      changes: data.changes,
      timestamp: Date.now()
    });
  });

  // Handle cursor movements
  socket.on('cursor-move', (data) => {
    socket.to(data.roomId).emit('cursor-update', {
      userId: socket.userId,
      position: data.position,
      timestamp: Date.now()
    });
  });

  // Handle user typing indicators
  socket.on('typing-start', (data) => {
    socket.to(data.roomId).emit('user-typing', { userId: socket.userId, isTyping: true });
  });

  socket.on('typing-stop', (data) => {
    socket.to(data.roomId).emit('user-typing', { userId: socket.userId, isTyping: false });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (socket.roomId && socket.userId) {
      socket.to(socket.roomId).emit('user-left', { userId: socket.userId });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };