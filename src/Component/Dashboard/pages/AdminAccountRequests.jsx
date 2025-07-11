import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/adminAccountRequests.css';

const AdminAccountRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [newPaymentStatus, setNewPaymentStatus] = useState({});

  // Replace this with however you store your token
  const token = localStorage.getItem('adminToken'); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/account-requests', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(res.data);
      } catch (err) {
        setError('Failed to load account requests.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRequests();
    } else {
      setError('No admin token found. Please login.');
      setLoading(false);
    }
  }, [token]);

  const handlePaymentStatusChange = (id, value) => {
    setNewPaymentStatus(prev => ({ ...prev, [id]: value }));
  };

  const updatePaymentStatus = async (id) => {
    if (!newPaymentStatus[id]) return;
    setUpdatingId(id);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/account-requests/${id}/payment-status`,
        { paymentStatus: newPaymentStatus[id] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRequests(prev => prev.map(r => r._id === id ? res.data : r));
      alert('Payment status updated');
    } catch {
      alert('Failed to update payment status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
<div className="admin-requests-container">
  <h2>All Account Requests</h2>
  <table className="admin-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Post Title</th>
            <th>Account Type</th>
            <th>Bulk</th>
            <th>Quantity</th>
            <th>Payment Status</th>
            <th>Requested At</th>
            <th>Update Payment</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td>{req.user?.name || 'Guest'}</td>
              <td>{req.user?.email || (req.userInfo?.email || 'N/A')}</td>
              <td>{req.post?.title || 'N/A'}</td>
              <td>{req.accountType}</td>
              <td>{req.bulk ? 'Yes' : 'No'}</td>
              <td>{req.quantity || 1}</td>
              <td>{req.paymentStatus}</td>
              <td>{new Date(req.createdAt).toLocaleString()}</td>
              <td>
                <select
                  value={newPaymentStatus[req._id] || req.paymentStatus}
                  onChange={(e) => handlePaymentStatusChange(req._id, e.target.value)}
                  disabled={updatingId === req._id}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={() => updatePaymentStatus(req._id)}
                  disabled={updatingId === req._id}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr><td colSpan="9" style={{ textAlign: 'center' }}>No requests found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAccountRequests;
