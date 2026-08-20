import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import type { UserRole } from '../types';
import { HeartHandshake } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole, setActiveTab } = useLensBlood();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setCurrentRole(newRole);
    if (newRole === 'requester') {
      setActiveTab('home');
    } else if (newRole === 'donor') {
      setActiveTab('donors');
    } else if (newRole === 'new_donor') {
      setActiveTab('sos');
    } else if (newRole === 'hospital') {
      setActiveTab('hospital');
    } else if (newRole === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <header style={{
      height: '56px',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Logo */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        onClick={() => setActiveTab('home')}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--emergency-red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <HeartHandshake size={18} />
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
          LENS<span style={{ color: 'var(--emergency-red)' }}>BLOOD</span>
        </div>
      </div>

      {/* Role Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ROLE:</span>
        <select 
          value={currentRole} 
          onChange={handleRoleChange}
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '4px 8px',
            fontWeight: 700,
            fontSize: '0.8rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="requester" style={{ background: '#151D2A' }}>Manoj (Requester)</option>
          <option value="donor" style={{ background: '#151D2A' }}>Arun (Registered Donor)</option>
          <option value="new_donor" style={{ background: '#151D2A' }}>Public SOS (New Donor)</option>
          <option value="hospital" style={{ background: '#151D2A' }}>ABC Hospital Staff</option>
        </select>
      </div>
    </header>
  );
};
