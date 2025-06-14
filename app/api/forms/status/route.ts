import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formStatus = await prisma.formStatus.findMany({
      where: {
        formType: {
          in: ['4A', '4B'],
        },
      },
    });

    return NextResponse.json(formStatus);
  } catch (error) {
    console.error('Error fetching form status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 