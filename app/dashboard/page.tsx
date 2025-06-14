'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form4A from '../components/forms/Form4A';
// import Form4B from '../components/forms/Form4B';
import Image from 'next/image';

interface FormStatus {
  formType: string;
  isActive: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<FormStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  console.log(error);
  useEffect(() => {
    const fetchFormStatus = async () => {
      try {
        const response = await fetch('/api/forms/status');
        if (!response.ok) {
          throw new Error('Failed to fetch form status');
        }
        const data = await response.json();
        setFormStatus(data);
      } catch {
        setError('Failed to load form status');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchFormStatus();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  const activeForm = formStatus.find((form) => form.isActive);
  const formType = activeForm?.formType || '4A';
  const isFormActive = !!activeForm;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4]">
      {/* Welcome message */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {session?.user?.lastName}
        </h1>
      </div>
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[320px] md:min-h-[350px] bg-green-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ny.png"
            alt="NYSC Hero Background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-green-900 opacity-70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full pt-8">
          <Image
            src="/NYSC-LOGO-removebg-preview.png"
            alt="NYSC Logo"
            width={90}
            height={90}
            className="mb-4"
            priority
          />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide">FORM {formType}</h2>
        </div>
        {/* <div className="hidden md:block absolute z-10 right-0 bottom-0 h-full max-h-[350px] w-auto">
          <Image
            src="/ny.png"
            alt="NYSC Illustration"
            width={350}
            height={350}
            className="object-contain h-full w-auto"
            priority
          />
        </div> */}
      </section>
      {/* Form or Closed Message */}
      <main className="flex-1 w-full bg-[#F4F6F4] py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 min-h-[120px] flex items-center justify-center">
            {isFormActive ? (
              <div className="w-full">
                <Form4A />
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="bg-blue-100 text-blue-900 px-6 py-4 rounded shadow w-full max-w-lg text-center font-semibold text-lg">
                  FORM 4A CLOSED
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#14261C] text-white py-6 mt-8 w-full">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          Babs Animashaun Rd, Surulere 101241, Lagos | Phone: <strong>+234 703 798 6020</strong> | Email: nyscevaluationlagos@gmail.com
        </div>
      </footer>
    </div>
  );
} 