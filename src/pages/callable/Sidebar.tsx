"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  Mountain,
  Droplet,
  Sun,
  Map,
  Satellite,
  Waves,
  Activity,
  Menu as MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Accueil", icon: <LayoutDashboard />, href: "/docs/dashboard" },
  { title: "Tempêtes", icon: <ShieldAlert />, href: "#" },
  { title: "Cyclones", icon: <Waves />, href: "/docs/aog/cyclone" },
  { title: "Volcan", icon: <Mountain />, href: "#" },
  { title: "Sécheresse", icon: <Sun />, href: "/docs/aog/secheresse" },
  { title: "Inondation", icon: <Droplet />, href: "#" },
  { title: "Séismes", icon: <Activity />, href: "#" },
  { title: "Cartes", icon: <Map />, href: "#" },
  { title: "Satellite", icon: <Satellite />, href: "/docs/aog/satellite" },
];

export default function Sidebar() {
  const [selected, setSelected] = useState("Accueil");

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <nav className="flex flex-col gap-1 p-2">
      {navItems.map((item) => (
        <Link href={item.href} key={item.title}>
          <Button
            variant={selected === item.title ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              collapsed && "p-2 justify-center"
            )}
            onClick={() => setSelected(item.title)}
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col h-screen bg-background border-r w-45">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-45 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
