import { useState, useMemo } from "react";
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
import { dealsData } from "@/data/deals";

const pendingDeals = [
  { id: 1, name: "Figma Professional - 50% Off", partner: "Figma Inc.", category: "Design", submittedAt: "2024-01-28", discount: "50% off for 12 months", estimatedSavings: "$600", priority: "high" },
  { id: 2, name: "MongoDB Atlas Credits", partner: "MongoDB", category: "Database", submittedAt: "2024-01-27", discount: "$500 in credits", estimatedSavings: "$500", priority: "medium" },
  { id: 3, name: "Stripe Fee Waiver", partner: "Stripe", category: "Payments", submittedAt: "2024-01-26", discount: "Waived fees on first $50K", estimatedSavings: "$1,450", priority: "high" },
  { id: 4, name: "Vercel Pro Credits", partner: "Vercel", category: "Development", submittedAt: "2024-01-25", discount: "$500 credits", estimatedSavings: "$500", priority: "low" },
];

export const AdminDeals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate real deal stats
  const dealStats = useMemo(() => {
    const totalClaims = dealsData.reduce((sum, deal) => sum + deal.memberCount, 0);
    const avgRedemptionRate = 84.2; // Mock redemption rate

    // Get category breakdown
    const categoryMap = new Map<string, { count: number; claims: number }>();
    dealsData.forEach(deal => {
      const existing = categoryMap.get(deal.category) || { count: 0, claims: 0 };
      categoryMap.set(deal.category, {
        count: existing.count + 1,
        claims: existing.claims + deal.memberCount
      });
    });

    return {
      total: dealsData.length,
      active: dealsData.length,
      pending: pendingDeals.length,
      paused: 0,
      expired: 0,
      totalClaims,
      avgRedemptionRate,
      totalSavingsDelivered: dealsData.reduce((sum, deal) => {
        const savings = parseFloat(deal.savings.replace(/[$,]/g, ''));
        return sum + (savings * deal.memberCount);
      }, 0),
      categories: Array.from(categoryMap.entries()).map(([name, data]) => ({
        category: name,
        deals: data.count,
        claims: data.claims,
        redemption: Math.floor(78 + Math.random() * 15) // Mock redemption 78-93%
      }))
    };
  }, []);

  // Transform deals data for table
  const allDeals = useMemo(() => {
    return dealsData.map(deal => ({
      id: deal.id,
      name: deal.name,
      partner: deal.name, // Using name as partner since we don't have separate partner field
      category: deal.category,
      status: "active" as const,
      claims: deal.memberCount,
      redemptions: Math.floor(deal.memberCount * (0.85 + Math.random() * 0.1)),
      redemptionRate: Math.floor(85 + Math.random() * 10),
      revenue: Math.floor(deal.memberCount * 12.5), // Mock revenue
      trend: Math.random() > 0.3 ? "up" as const : "down" as const,
      logo: deal.logo,
      dealText: deal.dealText,
      savings: deal.savings
    }));
  }, []);

  // Filter and search deals
  const filteredDeals = useMemo(() => {
    return allDeals.filter(deal => {
      const matchesSearch = searchQuery === "" ||
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || deal.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [allDeals, searchQuery, statusFilter, categoryFilter]);

  // Paginate deals
  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDeals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDeals, currentPage]);

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(dealsData.map(d => d.category));
    return Array.from(cats);
  }, []);

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
                  <Input
                    placeholder="Search deals..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setCurrentPage(1);
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
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
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Claims</th>
                      <th className="text-left p-4">Savings</th>
                      <th className="text-left p-4">Redemption Rate</th>
                      <th className="text-left p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDeals.map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={deal.logo}
                              alt={deal.name}
                              className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div>
                              <p className="font-medium">{deal.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{deal.dealText}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="capitalize">{deal.category}</Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(deal.status)}</td>
                        <td className="p-4 text-sm">{deal.claims.toLocaleString()}</td>
                        <td className="p-4 text-sm font-medium text-green-600">{deal.savings}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Progress value={deal.redemptionRate} className="w-16 h-2" />
                            <span className="text-sm">{deal.redemptionRate}%</span>
                          </div>
                        </td>
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
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredDeals.length)} of {filteredDeals.length} deals
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        className={currentPage === pageNum ? "bg-primary text-primary-foreground" : ""}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && <span className="text-muted-foreground">...</span>}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
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
                  {allDeals.slice(0, 5).map((deal, index) => (
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
                  {dealStats.categories.slice(0, 5).map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium capitalize">{cat.category}</span>
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
