import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const items = await prisma.berita.findMany({ orderBy: { date: "desc" } });
    return res.json(items);
  }
  return res.status(405).end();
}
