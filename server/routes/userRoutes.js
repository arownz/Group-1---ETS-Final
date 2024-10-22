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
        const { user_name, user_email, user_password, user_phone, user_profile } = req.body;

        console.log('Inserting:', user_name, user_email, user_password, user_phone, user_profile);

        // Basic server-side validation
        if (!user_name || !user_email || !user_password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (user_password.length < 4) {
            return res.status(400).json({ message: 'Password must be at least 4 characters long' });
        }

        // TEMPORARY: Using plain text password for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const hashedPassword = await bcrypt.hash(user_password, 10);
        const hashedPassword = user_password; // TEMPORARY: stores password as plain text

        const query = 'INSERT INTO users (user_name, user_email, user_password, user_phone, user_profile) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [user_name, user_email, hashedPassword, user_phone, user_profile]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        console.log('Login attempt for:', user_email);

        const [users] = await db.execute('SELECT * FROM users WHERE user_email = ?', [user_email]);
        console.log('Users found:', users.length);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        // TEMPORARY: Comparing plain text passwords for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
        const isPasswordValid = user_password === user.user_password; // TEMPORARY: plain text comparison

        console.log('Password valid:', isPasswordValid);
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
    console.log('Profile route hit, userId:', req.userId);
    try {
        const [users] = await db.execute('SELECT id, user_name, user_email, user_phone, user_registered_date FROM users WHERE id = ?', [req.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users[0]);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

module.exports = router;