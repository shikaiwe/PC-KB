import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { categories, contents, tools } from './schema';

const sqlite = new Database('pc-kb.db');
const db = drizzle(sqlite);

// 分类数据
const categoriesData = [
    {
        name: "电脑硬件知识",
        slug: "hardware",
        description: "了解CPU、内存、硬盘等硬件知识",
        sort: 1
    },
    {
        name: "装机指南",
        slug: "build",
        description: "从零开始学习组装电脑",
        sort: 2
    },
    {
        name: "故障排查",
        slug: "troubleshoot",
        description: "常见电脑问题解决方案",
        sort: 3
    },
    {
        name: "性能优化",
        slug: "optimize",
        description: "提升电脑性能的各种技巧",
        sort: 4
    },
    {
        name: "选购建议",
        slug: "purchase",
        description: "如何选购适合自己的电脑配件",
        sort: 5
    }
];

// 内容数据
const contentsData = [
    {
        title: "CPU性能天梯图解读指南",
        slug: "cpu-performance-chart",
        content: "# CPU性能天梯图解读指南\n\n本文将帮助你理解如何阅读CPU性能天梯图...",
        categorySlug: "hardware",
        sort: 1,
        type: "original"
    },
    {
        title: "新手装机必读：如何避免常见错误",
        slug: "common-mistakes-to-avoid",
        content: "# 新手装机常见错误\n\n本文总结了新手在装机过程中的常见错误...",
        categorySlug: "build",
        sort: 1,
        type: "original"
    },
    {
        title: "电脑蓝屏问题完全解决方案",
        slug: "blue-screen-solutions",
        content: "蓝屏是Windows系统中最常见的严重错误之一...",
        categorySlug: "troubleshoot",
        sort: 1,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Th411x7gc/"
    },
    {
        title: "显卡过热降频？教你如何解决",
        slug: "gpu-thermal-throttling",
        content: "显卡过热降频是很多玩家都会遇到的问题...",
        categorySlug: "optimize",
        sort: 1,
        type: "external",
        sourceUrl: "https://zhuanlan.zhihu.com/p/597040762"
    },
    {
        title: "2024年电脑配置推荐",
        slug: "pc-build-guide-2024",
        content: `# 2024年电脑配置推荐

## 入门级办公配置
- CPU: Intel i3-14100 / AMD R5 5600G
- 主板: B760M / B650M
- 内存: 16GB DDR4 3200MHz
- 硬盘: 500GB NVMe SSD
- 预算参考：3000-4000元

## 中端游戏配置
- CPU: Intel i5-14600K / AMD R7 7700X
- 主板: Z790 / X670
- 显卡: RTX 4070 / RX 7800 XT
- 内存: 32GB DDR5 6000MHz
- 硬盘: 1TB NVMe SSD
- 预算参考：8000-10000元

## 高端工作站配置
- CPU: Intel i9-14900K / AMD R9 7950X
- 主板: Z790 / X670E
- 显卡: RTX 4090
- 内存: 64GB DDR5 7200MHz
- 硬盘: 2TB NVMe SSD
- 预算参考：20000元以上`,
        categorySlug: "purchase",
        sort: 1,
        type: "original"
    },
    {
        title: "固态硬盘选购和使用指南",
        slug: "ssd-buying-guide",
        content: "如何选择适合自己的固态硬盘？PCIe 4.0值得买吗？",
        categorySlug: "purchase",
        sort: 2,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Wm4y1U7Gq/"
    },
    {
        title: "电脑主板故障诊断与维修",
        slug: "motherboard-repair-guide",
        content: "详细介绍主板常见故障的诊断方法和维修技巧...",
        categorySlug: "troubleshoot",
        sort: 2,
        type: "external",
        sourceUrl: "https://zhuanlan.zhihu.com/p/658237741"
    },
    {
        title: "Windows系统优化指南",
        slug: "windows-optimization-guide",
        content: `# Windows系统优化指南

## 基础优化
1. 清理启动项
2. 卸载不必要软件
3. 磁盘碎片整理
4. 更新系统和驱动

## 高级优化
1. 服务优化
2. 注册表清理
3. 系统设置调整
4. 性能选项设置

## 游戏优化
1. 显卡设置调整
2. 游戏模式开启
3. DirectX和运行库更新
4. 后台程序管理

## 注意事项
- 修改前备份系统
- 谨慎修改注册表
- 避免使用第三方优化软件
- 保持系统定期维护`,
        categorySlug: "optimize",
        sort: 1,
        type: "original"
    },
    {
        title: "内存条故障排查全攻略",
        slug: "ram-troubleshooting",
        content: "从内存条插槽清理到兼容性测试，全面解析内存故障...",
        categorySlug: "troubleshoot",
        sort: 3,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Dw411A7Rw/"
    }
];

