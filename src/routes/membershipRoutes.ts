import { Router } from 'express';
import { createMembership, getMembership, updateMembership, deleteMembership } from '../controllers/membershipController';

const router = Router();

router.post('/memberships', createMembership);
router.get('/memberships/:id', getMembership);
router.put('/memberships/:id', updateMembership);
router.delete('/memberships/:id', deleteMembership);

export default router;
