import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

          await prisma.user.upsert({
            where: { stateCode: cleanedStateCode },
            update: { lastName },
            create: {
              stateCode: cleanedStateCode,
              lastName,
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