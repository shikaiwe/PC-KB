import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { categories, contents, tools } from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import fs from 'fs';

// 分类数据
const categoriesData = [
    {
        name: "硬件知识",
        slug: "hardware",
        description: "电脑硬件相关知识，包括CPU、显卡、主板等",
        sort: 1
    },
    {
        name: "装机指南",
        slug: "build-guide",
        description: "从零开始的电脑组装教程和注意事项",
        sort: 2
    },
    {
        name: "故障排除",
        slug: "troubleshooting",
        description: "常见电脑问题的诊断和解决方案",
        sort: 3
    },
    {
        name: "性能优化",
        slug: "optimization",
        description: "系统性能优化和超频指南",
        sort: 4
    },
    {
        name: "选购指南",
        slug: "buying-guide",
        description: "电脑配件选购建议和推荐",
        sort: 5
    }
];

// 内容数据
const contentsData = [
    {
        title: "CPU性能天梯图解读指南",
        slug: "cpu-performance-hierarchy",
        content: `# CPU性能天梯图解读指南

## 什么是CPU天梯图？
CPU天梯图是一种直观展示处理器性能排名的图表，帮助用户快速了解不同CPU型号之间的性能差异。

## 如何阅读天梯图
1. 位置越高，性能越强
2. 同一水平线上的CPU性能相近
3. 需要结合价格考虑性价比

## 注意事项
- 天梯图仅供参考，实际性能还需要结合具体使用场景
- 建议选购时参考实测数据和评测文章
- 性能差距在15%以内可认为差异不明显`,
        categoryId: 1,
        sort: 1,
        type: "original",
        isPublished: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        title: "新手装机必读：如何避免常见错误",
        slug: "pc-building-common-mistakes",
        content: `# 新手装机必读：如何避免常见错误

## 装机前的准备
1. 确保工作台清洁干燥
2. 准备防静电措施
3. 仔细阅读说明书

## 常见错误
1. CPU安装方向错误
2. 内存未完全插入
3. 电源线接错
4. 散热硅脂涂抹过多

## 安全注意事项
- 安装前断开电源
- 注意主板支撑柱的安装
- 不要用力过猛
- 线材整理要规范`,
        categoryId: 2,
        sort: 1,
        type: "original",
        isPublished: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-18')
    },
    {
        title: "电脑蓝屏问题完全解决方案",
        slug: "blue-screen-solutions",
        content: "蓝屏是Windows系统中最常见的严重错误之一...",
        categoryId: 3,
        sort: 1,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Th411x7gc/",
        isPublished: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        title: "显卡过热降频？教你如何解决",
        slug: "gpu-thermal-throttling",
        content: "显卡过热降频是很多玩家都会遇到的问题...",
        categoryId: 4,
        sort: 1,
        type: "external",
        sourceUrl: "https://zhuanlan.zhihu.com/p/597040762",
        isPublished: true,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
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
        categoryId: 5,
        sort: 1,
        type: "original",
        isPublished: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-20')
    },
    {
        title: "固态硬盘选购和使用指南",
        slug: "ssd-buying-guide",
        content: "如何选择适合自己的固态硬盘？PCIe 4.0值得买吗？",
        categoryId: 5,
        sort: 2,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Wm4y1U7Gq/",
        isPublished: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    },
    {
        title: "电脑主板故障诊断与维修",
        slug: "motherboard-repair-guide",
        content: "详细介绍主板常见故障的诊断方法和维修技巧...",
        categoryId: 3,
        sort: 2,
        type: "external",
        sourceUrl: "https://zhuanlan.zhihu.com/p/658237741",
        isPublished: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
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
        categoryId: 4,
        sort: 1,
        type: "original",
        isPublished: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-21')
    },
    {
        title: "内存条故障排查全攻略",
        slug: "ram-troubleshooting",
        content: "从内存条插槽清理到兼容性测试，全面解析内存故障...",
        categoryId: 3,
        sort: 3,
        type: "external",
        sourceUrl: "https://www.bilibili.com/video/BV1Dw411A7Rw/",
        isPublished: true,
        createdAt: new Date('2024-01-21'),
        updatedAt: new Date('2024-01-21')
    }
];

