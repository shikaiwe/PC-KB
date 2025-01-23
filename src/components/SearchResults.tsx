'use client';

import Link from "next/link";
import { Download } from "lucide-react";
import Image from "next/image";

interface SearchResult {
  id: number;
  title: string;
  content: string;
  type: 'article' | 'tool';
  category?: string;
  slug?: string;
  downloadUrl?: string;
  size?: string;
  version?: string;
  updatedAt?: Date;
}

interface Props {
  query: string;
  results: Array<SearchResult>;
}

export default function SearchResults({ query, results }: Props) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          没有找到相关结果
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={`${result.type}-${result.id}`}
          className="transform transition duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          {result.type === 'article' ? (
            // 文章搜索结果
            <Link
              href={`/articles/${result.slug}`}
              className="block bg-white shadow rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                  {result.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {result.content}
                </p>
                {result.updatedAt && (
                  <div className="text-sm text-gray-500">
                    {new Date(result.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Link>
          ) : (
            // 工具搜索结果
            <Link
              href={result.downloadUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white shadow rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                      {result.title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        工具
                      </span>
                      {result.category && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {result.content}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {result.version && (
                      <span>版本：{result.version}</span>
                    )}
                    {result.size && (
                      <span>大小：{result.size}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
} 