import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';


const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, profileInfo } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profileInfo,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id  = req.body.userId;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id  = req.body.userId;

  const { username, email, profileInfo } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username,
        email,
        profileInfo,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
};
