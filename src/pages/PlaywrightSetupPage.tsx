import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function PlaywrightSetupPage() {
  return (
    <Tabs defaultValue="setup" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="setup">Initial Setup</TabsTrigger>
        <TabsTrigger value="configuration">Configuration</TabsTrigger>
      </TabsList>

      <TabsContent value="setup" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started with Playwright</CardTitle>
            <CardDescription>
              Step-by-step guide to set up Playwright for automated testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Prerequisites */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Prerequisites</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Node.js 14+ installed</li>
                <li>npm or yarn package manager</li>
                <li>A code editor (VS Code recommended)</li>
              </ul>
            </div>

            {/* Installation Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Installation Steps</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger>1. Create a New Project</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
                        mkdir my-playwright-tests
                        cd my-playwright-tests
                        npm init -y
                      </pre>
                      <p className="text-sm text-muted-foreground">
                        This creates a new directory and initializes a Node.js project.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step2">
                  <AccordionTrigger>2. Install Playwright</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
                        npm init playwright@latest
                      </pre>
                      <p className="text-sm text-muted-foreground">
                        This command will:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Install Playwright and its dependencies</li>
                        <li>Add browser binaries for Chromium, Firefox, and WebKit</li>
                        <li>Create initial configuration and example tests</li>
                        <li>Add VS Code configuration for testing</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step3">
                  <AccordionTrigger>3. Install VS Code Extension</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Install the "Playwright Test for VS Code" extension for:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Test running and debugging</li>
                        <li>Code navigation</li>
                        <li>Auto-completion</li>
                        <li>Test snippets</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step4">
                  <AccordionTrigger>4. Verify Installation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
                        npx playwright test
                      </pre>
                      <p className="text-sm text-muted-foreground">
                        This runs the example tests to verify everything is working correctly.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Project Structure */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Structure</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`my-playwright-tests/
├── tests/
│   ├── example.spec.ts    # Example test file
│   └── fixtures/          # Test fixtures
├── playwright.config.ts   # Configuration file
├── package.json
└── .gitignore`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="configuration" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuration and Best Practices</CardTitle>
            <CardDescription>
              Essential configuration options and recommended practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Basic Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Configuration</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['html'],
    ['list']
  ]
};

export default config;`}
              </pre>
            </div>

            {/* Recommended VS Code Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">VS Code Settings</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// .vscode/settings.json
{
  "playwright.reuseBrowser": true,
  "playwright.showBrowser": true,
  "playwright.env": {
    "PWDEBUG": "1"
  }
}`}
              </pre>
            </div>

            {/* Common Commands */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Essential Commands</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="cmd1">
                  <AccordionTrigger>Running Tests</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
{`# Run all tests
npx playwright test

# Run specific test file
npx playwright test example.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cmd2">
                  <AccordionTrigger>Generating Tests</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
{`# Start codegen
npx playwright codegen

# Record at specific URL
npx playwright codegen http://localhost:3000`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cmd3">
                  <AccordionTrigger>Viewing Reports</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg">
{`# Show HTML report
npx playwright show-report

# Show trace viewer
npx playwright show-trace trace.zip`}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}