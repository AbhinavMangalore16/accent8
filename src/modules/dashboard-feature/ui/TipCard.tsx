import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Tip } from "../data/tips";

type TipCardProps = Tip;

export function TipCard({
  title,
  description,
  icon: Icon,
  gradient,
  href,
}: TipCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-3">
      
      {/* Gradient Box */}
     <div
        className={cn(
            "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl",
            "bg-gradient-to-br transition-all duration-700 ease-out",
            "bg-[length:180%_180%] bg-left hover:bg-right",
            "hover:scale-[1.03]",
            gradient
        )}
        >
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20 opacity-30" />
        {/* Center Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center size-10 rounded-full bg-white/20">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Inner Ring */}
        <div className="absolute inset-2 rounded-lg border-2 border-dotted border-white/20" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* CTA */}
        <Button variant="outline" size="sm" className="mt-2 w-fit px-2 py-1 text-xs">
          <Link href={href} className="flex items-center gap-1">
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

    </div>
  );
}