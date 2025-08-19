import { Router } from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
const router = Router();
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
        res.json({ user, posts });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
export default router;
