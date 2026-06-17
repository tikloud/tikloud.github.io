"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createClient();
      
      // Check for hash params (OAuth flow)
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        
        if (accessToken) {
          // Set the session from the hash
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });
          
          if (error) {
            setMessage("Authentication failed: " + error.message);
          } else {
            setMessage("Authentication successful! Redirecting...");
            // Clear the hash
            window.location.hash = "";
            // Redirect to home
            setTimeout(() => router.push("/"), 1000);
            return;
          }
        }
      }
      
      // Check for query params (email confirmation)
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage("Authentication failed: " + error.message);
        } else {
          setMessage("Authentication successful! Redirecting...");
          setTimeout(() => router.push("/"), 1000);
          return;
        }
      }
      
      // If we get here, something went wrong
      setMessage("Unable to complete authentication. Please try again.");
      setTimeout(() => router.push("/sign-in"), 2000);
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
