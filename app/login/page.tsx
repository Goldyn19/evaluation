'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLastName, setShowLastName] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const stateCode = formData.get('stateCode') as string;
    const lastName = formData.get('lastName') as string;

    try {
      const result = await signIn('credentials', {
        stateCode,
        lastName,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid state code or last name');
      } else {
        router.push('/');
      }
    } catch  {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ny.png"
          alt="NYSC Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900 opacity-70" />
      </div>
      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-5xl mx-auto min-h-screen items-center justify-center">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-8">
          <Image
            src="/NYSC-LOGO-removebg-preview.png"
            alt="NYSC Logo"
            width={250}
            height={250}
            className="mx-auto mb-6"
            priority
          />
          <form
            className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-green-900 mb-1">Log In</h2>
            </div>
            <div>
              <label htmlFor="stateCode" className="block text-sm font-medium text-green-900 mb-1">
                STATE CODE <span className="text-xs text-gray-500">e.g LA21C1234</span>
              </label>
              <input
                id="stateCode"
                name="stateCode"
                type="text"
                required
                className="block w-full rounded-md border border-green-700 px-3 py-2 text-green-900 focus:ring-2 focus:ring-green-600 focus:border-green-600 placeholder-gray-400"
                placeholder="Enter your state code"
              />
            </div>
            <div className="relative">
              <label htmlFor="lastName" className="block text-sm font-medium text-green-900 mb-1">
                LAST NAME <span className="text-xs text-gray-500">e.g AQUA</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type={showLastName ? 'text' : 'password'}
                required
                className="block w-full rounded-md border border-green-700 px-3 py-2 text-green-900 focus:ring-2 focus:ring-green-600 focus:border-green-600 placeholder-gray-400 pr-10"
                placeholder="Enter your last name"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-8 text-green-700 focus:outline-none"
                onClick={() => setShowLastName((v) => !v)}
                aria-label={showLastName ? 'Hide last name' : 'Show last name'}
              >
                {showLastName ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.402 3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z" /></svg>
                )}
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-semibold text-lg shadow-md transition-colors duration-200 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>

      </div>
      {/* Attribution (optional, bottom left) */}
      <div className="absolute left-2 bottom-2 z-20 text-xs text-white opacity-70">
        https://nyscevaluations.com.ng
      </div>
    </div>
  );
} 