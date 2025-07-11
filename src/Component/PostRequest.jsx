import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/postRequest.css';

const PostRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [useOwnInfo, setUseOwnInfo] = useState(true);
  const [formData, setFormData] = useState({
    requestType: 'personal', // includes bulk options
    userInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [name]: value,
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'useOwnInfo') {
      setUseOwnInfo(checked);
    } else if (name === 'requestType') {
      setFormData(prev => ({ ...prev, requestType: value }));
    }
  };

  const getSelectedPrice = () => {
    if (!post) return '';
    switch (formData.requestType) {
      case 'business': return `$${post.priceBusiness}`;
      case 'bulk-business': return `$2500 (10 accounts instead of $3990)`;
      case 'bulk-personal': return `$1099 (10 accounts instead of $1700)`;
      default: return `$${post.pricePersonal}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bulkMap = {
      'personal': 'personal',
      'business': 'business',
      'bulk-personal': 'personal',
      'bulk-business': 'business',
    };

    const accountType = bulkMap[formData.requestType];
    const isBulk = formData.requestType.startsWith('bulk');
    const quantity = isBulk ? 10 : 1;

    try {
      await axios.post('http://localhost:5000/api/account-requests', {
        postId: id,
        accountType,
        useOwnInfo,
        userInfo: useOwnInfo ? formData.userInfo : {},
        bulk: isBulk,
        quantity,
      });
      alert('Request submitted successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to submit request');
      console.error(err);
    }
  };

  if (!post) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div className="request-container" style={{ display: 'flex', gap: '2rem' }}>
      {/* Left side: post info and selected price */}
      <div className="post-info" style={{ flex: 1 }}>
        <h2>{post.title}</h2>
        <div className="image-row">
          {post.images.map((img, i) => (
            <img key={i} src={`http://localhost:5000/uploads/${img}`} alt={`Post ${i}`} />
          ))}
        </div>
        <p className="post-description">{post.description}</p>
        <p><strong>Delivery Time:</strong> {post.deliveryTime} days</p>
        <p><strong>Selected Package Price:</strong> {getSelectedPrice()}</p>
      </div>

      {/* Right side: form */}
      <form className="request-form" onSubmit={handleSubmit} style={{ flex: 1 }}>
        <h3>Request This Account</h3>

        <label>
          <input
            type="checkbox"
            name="useOwnInfo"
            checked={useOwnInfo}
            onChange={handleChange}
          />
          Use My Own Information
        </label>

        {useOwnInfo && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.userInfo.name}
              required
              onChange={handleUserInfoChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.userInfo.email}
              required
              onChange={handleUserInfoChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.userInfo.phone}
              required
              onChange={handleUserInfoChange}
            />
          </>
        )}

        <label>Choose Package</label>
        <select
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          required
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
          <option value="bulk-personal">Bulk Personal (10 for $1099)</option>
          <option value="bulk-business">Bulk Business (10 for $2500)</option>
        </select>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default PostRequest;
