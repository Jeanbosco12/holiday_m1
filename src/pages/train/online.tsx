"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Layout from "../Layout";

export default function TrainModel() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleTrain = async () => {
    setStatus("loading");
    setMessage("Lancement de l'entraînement...");

    try {
      const res = await fetch("http://localhost:8000/api/train_online", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Entraînement réussi !");
      } else {
        setStatus("error");
        setMessage(data.message || "Erreur lors de l'entraînement.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const renderIcon = () => {
    if (status === "loading") return <Loader2 className="animate-spin h-4 w-4 mr-2" />;
    if (status === "success") return <CheckCircle className="text-green-500 h-4 w-4 mr-2" />;
    if (status === "error") return <XCircle className="text-red-500 h-4 w-4 mr-2" />;
    return null;
  };

  return (
    <Layout>
      <Card className="w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Entraînement automatique du modèle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Cette opération récupère automatiquement les données météo de Visual Crossing
            pour entraîner le modèle RNA.
          </p>
          <Button
            onClick={handleTrain}
            disabled={status === "loading"}
            className="w-full"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Entraînement en cours...
              </>
            ) : (
              "Lancer l'entraînement"
            )}
          </Button>
          {status !== "idle" && (
            <div className="flex items-center text-sm text-muted-foreground">
              {renderIcon()}
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>

  );
}
