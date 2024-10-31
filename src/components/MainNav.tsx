import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Code2,
  FileCode2,
  GraduationCap,
  Hammer,
  Layout,
  Library,
  LogIn,
  LogOut,
  Settings,
  TestTube2,
  Wrench,
} from 'lucide-react';
import type { User } from '@/types/auth';
import type { LucideIcon } from 'lucide-react';

interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  testId: string;
  description: string;
}

const navSections: NavSection[] = [
  {
    title: 'Understand',
    icon: GraduationCap,
    items: [
      {
        title: 'Core Concepts',
        href: '/core-concepts',
        icon: BookOpen,
        testId: 'nav-core-concepts',
        description: 'Learn fundamental automation concepts and best practices',
      },
      {
        title: 'Page Objects',
        href: '/page-objects',
        icon: FileCode2,
        testId: 'nav-page-objects',
        description: 'Master the Page Object Model design pattern',
      },
    ],
  },
  {
    title: 'Practice',
    icon: TestTube2,
    items: [
      {
        title: 'Components',
        href: '/components',
        icon: Library,
        testId: 'nav-components',
        description: 'Interactive UI components for testing practice',
      },
      {
        title: 'Data Grid',
        href: '/data-grid',
        icon: Layout,
        testId: 'nav-data-grid',
        description: 'Complex data grid with filtering and sorting',
      },
      {
        title: 'Edge Cases',
        href: '/edge-cases',
        icon: Code2,
        testId: 'nav-edge-cases',
        description: 'Practice handling challenging test scenarios',
      },
      {
        title: 'Login Example',
        href: '/auth',
        icon: LogIn,
        testId: 'nav-login',
        description: 'Example login form with validation and error handling',
      },
    ],
  },
  {
    title: 'Implement',
    icon: Wrench,
    items: [
      {
        title: 'Playwright Setup',
        href: '/playwright-setup',
        icon: Settings,
        testId: 'nav-playwright',
        description: 'Step-by-step guide to set up Playwright',
      },
      {
        title: 'Project Setup',
        href: '/project-setup',
        icon: Hammer,
        testId: 'nav-project-setup',
        description: 'Configure your test automation project',
      },
    ],
  },
];

interface MainNavProps {
  onNavigate: (href: string) => void;
  currentPath: string;
  user: User | null;
  onLogout: () => void;
}

export function MainNav({ onNavigate, currentPath, user, onLogout }: MainNavProps) {
  return (
    <nav className="flex flex-col space-y-6">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <div className="nav-section-header">
            <section.icon className="h-5 w-5" />
            <span>{section.title}</span>
          </div>
          <div className="space-y-1 pl-4">
            {section.items.map((item) => (
              <Link
                key={item.href}
                variant="ghost"
                className={cn(
                  'nav-link group relative',
                  currentPath === item.href && 'active'
                )}
                onClick={() => onNavigate(item.href)}
                data-testid={item.testId}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                <div className="tooltip">
                  {item.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-auto pt-6 border-t border-border/30">
        {user ? (
          <>
            <div className="px-2 py-2 text-sm text-muted-foreground">
              Signed in as {user.username}
            </div>
            <Link
              variant="ghost"
              className="nav-link text-destructive hover:text-destructive"
              onClick={onLogout}
              data-testid="nav-logout"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}