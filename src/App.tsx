import { useState } from 'react';
import { MainNav } from '@/components/MainNav';
import { ComponentsGallery } from '@/pages/ComponentsGallery';
import { EdgeCasesPage } from '@/pages/EdgeCasesPage';
import { AuthPage } from '@/pages/AuthPage';
import { AutomationConceptsPage } from '@/pages/AutomationConceptsPage';
import { PageObjectModelPage } from '@/pages/PageObjectModelPage';
import { PlaywrightSetupPage } from '@/pages/PlaywrightSetupPage';
import { ProjectSetupPage } from '@/pages/ProjectSetupPage';
import { DataGridPage } from '@/pages/DataGridPage';
import { Activity } from 'lucide-react';
import type { User } from '@/types/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState('/components');

  const getPageTitle = () => {
    switch (currentPath) {
      case '/components':
        return 'UI Components Gallery';
      case '/data-grid':
        return 'Data Grid Examples';
      case '/edge-cases':
        return 'Edge Cases & Testing Challenges';
      case '/core-concepts':
        return 'Core Automation Concepts';
      case '/page-objects':
        return 'Page Object Model';
      case '/playwright-setup':
        return 'Playwright Setup Guide';
      case '/project-setup':
        return 'Project Setup Guide';
      case '/auth':
        return 'Authentication Example';
      default:
        return 'UI Components Gallery';
    }
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/components':
        return <ComponentsGallery />;
      case '/data-grid':
        return <DataGridPage />;
      case '/edge-cases':
        return <EdgeCasesPage />;
      case '/auth':
        return <AuthPage onLogin={setUser} />;
      case '/core-concepts':
        return <AutomationConceptsPage />;
      case '/page-objects':
        return <PageObjectModelPage />;
      case '/playwright-setup':
        return <PlaywrightSetupPage />;
      case '/project-setup':
        return <ProjectSetupPage />;
      default:
        return <ComponentsGallery />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r glass-panel">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4">
              <Activity className="h-6 w-6 text-primary mr-2" />
              <span className="app-title">Testing Playground</span>
            </div>
            <div className="flex-1 overflow-auto px-4">
              <MainNav 
                onNavigate={setCurrentPath} 
                currentPath={currentPath}
                user={user}
                onLogout={() => setUser(null)}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 pl-64">
          <div className="glass-panel sticky top-0 z-20">
            <div className="h-14 border-b flex items-center px-8">
              <h1 className="page-title">Testing Playground</h1>
            </div>
          </div>
          <div className="container py-8 px-8">
            <div className="gradient-header">
              <h1 className="page-header">{getPageTitle()}</h1>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;