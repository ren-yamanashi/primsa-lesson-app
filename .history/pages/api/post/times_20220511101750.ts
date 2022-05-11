
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';

// published : true

// Create Todo
export default async function handle(req, res) {
  const userId = req.query.id;
  const {time} = req.body;
  const result = await prisma.time.create({
    data: {
      number:time,
      author: { connect: {id:"test"} },
    },
  });
  res.json(result);
}
