import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const items = await prisma.gallery.findMany({ orderBy: { id: "desc" } });
  res.json(items);
}
