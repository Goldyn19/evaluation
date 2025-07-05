import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to map state code to local government
function getLocalGovernmentFromStateCode(stateCode: string): string | null {
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

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const session = await getServerSession();
    
    // TODO: Add proper admin authentication check
    // if (!session?.user?.email?.endsWith('@nysc.gov.ng')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { records } = await req.json();

    if (!Array.isArray(records)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Process records in batches to avoid overwhelming the database
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (record) => {
          const { stateCode, lastName } = record;
          if (!stateCode || !lastName) return;

          // Strip all '/' characters from stateCode
          const cleanedStateCode = stateCode.replace(/\//g, '');

          const localGovernment = getLocalGovernmentFromStateCode(cleanedStateCode);
          
          await prisma.user.upsert({
            where: { stateCode: cleanedStateCode },
            update: { 
              lastName,
              localGovernment,
            },
            create: {
              stateCode: cleanedStateCode,
              lastName,
              localGovernment,
            },
          });
        })
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 