// 工具数据
const toolsData = [
    {
        name: "CPU-Z",
        description: "专业的CPU检测工具，可以查看处理器的详细信息，包括核心数、线程数、频率、缓存等参数。同时也能查看主板、内存等硬件信息。",
        category: "硬件检测",
        downloadUrl: "https://www.cpuid.com/softwares/cpu-z.html",
        size: "2.5MB",
        version: "2.08",
        icon: "/icons/cpu-z.png",
        downloadCount: 0,
        createdAt: new Date('2023-12-15'),
        updatedAt: new Date('2024-01-10')
    },
    {
        name: "GPU-Z",
        description: "专业的显卡检测工具，可以查看显卡的核心频率、显存频率、显存大小、接口带宽等详细参数，支持实时监控显卡状态。",
        category: "硬件检测",
        downloadUrl: "https://www.techpowerup.com/gpuz/",
        size: "3.2MB",
        version: "2.54.0",
        icon: "/icons/gpu-z.png",
        downloadCount: 0,
        createdAt: new Date('2023-12-10'),
        updatedAt: new Date('2024-01-15')
    },
    {
        name: "AIDA64",
        description: "全面的系统信息检测工具，提供硬件检测、性能测试、压力测试等功能，支持生成详细的硬件报告。",
        category: "硬件检测",
        downloadUrl: "https://www.aida64.com/downloads",
        size: "50MB",
        version: "7.00",
        icon: "/icons/aida64.png",
        downloadCount: 0,
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2024-01-05')
    },
    {
        name: "CrystalDiskInfo",
        description: "硬盘健康状况检测工具，可以查看硬盘的通电时间、温度、健康状态等信息，支持SSD和HDD。",
        category: "硬件检测",
        downloadUrl: "https://crystalmark.info/en/software/crystaldiskinfo/",
        size: "4.8MB",
        version: "9.1.1",
        icon: "/icons/crystaldiskinfo.png",
        downloadCount: 0,
        createdAt: new Date('2023-12-01'),
        updatedAt: new Date('2024-01-18')
    },
    {
        name: "CrystalDiskMark",
        description: "专业的硬盘性能测试工具，可以测试硬盘的连续读写、随机读写速度，支持不同的测试模式和数据大小。",
        category: "性能测试",
        downloadUrl: "https://crystalmark.info/en/software/crystaldiskmark/",
        size: "4.5MB",
        version: "8.0.4",
        icon: "/icons/crystaldiskmark.png",
        downloadCount: 0,
        createdAt: new Date('2023-11-25'),
        updatedAt: new Date('2024-01-12')
    },
    {
        name: "OCCT",
        description: "专业的系统稳定性测试工具，可以进行CPU、内存、显卡的压力测试，帮助检测系统稳定性和散热性能。",
        category: "性能测试",
        downloadUrl: "https://www.ocbase.com/",
        size: "22.3MB",
        version: "11.1.5",
        icon: "/icons/occt.png",
        downloadCount: 0,
        createdAt: new Date('2023-12-05'),
        updatedAt: new Date('2024-01-20')
    },
    {
        name: "MemTest86",
        description: "专业的内存测试工具，可以全面检测内存的稳定性和潜在问题，支持DDR4/DDR5内存测试。",
        category: "性能测试",
        downloadUrl: "https://www.memtest86.com/",
        size: "20MB",
        version: "10.1",
        icon: "/icons/memtest86.png",
        downloadCount: 0,
        createdAt: new Date('2023-11-15'),
        updatedAt: new Date('2024-01-08')
    },
    {
        name: "DisplayX",
        description: "显示器测试工具，可以测试显示器的色彩、响应时间、亮度均匀性等参数，帮助检查显示器是否存在问题。",
        category: "显示检测",
        downloadUrl: "https://www.displayx.org/",
        size: "15MB",
        version: "1.5",
        icon: "/icons/displayx.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22')
    },
    {
        name: "DDU",
        description: "Display Driver Uninstaller，专业的显卡驱动清理工具，可以完全清除显卡驱动程序，解决驱动冲突问题。",
        category: "系统工具",
        downloadUrl: "https://www.wagnardsoft.com/",
        size: "8.5MB",
        version: "18.0.6.9",
        icon: "/icons/ddu.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-23'),
        updatedAt: new Date('2024-01-23')
    },
    {
        name: "MSI Afterburner",
        description: "最受欢迎的显卡超频工具，可以调整显卡核心频率、显存频率、电压、风扇转速，支持硬件监控和游戏内显示。",
        category: "超频工具",
        downloadUrl: "https://www.msi.com/Landing/afterburner/",
        size: "45MB",
        version: "4.6.5",
        icon: "/icons/msi-afterburner.png",
        downloadCount: 0,
        createdAt: new Date('2023-10-20'),
        updatedAt: new Date('2024-01-16')
    },
    {
        name: "ASUS GPU Tweak III",
        description: "华硕官方显卡超频工具，提供一键超频和自定义超频功能，界面美观，操作简单。",
        category: "超频工具",
        downloadUrl: "https://www.asus.com/campaign/gpu-tweak-III/",
        size: "125MB",
        version: "1.5.8.0",
        icon: "/icons/gpu-tweak.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
    },
    {
        name: "HWiNFO",
        description: "专业的硬件信息检测工具，提供实时监控和日志记录功能，支持几乎所有的硬件传感器读数。",
        category: "硬件检测",
        downloadUrl: "https://www.hwinfo.com/download/",
        size: "7.2MB",
        version: "7.66",
        icon: "/icons/hwinfo.png",
        downloadCount: 0,
        createdAt: new Date('2023-11-10'),
        updatedAt: new Date('2024-01-22')
    },
    {
        name: "Prime95",
        description: "专业的CPU压力测试工具，可以进行不同强度的CPU稳定性测试，广泛用于超频测试。",
        category: "性能测试",
        downloadUrl: "https://www.mersenne.org/download/",
        size: "5.8MB",
        version: "30.8",
        icon: "/icons/prime95.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-27'),
        updatedAt: new Date('2024-01-27')
    },
    {
        name: "FurMark",
        description: "显卡压力测试工具，通过OpenGL进行极限渲染测试，可以测试显卡的稳定性和温度控制。",
        category: "性能测试",
        downloadUrl: "https://geeks3d.com/furmark/",
        size: "6.4MB",
        version: "1.33.0",
        icon: "/icons/furmark.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-28'),
        updatedAt: new Date('2024-01-28')
    },
    {
        name: "Intel XTU",
        description: "英特尔官方超频工具，支持CPU和内存超频，提供实时监控和性能测试功能。",
        category: "超频工具",
        downloadUrl: "https://www.intel.com/content/www/us/en/download/17881/intel-extreme-tuning-utility-intel-xtu.html",
        size: "85MB",
        version: "7.12.1",
        icon: "/icons/intel-xtu.png",
        downloadCount: 0,
        createdAt: new Date('2024-01-29'),
        updatedAt: new Date('2024-01-29')
    }
];

