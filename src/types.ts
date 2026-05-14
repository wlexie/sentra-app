export interface Quote {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string;
  campaignName: string;
  objective: string;
  deliverables: string;
  budgetEstimate: number;
  duration: string;
  targetAudience: string;
  aiAnalysis?: string;
  status: 'pending' | 'approved' | 'rejected' | 'modifying';
  createdBy: string;
  createdAt: any;
  updatedAt: any;
  [key: string]: any;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string;
  companyName: string;
  role: 'admin' | 'client';
}
