import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { ShieldAlert, HeartHandshake, Flag, Bell } from 'lucide-react';

export const SimpleDonorView: React.FC = () => {
  const { 
    currentUser, 
    toggleDonorAvailability, 
    requests, 
    respondToEmergency, 
    setActiveRequestId, 
    setActiveTab,
    showToast
  } = useLensBlood();

  const activeAlerts = requests.filter(r => r.status !== 'Fulfilled');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* DONOR HEADER & AVAILABILITY TOGGLE */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Hello, {currentUser.name}</h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Group <strong>{currentUser.bloodGroup}</strong> • Verified Donor • {currentUser.location}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>ALERTS:</span>
          <button
            onClick={() => toggleDonorAvailability(!currentUser.isAvailable)}
            className={`pill ${currentUser.isAvailable ? 'pill-green' : 'pill-amber'}`}
            style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            {currentUser.isAvailable ? '🟢 AVAILABLE' : '⚪ OFF'}
          </button>
        </div>
      </div>

      {/* DONOR FATIGUE ALERT */}
      {currentUser.fatigueAlert && (
        <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-blue-bg)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={18} color="var(--primary-blue)" />
          <span>Non-critical emergency alerts are reduced to protect donor availability.</span>
        </div>
      )}

      {/* 🚨 BLOOD NEEDED CARDS (ONE TAP RESPONSE) */}
      <h2 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert size={18} color="var(--emergency-red)" />
        LIVE EMERGENCY ALERTS
      </h2>

      {!currentUser.isAvailable ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
          You are currently marked as unavailable. Turn availability ON to receive local blood alerts.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeAlerts.map(req => (
            <div key={req.id} className="card" style={{ borderLeft: '4px solid var(--emergency-red)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="pill pill-red">🚨 BLOOD NEEDED</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 2.4 km away</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
                {req.bloodGroup} Blood • {req.unitsRequired} {req.unitsRequired === 1 ? 'Unit' : 'Units'}
              </h3>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                🏥 <strong>{req.hospital}</strong>, {req.location} • Required by: {req.requiredBy}
              </div>

              {/* ONE TAP RESPONSE BUTTONS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  className="btn btn-emergency"
                  onClick={() => {
                    respondToEmergency(req.id, {
                      name: currentUser.name,
                      phone: currentUser.phone,
                      bloodGroup: currentUser.bloodGroup,
                      location: currentUser.location,
                      isCommunity: false
                    });
                    setActiveRequestId(req.id);
                    setActiveTab('tracker');
                  }}
                >
                  <HeartHandshake size={18} />
                  [ I CAN DONATE ]
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    showToast('Response logged: Not available for this alert.');
                  }}
                >
                  [ NOT AVAILABLE ]
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAFETY WARNING */}
      <div className="card" style={{ background: 'var(--warning-amber-bg)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FBBF24', marginBottom: '4px' }}>
          ⚠️ DONOR SAFETY WARNING
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          NEVER PAY A DONOR DIRECTLY. LensBlood strictly does not facilitate donor compensation.
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => showToast('Report submitted for review.')}
            style={{ padding: '6px 12px', fontSize: '0.75rem', minHeight: '34px' }}
          >
            <Flag size={12} /> Report Request
          </button>
        </div>
      </div>

    </div>
  );
};
