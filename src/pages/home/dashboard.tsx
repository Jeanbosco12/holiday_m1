"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  User,
  Wand2,
  MessageSquare,
  FileText,
  TrendingUp,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const glass =
  "bg-white/40 dark:bg-gray-900/60 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-800 rounded-2xl";



type ChatMsg = { role: "user" | "assistant"; content: string };

function mockExplain(topic: string): Promise<string> {
  // Swap with POST /api/ai/explain { topic }
  return new Promise((res) =>
    setTimeout(
      () =>
        res(
          `Voici une explication simplifiée de ${topic} :\n\n1) Intuition → commence par l'exemple le plus simple.\n2) Formule → écris la règle générale.\n3) Exemple guidé → applique la règle étape par étape.\n4) Auto‑test → essaie un exercice similaire et vérifie la réponse.`
        ),
      650
    )
  );
}

function mockQuiz(topic: string): Promise<string[]> {
  // Swap with POST /api/ai/quiz { topic, level }
  return new Promise((res) =>
    setTimeout(
      () =>
        res([
          `Q1. Donne la définition clé de ${topic}.`,
          `Q2. Résous un exercice de niveau débutant sur ${topic}.`,
          `Q3. Cite une erreur fréquente sur ${topic} et corrige‑la.`,
        ]),
      650
    )
  );
}


export default function AILearningDashboard() {
  const [greeting, setGreeting] = useState("Bonjour");
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMsgs, setAiMsgs] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Salut ! Je suis ton tuteur IA. Demande‑moi une explication, un résumé de cours, ou génère un quiz ✨",
    },
  ]);

  const [student, setStudent] = useState({
    name: "Pierre",
    points: 1240,
    streakDays: 6,
    lastActivity: "Il y a 3 jours",
    coursesCompleted: 8,
  });



  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Bonjour" : h < 18 ? "Bon après‑midi" : "Bonsoir");
  }, []);

  // ——— AI Chat handlers
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMsgs, aiLoading]);


  async function handleExplain(topic: string) {
    setAiMsgs((m) => [
      ...m,
      { role: "user", content: `Explique ${topic} simplement.` },
    ]);

    setAiLoading(true);
    try {
      const out = await mockExplain(topic);
      setAiMsgs((m) => [...m, { role: "assistant", content: out }]);
    } finally {
      setAiLoading(false);
    }
  }

  async function handleQuiz(topic: string) {
    setAiMsgs((m) => [
      ...m,
      { role: "user", content: `Génère un quiz sur ${topic}.` },
    ]);
    setAiLoading(true);
    try {
      const qs = await mockQuiz(topic);
      setAiMsgs((m) => [
        ...m,
        { role: "assistant", content: qs.map((q) => `• ${q}`).join("\n") },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  // ——— Study time chart (week)
  const studyData = [
    { day: "Lun", min: 40 },
    { day: "Mar", min: 55 },
    { day: "Mer", min: 35 },
    { day: "Jeu", min: 60 },
    { day: "Ven", min: 30 },
    { day: "Sam", min: 20 },
    { day: "Dim", min: 25 },
  ];

  return (
    <>
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-900 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full p-1"
        >
          <div className="bg-white dark:bg-gray-950 rounded-full p-3 shadow-xl">
            <User className="text-blue-500" size={32} />
          </div>
        </motion.div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 drop-shadow-sm">
            {greeting}, {student.name} !
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dernière activité : {student.lastActivity}
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className={`${glass}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Points</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Sparkles />
            <div className="text-2xl font-bold">{student.points}</div>
          </CardContent>
        </Card>
        <Card className={`${glass}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Série (jours)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <TrendingUp />
            <div className="text-2xl font-bold">{student.streakDays}</div>
          </CardContent>
        </Card>
        <Card className={`${glass}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Cours terminés</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Check />
            <div className="text-2xl font-bold">{student.coursesCompleted}</div>
          </CardContent>
        </Card>
        <Card className={`${glass}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Temps d'étude (semaine)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studyData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="min" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Courses & actions */}
        <div className="xl:col-span-2 space-y-6">
          {/* Actions */}
          <div className={`p-4 ${glass}`}>
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="opacity-80" />
                <div className="font-semibold">Assistant IA</div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="gap-2" onClick={() => handleExplain("les dérivées")}> <Wand2 size={16} /> Expliquer un concept</Button>
                <Button variant="secondary" className="gap-2" onClick={() => handleQuiz("les dérivées")}> <FileText size={16} /> Générer un quiz</Button>
                <Button className="gap-2" onClick={() => handleExplain("le dernier cours")}> <MessageSquare size={16} /> Résumé IA</Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div></>
  );
}
