// src/lib/store.ts — Central localStorage data store for PerksNest

export interface PartnerDeal {
  id: string;
  partnerId: string;
  partnerName: string;
  name: string;
  description: string;
  dealText: string;
  savings: string;
  category: string;
  websiteUrl: string;
  logoUrl: string;
  promoCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  approvedAt?: string;
  views: number;
  claims: number;
}

export interface Bookmark {
  userId: string;
  dealIds: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'deal_approved' | 'deal_rejected' | 'general';
  read: boolean;
  createdAt: string;
  dealId?: string;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportEmail: string;
  twitter: string;
  linkedin: string;
}

export interface PartnerSettings {
  companyName: string;
  website: string;
  contactEmail: string;
  description: string;
  twitter: string;
  linkedin: string;
}

export interface ClaimEvent {
  userId: string;
  userName: string;
  dealId: string;
  dealName: string;
  timestamp: string;
}

export interface MessageThread {
  conversationId: number;
  messages: { id: number; sender: string; text: string; time: string; read: boolean; isOwn?: boolean }[];
}

// ── Partner Deals ──
export const getPartnerDeals = (): PartnerDeal[] => {
  try { return JSON.parse(localStorage.getItem('pn_partner_deals') || '[]'); } catch { return []; }
};
export const savePartnerDeals = (deals: PartnerDeal[]) =>
  localStorage.setItem('pn_partner_deals', JSON.stringify(deals));

export const addPartnerDeal = (deal: PartnerDeal) => {
  const deals = getPartnerDeals();
  deals.unshift(deal);
  savePartnerDeals(deals);
};

export const updatePartnerDeal = (id: string, updates: Partial<PartnerDeal>) => {
  const deals = getPartnerDeals().map(d => d.id === id ? { ...d, ...updates } : d);
  savePartnerDeals(deals);
};

// ── Bookmarks ──
export const getBookmarks = (userId: string): string[] => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_bookmarks') || '{}');
    return all[userId] || [];
  } catch { return []; }
};
export const toggleBookmark = (userId: string, dealId: string): boolean => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_bookmarks') || '{}');
    const current: string[] = all[userId] || [];
    const isBookmarked = current.includes(dealId);
    all[userId] = isBookmarked ? current.filter(id => id !== dealId) : [...current, dealId];
    localStorage.setItem('pn_bookmarks', JSON.stringify(all));
    return !isBookmarked;
  } catch { return false; }
};

// ── Notifications ──
export const getNotifications = (userId: string): Notification[] => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_notifications') || '{}');
    return (all[userId] || []).sort((a: Notification, b: Notification) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
};
export const addNotification = (notification: Notification) => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_notifications') || '{}');
    all[notification.userId] = [notification, ...(all[notification.userId] || [])];
    localStorage.setItem('pn_notifications', JSON.stringify(all));
  } catch {}
};
export const markNotificationRead = (userId: string, notificationId: string) => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_notifications') || '{}');
    all[userId] = (all[userId] || []).map((n: Notification) =>
      n.id === notificationId ? { ...n, read: true } : n);
    localStorage.setItem('pn_notifications', JSON.stringify(all));
  } catch {}
};
export const markAllNotificationsRead = (userId: string) => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_notifications') || '{}');
    all[userId] = (all[userId] || []).map((n: Notification) => ({ ...n, read: true }));
    localStorage.setItem('pn_notifications', JSON.stringify(all));
  } catch {}
};

// ── Admin Settings ──
export const getAdminSettings = (): AdminSettings => {
  try {
    return JSON.parse(localStorage.getItem('pn_admin_settings') || 'null') || {
      siteName: 'PerksNest',
      siteDescription: 'The #1 platform for exclusive SaaS deals',
      contactEmail: 'hello@perksnest.co',
      supportEmail: 'support@perksnest.co',
      twitter: 'https://twitter.com/perksnest',
      linkedin: 'https://linkedin.com/company/perksnest',
    };
  } catch { return { siteName: 'PerksNest', siteDescription: '', contactEmail: '', supportEmail: '', twitter: '', linkedin: '' }; }
};
export const saveAdminSettings = (settings: AdminSettings) =>
  localStorage.setItem('pn_admin_settings', JSON.stringify(settings));

// ── Partner Settings ──
export const getPartnerSettings = (partnerId: string): PartnerSettings => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_partner_settings') || '{}');
    return all[partnerId] || { companyName: '', website: '', contactEmail: '', description: '', twitter: '', linkedin: '' };
  } catch { return { companyName: '', website: '', contactEmail: '', description: '', twitter: '', linkedin: '' }; }
};
export const savePartnerSettings = (partnerId: string, settings: PartnerSettings) => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_partner_settings') || '{}');
    all[partnerId] = settings;
    localStorage.setItem('pn_partner_settings', JSON.stringify(all));
  } catch {}
};

