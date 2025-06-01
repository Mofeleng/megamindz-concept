"use client";
import { BookOpenIcon, BrainIcon, CalendarHeart, LucideIcon, WavesIcon } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { usePathname } from "next/navigation";

import Link from "next/link";

const apps: {
    title: string,
    url: string,
    icon: LucideIcon
}[] = [
    {
        title: "Mega Journals",
        url: "/",
        icon: BookOpenIcon
    },
    {
        title: "Mega Mindfulness",
        url: "/mindfulness",
        icon: WavesIcon
    },
    {
        title: "Mega Habits",
        url: "/habits",
        icon: CalendarHeart
    }
]

const AppSidebar = () => {
    const pathname = usePathname();

    return ( 
        <Sidebar>
        <SidebarHeader>
            <div className="flex gap-1 items-center py-3">
                <BrainIcon className="size-5" />
                <span className="font-semibold">MegaMinds.</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Applications</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        { apps.map(({ title, url, icon:Icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild isActive={
                                    url === "/" 
                                    ? pathname === "/" || pathname.startsWith("/journal/") 
                                    : pathname === url
                                }>
                                    <Link href={url}>
                                        <Icon />
                                        <span> { title }</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
     );
}
 
export default AppSidebar;