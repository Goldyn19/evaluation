import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.stateCode) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get('formType');
    if (!formType) {
      return NextResponse.json({ error: 'Missing formType' }, { status: 400 });
    }

    // Find the user by stateCode to get the actual user ID
    const user = await prisma.user.findUnique({
      where: { stateCode: session.user.stateCode },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const submission = await prisma.formSubmission.findUnique({
      where: { userId_formType: { userId: user.id, formType } },
    });
    return NextResponse.json({ submitted: !!submission });
  } catch (error) {
    console.error('Error checking form submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 