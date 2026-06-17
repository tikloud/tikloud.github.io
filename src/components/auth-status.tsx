"use client";

import { useAuth } from "@/lib/auth-context";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthStatus() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Signed in as:</span>{" "}
          <span className="font-medium">{user.email}</span>
        </div>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="default" size="sm" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}
