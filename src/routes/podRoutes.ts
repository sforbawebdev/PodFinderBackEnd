import { Router } from 'express';
import { createPod, getPod, updatePod, deletePod } from '../controllers/podController';

const router = Router();

router.post('/pods', createPod);
router.get('/pods/:id', getPod);
router.put('/pods/:id', updatePod);
router.delete('/pods/:id', deletePod);

export default router;