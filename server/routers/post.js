/**
 * POST Router
 *
 * Handles all POST requests to "/"
 */
import Router from 'express';
import { write } from '../logic/messages';

const router = Router();

router.post('/messages', (req, res) => {
  write(req.body.text)
    .then(() => res.redirect(303, '/messages'));
});

export default router;
