import { db } from '@/db'
import { categories, contents } from '@/db/schema'

async function seedData() {
  try {
    // 1. 添加分类
    const categoryIds = await Promise.all([
      db.insert(categories).values({
        name: '系统维护',
        description: '系统维护相关内容',
        sort: 1
      }).returning({ id: categories.id }),
      db.insert(categories).values({
        name: '软件使用',
        description: '软件使用指南',
        sort: 2
      }).returning({ id: categories.id }),
      db.insert(categories).values({
        name: '故障排除',
        description: '常见故障排除方法',
        sort: 3
      }).returning({ id: categories.id })
    ]);

    console.log('分类添加成功:', categoryIds);

    // 2. 添加内容
    const contentValues = [
      {
        title: 'Windows 系统维护指南',
        content: '本文介绍了 Windows 系统的日常维护方法，包括磁盘清理、系统更新、驱动更新等内容。定期维护可以保持系统的流畅运行。',
        categoryId: categoryIds[0][0].id,
        sort: 1
      },
      {
        title: 'Office 软件使用技巧',
        content: '介绍 Microsoft Office 软件的使用技巧，包括 Word、Excel、PowerPoint 等常用功能的使用方法和快捷键。',
        categoryId: categoryIds[1][0].id,
        sort: 1
      },
      {
        title: '蓝屏故障解决方案',
        content: '详细介绍了 Windows 系统蓝屏故障的常见原因和解决方法，包括驱动问题、硬件故障、系统文件损坏等情况的处理步骤。',
        categoryId: categoryIds[2][0].id,
        sort: 1
      }
    ];

    await db.insert(contents).values(contentValues);
    console.log('内容添加成功');

  } catch (error) {
    console.error('添加测试数据失败:', error);
  }
}

// 运行数据填充
seedData().catch(console.error); 