import { useI18n } from '@/configs'
import { Segmented } from 'antd'
import classNames from 'classnames'
import './index.scss'

export default function LanguageSwitch(props: {
  className?: string
  block?: boolean
}) {
  const { lang, setLang } = useI18n()

  return (
    <Segmented
      className={classNames(
        'language-switch',
        props.block && 'language-switch--block',
        props.className,
      )}
      size="small"
      value={lang}
      options={[
        { label: '中文', value: 'zh' },
        { label: 'EN', value: 'en' },
      ]}
      onChange={(value) => setLang(value as 'zh' | 'en')}
    />
  )
}
