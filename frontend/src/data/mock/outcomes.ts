import { EmploymentOutcome, FollowUp } from '../../types';

export const mockEmploymentOutcome: EmploymentOutcome = {
  id: 'out-001',
  beneficiaryId: 'ben-001',
  beneficiaryName: 'Rameshwar Shinde (रामेश्वर शिंदे)',
  employmentType: 'wage_employed',
  jobTitle: 'Solar Photovoltaic Installation Technician',
  employerOrEnterpriseName: 'MahaGreen Energy Solutions Pvt Ltd (Pune)',
  monthlyIncome: 18500,
  placementDistrict: 'Pune, Maharashtra',
  nsqfCertificateHeld: 'NSQF Level 3 Certified (Certificate ID: SCGJ/2026/0948)',
  placedDate: '2026-03-01',
  status: 'active',
  verificationSource: 'PM-AJAY District Verification & Employer EPFO Linkage'
};

export const mockFollowUps: FollowUp[] = [
  {
    id: 'fol-30d',
    beneficiaryId: 'ben-001',
    beneficiaryName: 'Rameshwar Shinde',
    milestone: '30_days',
    dueDate: '2026-03-31',
    completedDate: '2026-03-29',
    status: 'submitted',
    recordedVoiceText: 'मी आता पुण्यात सोलर पॅनल इंस्टॉलेशनचं काम करतो. दरमहा १८,५०० रुपये पगार वेळेवर मिळतो आणि कामामध्ये सुरक्षा उपकरणे दिली आहेत.',
    aiExtractedOutcome: {
      currentStatus: 'employed',
      incomeMaintained: true,
      jobSatisfactionRating: 5,
      needsUpskilling: false
    }
  },
  {
    id: 'fol-90d',
    beneficiaryId: 'ben-001',
    beneficiaryName: 'Rameshwar Shinde',
    milestone: '90_days',
    dueDate: '2026-05-30',
    status: 'pending'
  },
  {
    id: 'fol-180d',
    beneficiaryId: 'ben-001',
    beneficiaryName: 'Rameshwar Shinde',
    milestone: '180_days',
    dueDate: '2026-08-30',
    status: 'pending'
  }
];

export const mockMilestoneTimeline = [
  {
    milestone: 'Training Enrolled',
    date: 'Dec 2025',
    status: 'completed',
    description: '360 Hours Suryamitra Training at Govt ITI Aundh'
  },
  {
    milestone: 'NSQF Certification',
    date: 'Feb 2026',
    status: 'completed',
    description: 'Scored 84% in practical assessment; certificate awarded'
  },
  {
    milestone: 'Job Placement',
    date: '01 Mar 2026',
    status: 'completed',
    description: 'Joined MahaGreen Energy Solutions at ₹18,500/mo'
  },
  {
    milestone: '30-Day Follow-Up',
    date: '29 Mar 2026',
    status: 'completed',
    description: 'Voice check-in verified retention and salary credit'
  },
  {
    milestone: '90-Day Retention Audit',
    date: '30 May 2026',
    status: 'upcoming',
    description: 'Eligible for NSQF Level 4 upskilling voucher'
  }
];
