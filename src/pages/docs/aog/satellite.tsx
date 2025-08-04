"use client";

import Layout from "../../Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SatellitePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Observation Satellite</h1>
        <p className="text-muted-foreground">
          Madagascar depuis l’espace.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Imagerie Satellite (Temp Réel)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[600px] rounded-md overflow-hidden shadow-lg border">
              <iframe
                src="https://embed.windy.com/embed2.html?lat=-18.8792&lon=47.5079&zoom=5&level=surface&overlay=satellite&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=&detailLon=&metricWind=default&metricTemp=default&radarRange=-1"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
