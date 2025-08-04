// pages/upload.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Layout from "../Layout";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Chargement en cours...");

    try {
      const res = await fetch("http://localhost:8000/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("Fichier envoyé et entraînement lancé !");
      } else {
        const errorText = await res.text();
        setStatus("Erreur : " + errorText);
      }
    } catch (err) {
      setStatus("Erreur de connexion au serveur.");
    }
  };

  return (
    <Layout>
      <Card className="w-full max-w-md mx-auto mt-20 p-6">
        <CardHeader>
          <CardTitle>Téléverser un fichier CSV météo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button onClick={handleUpload} disabled={!file}>
            Envoyer
          </Button>
          <p className="text-sm text-muted-foreground">{status}</p>
        </CardContent>
      </Card>
    </Layout>

  );
}
