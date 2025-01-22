'use client';

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-32 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            专业的电脑维修技术知识库
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            提供全面的电脑维修技术资料，帮助您解决各类电脑问题
          </p>
          
          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto mt-12">
            <motion.form 
              action="/search" 
              method="get"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="q"
                  placeholder="搜索维修教程、故障解决方案..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 
                           bg-white dark:bg-gray-800 dark:text-gray-100
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 