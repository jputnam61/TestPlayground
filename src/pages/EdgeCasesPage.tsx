import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

export function EdgeCasesPage() {
  const [iframeContent, setIframeContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shadowContent, setShadowContent] = useState('');
  const [dynamicContent, setDynamicContent] = useState<string[]>([]);

  // Handle iframe content load
  const handleIframeLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIframeContent(`
        <html>
          <body>
            <button id="iframe-button">Click Me</button>
            <input type="text" placeholder="Type here" />
          </body>
        </html>
      `);
      setIsLoading(false);
    }, 1000);
  };

  // Handle shadow DOM content
  const handleShadowDOM = () => {
    const content = `
      <style>
        .shadow-button { 
          background: #333;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
        }
      </style>
      <div>
        <button class="shadow-button">Shadow DOM Button</button>
        <input type="text" placeholder="Shadow DOM Input" />
      </div>
    `;
    setShadowContent(content);
  };

  // Handle dynamic content loading
  const handleDynamicContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDynamicContent([
        'Content 1',
        'Content 2',
        'Content 3',
        'Content 4',
        'Content 5',
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Tabs defaultValue="iframes" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="iframes">iFrames</TabsTrigger>
        <TabsTrigger value="shadow-dom">Shadow DOM</TabsTrigger>
        <TabsTrigger value="dynamic">Dynamic Content</TabsTrigger>
        <TabsTrigger value="race">Race Conditions</TabsTrigger>
      </TabsList>

      {/* iFrames Tab */}
      <TabsContent value="iframes" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>iFrame Handling</CardTitle>
            <CardDescription>
              Test interactions with elements inside iframes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleIframeLoad}
              disabled={isLoading}
              data-testid="load-iframe"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load iFrame Content
            </Button>

            {iframeContent && (
              <div
                className="border rounded-lg p-4"
                data-testid="iframe-container"
              >
                <iframe
                  srcDoc={iframeContent}
                  className="w-full h-[200px]"
                  title="Test iFrame"
                />
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Testing Strategy</h4>
              <pre className="text-sm overflow-x-auto">
                {`// Switch to iframe
await driver.switchTo().frame(iframe);

// Interact with elements
await driver.findElement('#iframe-button').click();

// Switch back to default content
await driver.switchTo().defaultContent();`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Shadow DOM Tab */}
      <TabsContent value="shadow-dom" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Shadow DOM</CardTitle>
            <CardDescription>
              Handle elements within Shadow DOM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleShadowDOM}
              disabled={!!shadowContent}
              data-testid="create-shadow-dom"
            >
              Create Shadow DOM
            </Button>

            {shadowContent && (
              <div
                className="border rounded-lg p-4"
                data-testid="shadow-dom-container"
              >
                <div id="shadow-host" />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      const host = document.getElementById('shadow-host');
                      const shadowRoot = host.attachShadow({mode: 'open'});
                      shadowRoot.innerHTML = \`${shadowContent}\`;
                    `,
                  }}
                />
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Testing Strategy</h4>
              <pre className="text-sm overflow-x-auto">
                {`// Access shadow DOM
const shadowRoot = await element.getShadowRoot();

// Find elements within shadow DOM
const button = await shadowRoot.findElement(
  'button.shadow-button'
);`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Dynamic Content Tab */}
      <TabsContent value="dynamic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Content</CardTitle>
            <CardDescription>
              Handle dynamically loaded content and AJAX requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleDynamicContent}
              disabled={isLoading}
              data-testid="load-dynamic-content"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load Dynamic Content
            </Button>

            <ScrollArea className="h-[200px] border rounded-lg p-4">
              {dynamicContent.map((content, index) => (
                <div
                  key={index}
                  className="p-2 border-b last:border-0"
                  data-testid={`dynamic-item-${index}`}
                >
                  {content}
                </div>
              ))}
            </ScrollArea>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Testing Strategy</h4>
              <pre className="text-sm overflow-x-auto">
                {`// Wait for dynamic content
await waitForElement('[data-testid="dynamic-item-0"]');

// Verify all items loaded
const items = await findElements(
  '[data-testid^="dynamic-item-"]'
);
expect(items.length).toBe(5);`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Race Conditions Tab */}
      <TabsContent value="race" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Race Conditions</CardTitle>
            <CardDescription>
              Handle timing issues and race conditions in tests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Async Form Submission</Label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                  }}
                  className="space-y-2"
                >
                  <Input
                    type="text"
                    placeholder="Type something..."
                    data-testid="race-input"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    data-testid="race-submit"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </form>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Testing Strategy</h4>
                <pre className="text-sm overflow-x-auto">
                  {`// Bad: Fixed sleep
await sleep(2000);

// Good: Wait for condition
await waitForCondition(() => 
  !isElementDisabled('[data-testid="race-submit"]')
);

// Better: Wait for network idle
await waitForNetworkIdle();`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}