import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { PartnerDashboard } from "@/components/partner/PartnerDashboard";
import { PartnerDeals } from "@/components/partner/PartnerDeals";
import { PartnerAnalytics } from "@/components/partner/PartnerAnalytics";
import { PartnerRevenue } from "@/components/partner/PartnerRevenue";
import { PartnerMessages } from "@/components/partner/PartnerMessages";
import { PartnerSettings } from "@/components/partner/PartnerSettings";
import { useAuth } from "@/lib/auth";
import { getPremiumDeals, type Deal } from "@/data/deals";

// Generate mock analytics data for partner deals
const generateMockAnalytics = (deal: Deal, index: number) => {
  const baseViews = deal.memberCount * (10 + index * 2);
  const claims = Math.floor(baseViews * (0.15 + index * 0.02));
  const redemptions = Math.floor(claims * (0.8 + index * 0.05));
  const redemptionRate = ((redemptions / claims) * 100).toFixed(1);
  const revenue = Math.floor(parseInt(deal.savings.replace(/[^0-9]/g, '')) * 0.15);

  return {
    views: baseViews,
    claims,
    redemptions,
    redemptionRate: parseFloat(redemptionRate),
    revenue,
  };
};

const PartnerPortal = () => {
  const { user, isPartner, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Authentication Guard - Redirect if not partner
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!isPartner) {
      navigate("/");
    }
  }, [isAuthenticated, isPartner, navigate]);

  // Return early if not authenticated to prevent flash
  if (!isAuthenticated || !isPartner) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You need to be logged in as a partner to access this portal.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get premium deals for this partner
  const premiumDeals = getPremiumDeals();

  // Transform deals with mock analytics
  const deals = premiumDeals.slice(0, 5).map((deal, index) => {
    const analytics = generateMockAnalytics(deal, index);
    return {
      id: deal.id,
      name: deal.dealText.length > 50 ? deal.name + " Premium" : deal.dealText,
      status: index === 2 ? "paused" : "active",
      ...analytics,
      createdAt: "2026-01-15",
      expiresAt: "2026-12-31"
    };
  });

  // Calculate partner stats from deals
  const totalViews = deals.reduce((sum, deal) => sum + deal.views, 0);
  const totalClaims = deals.reduce((sum, deal) => sum + deal.claims, 0);
  const totalRedemptions = deals.reduce((sum, deal) => sum + deal.redemptions, 0);
  const totalRevenue = deals.reduce((sum, deal) => sum + deal.revenue, 0);
  const conversionRate = totalClaims > 0 ? ((totalRedemptions / totalClaims) * 100).toFixed(1) : 0;

  // Partner Data with calculated stats
  const partnerData = {
    name: user?.name || "Partner User",
    tier: "Premium Partner",
    activeDeals: deals.filter(d => d.status === "active").length,
    totalClaims,
    totalRedemptions,
    revenue: totalRevenue,
    pendingCommission: Math.floor(totalRevenue * 0.15),
    performanceScore: 92,
    totalViews,
    conversionRate: parseFloat(conversionRate.toString())
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <PartnerDashboard partnerData={partnerData} deals={deals} />;
      case "deals":
        return <PartnerDeals />;
      case "analytics":
        return <PartnerAnalytics partnerData={partnerData} deals={deals} />;
      case "revenue":
        return <PartnerRevenue />;
      case "messages":
        return <PartnerMessages />;
      case "settings":
        return <PartnerSettings />;
      default:
        return <PartnerDashboard partnerData={partnerData} deals={deals} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-bold text-xl">perksnest.</Link>
              <Badge className="bg-primary/10 text-primary border-primary/20">Partner Portal</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl">
                  📝
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-sm">{partnerData.name}</p>
                  <p className="text-xs text-muted-foreground">{partnerData.tier}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <PartnerSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          performanceScore={partnerData.performanceScore} 
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PartnerPortal;
