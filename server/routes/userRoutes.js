//const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth'); // Import the auth middleware

// In your route handlers, use it like this:
router.post('/register', async (req, res) => {
    console.log('Register route hit', req.body);
    try {
        const { user_profile, user_name, user_email, user_phone, user_password } = req.body;

        console.log('Inserting:', user_profile, user_name, user_email, user_phone, user_password);

        // Basic server-side validation
        if (!user_name || !user_email || !user_password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (user_password.length < 4) {
            return res.status(400).json({ message: 'Password must be at least 4 characters long' });
        }

        // TEMPORARY: Using plain characters password for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const hashedPassword = await bcrypt.hash(user_password, 10);
        const Password = user_password; // TEMPORARY: stores password as plain characters

        const query = 'INSERT INTO users (user_name, user_email, user_password, user_phone, user_profile) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [user_name, user_email, Password, user_phone, user_profile]);

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
        // TEMPORARY: Comparing plain characters passwords for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
        const isPasswordValid = user_password === user.user_password; // TEMPORARY: plain characters comparison

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

// Get user data
router.get('/profile', auth, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, user_name, user_email, user_phone, user_profile, user_registered_date FROM users WHERE id = ?', [req.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = users[0];
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

// Update user data
router.put('/profile', auth, async (req, res) => {
    try {
        const { user_name, user_email, user_phone, user_profile } = req.body;
        await db.execute('UPDATE users SET user_name = ?, user_email = ?, user_phone = ?, user_profile = ? WHERE id = ?',
            [user_name, user_email, user_phone, user_profile, req.userId]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});

// Update password
router.put('/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const [users] = await db.execute('SELECT user_password FROM users WHERE id = ?', [req.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = users[0];
        // TEMPORARY: Comparing plain characters passwords for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const isPasswordValid = await bcrypt.compare(currentPassword, user.user_password);        
        const isPasswordValid = currentPassword === user.user_password; // TEMPORARY: plain characters comparison
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        // TEMPORARY: Comparing plain characters passwords for testing
        // TODO: IMPORTANT - Re-enable password hashing before production!
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        const Password = newPassword; // TEMPORARY: stores password as plain characters
        await db.execute('UPDATE users SET user_password = ? WHERE id = ?', [Password, req.userId]);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
});

module.exports = router;