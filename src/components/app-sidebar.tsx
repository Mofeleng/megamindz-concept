import { BookOpenIcon, CalendarHeart, LucideIcon, WavesIcon } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
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
    return ( 
        <Sidebar>
        <SidebarHeader />
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Applications</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        { apps.map(({ title, url, icon:Icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
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