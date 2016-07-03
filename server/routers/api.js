/**
 * API Router
 *
 * Handles all /api/* routes
 */
import Router from 'express';
const router = Router();

// Logs the API call
router.use((req, res, next) => {
  console.log('---- API CALL ----');
  next();
});

router.all('*', (req, res) => {
  res.status(400).json({ error: 'Not implemented yet' });
});

export default router;
