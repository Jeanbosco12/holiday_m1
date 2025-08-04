"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "../../Layout";
import { Badge } from "@/components/ui/badge";
import { Flame, Wind, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapCyclone = dynamic(() => import("@/components/map-cyclone"), { ssr: false });

type Cyclone = {
  id: string;
  name: string;
  date: string;
  category: string;
  intensity: string;
  trajectory: [number, number][];
  description: string;
};

export default function CyclonePage() {
  const [selectedCyclone, setSelectedCyclone] = useState<Cyclone | null>(null);
  const [predictedCyclones, setPredictedCyclones] = useState<Cyclone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les cyclones prédits depuis le backend
  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8000/api/cyclones/predicted"); // adapte l’URL selon ton API
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data: Cyclone[] = await res.json();
        setPredictedCyclones(data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Cyclones recensés statiques */}
        <h1 className="text-3xl font-bold">Cyclones recensés</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Ton affichage statique ou tu peux aussi dynamiser si besoin */}
        </div>

        {/* Cyclones prédits dynamiques */}
        <h1 className="text-3xl font-bold">Prédiction cyclonique</h1>
        {loading && <p>Chargement des prédictions...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}
        {!loading && !error && (
          <table className="w-full text-center border border-border rounded-md">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nom</th>
                <th className="py-2">Vitesse</th>
                <th className="py-2">Catégorie</th>
                <th className="py-2">Date passage</th>
                <th className="py-2">Plus d'option</th>
              </tr>
            </thead>
            <tbody>
              {predictedCyclones.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-muted-foreground">Aucune prédiction disponible</td>
                </tr>
              )}
              {predictedCyclones.map((c) => (
                <tr key={c.id} className="border-b hover:bg-muted cursor-pointer">
                  <td className="py-2">{c.name}</td>
                  <td className="py-2">{c.intensity}</td>
                  <td className="py-2">{c.category}</td>
                  <td className="py-2">{new Date(c.date).toLocaleDateString()}</td>
                  <td className="py-2 space-x-2">
                    <Button size="sm" onClick={() => setSelectedCyclone(c)}>+</Button>
                    <Button size="sm" variant="destructive" onClick={() => alert(`Alerte sur ${c.name}`)}>!</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal détails cyclone */}
        <Dialog open={selectedCyclone !== null} onOpenChange={(open) => !open && setSelectedCyclone(null)}>
          <DialogContent className="max-w-3xl">
            {selectedCyclone && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedCyclone.name}</DialogTitle>
                  <DialogDescription>{selectedCyclone.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>Date :</strong> {selectedCyclone.date}</p>
                  <p><strong>Catégorie :</strong> {selectedCyclone.category}</p>
                  <p><strong>Intensité :</strong> {selectedCyclone.intensity}</p>
                </div>

                <div className="mt-4">
                  <MapCyclone cyclones={[selectedCyclone]} />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
