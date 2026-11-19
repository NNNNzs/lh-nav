import baiduIcon from '@/assets/icons/baidu.jpg'
import capcutIcon from '@/assets/icons/capcut.jpg'
import bilibiliIcon from '@/assets/icons/bilibili.jpg'
import doubaoIcon from '@/assets/icons/doubao.jpg'
import douyinIcon from '@/assets/icons/douyin.jpg'
import feishuIcon from '@/assets/icons/feishu.jpg'
import iqiyiIcon from '@/assets/icons/iqiyi.jpg'
import jdIcon from '@/assets/icons/jd.jpg'
import kimiIcon from '@/assets/icons/kimi.jpg'
import neteaseIcon from '@/assets/icons/netease-music.jpg'
import quarkIcon from '@/assets/icons/quark.jpg'
import taobaoIcon from '@/assets/icons/taobao.jpg'
import tencentdocIcon from '@/assets/icons/tencentdoc.jpg'
import wereadIcon from '@/assets/icons/weread.jpg'
import wpsIcon from '@/assets/icons/wps.jpg'
import xiaohongshuIcon from '@/assets/icons/xiaohongshu.jpg'
import zhihuIcon from '@/assets/icons/zhihu.jpg'
import type { HotShortcut, ZenithBookmark, ZenithCategoryTab, ZenithEngine, ZenithWallpaperItem } from '@/types/zenith'

export const DEFAULT_BOOKMARKS: ZenithBookmark[] = [
  // 1. 豆包
  {
    id: 'doubao',
    title: '豆包',
    desc: '字节跳动旗下超能 AI 智能助手',
    url: 'https://www.doubao.com',
    category: 'ai',
    iconKind: 'img',
    iconValue: doubaoIcon,
    isPinned: false,
  },
  // 2. 知乎
  {
    id: 'zhihu',
    title: '知乎',
    desc: '中文互联网高质量深度问答社区',
    url: 'https://www.zhihu.com',
    category: 'social',
    iconKind: 'img',
    iconValue: zhihuIcon,
    isPinned: false,
  },
  // 3. 网易云音乐
  {
    id: 'netease',
    title: '网易云音乐',
    desc: '超全曲库与沉浸式热评音乐社区',
    url: 'https://music.163.com',
    category: 'media',
    iconKind: 'img',
    iconValue: neteaseIcon,
    isPinned: false,
  },
  // 4. 抖音
  {
    id: 'douyin',
    title: '抖音',
    desc: '记录美好生活，潮流短视频社区',
    url: 'https://www.douyin.com',
    category: 'media',
    iconKind: 'img',
    iconValue: douyinIcon,
    isPinned: false,
  },
  // 5. 爱奇艺
  {
    id: 'iqiyi',
    title: '爱奇艺',
    desc: '海量高清电影、热门剧集与综艺',
    url: 'https://www.iqiyi.com',
    category: 'media',
    iconKind: 'img',
    iconValue: iqiyiIcon,
    isPinned: false,
  },
  // 6. 哔哩哔哩
  {
    id: 'bilibili',
    title: '哔哩哔哩',
    desc: '年轻人的综合视频与弹幕潮流社区',
    url: 'https://www.bilibili.com',
    category: 'media',
    iconKind: 'img',
    iconValue: bilibiliIcon,
    isPinned: false,
  },
  // 7. 飞书
  {
    id: 'feishu',
    title: '飞书',
    desc: '先进企业协作与新一代 AI 办公平台',
    url: 'https://www.feishu.cn',
    category: 'work',
    iconKind: 'img',
    iconValue: feishuIcon,
    isPinned: false,
  },
  // 8. Kimi
  {
    id: 'kimi',
    title: 'Kimi',
    desc: '月之暗面超长文本与专业学术 AI 搜索',
    url: 'https://kimi.moonshot.cn',
    category: 'ai',
    iconKind: 'img',
    iconValue: kimiIcon,
    isPinned: false,
  },
  // 9. 小红书
  {
    id: 'xiaohongshu',
    title: '小红书',
    desc: '年轻人的生活方式经验与灵感分享平台',
    url: 'https://www.xiaohongshu.com',
    category: 'social',
    iconKind: 'img',
    iconValue: xiaohongshuIcon,
    isPinned: false,
  },
  // 10. 微信读书
  {
    id: 'weread',
    title: '微信读书',
    desc: '高品质深度阅读与正版数字书籍',
    url: 'https://weread.qq.com',
    category: 'social',
    iconKind: 'img',
    iconValue: wereadIcon,
    isPinned: false,
  },
  // 11. 腾讯文档
  {
    id: 'tencentdoc',
    title: '腾讯文档',
    desc: '支持多人实时高效协同的在线文档平台',
    url: 'https://docs.qq.com',
    category: 'work',
    iconKind: 'img',
    iconValue: tencentdocIcon,
    isPinned: false,
  },
  // 12. WPS Office
  {
    id: 'wps',
    title: 'WPS Office',
    desc: '金山办公多合一专业文字与表格套件',
    url: 'https://www.wps.cn',
    category: 'work',
    iconKind: 'img',
    iconValue: wpsIcon,
    isPinned: false,
  },
  // 13. 夸克
  {
    id: 'quark',
    title: '夸克',
    desc: '极速智能搜索与高效云端网盘办公',
    url: 'https://www.anmafan.com/goUrl/quarkXian/ls/sm3035903',
    category: 'work',
    iconKind: 'img',
    iconValue: quarkIcon,
    isPinned: true,
  },
  // 14. 剪映
  {
    id: 'capcut',
    title: '剪映',
    desc: '剪映视频创作',
    url: 'https://www.anmafan.com/goUrl/dongXianAugTwo',
    category: 'media',
    iconKind: 'img',
    iconValue: capcutIcon,
    isPinned: true,
  },
  // 15. 百度
  {
    id: 'baidu',
    title: '百度',
    desc: '百度一下，你就知道，海量信息云服务',
    url: 'https://www.baidu.com',
    category: 'work',
    iconKind: 'img',
    iconValue: baiduIcon,
    isPinned: false,
  },
  // 16. 淘宝
  {
    id: 'taobao',
    title: '淘宝',
    desc: '太好逛了吧，随时随地网购探索',
    url: 'https://www.taobao.com',
    category: 'social',
    iconKind: 'img',
    iconValue: taobaoIcon,
    isPinned: false,
  },
  // 17. 京东
  {
    id: 'jd',
    title: '京东',
    desc: '多快好省，正品自营极速送达',
    url: 'https://www.jd.com',
    category: 'social',
    iconKind: 'img',
    iconValue: jdIcon,
    isPinned: false,
  },
]

