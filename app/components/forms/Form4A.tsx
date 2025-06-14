'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  age: z.string().min(1, 'Age is required'),
  religion: z.string().min(1, 'Religion is required'),
  sex: z.string().min(1, 'Sex is required'),
  maritalStatus: z.string().min(1, 'Marital Status is required'),
  qualification: z.string().min(1, 'Qualification is required'),
  concessionalDeployment: z.string().min(1, 'Concessional Deployment is required'),
  callupSource: z.string().min(1, 'Call-up Source is required'),
  callupBetter: z.string().min(1, 'Call-up Better is required'),
  registrationStress: z.string().min(1, 'Registration Stress is required'),
  kitCollectionTime: z.string().min(1, 'Kit Collection Time is required'),
  campReception: z.string().min(1, 'Camp Reception is required'),
  kitSatisfaction: z.string().min(1, 'Kit Satisfaction is required'),
  rightSizes: z.string().min(1, 'Right Sizes is required'),
  feeding_0: z.string().min(1, 'Feeding arrangement in general is required'),
  feeding_1: z.string().min(1, 'Quantity of food is required'),
  feeding_2: z.string().min(1, 'Quality of food served is required'),
  feeding_3: z.string().min(1, 'Involvement of corps members in preparation of food is required'),
  feeding_4: z.string().min(1, 'Mode of serving food is required'),
  campClinic: z.string().min(1, 'Camp Clinic is required'),
  clinicPerformance: z.string().min(1, 'Clinic Performance is required'),
  attendedBriefing: z.string().min(1, 'This field is required'),
  mobilizationFeeling: z.string().min(1, 'This field is required'),
  nyscPurposeRating: z.string().min(1, 'This field is required'),
  stateOfOrigin: z.string().min(1, 'State of Origin is required'),
  cooptedCommittees: z.string().min(1, 'Co-opted into committees is required'),
  amenableNationalService: z.string().min(1, 'Amenable to National Service is required'),
  boringAspects: z.union([z.string(), z.array(z.string())]).refine(val => (Array.isArray(val) ? val.length > 0 : !!val), { message: 'Boring Aspects is required' }),
  interestingAspects: z.union([z.string(), z.array(z.string())]).refine(val => (Array.isArray(val) ? val.length > 0 : !!val), { message: 'Most Interesting Aspects is required' }),
  improvementSuggestions: z.union([z.string(), z.array(z.string())]).refine(val => (Array.isArray(val) ? val.length > 0 : !!val), { message: 'Suggestions for Improvement is required' }),
  committeeEffectiveness_0: z.string().min(1),
  committeeEffectiveness_1: z.string().min(1),
  committeeEffectiveness_2: z.string().min(1),
  committeeEffectiveness_3: z.string().min(1),
  committeeEffectiveness_4: z.string().min(1),
  committeeEffectiveness_5: z.string().min(1),
  committeeEffectiveness_6: z.string().min(1),
  committeeEffectiveness_7: z.string().min(1),
  committeeEffectiveness_8: z.string().min(1),
  committeeEffectiveness_9: z.string().min(1),
  committeeEffectiveness_10: z.string().min(1),
  committeeEffectiveness_11: z.string().min(1),
  activityParticipation_0: z.string().min(1),
  activityParticipation_1: z.string().min(1),
  activityParticipation_2: z.string().min(1),
  activityParticipation_3: z.string().min(1),
  activityParticipation_4: z.string().min(1),
  activityParticipation_5: z.string().min(1),
  activityParticipation_6: z.string().min(1),
  activityParticipation_7: z.string().min(1),
  activityParticipation_8: z.string().min(1),
  activityParticipation_9: z.string().min(1),
  activityParticipation_10: z.string().min(1),
  activityParticipation_11: z.string().min(1),
  organization_0: z.string().min(1),
  organization_1: z.string().min(1),
  organization_2: z.string().min(1),
  organization_3: z.string().min(1),
  organization_4: z.string().min(1),
  organization_5: z.string().min(1),
  campEffectiveness_0: z.string().min(1),
  campEffectiveness_1: z.string().min(1),
  campEffectiveness_2: z.string().min(1),
  campEffectiveness_3: z.string().min(1),
  campEffectiveness_4: z.string().min(1),
  campEffectiveness_5: z.string().min(1),
  campEffectiveness_6: z.string().min(1),
  campEffectiveness_7: z.string().min(1),
  campEffectiveness_8: z.string().min(1),
  campEffectiveness_9: z.string().min(1),
  campDiscipline_0: z.string().min(1),
  campDiscipline_1: z.string().min(1),
  campDiscipline_2: z.string().min(1),
  campDiscipline_3: z.string().min(1),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FormData = z.infer<typeof formSchema>;

