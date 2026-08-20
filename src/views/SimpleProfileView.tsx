import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { ShieldCheck, RotateCcw } from 'lucide-react';

export const SimpleProfileView: React.FC = () => {
  const { currentUser, toggleDonorAvailability } = useLensBlood();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--emergency-red)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          fontSize: '1.5rem',
          fontWeight: 900
        }}>
          {currentUser.name.charAt(0)}
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{currentUser.name}</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {currentUser.phone} • {currentUser.location}
        </div>
        <div style={{ marginTop: '12px' }}>
          <span className="pill pill-red" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
            BLOOD GROUP: {currentUser.bloodGroup}
          </span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Emergency Donor Availability</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Receive live blood alert notifications nearby</div>
          </div>

          <button
            onClick={() => toggleDonorAvailability(!currentUser.isAvailable)}
            className={`pill ${currentUser.isAvailable ? 'pill-green' : 'pill-amber'}`}
            style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.85rem' }}
          >
            {currentUser.isAvailable ? '🟢 ON' : '⚪ OFF'}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="var(--primary-blue)" />
          MEDICAL DISCLAIMER & BOUNDARIES
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          LensBlood coordinates emergency blood search and donor availability. Medical eligibility, screening, blood grouping verification, and final donation approval remain strictly under the authority of authorized blood bank medical staff.
        </p>

        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ width: '100%', padding: '10px', fontSize: '0.82rem' }}
          >
            <RotateCcw size={14} /> [ Reset Application Data ]
          </button>
        </div>
      </div>

    </div>
  );
};
