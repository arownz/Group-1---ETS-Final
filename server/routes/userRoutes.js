// server/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth'); // Import the auth middleware

// In your route handlers, use it like this:
router.post('/register', async (req, res) => {
    console.log('Register route hit', req.body);
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    console.log('Login route hit', req.body);
    try {
        const { user_email, user_password } = req.body;
        
        const [users] = await db.execute('SELECT * FROM users WHERE user_email = ?', [user_email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id, username: user.user_name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, user_name, user_email, user_phone, user_registered_date FROM users WHERE id = ?', [req.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users[0]);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

module.exports = router;