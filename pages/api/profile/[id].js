import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== "GET") return res.status(405).end();
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nama: true,
      email: true,
      telp: true,
      foto: true,
      createdAt: true,
    },
  });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
}
