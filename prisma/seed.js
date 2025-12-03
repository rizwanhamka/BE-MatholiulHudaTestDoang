const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Menghapus data lama...");

  // Hapus semua tabel yang ada agar tidak double
  await prisma.gallery.deleteMany();
  await prisma.pemberitahuan.deleteMany();
  await prisma.berita.deleteMany();
  await prisma.kepengurusan.deleteMany();
  await prisma.profile.deleteMany().catch(() => {}); // jika tabel ada
  await prisma.user.deleteMany();

  console.log("🌱 Mulai seeding...");

  // ===========================
  // 1. Gallery
  // ===========================
  await prisma.gallery.createMany({
    data: [
      {
        url: "https://yayasannala.or.id/wp-content/uploads/2021/09/cropped-Aman-Jaya-New.jpeg",
      },
      {
        url: "https://yatimamanahumah.org/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-31-at-16.01.11.jpeg",
      },
      {
        url: "https://vervalyayasan.data.kemdikbud.go.id/upload/file/94/945C/456156-2757721359800076648.jpg",
      },
    ],
  });

  // ===========================
  // 2. Pemberitahuan
  // ===========================
  await prisma.pemberitahuan.createMany({
    data: [
      { url: "https://picsum.photos/id/1020/600/400" },
      { url: "https://picsum.photos/id/1021/600/400" },
      { url: "https://picsum.photos/id/1022/600/400" },
    ],
  });

  // ===========================
  // 3. Berita
  // ===========================
  await prisma.berita.createMany({
    data: [
      {
        title: "Contoh Berita 1",
        description: "Ini deskripsi berita pertama.",
        imageUrl: "https://picsum.photos/id/1035/800/450",
        date: new Date("2025-01-01"),
      },
      {
        title: "Kegiatan Sosial Bulan Februari",
        description: "Dokumentasi kegiatan sosial yayasan.",
        imageUrl: "https://picsum.photos/id/1040/800/450",
        date: new Date("2025-02-10"),
      },
    ],
  });

  // ===========================
  // 4. Kepengurusan
  // ===========================
  await prisma.kepengurusan.createMany({
    data: [
      {
        nama: "Ahmad Rizwan Hamka",
        nip: "19700101",
        peran: "Ketua",
        email: "rizwan@example.com",
        foto: "https://picsum.photos/id/1005/200/200",
      },
      {
        nama: "Nama Lain",
        nip: "19700102",
        peran: "Wakil",
        email: "wakil@example.com",
        foto: "https://picsum.photos/id/1006/200/200",
      },
    ],
  });

  // ===========================
  // 5. Profile (Jika ada tabelnya)
  // ===========================
  await prisma.profile
    .createMany({
      data: [
        {
          nama: "Yayasan Aman Jaya",
          jabatan: "Profil Utama",
          foto: "https://picsum.photos/id/1050/200/200",
        },
      ],
    })
    .catch(() => {
      console.log("⚠️ Profile table tidak ditemukan, skip...");
    });

  // ===========================
  // 6. User
  // ===========================
  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      nama: "Admin Utama",
      email: "admin@example.com",
      password: passwordHash,
      telp: "081234567890",
      foto: "https://picsum.photos/id/1001/200/200",
    },
  });

  console.log("✅ Seeding selesai.");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
