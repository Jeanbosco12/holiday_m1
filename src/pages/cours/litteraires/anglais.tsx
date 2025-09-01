"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileText, PlayCircle, Wand2, XCircle } from "lucide-react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

// ⚠️ À remplacer par un appel API backend
const env = {
  LIVEKIT_URL: process.env.NEXT_PUBLIC_LIVEKIT_URL || "",
  LIVEKIT_TOKEN: process.env.NEXT_PUBLIC_LIVEKIT_TOKEN || "",
};

const courses = [
  {
    title: "English - Beginner Level",
    description: "Learn basic grammar, everyday vocabulary, and common phrases.",
    tags: ["Grammar", "Vocabulary", "Pronunciation"],
    icon: "📘",
  },
  {
    title: "English - Intermediate Level",
    description: "Improve fluency and reading comprehension.",
    tags: ["Reading", "Listening", "Conversation"],
    icon: "🎓",
  },
  {
    title: "English - Advanced Level",
    description: "Master nuances, idiomatic expressions, and formal writing.",
    tags: ["Expression", "Writing", "Culture"],
    icon: "✍️",
  },
];

const glass =
  "bg-white/40 dark:bg-gray-900/60 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-800 rounded-2xl transition-colors duration-300";

export default function EnglishPage() {
  const [liveVisible, setLiveVisible] = useState(false);

  const livekitUrl = env.LIVEKIT_URL;
  const token = env.LIVEKIT_TOKEN;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        English Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
          >
            <Card
              className={`${glass} rounded-2xl shadow-md hover:shadow-xl cursor-pointer p-5`}
            >
              <CardHeader className="flex flex-col items-center space-y-3">
                <span className="text-3xl">{course.icon}</span>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-100 text-center">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-3">
                  {course.description}
                </p>
                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  {course.tags.map((tag) => (
                    <motion.div whileHover={{ scale: 1.1 }} key={tag}>
                      <Badge variant="secondary">{tag}</Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => setLiveVisible(true)}
                  >
                    <PlayCircle size={16} /> Start
                  </Button>
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Wand2 size={16} /> AI Explanation
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <FileText size={16} /> Quiz Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Section vidéo LiveKit */}
      {liveVisible && (
        <div className="mt-10 max-w-4xl mx-auto">
          <Card className={`${glass} p-4`}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-center w-full">
                Live Session
              </CardTitle>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                onClick={() => setLiveVisible(false)}
              >
                <XCircle size={16} /> Quit
              </Button>
            </CardHeader>
            <CardContent>
              <LiveKitRoom
                video
                audio
                token={token}
                serverUrl={livekitUrl}
                connect
                onDisconnected={() => setLiveVisible(false)}
                style={{ height: "600px" }}
              >
                <VideoConference />
              </LiveKitRoom>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
