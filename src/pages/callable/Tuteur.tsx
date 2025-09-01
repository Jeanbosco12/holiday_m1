"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

type ChatMsg = {
    role: "assistant" | "user";
    content: string;
};

interface TuteurProps {
    initialMessages?: ChatMsg[];
}

const glass = "bg-white/40 dark:bg-gray-900/60 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-800 rounded-2xl";

export default function Tuteur({ initialMessages }: TuteurProps) {
    const [aiMsgs, setAiMsgs] = useState<ChatMsg[]>(initialMessages || [
        {
            role: "assistant",
            content:
                "Salut ! Je suis ton tuteur IA. Demande-moi une explication, un résumé de cours, ou génère un quiz ✨",
        },
    ]);
    const [aiInput, setAiInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll automatique vers le bas à chaque nouveau message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [aiMsgs]);

    const handleSend = async () => {
        if (!aiInput.trim()) return;

        // Ajouter le message utilisateur
        setAiMsgs((prev) => [...prev, { role: "user", content: aiInput }]);
        setAiInput("");
        setAiLoading(true);

        try {
            // Ici tu peux remplacer par ton API IA
            const response = await mockChat(aiInput);
            setAiMsgs((prev) => [...prev, { role: "assistant", content: response }]);
        } catch (err) {
            setAiMsgs((prev) => [...prev, { role: "assistant", content: "Erreur lors de la réponse de l'IA." }]);
        } finally {
            setAiLoading(false);
        }
    };

    // Mock API IA
    const mockChat = async (message: string) => {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(`Réponse IA simulée à : "${message}"`);
            }, 1000);
        });
    };

    return (
        <div className={`flex flex-col ${glass} p-4 max-h-[80vh] xl:sticky xl:top-6`}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                    🤖
                </div>
                <div className="font-semibold">Tuteur AI</div>
            </div>

            <Separator className="mb-3" />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {aiMsgs.map((m, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === "assistant"
                                ? "bg-white/70 dark:bg-gray-950/70 w-50"
                                : "bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 w-50 "
                            }`}
                    >
                        <div className="opacity-70 mb-1 text-xs">
                            {m.role === "assistant" ? "Assistant" : "Toi"}
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {m.content}
                        </div>
                    </div>
                ))}
                {aiLoading && <div className="text-xs opacity-70">L'IA rédige une réponse…</div>}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="mt-3 grid grid-cols-1 gap-2">
                <Textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Pose ta question… (ex: Explique la règle de la chaîne en dérivation)"
                    className="min-h-[88px]"
                />
                <div className="flex items-center gap-2">
                    <Button
                        className="gap-2 flex-1"
                        onClick={handleSend}
                        disabled={aiLoading || !aiInput.trim()}
                    >
                        <MessageSquare size={16} /> Envoyer
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setAiInput("Résume ce texte en 3 points : …")}
                        disabled={aiLoading}
                    >
                        Modèle
                    </Button>
                </div>
                <div className="text-[11px] opacity-70">
                    Astuce : précise ton niveau (débutant/intermédiaire/avancé) pour une meilleure réponse.
                </div>
            </div>
        </div>
    );
}
