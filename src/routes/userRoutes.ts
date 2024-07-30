import { Router } from 'express';
import { createUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;