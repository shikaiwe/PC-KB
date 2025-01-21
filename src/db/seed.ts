import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { tools } from './schema';

const sqlite = new Database('pc-kb.db');
const db = drizzle(sqlite);

// 图吧工具箱软件数据
const toolsData = [
    {
        id: 1,
        name: "CPU-Z",
        description: "CPU信息检测工具，可以查看处理器的详细信息",
        category: "硬件检测",
        downloadUrl: "https://www.cpuid.com/softwares/cpu-z.html",
        size: "2.5MB",
        version: "2.08",
        icon: "/icons/cpu-z.png",
        downloadCount: 0
    },
    {
        id: 2,
        name: "GPU-Z",
        description: "显卡信息检测工具，可以查看显卡的详细参数和实时状态",
        category: "硬件检测",
        downloadUrl: "https://www.techpowerup.com/gpuz/",
        size: "3.2MB",
        version: "2.54.0",
        icon: "/icons/gpu-z.png",
        downloadCount: 0
    },
    {
        id: 3,
        name: "AIDA64",
        description: "系统信息检测工具，提供全面的硬件检测和性能测试",
        category: "硬件检测",
        downloadUrl: "https://www.aida64.com/downloads",
        size: "50MB",
        version: "7.00",
        icon: "/icons/aida64.png",
        downloadCount: 0
    },
    {
        id: 4,
        name: "CrystalDiskInfo",
        description: "硬盘健康状况检测工具",
        category: "硬件检测",
        downloadUrl: "https://crystalmark.info/en/software/crystaldiskinfo/",
        size: "4.8MB",
        version: "9.1.1",
        icon: "/icons/crystaldiskinfo.png",
        downloadCount: 0
    },
    {
        id: 5,
        name: "CrystalDiskMark",
        description: "硬盘读写速度测试工具",
        category: "性能测试",
        downloadUrl: "https://crystalmark.info/en/software/crystaldiskmark/",
        size: "4.5MB",
        version: "8.0.4",
        icon: "/icons/crystaldiskmark.png",
        downloadCount: 0
    },
    {
        id: 6,
        name: "OCCT",
        description: "系统稳定性测试工具，可以进行CPU、内存和显卡的压力测试",
        category: "性能测试",
        downloadUrl: "https://www.ocbase.com/",
        size: "22.3MB",
        version: "11.1.5",
        icon: "/icons/occt.png",
        downloadCount: 0
    },
    {
        id: 7,
        name: "MemTest86",
        description: "内存测试工具，可以检测内存是否存在故障",
        category: "性能测试",
        downloadUrl: "https://www.memtest86.com/",
        size: "20MB",
        version: "10.1",
        icon: "/icons/memtest86.png",
        downloadCount: 0
    },
    {
        id: 8,
        name: "DisplayX",
        description: "显示器测试工具，可以测试显示器的色彩、响应时间等参数",
        category: "显示检测",
        downloadUrl: "https://www.displayx.org/",
        size: "15MB",
        version: "1.5",
        icon: "/icons/displayx.png",
        downloadCount: 0
    },
    {
        id: 9,
        name: "DDU",
        description: "显卡驱动卸载工具，可以完全清除显卡驱动",
        category: "系统工具",
        downloadUrl: "https://www.wagnardsoft.com/",
        size: "8.5MB",
        version: "18.0.6.9",
        icon: "/icons/ddu.png",
        downloadCount: 0
    },
    {
        id: 10,
        name: "MSI Afterburner",
        description: "显卡超频工具，可以调整显卡核心频率、显存频率和电压",
        category: "超频工具",
        downloadUrl: "https://www.msi.com/Landing/afterburner/",
        size: "45MB",
        version: "4.6.5",
        icon: "/icons/msi-afterburner.png",
        downloadCount: 0
    }
];

async function main() {
    try {
        console.log('开始插入工具数据...');
        
        // 插入工具数据
        for (const tool of toolsData) {
            await db.insert(tools).values(tool).run();
        }
        
        console.log('数据插入完成！');
        
        // 关闭数据库连接
        sqlite.close();
    } catch (error) {
        console.error('数据插入失败:', error);
        process.exit(1);
    }
}

main(); 