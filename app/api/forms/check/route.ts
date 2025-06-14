import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.stateCode) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get('formType');
    if (!formType) {
      return NextResponse.json({ error: 'Missing formType' }, { status: 400 });
    }
    const submission = await prisma.formSubmission.findUnique({
      where: { userId_formType: { userId: session.user.stateCode, formType } },
    });
    return NextResponse.json({ submitted: !!submission });
  } catch  {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 