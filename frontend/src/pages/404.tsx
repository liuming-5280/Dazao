import { useI18n } from '@/configs'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './404.module.scss'

export default function NotFound() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__code']}>404</div>
      <div className={styles['not-found__title']}>{t('notFound.title')}</div>
      <div className={styles['not-found__desc']}>{t('notFound.desc')}</div>
      <Button type="primary" onClick={() => navigate('/')}>
        {t('notFound.back')}
      </Button>
    </div>
  )
}
