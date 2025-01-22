'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Update } from "@/types/home";

interface LatestUpdatesProps {
  updates: Update[];
}

export default function LatestUpdates({ updates }: LatestUpdatesProps) {
  return (
    <section className="py-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">最新更新</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">及时了解最新的维修技术和解决方案</p>
          </div>
          <Link href="/updates" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                         hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group">
            查看全部 
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md 
                            transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {update.icon}
                  </div>
                  <span className="font-medium">{update.type === 'article' ? '文章' : '工具'}</span>
                  <span>·</span>
                  <span>{update.updatedAt.toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {update.title}
                </h3>
                {update.type === 'article' ? (
                  <Link href={`/articles/${update.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    阅读更多
                  </Link>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{update.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 