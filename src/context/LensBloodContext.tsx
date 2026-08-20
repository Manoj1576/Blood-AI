import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  BloodRequest, 
  Donor, 
  DonorResponse, 
  DonorStatus,
  UserRole, 
  NavTab, 
  BloodGroup,
  UrgencyLevel 
} from '../types';

interface DuplicateDetectionResult {
  isDuplicate: boolean;
  existingRequest: BloodRequest;
  pendingFormData: any;
}

interface LensBloodContextType {
  requests: BloodRequest[];
  activeRequestId: string;
  setActiveRequestId: (id: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  donors: Donor[];
  currentUser: {
    id: string;
    name: string;
    phone: string;
    bloodGroup: BloodGroup;
    location: string;
    isAvailable: boolean;
    fatigueAlert: boolean;
  };
  duplicateWarning: DuplicateDetectionResult | null;
  setDuplicateWarning: (val: DuplicateDetectionResult | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Core Actions
  createBloodRequest: (data: {
    patientName: string;
    bloodGroup: BloodGroup;
    unitsRequired: number;
    hospital: string;
    location: string;
    requiredBy: string;
    urgency: UrgencyLevel;
    requesterName?: string;
    requesterPhone?: string;
  }, forceCreate?: boolean) => string | null;
  
  joinExistingRequest: (requestId: string) => void;
  respondToEmergency: (requestId: string, donorData: {
    name: string;
    phone: string;
    bloodGroup: BloodGroup;
    location: string;
    isCommunity?: boolean;
  }) => void;
  
  toggleDonorAvailability: (available: boolean) => void;
  activateCommunitySos: (requestId: string) => void;
  simulatePrimaryUnavailable: (requestId: string) => void;
  activateAiRecommendation: (requestId: string) => void;
  confirmHospitalArrival: (requestId: string, donorId: string) => void;
  confirmHospitalDonation: (requestId: string, donorId: string) => void;
  
  // Demo Helpers
  loadDemoScenario: (scenario: 1 | 2 | 3) => void;
}

const initialDonors: Donor[] = [
  {
    id: 'd-1',
    name: 'Arun Kumar',
    phone: '+91 98765 43210',
    bloodGroup: 'B-',
    location: 'Trichy Main (2.4 km)',
    distanceKm: 2.4,
    isAvailable: true,
    verifiedPhone: true,
    verifiedProfile: true,
    totalResponses: 12,
    successfulArrivals: 10,
    cancellations: 2,
  },
  {
    id: 'd-2',
    name: 'Karthik Raja',
    phone: '+91 98765 12345',
    bloodGroup: 'B-',
    location: 'Srirangam (4.8 km)',
    distanceKm: 4.8,
    isAvailable: true,
    verifiedPhone: true,
    verifiedProfile: true,
    totalResponses: 8,
    successfulArrivals: 7,
    cancellations: 1,
  },
  {
    id: 'd-3',
    name: 'Priya Sundaram',
    phone: '+91 98400 99887',
    bloodGroup: 'B-',
    location: 'Thillai Nagar (7.1 km)',
    distanceKm: 7.1,
    isAvailable: true,
    verifiedPhone: true,
    verifiedProfile: true,
    totalResponses: 15,
    successfulArrivals: 14,
    cancellations: 0,
  },
  {
    id: 'd-4',
    name: 'Venkatesh S.',
    phone: '+91 97100 22334',
    bloodGroup: 'O-',
    location: 'Lalgudi (11.2 km)',
    distanceKm: 11.2,
    isAvailable: true,
    verifiedPhone: true,
    verifiedProfile: true,
    totalResponses: 5,
    successfulArrivals: 5,
    cancellations: 0,
  },
];

const initialRequests: BloodRequest[] = [
  {
    id: 'LB-2042',
    requesterName: 'Manoj',
    requesterPhone: '+91 99000 11223',
    patientName: 'Suresh Kumar',
    bloodGroup: 'B-',
    unitsRequired: 2,
    unitsCoordinated: 1,
    hospital: 'ABC Hospital',
    location: 'Trichy',
    requiredBy: 'Today, 6:00 PM',
    urgency: 'Critical',
    status: 'Partially Fulfilled',
    createdAt: '10 mins ago',
    communitySosActivated: false,
    communitySosUrl: 'https://lensblood.app/sos/LB-2042',
    duplicateCount: 0,
    confidenceScore: 82,
    timeline: {
      requestCreated: true,
      donorsSearched: true,
      donorsNotified: true,
      donorResponded: true,
      primaryConfirmed: true,
      backupStandby: true,
      donorTravelling: true,
      donorArrived: false,
      hospitalConfirmation: false,
      fulfilled: false,
    },
    aiRecommendation: {
      title: 'AI COORDINATION ASSISTANT',
      description: 'Current situation: Only 1 of 2 required units is coordinated.',
      actions: [
        'Expand donor search radius from 5 km to 15 km',
        'Activate Community SOS link for wider WhatsApp broadcast',
        'Keep backup donor (Karthik) active on standby'
      ],
      executed: false,
    },
    responses: [
      {
        id: 'resp-1',
        requestId: 'LB-2042',
        donorId: 'd-1',
        donorName: 'Arun Kumar',
        donorPhone: '+91 98765 43210',
        bloodGroup: 'B-',
        location: 'Trichy (2.4 km)',
        distanceKm: 2.4,
        status: 'Travelling',
        isBackup: false,
        isCommunityDonor: false,
        createdAt: '5 mins ago',
      },
      {
        id: 'resp-2',
        requestId: 'LB-2042',
        donorId: 'd-2',
        donorName: 'Karthik Raja',
        donorPhone: '+91 98765 12345',
        bloodGroup: 'B-',
        location: 'Srirangam (4.8 km)',
        distanceKm: 4.8,
        status: 'Standby',
        isBackup: true,
        isCommunityDonor: false,
        createdAt: '4 mins ago',
      },
      {
        id: 'resp-3',
        requestId: 'LB-2042',
        donorId: 'd-3',
        donorName: 'Priya Sundaram',
        donorPhone: '+91 98400 99887',
        bloodGroup: 'B-',
        location: 'Thillai Nagar (7.1 km)',
        distanceKm: 7.1,
        status: 'Notified',
        isBackup: false,
        isCommunityDonor: false,
        createdAt: '10 mins ago',
      }
    ]
  },
  {
    id: 'LB-2043',
    requesterName: 'Renu Devi',
    requesterPhone: '+91 94433 88776',
    patientName: 'Anitha Devi',
    bloodGroup: 'AB-',
    unitsRequired: 2,
    unitsCoordinated: 0,
    hospital: 'City Medical Centre',
    location: 'Trichy',
    requiredBy: 'Today, 8:30 PM',
    urgency: 'Critical',
    status: 'Active',
    createdAt: '25 mins ago',
    communitySosActivated: false,
    communitySosUrl: 'https://lensblood.app/sos/LB-2043',
    duplicateCount: 0,
    confidenceScore: 35,
    timeline: {
      requestCreated: true,
      donorsSearched: true,
      donorsNotified: false,
      donorResponded: false,
      primaryConfirmed: false,
      backupStandby: false,
      donorTravelling: false,
      donorArrived: false,
      hospitalConfirmation: false,
      fulfilled: false,
    },
    aiRecommendation: {
      title: 'LOW RESPONSE PROBABILITY',
      description: 'No sufficient registered donors are currently available nearby for AB- (Rare group).',
      actions: [
        'Activate Community SOS immediately',
        'Share public live emergency link to WhatsApp groups',
        'Notify emergency regional blood network'
      ],
      executed: false,
    },
    responses: []
  }
];

const LensBloodContext = createContext<LensBloodContextType | undefined>(undefined);

export const LensBloodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('lensblood_requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });
  
  const [donors] = useState<Donor[]>(() => {
    const saved = localStorage.getItem('lensblood_donors');
    return saved ? JSON.parse(saved) : initialDonors;
  });

  const [activeRequestId, setActiveRequestId] = useState<string>('LB-2042');
  const [currentRole, setCurrentRole] = useState<UserRole>('requester');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateDetectionResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState({
    id: 'd-1',
    name: 'Arun Kumar',
    phone: '+91 98765 43210',
    bloodGroup: 'B-' as BloodGroup,
    location: 'Trichy Main',
    isAvailable: true,
    fatigueAlert: true,
  });

  useEffect(() => {
    localStorage.setItem('lensblood_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('lensblood_donors', JSON.stringify(donors));
  }, [donors]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const createBloodRequest = (
    data: {
      patientName: string;
      bloodGroup: BloodGroup;
      unitsRequired: number;
      hospital: string;
      location: string;
      requiredBy: string;
      urgency: UrgencyLevel;
      requesterName?: string;
      requesterPhone?: string;
    },
    forceCreate = false
  ): string | null => {
    if (!forceCreate) {
      const match = requests.find(r => 
        r.bloodGroup === data.bloodGroup && 
        r.hospital.toLowerCase().includes(data.hospital.toLowerCase())
      );
      if (match) {
        setDuplicateWarning({
          isDuplicate: true,
          existingRequest: match,
          pendingFormData: data
        });
        return null;
      }
    }

    const nextIdNum = 2044 + requests.length;
    const newId = `LB-${nextIdNum}`;
    const newReq: BloodRequest = {
      id: newId,
      requesterName: data.requesterName || 'Manoj',
      requesterPhone: data.requesterPhone || '+91 99000 11223',
      patientName: data.patientName,
      bloodGroup: data.bloodGroup,
      unitsRequired: data.unitsRequired,
      unitsCoordinated: 0,
      hospital: data.hospital,
      location: data.location,
      requiredBy: data.requiredBy,
      urgency: data.urgency,
      status: 'Active',
      createdAt: 'Just now',
      communitySosActivated: false,
      communitySosUrl: `https://lensblood.app/sos/${newId}`,
      duplicateCount: 0,
      confidenceScore: 65,
      timeline: {
        requestCreated: true,
        donorsSearched: true,
        donorsNotified: true,
        donorResponded: false,
        primaryConfirmed: false,
        backupStandby: false,
        donorTravelling: false,
        donorArrived: false,
        hospitalConfirmation: false,
        fulfilled: false,
      },
      aiRecommendation: {
        title: 'AI COORDINATION ASSISTANT',
        description: `Request created for ${data.unitsRequired} unit(s) of ${data.bloodGroup}.`,
        actions: [
          'Filter nearby registered donors',
          'Send instant emergency SMS / app alerts',
          'Prepare Community SOS if response is below 50%'
        ],
        executed: false
      },
      responses: []
    };

    setRequests(prev => [newReq, ...prev]);
    setActiveRequestId(newId);
    setActiveTab('tracker');
    showToast(`Emergency Blood Request ${newId} created successfully!`);
    return newId;
  };

  const joinExistingRequest = (requestId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          duplicateCount: (r.duplicateCount || 0) + 1,
          confidenceScore: Math.min(98, r.confidenceScore + 5)
        };
      }
      return r;
    }));
    setDuplicateWarning(null);
    setActiveRequestId(requestId);
    setActiveTab('tracker');
    showToast(`Attached report to existing emergency request ${requestId}.`);
  };

  const respondToEmergency = (
    requestId: string,
    donorData: {
      name: string;
      phone: string;
      bloodGroup: BloodGroup;
      location: string;
      isCommunity?: boolean;
    }
  ) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const hasPrimary = r.responses.some(resp => resp.status === 'Confirmed' || resp.status === 'Travelling');
        const isBackup = hasPrimary;
        const newResponse: DonorResponse = {
          id: `resp-${Date.now()}`,
          requestId,
          donorId: `d-${Date.now()}`,
          donorName: donorData.name,
          donorPhone: donorData.phone,
          bloodGroup: donorData.bloodGroup,
          location: donorData.location || 'Trichy (Nearby)',
          distanceKm: 3.2,
          status: isBackup ? 'Standby' : 'Confirmed',
          isBackup,
          isCommunityDonor: !!donorData.isCommunity,
          createdAt: 'Just now',
        };

        const updatedResponses = [...r.responses, newResponse];
        const confirmedCount = updatedResponses.filter(resp => 
          resp.status === 'Confirmed' || resp.status === 'Travelling' || resp.status === 'Arrived' || resp.status === 'Donated'
        ).length;

        const isFullyFulfilled = confirmedCount >= r.unitsRequired;

        return {
          ...r,
          unitsCoordinated: confirmedCount,
          status: isFullyFulfilled ? 'Fulfilled' : confirmedCount > 0 ? 'Partially Fulfilled' : r.status,
          confidenceScore: Math.min(99, r.confidenceScore + 20),
          timeline: {
            ...r.timeline,
            donorResponded: true,
            primaryConfirmed: true,
            backupStandby: isBackup || r.timeline.backupStandby,
            donorTravelling: !isBackup || r.timeline.donorTravelling,
          },
          responses: updatedResponses
        };
      }
      return r;
    }));

    showToast(`✓ Potential donor response submitted for ${requestId}`);
  };

  const toggleDonorAvailability = (available: boolean) => {
    setCurrentUser(prev => ({ ...prev, isAvailable: available }));
    showToast(available ? 'Emergency availability turned ON' : 'Emergency availability turned OFF');
  };

  const activateCommunitySos = (requestId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          communitySosActivated: true,
          confidenceScore: Math.min(95, r.confidenceScore + 15),
          aiRecommendation: r.aiRecommendation ? { ...r.aiRecommendation, executed: true } : null
        };
      }
      return r;
    }));
    showToast(`Community SOS activated for ${requestId}! Share link generated.`);
  };

  const simulatePrimaryUnavailable = (requestId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const primary = r.responses.find(resp => resp.status === 'Confirmed' || resp.status === 'Travelling');
        const backup = r.responses.find(resp => resp.isBackup || resp.status === 'Standby');

        if (!primary && !backup) return r;

        const updatedResponses = r.responses.map(resp => {
          if (resp.id === (primary?.id)) {
            return { ...resp, status: 'Unavailable' as DonorStatus, isBackup: false };
          }
          if (resp.id === (backup?.id)) {
            return { ...resp, status: 'Confirmed' as DonorStatus, isBackup: false };
          }
          return resp;
        });

        const newConfirmed = updatedResponses.filter(resp => 
          resp.status === 'Confirmed' || resp.status === 'Travelling' || resp.status === 'Arrived' || resp.status === 'Donated'
        ).length;

        return {
          ...r,
          unitsCoordinated: newConfirmed,
          responses: updatedResponses,
          timeline: {
            ...r.timeline,
            primaryConfirmed: true,
            backupStandby: false,
          }
        };
      }
      return r;
    }));

    showToast('⚠️ Primary donor unavailable. Backup donor automatically activated!');
  };

  const activateAiRecommendation = (requestId: string) => {
    activateCommunitySos(requestId);
  };

  const confirmHospitalArrival = (requestId: string, donorId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const updatedResponses = r.responses.map(resp => {
          if (resp.donorId === donorId || resp.id === donorId) {
            return { ...resp, status: 'Arrived' as DonorStatus };
          }
          return resp;
        });

        return {
          ...r,
          timeline: {
            ...r.timeline,
            donorArrived: true,
            hospitalConfirmation: true
          },
          responses: updatedResponses
        };
      }
      return r;
    }));
    showToast('Hospital confirmed donor arrival!');
  };

  const confirmHospitalDonation = (requestId: string, donorId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const updatedResponses = r.responses.map(resp => {
          if (resp.donorId === donorId || resp.id === donorId) {
            return { ...resp, status: 'Donated' as DonorStatus };
          }
          return resp;
        });

        const donatedCount = updatedResponses.filter(resp => resp.status === 'Donated').length;
        const isFullyFulfilled = donatedCount >= r.unitsRequired;

        return {
          ...r,
          status: isFullyFulfilled ? 'Fulfilled' : 'Partially Fulfilled',
          timeline: {
            ...r.timeline,
            fulfilled: isFullyFulfilled
          },
          responses: updatedResponses
        };
      }
      return r;
    }));
    showToast('Hospital confirmed donation status!');
  };

  const loadDemoScenario = (scenario: 1 | 2 | 3) => {
    if (scenario === 1) {
      setRequests(initialRequests);
      setActiveRequestId('LB-2042');
      setCurrentRole('requester');
      setActiveTab('tracker');
      showToast('Loaded Demo Scenario 1: Standard Request & Primary/Backup Flow (LB-2042)');
    } else if (scenario === 2) {
      setActiveRequestId('LB-2043');
      setCurrentRole('new_donor');
      setActiveTab('sos');
      showToast('Loaded Demo Scenario 2: Community SOS & Public Unregistered Donor (LB-2043)');
    } else if (scenario === 3) {
      setCurrentRole('requester');
      setActiveTab('create');
      showToast('Loaded Demo Scenario 3: Create duplicate request to see duplicate detection warning');
    }
  };

  return (
    <LensBloodContext.Provider value={{
      requests,
      activeRequestId,
      setActiveRequestId,
      currentRole,
      setCurrentRole,
      activeTab,
      setActiveTab,
      donors,
      currentUser,
      duplicateWarning,
      setDuplicateWarning,
      toastMessage,
      showToast,
      createBloodRequest,
      joinExistingRequest,
      respondToEmergency,
      toggleDonorAvailability,
      activateCommunitySos,
      simulatePrimaryUnavailable,
      activateAiRecommendation,
      confirmHospitalArrival,
      confirmHospitalDonation,
      loadDemoScenario
    }}>
      {children}
    </LensBloodContext.Provider>
  );
};

export const useLensBlood = () => {
  const context = useContext(LensBloodContext);
  if (!context) {
    throw new Error('useLensBlood must be used within a LensBloodProvider');
  }
  return context;
};
