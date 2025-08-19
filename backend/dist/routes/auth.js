import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = Router();
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar, bio: user.bio } });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
export default router;
