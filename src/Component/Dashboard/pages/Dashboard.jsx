import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    accountRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, postsRes, requestsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users/count'),
          axios.get('http://localhost:5000/api/posts/count'),
          axios.get('http://localhost:5000/api/account-requests/count'),
        ]);

        setStats({
          users: usersRes.data.count,
          posts: postsRes.data.count,
          accountRequests: requestsRes.data.count,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div style={{
          background: '#1E2A38',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h2>{stats.users}</h2>
          <p>Users</p>
        </div>
        <div style={{
          background: '#1E2A38',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h2>{stats.posts}</h2>
          <p>Posts</p>
        </div>
        <div style={{
          background: '#1E2A38',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h2>{stats.accountRequests}</h2>
          <p>Account Requests</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
