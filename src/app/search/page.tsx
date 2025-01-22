import { Container, Heading, Section, Card, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { Search as SearchIcon, Download, FolderOpen, FileText, Wrench } from "lucide-react";
import Image from "next/image";
import { searchContents } from "@/lib/search";
import SearchResults from "../../components/SearchResults";
import { SearchResult } from "@/types/search";

interface Props {
  searchParams: {
    q?: string;
  };
}

function formatDate(dateStr: string | Date | undefined): string | undefined {
  if (!dateStr) return undefined;
  try {
    // 如果已经是 Date 对象，直接转换
    if (dateStr instanceof Date) {
      return dateStr.toISOString();
    }
    // 尝试解析日期字符串
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // 如果解析失败，返回原始字符串
      return String(dateStr);
    }
    return date.toISOString();
  } catch {
    // 如果出现错误，返回原始字符串
    return String(dateStr);
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || '';

  // 如果没有搜索关键词，显示空状态
  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">搜索结果</h1>
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">请输入搜索关键词</p>
          </div>
        </div>
      </div>
    );
  }

  // 执行搜索
  const { hits: searchResults } = await searchContents(query);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">搜索结果</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            找到 {searchResults.length} 个结果
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((result: SearchResult) => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-blue-600 dark:text-blue-400">
                      {result.type === 'article' ? (
                        <FileText className="w-5 h-5" />
                      ) : result.type === 'tool' ? (
                        <Wrench className="w-5 h-5" />
                      ) : (
                        <FolderOpen className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {result.type === 'article' ? '文章' : result.type === 'tool' ? '工具' : '分类'}
                    </span>
                  </div>

                  <Link
                    href={`/${result.type}s/${result.slug || ''}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {result.title}
                    </h2>
                  </Link>

                  {result.content && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                      {result.content}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.updatedAt && (
                        <time dateTime={formatDate(result.updatedAt)}>
                          更新于 {new Date(result.updatedAt).toLocaleDateString()}
                        </time>
                      )}
                    </div>
                    {result.type === 'tool' && result.downloadUrl && (
                      <a
                        href={result.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        下载
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              未找到与 "{query}" 相关的内容
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 