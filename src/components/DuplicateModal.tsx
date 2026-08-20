import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { AlertTriangle, Users, PlusCircle } from 'lucide-react';

export const DuplicateModal: React.FC = () => {
  const { duplicateWarning, setDuplicateWarning, joinExistingRequest, createBloodRequest } = useLensBlood();

  if (!duplicateWarning) return null;

  const { existingRequest, pendingFormData } = duplicateWarning;

  const handleJoin = () => {
    joinExistingRequest(existingRequest.id);
  };

  const handleForceCreate = () => {
    createBloodRequest(pendingFormData, true);
    setDuplicateWarning(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9000,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '28px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#FBBF24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FBBF24' }}>
              ⚠️ POSSIBLE DUPLICATE EMERGENCY
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              11 similar WhatsApp / community reports detected for this hospital
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            EXISTING ACTIVE EMERGENCY REQUEST
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--emergency-red)' }}>
              #{existingRequest.id}
            </span>
            <span className="badge badge-emergency">
              {existingRequest.bloodGroup} • {existingRequest.unitsRequired} Units
            </span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            🏥 {existingRequest.hospital}, {existingRequest.location}
          </div>
          <div style={{ marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Required by: {existingRequest.requiredBy} | Coordinated: {existingRequest.unitsCoordinated}/{existingRequest.unitsRequired} units
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
          LensBlood converts scattered WhatsApp forwards into <strong>ONE structured emergency</strong>. Joining this existing request pools donor responses and prevents donor confusion.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleJoin}
            style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
          >
            <Users size={18} />
            [ JOIN EXISTING REQUEST ({existingRequest.id}) ]
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={handleForceCreate}
            style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} />
            [ CREATE NEW DISTINCT REQUEST ANYWAY ]
          </button>
        </div>
      </div>
    </div>
  );
};
