import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { ChevronRight, Share2, Plus } from 'lucide-react';

export const SimpleRequestsView: React.FC = () => {
  const { requests, setActiveRequestId, setActiveTab } = useLensBlood();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>BLOOD REQUESTS</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Active emergency requests in your network
          </p>
        </div>

        <button
          className="btn btn-emergency"
          onClick={() => setActiveTab('home')}
          style={{ padding: '8px 14px', fontSize: '0.85rem', minHeight: '40px' }}
        >
          <Plus size={16} /> [ NEW SEARCH ]
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {requests.map(req => (
          <div key={req.id} className="card" style={{ borderLeft: '4px solid var(--emergency-red)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span className="pill pill-red">#{req.id}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                  {req.bloodGroup} Blood ({req.unitsRequired} Units)
                </h3>
              </div>

              <span className={`pill ${req.status === 'Fulfilled' ? 'pill-green' : 'pill-amber'}`}>
                {req.unitsCoordinated} / {req.unitsRequired} Coordinated
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              🏥 <strong>{req.hospital}</strong>, {req.location} • Patient: {req.patientName}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setActiveRequestId(req.id);
                  setActiveTab('tracker');
                }}
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
              >
                [ VIEW STATUS ] <ChevronRight size={16} />
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveRequestId(req.id);
                  setActiveTab('sos');
                }}
                style={{ padding: '10px', fontSize: '0.85rem' }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
