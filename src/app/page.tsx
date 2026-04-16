import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome to Accent8</h1>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher/>
        <UserButton/>
      </div>
    </div>
    </>
  );
}
