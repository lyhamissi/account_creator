const AccountRequest = require('../models/AccountRequest');

exports.createRequest = async (req, res) => {
  try {
    const { postId, accountType, useOwnInfo, userInfo } = req.body;
    const accountRequest = new AccountRequest({
      user: req.user._id,
      post: postId,
      accountType,
      useOwnInfo,
      userInfo: useOwnInfo ? userInfo : {},
      paymentStatus: 'pending'
    });
    await accountRequest.save();
    res.status(201).json(accountRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await AccountRequest.find({ user: req.user._id })
      .populate('post');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await AccountRequest.find()
      .populate('user', 'name email')
      .populate('post');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const request = await AccountRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.paymentStatus = paymentStatus;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
