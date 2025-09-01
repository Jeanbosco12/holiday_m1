"use client";

import { useState } from "react";
import {
  Book,
  Users,
  PlayCircle,
  BarChart,
  UserCheck,
  FileText,
  Menu as MenuIcon,
  ChevronDown,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Accueil", icon: <Home />, href: "/home/dashboard" },
  {
    title: "Cours",
    icon: <Book />,
    href: "/cours",
    children: [
      { title: "Informatique", href: "/cours/informatique" },
      { title: "Scientifique", href: "/cours/scientifique" },
      {
        title: "Littéraire",
        href: "/cours/litteraire",
        children: [
          { title: "Langues", href: "/cours/litteraire/langues" },
          { title: "Histoire", href: "/cours/litteraire/histoire" },
        ],
      },
    ],
  },
  { 
    title: "Exercices", 
    icon: <Users />, 
    href: "/exercices",
  },
  { 
    title: "Vidéos", 
    icon: <PlayCircle />, 
    href: "/videos",
  },
  { title: "Statistiques", icon: <BarChart />, href: "/statistics" },
  { title: "Réalisations", icon: <UserCheck />, href: "/achievements" },
  { title: "Bibliothèques", icon: <FileText />, href: "/bibliotheques" },
];

export default function Sidebar() {
  const [selected, setSelected] = useState("Accueil");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => {
    const renderItem = (item: any, level = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openSections[item.title];

      return (
        <div key={item.title} className={`ml-${level * 4}`}>
          <Button
            variant={selected === item.title ? "secondary" : "ghost"}
            className={cn("w-full justify-start gap-2", collapsed && "p-2 justify-center")}
            onClick={() => {
              setSelected(item.title);
              if (hasChildren) toggleSection(item.title);
            }}
          >
            {item.icon && !level && item.icon}
            <span>{item.title}</span>
            {hasChildren && !collapsed && (
              <span className="ml-auto">
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
          </Button>
          {hasChildren && isOpen && (
            <div className="flex flex-col gap-1 ml-4">
              {item.children.map((child: any) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return <nav className="flex flex-col gap-1 p-2">{navItems.map((item) => renderItem(item))}</nav>;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col h-screen bg-background border-r w-44">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-12 left-0 z-50">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-44 pt-12">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
