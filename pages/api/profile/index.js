import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await prisma.profile.findMany();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { nama, jabatan, foto } = req.body;
    const created = await prisma.profile.create({
      data: { nama, jabatan, foto },
    });
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
