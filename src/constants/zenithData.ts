import baiduIcon from '@/assets/icons/baidu.jpg'
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
import type { HotShortcut, ZenithBookmark, ZenithCategoryTab, ZenithEngine } from '@/types/zenith'

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
    isPinned: true,
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
    isPinned: true,
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
    isPinned: true,
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
    isPinned: true,
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
    url: 'https://www.quark.cn',
    category: 'work',
    iconKind: 'img',
    iconValue: quarkIcon,
    isPinned: false,
  },
  // 14. 百度
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
  // 15. 淘宝
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
  // 16. 京东
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
  { id: 'all', name: '常用推荐', count: 16 },
  { id: 'work', name: '办公效率' },
  { id: 'ai', name: 'AI 助手' },
  { id: 'media', name: '影音娱乐' },
  { id: 'social', name: '社交资讯' },
]

export const ENGINES: ZenithEngine[] = [
  {
    id: 'google',
    name: '谷歌 Google',
    icon: 'G',
    iconBg: 'bg-blue-500',
    url: 'https://www.google.com/search',
    param: 'q',
    shortcutKey: '1',
  },
  {
    id: 'baidu',
    name: '百度 Baidu',
    icon: '度',
    iconBg: 'bg-blue-600',
    url: 'https://www.baidu.com/s',
    param: 'wd',
    shortcutKey: '2',
  },
  {
    id: 'bing',
    name: '必应 Bing',
    icon: 'B',
    iconBg: 'bg-teal-600',
    url: 'https://www.bing.com/search',
    param: 'q',
    shortcutKey: '3',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'Git',
    iconBg: 'bg-slate-900',
    url: 'https://github.com/search',
    param: 'q',
    shortcutKey: '4',
  },
]

export const HOT_SHORTCUTS: HotShortcut[] = [
  { label: '豆包 AI', url: 'https://www.doubao.com' },
  { label: '知乎', url: 'https://www.zhihu.com' },
  { label: '网易云音乐', url: 'https://music.163.com' },
  { label: '抖音', url: 'https://www.douyin.com' },
  { label: '爱奇艺', url: 'https://www.iqiyi.com' },
]

export const WALLPAPERS = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=80',
  'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2560&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2560&q=80',
]
