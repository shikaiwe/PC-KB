'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

// 路径到中文标题的映射
const pathToTitle: { [key: string]: string } = {
  articles: '文章',
  tools: '工具',
  categories: '分类',
  search: '搜索',
};

interface BreadcrumbProps {
  articleTitle?: string;
}

export default function Breadcrumb({ articleTitle }: BreadcrumbProps) {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    // 获取中文标题
    let title = pathToTitle[segment];
    if (!title) {
      if (segments[0] === 'articles' && index === 1 && articleTitle) {
        title = articleTitle;
      } else {
        title = segment;
      }
    }
    return {
      href,
      label: title,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link
        href="/"
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            href={crumb.href}
            className={`hover:text-gray-900 transition-colors ${
              index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 