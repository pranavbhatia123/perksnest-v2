import { useState } from "react";
import { AdminHeader, AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminDeals } from "@/components/admin/AdminDeals";
import { AdminPartners } from "@/components/admin/AdminPartners";
import { AdminRevenue } from "@/components/admin/AdminRevenue";
import { AdminSettings } from "@/components/admin/AdminSettings";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <AdminUsers />;
      case "deals":
        return <AdminDeals />;
      case "partners":
        return <AdminPartners />;
      case "revenue":
        return <AdminRevenue />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
