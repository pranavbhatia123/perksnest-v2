import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { db } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

const supabaseAuth = createClient(
  'https://supabase.stirringminds.com',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE3OTk1MzU2MDB9.flEXaRV1Ku-LEeKUiTTXvjlekdwZvGY8oOFiNDPMgkA'
);

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState("Processing sign-in...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from Supabase auth after OAuth redirect
        const { data: { session }, error } = await supabaseAuth.auth.getSession();

        if (error || !session) {
          setStatus("Sign-in failed. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const googleUser = session.user;
        const email = googleUser.email?.toLowerCase().trim();
        const name = googleUser.user_metadata?.full_name || googleUser.user_metadata?.name || email?.split('@')[0] || 'User';
        const avatar = googleUser.user_metadata?.avatar_url || null;

        if (!email) {
          setStatus("Could not retrieve email. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // Check if user already exists in our perksnest.users table
        const { data: existing } = await db
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        let userId: string;

        if (existing) {
          // Existing user — update avatar if changed
          if (avatar && existing.avatar !== avatar) {
            await db.from('users').update({ avatar }).eq('id', existing.id);
          }
          userId = existing.id;
        } else {
          // New user — create account
          const { data: newUser, error: insertError } = await db
            .from('users')
            .insert({
              email,
              name,
              avatar,
              password: 'google_oauth_' + googleUser.id,
              plan: 'free',
              role: 'customer',
              referral_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
              referral_count: 0,
              claimed_deals: [],
            })
            .select('*')
            .single();

          if (insertError || !newUser) {
            setStatus("Account creation failed. Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
            return;
          }
          userId = newUser.id;

          // Send welcome email
          fetch('https://api.perksnest.co/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'welcome', to: email, name }),
          }).catch(() => {});
        }

        // Set session in localStorage so our custom auth picks it up
        localStorage.setItem('perksnest_user_id', userId);
        
        setStatus("Signed in! Redirecting...");
        // Reload to trigger auth context re-hydration
        window.location.href = '/customer';

      } catch (err) {
        setStatus("Something went wrong. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
