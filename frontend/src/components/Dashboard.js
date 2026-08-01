import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to fetch user's workspaces
      // For now, we'll use mock data
      const mockWorkspaces = [
        { id: 'ws1', name: 'Project Alpha', updatedAt: '2023-06-15T10:30:00Z' },
        { id: 'ws2', name: 'Website Redesign', updatedAt: '2023-06-14T15:45:00Z' },
        { id: 'ws3', name: 'Mobile App', updatedAt: '2023-06-13T09:15:00Z' }
      ];
      setWorkspaces(mockWorkspaces);
      setLoading(false);
    } catch (err) {
      setError('Failed to load workspaces');
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      // In a real app, this would be an API call
      const newWorkspace = {
        id: `ws${Date.now()}`,
        name: `New Workspace ${workspaces.length + 1}`,
        updatedAt: new Date().toISOString()
      };
      setWorkspaces([...workspaces, newWorkspace]);
    } catch (err) {
      setError('Failed to create workspace');
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      // In a real app, this would be an API call
      setWorkspaces(workspaces.filter(ws => ws.id !== workspaceId));
    } catch (err) {
      setError('Failed to delete workspace');
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <div className="dashboard-actions">
          <Link to="/workspace/create" className="btn-primary">
            Create New Workspace
          </Link>
          <button onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav>
            <h2>Workspaces</h2>
            <ul className="workspace-list">
              {workspaces.map(workspace => (
                <li key={workspace.id} className="workspace-item">
                  <Link to={`/workspace/${workspace.id}`} className="workspace-link">
                    <span className="workspace-name">{workspace.name}</span>
                    <span className="workspace-date">
                      {new Date(workspace.updatedAt).toLocaleDateString()}
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDeleteWorkspace(workspace.id)}
                    className="btn-delete"
                    title="Delete workspace"
                  >
                    ×
                  </button>
                </li>
              ))}
              {workspaces.length === 0 && (
                <li className="workspace-item empty">
                  You haven't created any workspaces yet.
                </li>
              )}
            </ul>
          </nav>
        </aside>

        <main className="dashboard-main">
          <h2>Your Workspaces</h2>
          <p className="dashboard-description">
            Collaborative coding environment with real-time collaboration, video chat, and shared terminals.
          </p>

          <div className="workspace-grid">
            {workspaces.map(workspace => (
              <div key={workspace.id} className="workspace-card">
                <div className="workspace-card-header">
                  <h3>{workspace.name}</h3>
                  <button
                    onClick={() => handleDeleteWorkspace(workspace.id)}
                    className="btn-delete-sm"
                    title="Delete workspace"
                  >
                    ×
                  </button>
                </div>
                <div className="workspace-card-body">
                  <p className="workspace-description">
                    Collaborate with your team in real-time.
                  </p>
                  <div className="workspace-card-footer">
                    <span className="workspace-updated">
                      Last updated: {new Date(workspace.updatedAt).toLocaleString()}
                    </span>
                    <Link
                      to={`/workspace/${workspace.id}`}
                      className="btn-primary-sm"
                    >
                      Open Workspace
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {workspaces.length === 0 && (
              <div className="workspace-empty">
                <h3>No workspaces yet</h3>
                <p>Create your first workspace to start collaborating.</p>
                <Link to="/workspace/create" className="btn-primary">
                  Create First Workspace
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;