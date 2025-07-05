import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

// Local government data
const localGovernments = [
  { name: "Agege", id: 1 },
  { name: "Ajeromi-Ifelodun", id: 2 },
  { name: "Alimosho", id: 3 },
  { name: "Amuwo-Odofin", id: 4 },
  { name: "Apapa", id: 5 },
  { name: "Badagry", id: 6 },
  { name: "Epe", id: 7 },
  { name: "Eti Osa", id: 8 },
  { name: "Ibeju-Lekki", id: 9 },
  { name: "Ifako-Ijaiye", id: 10 },
  { name: "Ikeja", id: 11 },
  { name: "Ikorodu", id: 12 },
  { name: "Kosofe", id: 13 },
  { name: "Lagos Island", id: 14 },
  { name: "Lagos Mainland", id: 15 },
  { name: "Mushin", id: 16 },
  { name: "Ojo", id: 17 },
  { name: "Oshodi-Isolo", id: 18 },
  { name: "Shomolu", id: 19 },
  { name: "Surulere", id: 20 },
];

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
        formSubmissions: {
          where: {
            formType: '4B', // Only count Form4B submissions
          },
        },
      },
    });

    // Initialize local government statistics
    const localGovernmentStats = localGovernments.map(lg => ({
      localGovernmentName: lg.name,
      localGovernmentId: lg.id,
      totalMembers: 0,
      submittedForms: 0,
    }));

    // Calculate statistics
    users.forEach(user => {
      if (user.localGovernment) {
        const lgIndex = localGovernmentStats.findIndex(
          stat => stat.localGovernmentName === user.localGovernment
        );
        
        if (lgIndex !== -1) {
          localGovernmentStats[lgIndex].totalMembers++;
          if (user.formSubmissions.length > 0) {
            localGovernmentStats[lgIndex].submittedForms++;
          }
        }
      }
    });

    return NextResponse.json(localGovernmentStats);
  } catch (error) {
    console.error('Error fetching local government statistics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 