import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Headset, Mail } from "lucide-react";

type PageHeaderProps = {
  title: string;
  className?: string;
};

export function SiteHeader({ title, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b px-4 py-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button  variant="outline" size="sm">
          <Link
            href="mailto:abhinavm16104@gmail.com"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden lg:inline">Feedback</span>
          </Link>
        </Button>

        <Button  variant="outline" size="sm">
          <Link
            href="mailto:abhinavm16104@gmail.com"
            className="flex items-center gap-2"
          >
            <Headset className="h-4 w-4" />
            <span className="hidden lg:inline">Need Help?</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}