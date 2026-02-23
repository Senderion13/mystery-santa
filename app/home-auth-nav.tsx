"use client";

import { signOut } from "@/app/lib/auth-clients";
import { useRouter } from "next/navigation";

export function HomeAuthNav() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={async () => {
                await signOut({ fetchOptions: { onSuccess: () => router.push("/") } });
                router.refresh();
            }}
            className="rounded-full border border-black/[.08] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
        >
            Sign out
        </button>
    );
}
