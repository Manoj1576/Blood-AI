import React, { useState } from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import type { BloodGroup } from '../types';
import { ShieldAlert, HeartHandshake, CheckCircle2, MapPin, Clock, Hospital } from 'lucide-react';

export const PublicSosView: React.FC = () => {
  const { requests, activeRequestId, respondToEmergency, setActiveTab } = useLensBlood();

  const sosReq = requests.find(r => r.id === 'LB-2043') || requests.find(r => r.id === activeRequestId) || requests[0];

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(sosReq.bloodGroup);
  const [location, setLocation] = useState('Trichy (Srirangam)');
  const [submitted, setSubmitted] = useState(false);

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    respondToEmergency(sosReq.id, {
      name,
      phone,
      bloodGroup,
      location,
      isCommunity: true
    });
    setSubmitted(true);
    setShowModal(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.2) 0%, rgba(10, 14, 23, 1) 80%)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '32px 24px',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 20px 60px rgba(239, 68, 68, 0.25)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', fontSize: '0.8rem', fontWeight: 800, marginBottom: '20px' }}>
          <ShieldAlert size={16} />
          <span>URGENT COMMUNITY BLOOD SOS</span>
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
          URGENT BLOOD REQUEST
        </h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          REQUEST ID: #{sosReq.id} • LENSBLOOD EMERGENCY LINK
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>BLOOD GROUP REQUIRED</div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--emergency-red)', lineHeight: 1 }}>
                {sosReq.bloodGroup}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>UNITS NEEDED</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                {sosReq.unitsRequired} Units
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Hospital size={18} color="var(--primary-blue)" />
              <span>Hospital: <strong>{sosReq.hospital}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="var(--primary-blue)" />
              <span>Location: <strong>{sosReq.location}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="var(--warning-amber)" />
              <span>Required before: <strong>{sosReq.requiredBy}</strong></span>
            </div>
          </div>
        </div>

        <div style={{
          padding: '14px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '10px',
          marginBottom: '28px',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)'
        }}>
          📊 Current coordination status: <strong>{sosReq.unitsCoordinated} donor confirmed</strong>, {sosReq.unitsRequired - sosReq.unitsCoordinated} unit(s) still needed.
        </div>

        {submitted ? (
          <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', textAlign: 'center' }}>
            <CheckCircle2 size={44} color="var(--success-green)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34D399', marginBottom: '6px' }}>
              ✓ RESPONSE SUBMITTED
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
              You are now listed as a <strong>POTENTIAL DONOR</strong> for emergency #{sosReq.id}. The requester has been notified!
            </p>
            <span className="badge badge-success" style={{ padding: '6px 14px' }}>
              STATUS: POTENTIAL DONOR
            </span>
            <div style={{ marginTop: '20px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setActiveTab('tracker')} 
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                [ VIEW LIVE EMERGENCY TRACKER ]
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              className="btn btn-emergency"
              onClick={() => setShowModal(true)}
              style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
            >
              <HeartHandshake size={22} />
              [ I CAN HELP ]
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                alert('Thank you for reviewing. Please share this SOS link to your WhatsApp contacts if you know anyone who can help!');
              }}
              style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
            >
              [ I CANNOT HELP (SHARE LINK) ]
            </button>
          </div>
        )}

        <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          ℹ️ Medical eligibility, blood grouping, and final donation approval are always determined by authorized blood bank / hospital medical staff.
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9000,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '28px', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
              QUICK DONOR RESPONSE
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              No long registration form needed. Enter basic details to join emergency #{sosReq.id}.
            </p>

            <form onSubmit={handleHelpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  MOBILE NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  YOUR BLOOD GROUP *
                </label>
                <select
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value as BloodGroup)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0F172A', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  APPROXIMATE LOCATION
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trichy Main"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: '12px', fontSize: '0.85rem' }}
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="btn btn-emergency" 
                  style={{ flex: 1, padding: '12px', fontSize: '0.85rem' }}
                >
                  [ RESPOND TO EMERGENCY ]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
