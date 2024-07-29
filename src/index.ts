import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// User Routes
app.post('/users', async (req, res) => {
  const { username, email, password, profileInfo } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        profileInfo,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({ error: typedError.message });
  }
});

// Pod Routes
app.post('/pods', async (req, res) => {
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
});

// Membership Routes
app.post('/memberships', async (req, res) => {
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
});

// Message Routes
app.post('/messages', async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
