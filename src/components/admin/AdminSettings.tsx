import { useState } from "react";
import { 
  Settings, Shield, Bell, Mail, CreditCard, Globe, Palette, Users,
  Key, Database, Webhook, Lock, Save, AlertTriangle, Check, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const AdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApproveDeals, setAutoApproveDeals] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage platform configuration and preferences</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Settings
              </CardTitle>
              <CardDescription>Configure basic platform settings and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="perksnest" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@perksnest.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Platform Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="perksnest helps startups and businesses discover and claim exclusive SaaS deals."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary" />
                    <Input defaultValue="#7C3AED" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary" />
                    <Input defaultValue="#F3F4F6" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500" />
                    <Input defaultValue="#10B981" className="flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure authentication and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Password Minimum Length</Label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label>Password Expiry (days)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API access keys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Production API Key</p>
                    <code className="text-sm text-muted-foreground">pk_live_****************************1234</code>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reveal</Button>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Test API Key</p>
                    <code className="text-sm text-muted-foreground">pk_test_****************************5678</code>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reveal</Button>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Bell className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Events</h4>
                <div className="grid gap-3">
                  {[
                    { event: "New user signup", enabled: true },
                    { event: "New deal submission", enabled: true },
                    { event: "Partner application", enabled: true },
                    { event: "High-value transaction", enabled: true },
                    { event: "Failed payment", enabled: true },
                    { event: "User feedback/review", enabled: false },
                  ].map((item) => (
                    <div key={item.event} className="flex items-center justify-between py-2">
                      <span className="text-sm">{item.event}</span>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing Configuration
              </CardTitle>
              <CardDescription>Configure pricing, plans, and payment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Premium Monthly Price</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 rounded-l-md">$</span>
                    <Input type="number" defaultValue="14.99" className="rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Premium Annual Price</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 rounded-l-md">$</span>
                    <Input type="number" defaultValue="149" className="rounded-l-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Referral Reward Amount</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 rounded-l-md">$</span>
                  <Input type="number" defaultValue="20" className="rounded-l-none max-w-[200px]" />
                </div>
                <p className="text-xs text-muted-foreground">Amount credited to both referrer and referee</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Stripe Connected</span>
                </div>
                <p className="text-sm text-muted-foreground">Connected account: acct_****1234</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Third-Party Integrations
              </CardTitle>
              <CardDescription>Connect external services and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { name: "Stripe", description: "Payment processing", status: "connected", icon: "💳" },
                  { name: "Sendgrid", description: "Email delivery", status: "connected", icon: "📧" },
                  { name: "Slack", description: "Team notifications", status: "connected", icon: "💬" },
                  { name: "Google Analytics", description: "Website analytics", status: "connected", icon: "📊" },
                  { name: "Intercom", description: "Customer support", status: "disconnected", icon: "💭" },
                  { name: "Zapier", description: "Workflow automation", status: "disconnected", icon: "⚡" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    {integration.status === "connected" ? (
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">Connected</Badge>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    ) : (
                      <Button size="sm">Connect</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>System configuration and developer options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Maintenance Mode</p>
                    <p className="text-sm text-yellow-700">When enabled, users will see a maintenance page</p>
                  </div>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Database className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Auto-Approve Deals</p>
                    <p className="text-sm text-muted-foreground">Automatically approve deals from verified partners</p>
                  </div>
                </div>
                <Switch checked={autoApproveDeals} onCheckedChange={setAutoApproveDeals} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Deal Cache TTL (seconds)</Label>
                  <Input type="number" defaultValue="3600" />
                </div>
                <div className="space-y-2">
                  <Label>Rate Limit (requests/minute)</Label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>

              <div className="p-4 border border-destructive/50 rounded-lg">
                <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Clear all cache</p>
                    <p className="text-xs text-muted-foreground">This will clear all cached data</p>
                  </div>
                  <Button variant="destructive" size="sm">Clear Cache</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
