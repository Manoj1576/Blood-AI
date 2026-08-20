import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { 
  Heart, 
  ShieldCheck, 
  Bell, 
  AlertTriangle, 
  Flag, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { 
    currentUser, 
    toggleDonorAvailability, 
    requests, 
    respondToEmergency, 
    setActiveRequestId, 
    setActiveTab 
  } = useLensBlood();

  const matchingRequests = requests.filter(r => r.bloodGroup === currentUser.bloodGroup || r.bloodGroup === 'B-' || r.bloodGroup === 'AB-');

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Good morning, {currentUser.name}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Group <strong>{currentUser.bloodGroup}</strong> • Registered Donor • {currentUser.location}
          </p>
        </div>

        {/* Availability Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 18px',
          borderRadius: '12px',
          background: currentUser.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: currentUser.isAvailable ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>AVAILABLE FOR EMERGENCY ALERTS:</span>
          <button
            onClick={() => toggleDonorAvailability(!currentUser.isAvailable)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: currentUser.isAvailable ? 'var(--success-green)' : 'rgba(255,255,255,0.2)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {currentUser.isAvailable ? '🟢 ON' : '⚪ OFF'}
          </button>
        </div>
      </div>

      {/* Donor Fatigue Alert Banner */}
      {currentUser.fatigueAlert && (
        <div style={{
          padding: '14px 20px',
          borderRadius: '10px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px',
          fontSize: '0.88rem'
        }}>
          <Bell size={20} color="var(--primary-blue)" />
          <div>
            <strong>Donor Fatigue Protection Active:</strong> You have received several recent emergency alerts. Non-critical notifications are automatically reduced to protect donor availability.
          </div>
        </div>
      )}

      {/* Main Grid: Active Emergency Alerts vs Operational Trust Signals */}
      <div className="grid-2" style={{ marginBottom: '32px' }}>
        
        {/* Left Column: Nearby Emergencies */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={18} color="var(--emergency-red)" />
            NEARBY EMERGENCY ALERTS ({matchingRequests.length})
          </h2>

          {!currentUser.isAvailable ? (
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Emergency availability is currently set to OFF. Turn ON availability to receive live emergency alerts nearby.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matchingRequests.map(r => (
                <div key={r.id} className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-emergency">EMERGENCY #{r.id}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 2.4 km away</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    {r.bloodGroup} Blood ({r.unitsRequired} Units Required)
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    🏥 {r.hospital}, {r.location} • Required by: {r.requiredBy}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn btn-emergency"
                      onClick={() => {
                        respondToEmergency(r.id, {
                          name: currentUser.name,
                          phone: currentUser.phone,
                          bloodGroup: currentUser.bloodGroup,
                          location: currentUser.location,
                          isCommunity: false
                        });
                        setActiveRequestId(r.id);
                        setActiveTab('tracker');
                      }}
                      style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
                    >
                      <Heart size={16} />
                      [ I CAN HELP ]
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setActiveRequestId(r.id);
                        setActiveTab('tracker');
                      }}
                      style={{ padding: '10px', fontSize: '0.88rem' }}
                    >
                      [ VIEW TRACKER ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Donor Trust Signals & Safety */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Trust Signals Panel */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--success-green)" />
              DONOR OPERATIONAL TRUST PROFILE
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399' }}>
                <CheckCircle2 size={16} />
                <span>✓ Phone Verified (+91 98765 43210)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399' }}>
                <CheckCircle2 size={16} />
                <span>✓ Identity & Profile Verified</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>12</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Responses</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success-green)' }}>10</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Arrivals</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--warning-amber)' }}>2</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cancellations</div>
              </div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ℹ️ Does not imply medical eligibility. Screening & blood testing are conducted solely at authorized hospital blood centres.
            </div>
          </div>

          {/* Safety & Report Warning Box */}
          <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FBBF24', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
              <AlertTriangle size={18} />
              DONOR SAFETY WARNING
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
              ⚠️ <strong>NEVER PAY A DONOR DIRECTLY.</strong> LensBlood strictly does not facilitate donor compensation or monetary requests.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => alert('Report User submitted. Our safety team will review this donor profile.')}
                style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}
              >
                <Flag size={14} />
                [ REPORT USER ]
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => alert('Report Request submitted. Our safety team will verify emergency legitimacy.')}
                style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}
              >
                <Flag size={14} />
                [ REPORT REQUEST ]
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
