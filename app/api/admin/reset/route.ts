import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { confirmationCode } = await req.json();

    if (!confirmationCode) {
      return NextResponse.json({ error: 'Confirmation code is required' }, { status: 400 });
    }

    // Simple confirmation code check - you can change this to any code you prefer
    const expectedCode = 'RESET2024';
    
    if (confirmationCode !== expectedCode) {
      return NextResponse.json({ error: 'Invalid confirmation code' }, { status: 401 });
    }

    // Delete all FormSubmission records
    await prisma.formSubmission.deleteMany({});

    // Delete all non-admin users
    await prisma.user.deleteMany({
      where: {
        role: {
          not: 'ADMIN',
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Database reset successfully. All users and form submissions have been cleared.' 
    });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 