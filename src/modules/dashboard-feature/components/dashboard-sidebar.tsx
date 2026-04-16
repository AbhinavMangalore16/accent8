"use client";

import Link from "next/link";
import {
    Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioLines,
  AudioWaveform,
  Headphones,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Speech,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, useClerk, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Nav } from "react-day-picker";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavigationSectionProps {
  label?: string;
  items: NavItem[];
  pathname: string;
}

export function NavigationSection({
  label,
  items,
  pathname,
}: NavigationSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-sm text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.url
              ? item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url)
              : false;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={item.onClick}
                  tooltip={item.title}
                  className="h-9 px-3 py-2 text-[13px] tracking-light font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-md 
                    hover:shadow-sm transition-all"
                >
                  {item.url ? (
                    <Link href={item.url} className="flex items-center gap-2 w-full">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();
  const navigationItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Explore voices",
      url: "/dashboard/voices",
      icon: Speech,
    },
    {
      title: "Text-to-Speech",
      url: "/dashboard/tts",
      icon: AudioLines,
    },
    {
      title: "Clone your voice",
      icon: AudioWaveform,
    },
  ];
  const miscItem: NavItem[] = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Queries & Support",
      url: "mailto:abhinavm16104@gmail.com",
      icon: Headphones,
    },
  ];
  return (
    <Sidebar collapsible="icon" className="flex flex-col h-full">
        <SidebarHeader className="flex flex-col gap-4 pt-6 pl-3 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:pl-0">
            <Link href="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                <Image 
                src="/Accent8-wbg.png" 
                alt="Accent8"  
                width={72} 
                height={72} 
                className="rounded-md object-contain"
                />
                <span className="group-data-[collapsible=icon]:hidden font-extrabold text-2xl tracking-tighter text-foreground whitespace-nowrap">
                Accent8
                </span>
            </Link>
            <SidebarMenu>
                <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
                    <OrganizationSwitcher
                    hidePersonal
                    fallback={
                    <div className="flex items-center gap-2 h-9 px-2 
                                    border border-border rounded-md
                                    group-data-[collapsible=icon]:justify-center 
                                    group-data-[collapsible=icon]:px-0">

                        {/* Avatar */}
                        <div className="size-6 rounded-sm bg-muted animate-pulse" />

                        {/* Text */}
                        <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                        <div className="h-2 w-20 bg-muted rounded animate-pulse" />
                        <div className="h-2 w-12 bg-muted/70 rounded animate-pulse" />
                        </div>
                    </div>
                    }
                    appearance={{
                        elements:{
                            rootBox:
                            "w-full! flex items-center justify-center",
                            organizationSwitcherTrigger: `
                            w-full! justify-between! bg-transparent! border! border-border! rounded-md! pl-1.5! pr-2! py-1! gap-3!
                            group-data-[collapsible=icon]:w-8!
                            group-data-[collapsible=icon]:h-8!
                            group-data-[collapsible=icon]:p-0!
                            group-data-[collapsible=icon]:justify-center!
                            group-data-[collapsible=icon]:mx-auto!
                            `,
                            organizationPreview: "gap-2 group-data-[collapsible=icon]:m-0",
                            organizationPreviewAvatarBox: "size-6 rounded-sm group-data-[collapsible=icon]:m-0!",
                            organizationPreviewTextContainer: "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                            organizationPreviewMainIdentifier: "text-[13px]!",
                            organizationSwitcherTriggerIcon: "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                        }
                    }}
                    />
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavigationSection items={navigationItems} pathname={pathname}/>
                <NavigationSection label="Others" items={miscItem} pathname={pathname}/>
            </SidebarContent>

                <SidebarFooter className="gap-3 py-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <UserButton 
                                    showName
                                    fallback={
                            <div className="flex items-center gap-2 h-9 px-2 
                                            border border-border rounded-md
                                            group-data-[collapsible=icon]:justify-center 
                                            group-data-[collapsible=icon]:px-0">

                                {/* Avatar */}
                                <div className="size-6 rounded-sm bg-muted animate-pulse" />

                                {/* Text */}
                                <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                                <div className="h-2 w-20 bg-muted rounded animate-pulse" />
                                <div className="h-2 w-12 bg-muted/70 rounded animate-pulse" />
                                </div>
                            </div>
                            }
                            appearance={{
                                    elements: {
                                    avatarBox: "size-8",
                                    userButtonBox:"flex-row-reverse! gap-1!"
                                    }
                                }}/>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
    </Sidebar>
  )
}
