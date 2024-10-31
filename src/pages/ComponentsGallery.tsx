import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Info, Loader2 } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  terms: z.boolean().refine((val) => val, 'You must accept the terms'),
  role: z.string().min(1, 'Please select a role'),
});

export function ComponentsGallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      age: 18,
      terms: false,
      role: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResult(JSON.stringify(values, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="form" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="form">Form Elements</TabsTrigger>
        <TabsTrigger value="interactive">Interactive</TabsTrigger>
        <TabsTrigger value="dynamic">Dynamic Features</TabsTrigger>
        <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
      </TabsList>

      <TabsContent value="form" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Elements Example</CardTitle>
            <CardDescription>
              Test various form elements with validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                data-testid="demo-form"
              >
                {/* Text Input */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter username"
                          data-testid="username-input"
                        />
                      </FormControl>
                      <FormDescription>
                        Must be at least 2 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter email"
                          data-testid="email-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number Input */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          data-testid="age-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Select Menu */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="role-select">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkbox */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="terms-checkbox"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept terms and conditions</FormLabel>
                        <FormDescription>
                          You must accept our terms and conditions
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  data-testid="submit-button"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </Form>

            {result && (
              <>
                <Separator className="my-4" />
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">{result}</pre>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="interactive" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Components</CardTitle>
            <CardDescription>
              Test various interactive components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Button Variants */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Button Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Accordion</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches your theme.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* HoverCard */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Hover Card</h3>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">Hover me</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Hover Card</h4>
                    <p className="text-sm">
                      This is a hover card component that shows additional
                      information on hover.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Alert Dialog */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Alert Dialog</h3>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Badges</h3>
              <div className="flex gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Switch */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Switch</h3>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dynamic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Features</CardTitle>
            <CardDescription>Test loading states and animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Loading States */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Loading States</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                  }}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Loading...' : 'Trigger Loading'}
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Progress</h3>
              <Progress value={progress} className="w-full" />
              <Button
                onClick={() => {
                  setProgress(0);
                  const interval = setInterval(() => {
                    setProgress((prev) => {
                      if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                      }
                      return prev + 10;
                    });
                  }, 500);
                }}
                disabled={progress > 0 && progress < 100}
              >
                Start Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="accessibility" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>
              Test keyboard navigation and screen reader support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Keyboard Navigation */}
              <div
                role="tabpanel"
                tabIndex={0}
                className={cn(
                  'rounded-lg border p-4 focus:outline-none focus:ring-2',
                  'focus:ring-ring focus:ring-offset-2'
                )}
              >
                <h3 className="text-sm font-medium">Keyboard Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  This panel is keyboard focusable. Try using Tab to navigate.
                </p>
              </div>

              {/* ARIA Labels */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">ARIA Labels</h3>
                <div className="flex items-center space-x-2">
                  <Button aria-label="Close dialog">
                    Button with ARIA Label
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More information"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Focus Management */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Focus Management</h3>
                <div className="flex gap-2">
                  <Button onClick={() => setIsLoading(!isLoading)}>
                    Trigger Action
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}