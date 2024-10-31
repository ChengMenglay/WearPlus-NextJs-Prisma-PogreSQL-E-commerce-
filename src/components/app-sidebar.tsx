import React from "react";
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronsUpDown,
  CreditCard,
  Home,
  LogOut,
  Package,
  Search,
  Settings,
  ShoppingCart,
  UserRoundSearch,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function AppSidebar() {
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Product",
      url: "/product",
      icon: Package,
    },
    {
      title: "Order",
      url: "/order",
      icon: ShoppingCart,
    },
    {
      title: "Customer",
      url: "/customer",
      icon: UserRoundSearch,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="gap-y-4">
          <SidebarGroupLabel>
            <Link href="/" className="font-bold text-black text-2xl">
              WEARPLUS
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className=" h-14">
                    <a
                      href={"/dashboard" + item.url}
                      className="my-2 space-x-2 font-bold"
                    >
                      <item.icon style={{ width: "20px", height: "20px" }} />
                      <span className="font-bold text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size={"lg"}
                  className="w-full h-20 data-[state=open]:bg-slidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage
                      src="https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300"
                      alt="shoes"
                    />
                    <AvatarFallback className="rounded-lg">
                      Shoes
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-md leading-tight">
                    <span className=" truncate font-semibold">
                      MenglayCheng
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      cheng.menglay79@gmail.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radox-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="right"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 p-4">
                    <Avatar className="w-10 h-10 rounded-lg">
                      <AvatarImage
                        src="https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300"
                        alt="shoes"
                      />
                      <AvatarFallback className="rounded-lg">
                        Shoes
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-md leading-tight">
                      <span className=" truncate font-semibold">
                        MenglayCheng
                      </span>
                      <span className="truncate text-sm text-muted-foreground">
                        cheng.menglay79@gmail.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
