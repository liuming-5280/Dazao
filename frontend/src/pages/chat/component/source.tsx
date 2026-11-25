import IconFile from '@/assets/chat/file.svg'
import { useI18n } from '@/configs'
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styles from './source.module.scss'

export default function Source(props: { list: API.Document[] }) {
  const { list } = props
  const { t } = useI18n()

  return (
    <div className={styles['source']}>
      <div className={styles['source__title']}>{t('chat.sources')}</div>

      <div className={styles['source__list']}>
        {list.map((source) => (
          <div className={styles['source__item']} key={source.document_id}>
            <img className={styles['icon']} src={IconFile} />
            <span className={styles['name']} title={source.document_name}>
              {source.document_name}
            </span>

            <Button
              className={styles['source__close']}
              shape="circle"
              size="small"
              variant="text"
              color="default"
            >
              <CloseOutlined />
            </Button>
          </div>
        ))}

        <Button
          className={styles['source__add']}
          variant="filled"
          color="primary"
          shape="circle"
          size="small"
        >
          <PlusCircleOutlined />
        </Button>
      </div>
    </div>
  )
}
