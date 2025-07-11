import React, { useState } from 'react';
import axios from 'axios';
import '../../../styles/post.css';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deliveryTime: '',
    pricePersonal: '',
    priceBusiness: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

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

      formData.images.forEach(image => {
        data.append('images', image); // ✅ field name matches multer
      });

      const token = localStorage.getItem('adminToken');

      const res = await axios.post('http://localhost:5000/api/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Post added successfully!');
      setFormData({
        title: '',
        description: '',
        deliveryTime: '',
        pricePersonal: '',
        priceBusiness: '',
        images: [],
      });
      setPreviewImages([]);

    } catch (error) {
      console.error('Failed to add post:', error.response?.data || error.message);
      alert('Failed to add post');
    }
  };

  return (
    <div className="posts-container">
      <h1>Add New Post</h1>
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
          <label>Images (3 required)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <div className="image-preview">
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
