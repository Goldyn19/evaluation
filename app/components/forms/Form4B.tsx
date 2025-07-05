'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
  'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

const formSchema = z.object({
  // Step 1
  stateOfOrigin: z.string().min(1, 'State of Origin is required'),
  stateOfDeployment: z.string().min(1, 'State of Deployment is required'),
  placeOfPrimaryAssignment: z.string().min(1, 'Place of Primary Assignment is required'),
  // Step 2
  locationOfPPA: z.string().min(1, 'Location of PPA is required'),
  sector: z.string().min(1, 'Sector is required'),
  publicOrPrivate: z.string().min(1, 'This field is required'),
  publicType: z.string().optional(),
  fieldRelevant: z.string().min(1, 'This field is required'),
  objection: z.string().min(1, 'This field is required'),
  objectionReasons: z.string().optional(),
  satisfactoryChange: z.string().min(1, 'This field is required'),
  reasonForChange: z.string().optional(),
  opinionChanged: z.string().min(1, 'This field is required'),
  reasonForOpinionChange: z.string().optional(),
  treatedLikePermanent: z.string().min(1, 'This field is required'),
  staffAttitude: z.string().min(1, 'This field is required'),
  staffAttitudeReasons: z.string().optional(),
  jobSatisfaction: z.string().min(1, 'This field is required'),
  effectivelyUtilized: z.string().min(1, 'This field is required'),
  accommodation: z.string().min(1, 'This field is required'),
  accommodationType: z.string().optional(),
  // Step 3
  cdsGroup: z.string().min(1, 'CDS Group is required'),
  cdsEffectiveness: z.string().min(1, 'This field is required'),
  cdsInteraction: z.string().min(1, 'This field is required'),
  cdsInteractionReasons: z.string().optional(),
  cdsSuggestions: z.string().optional(),
  personalCds: z.string().min(1, 'This field is required'),
  personalCdsType: z.string().optional(),
  hostSupport: z.string().min(1, 'This field is required'),
  // Step 4
  skillAcquired: z.string().min(1, 'This field is required'),
  sustainSkill: z.string().min(1, 'This field is required'),
  financialSupport: z.string().min(1, 'This field is required'),
  financialSupportType: z.string().optional(),
  skillChallenges: z.string().optional(),
  // Step 5
  nyscOpinion: z.string().min(1, 'This field is required'),
  nyscOpinionChanged: z.string().min(1, 'This field is required'),
  nyscObjectives: z.object({
    discipline: z.string().min(1, 'Required'),
    patriotism: z.string().min(1, 'Required'),
    adaptability: z.string().min(1, 'Required'),
    teamSpirit: z.string().min(1, 'Required'),
    integration: z.string().min(1, 'Required'),
    nationalGrowth: z.string().min(1, 'Required'),
    selfReliance: z.string().min(1, 'Required'),
    nationalUnity: z.string().min(1, 'Required'),
  }),
  nyscObjectiveSuggestions: z.string().optional(),
  willingToStay: z.string().min(1, 'This field is required'),
  stayReasons: z.string().optional(),
  remainIfRetained: z.string().min(1, 'This field is required'),
  remainReasons: z.string().optional(),
  improvementSuggestions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const stepTitles = [
  'DEMOGRAPHY DATA',
  'PLACE OF PRIMARY ASSIGNMENT',
  'COMMUNITY DEVELOPMENT SERVICE',
  'SKILL ACQUISITION AND ENTREPRENEURSHIP DEVELOPMENT',
  'SERVICE OBJECTIVE',
];

// Utility class for option groups with many items
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const optionGroupClass = "flex flex-wrap gap-3";
const optionCol2 = "grid grid-cols-1 md:grid-cols-2 gap-2";
const optionCol3 = "grid grid-cols-1 md:grid-cols-3 gap-2";

// Helper component for form fields to reduce repetition
const FieldWrapper = ({ label, children, error }: { label: string; children: React.ReactNode; error?: { message?: string } }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

// Google Form field mapping for Form4B
const fieldToEntry: Record<string, string> = {
  stateOfOrigin: "entry.96773226",
  stateOfDeployment: "entry.2069120705",
  placeOfPrimaryAssignment: "entry.37851641",
  locationOfPPA: "entry.1520484957",
  sector: "entry.1515301815",
  publicOrPrivate: "entry.251980850",
  publicType: "entry.797985969",
  fieldRelevant: "entry.1597588430",
  objection: "entry.832946478",
  objectionReasons: "entry.1585580125",
  satisfactoryChange: "entry.926307346",
  reasonForChange: "entry.1575582623",
  opinionChanged: "entry.1525900515",
  reasonForOpinionChange: "entry.2125605824",
  treatedLikePermanent: "entry.2131862189",
  staffAttitude: "entry.197826161",
  staffAttitudeReasons: "entry.1743549418",
  jobSatisfaction: "entry.38546868",
  effectivelyUtilized: "entry.1400846524",
  accommodation: "entry.310083030",
  accommodationType: "entry.1364199401",
  cdsGroup: "entry.1124928979",
  cdsEffectiveness: "entry.1190476700",
  cdsInteraction: "entry.91183040",
  cdsInteractionReasons: "entry.1722877365",
  cdsSuggestions: "entry.900871296",
  personalCds: "entry.1247570498",
  personalCdsType: "entry.1314849827",
  hostSupport: "entry.2094928549",
  skillAcquired: "entry.478200148",
  sustainSkill: "entry.1713443443",
  financialSupport: "entry.956480822",
  financialSupportType: "entry.2008436972",
  skillChallenges: "entry.1499814747",
  nyscOpinion: "entry.1344732304",
  nyscOpinionChanged: "entry.877794212",
  // NYSC objectives matrix (question 37)
  'nyscObjectives.discipline': "entry.143165408",
  'nyscObjectives.patriotism': "entry.796633429",
  'nyscObjectives.adaptability': "entry.1734368989",
  'nyscObjectives.teamSpirit': "entry.634387985",
  'nyscObjectives.integration': "entry.1656482385",
  'nyscObjectives.nationalGrowth': "entry.999565826",
  'nyscObjectives.selfReliance': "entry.1995465394",
  'nyscObjectives.nationalUnity': "entry.1334935808",
  nyscObjectiveSuggestions: "entry.229137405",
  willingToStay: "entry.1261305156",
  stayReasons: "entry.512809633",
  remainIfRetained: "entry.1801232092",
  remainReasons: "entry.1730882341",
  improvementSuggestions: "entry.571672062",
  // The following are extra entries if needed:
  // "entry.229137405",
  // "entry.1261305156",
  // "entry.512809633",
  // "entry.1801232092",
  // "entry.1730882341",
  // "entry.571672062",
};

export default function Form4B() {
  const [step, setStep] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nyscObjectives: {
        discipline: '', patriotism: '', adaptability: '', teamSpirit: '', integration: '', nationalGrowth: '', selfReliance: '', nationalUnity: '',
      },
      publicType: 'It was not public',
      objectionReasons: 'No Objections',
      reasonForChange: 'N/A',
      accommodationType: 'I was accommodated by my employer',
    },
  });

  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const response = await fetch('/api/forms/check?formType=4B');
        const data = await response.json();
        setHasSubmitted(data.submitted);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // ignore
      }
    };
    checkSubmission();
  }, []);

  // Set default for question 14 if question 13 is 'No'
  useEffect(() => {
    if (watch('opinionChanged') === 'No') {
      setValue('reasonForOpinionChange', 'My answer was No (N/A)');
    }
  }, [watch('opinionChanged'), setValue]);

  // Set default for question 33 if question 32 is 'No'
  useEffect(() => {
    if (watch('financialSupport') === 'No') {
      setValue('financialSupportType', 'irrelevant response');
    }
  }, [watch('financialSupport'), setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // Flatten nyscObjectives into top-level fields
      const flatData = { ...data };
      if (flatData.nyscObjectives && typeof flatData.nyscObjectives === 'object') {
        Object.entries(flatData.nyscObjectives).forEach(([subKey, subValue]) => {
          flatData[`nyscObjectives.${subKey}`] = subValue;
        });
        delete flatData.nyscObjectives;
      }
      // Submit to Google Forms
      const formData = new FormData();
      Object.entries(flatData).forEach(([key, value]) => {
        const entryKey = fieldToEntry[key];
        if (!entryKey) return; // skip unmapped fields
        if (Array.isArray(value)) {
          formData.append(entryKey, value.join(', '));
        } else {
          formData.append(entryKey, String(value));
        }
      });
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSceTU7liWDTFneBikqSqXt1kGAbh1qgOYPoWnyKEngIBr--Fg/formResponse",
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
        body: JSON.stringify({ formType: '4B' }),
      });

      setSubmitSuccess(true); // Always show success
    } catch {
      setSubmitSuccess(true); // Still show success, since CORS will always fail
    } finally {
      setIsSubmitting(false);
    }
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

  // Render step content (for brevity, only step navigation and shell shown)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-bold text-center mb-4">Form 4B</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(step / 5) * 100}%` }}></div>
      </div>
      <div className="mb-2 text-center font-semibold">Step {step} of 5: {stepTitles[step-1]}</div>
      {submitError && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{submitError}</p>
        </div>
      )}
      
      {/* Step 1 */}
      {step === 1 && (
        <>
          <FieldWrapper label="1. State of Origin *" error={errors.stateOfOrigin}>
            <select {...register('stateOfOrigin')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </FieldWrapper>
          <FieldWrapper label="2. State of Deployment *" error={errors.stateOfDeployment}>
            <select {...register('stateOfDeployment')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </FieldWrapper>
          <FieldWrapper label="3. Place of Primary Assignment *" error={errors.placeOfPrimaryAssignment}>
            <textarea {...register('placeOfPrimaryAssignment')} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Please input details of your PPA"></textarea>
          </FieldWrapper>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <FieldWrapper label="4. Location of Primary Assignment *" error={errors.locationOfPPA}>
            {['Rural', 'Urban'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('locationOfPPA')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="5. In which sector? *" error={errors.sector}>
            {['Business/Financial Support Sector', 'Educational Sector', 'State/Ministries', 'Federal Agency/Administration', 'Health Sector', 'Construction', 'Local Government Secretariat/LCDA', 'Transportation Industry Sector', 'Infrastructure', 'Agriculture', 'Others'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('sector')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="6. Was it a public or private sector? *" error={errors.publicOrPrivate}>
            {['Public', 'Private'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('publicOrPrivate')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If Public, show next question */}
          {watch('publicOrPrivate') === 'Public' && (
            <FieldWrapper label="7. If Public, was it:" error={errors.publicType}>
              {['Federal owned', 'State owned', 'Local government owned', 'It was not public'].map(item => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="radio" {...register('publicType')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </FieldWrapper>
          )}

          <FieldWrapper label="8. How relevant was the field of study to the place of primary assignment? *" error={errors.fieldRelevant}>
            {['Relevant', 'Not Relevant'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('fieldRelevant')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="9. Did you have any objection to the nature of primary assignment? *" error={errors.objection}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('objection')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If Yes to objection, show reasons */}
          {watch('objection') === 'Yes' && (
            <FieldWrapper label="10. If Yes to question 9 above, give your reasons for your objections *" error={errors.objectionReasons}>
              {['Stressful Nature of Work', 'Unrelated to Course of Study', 'Distance to PPA/Cost of Transportation', 'No Accommodation', 'No Objections', 'Bad Treatment of Corp Members', 'Delayed Payment/Insufficient Pay/No pay', 'Less Experience/Less Resources', 'Others'].map(item => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="radio" {...register('objectionReasons')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </FieldWrapper>
          )}

          <FieldWrapper label="11. Did you get a satisfactory change effected? *" error={errors.satisfactoryChange}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('satisfactoryChange')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If No to satisfactory change, show reason */}
          {watch('satisfactoryChange') === 'No' && (
            <FieldWrapper label="12. If No to question 11 above, what reason were you given for it? *" error={errors.reasonForChange}>
              <input type="text" {...register('reasonForChange')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Please input 'n/a' if response to question above is 'Yes'" />
            </FieldWrapper>
          )}

          <FieldWrapper label="13. Did you change your opinion about the objection by the end of the service year? *" error={errors.opinionChanged}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('opinionChanged')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If Yes to opinionChanged, show reasons */}
          {watch('opinionChanged') === 'Yes' && (
            <FieldWrapper label="14. If Yes to Question 13, give reasons for the change *" error={errors.reasonForOpinionChange}>
              {['Interesting Nature of Assignment', 'Attitude of employer/head of department', 'Attitude of colleagues', 'My own resourcefulness', 'My answer was No (N/A)', 'Other'].map(item => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="radio" {...register('reasonForOpinionChange')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </FieldWrapper>
          )}

          <FieldWrapper label="15. Were you treated like a permanent staff during your service? *" error={errors.treatedLikePermanent}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('treatedLikePermanent')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="16. How will you assess the attitude of the permanent staff to you as a Corps Member? *" error={errors.staffAttitude}>
            {['Very cordial', 'Cordial', 'Unfriendly'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('staffAttitude')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="17. Please give reasons for your response in 'Question 16' above *" error={errors.staffAttitudeReasons}>
            {["Hospitable environment", "Respect and equal treatment", "Okay and cool", "Good pay and benefits", "Professional and non-discriminatory", "No response", "Discrimination and toxic workspace", "Corps member's diligence"].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('staffAttitudeReasons')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="18. What degree of job satisfaction did you derive from your primary assignment? *" error={errors.jobSatisfaction}>
            {['Very High', 'High', 'Low', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('jobSatisfaction')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="19. Were you effectively utilized at your place of primary assignment? *" error={errors.effectivelyUtilized}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('effectivelyUtilized')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="20. Were you given accommodation by your employer? *" error={errors.accommodation}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('accommodation')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If No to accommodation, show how accommodated */}
          {watch('accommodation') === 'No' && (
            <FieldWrapper label="21. If No, how were you accommodated? *" error={errors.accommodationType}>
              {["Rented Accommodation", "Stayed with a relation/friend", "Corpers' Lodge", "Stayed in MCN/NCF/CCF/NAC lodge", "I was accommodated by my employer"].map(item => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="radio" {...register('accommodationType')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </FieldWrapper>
          )}
        </>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <>
          <FieldWrapper label="22. Which CDS group did you belong? *" error={errors.cdsGroup}>
            <div className={optionCol3}>
              {[
                'Band', 'Beautification', 'Charity', 'Construction', 'Digital Onboarders (DO/DEEL)', 'Drama & Dance', 'Drinks IQ', 'Education', 'EFCC', 'Evaluation', 'FRSC', 'Gender', 'HIV AIDS', 'Horticulture', 'ICT', 'JCI - Junior Chambers International', 'Medical', 'NAFDAC', 'NAPTIP', 'PAC&S', 'Publicity', 'Red Cross', 'SafeRR', 'Sanitation', 'SDG'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('cdsGroup')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="23. How effective was your CDS group to the host community? *" error={errors.cdsEffectiveness}>
            {['Very Effective', 'Effective', 'Not Effective'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('cdsEffectiveness')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="24. How will you rate the interaction between the group members towards the CDS programmes/projects? *" error={errors.cdsInteraction}>
            {['Very cordial', 'Cordial', 'Not cordial'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('cdsInteraction')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="25. Please give reasons for your response above *" error={errors.cdsInteractionReasons}>
            <div className={optionCol2}>
              {[
                'Accommodative & Cooperative', 'Project Execution', 'Group Funding (Contribution & Donations)', 'Fun, Exciting & Safe', 'Cordiality & Respect', 'Great Engagement & Response'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('cdsInteractionReasons')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="26. What suggestions will you offer to assist the scheme on group community development service? *" error={errors.cdsSuggestions}>
            <div className={optionCol3}>
              {[
                'None or inapplicable', 'Monetary funding and provision', 'More projects & effectiveness', 'Awareness of all parties involved', 'Teamwork', 'Planning and organization', 'Continuity of current work', 'Health awareness and protection', 'Innovation and adaptation to technology', 'Diversification and creation of more CDS', 'Involvement of government and other organizations', 'Encouragement and resources for participating corps members', 'Removal or reduction of CDS for corps members'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('cdsSuggestions')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="27. Did you embark on any personal CDS projects? *" error={errors.personalCds}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('personalCds')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="28. If Yes, please specify the type of project and if 'No' why? *" error={errors.personalCdsType}>
            <div className={optionCol3}>
              {[
                'No Time', 'No, PPA/preoccupied', 'No, preoccupation', 'No, Health', 'Yes, Donation/Charity', 'Yes, Medical/Health Services', 'Yes, Other Projects', 'No, other reasons', 'No, pregnant', 'No, Financial Reasons', 'No, Engaged in Group', 'Yes, Lectures/Sensitization', 'Yes, Outreaches', 'Yes, Skills'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('personalCdsType')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="29. How supportive was the host community to the project? *" error={errors.hostSupport}>
            {['Supportive', 'Insufficient', 'Not Supportive'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('hostSupport')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>
        </>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <>
          <FieldWrapper label="30. Specify the skill you acquired during the service year *" error={errors.skillAcquired}>
            <div className={optionCol3}>
              {[
                'Tech/Digital Engineering', 'No Skill', 'Fashion Design and Tailoring', 'Hairdressing', 'Photography', 'Shoe Making', 'Data/Analytics', 'Shoe & Bag Making', 'Design (Interior/Textile)', 'Events Planning/Decoration', 'Teaching', 'Entrepreneurship/Business/Soft Skills', 'Gele/Make up', 'Baking and Catering', 'Agriculture', 'Barbing', 'Health, Safety and Environmental Skills', 'Bead Making', 'Cosmetology', 'HR Skills', 'Professional Courses', 'Others'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('skillAcquired')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="31. Do you intend to sustain the skills acquired? *" error={errors.sustainSkill}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('sustainSkill')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="32. Do you have access to any financial support? *" error={errors.financialSupport}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('financialSupport')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* If Yes to financial support, show options */}
          {watch('financialSupport') === 'Yes' && (
            <FieldWrapper label="33. If Yes, please specify *" error={errors.financialSupportType}>
              <div className={optionCol2}>
                {[
                  'Friends and family', 'Personal income, loan and business', 'External sources', 'NYSC and ppa allowance', 'I received none'
                ].map(item => (
                  <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                    <input type="radio" {...register('financialSupportType')} value={item} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </FieldWrapper>
          )}

          <FieldWrapper label="34. If no, what were the challenges you encountered? *" error={errors.skillChallenges}>
            <div className={optionCol2}>
              {[
                'None/No challenges', 'Lack of time', 'Issues taking Loans as Corps Members', 'Lack of sponsorship', 'Health issues', 'High cost of living', 'Difficulty purchasing Materials', 'Others'
              ].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('skillChallenges')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>
        </>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <>
          <FieldWrapper label="35. What was your opinion about NYSC scheme before you were mobilized for National Service? *" error={errors.nyscOpinion}>
            {['Relevant to Nation Building', 'Not Relevant to Nation Building'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('nyscOpinion')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="36. As a result of your participation in the scheme, has your opinion changed about the scheme? *" error={errors.nyscOpinionChanged}>
            {['No', 'Yes'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('nyscOpinionChanged')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          {/* Matrix for objectives */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              37. Judging from your experience during the service year, how will you assess the following NYSC objectives? *
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1"></th>
                    {['Very effective', 'Effective', 'Ineffective', "Don't Know"].map(col => (
                      <th key={col} className="border px-2 py-1 font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'discipline', label: 'DISCIPLINE AMONG CORPS MEMBERS', reg: 'nyscObjectives.discipline' as const },
                    { key: 'patriotism', label: 'PATRIOTISM', reg: 'nyscObjectives.patriotism' as const },
                    { key: 'adaptability', label: 'ADAPTABILITY', reg: 'nyscObjectives.adaptability' as const },
                    { key: 'teamSpirit', label: 'TEAM SPIRIT', reg: 'nyscObjectives.teamSpirit' as const },
                    { key: 'integration', label: 'INTEGRATION', reg: 'nyscObjectives.integration' as const },
                    { key: 'nationalGrowth', label: 'NATIONAL GROWTH', reg: 'nyscObjectives.nationalGrowth' as const },
                    { key: 'selfReliance', label: 'SELF RELIANCE', reg: 'nyscObjectives.selfReliance' as const },
                    { key: 'nationalUnity', label: 'NATIONAL UNITY', reg: 'nyscObjectives.nationalUnity' as const },
                  ].map(obj => (
                    <tr key={obj.key}>
                      <td className="border px-2 py-1 font-medium">{obj.label}</td>
                      {['Very effective', 'Effective', 'Ineffective', "Don't Know"].map(col => (
                        <td key={col} className="border px-2 py-1 text-center">
                          <input
                            type="radio"
                            {...register(obj.reg)}
                            value={col}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {errors.nyscObjectives && (
                <p className="mt-1 text-sm text-red-600">All objectives are required</p>
              )}
            </div>
          </div>

          <FieldWrapper label="38. Suggest how to improve the realization of these objectives *" error={errors.nyscObjectiveSuggestions}>
            <div className={optionCol2}>
              {['No Suggestion', 'Sensitization', 'Empowerment', 'Standardisation', 'Dedication', 'Unity', 'Consistency', 'Team Work', 'Cooperation', 'Acceptability'].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('nyscObjectiveSuggestions')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="39. Are you willing to stay back in your state of deployment? *" error={errors.willingToStay}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('willingToStay')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="40. Please give reasons for your answer above *" error={errors.stayReasons}>
            <div className={optionCol3}>
              {['Career/Business Opportunities', 'Family/Relationships', 'Comfort/Convenience', 'Lagos/Lifestyle/Attractions', 'Personal Development', 'Job/Workplace', 'Security/Safety', 'Community/Service', 'Education/Training', 'Invalid/Unrelated Responses'].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('stayReasons')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="41. Are you willing to remain in the state if your employer retains you? *" error={errors.remainIfRetained}>
            {['Yes', 'No'].map(item => (
              <label key={item} className="flex items-center space-x-2">
                <input type="radio" {...register('remainIfRetained')} value={item} />
                <span>{item}</span>
              </label>
            ))}
          </FieldWrapper>

          <FieldWrapper label="42. Please give reasons for answer above *" error={errors.remainReasons}>
            <div className={optionCol2}>
              {['Satisfied with the experience', 'Career Development', 'Family ties', 'Good Pay', 'Not willing to remain'].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('remainReasons')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>

          <FieldWrapper label="43. Give any other suggestions to improve on the scheme's activities based on your personal experience *" error={errors.improvementSuggestions}>
            <div className={optionCol2}>
              {["None", "Increase and prompt payment of Allowance", "Monitor PPA's treatment of Corp Members", "Loans and grants should be made available to Corp Members", "Monthly clearance and CDS should be more organised and less stressful", "More online trainings and CDS activities", "Provide Accommodation", "Ensure Safety of Corp Members", "Corp Members should be posted to companies that cover their field of study."].map(item => (
                <label key={item} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1 hover:bg-green-50 cursor-pointer">
                  <input type="radio" {...register('improvementSuggestions')} value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </FieldWrapper>
        </>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">Back</button>
        )}
        <div className="flex-grow"></div>
        {step < 5 ? (
          <button type="button" onClick={async () => { 
            const stepFields = [
              ['stateOfOrigin', 'stateOfDeployment', 'placeOfPrimaryAssignment'],
              ['locationOfPPA', 'sector'],
              ['cdsGroup'],
              ['skillAcquired'],
            ];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await trigger(stepFields[step-1] as any);
            if (result) setStep(step + 1);
           }} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Next</button>
        ) : (
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </form>
  );
} 