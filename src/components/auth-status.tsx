"use client";

import { useAuth } from "@/lib/auth-context";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function AuthStatus() {
  const { user, loading } = useAuth();
  const t = useTranslations();

  if (loading) {
    return <div className="text-sm text-muted-foreground">{t('common.loading')}</div>;
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
        <Link href="/sign-in">{t('navigation.sign_in')}</Link>
      </Button>
      <Button variant="default" size="sm" asChild>
        <Link href="/sign-up">{t('navigation.sign_up')}</Link>
      </Button>
    </div>
  );
}
