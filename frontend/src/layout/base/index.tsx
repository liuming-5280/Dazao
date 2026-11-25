import iconNewchat from '@/assets/layout/newchat.svg'
import iconRepository from '@/assets/layout/repository.svg'
import logo from '@/assets/logo.svg'
import LanguageSwitch from '@/components/language-switch'
import { brandByLang, useI18n } from '@/configs'
import { deviceState } from '@/store/device'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { Background } from './background'
import { Footer } from './footer'
import './index.scss'
import { Nav } from './nav'

export function BaseLayout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate()
  const device = useSnapshot(deviceState)
  const { lang, t } = useI18n()
  const brand = brandByLang(lang)

  return (
    <div className="base-layout">
      <div className="base-layout__sidebar">
        <div className="base-layout__logo">
          <img
            className="logo"
            src={logo}
            alt={brand.name}
            onClick={() => (device.chatting ? null : navigate('/'))}
          />
          <div className="base-layout__brand">
            <span className="title">{brand.name}</span>
            <span className="subtitle">{t('nav.bilingual')}</span>
          </div>
        </div>

        <div className="base-layout__sidebar-main scrollbar-style">
          <div className="base-layout__sidebar-main-content">
            <div
              className="base-layout__nav-header"
              onClick={() => (device.chatting ? null : navigate('/'))}
            >
              <img
                className="base-layout__nav-header-icon"
                src={iconNewchat}
                alt=""
              />
              <span className="base-layout__nav-header-title">
                {t('nav.newChat')}
              </span>
            </div>

            <Nav />

            <div
              className="base-layout__nav-header"
              onClick={() => (device.chatting ? null : navigate('/repository'))}
            >
              <img
                className="base-layout__nav-header-icon"
                src={iconRepository}
                alt=""
              />
              <span className="base-layout__nav-header-title">
                {t('nav.knowledgeBase')}
              </span>
            </div>
          </div>

          <div className="base-layout__language">
            <span className="base-layout__language-label">
              {t('common.language')}
            </span>
            <LanguageSwitch block />
          </div>

          <Footer />
        </div>
      </div>

      <div className="base-layout__content">{children}</div>

      <Background />
    </div>
  )
}
