const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, description, pricePersonal, priceBusiness, deliveryTime } = req.body;
  const images = req.files.map(file => file.path);
  try {
    const post = new Post({ title, description, images, pricePersonal, priceBusiness, deliveryTime });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { title, description, pricePersonal, priceBusiness, deliveryTime } = req.body;
    if (req.files.length) {
      post.images = req.files.map(file => file.path);
    }
    post.title = title || post.title;
    post.description = description || post.description;
    post.pricePersonal = pricePersonal || post.pricePersonal;
    post.priceBusiness = priceBusiness || post.priceBusiness;
    post.deliveryTime = deliveryTime || post.deliveryTime;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