// ── Claim Events (for activity feed) ──
export const getClaimEvents = (): ClaimEvent[] => {
  try { return JSON.parse(localStorage.getItem('pn_claim_events') || '[]'); } catch { return []; }
};
export const addClaimEvent = (event: ClaimEvent) => {
  const events = getClaimEvents();
  events.unshift(event);
  localStorage.setItem('pn_claim_events', JSON.stringify(events.slice(0, 100)));
};

// ── Message Threads ──
export const getMessageThread = (conversationId: number): MessageThread | null => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_messages') || '{}');
    return all[conversationId] || null;
  } catch { return null; }
};
export const saveMessageThread = (thread: MessageThread) => {
  try {
    const all = JSON.parse(localStorage.getItem('pn_messages') || '{}');
    all[thread.conversationId] = thread;
    localStorage.setItem('pn_messages', JSON.stringify(all));
  } catch {}
};

// ── Deal Views ──
export const trackDealView = (dealId: string) => {
  try {
    const views = JSON.parse(localStorage.getItem('pn_deal_views') || '{}');
    views[dealId] = (views[dealId] || 0) + 1;
    localStorage.setItem('pn_deal_views', JSON.stringify(views));
  } catch {}
};

// ── Email Notifications (via PerksNest API) ──────────────────────────────────
const API_URL = 'https://api.perksnest.co';

export const sendEmail = async (payload: {
  type: 'welcome' | 'deal_approved' | 'deal_rejected' | 'deal_claimed';
  to: string;
  name?: string;
  dealName?: string;
  dealCategory?: string;
  reason?: string;
  promoCode?: string;
}): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/api/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.warn('Email notification failed (non-critical):', e);
    return false;
  }
};

// ─── UPVOTES ──────────────────────────────────────────────────────────────────
export interface UpvoteStore {
  [dealId: string]: string[]; // dealId → array of userIds who upvoted
}

export function getUpvotes(): UpvoteStore {
  try { return JSON.parse(localStorage.getItem('pn_upvotes') || '{}'); } catch { return {}; }
}

export function toggleUpvote(dealId: string, userId: string): boolean {
  const store = getUpvotes();
  const voters = store[dealId] || [];
  const already = voters.includes(userId);
  store[dealId] = already ? voters.filter(id => id !== userId) : [...voters, userId];
  localStorage.setItem('pn_upvotes', JSON.stringify(store));
  return !already; // true = upvoted, false = un-upvoted
}

export function getUpvoteCount(dealId: string): number {
  const store = getUpvotes();
  return (store[dealId] || []).length;
}

export function hasUpvoted(dealId: string, userId: string): boolean {
  const store = getUpvotes();
  return (store[dealId] || []).includes(userId);
}

// ─── REFERRALS ────────────────────────────────────────────────────────────────
export interface ReferralEntry {
  code: string;          // referrer's code
  referrerId: string;
  referrerName: string;
  referreeEmail: string;
  referreeId?: string;
  status: 'pending' | 'converted' | 'paid';
  creditAmount: number;
  createdAt: string;
  convertedAt?: string;
}

export function getReferrals(): ReferralEntry[] {
  try { return JSON.parse(localStorage.getItem('pn_referrals') || '[]'); } catch { return []; }
}

export function trackReferral(code: string, referrerId: string, referrerName: string, referreeEmail: string): void {
  const refs = getReferrals();
  if (refs.find(r => r.referreeEmail === referreeEmail)) return; // already referred
  refs.push({ code, referrerId, referrerName, referreeEmail, status: 'pending', creditAmount: 20, createdAt: new Date().toISOString() });
  localStorage.setItem('pn_referrals', JSON.stringify(refs));
}

export function getReferralsByUser(userId: string): ReferralEntry[] {
  return getReferrals().filter(r => r.referrerId === userId);
}

export function convertReferral(referreeEmail: string, referreeId: string): void {
  const refs = getReferrals().map(r =>
    r.referreeEmail === referreeEmail
      ? { ...r, status: 'converted' as const, referreeId, convertedAt: new Date().toISOString() }
      : r
  );
  localStorage.setItem('pn_referrals', JSON.stringify(refs));
}

// ─── DIGEST SUBSCRIBERS ───────────────────────────────────────────────────────
export interface DigestSubscriber {
  email: string;
  name?: string;
  subscribedAt: string;
  frequency: 'weekly' | 'monthly';
}

export function getDigestSubscribers(): DigestSubscriber[] {
  try { return JSON.parse(localStorage.getItem('pn_digest_subscribers') || '[]'); } catch { return []; }
}

export function subscribeToDigest(email: string, name?: string, frequency: 'weekly' | 'monthly' = 'weekly'): boolean {
  const subs = getDigestSubscribers();
  if (subs.find(s => s.email === email)) return false; // already subscribed
  subs.push({ email, name, subscribedAt: new Date().toISOString(), frequency });
  localStorage.setItem('pn_digest_subscribers', JSON.stringify(subs));
  return true;
}

export function unsubscribeFromDigest(email: string): void {
  const subs = getDigestSubscribers().filter(s => s.email !== email);
  localStorage.setItem('pn_digest_subscribers', JSON.stringify(subs));
}
