'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  stateCode: z.string().min(1, 'State Code is required'),
  placeOfPrimaryAssignment: z.string().min(1, 'Place of Primary Assignment is required'),
  skillsAcquired: z.string().min(1, 'Please list the skills you acquired'),
  impactOnCommunity: z.string().min(1, 'Please describe your impact on the community'),
  personalGrowth: z.string().min(1, 'Please describe your personal growth'),
  futurePlans: z.string().min(1, 'Please describe your future plans'),
  overallExperience: z.string().min(1, 'Please rate your overall experience'),
  recommendation: z.string().min(1, 'Please provide your recommendation'),
  additionalComments: z.string().min(1, 'Please provide any additional comments'),
});

type FormData = z.infer<typeof formSchema>;

export default function Form4B() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Submit to Google Forms
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(process.env.NEXT_PUBLIC_FORM_4B_URL!, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
    } catch  {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-4 rounded-md">
        <h3 className="text-green-800 font-medium">Form Submitted Successfully</h3>
        <p className="text-green-600 mt-2">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">State Code</label>
        <input
          type="text"
          {...register('stateCode')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.stateCode && (
          <p className="mt-1 text-sm text-red-600">{errors.stateCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Place of Primary Assignment
        </label>
        <input
          type="text"
          {...register('placeOfPrimaryAssignment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.placeOfPrimaryAssignment && (
          <p className="mt-1 text-sm text-red-600">
            {errors.placeOfPrimaryAssignment.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Skills Acquired During Service
        </label>
        <textarea
          {...register('skillsAcquired')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="List the skills you acquired during your service year"
        />
        {errors.skillsAcquired && (
          <p className="mt-1 text-sm text-red-600">{errors.skillsAcquired.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Impact on Community
        </label>
        <textarea
          {...register('impactOnCommunity')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe your impact on the community during your service year"
        />
        {errors.impactOnCommunity && (
          <p className="mt-1 text-sm text-red-600">
            {errors.impactOnCommunity.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Personal Growth
        </label>
        <textarea
          {...register('personalGrowth')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe your personal growth during the service year"
        />
        {errors.personalGrowth && (
          <p className="mt-1 text-sm text-red-600">{errors.personalGrowth.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Future Plans
        </label>
        <textarea
          {...register('futurePlans')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe your plans after the service year"
        />
        {errors.futurePlans && (
          <p className="mt-1 text-sm text-red-600">{errors.futurePlans.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Overall Experience
        </label>
        <select
          {...register('overallExperience')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select rating</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
        {errors.overallExperience && (
          <p className="mt-1 text-sm text-red-600">
            {errors.overallExperience.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recommendation for Future Corp Members
        </label>
        <textarea
          {...register('recommendation')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="What would you recommend to future corp members?"
        />
        {errors.recommendation && (
          <p className="mt-1 text-sm text-red-600">{errors.recommendation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Comments
        </label>
        <textarea
          {...register('additionalComments')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Any additional comments or suggestions"
        />
        {errors.additionalComments && (
          <p className="mt-1 text-sm text-red-600">
            {errors.additionalComments.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{submitError}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </button>
      </div>
    </form>
  );
} 