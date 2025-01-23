'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Clock } from 'lucide-react';

type ArticleUpdate = {
  type: 'article';
  title: string;
  updatedAt: Date;
  slug: string;
};

type ToolUpdate = {
  type: 'tool';
  title: string;
  updatedAt: Date;
  description: string;
};

type Update = ArticleUpdate | ToolUpdate;

interface LatestUpdatesProps {
  updates: Update[];
}

export default function LatestUpdates({ updates }: LatestUpdatesProps) {
  if (updates.length === 0) {
    return null;
  }

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
              key={`${update.type}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md 
                            transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium shrink-0
                          ${update.type === 'article' 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          }`}
                        >
                          {update.type === 'article' ? '文章' : '工具'}
                        </span>
                        <time className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                          {update.updatedAt.toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                    {update.type === 'article' ? (
                      <Link
                        href={`/articles/${update.slug}`}
                        className="group"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {update.title}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {update.title}
                      </h3>
                    )}
                  </div>
                  {update.type === 'tool' && (
                    <p className="text-gray-600 dark:text-gray-300">
                      {update.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 