async function main() {
    try {
        // 删除旧数据库文件
        console.log('删除旧数据库文件...');
        try {
            fs.unlinkSync('pc-kb.db');
            fs.unlinkSync('pc-kb.db-shm');
            fs.unlinkSync('pc-kb.db-wal');
        } catch (error) {
            // 如果文件不存在，忽略错误
        }

        // 创建新的数据库连接
        console.log('创建数据库连接...');
        const sqlite = new Database('pc-kb.db');
        const db = drizzle(sqlite);

        // 运行迁移
        console.log('运行数据库迁移...');
        await migrate(db, { migrationsFolder: './drizzle' });

        // 清空所有表（按照外键依赖的顺序）
        console.log('清空现有数据...');
        try {
            await db.delete(contents);
            await db.delete(categories);
        } catch (error) {
            // 如果表不存在，忽略错误
        }

        // 插入分类数据并获取ID
        console.log('开始插入分类数据...');
        const insertedCategories = await Promise.all(
            categoriesData.map(category => 
                db.insert(categories)
                  .values(category)
                  .returning()
                  .then(rows => rows[0])
            )
        );
        console.log('分类数据插入完成！');

        // 准备内容数据
        const contentDataWithCategoryIds = contentsData.map(content => {
            const category = insertedCategories[content.categoryId - 1];
            return {
                ...content,
                categoryId: category.id
            };
        });

        // 插入内容数据
        console.log('开始插入内容数据...');
        await db.insert(contents).values(contentDataWithCategoryIds);
        console.log('内容数据插入完成！');

        // 插入工具数据
        try {
            console.log('开始插入工具数据...');
            await db.insert(tools).values(toolsData);
            console.log('工具数据插入完成！');
        } catch (error: any) {
            console.log('工具数据插入失败（可能是表不存在）:', error.message);
        }

        // 关闭数据库连接
        console.log('关闭数据库连接...');
        sqlite.close();
        
        console.log('所有数据初始化完成！');
    } catch (error: any) {
        console.error('数据初始化失败:', error.message);
        process.exit(1);
    }
}

// 执行主函数
main().catch(console.error); 