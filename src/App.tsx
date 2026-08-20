import React from 'react';
import { LensBloodProvider, useLensBlood } from './context/LensBloodContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { DuplicateModal } from './components/DuplicateModal';

import { HomeView } from './views/HomeView';
import { SimpleRequestsView } from './views/SimpleRequestsView';
import { SimpleTrackerView } from './views/SimpleTrackerView';
import { SimpleDonorView } from './views/SimpleDonorView';
import { SimpleHospitalView } from './views/SimpleHospitalView';
import { SimpleProfileView } from './views/SimpleProfileView';
import { PublicSosView } from './views/PublicSosView';

const MainAppContent: React.FC = () => {
  const { activeTab, currentRole } = useLensBlood();

  const renderActiveTab = () => {
    if (activeTab === 'sos' || currentRole === 'new_donor') {
      return <PublicSosView />;
    }

    switch (activeTab) {
      case 'home':
      case 'overview':
      case 'create':
        return <HomeView />;
      case 'requests':
        return <SimpleRequestsView />;
      case 'tracker':
        return <SimpleTrackerView />;
      case 'donors':
      case 'responses':
        return <SimpleDonorView />;
      case 'hospital':
        return <SimpleHospitalView />;
      case 'profile':
      case 'settings':
      case 'admin':
        return <SimpleProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="main-view">
        {renderActiveTab()}
      </main>
      <Sidebar />
      <Toast />
      <DuplicateModal />
    </div>
  );
};

export default function App() {
  return (
    <LensBloodProvider>
      <MainAppContent />
    </LensBloodProvider>
  );
}
