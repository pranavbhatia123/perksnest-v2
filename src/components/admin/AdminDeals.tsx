import { useState } from "react";
import { 
  Search, Filter, Download, Eye, Edit, Trash2, MoreVertical, Plus,
  CheckCircle, XCircle, Clock, PauseCircle, Archive, ArrowUpDown,
  ChevronLeft, ChevronRight, TrendingUp, BarChart3, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pendingDeals = [
  { id: 1, name: "Figma Professional - 50% Off", partner: "Figma Inc.", category: "Design", submittedAt: "2024-01-28", discount: "50% off for 12 months", estimatedSavings: "$600", priority: "high" },
  { id: 2, name: "MongoDB Atlas Credits", partner: "MongoDB", category: "Database", submittedAt: "2024-01-27", discount: "$500 in credits", estimatedSavings: "$500", priority: "medium" },
  { id: 3, name: "Stripe Fee Waiver", partner: "Stripe", category: "Payments", submittedAt: "2024-01-26", discount: "Waived fees on first $50K", estimatedSavings: "$1,450", priority: "high" },
  { id: 4, name: "Vercel Pro Credits", partner: "Vercel", category: "Development", submittedAt: "2024-01-25", discount: "$500 credits", estimatedSavings: "$500", priority: "low" },
];

const activeDeals = [
  { id: 1, name: "Notion - 6 Months Free", partner: "Notion Labs", category: "Productivity", status: "active", claims: 12453, redemptions: 10834, redemptionRate: 87, revenue: 24500, trend: "up" },
  { id: 2, name: "Google Cloud - $2,000 Credits", partner: "Google", category: "Cloud", status: "active", claims: 9821, redemptions: 9034, redemptionRate: 92, revenue: 18600, trend: "up" },
  { id: 3, name: "Stripe - Fee Waiver", partner: "Stripe", category: "Payments", status: "active", claims: 8764, redemptions: 6836, redemptionRate: 78, revenue: 15200, trend: "down" },
  { id: 4, name: "Make - 10,000 Credits", partner: "Make", category: "Automation", status: "active", claims: 7632, redemptions: 6487, redemptionRate: 85, revenue: 12400, trend: "up" },
  { id: 5, name: "HubSpot - 90% Off", partner: "HubSpot", category: "Marketing", status: "paused", claims: 6543, redemptions: 5300, redemptionRate: 81, revenue: 11200, trend: "up" },
  { id: 6, name: "Auth0 - 12 Months Free", partner: "Auth0", category: "Security", status: "active", claims: 5421, redemptions: 4608, redemptionRate: 85, revenue: 9800, trend: "up" },
];

const dealStats = {
  total: 563,
  active: 487,
  pending: 23,
  paused: 34,
  expired: 19,
  totalClaims: 156789,
  avgRedemptionRate: 84.2,
  totalSavingsDelivered: 5495688436
};

export const AdminDeals = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
      case "paused":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Paused</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-500">Medium</Badge>;
      default:
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deal Management</h1>
          <p className="text-muted-foreground">Manage all deals, approvals, and performance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Deals</p>
            <p className="text-xl font-bold">{dealStats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-xl font-bold text-green-600">{dealStats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending Approval</p>
            <p className="text-xl font-bold text-yellow-600">{dealStats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Paused</p>
            <p className="text-xl font-bold text-orange-600">{dealStats.paused}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Claims</p>
            <p className="text-xl font-bold">{(dealStats.totalClaims / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Redemption</p>
            <p className="text-xl font-bold text-primary">{dealStats.avgRedemptionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending Approval
            <Badge variant="destructive" className="h-5 px-1.5">{pendingDeals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search deals..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Deals Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4">Deal</th>
                      <th className="text-left p-4">Partner</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Claims</th>
                      <th className="text-left p-4">Redemption Rate</th>
                      <th className="text-left p-4">Revenue</th>
                      <th className="text-left p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDeals.map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{deal.name}</p>
                              <p className="text-xs text-muted-foreground">{deal.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{deal.partner}</td>
                        <td className="p-4">
                          <Badge variant="outline">{deal.category}</Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(deal.status)}</td>
                        <td className="p-4 text-sm">{deal.claims.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Progress value={deal.redemptionRate} className="w-16 h-2" />
                            <span className="text-sm">{deal.redemptionRate}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium">${deal.revenue.toLocaleString()}</td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                              <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit Deal</DropdownMenuItem>
                              <DropdownMenuItem><PauseCircle className="h-4 w-4 mr-2" /> Pause Deal</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Archive className="h-4 w-4 mr-2" /> Archive Deal
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between p-4 border-t">
                <p className="text-sm text-muted-foreground">Showing 1-6 of {dealStats.total} deals</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Deals Awaiting Approval ({pendingDeals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDeals.map((deal) => (
                  <div key={deal.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium">{deal.name}</p>
                        {getPriorityBadge(deal.priority)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Partner</p>
                          <p className="font-medium">{deal.partner}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{deal.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Discount</p>
                          <p className="font-medium text-green-600">{deal.discount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Est. Savings</p>
                          <p className="font-medium">{deal.estimatedSavings}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Submitted {deal.submittedAt}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDeals.slice(0, 5).map((deal, index) => (
                    <div key={deal.id} className="flex items-center gap-4">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{deal.name}</p>
                        <p className="text-sm text-muted-foreground">{deal.claims.toLocaleString()} claims</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{deal.redemptionRate}%</p>
                        <p className="text-xs text-muted-foreground">redemption</p>
                      </div>
                      {deal.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Productivity", deals: 87, claims: 45230, redemption: 89 },
                    { category: "Development", deals: 124, claims: 38900, redemption: 85 },
                    { category: "Design", deals: 56, claims: 28400, redemption: 82 },
                    { category: "Marketing", deals: 78, claims: 21500, redemption: 78 },
                    { category: "Cloud", deals: 45, claims: 18600, redemption: 91 },
                  ].map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{cat.category}</span>
                        <span className="text-sm text-muted-foreground">{cat.deals} deals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={cat.redemption} className="flex-1 h-2" />
                        <span className="text-xs font-medium w-12">{cat.redemption}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
