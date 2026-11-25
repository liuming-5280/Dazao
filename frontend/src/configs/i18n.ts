import { langActions, langState, type Lang } from '@/store/lang'
import { useCallback } from 'react'
import { useSnapshot } from 'valtio'

const zh = {
  'common.language': '语言',
  'common.chinese': '中文',
  'common.english': 'EN',
  'common.loading': '加载中...',
  'error.tooManyRequests': '请求过于频繁，请稍后再试',
  'error.requestFailed': '请求错误',
  'recorder.connectionError': '语音服务连接异常',
  'recorder.permission': '请开启麦克风权限',

  'nav.newChat': '新对话',
  'nav.history': '对话历史',
  'nav.knowledgeBase': '知识库',
  'nav.empty': '暂无对话记录',
  'nav.bilingual': '延安精神 · 双语学习',
  'nav.userFallback': '学习者',

  'chat.untitled': '新对话',
  'chat.citations': '引文',
  'chat.documents': '文档',
  'chat.reference': '参考',
  'chat.searching': '正在检索延安精神知识库',
  'chat.referenceSummary': '{citations} 条引文 · 来自 {documents} 份资料',
  'chat.sources': '来源',
  'chat.exportTxt': '导出为 TXT',
  'chat.sendEmail': '发送到 Email',
  'chat.send': '发送',
  'chat.placeholder': '请输入关于延安精神的问题，可用中文或英文提问…',
  'chat.searchDocuments': '搜索文档',
  'chat.add': '添加',
  'chat.selectedDocuments': '已选择的文档',
  'chat.explore': '挖掘',
  'chat.read': '阅读',
  'chat.suspend': '暂停',
  'chat.remove': '移除',
  'chat.page': '第 {page} 页',
  'chat.searchCitations': '搜索引文',
  'chat.filter': '筛选',
  'chat.selectedCitations': '已选择的引文',
  'chat.copy': '复制',
  'chat.regenerate': '重新生成',
  'chat.feedback': '反馈',
  'chat.share': '分享',
  'uploader.document': '文档',
  'uploader.unsupported': '只支持 {types}',
  'uploader.fileTooLarge': '文件大小不能超过 {limit}M',
  'uploader.success': '上传成功',

  'welcome.eyebrow': '红枣-延安精神 · 双语学习',
  'welcome.title': '红枣-延安精神学习助手',
  'welcome.subtitle':
    '基于文献资料的双语问答，帮助你理解延安精神的历史脉络、核心内涵与当代价值。',
  'welcome.coreTitle': '红枣-延安精神的核心内涵',
  'welcome.core1Title': '坚定正确的政治方向',
  'welcome.core1Desc': '把民族独立和人民解放的伟大事业作为始终不渝的追求。',
  'welcome.core2Title': '解放思想、实事求是',
  'welcome.core2Desc': '一切从实际出发，在实践中检验真理、发展真理。',
  'welcome.core3Title': '全心全意为人民服务',
  'welcome.core3Desc': '把人民放在心中最高位置，与人民群众同呼吸共命运。',
  'welcome.core4Title': '自力更生、艰苦奋斗',
  'welcome.core4Desc': '靠自己的双手克服困难，在奋斗中开创事业新局面。',
  'welcome.samplesTitle': '试试这样问',
  'welcome.sample1': '延安精神是怎样形成的？',
  'welcome.sample2': '延安精神的核心内涵是什么？',
  'welcome.sample3': '南泥湾精神与延安精神有什么关系？',
  'welcome.sample4': '延安整风运动的历史意义是什么？',
  'welcome.note': '回答会标注资料来源；中文与英文提问均可。',

  'repository.description':
    '上传延安精神相关的文献、讲话与学习资料，系统会自动解析、切片并向量化，供问答引用。',
  'repository.searchPlaceholder': '搜索文件',
  'repository.addDocument': '添加文档',
  'repository.uploadTitle': '上传文档',
  'repository.drag': '拖拽文件到此 或',
  'repository.clickUpload': '点击上传',
  'repository.support':
    '支持单个或批量文件上传。单个文件大小不能超过 100M，最多支持 10 个文件。',
  'repository.fileTooLarge': '文件大小不能超过{limit}M',
  'repository.uploadDone': '上传已完成',
  'repository.deleteConfirm': '确定要删除该文件吗？',
  'repository.columnFileName': '文件名',
  'repository.columnChunks': '切片数量',
  'repository.columnUpdatedAt': '更新时间',
  'repository.columnMethod': '切片方式',
  'repository.columnStatus': '状态',
  'repository.columnActions': '操作',
  'repository.methodGeneral': '通用',
  'repository.statusUnparsed': '未解析',
  'repository.statusCancel': '已取消',
  'repository.statusSuccess': '已完成',
  'repository.statusFailed': '异常',

  'login.login': '登录',
  'login.register': '注册',
  'login.welcomeBack': '欢迎回来',
  'login.createAccount': '创建账户',
  'login.username': '邮箱或用户名',
  'login.usernamePlaceholder': '请输入邮箱或用户名',
  'login.password': '密码',
  'login.passwordPlaceholder': '请输入密码',
  'login.repeatPassword': '重复密码',
  'login.repeatPlaceholder': '请重复输入密码',
  'login.usernameRequired': '请输入邮箱或用户名',
  'login.passwordRequired': '请输入密码',
  'login.repeatRequired': '请重复输入密码',
  'login.passwordMismatch': '两次密码不一致',
  'login.loginSuccess': '登录成功',
  'login.registerSuccess': '注册成功，请登录',

  'notFound.title': '页面不存在',
  'notFound.desc': '你访问的页面可能已被移动或删除。',
  'notFound.back': '返回首页',
} as const

