"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useTranslations } from "next-intl";

export function SignOutButton() {
  const { signOut } = useAuth();
  const t = useTranslations();

  return (
    <Button variant="outline" onClick={signOut}>
      {t('navigation.logout')}
    </Button>
  );
}
