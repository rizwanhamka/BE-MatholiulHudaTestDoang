import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const item = await prisma.berita.findUnique({
      where: { id: parseInt(id) },
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    return res.json(item);
  }
  return res.status(405).end();
}
