import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

function getPlatoonNumber(stateCode: string): number {
  // Extract the last digit from the state code
  const lastDigit = parseInt(stateCode.slice(-1));
  // If the last digit is 0, it's platoon 10, otherwise it's the last digit
  return lastDigit === 0 ? 10 : lastDigit;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all users and their form submissions
    const users = await prisma.user.findMany({
      where: {
        role: 'USER', // Only get regular users, not admins
      },
      include: {
        formSubmissions: true,
      },
    });

    // Initialize platoon statistics
    const platoonStats = Array.from({ length: 10 }, (_, i) => ({
      platoonNumber: i + 1,
      totalMembers: 0,
      submittedForms: 0,
    }));

    // Calculate statistics
    users.forEach(user => {
      const platoonNumber = getPlatoonNumber(user.stateCode);
      const platoonIndex = platoonNumber - 1;
      
      platoonStats[platoonIndex].totalMembers++;
      if (user.formSubmissions.length > 0) {
        platoonStats[platoonIndex].submittedForms++;
      }
    });

    return NextResponse.json(platoonStats);
  } catch (error) {
    console.error('Error fetching platoon statistics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 