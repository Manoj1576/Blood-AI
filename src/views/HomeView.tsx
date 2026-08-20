import React, { useState } from 'react';
import { useLensBlood } from '../context/LensBloodContext';
import type { BloodGroup } from '../types';
import { ShieldAlert, HeartHandshake, Search, Radio, UserCheck } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    donors, 
    createBloodRequest, 
    setActiveRequestId, 
    setActiveTab, 
    showToast
  } = useLensBlood();

  const [mode, setMode] = useState<'need' | 'donate'>('need');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup>('B-');
  const [selectedLocation, setSelectedLocation] = useState('Trichy');
  const [unitsNeeded, setUnitsNeeded] = useState(2);
  const [hospitalName, setHospitalName] = useState('ABC Hospital');
  const [hasSearched, setHasSearched] = useState(false);

  const bloodGroups: BloodGroup[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const matchingDonors = donors.filter(d => 
    d.isAvailable && 
    (d.bloodGroup === selectedBloodGroup || selectedBloodGroup === 'O-')
  );

  const handleFindBlood = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    showToast(`Found ${matchingDonors.length} potential ${selectedBloodGroup} donors nearby in ${selectedLocation}`);
  };

  const handleAlertNearbyDonors = () => {
    const reqId = createBloodRequest({
      patientName: 'Emergency Patient',
      bloodGroup: selectedBloodGroup,
      unitsRequired: unitsNeeded,
      hospital: hospitalName,
      location: selectedLocation,
      requiredBy: 'Immediate / As soon as possible',
      urgency: 'Critical'
    });
    if (reqId) {
      setActiveRequestId(reqId);
      setActiveTab('tracker');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. DOMINANT HERO ACTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          onClick={() => { setMode('need'); setHasSearched(false); }}
          style={{
            padding: '18px 12px',
            borderRadius: 'var(--radius-md)',
            background: mode === 'need' ? 'var(--emergency-red)' : 'var(--bg-surface)',
            color: '#ffffff',
            border: mode === 'need' ? '2px solid #F87171' : '1px solid var(--border-color)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <ShieldAlert size={28} />
          <span style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.02em' }}>
            I NEED BLOOD
          </span>
        </button>

        <button
          onClick={() => { setMode('donate'); setActiveTab('donors'); }}
          style={{
            padding: '18px 12px',
            borderRadius: 'var(--radius-md)',
            background: mode === 'donate' ? 'var(--success-green)' : 'var(--bg-surface)',
            color: '#ffffff',
            border: mode === 'donate' ? '2px solid #34D399' : '1px solid var(--border-color)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <HeartHandshake size={28} />
          <span style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.02em' }}>
            I CAN DONATE
          </span>
        </button>
      </div>

      {/* 2. INSTANT EMERGENCY SEARCH WIDGET */}
      <div className="card">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} color="var(--emergency-red)" />
          FIND BLOOD NEARBY
        </h2>

        <form onSubmit={handleFindBlood} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Blood Group Selection Chips */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
              BLOOD GROUP NEEDED
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {bloodGroups.map(bg => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => { setSelectedBloodGroup(bg); setHasSearched(false); }}
                  style={{
                    padding: '12px 6px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedBloodGroup === bg ? 'var(--emergency-red)' : 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                    border: selectedBloodGroup === bg ? '2px solid #F87171' : '1px solid var(--border-color)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Units Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                LOCATION / CITY
              </label>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#151D2A',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  outline: 'none',
                  minHeight: '48px'
                }}
              >
                <option value="Trichy">Trichy Main</option>
                <option value="Srirangam">Srirangam</option>
                <option value="Thillai Nagar">Thillai Nagar</option>
                <option value="Lalgudi">Lalgudi</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                UNITS NEEDED
              </label>
              <select
                value={unitsNeeded}
                onChange={e => setUnitsNeeded(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#151D2A',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  outline: 'none',
                  minHeight: '48px'
                }}
              >
                <option value={1}>1 Unit</option>
                <option value={2}>2 Units</option>
                <option value={3}>3 Units</option>
                <option value={4}>4+ Units</option>
              </select>
            </div>
          </div>

          {/* Hospital Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
              HOSPITAL NAME
            </label>
            <input
              type="text"
              value={hospitalName}
              onChange={e => setHospitalName(e.target.value)}
              placeholder="e.g. ABC Hospital"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                minHeight: '48px'
              }}
            />
          </div>

          {/* Large Action Button */}
          <button
            type="submit"
            className="btn btn-emergency"
            style={{ width: '100%', fontSize: '1.05rem', marginTop: '4px' }}
          >
            <Search size={20} />
            [ FIND BLOOD ]
          </button>
        </form>
      </div>

      {/* 3. INSTANT SEARCH RESULTS DISPLAY */}
      {hasSearched && (
        <div className="card" style={{ borderLeft: '4px solid var(--emergency-red)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {selectedBloodGroup} BLOOD NEAR YOU
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                📍 {selectedLocation} • {unitsNeeded} Units Required at {hospitalName}
              </p>
            </div>
            <span className="pill pill-green">
              🟢 {matchingDonors.length} Donors Available
            </span>
          </div>

          {matchingDonors.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {matchingDonors.map(donor => (
                <div 
                  key={donor.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800 }}>{donor.name}</span>
                      <span className="pill pill-green" style={{ fontSize: '0.7rem' }}>✓ Verified</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      📍 <strong>{donor.distanceKm} km away</strong> • Group {donor.bloodGroup} • {donor.location}
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleAlertNearbyDonors}
                    style={{ padding: '8px 16px', fontSize: '0.85rem', minHeight: '40px' }}
                  >
                    <UserCheck size={16} />
                    [ CONTACT / REQUEST ]
                  </button>
                </div>
              ))}

              <div style={{ marginTop: '8px' }}>
                <button
                  className="btn btn-emergency"
                  onClick={handleAlertNearbyDonors}
                  style={{ width: '100%', padding: '12px' }}
                >
                  <Radio size={18} />
                  [ ALERT ALL {matchingDonors.length} NEARBY DONORS ]
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F87171', marginBottom: '6px' }}>
                No nearby donor currently registered for {selectedBloodGroup}.
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Don't worry. LensBlood will automatically expand search radius and generate a shareable Community SOS.
              </p>

              <button
                className="btn btn-emergency"
                onClick={handleAlertNearbyDonors}
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                <Radio size={20} />
                [ ALERT NEARBY DONORS ]
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
