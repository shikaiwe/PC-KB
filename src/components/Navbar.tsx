import { Button, Container, Heading } from "@radix-ui/themes";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heading size="4">PC维修知识库</Heading>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              分类
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-gray-900">
              文章
            </Link>
            <Button variant="soft" asChild>
              <Link href="/search">搜索</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
} 