import { proxy } from 'valtio'

export type Lang = 'zh' | 'en'

const STORAGE_KEY = 'yasy.lang'

function detectLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    // localStorage 不可用时按浏览器语言兜底
  }

  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'zh'
}

function applyLang(lang: Lang) {
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en')
}

const initialLang = detectLang()
applyLang(initialLang)

const state = proxy({
  lang: initialLang as Lang,
})

const actions = {
  setLang(lang: Lang) {
    state.lang = lang
    applyLang(lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // 忽略存储失败，语言切换在当前会话内仍然生效
    }
  },
  toggle() {
    actions.setLang(state.lang === 'zh' ? 'en' : 'zh')
  },
}

export const langState = state
export const langActions = actions
