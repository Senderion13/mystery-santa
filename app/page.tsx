import Image from "next/image";
import Link from "next/link";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { HomeAuthNav } from "./home-auth-nav";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <nav className="absolute top-6 right-6 flex gap-4">
                {session ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="rounded-full border border-black/[.08] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                        >
                            Dashboard
                        </Link>
                        <HomeAuthNav />
                    </>
                ) : (
                    <>
                        <Link
                            href="/auth/sign-in"
                            className="rounded-full border border-black/[.08] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/auth/sign-up"
                            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </nav>
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        {session ? `Hello, ${session.user.name ?? session.user.email}` : "Mystery Santa"}
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        {session
                            ? "You are signed in. Use the dashboard or sign out above."
                            : "Sign in or create an account to get started."}
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    {!session && (
                        <>
                            <Link
                                href="/auth/sign-in"
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08] md:w-[158px]"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/auth/sign-up"
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:bg-[#ccc] dark:text-black md:w-[158px]"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
