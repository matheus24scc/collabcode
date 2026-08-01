import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocketContext } from '../context/SocketContext';

const Workspace = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const [editorContent, setEditorContent] = useState('// Welcome to CollabCode\\n// Start coding here...\\n\\nfunction hello() {\\n  console.log(\"Hello, World!\");\\n}\\n');
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Join the workspace room
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (socket && workspaceId) {
      socket.emit('join-room', { roomId: workspaceId, userId: user.id });
      socket.on('user-joined', (userData) => {
        setUsers(prev => [...prev, userData]);
      });
      socket.on('user-left', (userData) => {
        setUsers(prev => prev.filter(user => user.userId !== userData.userId));
      });
      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));
    }

    // Load initial code (in a real app, this would come from API)
    const loadInitialCode = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // For demo, we'll use default content
        setEditorContent('// Welcome to CollabCode\\n// Start coding here...\\n\\nfunction hello() {\\n  console.log(\"Hello, World!\");\\n}\\n');
        setLoading(false);
      } catch (error) {
        console.error('Failed to load workspace:', error);
        setLoading(false);
      }
    };

    loadInitialCode();

    // Cleanup
    return () => {
      if (socket && workspaceId) {
        socket.emit('leave-room', { roomId: workspaceId });
      }
    };
  }, [socket, workspaceId]);

  const handleLeaveWorkspace = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="workspace-loading">
        <div className="spinner"></div>
        <p>Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="workspace-container">
      <header className="workspace-header">
        <div className="workspace-header-left">
          <button onClick={() => navigate('/dashboard')} className="btn-outline">
            ← Back to Dashboard
          </button>
          <h1>Workspace: {workspaceId}</h1>
        </div>
        <div className="workspace-header-right">
          <div className="user-presence">
            <span className={`presence-indicator ${isConnected ? 'online' : 'offline'}`}></span>
            <span>Connected ({users.length} others)</span>
          </div>
          <button onClick={handleLeaveWorkspace} className="btn-danger">
            Leave Workspace
          </button>
        </div>
      </header>

      <div className="workspace-main">
        {/* Sidebar */}
        <aside className="workspace-sidebar">
          <div className="sidebar-section">
            <h3>Files</h3>
            <ul className="file-tree">
              <li className="file-item">
                <span className="file-icon">📄</span>
                <span className="file-name">main.js</span>
              </li>
              <li className="file-item">
                <span className="file-icon">📄</span>
                <span className="file-name">styles.css</span>
              </li>
              <li className="file-item">
                <span className="file-icon">📄</span>
                <span className="file-name">index.html</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Collaborators</h3>
            <div className="collaborators-list">
              {users.map(user => (
                <div key={user.userId} className="collaborator-item">
                  <div className="collaborator-avatar">
                    <span className={`presence-indicator ${user.isTyping ? 'typing' : 'online'}`}></span>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`}
                      alt={user.name}
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=User&background=random';
                      }}
                    />
                  </div>
                  <div className="collaborator-info">
                    <span className="collaborator-name">{user.name || `User-${user.userId.substring(0, 5)}`}</span>
                    {user.isTyping && <span className="typing-indicator">typing...</span>}
                  </div>
                </div>
              ))}
              {/* Current user */}
              <div className="collaborator-item current-user">
                <div className="collaborator-avatar">
                  <span className="presence-indicator online"></span>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent((JSON.parse(localStorage.getItem('user') || {}).name || 'You'))}&background=random`}
                    alt="You"
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=You&background=random';
                    }}
                  />
                </div>
                <div className="collaborator-info">
                  <span className="collaborator-name">You</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Editor Area */}
        <div className="workspace-editor">
          <div className="editor-toolbar">
            <div className="editor-tabs">
              <button className="editor-tab active">main.js</button>
              <button className="editor-tab">styles.css</button>
              <button className="editor-tab">index.html</button>
            </div>

            <div className="editor-actions">
              <button className="btn-icon" title="Undo">
                ↶
              </button>
              <button className="btn-icon" title="Redo">
                ↷
              </button>
              <button className="btn-icon" title="Run">
                ▶
              </button>
              <button className="btn-icon" title="Share">
                ⤢
              </button>
            </div>
          </div>

          {/* In a real app, this would be the Monaco Editor */}
          <div className="monaco-container">
            <div className="editor-placeholder"
                 onClick={() => alert('Monaco Editor would be integrated here in a full implementation')}>
              <div className="editor-placeholder-icon">💻</div>
              <h3>Monaco Editor</h3>
              <p>The actual code editor would be integrated here using Monaco Editor (the same editor that powers VS Code)</p>
              <p>Features would include:</p>
              <ul>
                <li>Syntax highlighting</li>
                <li>Code completion</li>
                <li>Error detection</li>
                <li>Multiple cursors for collaborative editing</li>
              </ul>
            </div>
          </div>

          <div class="panel="0;">
          <h3>Terminal</h3on class="ter
          <div className="editor-status-bar">
            <div className="editor-info">
              <span>Spaces: 4aces</span>
              <span>|</span>
              <span>Ln 1, Col 1</span>
            </div>
            <div className="editor-mode">
              JavaScript
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="workspace-panel">
          <div className="panel-tabs">
            <button className="panel-tab active">Chat</button>
            <button className="panel-tab">Activity</button>
          </div>

          <div className="panel-content">
            <div className="chat-messages">
              {/* Chat messages would go here */}
              <div className="chat-message system">
                Welcome to the workspace chat!
              </div>
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Send message logic would go here
                    console.log('Message sent:', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button onClick={() => console.log('Send clicked')}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;