import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMembership = async (req: Request, res: Response) => {
  const { userId, podId, status } = req.body;
  try {
    const membership = await prisma.membership.create({
      data: {
        user: { connect: { id: userId } },
        pod: { connect: { id: podId } },
        status,
      },
    });
    res.status(201).json(membership);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const getMembership = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const membership = await prisma.membership.findUnique({ where: { id: Number(id) } });
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    res.status(200).json(membership);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const updateMembership = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const membership = await prisma.membership.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(membership);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const deleteMembership = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.membership.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};
