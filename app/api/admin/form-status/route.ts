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

    const { formType } = await req.json();

    if (!['4A', '4B', 'NONE'].includes(formType)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Update all form statuses
    await Promise.all([
      prisma.formStatus.upsert({
        where: { formType: '4A' },
        update: { isActive: formType === '4A' },
        create: { formType: '4A', isActive: formType === '4A' },
      }),
      prisma.formStatus.upsert({
        where: { formType: '4B' },
        update: { isActive: formType === '4B' },
        create: { formType: '4B', isActive: formType === '4B' },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating form status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 