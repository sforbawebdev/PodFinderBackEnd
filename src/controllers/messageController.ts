import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, podId, content } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
        pod: { connect: { id: podId } },
        content,
        timestamp: new Date(),
      },
    });
    res.status(201).json(message);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await prisma.message.findUnique({ where: { id: Number(id) } });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const message = await prisma.message.update({
      where: { id: Number(id) },
      data: { content },
    });
    res.status(200).json(message);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};
