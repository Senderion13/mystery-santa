"use client";

import { signOut } from "@/app/lib/auth-clients";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export function DashboardClient() {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={async () => {
        await signOut({ fetchOptions: { onSuccess: () => router.push("/") } });
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
}
