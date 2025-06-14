import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminEmail = 'admin@nysc.gov.ng';
  const adminPassword = 'Admin@123'; // This should be changed after first login

  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'NYSC Admin',
      stateCode: 'ADMIN',
      lastName: 'Administrator',
      role: 'ADMIN',
    },
  });

  // Create initial form statuses
  await prisma.formStatus.createMany({
    skipDuplicates: true,
    data: [
      { formType: '4A', isActive: false },
      { formType: '4B', isActive: false },
    ],
  });

  console.log('Database seeded successfully');
  console.log('Admin credentials:');
  console.log('Email:', adminEmail);
  console.log('Password:', adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 