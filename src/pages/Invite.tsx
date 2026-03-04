import { useState } from "react";
import { Gift, Copy, Check, Twitter, Linkedin, Mail, DollarSign, Users, TrendingUp, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const Invite = () => {
  const { user, isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Generate referral link from user's referral code
  const referralCode = user?.referralCode || "";
  const referralLink = user ? `${window.location.origin}/signup?ref=${referralCode}` : "";

  // Calculate referral stats
  const referralCount = user?.referralCount || 0;
  const earnedAmount = referralCount * 20; // $20 per referral
  const pendingAmount = 0; // Could be calculated from pending referrals in a real system

  const handleCopy = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const message = "I've been using PerksNest to save thousands on SaaS tools. Get $20 off Premium with my link:";
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(referralLink);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=Save thousands on SaaS with PerksNest&body=${encodedMessage}%0A%0A${encodedUrl}`,
    };

    window.open(urls[platform], "_blank");
  };

  // Mock data for referred friends (in a real app, this would come from the backend)
  // For now, we'll generate mock referrals based on referralCount
  const generateMockReferrals = () => {
    if (!user || referralCount === 0) return [];

    const mockEmails = [
      "john@startup.com",
      "sarah@techco.io",
      "mike@agency.co",
      "emma@developer.io",
      "alex@business.com",
      "lisa@company.co",
      "david@enterprise.com",
      "jane@startup.io",
    ];

    const statuses = ["Premium", "Signed up", "Pending"];
    const months = ["Jan", "Feb", "Mar"];

    return Array.from({ length: Math.min(referralCount, mockEmails.length) }, (_, i) => ({
      email: mockEmails[i],
      status: i < Math.floor(referralCount * 0.6) ? "Premium" : statuses[i % statuses.length],
      date: `${months[i % months.length]} ${20 - i}, 2026`,
      earned: i < Math.floor(referralCount * 0.6) ? "$20" : undefined,
    }));
  };

  const referredFriends = generateMockReferrals();

  // Show auth modal if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero */}
          <section className="py-16 md:py-20 gradient-hero">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Give $20, Get $20
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Invite your friends to PerksNest. They get $20 off Premium, and you earn $20 for every friend who upgrades.
                </p>

                {/* Sign in prompt */}
                <div className="bg-card rounded-2xl border border-border p-8 max-w-md mx-auto">
                  <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-3">Sign in to access your referral link</h2>
                  <p className="text-muted-foreground mb-6">
                    Create an account or sign in to get your unique referral link and start earning.
                  </p>
                  <Button onClick={() => setShowAuthModal(true)} size="lg" className="w-full">
                    Sign In / Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <div className="container-wide py-12">
            <div className="bg-card rounded-2xl border border-border p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">How it works</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Share your link</h3>
                  <p className="text-sm text-muted-foreground">
                    Send your unique referral link to friends, colleagues, or your network
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">They sign up</h3>
                  <p className="text-sm text-muted-foreground">
                    Your friend signs up and gets $20 off their first year of Premium
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">You earn $20</h3>
                  <p className="text-sm text-muted-foreground">
                    Once they upgrade, you get $20 credited to your account automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} defaultTab="register" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 md:py-20 gradient-hero">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Give $20, Get $20
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Invite your friends to PerksNest. They get $20 off Premium, and you earn $20 for every friend who upgrades.
              </p>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="text-3xl font-bold text-primary">{referralCount}</div>
                  <div className="text-sm text-muted-foreground">Referrals</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="text-3xl font-bold text-success">${earnedAmount}</div>
                  <div className="text-sm text-muted-foreground">Earned</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="text-3xl font-bold text-foreground">${earnedAmount + pendingAmount}</div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Referral Link Card */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold mb-6">Your referral link</h2>
                
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-secondary rounded-lg px-4 py-3 font-mono text-sm truncate">
                    {referralLink}
                  </div>
                  <Button onClick={handleCopy} className="gap-2 shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="bg-accent/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Your referral code:</span>{" "}
                    <code className="bg-secondary px-2 py-1 rounded font-mono">{referralCode}</code>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                    Share on Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" />
                    Share on LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleShare("email")}
                  >
                    <Mail className="h-4 w-4" />
                    Share via Email
                  </Button>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold mb-6">How it works</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold mb-2">Share your link</h3>
                    <p className="text-sm text-muted-foreground">
                      Send your unique referral link to friends, colleagues, or your network
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold mb-2">They sign up</h3>
                    <p className="text-sm text-muted-foreground">
                      Your friend signs up and gets $20 off their first year of Premium
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold mb-2">You earn $20</h3>
                    <p className="text-sm text-muted-foreground">
                      Once they upgrade, you get $20 credited to your account automatically
                    </p>
                  </div>
                </div>
              </div>

              {/* Referred Friends */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold mb-6">Friends you've invited</h2>
                
                {referredFriends.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Earned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referredFriends.map((friend, index) => (
                          <tr key={index} className="border-b border-border last:border-0">
                            <td className="py-4 px-4 text-sm">{friend.email}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                friend.status === "Premium" 
                                  ? "bg-success/10 text-success"
                                  : friend.status === "Signed up"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary text-muted-foreground"
                              }`}>
                                {friend.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-muted-foreground">{friend.date}</td>
                            <td className="py-4 px-4 text-right text-sm font-medium text-success">
                              {friend.earned || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      You haven't invited anyone yet. Share your link to get started!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Balance */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  Your Balance
                </h3>
                <div className="text-4xl font-bold text-success mb-2">${earnedAmount.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Credits auto-apply to your next subscription renewal
                </p>
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total earned</span>
                    <span className="font-medium">${earnedAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">${pendingAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total referrals</span>
                    <span className="text-2xl font-bold">{referralCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Signed up</span>
                    <span className="text-2xl font-bold">{Math.floor(referralCount * 0.8)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Upgraded</span>
                    <span className="text-2xl font-bold text-success">{Math.floor(referralCount * 0.6)}</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg. per referral</span>
                      <span className="text-lg font-bold text-primary">$20</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-primary/10 rounded-2xl p-6">
                <h3 className="font-semibold mb-3">💡 Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Share your referral link on LinkedIn or Twitter when discussing startup tools. 
                  It's a natural way to help others save while earning credits!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Invite;