'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { parse } from 'csv-parse/sync';

export default function AdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeForm, setActiveForm] = useState<'4A' | '4B' | 'NONE'>('NONE');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const text = await file.text();
      const records = parse(text, {
        columns: true,
        skip_empty_lines: true,
      });

      // Map CSV columns to expected API payload keys
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedRecords = records.map((record: any) => ({
        lastName: record['LAST NAME'], // Adjust 'LAST NAME' if your CSV header is different
        stateCode: record['STATECODE'], // Adjust 'STATE CODE' if your CSV header is different
      }));

      console.log('Formatted records:', formattedRecords);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: formattedRecords }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload data');
      }

      setSuccess('Data uploaded successfully');
      setFile(null);
    } catch  {
      setError('Failed to upload data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormStatusChange = async (formType: '4A' | '4B' | 'NONE') => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/form-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType }),
      });

      if (!response.ok) {
        throw new Error('Failed to update form status');
      }

      setActiveForm(formType);
      setSuccess('Form status updated successfully');
    } catch  {
      setError('Failed to update form status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Corp Members</h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mt-1 block w-full"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Form Status</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleFormStatusChange('4A')}
                disabled={loading}
                className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                  activeForm === '4A'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Form 4A
              </button>
              <button
                onClick={() => handleFormStatusChange('4B')}
                disabled={loading}
                className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                  activeForm === '4B'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Form 4B
              </button>
              <button
                onClick={() => handleFormStatusChange('NONE')}
                disabled={loading}
                className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                  activeForm === 'NONE'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                None
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            {success}
          </div>
        )}
      </div>
    </div>
  );
} 