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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';

export function ProjectSetupPage() {
  return (
    <Tabs defaultValue="scenarios" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
        <TabsTrigger value="recorder">Test Recorder</TabsTrigger>
        <TabsTrigger value="trace">Trace Viewer</TabsTrigger>
        <TabsTrigger value="reports">Test Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="scenarios" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Common Test Scenarios</CardTitle>
            <CardDescription>
              Learn how to structure and organize your test scenarios effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Test Organization</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    // Test implementation
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Test implementation
  });
});`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Test Fixtures</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
{`// tests/fixtures/auth.fixture.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[data-testid=username]', 'test');
    await page.fill('[data-testid=password]', 'test');
    await page.click('[data-testid=submit]');
    await use(page);
  },
});`}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recorder" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Recorder</CardTitle>
            <CardDescription>
              Generate tests automatically using Playwright's Codegen tool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Info className="h-5 w-5" />
                <p className="text-sm">
                  Run <code>npx playwright codegen</code> to start recording
                </p>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`npx playwright codegen http://localhost:3000

# Generated test example:
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('test');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('test');
  await page.getByTestId('submit').click();
});`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trace" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Trace Viewer</CardTitle>
            <CardDescription>
              Debug tests using Playwright's powerful Trace Viewer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Info className="h-5 w-5" />
                <p className="text-sm">
                  Enable tracing in your config file and view traces with{' '}
                  <code>npx playwright show-trace</code>
                </p>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// playwright.config.ts
export default {
  use: {
    trace: 'on-first-retry', // Record traces on first retry of failed tests
  },
};

// View trace
npx playwright show-trace trace.zip`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Reports</CardTitle>
            <CardDescription>
              Generate and analyze test execution reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`// playwright.config.ts
export default {
  reporter: [
    ['html'], // HTML report
    ['junit', { outputFile: 'results.xml' }], // JUnit report
    ['json', { outputFile: 'results.json' }], // JSON report
  ],
};

// View HTML report
npx playwright show-report`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}