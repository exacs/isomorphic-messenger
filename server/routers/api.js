/**
 * API Router
 *
 * Handles all /api/* routes
 */
import { Router } from 'express';
import { read, write } from '../logic/messages';

const router = Router();

// Logs the API call
router.use((req, res, next) => {
  console.log('API CALL %s %s', req.url, req.path);
  next();
});

router.get('/messages', (req, res) => {
  read().then(messages => res.status(200).json(messages));
});

router.post('/messages', (req, res) => {
  write(req.body.text)
    .then(() => res.status(201).json({
      text: req.body.text,
    }));
});

router.all('*', (req, res) => {
  console.log('API CALL failure %s', req.path);
  res.status(400).json({ error: 'Not implemented yet' });
});

export default router;
