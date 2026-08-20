export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type UrgencyLevel = 'Critical' | 'Urgent' | 'Normal';

export type RequestStatus = 'Searching' | 'Active' | 'Partially Fulfilled' | 'Fulfilled' | 'Cancelled';

export type DonorStatus = 
  | 'Notified' 
  | 'Standby' 
  | 'Confirmed' 
  | 'Travelling' 
  | 'Arrived' 
  | 'Donated' 
  | 'Unavailable';

export interface Donor {
  id: string;
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
  location: string;
  distanceKm: number;
  isAvailable: boolean;
  verifiedPhone: boolean;
  verifiedProfile: boolean;
  totalResponses: number;
  successfulArrivals: number;
  cancellations: number;
}

export interface DonorResponse {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  bloodGroup: BloodGroup;
  location: string;
  distanceKm: number;
  status: DonorStatus;
  isBackup: boolean;
  isCommunityDonor: boolean;
  createdAt: string;
}

export interface BloodRequestTimeline {
  requestCreated: boolean;
  donorsSearched: boolean;
  donorsNotified: boolean;
  donorResponded: boolean;
  primaryConfirmed: boolean;
  backupStandby: boolean;
  donorTravelling: boolean;
  donorArrived: boolean;
  hospitalConfirmation: boolean;
  fulfilled: boolean;
}

export interface AiRecommendation {
  title: string;
  description: string;
  actions: string[];
  executed: boolean;
}

export interface BloodRequest {
  id: string; // e.g. 'LB-2042'
  requesterName: string;
  requesterPhone: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  unitsCoordinated: number;
  hospital: string;
  location: string;
  requiredBy: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  createdAt: string;
  communitySosActivated: boolean;
  communitySosUrl: string;
  duplicateCount: number;
  confidenceScore: number;
  timeline: BloodRequestTimeline;
  aiRecommendation: AiRecommendation | null;
  responses: DonorResponse[];
}

export type UserRole = 'requester' | 'donor' | 'new_donor' | 'hospital' | 'admin';

export type NavTab = 
  | 'home' 
  | 'requests' 
  | 'donors' 
  | 'hospital' 
  | 'profile'
  // Legacy alias support for context compatibility
  | 'overview' 
  | 'create' 
  | 'responses' 
  | 'tracker' 
  | 'sos' 
  | 'admin' 
  | 'settings';
