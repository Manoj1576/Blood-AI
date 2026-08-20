import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SimpleHospitalView: React.FC = () => {
  const { requests, confirmHospitalArrival, confirmHospitalDonation } = useLensBlood();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div className="card">
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={22} color="var(--primary-blue)" />
          ABC HOSPITAL BLOOD CENTRE
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Verify donor arrival and record donation status
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {requests.map(req => {
          const activeDonors = req.responses.filter(r => r.status === 'Confirmed' || r.status === 'Travelling' || r.status === 'Arrived' || r.status === 'Donated');

          return (
            <div key={req.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="pill pill-red">#{req.id}</span>
                <span className="pill pill-blue">{req.unitsCoordinated}/{req.unitsRequired} Units Coordinated</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {req.bloodGroup} Blood Required ({req.patientName})
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Required before: {req.requiredBy}
              </div>

              {activeDonors.length === 0 ? (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No confirmed donors currently travelling.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeDonors.map(donor => (
                    <div 
                      key={donor.id}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{donor.donorName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          📞 {donor.donorPhone} • Group {donor.bloodGroup} • Status: <strong>{donor.status}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {donor.status !== 'Arrived' && donor.status !== 'Donated' && (
                          <button
                            className="btn btn-primary"
                            onClick={() => confirmHospitalArrival(req.id, donor.id)}
                            style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '36px' }}
                          >
                            <CheckCircle2 size={14} /> [ CONFIRM ARRIVAL ]
                          </button>
                        )}

                        {donor.status !== 'Donated' && (
                          <button
                            className="btn btn-success"
                            onClick={() => confirmHospitalDonation(req.id, donor.id)}
                            style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '36px' }}
                          >
                            <ShieldCheck size={14} /> [ CONFIRM DONATION ]
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
