import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { getAdminSettings, saveAdminSettings } from "@/lib/store";

export const AdminSettings = () => {
  const [form, setForm] = useState({ siteName: "", siteDescription: "", contactEmail: "", supportEmail: "", twitter: "", linkedin: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(getAdminSettings()); }, []);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    saveAdminSettings(form); setSaving(false);
    toast.success("Settings saved!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader><CardTitle>Site Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label>Site Name</Label><Input value={form.siteName} onChange={e => set("siteName", e.target.value)} className="mt-1" /></div>
            <div className="col-span-2"><Label>Site Description</Label><Textarea value={form.siteDescription} onChange={e => set("siteDescription", e.target.value)} className="mt-1" rows={2} /></div>
            <div><Label>Contact Email</Label><Input type="email" value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)} className="mt-1" /></div>
            <div><Label>Support Email</Label><Input type="email" value={form.supportEmail} onChange={e => set("supportEmail", e.target.value)} className="mt-1" /></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Twitter / X</Label><Input value={form.twitter} onChange={e => set("twitter", e.target.value)} placeholder="https://twitter.com/perksnest" className="mt-1" /></div>
            <div><Label>LinkedIn</Label><Input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/company/perksnest" className="mt-1" /></div>
          </div>
        </CardContent>
      </Card>
      <Button type="submit" className="gap-2" disabled={saving}><Save className="h-4 w-4" />{saving ? "Saving..." : "Save Settings"}</Button>
    </form>
  );
};
