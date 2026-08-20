import React from 'react';
import { MapPin, Radio } from 'lucide-react';

export const DonorCoverageMap: React.FC = () => {
  const regions = [
    { name: 'Trichy Main', count: 18, densityPct: 85, color: '#3B82F6', status: 'High Density' },
    { name: 'Srirangam', count: 9, densityPct: 50, color: '#10B981', status: 'Moderate Density' },
    { name: 'Thillai Nagar', count: 6, densityPct: 35, color: '#F59E0B', status: 'Limited Density' },
    { name: 'Lalgudi', count: 2, densityPct: 15, color: '#EF4444', status: 'Critical Density (SOS Escalation Needed)' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--primary-blue)" />
            LOCAL DONOR DENSITY & COVERAGE
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Approximate donor coverage mapping. Exact home addresses are strictly hidden for privacy.
          </p>
        </div>
        <span className="badge badge-info">
          <Radio size={12} className="animate-pulse" /> LIVE TELEMETRY
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {regions.map((reg, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
              <span style={{ fontWeight: 700 }}>📍 {reg.name}</span>
              <span style={{ color: reg.color, fontWeight: 600 }}>
                {reg.count} Active Donors ({reg.status})
              </span>
            </div>
            
            <div style={{
              height: '10px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '5px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%',
                width: `${reg.densityPct}%`,
                background: reg.color,
                borderRadius: '5px',
                transition: 'width 0.8s ease'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5
      }}>
        💡 <strong>Operational Note:</strong> When an emergency has low response probability (e.g. rare blood group like AB- or low density area like Lalgudi), LensBlood's Adaptive Escalation automatically triggers Community SOS recruitment.
      </div>
    </div>
  );
};
