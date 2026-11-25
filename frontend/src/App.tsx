import { Router } from '@/router'
import { langState } from '@/store/lang'
import { App as AntdApp, ConfigProvider, Spin } from 'antd'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { useCallback, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'

function App() {
  const { lang } = useSnapshot(langState)

  return (
    <ConfigProvider
      locale={lang === 'en' ? enUS : zhCN}
      theme={{
        cssVar: true,
        token: {
          colorPrimary: '#C8161D',
          colorInfo: '#C8161D',
          colorLink: '#C8161D',
          colorTextBase: '#2b2521',
          colorBgBase: '#fffdfa',
          borderRadius: 10,
        },
      }}
    >
      <AntdApp>
        <Router />
        <MountApi />
      </AntdApp>
    </ConfigProvider>
  )
}

function MountApi() {
  window.$app = AntdApp.useApp()

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const loadingCount = useRef(0)
  window.$showLoading = useCallback(({ title }: { title?: string } = {}) => {
    loadingCount.current++
    setLoading(true)
    setLoadingText(title ?? '')
  }, [])
  window.$hideLoading = useCallback(() => {
    loadingCount.current--
    setTimeout(() => {
      if (loadingCount.current <= 0) {
        setLoading(false)
        setLoadingText('')
      }
    }, 100)
  }, [])

  return (
    <>
      <Spin
        spinning={loading}
        tip={loadingText}
        fullscreen
        style={{
          zIndex: 9999999,
        }}
      ></Spin>
    </>
  )
}

export default App