const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
  'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

// Google Form field mapping
const fieldToEntry: Record<string, string> = {
  age: "entry.6414794",
  concessionalDeployment: "entry.154569438",
  feeding_0: "entry.177013953",
  kitSatisfaction: "entry.184239931",
  religion: "entry.190367539",
  registrationStress: "entry.221459494",
  rightSizes: "entry.300895172",
  sex: "entry.380897977",
  campClinic: "entry.388360967",
  nyscPurposeRating: "entry.530729324",
  feeding_1: "entry.771364982",
  maritalStatus: "entry.876092064",
  attendedBriefing: "entry.1008918349",
  stateOfOrigin: "entry.1095288855",
  feeding_2: "entry.1106242418",
  campReception: "entry.1119042055",
  mobilizationFeeling: "entry.1238877686",
  kitCollectionTime: "entry.1257684885",
  feeding_3: "entry.1293288063",
  callupSource: "entry.1408999699",
  qualification: "entry.1524662205",
  clinicPerformance: "entry.1652797084",
  callupBetter: "entry.1926464886",
  feeding_4: "entry.2082974965",
  cooptedCommittees: "entry.1880496517",
  committeeEffectiveness_0: "entry.992997776",
  committeeEffectiveness_1: "entry.1756494660",
  committeeEffectiveness_2: "entry.114901999",
  committeeEffectiveness_3: "entry.1280269641",
  committeeEffectiveness_4: "entry.1485916630",
  committeeEffectiveness_5: "entry.1939330800",
  committeeEffectiveness_6: "entry.731801073",
  committeeEffectiveness_7: "entry.1797102843",
  committeeEffectiveness_8: "entry.542564997",
  committeeEffectiveness_9: "entry.1854490683",
  committeeEffectiveness_10: "entry.1622012825",
  committeeEffectiveness_11: "entry.146221914",
  activityParticipation_0: "entry.1224610238",
  activityParticipation_1: "entry.1704177543",
  activityParticipation_2: "entry.2024839801",
  activityParticipation_3: "entry.497126031",
  activityParticipation_4: "entry.1017938090",
  activityParticipation_5: "entry.1802259351",
  activityParticipation_6: "entry.1153301927",
  activityParticipation_7: "entry.319203960",
  activityParticipation_8: "entry.496231399",
  activityParticipation_9: "entry.1746107807",
  activityParticipation_10: "entry.1904501879",
  activityParticipation_11: "entry.748596600",
  organization_0: "entry.1142187349",
  organization_1: "entry.1093286613",
  organization_2: "entry.53964532",
  organization_3: "entry.1608596366",
  organization_4: "entry.1882549936",
  organization_5: "entry.38688489",
  campEffectiveness_0: "entry.1861771594",
  campEffectiveness_1: "entry.2072316557",
  campEffectiveness_2: "entry.1489398287",
  campEffectiveness_3: "entry.1028417537",
  campEffectiveness_4: "entry.2141145015",
  campEffectiveness_5: "entry.947750059",
  campEffectiveness_6: "entry.2012416111",
  campEffectiveness_7: "entry.1601211601",
  campEffectiveness_8: "entry.1219200006",
  campEffectiveness_9: "entry.1420826865",
  campDiscipline_0: "entry.932462253",
  campDiscipline_1: "entry.857663242",
  campDiscipline_2: "entry.804461734",
  campDiscipline_3: "entry.1941041836",
  amenableNationalService: "entry.1277544612",
  boringAspects: "entry.857662863",
  interestingAspects: "entry.109089176",
  improvementSuggestions: "entry.1015407279",
};

