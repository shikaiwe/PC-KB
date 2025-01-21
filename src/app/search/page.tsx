import { Container, Heading, Section, Card, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { Search as SearchIcon, Download, FolderOpen, FileText, Wrench } from "lucide-react";
import Image from "next/image";
import { searchContents } from "@/lib/search";
import SearchResults from "../../components/SearchResults";

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">搜索结果</h1>
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">请输入搜索关键词</p>
          </div>
        </div>
      </div>
    );
  }

  // 使用统一搜索方法
  const { hits: searchResults } = await searchContents(query);
  
  // 转换日期格式
  const formattedResults = searchResults.map(result => ({
    ...result,
    createdAt: formatDate(result.createdAt)
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchResults query={query} results={formattedResults} />
      </div>
    </div>
  );
} 