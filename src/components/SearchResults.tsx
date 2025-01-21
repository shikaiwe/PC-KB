'use client';

import Link from "next/link";
import Image from "next/image";

interface Props {
  query: string;
  results: Array<{
    id: number;
    type: 'content' | 'tool';
    title: string;
    content: string;
    category?: string;
    createdAt?: string;
    downloadUrl?: string;
    icon?: string;
    size?: string;
    version?: string;
  }>;
}

export default function SearchResults({ query, results }: Props) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">搜索结果</h1>
        <p className="mt-2 text-gray-600">
          找到 {results.length} 条与 "{query}" 相关的结果
        </p>
      </div>

      <div className="grid gap-6">
        {results.map((result) => (
          <div 
            key={`${result.type}-${result.id}`}
            className="transform transition duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            {result.type === 'content' ? (
              // 文章搜索结果
              <Link
                href={`/articles/${result.id}`}
                className="block bg-white shadow rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                      {result.title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        文章
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
                  {result.createdAt && (
                    <div className="text-sm text-gray-500">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              // 工具搜索结果
              <Link
                href={result.downloadUrl || '#'}
                className="block bg-white shadow rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    {result.icon && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={result.icon}
                          alt={result.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
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
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {result.content}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        {result.size && <span>{result.size}</span>}
                        {result.version && <span>v{result.version}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}

        {results.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              未找到与 "{query}" 相关的内容
            </p>
          </div>
        )}
      </div>
    </>
  );
} 