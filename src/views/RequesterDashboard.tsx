import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { ShieldAlert, PlusCircle, Radio, Users, Share2 } from 'lucide-react';

export const RequesterDashboard: React.FC = () => {
  const { requests, setActiveRequestId, setActiveTab } = useLensBlood();

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>REQUESTER DASHBOARD</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Welcome back, Manoj. Manage active blood emergency requests & live donor response tracks.
          </p>
        </div>

        <button
          className="btn btn-emergency"
          onClick={() => setActiveTab('create')}
          style={{ padding: '12px 20px' }}
        >
          <PlusCircle size={18} />
          [ REQUEST BLOOD ]
        </button>
      </div>

      {/* Active Requests List */}
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert size={18} color="var(--emergency-red)" />
        ACTIVE EMERGENCIES ({requests.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {requests.map(r => (
          <div key={r.id} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span className="badge badge-emergency" style={{ fontSize: '0.85rem' }}>
                    #{r.id}
                  </span>
                  <span className={`badge ${r.status === 'Fulfilled' ? 'badge-success' : 'badge-warning'}`}>
                    {r.status.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  {r.bloodGroup} Blood • {r.unitsRequired} Units Required
                </h3>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  🏥 {r.hospital}, {r.location} • Required by: {r.requiredBy}
                </div>
              </div>

              {/* Progress Pill */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  COORDINATION PROGRESS
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  {r.unitsCoordinated} / {r.unitsRequired} Units
                </div>
              </div>
            </div>

            {/* Quick Status Badges */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '0.82rem', color: '#34D399' }}>
                🟢 {r.responses.filter(resp => resp.status === 'Confirmed' || resp.status === 'Travelling').length} Donor Confirmed
              </span>
              <span style={{ fontSize: '0.82rem', color: '#FBBF24' }}>
                🟡 {r.responses.filter(resp => resp.isBackup || resp.status === 'Standby').length} Backup Donor
              </span>
              {r.unitsCoordinated < r.unitsRequired && (
                <span style={{ fontSize: '0.82rem', color: '#F87171' }}>
                  🟠 {r.unitsRequired - r.unitsCoordinated} Unit Still Needed
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setActiveRequestId(r.id);
                  setActiveTab('tracker');
                }}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Radio size={16} />
                [ VIEW LIVE TRACKER ]
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveRequestId(r.id);
                  setActiveTab('sos');
                }}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Share2 size={16} />
                [ SHARE SOS LINK ]
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveRequestId(r.id);
                  setActiveTab('donors');
                }}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Users size={16} />
                [ VIEW DONORS ({r.responses.length}) ]
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
