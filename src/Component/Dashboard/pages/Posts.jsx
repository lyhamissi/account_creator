import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../styles/post.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch posts from backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res.data);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="posts-container">
            <div className="posts-header">
                <h1>Manage Posts</h1>
                <Link to="/admin/posts/add">
                    <button className="btn-primary">Add New Post</button>
                </Link>
            </div>

            {posts.length === 0 && <p>No posts available</p>}

            {posts.map(post => (
                <div key={post._id} className="post-cards">
                    <h3>{post.title}</h3>
                    <p><strong>Delivery time:</strong> {post.deliveryTime} days</p>
                    <p><strong>CHASE PERSONAL PRICE:</strong> ${post.pricePersonal}</p>
                    <p><strong>CHASE BUSINESS PLATNUM PRICE:</strong> ${post.priceBusiness}</p>
                    <p className='post-description'>{post.description}</p>
                    <div className="post-images">
                        {post.images?.map((img, i) => (
                            <img
                                key={i}
                                src={`http://localhost:5000/uploads/${img}`}
                                alt={`Post ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="post-actions">
                        <Link to={`/admin/posts/edit/${post._id}`}>
                            <button className="btn-primary">Edit</button>
                        </Link>
                        <Link to="/admin/posts/add">
                            <button className="btn-primary">Delete</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
