-- 插入工具数据
INSERT INTO tools (name, description, category, download_url, size, version, icon, download_count) VALUES
-- 系统工具
('AIDA64', '专业的系统信息查看和硬件检测工具，提供详细的硬件信息和性能测试', '系统工具', '/downloads/aida64', '45.2MB', '6.92.5', 'shield', 0),
('DriverEasy', '智能识别和更新系统驱动程序，支持一键更新所有过期驱动', '系统工具', '/downloads/drivereasy', '38.6MB', '5.7.3', 'wrench', 0),
('CCleaner', '系统清理和优化工具，可清理垃圾文件、注册表和启动项管理', '系统工具', '/downloads/ccleaner', '32.1MB', '6.15.0', 'zap', 0),

-- 硬件检测
('OCCT', '专业的CPU、GPU和电源稳定性测试工具，支持温度监控', '硬件检测', '/downloads/occt', '28.5MB', '9.1.3', 'cpu', 0),
('CrystalDiskInfo', '硬盘健康状态监测工具，支持S.M.A.R.T信息读取', '硬件检测', '/downloads/crystaldiskinfo', '15.8MB', '8.17.5', 'hard-drive', 0),
('MemTest86', '专业的内存测试工具，可检测内存故障和稳定性', '硬件检测', '/downloads/memtest86', '22.3MB', '9.4.0', 'circuit-board', 0),
('GPU-Z', '显卡信息查看和监控工具，支持实时温度、频率监控', '硬件检测', '/downloads/gpu-z', '12.4MB', '2.51.0', 'monitor', 0),

-- 网络工具
('Wireshark', '专业的网络抓包和分析工具，用于诊断网络问题', '网络工具', '/downloads/wireshark', '65.7MB', '4.2.0', 'wifi', 0),
('Advanced IP Scanner', '局域网IP扫描工具，可快速发现网络设备', '网络工具', '/downloads/advanced-ip-scanner', '18.9MB', '2.5.4', 'terminal', 0),

-- 数据恢复
('Recuva', '专业的数据恢复软件，可恢复误删除的文件', '数据恢复', '/downloads/recuva', '42.3MB', '1.53.0', 'hammer', 0),
('TestDisk', '分区修复和数据恢复工具，支持多种文件系统', '数据恢复', '/downloads/testdisk', '35.6MB', '7.1.0', 'bug', 0); 