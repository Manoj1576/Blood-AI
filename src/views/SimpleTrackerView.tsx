import React, { useState } from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { 
  CheckCircle2, 
  Share2, 
  Copy, 
  MessageSquare, 
  UserX
} from 'lucide-react';

export const SimpleTrackerView: React.FC = () => {
  const { 
    requests, 
    activeRequestId, 
    simulatePrimaryUnavailable, 
    activateCommunitySos, 
    showToast 
  } = useLensBlood();

  const req = requests.find(r => r.id === activeRequestId) || requests[0];
  const [copied, setCopied] = useState(false);

  if (!req) return <div style={{ padding: '24px', textAlign: 'center' }}>No active request found.</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(req.communitySosUrl);
    setCopied(true);
    showToast('Copied SOS share link!');
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryDonor = req.responses.find(r => !r.isBackup && (r.status === 'Confirmed' || r.status === 'Travelling' || r.status === 'Arrived' || r.status === 'Donated'));
  const backupDonor = req.responses.find(r => r.isBackup || r.status === 'Standby');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. SIMPLE HEADER BANNER */}
      <div className="card" style={{ borderLeft: '4px solid var(--emergency-red)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="pill pill-red">🚨 REQUEST #{req.id}</span>
              <span className={`pill ${req.status === 'Fulfilled' ? 'pill-green' : 'pill-amber'}`}>
                {req.status.toUpperCase()}
              </span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {req.bloodGroup} Blood • {req.unitsRequired} {req.unitsRequired === 1 ? 'Unit' : 'Units'} Needed
            </h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              🏥 <strong>{req.hospital}</strong>, {req.location} • Patient: {req.patientName}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>COORDINATED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              {req.unitsCoordinated} / {req.unitsRequired} Units
            </div>
          </div>
        </div>
      </div>

      {/* 2. SIMPLE STATUS PROGRESS LIST */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px' }}>
          REQUEST STATUS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#34D399', fontWeight: 700 }}>
            <CheckCircle2 size={18} />
            <span>✓ Request Created (#{req.id})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#34D399', fontWeight: 700 }}>
            <CheckCircle2 size={18} />
            <span>✓ Nearby Donors Notified ({req.responses.length} matches found)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: primaryDonor ? '#34D399' : 'var(--text-muted)', fontWeight: 700 }}>
            <span style={{ fontSize: '1.1rem' }}>🟢</span>
            <span>{req.responses.filter(r => r.status === 'Confirmed' || r.status === 'Travelling').length} Donor(s) Responded</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: backupDonor ? '#FBBF24' : 'var(--text-muted)', fontWeight: 700 }}>
            <span style={{ fontSize: '1.1rem' }}>🟡</span>
            <span>{backupDonor ? '1 Backup Donor Active on Standby' : 'Searching for backup donor...'}</span>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY & BACKUP DONOR CARDS */}
      <div className="grid-2">
        {/* Primary Donor */}
        <div className="card" style={{ border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="pill pill-green">🟢 PRIMARY DONOR</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Confirmed</span>
          </div>

          {primaryDonor ? (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{primaryDonor.donorName}</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                📍 {primaryDonor.location} • Group {primaryDonor.bloodGroup}
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => simulatePrimaryUnavailable(req.id)}
                style={{ width: '100%', padding: '8px', fontSize: '0.78rem', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.3)', minHeight: '38px' }}
              >
                <UserX size={14} />
                [ Activate Backup Donor ]
              </button>
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
              Searching nearby donors...
            </div>
          )}
        </div>

        {/* Backup Donor */}
        <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="pill pill-amber">🟡 BACKUP DONOR</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Standby</span>
          </div>

          {backupDonor ? (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{backupDonor.donorName}</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                📍 {backupDonor.location} • Group {backupDonor.bloodGroup}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
              No backup donor standby assigned.
            </div>
          )}
        </div>
      </div>

      {/* 4. SHARE COMMUNITY SOS */}
      <div className="card" style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} color="var(--primary-blue)" />
          SHARE EMERGENCY SOS
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          If more donors are needed, share this live link to WhatsApp groups. New helpers can respond with 1 tap.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            className="btn btn-success"
            onClick={() => {
              activateCommunitySos(req.id);
              showToast('Opened WhatsApp broadcast share!');
            }}
          >
            <MessageSquare size={16} />
            [ SHARE ON WHATSAPP ]
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleCopyLink}
          >
            <Copy size={16} />
            {copied ? '[ COPIED ]' : '[ COPY LINK ]'}
          </button>
        </div>
      </div>

    </div>
  );
};
