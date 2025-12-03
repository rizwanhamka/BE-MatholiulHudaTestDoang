import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { nama, email, password } = req.body;
  if (!nama || !email || !password)
    return res.status(400).json({ error: "nama,email,password required" });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists)
    return res.status(400).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { nama, email, password: hashed },
    select: { id: true, nama: true, email: true, telp: true, foto: true },
  });

  res.status(201).json(user);
}
