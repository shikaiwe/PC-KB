'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "@/types/home";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">问题分类</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">选择您需要的维修类别，快速找到解决方案</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/categories/${category.slug}`} className="group block">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md 
                              transform hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 
                               group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 