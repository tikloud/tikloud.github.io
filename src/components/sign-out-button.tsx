"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <Button variant="outline" onClick={signOut}>
      Sign out
    </Button>
  );
}
