import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const items = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(items);
  } else if (req.method === "POST") {
    const { nama, email, telp, isi } = req.body;
    if (!nama || !email || !isi)
      return res.status(400).json({ error: "nama, email, isi required" });

    const created = await prisma.feedback.create({
      data: { nama, email, telp: telp || "", isi },
    });

    return res.status(201).json(created);
  } else {
    return res.status(405).end();
  }
}
