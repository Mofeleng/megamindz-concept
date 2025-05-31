"use client";
import { BookOpenIcon, BrainIcon, CalendarHeart, LucideIcon, WavesIcon } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from "./ui/sidebar";
import { usePathname } from "next/navigation";

import Link from "next/link";

const apps: {
    title: string,
    url: string,
    counter: number,
    icon: LucideIcon
}[] = [
    {
        title: "Mega Journals",
        url: "/",
        counter: 2,
        icon: BookOpenIcon
    },
    {
        title: "Mega Mindfulness",
        url: "/mindfulness",
        counter: 5,
        icon: WavesIcon
    },
    {
        title: "Mega Habits",
        url: "/habits",
        counter: 1,
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
                        { apps.map(({ title, url, counter, icon:Icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild isActive={pathname === url ? true : false }>
                                    <Link href={url}>
                                        <Icon />
                                        <span> { title }</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuBadge>{ counter }</SidebarMenuBadge>
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