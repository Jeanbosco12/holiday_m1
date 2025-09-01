"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import {
  Bell,
  Settings,
  Sun,
  Moon,
  User,
  UploadCloud
} from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Déconnexion",
      text: "Veuillez cliquer sur Confirmer avant 5s",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      timer: 5000,
      timerProgressBar: true,
      icon: "warning",
    });

    if (result.isConfirmed) {
      sessionStorage.clear();
      router.push("/");
    }
  };


  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <TooltipProvider>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-background shadow-sm">
        <div className="text-xl font-semibold">Sekoly</div>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Changer de thème</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/parametres">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Paramètres</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <User className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Déconnexion</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
