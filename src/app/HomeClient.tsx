'use client';

import { useEffect } from "react";
import { HomeProps } from "@/types/home";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function HomeClient({ categories, latestUpdates }: HomeProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 
                     dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(59,130,246,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,rgba(147,51,234,0.08),transparent)]" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50/50 via-transparent to-transparent 
                         dark:from-blue-950/30 dark:via-transparent dark:to-transparent py-20 w-full">
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent 
                          bg-gradient-to-r from-blue-600 to-purple-600 
                          dark:from-blue-400 dark:to-purple-400">
              PC知识库
            </h1>
            <p className="body-text text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              探索、学习、分享 
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full 
                            blur-xl transform -translate-y-1"></div>
              <input
                type="text"
                placeholder="搜索知识库..."
                className="body-text w-full px-6 py-4 rounded-full border border-gray-200/80 dark:border-gray-700/80
                         focus:border-blue-500 dark:focus:border-blue-400 outline-none
                         bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                         text-gray-900 dark:text-white
                         shadow-lg shadow-blue-500/5 dark:shadow-blue-400/5
                         transition-all duration-300"
              />
              <button className="btn-text absolute right-3 top-1/2 -translate-y-1/2 p-2 
                               bg-gradient-to-r from-blue-600 to-blue-700 
                               dark:from-blue-500 dark:to-blue-600
                               rounded-full hover:shadow-lg hover:shadow-blue-500/20
                               transition-all duration-200">
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-16 w-full">
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-[2px]"></div>
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              data-aos="fade-up">
            知识分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 
                          shadow-lg hover:shadow-xl
                          border border-gray-100/80 dark:border-gray-700/80
                          hover:bg-white hover:dark:bg-gray-800
                          transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="card-title text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="body-text text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                <a href={`/categories/${category.slug}`}
                   className="nav-text text-blue-600 dark:text-blue-400 hover:text-blue-700 
                            dark:hover:text-blue-300 font-medium inline-flex items-center
                            group">
                  查看更多
                  <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="relative py-16 w-full">
        <div className="absolute inset-0 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-[2px]"></div>
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              data-aos="fade-up">
            最新更新
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {latestUpdates.map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-6 
                          shadow-md hover:shadow-lg hover:bg-white hover:dark:bg-gray-700
                          border border-gray-100/80 dark:border-gray-600/80
                          transition-all duration-300 flex flex-col min-h-[160px]"
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`caption-text px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm
                                   ${update.type === 'article' 
                                     ? 'bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-200'
                                     : 'bg-purple-100/80 text-purple-800 dark:bg-purple-900/80 dark:text-purple-200'
                                   }`}>
                      {update.type === 'article' ? '文章' : '工具'}
                    </span>
                    <time className="caption-text text-sm text-gray-500 dark:text-gray-400">
                      {new Date(update.updatedAt).toLocaleDateString()}
                    </time>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="card-title text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {update.title}
                    </h3>
                    <p className="body-text text-gray-600 dark:text-gray-300 line-clamp-2">
                      {update.type === 'tool' ? update.description : '点击查看详情'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
