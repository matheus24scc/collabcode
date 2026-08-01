# CollabCode: Real-time Pair Programming Platform

A browser-based IDE enabling developers to collaboratively write, debug, and deploy code with integrated video chat and terminal sharing.

## Tech Stack

- **Frontend**: React + Monaco Editor + WebRTC
- **Backend**: Node.js (NestJS) + WebSocket (Socket.io)
- **Database**: PostgreSQL + Redis
- **Auth**: JWT + OAuth2 (GitHub/Google)
- **Deployment**: Docker + Kubernetes (AWS EKS) + CI/CD (GitHub Actions)

## Key Features

- Real-time collaborative code editing with operational transforms
- Integrated video/audio chat using WebRTC
- Shared terminal with Docker container isolation
- GitHub integration for repo import and PR creation
- Deployment to preview environments with one-click
- User presence indicators and cursor tracking
- Session persistence and replay functionality

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- kubectl and access to a Kubernetes cluster (or use kind/minikube for local)
- PostgreSQL and Redis (can be run via Docker)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd collabcode-real-time-pair-programming-platform
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables
   Create a `.env` file in the backend directory based on `.env.example`.

5. Start the services
   ```bash
   # Start PostgreSQL and Redis via Docker Compose
   docker-compose up -d

   # Start the backend
   npm run start:dev

   # Start the frontend
   npm start
   ```

### Deployment

The application is designed to be deployed on AWS EKS using Docker containers and GitHub Actions for CI/CD.

See the `deployment/` directory for Kubernetes manifests and CI/CD workflow details.

## License

This project is licensed under the MIT License.

