import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import type { NavTab } from '../types';
import { Home, ShieldAlert, Heart, User, Building2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentRole, requests } = useLensBlood();

  const items: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'requests', label: 'Requests', icon: ShieldAlert, badge: `${requests.length}` },
    { id: 'donors', label: 'Donors', icon: Heart },
    ...(currentRole === 'hospital' ? [{ id: 'hospital' as NavTab, label: 'Hospitals', icon: Building2 }] : []),
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 500,
      padding: '0 12px'
    }}>
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || 
          (item.id === 'home' && (activeTab === 'overview' || activeTab === 'create')) ||
          (item.id === 'requests' && activeTab === 'tracker') ||
          (item.id === 'profile' && activeTab === 'settings');

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              background: 'transparent',
              border: 'none',
              color: isActive ? 'var(--emergency-red)' : 'var(--text-muted)',
              fontSize: '0.72rem',
              fontWeight: isActive ? 800 : 500,
              cursor: 'pointer',
              position: 'relative',
              padding: '6px 12px'
            }}
          >
            <Icon size={20} color={isActive ? 'var(--emergency-red)' : 'currentColor'} />
            <span>{item.label}</span>
            {item.badge && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '6px',
                background: 'var(--emergency-red)',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '1px 5px',
                borderRadius: '9999px'
              }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
