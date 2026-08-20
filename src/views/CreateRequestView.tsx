import React, { useState } from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import type { BloodGroup, UrgencyLevel } from '../types';
import { ShieldAlert } from 'lucide-react';

export const CreateRequestView: React.FC = () => {
  const { createBloodRequest } = useLensBlood();

  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B-');
  const [unitsRequired, setUnitsRequired] = useState<number>(2);
  const [hospital, setHospital] = useState<string>('ABC Hospital');
  const [location, setLocation] = useState<string>('Trichy');
  const [requiredBy, setRequiredBy] = useState<string>('Today, 6:00 PM');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Critical');
  const [patientName, setPatientName] = useState<string>('Suresh Kumar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBloodRequest({
      patientName,
      bloodGroup,
      unitsRequired,
      hospital,
      location,
      requiredBy,
      urgency,
      requesterName: 'Manoj',
      requesterPhone: '+91 99000 11223'
    });
  };

  const bloodGroups: BloodGroup[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  return (
    <div style={{ padding: '32px 24px', maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#F87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ShieldAlert size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>REQUEST BLOOD</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Broadcast emergency alert to nearby verified registered donors & community networks
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '28px' }}>
        {/* Blood Group Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px' }}>
            REQUIRED BLOOD GROUP *
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px'
          }}>
            {bloodGroups.map(bg => (
              <button
                key={bg}
                type="button"
                onClick={() => setBloodGroup(bg)}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: bloodGroup === bg ? 'var(--emergency-red)' : 'rgba(255,255,255,0.04)',
                  color: '#ffffff',
                  border: bloodGroup === bg ? '1px solid #F87171' : '1px solid var(--border-subtle)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: bloodGroup === bg ? '0 0 16px rgba(239,68,68,0.4)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Units Required */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
            UNITS REQUIRED *
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setUnitsRequired(num)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  background: unitsRequired === num ? 'var(--primary-blue)' : 'rgba(255,255,255,0.04)',
                  color: '#ffffff',
                  border: unitsRequired === num ? '1px solid #60A5FA' : '1px solid var(--border-subtle)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {num} {num === 1 ? 'Unit' : 'Units'}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            PATIENT NAME
          </label>
          <input
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            placeholder="e.g. Suresh Kumar"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Hospital & Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              HOSPITAL NAME *
            </label>
            <input
              type="text"
              value={hospital}
              onChange={e => setHospital(e.target.value)}
              placeholder="e.g. ABC Hospital"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              LOCATION / CITY *
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Trichy"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Time & Urgency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              REQUIRED BEFORE *
            </label>
            <input
              type="text"
              value={requiredBy}
              onChange={e => setRequiredBy(e.target.value)}
              placeholder="e.g. Today, 6:00 PM"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              URGENCY LEVEL
            </label>
            <select
              value={urgency}
              onChange={e => setUrgency(e.target.value as UrgencyLevel)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: '#0F172A',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="Critical">🔴 Critical (Immediate / &lt; 2 hrs)</option>
              <option value="Urgent">🟠 Urgent (&lt; 6 hrs)</option>
              <option value="Normal">🟡 Normal (&lt; 24 hrs)</option>
            </select>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '12px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginBottom: '24px',
          lineHeight: 1.4
        }}>
          ℹ️ Medical eligibility, blood grouping verification, and compatibility confirmation must always be completed by authorized hospital blood bank staff.
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="btn btn-emergency"
          style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
        >
          <ShieldAlert size={20} />
          [ CREATE EMERGENCY SOS ]
        </button>
      </form>
    </div>
  );
};
