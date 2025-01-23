'use client';

import { useEffect, useState } from "react";
import { HomeProps } from "@/types/home";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import LatestUpdates from "@/components/home/LatestUpdates";

export default function HomeClient({ categories, latestUpdates }: HomeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <main className="pt-8">
        <Hero />
        <Features />
        <Categories categories={categories} />
        <LatestUpdates updates={latestUpdates} />
      </main>
    </div>
  );
}
