const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getAllRequests,
  updatePaymentStatus
} = require('../controllers/accountRequestController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, createRequest);
router.get('/me', authMiddleware, getUserRequests);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllRequests);
router.patch('/:id/payment', authMiddleware, roleMiddleware('admin'), updatePaymentStatus);

module.exports = router;
