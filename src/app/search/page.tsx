import { Container, Heading, Section, Card, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { Search as SearchIcon, Download, FolderOpen, FileText, Wrench } from "lucide-react";
import { searchContents } from "@/lib/search";
import Image from "next/image";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const searchResults = query
    ? (await searchContents(query)).hits
    : [];

  return (
    <Section size="2" className="py-8">
      <Container size="3">
        <Heading size="8" mb="6" weight="bold">
          搜索结果
        </Heading>

        <form className="mb-8">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="输入关键词搜索..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
              autoFocus
            />
          </div>
        </form>

        {query && (
          <div className="grid gap-4">
            {searchResults.map((item: any) => (
              <Card key={item.id} asChild>
                {item.type === 'tool' ? (
                  <Link href={item.downloadUrl} target="_blank">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Heading size="4" className="text-blue-600 hover:text-blue-700">
                                {item.title}
                              </Heading>
                              <Badge color="blue" variant="soft">
                                <Wrench className="h-3 w-3 mr-1" />
                                {item.category}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="mr-2">{item.size}</span>
                              <span className="mr-2">·</span>
                              <span className="mr-2">v{item.version}</span>
                              <Download className="h-4 w-4" />
                            </div>
                          </div>
                          <Text as="p" color="gray" size="2" className="line-clamp-2">
                            {item.content}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : item.type === 'category' ? (
                  <Link href={`/category/${item.id}`}>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <FolderOpen className="h-5 w-5 text-blue-500" />
                        <Heading size="4" className="text-blue-600 hover:text-blue-700">
                          {item.title}
                        </Heading>
                      </div>
                      {item.content && (
                        <Text as="p" color="gray" size="2" className="line-clamp-2">
                          {item.content}
                        </Text>
                      )}
                    </div>
                  </Link>
                ) : (
                  <Link href={`/contents/${item.id}`}>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <Heading size="4" className="text-blue-600 hover:text-blue-700">
                          {item.title}
                        </Heading>
                        {item.category && (
                          <Badge color="gray" variant="soft">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      <Text as="p" color="gray" size="2" className="line-clamp-2">
                        {item.content}
                      </Text>
                    </div>
                  </Link>
                )}
              </Card>
            ))}

            {searchResults.length === 0 && (
              <Text align="center" color="gray" className="py-8">
                未找到相关内容
              </Text>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
} 