import { Router } from 'express';
import { createMessage, getMessage, updateMessage, deleteMessage } from '../controllers/messageController';

const router = Router();

router.post('/messages', createMessage);
router.get('/messages/:id', getMessage);
router.put('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);

export default router;
