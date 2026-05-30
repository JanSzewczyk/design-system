# Tabs

**Category:** Misc · **Public:** yes · **Stories:** 5

## Import
```ts
import { Tabs } from "@szum-tech/design-system";
```

## Examples
### Tabs Story
```tsx
<Tabs defaultValue="overview" className="w-140">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Overview</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        View your key metrics and recent project activity. Track progress across all your active projects.
      </p>
      <p className="mt-2 text-sm">You have 12 active projects and 3 pending tasks.</p>
    </div>
  </TabsContent>
  <TabsContent value="analytics">
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Analytics</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Track performance and user engagement metrics. Monitor trends and identify growth opportunities.
      </p>
      <p className="mt-2 text-sm">Page views are up 25% compared to last month.</p>
    </div>
  </TabsContent>
  <TabsContent value="reports">
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Reports</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Generate and download your detailed reports. Export data in multiple formats for analysis.
      </p>
      <p className="mt-2 text-sm">You have 5 reports ready and available to export.</p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Settings</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Manage your account preferences and options. Customize your experience to fit your needs.
      </p>
      <p className="mt-2 text-sm">Configure notifications, security, and themes.</p>
    </div>
  </TabsContent>
</Tabs>
```

### Line Variant
```tsx
<Tabs defaultValue="overview" className="w-125">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Overview content.</p>
    </div>
  </TabsContent>
  <TabsContent value="analytics">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Analytics content.</p>
    </div>
  </TabsContent>
  <TabsContent value="reports">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Reports content.</p>
    </div>
  </TabsContent>
</Tabs>
```

### Vertical Orientation
```tsx
<Tabs defaultValue="account" orientation="vertical" className="w-150">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Account settings content.</p>
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Password settings content.</p>
    </div>
  </TabsContent>
  <TabsContent value="notifications">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Notifications settings content.</p>
    </div>
  </TabsContent>
</Tabs>
```

### With Disabled
```tsx
<Tabs defaultValue="home" className="w-96">
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="settings" disabled>
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="home">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Home content.</p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Settings content.</p>
    </div>
  </TabsContent>
</Tabs>
```

### With Icons
```tsx
<Tabs defaultValue="preview" className="w-96">
  <TabsList>
    <TabsTrigger value="preview">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M6 8h.01M2 12h20" />
      </svg>
      Preview
    </TabsTrigger>
    <TabsTrigger value="code">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      Code
    </TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Component preview content.</p>
    </div>
  </TabsContent>
  <TabsContent value="code">
    <div className="rounded-lg border p-4">
      <p className="text-sm">Source code content.</p>
    </div>
  </TabsContent>
</Tabs>
```
