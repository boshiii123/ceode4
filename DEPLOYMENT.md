# 部署指南

## 部署到Vercel

### 第一步：准备仓库

1. 将代码推送到GitHub:
```bash
git init
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/yourusername/webp-compressor.git
git push -u origin main
```

### 第二步：部署到Vercel

1. 访问 [Vercel](https://vercel.com) 并使用GitHub账户登录
2. 点击"新建项目"
3. 导入你的GitHub仓库
4. Vercel会自动检测这是一个Next.js项目
5. 点击"部署"

### 第三步：配置域名（可选）

1. 在Vercel控制台中，进入项目设置
2. 导航到"域名"
3. 如果需要，添加你的自定义域名

## 环境变量

基本功能无需环境变量。

## 构建配置

项目已针对最佳性能进行配置：

- **框架**: Next.js 14 (App Router)
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **安装命令**: `npm install`

## 性能优化

项目包含多项优化：

- **图片优化**: Next.js内置图片优化
- **代码分割**: 自动代码分割以获得更好性能
- **静态生成**: 在可能的情况下静态生成页面
- **CDN**: Vercel的全球CDN，确保全球快速加载

## SEO配置

项目包含全面的SEO功能：

- **Meta标签**: 针对搜索引擎优化
- **Open Graph**: 社交媒体分享优化
- **站点地图**: 自动生成sitemap
- **Robots.txt**: 搜索引擎爬取指令
- **结构化数据**: 富片段支持

## 监控

部署后，你可以使用以下方式监控网站：

- **Vercel Analytics**: 内置性能监控
- **Google Analytics**: 在布局中添加你的跟踪ID
- **Google Search Console**: 提交sitemap进行索引

## 自定义配置

### 添加Google Analytics

1. 获取你的Google Analytics跟踪ID
2. 将其添加到`app/layout.tsx`的metadata部分
3. 更新metadata中的验证码

### 添加AdSense

1. 获取你的AdSense代码
2. 将其添加到相应的组件中
3. 遵循AdSense的广告放置政策

### 自定义域名

1. 从你偏好的注册商购买域名
2. 将其添加到你的Vercel项目
3. 按照Vercel的指示更新DNS设置

## 故障排除

### 常见问题

1. **构建失败**: 检查所有依赖是否正确安装
2. **图片处理错误**: 确保浏览器兼容性
3. **SEO问题**: 验证meta标签和sitemap生成

### 支持

如果遇到问题：

1. 检查Vercel部署日志
2. 查看Next.js文档
3. 在GitHub上提交issue

## 性能检查清单

- [ ] 图片已优化和压缩
- [ ] 代码已压缩和打包
- [ ] CDN已启用
- [ ] 缓存已配置
- [ ] SEO meta标签已存在
- [ ] 站点地图已生成
- [ ] Robots.txt已配置
- [ ] 分析工具已设置
- [ ] 错误页面已自定义
- [ ] 加载状态已实现

## 安全

- [ ] HTTPS已启用（Vercel自动启用）
- [ ] 安全头已配置
- [ ] 依赖项是最新的
- [ ] 客户端代码中没有敏感数据
- [ ] 输入验证已实现 