type MessageKey = keyof typeof zh

const en: Record<MessageKey, string> = {
  'common.language': 'Language',
  'common.chinese': '中文',
  'common.english': 'EN',
  'common.loading': 'Loading...',
  'error.tooManyRequests': 'Too many requests, please try again later',
  'error.requestFailed': 'Request failed',
  'recorder.connectionError': 'Speech service connection error',
  'recorder.permission': 'Please allow microphone access',

  'nav.newChat': 'New conversation',
  'nav.history': 'History',
  'nav.knowledgeBase': 'Knowledge base',
  'nav.empty': 'No conversations yet',
  'nav.bilingual': "Yan'an Spirit · Bilingual learning",
  'nav.userFallback': 'Learner',

  'chat.untitled': 'New conversation',
  'chat.citations': 'Citations',
  'chat.documents': 'Documents',
  'chat.reference': 'References',
  'chat.searching': "Searching the Yan'an Spirit knowledge base",
  'chat.referenceSummary': '{citations} citations · {documents} sources',
  'chat.sources': 'Sources',
  'chat.exportTxt': 'Export as TXT',
  'chat.sendEmail': 'Send to email',
  'chat.send': 'Send',
  'chat.placeholder':
    "Ask a question about the Yan'an Spirit in Chinese or English…",
  'chat.searchDocuments': 'Search documents',
  'chat.add': 'Add',
  'chat.selectedDocuments': 'Selected documents',
  'chat.explore': 'Explore',
  'chat.read': 'Read',
  'chat.suspend': 'Suspend',
  'chat.remove': 'Remove',
  'chat.page': 'Page {page}',
  'chat.searchCitations': 'Search citations',
  'chat.filter': 'Filter',
  'chat.selectedCitations': 'Selected citations',
  'chat.copy': 'Copy',
  'chat.regenerate': 'Regenerate',
  'chat.feedback': 'Feedback',
  'chat.share': 'Share',
  'uploader.document': 'Document',
  'uploader.unsupported': 'Only {types} files are supported',
  'uploader.fileTooLarge': 'File size cannot exceed {limit} MB',
  'uploader.success': 'Uploaded successfully',

  'welcome.eyebrow': "YAN'AN SPIRIT · BILINGUAL LEARNING",
  'welcome.title': "Yan'an Spirit Learning Assistant",
  'welcome.subtitle':
    "A bilingual Q&A companion grounded in documents, helping you explore the history, core connotations and contemporary value of the Yan'an Spirit.",
  'welcome.coreTitle': 'Core connotations',
  'welcome.core1Title': 'Firm and correct political orientation',
  'welcome.core1Desc':
    'Pursue national independence and the liberation of the people without wavering.',
  'welcome.core2Title': 'Emancipate the mind, seek truth from facts',
  'welcome.core2Desc':
    'Proceed from reality and test and develop truth in practice.',
  'welcome.core3Title': 'Serve the people wholeheartedly',
  'welcome.core3Desc':
    'Put the people first and share a common fate with them.',
  'welcome.core4Title': 'Self-reliance and hard struggle',
  'welcome.core4Desc':
    'Overcome difficulties with our own hands and open up new prospects through struggle.',
  'welcome.samplesTitle': 'Try asking',
  'welcome.sample1': 'How did the Yan’an Spirit take shape?',
  'welcome.sample2': "What are the core connotations of the Yan'an Spirit?",
  'welcome.sample3': 'How is the Nanniwan spirit related to the Yan’an Spirit?',
  'welcome.sample4':
    'What was the historical significance of the Yan’an Rectification Movement?',
  'welcome.note':
    'Answers cite their sources and can be asked in Chinese or English.',

  'repository.description':
    "Upload documents on the Yan'an Spirit and the system will parse, chunk and index them for citation-backed answers.",
  'repository.searchPlaceholder': 'Search files',
  'repository.addDocument': 'Add document',
  'repository.uploadTitle': 'Upload documents',
  'repository.drag': 'Drag files here or',
  'repository.clickUpload': 'click to upload',
  'repository.support':
    'Single or batch upload is supported. Each file must be under 100 MB, up to 10 files.',
  'repository.fileTooLarge': 'File size cannot exceed {limit} MB',
  'repository.uploadDone': 'Upload completed',
  'repository.deleteConfirm': 'Delete this file?',
  'repository.columnFileName': 'File',
  'repository.columnChunks': 'Chunks',
  'repository.columnUpdatedAt': 'Updated at',
  'repository.columnMethod': 'Chunking',
  'repository.columnStatus': 'Status',
  'repository.columnActions': 'Actions',
  'repository.methodGeneral': 'General',
  'repository.statusUnparsed': 'Not parsed',
  'repository.statusCancel': 'Cancelled',
  'repository.statusSuccess': 'Completed',
  'repository.statusFailed': 'Failed',

  'login.login': 'Sign in',
  'login.register': 'Sign up',
  'login.welcomeBack': 'Welcome back',
  'login.createAccount': 'Create account',
  'login.username': 'Email or username',
  'login.usernamePlaceholder': 'Enter your email or username',
  'login.password': 'Password',
  'login.passwordPlaceholder': 'Enter your password',
  'login.repeatPassword': 'Confirm password',
  'login.repeatPlaceholder': 'Re-enter your password',
  'login.usernameRequired': 'Please enter your email or username',
  'login.passwordRequired': 'Please enter your password',
  'login.repeatRequired': 'Please re-enter your password',
  'login.passwordMismatch': 'Passwords do not match',
  'login.loginSuccess': 'Signed in successfully',
  'login.registerSuccess': 'Account created, please sign in',

  'notFound.title': 'Page not found',
  'notFound.desc':
    'The page you are looking for may have been moved or deleted.',
  'notFound.back': 'Back to home',
}

const messages: Record<Lang, Record<MessageKey, string>> = { zh, en }

export type { MessageKey }

type Vars = Record<string, string | number>

export function translate(lang: Lang, key: MessageKey, vars?: Vars) {
  let text = messages[lang][key] ?? messages.zh[key] ?? key
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.split(`{${name}}`).join(String(value))
    })
  }
  return text
}

export function useI18n() {
  const { lang } = useSnapshot(langState)

  const t = useCallback(
    (key: MessageKey, vars?: Vars) => translate(lang, key, vars),
    [lang],
  )

  return {
    lang,
    t,
    setLang: langActions.setLang,
    toggleLang: langActions.toggle,
  }
}