export const CATEGORY_TABS: ZenithCategoryTab[] = [
  { id: 'all', name: '常用推荐' },
  { id: 'work', name: '办公效率' },
  { id: 'ai', name: 'AI 助手' },
  { id: 'media', name: '影音娱乐' },
  { id: 'social', name: '社交资讯' },
]

export const ENGINES: ZenithEngine[] = [
  {
    id: 'baidu',
    name: '百度 Baidu',
    icon: '度',
    iconBg: 'bg-blue-600',
    url: 'https://www.baidu.com/s',
    param: 'wd',
  },
  {
    id: 'google',
    name: '谷歌 Google',
    icon: 'G',
    iconBg: 'bg-blue-500',
    url: 'https://www.google.com/search',
    param: 'q',
  },
  {
    id: 'bing',
    name: '必应 Bing',
    icon: 'B',
    iconBg: 'bg-teal-600',
    url: 'https://www.bing.com/search',
    param: 'q',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'Git',
    iconBg: 'bg-slate-900',
    url: 'https://github.com/search',
    param: 'q',
  },
]

export const HOT_SHORTCUTS: HotShortcut[] = [
  { label: '豆包 AI', url: 'https://www.doubao.com' },
  { label: '知乎', url: 'https://www.zhihu.com' },
  { label: '网易云音乐', url: 'https://music.163.com' },
  { label: '抖音', url: 'https://www.douyin.com' },
  { label: '爱奇艺', url: 'https://www.iqiyi.com' },
]

export const DEFAULT_WALLPAPER_URL =
  'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=2560&q=80'

export const PRESET_WALLPAPERS: ZenithWallpaperItem[] = [
  {
    id: 'twilight',
    name: '暮光自然',
    category: 'nature',
    url: DEFAULT_WALLPAPER_URL,
  },
  {
    id: 'snow_mountain',
    name: '雪山极境',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'forest',
    name: '雾林晨光',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'mountain_lake',
    name: '高山静湖',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'fuji',
    name: '富士落日',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'ocean',
    name: '碧海清波',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'sunlight',
    name: '绿林光影',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'galaxy',
    name: '深邃星河',
    category: 'universe',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'aurora',
    name: '梦幻极光',
    category: 'universe',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'desert',
    name: '荒漠红日',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'cyber_city',
    name: '赛博都市',
    category: 'urban',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2560&q=80',
  },
  {
    id: 'dark_abstract',
    name: '极简暗纹',
    category: 'abstract',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=80',
  },
]
