const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', authMiddleware, roleMiddleware('admin'), upload.array('images', 3), createPost);
router.put('/:id', authMiddleware, roleMiddleware('admin'), upload.array('images', 3), updatePost);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deletePost);

module.exports = router;

