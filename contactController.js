const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    // Save message to DB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject || 'No subject'}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
