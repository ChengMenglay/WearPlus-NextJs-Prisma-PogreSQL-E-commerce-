import React from "react";
import {
  BadgeCheck,
  ChevronRight,
  ChevronsUpDown,
  Home,
  Megaphone,
  Package,
  PackageOpen,
  PencilRuler,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  User,
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
import { auth } from "@/auth";
import { getUserInfor } from "@/app/(auth)/actions/authActions";
import SignOutButton from "./SignOutButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
export default async function AppSidebar() {
  const session = await auth();
  const users = session?.user && (await getUserInfor());
  const navMain = [
    {
      title: "Sales",
      icon: ShoppingCart,
      items: [
        {
          title: "Customer",
          url: "/customer",
          icon: User,
        },
        {
          title: "Order",
          url: "/order",
          icon: ShoppingBasket,
        },
      ],
    },
  ];
  const items = [
    {
      title: "Home",
      url: `/`,
      icon: Home,
    },
    {
      title: "Billboard",
      url: `/billboard`,
      icon: Megaphone,
    },
    {
      title: "Category",
      url: `/category`,
      icon: Package,
    },
    {
      title: "Size",
      url: `/size`,
      icon: PencilRuler,
    },
    {
      title: "Product",
      url: `/product`,
      icon: PackageOpen,
    },
    {
      title: "Delivery",
      url: `/delivery`,
      icon: Truck,
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
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className=" h-14">
                    <a
                      href={"/dashboard" + item.url}
                      className="space-x-2 font-bold"
                    >
                      <item.icon style={{ width: "20px", height: "20px" }} />
                      <span className="font-bold text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {navMain.map((item) => (
              <Collapsible
                key={item.title}
                title={item.title}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex justify-between h-14">
                        <span className=" space-x-4 font-bold text-lg flex items-center ">
                          <item.icon
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span>{item.title}</span>
                        </span>

                        <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((item) => (
                          <SidebarMenuItem key={item.title} className="px-8">
                            <SidebarMenuButton asChild>
                              <a
                                className="space-x-2 font-bold "
                                href={"/dashboard" + item.url}
                              >
                                <item.icon
                                  style={{ width: "20px", height: "20px" }}
                                />
                                <span className="font-bold text-lg">
                                  {item.title}
                                </span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
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
                      src={users?.image || "/images/user.png"}
                      alt="shoes"
                    />
                    <AvatarFallback className="rounded-lg">
                      {users?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-md leading-tight">
                    <span className=" truncate font-semibold">
                      {users?.name}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      {users?.email}
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
                        src={users?.image || "/images/user.png"}
                        alt="shoes"
                      />
                      <AvatarFallback className="rounded-lg">
                        {users?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-md leading-tight">
                      <span className=" truncate font-semibold">
                        {users?.name}
                      </span>
                      <span className="truncate text-sm text-muted-foreground">
                        {users?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={"/profile"}>
                    <DropdownMenuItem className=" cursor-pointer">
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton
                    className="w-full h-full flex space-x-4 items-center cursor-pointer"
                    name="Log out"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
