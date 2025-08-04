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

  const handleTrain = async () => {
    const loadingSwal = Swal.fire({
      title: "Entraînement en cours...",
      text: "Le modèle est en cours d'entraînement avec les données météo.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("http://localhost:8000/api/train_online", {
        method: "POST",
      });

      const data = await res.json();
      Swal.close();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Succès !",
          text: data.message || "Le modèle a été entraîné avec succès.",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur d'entraînement",
          text: data.message || "Une erreur est survenue lors de l'entraînement.",
        });
      }
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion",
        text: "Voulez-vous réessayer hors ligne?",
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push("/train/upload");
        }})

    }
  };


  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <TooltipProvider>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-background shadow-sm">
        {/* Logo ou titre ici */}
        <div className="text-xl font-semibold">Storm</div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleTrain}>
                <UploadCloud className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Entraînement</TooltipContent>
          </Tooltip>

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
