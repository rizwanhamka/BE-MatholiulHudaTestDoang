import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const items = await prisma.pemberitahuan.findMany({
    take: 3,
    orderBy: { id: "desc" },
  });
  res.json(items);
}
