import React from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import { CheckCircle2, AlertTriangle, Bell } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useLensBlood();

  if (!toastMessage) return null;

  const isWarning = toastMessage.includes('⚠️') || toastMessage.includes('unavailable');
  const isCheck = toastMessage.includes('✓') || toastMessage.includes('successfully') || toastMessage.includes('activated');

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      background: isWarning 
        ? 'rgba(245, 158, 11, 0.95)' 
        : isCheck 
          ? 'rgba(16, 185, 129, 0.95)' 
          : 'rgba(59, 130, 246, 0.95)',
      color: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      fontWeight: 600,
      fontSize: '0.9rem',
      animation: 'slideIn 0.3s ease-out',
    }}>
      {isWarning ? <AlertTriangle size={20} /> : isCheck ? <CheckCircle2 size={20} /> : <Bell size={20} />}
      <span>{toastMessage}</span>
    </div>
  );
};
