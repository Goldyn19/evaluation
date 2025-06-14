import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.stateCode) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { formType } = await req.json();
    if (!formType) {
      return NextResponse.json({ error: 'Missing formType' }, { status: 400 });
    }

    // Find the user by stateCode
    const user = await prisma.user.findUnique({
      where: { stateCode: session.user.stateCode },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.formSubmission.upsert({
      where: { userId_formType: { userId: user.id, formType } },
      update: {},
      create: {
        userId: user.id,
        formType,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 