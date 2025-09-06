
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ScoreCard from '../components/dashboard/ScoreCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import TeamSummary from '../components/dashboard/TeamSummary';
import WeeklyComparison from '../components/dashboard/WeeklyComparison';
import SynchronousTab from '../components/tabs/SynchronousTab';
import VertexTab from '../components/tabs/VertexTab';
import SuggestionsTab from '../components/tabs/SuggestionsTab';
import AboutTab from '../components/tabs/AboutTab';
import Chatbot from '../components/Chatbot';
import api from '../api';

const Index = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); 
  const [formUser, setFormUser] = useState('');
  const [formPass, setFormPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8000/api/performance/scorecard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/signup';
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formUser, password: formPass })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (authMode === 'login') {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('username', data.username);
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        alert('Signup successful! Please login.');
        setAuthMode('login');
      }

      setFormUser('');
      setFormPass('');
    } catch (err) {
      console.error(err);
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  const renderTabContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{authMode === 'login' ? 'Login' : 'Signup'}</h2>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={formUser}
              onChange={(e) => setFormUser(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formPass}
              onChange={(e) => setFormPass(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded">
              {authMode === 'login' ? 'Login' : 'Signup'}
            </button>
          </form>
          <p className="text-sm mt-2">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-primary underline"
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            >
              {authMode === 'login' ? 'Signup' : 'Login'}
            </button>
          </p>
        </div>
      );
    }

    if (loading) return <p className="text-muted-foreground">Loading dashboard...</p>;
    if (!dashboardData) return <p className="text-destructive">Failed to load data</p>;

    switch (activeTab) {
      case 'performance':
        return (
          <div className="space-y-6">
            {/* dashboard content */}
            <div className="grid gap-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <ScoreCard {...dashboardData} />
                <PerformanceChart />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <TeamSummary score={dashboardData.score} />
                <WeeklyComparison currentScore={dashboardData.score} />
              </div>
            </div>
          </div>
        );
      case 'synchronous': return <SynchronousTab />;
      case 'vertex': return <VertexTab />;
      case 'suggestions': return <SuggestionsTab />;
      case 'about': return <AboutTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAuthenticated={isAuthenticated}
        username={username}
        onAuthAction={isAuthenticated ? handleLogout : () => setAuthMode('login')}
      />
      <main className="container mx-auto px-6 py-8">
        {renderTabContent()}
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
