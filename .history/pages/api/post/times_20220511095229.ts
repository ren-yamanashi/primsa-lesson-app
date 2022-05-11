
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';

// published : true

// Create Todo
export default async function handle(req, res) {
  const userId = req.query.id;
  const {index} = req.body;
  const result = await prisma.time.create({
    data: {
      number:index,
      author: { connect: { id: "helloWorld" } },
    },
  });
  res.json(result);
}
