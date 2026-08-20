import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { DonorCoverageMap } from '../components/DonorCoverageMap';
import { ShieldAlert, Users, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { requests } = useLensBlood();

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>ADMIN OPERATIONAL OVERVIEW</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            LensBlood Emergency Telemetry & Regional Donor Coverage Analytics
          </p>
        </div>
        <span className="badge badge-info">REGIONAL TELEMETRY</span>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid-3" style={{ marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE EMERGENCIES</span>
            <ShieldAlert size={20} color="var(--emergency-red)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--emergency-red)' }}>
            {requests.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            2 in Trichy Region
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>REGISTERED DONORS</span>
            <Users size={20} color="var(--primary-blue)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
            42
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            100% Phone Verified
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMERGENCY RESPONSE RATE</span>
            <Activity size={20} color="var(--success-green)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success-green)' }}>
            88%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Avg response &lt; 14 mins
          </div>
        </div>
      </div>

      {/* Regional Donor Coverage Visualization */}
      <div style={{ marginBottom: '32px' }}>
        <DonorCoverageMap />
      </div>
    </div>
  );
};
