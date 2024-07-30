import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPod = async (req: Request, res: Response) => {
  const { name, description, location, time, format, creatorId } = req.body;
  try {
    const pod = await prisma.pod.create({
      data: {
        name,
        description,
        location,
        time: new Date(time),
        format,
        creator: { connect: { id: creatorId } },
      },
    });
    res.status(201).json(pod);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const getPod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pod = await prisma.pod.findUnique({ where: { id: Number(id) } });
    if (!pod) {
      return res.status(404).json({ error: 'Pod not found' });
    }
    res.status(200).json(pod);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const updatePod = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, location, time, format } = req.body;
  try {
    const pod = await prisma.pod.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        location,
        time: new Date(time),
        format,
      },
    });
    res.status(200).json(pod);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const deletePod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pod.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};
