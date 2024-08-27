// Create web server
// Create a static web server
// Create a new comment
// Get all comments
// Get a comment by id
// Update a comment by id
// Delete a comment by id

import { Router } from 'express';
import comments, { length, push, find, findIndex, splice } from '../data/comments';
const router = Router();

// Create a new comment
router.post('/', (req, res) => {
    const { username, comment } = req.body;
    const newComment = {
        id: length + 1,
        username: username,
        comment: comment
    }
    push(newComment);
    res.json(newComment);
});

// Get all comments
router.get('/', (req, res) => {
    res.json(comments);
});

// Get a comment by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: `Comment with id ${id} not found` });
    }
});

// Update a comment by id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { username, comment } = req.body;
    const commentIndex = findIndex(comment => comment.id === id);
    if (commentIndex > -1) {
        comments[commentIndex] = {
            id: id,
            username: username,
            comment: comment
        }
        res.json(comments[commentIndex]);
    } else {
        res.status(404).json({ message: `Comment with id ${id} not found` });
    }
});

// Delete a comment by id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = findIndex(comment => comment.id === id);
    if (commentIndex > -1) {
        splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: `Comment with id ${id} not found` });
    }
});

export default router;