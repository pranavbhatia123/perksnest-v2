import { 
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Download, Calendar, BarChart3, CreditCard, Users, RefreshCcw, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueStats = {
  mrr: 234500,
  mrrGrowth: 8.2,
  arr: 2814000,
  arrGrowth: 15.4,
  totalRevenue: 5495688,
  premiumRevenue: 4234500,
  whitelabelRevenue: 1261188,
  avgRevenuePerUser: 12.45,
  ltv: 148.50,
  cac: 24.30,
  churnRevenue: 18500,
  churnRate: 2.8,
  netRevenue: 216000,
  refunds: 3450,
  failedPayments: 12340
};

const revenueByPlan = [
  { plan: "Premium Annual", revenue: 2456000, users: 16432, growth: 12.5 },
  { plan: "Premium Monthly", revenue: 1234500, users: 8234, growth: 8.3 },
  { plan: "White Label Enterprise", revenue: 892000, users: 45, growth: 24.6 },
  { plan: "White Label Standard", revenue: 369188, users: 123, growth: 18.2 },
];

const recentTransactions = [
  { id: 1, user: "Sarah Johnson", email: "sarah@techstart.com", plan: "Premium Annual", amount: 149, status: "completed", date: "2024-01-28" },
  { id: 2, user: "TechCorp Inc.", email: "billing@techcorp.io", plan: "White Label", amount: 2499, status: "completed", date: "2024-01-28" },
  { id: 3, user: "Michael Chen", email: "michael@startup.co", plan: "Premium Monthly", amount: 14.99, status: "completed", date: "2024-01-28" },
  { id: 4, user: "Emily Rodriguez", email: "emily@growth.co", plan: "Premium Annual", amount: 149, status: "refunded", date: "2024-01-27" },
  { id: 5, user: "James Wilson", email: "james@dev.io", plan: "Premium Monthly", amount: 14.99, status: "failed", date: "2024-01-27" },
];

const monthlyData = [
  { month: "Aug", revenue: 198000, users: 28500 },
  { month: "Sep", revenue: 205000, users: 29800 },
  { month: "Oct", revenue: 212000, users: 31200 },
  { month: "Nov", revenue: 221000, users: 32900 },
  { month: "Dec", revenue: 228000, users: 33800 },
  { month: "Jan", revenue: 234500, users: 34567 },
];

export const AdminRevenue = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case "refunded":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Refunded</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue & Analytics</h1>
          <p className="text-muted-foreground">Track financial performance and key metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="365d">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold">${revenueStats.mrr.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{revenueStats.mrrGrowth}%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Recurring Revenue</p>
                <p className="text-2xl font-bold">${(revenueStats.arr / 1000000).toFixed(2)}M</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{revenueStats.arrGrowth}%</span>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customer LTV</p>
                <p className="text-2xl font-bold">${revenueStats.ltv.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  LTV:CAC Ratio: {(revenueStats.ltv / revenueStats.cac).toFixed(1)}x
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Churn</p>
                <p className="text-2xl font-bold">${revenueStats.churnRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">{revenueStats.churnRate}%</span>
                  <span className="text-xs text-muted-foreground">churn rate</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <RefreshCcw className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Revenue/User</p>
            <p className="text-lg font-bold">${revenueStats.avgRevenuePerUser}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">CAC</p>
            <p className="text-lg font-bold">${revenueStats.cac}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Net Revenue</p>
            <p className="text-lg font-bold text-green-600">${revenueStats.netRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Refunds</p>
            <p className="text-lg font-bold text-yellow-600">${revenueStats.refunds.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Failed Payments</p>
            <p className="text-lg font-bold text-red-600">${revenueStats.failedPayments.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="plans">Revenue by Plan</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-8">{data.month}</span>
                      <div className="flex-1">
                        <Progress 
                          value={(data.revenue / 250000) * 100} 
                          className="h-6"
                        />
                      </div>
                      <span className="text-sm font-medium w-20 text-right">
                        ${(data.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Premium Subscriptions</span>
                      <span className="text-sm font-bold">${(revenueStats.premiumRevenue / 1000000).toFixed(2)}M</span>
                    </div>
                    <Progress 
                      value={(revenueStats.premiumRevenue / revenueStats.totalRevenue) * 100} 
                      className="h-3 [&>div]:bg-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((revenueStats.premiumRevenue / revenueStats.totalRevenue) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">White Label Solutions</span>
                      <span className="text-sm font-bold">${(revenueStats.whitelabelRevenue / 1000000).toFixed(2)}M</span>
                    </div>
                    <Progress 
                      value={(revenueStats.whitelabelRevenue / revenueStats.totalRevenue) * 100} 
                      className="h-3 [&>div]:bg-purple-600"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((revenueStats.whitelabelRevenue / revenueStats.totalRevenue) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Plan</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-muted/30">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{tx.user}</p>
                            <p className="text-sm text-muted-foreground">{tx.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{tx.plan}</Badge>
                        </td>
                        <td className="p-4 font-medium">${tx.amount}</td>
                        <td className="p-4">{getStatusBadge(tx.status)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {revenueByPlan.map((plan) => (
              <Card key={plan.plan}>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">{plan.plan}</p>
                  <p className="text-2xl font-bold mt-2">${(plan.revenue / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{plan.users.toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+{plan.growth}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Next Month (Feb)</p>
                  <p className="text-2xl font-bold text-primary mt-2">$251,800</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+7.4% projected</span>
                  </div>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Q1 2024 Total</p>
                  <p className="text-2xl font-bold text-primary mt-2">$742,500</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">On track</span>
                  </div>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">2024 Projection</p>
                  <p className="text-2xl font-bold text-primary mt-2">$3.2M</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+18.2% YoY</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Churn Risk Alert</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      34 premium users have shown reduced engagement this month. Consider launching a re-engagement campaign to prevent potential revenue loss of ~$5,066.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
