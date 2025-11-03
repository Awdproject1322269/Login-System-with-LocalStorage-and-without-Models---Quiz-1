import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Simplified - without deprecated options)
mongoose.connect('mongodb://localhost:27017/quizapp')
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['Teacher', 'Student']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// 📧 Registration API
app.post('/api/register', async (req, res) => {
  try {
    const { role, email, password, confirm } = req.body;

    // Validation
    if (!role || !email || !password || !confirm) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields!' 
      });
    }

    if (password !== confirm) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match!' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long!' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email!' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      role,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: `${role} registered successfully! 🎉`,
      user: {
        role: newUser.role,
        email: newUser.email,
        id: newUser._id
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// 🔑 Login API
app.post('/api/login', async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields!' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email or password!' 
      });
    }

    // Check role
    if (user.role !== role) {
      return res.status(400).json({ 
        success: false, 
        message: `No ${role} account found with this email!` 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email or password!' 
      });
    }

    res.json({
      success: true,
      message: `${role} logged in successfully! 🎉`,
      user: {
        role: user.role,
        email: user.email,
        id: user._id
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// 🏠 Test API
app.get('/api', (req, res) => {
  res.json({ 
    message: '✅ Backend is working! QuizQuest-3 API is running.' 
  });
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Server running on port ${PORT}`);
  console.log(`📊 MongoDB: quizapp database`);
  console.log(`👥 Collection: users (automatically created)`);
});