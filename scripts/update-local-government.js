import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to map state code to local government
function getLocalGovernmentFromStateCode(stateCode) {
  // Extract the last digit from the state code
  const lastDigit = parseInt(stateCode.slice(-1));
  
  // Map the last digit to local government (using modulo to handle all 20 local governments)
  const localGovernments = [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere",
  ];
  
  // Use modulo to map any digit to one of the 20 local governments
  const index = lastDigit % localGovernments.length;
  return localGovernments[index];
}

async function updateUsersWithLocalGovernment() {
  try {
    console.log('Fetching all users...');
    const users = await prisma.user.findMany();
    
    console.log(`Found ${users.length} users. Updating local government data...`);
    
    let updatedCount = 0;
    
    for (const user of users) {
      if (!user.localGovernment) {
        const localGovernment = getLocalGovernmentFromStateCode(user.stateCode);
        
        await prisma.user.update({
          where: { id: user.id },
          data: { localGovernment },
        });
        
        updatedCount++;
        console.log(`Updated user ${user.stateCode} with local government: ${localGovernment}`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} users with local government data.`);
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUsersWithLocalGovernment(); 