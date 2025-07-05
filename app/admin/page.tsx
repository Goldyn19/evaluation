'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { parse } from 'csv-parse/sync';
import PlatoonStats from '../components/PlatoonStats';
import Form4BStats from '../components/Form4BStats';

export default function AdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [activeForm, setActiveForm] = useState<'4A' | '4B' | 'NONE'>('NONE');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmationCode, setResetConfirmationCode] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

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
      setError('');
      setSuccess('');
      setUploadProgress(0);
      setTotalBatches(0);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      const text = await file.text();
      const records = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      // Map CSV headers to database field names
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedRecords = records.map((record: any) => ({
        stateCode: record['STATECODE'] ? String(record['STATECODE']).replace(/\//g, '') : '', // Ensure string and strip slashes
        lastName: record['LAST NAME'] || '', // Handle potentially missing last name
      }));

      const chunkSize = 100; // Define chunk size
      const totalRecords = mappedRecords.length;
      const numBatches = Math.ceil(totalRecords / chunkSize);
      setTotalBatches(numBatches);

      for (let i = 0; i < numBatches; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = mappedRecords.slice(start, end);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ records: chunk }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to upload chunk ${i + 1}`);
        }

        setUploadProgress(i + 1); // Update progress after each successful chunk
        await new Promise(resolve => setTimeout(resolve, 200)); // Small delay between chunks
      }

      setSuccess(`Successfully uploaded ${totalRecords} corps members.`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(`Upload failed: ${err.message || 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
      setUploadProgress(0); // Reset progress on completion or error
      setTotalBatches(0); // Reset total batches
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

  const handleReset = async () => {
    if (!resetConfirmationCode.trim()) {
      setError('Please enter the confirmation code');
      return;
    }

    setResetLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmationCode: resetConfirmationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset database');
      }

      setSuccess(data.message || 'Database reset successfully');
      setShowResetModal(false);
      setResetConfirmationCode('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset database. Please try again.';
      setError(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h2>
        </div>

        {/* Platoon Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PlatoonStats />
        </div>

        {/* Form4B Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Form4BStats />
        </div>

        {/* Existing Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label htmlFor="csv-upload" className="block text-sm font-medium text-gray-700">
              Upload Corps Members CSV
            </label>
            <div className="mt-1 flex items-center">
              <input
                id="csv-upload"
                name="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
              />
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {uploadProgress > 0 && totalBatches > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Uploading batch {uploadProgress} of {totalBatches}...
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(uploadProgress / totalBatches) * 100}%` }}></div>
                </div>
              </div>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Form Status</h3>
            <p className="text-sm text-gray-600">Select which form should be active for submissions.</p>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="formStatus"
                  value="4A"
                  checked={activeForm === '4A'}
                  onChange={() => handleFormStatusChange('4A')}
                />
                <span className="ml-2 text-gray-700">Form 4A</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="formStatus"
                  value="4B"
                  checked={activeForm === '4B'}
                  onChange={() => handleFormStatusChange('4B')}
                />
                <span className="ml-2 text-gray-700">Form 4B</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="formStatus"
                  value="NONE"
                  checked={activeForm === 'NONE'}
                  onChange={() => handleFormStatusChange('NONE')}
                />
                <span className="ml-2 text-gray-700">None</span>
              </label>
            </div>
          </div>

          {/* Reset Database Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <h3 className="text-lg leading-6 font-medium text-red-900">Danger Zone</h3>
              <p className="text-sm text-gray-600">Reset the database to clear all users and form submissions. This action cannot be undone.</p>
              <button
                onClick={() => setShowResetModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reset Database
              </button>
            </div>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Database Reset</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will permanently delete all users (except admins) and all form submissions. 
                  This action cannot be undone.
                </p>
                <div className="mb-4">
                  <label htmlFor="confirmation-code" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter confirmation code: <strong>RESET2024</strong>
                  </label>
                  <input
                    id="confirmation-code"
                    type="text"
                    value={resetConfirmationCode}
                    onChange={(e) => setResetConfirmationCode(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter RESET2024"
                  />
                </div>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      setShowResetModal(false);
                      setResetConfirmationCode('');
                      setError('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={resetLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {resetLoading ? 'Resetting...' : 'Reset Database'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 