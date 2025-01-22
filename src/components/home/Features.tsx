'use client';

import { Book, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} className="group block">
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <motion.div 
          className="text-blue-600 dark:text-blue-400 mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
      </motion.div>
    </Link>
  );
}

export default function Features() {
  return (
    <section className="py-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <FeatureCard
              icon={<Book className="w-6 h-6" />}
              title="维修指南"
              description="详细的步骤说明，帮助您快速解决问题"
              link="/categories"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <FeatureCard
              icon={<Star className="w-6 h-6" />}
              title="专业工具"
              description="提供各种专业维修工具和软件的使用指南"
              link="/tools"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="实时更新"
              description="持续更新最新的维修技术和解决方案"
              link="/updates"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 