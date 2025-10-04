const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyGoogleToken = require('../utils/googleVerify');
// Google OAuth Login
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'No Google token provided' });
    }

    // Verify Google token
    let payload;
    try {
      payload = await verifyGoogleToken(token);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid Google token' });
    }

    // Find or create user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        email: payload.email,
        name: payload.name || payload.given_name || 'Google User',
        password: Math.random().toString(36).slice(-8), // random password, not used
        profileComplete: false,
        role: 'user'
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Google login successful',
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ success: false, message: 'Server error during Google login' });
  }
});



// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Update profile complete status
    user.checkProfileComplete();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Update profile complete status
    user.checkProfileComplete();
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
