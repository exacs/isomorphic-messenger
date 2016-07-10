/**
 * API Router
 *
 * Handles all /api/* routes
 */
import { Router } from 'express';
import { read, write } from '../logic/messages';
import chats from '../logic/chats';


const router = Router();

// Logs the API call
router.use((req, res, next) => {
  console.log('API CALL %s %s', req.url, req.path);
  next();
});

router.get('/chats/:chat_id/messages', (req, res) => {
  const chatId = req.params.chat_id;
  chats(chatId).read()
    .then(messages => res.status(200).json(messages))
    .catch(() => res.status(500).json({ error: 'Service unavailable' }));
});

router.post('/chats/:chat_id/messages', (req, res) => {
  const chatId = req.params.chat_id;

  // Check parameters
  if (!req || !req.body || !req.body.text) {
    res.status(400).json({ error: 'Missing arguments: "text"' });
    return;
  }
  chats(chatId).write(req.body.text)
    .then(() => res.status(201).json({ text: req.body.text }))
    .catch(() => res.status(500).json({ error: 'Service unavailable' }));
});


router.get('/messages', (req, res) => {
  read()
    .then(messages => res.status(200).json(messages))
    .catch(() => res.status(500).json({ error: 'Service unavailable' }));
});

router.post('/messages', (req, res) => {
  // Check parameters
  if (!req || !req.body || !req.body.text) {
    res.status(400).json({ error: 'Missing arguments: "text"' });
    return;
  }
  write(req.body.text)
    .then(() => res.status(201).json({ text: req.body.text }))
    .catch(() => res.status(500).json({ error: 'Service unavailable' }));
});

router.all('*', (req, res) => {
  console.log('API CALL failure %s', req.path);
  res.status(400).json({ error: 'Not implemented yet' });
});

export default router;
