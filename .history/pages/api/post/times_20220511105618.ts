
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';
import Router from 'next/router';

// published : true

// Create Todo
export default async function handle(req, res) {
const routerId = req.body;
  const result = await prisma.time.create({
    data: {
      number:3,
      author: { connect: { id:routerId } },
    },
  });
  res.json(result);
  
}