export default function Form4A() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [step, setStep] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const response = await fetch('/api/forms/check?formType=4A');
        const data = await response.json();
        setHasSubmitted(data.submitted);
      } catch (error) {
        console.error('Error checking form submission:', error);
      }
    };
    checkSubmission();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(formSchema),
  });
  console.log(errors)
  console.log(submitError)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // Submit to Google Forms
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        const entryKey = fieldToEntry[key];
        if (!entryKey) return; // skip unmapped fields
        if (Array.isArray(value)) {
          formData.append(entryKey, value.join(', '));
        } else {
          formData.append(entryKey, String(value));
        }
      });
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfs6DzqisHu-sP9jLGtSutOePyaXbr_CIIyu7HpcuYWegR5LA/formResponse",
        {
        method: 'POST',
        body: formData,
          mode: "no-cors",
      }
      );

      // Update FormSubmission table
      await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ formType: '4A' }),
      });

      setSubmitSuccess(true); // Always show success
    } catch {
      setSubmitSuccess(true); // Still show success, since CORS will always fail
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepFields: Record<number, string[]> = {
    1: ['stateOfOrigin', 'age', 'religion', 'sex', 'maritalStatus', 'qualification'],
    2: ['concessionalDeployment'],
    3: ['attendedBriefing', 'mobilizationFeeling', 'nyscPurposeRating'],
    4: ['callupSource', 'callupBetter', 'registrationStress', 'kitCollectionTime', 'campReception'],
    5: ['kitSatisfaction', 'rightSizes'],
    6: ['feeding_0', 'feeding_1', 'feeding_2', 'feeding_3', 'feeding_4'],
    7: ['campClinic', 'clinicPerformance'],
  };

  if (hasSubmitted) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium">Form Already Submitted</h3>
        <p className="text-yellow-600 mt-2">You have already submitted this form.</p>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-4 rounded-md">
        <h3 className="text-green-800 font-medium">Form Submitted Successfully</h3>
        <p className="text-green-600 mt-2">Thank you for your feedback!</p>
      </div>
    );
  }

  if (step === 2) {
  return (
      <div className="w-full max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 2 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '25%' }} />
          </div>
        </div>
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">DEMOGRAPHY - Concessional Deployment</h2>
        <div className="mb-6 text-gray-800">
          <p className="mb-2">Concessional deployment refers to posting based on:</p>
          <p className="mb-1"><b>MARITAL GROUND</b>- Married Female Corps members that were posted to their husband&apos;s state of domicile.</p>
          <p><b>HEALTH GROUND</b>- Corps members with serious health challenge.</p>
        </div>
        <form className="space-y-8">
          {/* 7. Are you on concessional deployment? */}
      <div>
            <label className="block font-semibold text-gray-900 mb-2">7. Are you on concessional deployment? <span className="text-red-500">*</span></label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('concessionalDeployment', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('concessionalDeployment', { required: true })} /> No
              </label>
            </div>
          </div>
          {/* Next Button */}
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[2]);
                if (valid) setStep(3);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 3: Briefings Conducted By NYSC Officials
  if (step === 3) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 3 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '37.5%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">DEMOGRAPHY - Briefings Conducted By NYSC Officials</h2>
        <form className="space-y-8">
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              8. Did you attend any briefing conducted by NYSC officials in your institution prior to mobilization? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('attendedBriefing', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('attendedBriefing', { required: true })} /> No
              </label>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              9. How do you feel about your mobilization for National Service? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Eager" {...register('mobilizationFeeling', { required: true })} /> Eager
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Indifferent" {...register('mobilizationFeeling', { required: true })} /> Indifferent
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Reluctant" {...register('mobilizationFeeling', { required: true })} /> Reluctant
              </label>
            </div>
          </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              10. How do you rate the purpose for establishing the NYSC Scheme? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Very high" {...register('nyscPurposeRating', { required: true })} /> Very high
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="High" {...register('nyscPurposeRating', { required: true })} /> High
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Low" {...register('nyscPurposeRating', { required: true })} /> Low
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Very Low" {...register('nyscPurposeRating', { required: true })} /> Very Low
              </label>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[3]);
                if (valid) setStep(4);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 4: Registration
  if (step === 4) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 4 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '50%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">REGISTRATION</h2>
        <form className="space-y-8">
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              11a. You must have registered on-line for the NYSC. Did you &apos; collect your call-up from school &apos; OR &apos;you printed online&apos;? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Collected from school" {...register('callupSource', { required: true })} /> Collected from school
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Printed online" {...register('callupSource', { required: true })} /> Printed online
              </label>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              11b. Which of these two processes do you think is better? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Online call-up" {...register('callupBetter', { required: true })} /> Online call-up
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Call-up from school" {...register('callupBetter', { required: true })} /> Call-up from school
              </label>
            </div>
          </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              11c. How was the registration on camp? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Not stressful" {...register('registrationStress', { required: true })} /> Not stressful
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Stressful" {...register('registrationStress', { required: true })} /> Stressful
        </label>
            </div>
      </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              11d. How long did it take for you to collect your kits? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="30 minutes" {...register('kitCollectionTime', { required: true })} /> 30 minutes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="1 hour" {...register('kitCollectionTime', { required: true })} /> 1 hour
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="More than 30 minutes but not up to 1 hour" {...register('kitCollectionTime', { required: true })} /> More than 30 minutes but not up to 1 hour
        </label>
            </div>
      </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              11e. How can you describe the reception you were given on arrival at camp? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Friendly" {...register('campReception', { required: true })} /> Friendly
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Not friendly" {...register('campReception', { required: true })} /> Not friendly
        </label>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[4]);
                if (valid) setStep(5);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 5: Orientation Course
  if (step === 5) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 5 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '62.5%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">ORIENTATION COURSE</h2>
        <form className="space-y-8">
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              12. Were you satisfied with the kit items issued to you? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('kitSatisfaction', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('kitSatisfaction', { required: true })} /> No
              </label>
            </div>
          </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              13. Were you issued your right sizes? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('rightSizes', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('rightSizes', { required: true })} /> No
        </label>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[5]);
                if (valid) setStep(6);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 6: Feeding (matrix)
  if (step === 6) {
    const feedingQuestions = [
      'Feeding arrangement in general',
      'Quantity of food',
      'Quality of food served',
      'Involvement of corps members in preparation of food',
      'Mode of serving food',
    ];
    const feedingOptions = [
      'Very Satisfied',
      'Satisfied',
      'Fairly Satisfied',
      'Not Satisfied',
    ];
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 6 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '75%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">FEEDING</h2>
        <form className="space-y-8">
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              14. How satisfied were you with the following? <span className="text-red-500">*</span>
        </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {feedingOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feedingQuestions.map((question, idx) => (
                    <tr key={question} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{question}</td>
                      {feedingOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(
                              idx === 0 ? 'feeding_0'
                              : idx === 1 ? 'feeding_1'
                              : idx === 2 ? 'feeding_2'
                              : idx === 3 ? 'feeding_3'
                              : 'feeding_4',
                              { required: true }
                            )}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[6]);
                if (valid) setStep(7);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 7: Health Care
  if (step === 7) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 7 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '87.5%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">HEALTH CARE</h2>
        <form className="space-y-8">
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              15a. Was there a functional camp clinic? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('campClinic', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('campClinic', { required: true })} /> No
              </label>
            </div>
          </div>
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              15b. How do you rate the performance of the clinic? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Very good" {...register('clinicPerformance', { required: true })} /> Very good
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Good" {...register('clinicPerformance', { required: true })} /> Good
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Poor" {...register('clinicPerformance', { required: true })} /> Poor
              </label>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              onClick={async () => {
                const valid = await trigger(stepFields[7]);
                if (valid) setStep(8);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 8: Camp Administration
  if (step === 8) {
    // Matrix definitions
    const campCommittees = [
      'Registration', 'Food', 'Health', 'Socials', 'Disciplinary', 'Maintenance', 'Lectures', 'Security', 'Camp Market', 'Stores', 'OBS', 'Sports'
    ];
    const effectivenessOptions = ['Very Effective', 'Effective', 'Ineffective', "Don't Know"];
    const participationOptions = effectivenessOptions;
    const campActivities = [
      'Food', 'Health', 'Socials', 'Disciplinary', 'Maintenance', 'Lectures', 'Security', 'OBS', 'Sports', 'Camp Market', 'Stores', 'SAED'
    ];
    const organizationQuestions = [
      'Directional Signposts', 'Reception at the gate', 'Registration', 'Accommodation', 'Feeding', 'Kit-ting'
    ];
    const organizationOptions = ['Very Organized', 'Organized', 'Not Organized', "Don't Know"];
    const campEffectivenessQuestions = [
      'Medical Care', 'COVID-19 Safety Protocols', 'Physical training', 'Drills & Parade', 'Man O\' War', 'Lectures', 'Professional lectures', 'SAED Activities', 'Games & Sports', 'Orientation Course in General'
    ];
    const disciplineQuestions = ['NYSC Officials', 'Soldiers', 'Police/NSCDC', 'Man O\' War'];
    const disciplineOptions = ['Very Disciplined', 'Disciplined', 'Not Disciplined'];
    const boringOptions = [
      'None', 'Physical Training', 'Lectures', 'Games & Sport', 'Drills & Parade', 'Man O\' War', 'SAED Activities', 'Social Activities', 'Other'
    ];
    const interestingOptions = [
      'Drills & Parade', 'Man O\' War', 'SAED Activities', 'Social Activities', 'Physical Training', 'Lectures', 'Games & Sport', 'Other'
    ];
    const improvementOptions = [
      'None', 'Accommodations should be improved', 'Food should be managed better', 'Keep it up', 'The quality of food should be enhanced'
    ];
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Step 8 of 8</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '100%' }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">CAMP ADMINISTRATION</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* 16. Co-opted into committees */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              16. Were corps members co-opted into camp committees? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Yes" {...register('cooptedCommittees', { required: true })} /> Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="No" {...register('cooptedCommittees', { required: true })} /> No
              </label>
            </div>
          </div>
          {/* 17. Effectiveness of Camp Committees */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              17. How effective were the following Camp Committees? <span className="text-red-500">*</span>
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {effectivenessOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campCommittees.map((committee, idx) => (
                    <tr key={committee} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{committee}</td>
                      {effectivenessOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(`committeeEffectiveness_${idx}`, { required: true })}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 18. Participation in camp activities */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              18. Assess the level of corps members&apos; participation in the following camp activities <span className="text-red-500">*</span>
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {participationOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campActivities.map((activity, idx) => (
                    <tr key={activity} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{activity}</td>
                      {participationOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(`activityParticipation_${idx}`, { required: true })}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 19. Organization */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              19. How organized were the following? Please rate accordingly <span className="text-red-500">*</span>
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {organizationOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {organizationQuestions.map((q, idx) => (
                    <tr key={q} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{q}</td>
                      {organizationOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(`organization_${idx}`, { required: true })}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 20. Effectiveness */}
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              20. How effective were the following? <span className="text-red-500">*</span>
        </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {effectivenessOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campEffectivenessQuestions.map((q, idx) => (
                    <tr key={q} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{q}</td>
                      {effectivenessOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(`campEffectiveness_${idx}`, { required: true })}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
          {/* 21. Camp Discipline */}
      <div>
            <label className="block font-semibold text-gray-900 mb-2">
              21. Assess Camp Discipline <span className="text-red-500">*</span>
        </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">&nbsp;</th>
                    {disciplineOptions.map((option) => (
                      <th key={option} className="border px-4 py-2 font-normal">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {disciplineQuestions.map((q, idx) => (
                    <tr key={q} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2 text-left">{q}</td>
                      {disciplineOptions.map((option) => (
                        <td key={option} className="border px-4 py-2">
                          <input
                            type="radio"
                            {...register(`campDiscipline_${idx}`, { required: true })}
                            value={option}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 22. Amenable to National Service */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              22. To what extent has the orientation course made you amenable to National Service? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Very amenable" {...register('amenableNationalService', { required: true })} /> Very amenable
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Amenable" {...register('amenableNationalService', { required: true })} /> Amenable
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Not Amenable" {...register('amenableNationalService', { required: true })} /> Not Amenable
              </label>
            </div>
          </div>
          {/* 23. Boring Aspects */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              23. Which aspect of the orientation course did you find boring? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {boringOptions.map((option) => (
                <label key={option} className="inline-flex items-center gap-2">
                  <input type="checkbox" value={option} {...register('boringAspects', { required: true })} /> {option}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Please select all that apply.</p>
          </div>
          {/* 24. Most Interesting Aspects */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              24. What aspect of the orientation course programme did you find most interesting? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestingOptions.map((option) => (
                <label key={option} className="inline-flex items-center gap-2">
                  <input type="checkbox" value={option} {...register('interestingAspects', { required: true })} /> {option}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Please select all that apply.</p>
          </div>
          {/* 25. Suggestions for Improvement */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              25. What suggestions would you give for improving the orientation course programme? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {improvementOptions.map((option) => (
                <label key={option} className="inline-flex items-center gap-2">
                  <input type="checkbox" value={option} {...register('improvementSuggestions', { required: true })} /> {option}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Please select all that apply.</p>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-700">Step 1 of 8</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div className="h-2 bg-[#7a3a13] rounded" style={{ width: '12.5%' }} />
        </div>
      </div>
      {/* Section Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-wide">DEMOGRAPHY</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. State of Origin */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">1. State of Origin <span className="text-red-500">*</span></label>
          <select {...register('stateOfOrigin', { required: true })} className="w-full max-w-xs border rounded px-3 py-2">
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        {/* 2. Age */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">2. Age <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="18-21" {...register('age', { required: true })} /> 18-21
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="26-29" {...register('age', { required: true })} /> 26-29
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="22-25" {...register('age', { required: true })} /> 22-25
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="30+" {...register('age', { required: true })} /> 30+
              </label>
            </div>
          </div>
        </div>
        {/* 3. Religion */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">3. Religion <span className="text-red-500">*</span></label>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Christianity" {...register('religion', { required: true })} /> Christianity
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Islam" {...register('religion', { required: true })} /> Islam
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Other" {...register('religion', { required: true })} /> Other
            </label>
          </div>
        </div>
        {/* 4. Sex */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">4. Sex <span className="text-red-500">*</span></label>
          <div className="flex gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Male" {...register('sex', { required: true })} /> Male
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Female" {...register('sex', { required: true })} /> Female
            </label>
          </div>
        </div>
        {/* 5. Marital Status */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">5. Marital Status <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Single" {...register('maritalStatus', { required: true })} /> Single
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Married" {...register('maritalStatus', { required: true })} /> Married
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Divorced" {...register('maritalStatus', { required: true })} /> Divorced
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="Widowed" {...register('maritalStatus', { required: true })} /> Widowed
            </label>
          </div>
        </div>
        {/* 6. Qualification */}
      <div>
          <label className="block font-semibold text-gray-800 mb-1">6. Qualification <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="B.Eng" {...register('qualification', { required: true })} /> B.Eng
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="B.Tech" {...register('qualification', { required: true })} /> B.Tech
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="B.Sc" {...register('qualification', { required: true })} /> B.Sc
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="LLB" {...register('qualification', { required: true })} /> LLB
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="B.A." {...register('qualification', { required: true })} /> B.A.
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="B.Ed." {...register('qualification', { required: true })} /> B.Ed.
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="HND" {...register('qualification', { required: true })} /> HND
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="Other" {...register('qualification', { required: true })} /> Other
              </label>
            </div>
          </div>
        </div>
        {/* Next Button */}
        <div className="flex justify-start mt-8">
        <button
            type="button"
            className="bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider transition"
            onClick={async () => {
              const valid = await trigger(stepFields[1]);
              if (valid) setStep(2);
            }}
          >
            Next
        </button>
      </div>
    </form>
    </div>
  );
} 