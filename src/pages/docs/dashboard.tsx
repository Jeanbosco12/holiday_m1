"use client";

import { useEffect, useState } from "react";
import Layout from "../Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Waves,
  Droplet,
  Activity,
  Mountain,
  Sun,
  ShieldAlert,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const iconsMap = {
  Cyclones: Waves,
  Inondations: Droplet,
  Séismes: Activity,
  Volcan: Mountain,
  Sécheresse: Sun,
  Tempêtes: ShieldAlert,
};

const colorsMap = {
  Cyclones: "#3b82f6",
  Inondations: "#22c55e",
  Séismes: "#f97316",
  Volcan: "#ef4444",
  Sécheresse: "#eab308",
  Tempêtes: "#8b5cf6",
};

export default function Dashboard() {
  const [summaryItems, setSummaryItems] = useState<
    { title: string; value: number; icon: any; color: string }[]
  >([]);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("http://localhost:8000/api/summary");
        const data = await res.json();

        const items = [
          { title: "Cyclones", value: data.cyclones, icon: iconsMap.Cyclones, color: colorsMap.Cyclones },
          { title: "Inondations", value: data.inondations, icon: iconsMap.Inondations, color: colorsMap.Inondations },
          { title: "Séismes", value: data.seismes, icon: iconsMap.Séismes, color: colorsMap.Séismes },
          { title: "Volcan", value: data.volcan, icon: iconsMap.Volcan, color: colorsMap.Volcan },
          { title: "Sécheresse", value: data.secheresse, icon: iconsMap.Sécheresse, color: colorsMap.Sécheresse },
          { title: "Tempêtes", value: data.tempetes, icon: iconsMap.Tempêtes, color: colorsMap.Tempêtes },
        ];

        setSummaryItems(items);
      } catch (error) {
        console.error("Erreur lors du chargement du résumé :", error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Catastrophes en cours</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {summaryItems.map(({ title, value, icon: Icon, color }) => (
          <Card
            key={title}
            className="shadow-md hover:shadow-lg transition"
            style={{ borderColor: color, borderWidth: 2 }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <Icon className="h-6 w-6" style={{ color }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold" style={{ color }}>
                {value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphique */}
      <Card className="p-4 shadow-lg">
        <CardTitle className="mb-4">Visualisation globale</CardTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={summaryItems}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Layout>
  );
}
