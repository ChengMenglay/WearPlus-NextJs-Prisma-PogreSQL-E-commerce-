import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export default async function DashbordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-[100vh]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
