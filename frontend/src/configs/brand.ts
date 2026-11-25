const env = import.meta.env

/**
 * 品牌配置集中在这里，改名换皮只需要改 frontend/.env，无需全局搜索替换。
 */
export const BRAND = {
  /** 产品中文名 */
  name: env.VITE_TITLE || '红枣-延安精神学习助手',
  /** 产品英文名 */
  nameEn: env.VITE_TITLE_EN || "Yan'an Spirit Learning Assistant",
  /** 一句话定位 */
  slogan: env.VITE_SLOGAN || '传承延安精神 · 双语智能问答',
  /** 一句话定位（英文） */
  sloganEn:
    env.VITE_SLOGAN_EN ||
    "Learn and explore the Yan'an Spirit in Chinese and English",
  /** AI 助手展示名 */
  assistantName: env.VITE_ASSISTANT_NAME || '红枣-延安精神学习助手',
  /** AI 助手展示名（英文） */
  assistantNameEn: env.VITE_ASSISTANT_NAME_EN || "Yan'an Spirit Assistant",
  /** 知识库页面标题 */
  repoName: env.VITE_REPO_NAME || '红枣-延安精神知识库',
  /** 知识库页面标题（英文） */
  repoNameEn: env.VITE_REPO_NAME_EN || "Yan'an Spirit Knowledge Base",
} as const

export function brandByLang(lang: 'zh' | 'en') {
  return lang === 'zh'
    ? {
        name: BRAND.name,
        slogan: BRAND.slogan,
        assistantName: BRAND.assistantName,
        repoName: BRAND.repoName,
      }
    : {
        name: BRAND.nameEn,
        slogan: BRAND.sloganEn,
        assistantName: BRAND.assistantNameEn,
        repoName: BRAND.repoNameEn,
      }
}
