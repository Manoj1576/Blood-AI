import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { Building2, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const { requests, confirmHospitalArrival, confirmHospitalDonation, setActiveRequestId, setActiveTab } = useLensBlood();

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Building2 size={24} color="var(--primary-blue)" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              ABC HOSPITAL • BLOOD CENTRE DASHBOARD
            </h1>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Trichy Main Operational Portal • Confirm donor arrival & verify donation status
          </p>
        </div>

        <span className="badge badge-success" style={{ padding: '6px 14px' }}>
          🏥 AUTHORIZED MEDICAL PORTAL
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {requests.map(req => {
          const confirmedDonors = req.responses.filter(r => r.status === 'Confirmed' || r.status === 'Travelling' || r.status === 'Arrived' || r.status === 'Donated');

          return (
            <div key={req.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="badge badge-emergency">REQUEST #{req.id}</span>
                    <span className={`badge ${req.status === 'Fulfilled' ? 'badge-success' : 'badge-warning'}`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                    {req.bloodGroup} Blood • {req.unitsRequired} Units Required
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Patient: <strong>{req.patientName}</strong> • Required before: {req.requiredBy}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>FULFILLMENT STATUS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-green)' }}>
                    {req.unitsCoordinated} / {req.unitsRequired} Units Coordinated
                  </div>
                </div>
              </div>

              {/* Operational Metrics Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                background: 'rgba(255,255,255,0.03)',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DONORS NOTIFIED</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>8</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>POTENTIAL DONORS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)' }}>{req.responses.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CONFIRMED</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success-green)' }}>
                    {req.responses.filter(r => !r.isBackup && r.status !== 'Standby').length}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BACKUP STANDBY</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--warning-amber)' }}>
                    {req.responses.filter(r => r.isBackup || r.status === 'Standby').length}
                  </div>
                </div>
              </div>

              {/* Confirmed Donors Arrival Verification List */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} color="var(--primary-blue)" />
                DONOR ARRIVAL & HOSPITAL VERIFICATION TRACKER
              </h4>

              {confirmedDonors.length === 0 ? (
                <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                  No confirmed donors logged yet for this request.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {confirmedDonors.map(resp => (
                    <div key={resp.id} style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
                          {resp.donorName}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          📞 {resp.donorPhone} • Group {resp.bloodGroup} • {resp.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STATUS:</span>
                          <span className="badge badge-info">{resp.status.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Hospital Action Buttons */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {resp.status !== 'Arrived' && resp.status !== 'Donated' && (
                          <button
                            className="btn btn-primary"
                            onClick={() => confirmHospitalArrival(req.id, resp.id)}
                            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                          >
                            <CheckCircle2 size={14} />
                            [ CONFIRM ARRIVAL ]
                          </button>
                        )}

                        {resp.status !== 'Donated' && (
                          <button
                            className="btn btn-success"
                            onClick={() => confirmHospitalDonation(req.id, resp.id)}
                            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                          >
                            <ShieldCheck size={14} />
                            [ CONFIRM DONATION STATUS ]
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setActiveRequestId(req.id);
                    setActiveTab('tracker');
                  }}
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  [ VIEW LIVE EMERGENCY TRACKER ]
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
