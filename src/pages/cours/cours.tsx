"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Cpu, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

export default function Cours() {
  const categories = [
    {
      title: "Informatique",
      description:
        "Apprends la programmation, l’IA, les bases de données et les systèmes.",
      icon: <Cpu className="w-10 h-10 text-blue-600" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Scientifique",
      description:
        "Explore les mathématiques, la physique, la chimie et la biologie.",
      icon: <FlaskConical className="w-10 h-10 text-green-600" />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Littéraire",
      description:
        "Découvre la philosophie, l’histoire, la littérature et les langues.",
      icon: <BookOpen className="w-10 h-10 text-purple-600" />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Choisis une catégorie de cours
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-col items-center space-y-2">
                {cat.icon}
                <CardTitle className="text-gray-900 dark:text-gray-100">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-300">{cat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

  );
}
