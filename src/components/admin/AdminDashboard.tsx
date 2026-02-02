import { 
  Users, Package, DollarSign, TrendingUp, BarChart3, AlertTriangle, 
  CheckCircle, XCircle, ChevronRight, Eye, Mail, Activity, ArrowUpRight,
  ArrowDownRight, Clock, UserPlus, ShoppingBag, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const adminStats = {
  totalUsers: 212980,
  activeUsers: 156432,
  premiumUsers: 34567,
  freeUsers: 178413,
  totalDeals: 563,
  activeDeals: 487,
  pendingApproval: 23,
  totalRevenue: 5495688,
  mrr: 234500,
  arr: 2814000,
  partners: 975,
  totalSavings: 5495688436,
  conversionRate: 16.2,
  churnRate: 2.8,
  nps: 72,
  avgSessionDuration: "8m 34s"
};

const pendingDeals = [
  {
    id: 1,
    name: "Figma Professional - 50% Off",
    partner: "Figma Inc.",
    category: "Design",
    submittedAt: "2024-01-28",
    discount: "50% off for 12 months",
    estimatedSavings: "$600"
  },
  {
    id: 2,
    name: "MongoDB Atlas Credits",
    partner: "MongoDB",
    category: "Database",
    submittedAt: "2024-01-27",
    discount: "$500 in credits",
    estimatedSavings: "$500"
  },
  {
    id: 3,
    name: "Stripe Fee Waiver",
    partner: "Stripe",
    category: "Payments",
    submittedAt: "2024-01-26",
    discount: "Waived fees on first $50K",
    estimatedSavings: "$1,450"
  }
];

const recentActivity = [
  { id: 1, type: "user_signup", user: "Sarah Johnson", action: "signed up for Premium", time: "2 mins ago", icon: UserPlus },
  { id: 2, type: "deal_claimed", user: "Michael Chen", action: "claimed Notion deal", time: "5 mins ago", icon: ShoppingBag },
  { id: 3, type: "partner_added", user: "Stripe", action: "submitted new deal", time: "12 mins ago", icon: Package },
  { id: 4, type: "referral", user: "Emily Rodriguez", action: "earned $20 referral credit", time: "18 mins ago", icon: Zap },
  { id: 5, type: "user_signup", user: "James Wilson", action: "signed up for Free plan", time: "25 mins ago", icon: UserPlus },
];

const topDeals = [
  { name: "Notion", claims: 12453, redemptionRate: 87, trend: "up" },
  { name: "Google Cloud", claims: 9821, redemptionRate: 92, trend: "up" },
  { name: "Stripe", claims: 8764, redemptionRate: 78, trend: "down" },
  { name: "Make", claims: 7632, redemptionRate: 85, trend: "up" },
  { name: "HubSpot", claims: 6543, redemptionRate: 81, trend: "up" },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button>
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold">{adminStats.activeDeals}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">{adminStats.pendingApproval} pending</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${adminStats.mrr.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.2%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl font-bold">${(adminStats.totalSavings / 1000000000).toFixed(2)}B</p>
                <p className="text-xs text-muted-foreground mt-1">Delivered to users</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-bold">{adminStats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <Progress value={adminStats.conversionRate} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Churn Rate</p>
                <p className="text-lg font-bold">{adminStats.churnRate}%</p>
              </div>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </div>
            <Progress value={adminStats.churnRate * 10} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">NPS Score</p>
                <p className="text-lg font-bold">{adminStats.nps}</p>
              </div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <Progress value={adminStats.nps} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Session</p>
                <p className="text-lg font-bold">{adminStats.avgSessionDuration}</p>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Deals Approval */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Pending Deal Approvals
            </CardTitle>
            <Badge variant="secondary">{pendingDeals.length} pending</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{deal.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">{deal.partner}</span>
                      <Badge variant="outline" className="text-xs">{deal.category}</Badge>
                    </div>
                    <p className="text-sm text-green-600 mt-1">{deal.discount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Pending <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Deals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Top Performing Deals</CardTitle>
          <Button variant="ghost" size="sm">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {topDeals.map((deal, index) => (
              <Card key={deal.name} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    {deal.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                  <p className="font-semibold">{deal.name}</p>
                  <p className="text-sm text-muted-foreground">{deal.claims.toLocaleString()} claims</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Redemption</span>
                      <span>{deal.redemptionRate}%</span>
                    </div>
                    <Progress value={deal.redemptionRate} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Free Users</span>
                  <span className="text-sm font-medium">{adminStats.freeUsers.toLocaleString()}</span>
                </div>
                <Progress value={(adminStats.freeUsers / adminStats.totalUsers) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Premium Users</span>
                  <span className="text-sm font-medium">{adminStats.premiumUsers.toLocaleString()}</span>
                </div>
                <Progress value={(adminStats.premiumUsers / adminStats.totalUsers) * 100} className="h-2 [&>div]:bg-green-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Active Users (30d)</span>
                  <span className="text-sm font-medium">{adminStats.activeUsers.toLocaleString()}</span>
                </div>
                <Progress value={(adminStats.activeUsers / adminStats.totalUsers) * 100} className="h-2 [&>div]:bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-700">Healthy</span>
                </div>
                <p className="font-semibold text-green-900">API Uptime</p>
                <p className="text-2xl font-bold text-green-700">99.98%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-blue-700">Normal</span>
                </div>
                <p className="font-semibold text-blue-900">Response Time</p>
                <p className="text-2xl font-bold text-blue-700">142ms</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs text-purple-700">Active</span>
                </div>
                <p className="font-semibold text-purple-900">Partners</p>
                <p className="text-2xl font-bold text-purple-700">{adminStats.partners}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-xs text-orange-700">Processing</span>
                </div>
                <p className="font-semibold text-orange-900">Active Claims</p>
                <p className="text-2xl font-bold text-orange-700">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
