import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Loading posts...</p>;

  return (
    <div className="home-container">
      <h2>Available Account Packages</h2>
      <div className="post-grid">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-images">
                {post.images.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/uploads/${img}`}
                    alt={`Account ${i + 1}`}
                  />
                ))}
              </div>
              <div className="post-prices">
                <p><strong>CHASE PERSONAL PRICE:</strong> ${post.pricePersonal}</p>
                <p><strong>CHASE BUSINESS PLATNUM PRICE:</strong> ${post.priceBusiness}</p>
              </div>
              <p className="post-description">{post.description}</p>
              <p className="post-delivery"><strong>Delivery Time:</strong> {post.deliveryTime} day(s)</p>
              <div className="buttons-container">
                <div className="business">
                  <Link to={`/posts/${post._id}`} className="choose-btn">Buy Business here</Link>
                  <a href="#" className="choose-btn secondary">Buy 10 for $2500 instead of $3990</a></div>

                <div className="person">
                  <a href="#" className="choose-btn">Buy Personal here</a>
                  <a href="#" className="choose-btn secondary">Buy 10 for $1099 instead of $1700</a>
                </div>
              </div>


            </div>

          ))
        )}
      </div>
    </div>
  );
};

export default Home;
