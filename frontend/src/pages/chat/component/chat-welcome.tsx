import IconNewchat from '@/assets/layout/newchat.svg'
import { brandByLang, useI18n, type MessageKey } from '@/configs'
import { ArrowRightOutlined } from '@ant-design/icons'
import styles from './chat-welcome.module.scss'

const CORE_INPUTS: { title: MessageKey; desc: MessageKey }[] = [
  { title: 'welcome.core1Title', desc: 'welcome.core1Desc' },
  { title: 'welcome.core2Title', desc: 'welcome.core2Desc' },
  { title: 'welcome.core3Title', desc: 'welcome.core3Desc' },
  { title: 'welcome.core4Title', desc: 'welcome.core4Desc' },
]

const SAMPLE_KEYS: MessageKey[] = [
  'welcome.sample1',
  'welcome.sample2',
  'welcome.sample3',
  'welcome.sample4',
]

export default function ChatWelcome(props: {
  onSelect: (question: string) => void
}) {
  const { onSelect } = props
  const { lang, t } = useI18n()
  const brand = brandByLang(lang)

  return (
    <div className={styles['chat-welcome']}>
      <div className={styles['chat-welcome__hero']}>
        <div className={styles['chat-welcome__eyebrow']}>
          {t('welcome.eyebrow')}
        </div>
        <h1 className={styles['chat-welcome__title']}>{brand.name}</h1>
        <p className={styles['chat-welcome__subtitle']}>
          {t('welcome.subtitle')}
        </p>
      </div>

      <div className={styles['chat-welcome__section-title']}>
        {t('welcome.coreTitle')}
      </div>
      <div className={styles['chat-welcome__cores']}>
        {CORE_INPUTS.map((item, index) => (
          <div className={styles['core-card']} key={item.title}>
            <div className={styles['core-card__index']}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className={styles['core-card__title']}>{t(item.title)}</div>
            <div className={styles['core-card__desc']}>{t(item.desc)}</div>
          </div>
        ))}
      </div>

      <div className={styles['chat-welcome__section-title']}>
        {t('welcome.samplesTitle')}
      </div>
      <div className={styles['chat-welcome__samples']}>
        {SAMPLE_KEYS.map((key) => {
          const question = t(key)
          return (
            <button
              type="button"
              className={styles['sample-card']}
              key={key}
              onClick={() => onSelect(question)}
            >
              <img src={IconNewchat} alt="" />
              <span>{question}</span>
              <ArrowRightOutlined className={styles['sample-card__arrow']} />
            </button>
          )
        })}
      </div>

      <div className={styles['chat-welcome__note']}>{t('welcome.note')}</div>
    </div>
  )
}
