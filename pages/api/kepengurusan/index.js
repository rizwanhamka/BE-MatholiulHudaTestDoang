import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const items = await prisma.kepengurusan.findMany({
    orderBy: { nama: "asc" },
  });
  res.json(items);
}
