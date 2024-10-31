import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
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

export function AutomationConceptsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicId, setDynamicId] = useState('button_123');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicId(`button_${Math.floor(Math.random() * 1000)}`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Tabs defaultValue="locators" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="locators">Strong Locators</TabsTrigger>
        <TabsTrigger value="waits">Wait Strategies</TabsTrigger>
      </TabsList>

      <TabsContent value="locators" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Finding Strong Elements</CardTitle>
            <CardDescription>
              Learn how to select reliable elements and handle dynamic IDs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Strong vs Weak Locators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Strong vs Weak Locators</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-500">Strong Locators ✓</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>data-testid attributes</li>
                    <li>Unique IDs (when stable)</li>
                    <li>Accessible labels</li>
                    <li>Unique text content</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-500">Weak Locators ✗</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>CSS classes (can change)</li>
                    <li>XPaths (fragile)</li>
                    <li>Dynamic IDs</li>
                    <li>Index-based selectors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dynamic IDs Example */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Handling Dynamic Elements</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Dynamic ID Example</Label>
                  <div className="flex items-center gap-4">
                    <Button id={dynamicId} data-testid="dynamic-button">
                      Button with Dynamic ID
                    </Button>
                    <code className="text-sm bg-muted p-2 rounded">
                      Current ID: {dynamicId}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notice how the ID changes every 3 seconds. Use data-testid
                    instead!
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Form Example</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Enter email"
                        aria-label="Email input"
                        data-testid="email-input"
                      />
                      <p className="text-sm text-muted-foreground">
                        Strong locator: data-testid="email-input"
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="submit-btn" data-testid="submit-button">
                        Submit
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Weak locator: className="submit-btn"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="waits" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Wait Strategies</CardTitle>
            <CardDescription>
              Understanding different types of waits and their importance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Types of Waits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Types of Waits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Implicit Wait</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Global timeout for finding elements. Use sparingly as it
                      affects all operations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Explicit Wait</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Waits for a specific condition. More precise and recommended
                      for most cases.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Fluent Wait</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Customizable wait with polling interval and ignored
                      exceptions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Interactive Example */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Wait Strategy Example</h3>
              <div className="space-y-4">
                <Button
                  onClick={handleLoadContent}
                  disabled={isLoading}
                  data-testid="load-content"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Load Content
                </Button>

                <div className="border rounded-lg p-4">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : showContent ? (
                    <div
                      className="space-y-2"
                      data-testid="loaded-content"
                    >
                      <h4 className="font-medium">Content Loaded!</h4>
                      <p className="text-sm text-muted-foreground">
                        This content appeared after a delay. In automation, you'd
                        need to wait for it.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Click the button to load content
                    </p>
                  )}
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Example Wait Strategy</h4>
                  <pre className="text-sm overflow-x-auto">
                    {`// Bad: Static sleep
await sleep(2000);

// Good: Wait for element
await waitForElement('[data-testid="loaded-content"]');

// Better: Wait for condition
await waitForCondition(() => 
  isElementVisible('[data-testid="loaded-content"]')
);`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}