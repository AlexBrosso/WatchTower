const prisma = require("../src/lib/prisma");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function main() {
  const adminEmail = "admin@watchtower.com";

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (adminExists) {
    console.log("Admin already exists. Skipping seed.");
    return;
  }

  const passwordHash = await bcrypt.hash("admin123", SALT_ROUNDS);

  await prisma.user.create({
    data: {
      email: adminEmail,
      username: "admin",
      passwordHash,
      role: "ADMIN",
      emailVerified: true
    }
  });

  console.log("Admin user created successfully.");
}

main()
  .catch(e => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
