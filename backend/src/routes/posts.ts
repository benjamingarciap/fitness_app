import { Router } from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, title, description, image } = req.body;
    const post = new Post({ user: userId, title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/feed', async (_req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username avatar').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/reaction', async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (emoji === '💪') post.reactions.flex++;
    else if (emoji === '🔥') post.reactions.fire++;
    else if (emoji === '👏') post.reactions.clap++;
    await post.save();
    res.json(post.reactions);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
