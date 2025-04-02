import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const provinces = [
    { name: "Phnom Penh" },
    { name: "Siem Reap" },
    { name: "Battambang" },
    { name: "Kampong Cham" },
    { name: "Kampong Thom" },
    { name: "Kampot" },
    { name: "Kandal" },
    { name: "Koh Kong" },
    { name: "Kratie" },
    { name: "Mondulkiri" },
    { name: "Preah Vihear" },
    { name: "Prey Veng" },
    { name: "Pursat" },
    { name: "Ratanakiri" },
    { name: "Sihanoukville" },
    { name: "Stung Treng" },
    { name: "Svay Rieng" },
    { name: "Takeo" },
    { name: "Tboung Khmum" },
    { name: "Banteay Meanchey" },
    { name: "Oddar Meanchey" },
    { name: "Pailin" },
    { name: "Kep" },
  ];

  await prisma.province.createMany({
    data: provinces,
    skipDuplicates: true, // Avoid duplicate errors
  });

  console.log("✅ Provinces seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
