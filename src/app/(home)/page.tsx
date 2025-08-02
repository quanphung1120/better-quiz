import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold">Welcome to BetterQuiz</h1>
        <p className="text-muted-foreground">
          Explore our features and start your learning journey.
        </p>
        <Button asChild>
          <Link prefetch={false} href="/login">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}
