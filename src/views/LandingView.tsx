import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Radio 
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveTab, requests } = useLensBlood();

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '48px 24px',
        background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.15) 0%, rgba(15, 23, 42, 0.8) 70%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#F87171',
          fontSize: '0.82rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          <Sparkles size={14} />
          <span>LENSBLOOD • EMERGENCY BLOOD COORDINATION PLATFORM</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          color: '#ffffff',
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          Find Blood. Activate Help.<br />
          <span style={{
            background: 'linear-gradient(135deg, #EF4444 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Coordinate Every Response.
          </span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 32px auto',
          lineHeight: 1.6
        }}>
          LensBlood turns scattered, unverified WhatsApp forwards into <strong>one live, trackable emergency response network</strong> — connecting families, donors, and hospitals in real time.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-emergency"
            onClick={() => setActiveTab('create')}
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <ShieldAlert size={20} />
            [ REQUEST BLOOD NOW ]
          </button>

          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('donors')}
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <HeartHandshake size={20} />
            [ I CAN DONATE ]
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('tracker')}
            style={{ padding: '14px 24px', fontSize: '1rem' }}
          >
            <Radio size={20} color="var(--primary-blue)" />
            [ VIEW LIVE TRACKER ]
          </button>
        </div>
      </div>

      {/* Visual Workflow Steps */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>
          HOW LENSBLOOD COORDINATES EMERGENCIES
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>
          From initial distress alert to final hospital confirmation
        </p>

        <div className="grid-3" style={{ gap: '16px' }}>
          {[
            {
              step: '01',
              title: '1. CREATE REQUEST',
              desc: 'Family creates structured request with blood group, units, hospital & time.',
              icon: ShieldAlert,
              color: '#EF4444'
            },
            {
              step: '02',
              title: '2. SEARCH & MATCH',
              desc: 'System searches registered donors prioritized by group, location & availability.',
              icon: Search,
              color: '#3B82F6'
            },
            {
              step: '03',
              title: '3. NOTIFY DONORS',
              desc: 'Instant priority push/SMS alerts sent to matching available donors nearby.',
              icon: Radio,
              color: '#8B5CF6'
            },
            {
              step: '04',
              title: '4. DONOR RESPONDS',
              desc: 'Primary & Backup donors respond "I CAN HELP" with single-tap confirmation.',
              icon: CheckCircle2,
              color: '#10B981'
            },
            {
              step: '05',
              title: '5. COMMUNITY SOS',
              desc: 'If registered donors are insufficient, generate public share link for WhatsApp.',
              icon: Share2,
              color: '#F59E0B'
            },
            {
              step: '06',
              title: '6. HOSPITAL FULFILLMENT',
              desc: 'Hospital staff verifies donor arrival & tracks donation until completion.',
              icon: HeartHandshake,
              color: '#10B981'
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel-interactive" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `${item.color}20`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    STEP {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Metrics Summary */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              LIVE EMERGENCY NETWORK METRICS
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Real-time platform telemetry
            </span>
          </div>
          <span className="badge badge-success">● SYSTEM ONLINE</span>
        </div>

        <div className="grid-3" style={{ gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emergency-red)' }}>
              {requests.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Active Emergency Requests
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              42
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Active Verified Donors (Trichy)
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-green)' }}>
              88%
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Emergency Response Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
