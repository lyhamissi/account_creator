import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/post.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deliveryTime: '',
        pricePersonal: '',
        priceBusiness: '',
        images: [],
        existingImages: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                const post = res.data;
                setFormData({
                    title: post.title,
                    description: post.description,
                    deliveryTime: post.deliveryTime,
                    pricePersonal: post.pricePersonal,
                    priceBusiness: post.priceBusiness,
                    images: [],
                    existingImages: post.images || [],
                });
                setPreviewImages(post.images.map(img => `http://localhost:5000/uploads/${img}`));
            } catch (err) {
                alert('Failed to fetch post data');
                navigate('/admin/posts');
            }
        };

        fetchPost();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: files }));

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('deliveryTime', formData.deliveryTime);
            data.append('pricePersonal', formData.pricePersonal);
            data.append('priceBusiness', formData.priceBusiness);

            formData.images.forEach((image) => {
                data.append('images', image);
            });

            const token = localStorage.getItem('adminToken');

            await axios.put(`http://localhost:5000/api/posts/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Post updated successfully!');
            navigate('/admin/posts');
        } catch (error) {
            alert('Failed to update post');
            console.error(error);
        }
    };

    return (
        <div className="posts-container">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Delivery Time (days)</label>
                    <input
                        name="deliveryTime"
                        type="number"
                        min="1"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price (Personal Account)</label>
                    <input
                        name="pricePersonal"
                        type="number"
                        min="0"
                        value={formData.pricePersonal}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price (Business Account)</label>
                    <input
                        name="priceBusiness"
                        type="number"
                        min="0"
                        value={formData.priceBusiness}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Replace Images (optional)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="image-preview">
                        {previewImages.map((src, i) => (
                            <img key={i} src={src} alt={`preview-${i}`} />
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn-primary">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
