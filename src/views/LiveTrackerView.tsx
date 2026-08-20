import React, { useState } from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { 
  Share2, 
  Sparkles, 
  Copy,
  MessageSquare,
  UserX,
  Activity,
  UserCheck
} from 'lucide-react';

export const LiveTrackerView: React.FC = () => {
  const { 
    requests, 
    activeRequestId, 
    simulatePrimaryUnavailable, 
    activateCommunitySos,
    activateAiRecommendation,
    showToast
  } = useLensBlood();

  const req = requests.find(r => r.id === activeRequestId) || requests[0];
  const [copied, setCopied] = useState(false);

  if (!req) return <div style={{ padding: '40px', textAlign: 'center' }}>No emergency request selected.</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(req.communitySosUrl);
    setCopied(true);
    showToast('Copied SOS share link to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryDonor = req.responses.find(r => !r.isBackup && (r.status === 'Confirmed' || r.status === 'Travelling' || r.status === 'Arrived' || r.status === 'Donated'));
  const backupDonor = req.responses.find(r => r.isBackup || r.status === 'Standby');
  const communityDonors = req.responses.filter(r => r.isCommunityDonor);

  const timelineSteps = [
    { label: 'REQUEST CREATED', done: req.timeline.requestCreated },
    { label: 'DONORS SEARCHED', done: req.timeline.donorsSearched },
    { label: 'DONORS NOTIFIED', done: req.timeline.donorsNotified },
    { label: 'DONOR RESPONDED', done: req.timeline.donorResponded },
    { label: 'PRIMARY CONFIRMED', done: req.timeline.primaryConfirmed },
    { label: 'BACKUP STANDBY', done: req.timeline.backupStandby },
    { label: 'DONOR TRAVELLING', done: req.timeline.donorTravelling },
    { label: 'DONOR ARRIVED', done: req.timeline.donorArrived },
    { label: 'HOSPITAL CONFIRMATION', done: req.timeline.hospitalConfirmation },
    { label: 'FULFILLED', done: req.timeline.fulfilled },
  ];

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--emergency-red)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-emergency" style={{ fontSize: '0.85rem' }}>
                🚨 EMERGENCY #{req.id}
              </span>
              <span className={`badge ${req.status === 'Fulfilled' ? 'badge-success' : 'badge-warning'}`}>
                {req.status.toUpperCase()}
              </span>
              {req.duplicateCount > 0 && (
                <span className="badge badge-info">
                  +{req.duplicateCount} MERGED REPORTS
                </span>
              )}
            </div>
            
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {req.bloodGroup} Blood Required ({req.unitsRequired} {req.unitsRequired === 1 ? 'Unit' : 'Units'})
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
              <span>🏥 <strong>{req.hospital}</strong>, {req.location}</span>
              <span>⏰ Required by: <strong>{req.requiredBy}</strong></span>
              <span>👤 Patient: <strong>{req.patientName}</strong></span>
            </div>
          </div>

          {/* Coordination Score Card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px 20px',
            textAlign: 'center',
            minWidth: '180px'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              COORDINATION STATUS
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: req.confidenceScore > 70 ? 'var(--success-green)' : 'var(--warning-amber)' }}>
              {req.confidenceScore}%
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Logistics indicator, not blood guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline Section */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--primary-blue)" />
          LIVE EMERGENCY TRACKING TIMELINE
        </h3>

        {/* 10 Step Progress Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {timelineSteps.map((step, idx) => (
            <div 
              key={idx}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: step.done ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.03)',
                border: step.done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: step.done ? 'var(--success-green)' : 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {step.done ? '✓' : idx + 1}
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: step.done ? 700 : 500,
                color: step.done ? '#ffffff' : 'var(--text-muted)'
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Primary/Backup Donors vs AI Assistant & Community SOS */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        
        {/* Left Column: Coordinated Donors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Units Summary Box */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>UNITS COORDINATION STATUS</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {req.unitsCoordinated} / {req.unitsRequired} UNITS COORDINATED
                </div>
              </div>
              <span className={`badge ${req.unitsCoordinated >= req.unitsRequired ? 'badge-success' : 'badge-warning'}`}>
                {req.unitsCoordinated < req.unitsRequired 
                  ? `${req.unitsRequired - req.unitsCoordinated} UNIT(S) STILL NEEDED` 
                  : 'FULFILLED'}
              </span>
            </div>
          </div>

          {/* Primary Donor Card */}
          <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                🟢 PRIMARY DONOR
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Response confirmed
              </span>
            </div>

            {primaryDonor ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                      {primaryDonor.donorName}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      📍 {primaryDonor.location} • Group {primaryDonor.bloodGroup}
                    </div>
                  </div>
                  <span className="badge badge-info">
                    {primaryDonor.status.toUpperCase()}
                  </span>
                </div>

                {/* Primary Failure button */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => simulatePrimaryUnavailable(req.id)}
                    style={{ width: '100%', padding: '10px', fontSize: '0.82rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#F87171' }}
                  >
                    <UserX size={16} />
                    [ Activate Backup Donor ]
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic', padding: '12px 0' }}>
                No primary donor currently confirmed. Searching network...
              </div>
            )}
          </div>

          {/* Backup Donor Card */}
          <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                🟡 BACKUP DONOR (STANDBY)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Auto-activates if primary fails
              </span>
            </div>

            {backupDonor ? (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {backupDonor.donorName}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  📍 {backupDonor.location} • Group {backupDonor.bloodGroup}
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic', padding: '8px 0' }}>
                No backup donor assigned yet.
              </div>
            )}
          </div>

          {/* Community Responses List */}
          {communityDonors.length > 0 && (
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} color="var(--primary-blue)" />
                COMMUNITY SOS RESPONSES ({communityDonors.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {communityDonors.map(c => (
                  <div key={c.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.donorName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        📞 {c.donorPhone} • {c.location}
                      </div>
                    </div>
                    <span className="badge badge-success">POTENTIAL DONOR</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: AI Assistant & Community SOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* AI Coordination Assistant Panel */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(139, 92, 246, 0.4)', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#A78BFA' }}>
                  AI COORDINATION ASSISTANT
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Operational intelligence for emergency logistics
                </div>
              </div>
            </div>

            {req.aiRecommendation && (
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>
                  {req.aiRecommendation.description}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>
                    RECOMMENDED NEXT ACTIONS:
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {req.aiRecommendation.actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => activateAiRecommendation(req.id)}
                  disabled={req.aiRecommendation.executed}
                  style={{ width: '100%', padding: '12px', fontSize: '0.9rem', background: '#8B5CF6' }}
                >
                  <Sparkles size={16} />
                  {req.aiRecommendation.executed ? '[ RECOMMENDATION ACTIVATED ]' : '[ ACTIVATE RECOMMENDATION ]'}
                </button>
              </div>
            )}
          </div>

          {/* Community SOS Generator Box */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Share2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FBBF24' }}>
                  COMMUNITY SOS LINK
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Activate wider community if registered donors are insufficient
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Share this live emergency link to WhatsApp groups. New donors can open it and respond without prior registration.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '16px'
            }}>
              <input
                type="text"
                readOnly
                value={req.communitySosUrl}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-blue)',
                  width: '100%',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleCopyLink} 
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Sharing buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                className="btn btn-success"
                onClick={() => {
                  activateCommunitySos(req.id);
                  showToast('Opened WhatsApp broadcast share!');
                }}
                style={{ padding: '10px', fontSize: '0.82rem' }}
              >
                <MessageSquare size={16} />
                [ WHATSAPP ]
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleCopyLink}
                style={{ padding: '10px', fontSize: '0.82rem' }}
              >
                <Copy size={16} />
                {copied ? '[ COPIED! ]' : '[ COPY LINK ]'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