// 工具数据
const toolsData = [
    {
        name: "AIDA64",
        description: "全面的系统信息工具，提供详细的硬件检测和压力测试功能",
        category: "系统检测",
        downloadUrl: "https://www.aida64.com/downloads",
        size: "50MB",
        version: "7.0.0"
    },
    {
        name: "DriverEasy",
        description: "智能驱动更新工具，自动识别、下载和安装缺失的驱动程序",
        category: "驱动管理",
        downloadUrl: "https://www.drivereasy.com/download/",
        size: "30MB",
        version: "5.7.0"
    },
    {
        name: "CCleaner",
        description: "系统清理和优化工具，可清理垃圾文件和注册表",
        category: "系统优化",
        downloadUrl: "https://www.ccleaner.com/ccleaner/download",
        size: "25MB",
        version: "6.0.0"
    },
    {
        name: "OCCT",
        description: "专业的硬件稳定性测试工具，支持CPU、GPU和内存测试",
        category: "硬件测试",
        downloadUrl: "https://www.ocbase.com/download",
        size: "40MB",
        version: "9.1.0"
    },
    {
        name: "CrystalDiskInfo",
        description: "硬盘健康状态监测工具，可查看硬盘详细信息和SMART状态",
        category: "硬盘工具",
        downloadUrl: "https://crystalmark.info/en/software/crystaldiskinfo/",
        size: "15MB",
        version: "8.12.0"
    },
    {
        name: "Wireshark",
        description: "专业的网络抓包分析工具，用于网络故障排查和安全分析",
        category: "网络工具",
        downloadUrl: "https://www.wireshark.org/download.html",
        size: "80MB",
        version: "4.0.0"
    },
    {
        name: "Recuva",
        description: "数据恢复工具，可恢复误删除的文件和格式化的分区",
        category: "数据恢复",
        downloadUrl: "https://www.ccleaner.com/recuva/download",
        size: "20MB",
        version: "1.53"
    }
];

// 插入数据
async function seed() {
    try {
        // 清空所有表
        console.log("清空所有表...");
        await db.delete(contents);
        await db.delete(tools);
        await db.delete(categories);
        console.log("表清空完成！");

        // 插入分类数据
        console.log("开始插入分类数据...");
        const categoryMap = new Map();
        for (const category of categoriesData) {
            const result = await db.insert(categories).values(category).returning();
            categoryMap.set(category.slug, result[0].id);
        }
        console.log("分类数据插入完成！");

        // 插入内容数据
        console.log("开始插入内容数据...");
        for (const content of contentsData) {
            const { categorySlug, ...rest } = content;
            await db.insert(contents).values({
                ...rest,
                categoryId: categoryMap.get(categorySlug),
                isPublished: true
            });
        }
        console.log("内容数据插入完成！");

        // 插入工具数据
        console.log("开始插入工具数据...");
        for (const tool of toolsData) {
            await db.insert(tools).values(tool);
        }
        console.log("工具数据插入完成！");

        console.log("所有数据初始化完成！");
    } catch (error) {
        console.error("数据初始化失败：", error);
        throw error;
    } finally {
        console.log("关闭数据库连接...");
        sqlite.close();
    }
}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
}); 