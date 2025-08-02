import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileDropdown } from "./profile-dropdown";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const RightItems = () => {
    if (session) {
      return (
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            prefetch={false}
            className={buttonVariants({ variant: "outline" })}
          >
            Dashboard
          </Link>
          <ProfileDropdown user={session.user} />
        </div>
      );
    }
    return (
      <Link
        href="/login"
        prefetch={false}
        className={buttonVariants({ variant: "outline" })}
      >
        Login
      </Link>
    );
  };

  return (
    <header className="grid grid-cols-3 items-center h-16 md:px-36 px-4">
      <div className="justify-self-start">
        <Link href="/" className="text-xl font-bold">
          BetterQuiz
        </Link>
      </div>

      <div>
        <nav className="lg:flex items-center align-middle gap-6 text-muted-foreground text-sm hidden justify-center">
          <Link href="/about" prefetch={false}>
            Products
          </Link>
          <Link href="/contact" prefetch={false}>
            Pricing
          </Link>
          <Link href="/contact" prefetch={false}>
            Docs
          </Link>
        </nav>
      </div>

      <div className="justify-self-end">
        <RightItems />
      </div>
    </header>
  );
}
