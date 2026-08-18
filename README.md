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


## Status (checkup 2026-08-18)
> Revisado na campanha de repo-checkup. Relatorio completo: `~/repo-checkup/reports/collabcode.md` (local do mantenedor, nao no repo).
- **Build/Install**: PASS — backend `npm ci` (457 pacotes, 0 vulns; `package-lock.json` adicionado no checkup); frontend `npm ci` (1525 pacotes) + `npm run build` "Compiled successfully".
- **Smoke test**: N/A — nenhum arquivo de teste; `npm test` retorna "No tests found" (backend jest + frontend CRA).
- **Para rodar de ponta-a-ponta precisa de**: PostgreSQL via `docker-compose.yml` (senha default de dev `collabcode_pass`) — não requerido para os checks de build/install Node; presente para runtime opcional. Nenhum outro serviço externo obrigatório citado no checkup.
- **Inconsistencias conhecidas (README vs codigo)**: nenhuma (README não citado com inconsistência; há 4 arquivos `.ts` órfãos NestJS no backend, não compilados — dead code).
- **Seguranca**: backend 0 vulns; frontend 30 vulns (14 high, 7 moderate, 9 low) transitivas de `react-scripts@5.0.1` (ex.: `@tootallnate/once`, `nth-check`, `postcss`, `uuid`); único fix é `npm audit fix --force` (`react-scripts@0.0.0`, breaking) → NÃO aplicado (decisão humana). Secret scan: nenhum segredo real.
- **Estado resumido**: build verde (frontend CRA compila; backend instala), mas 30 vulns no frontend (14 high) exigem ação humana (breaking) e há zero testes + dead code `.ts` órfão no backend; Docker/PostgreSQL opcional para runtime.
