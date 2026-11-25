import IconFilter from '@/assets/chat/filter.svg'
import IconObject from '@/assets/chat/object.svg'
import IconSearch from '@/assets/chat/search.svg'
import Markdown from '@/components/markdown'
import '@/components/markdown/index.scss'
import { useI18n } from '@/configs'
import { Button, Drawer, Input, Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import styles from './citations.module.scss'

function CitationsItem(props: {
  item: API.Reference
  index: number
  onRead: () => void
}) {
  const { item, index, onRead } = props
  const { t } = useI18n()

  const content = useMemo(() => {
    const dom = document.createElement('div')
    dom.innerHTML = item.content_with_weight
    return dom.innerText
  }, [item.content_with_weight])

  return (
    <div className={styles['citations__item']}>
      <div className={styles['actions']}>
        <Tooltip
          classNames={{
            root: styles['citations-tooltip'],
          }}
          title={t('chat.explore')}
        >
          <Button color="primary" variant="text" shape="circle" size="small">
            <img src={IconObject} />
          </Button>
        </Tooltip>
      </div>

      <div className={styles['header']}>
        <div className={styles['name']} title={item.document_name}>
          {item.document_name}
        </div>
        <div className={styles['score']}>{index + 1}</div>
      </div>

      <div className={styles['desc']}>{content}</div>

      <div className={styles['footer']}>
        <div className={styles['footer-desc']}>
          {t('chat.page', { page: item.positions?.[0]?.[0] ?? '-' })}
        </div>
        <Button
          className={styles['footer-button']}
          color="primary"
          variant="solid"
          onClick={onRead}
        >
          {t('chat.read')}
        </Button>
      </div>
    </div>
  )
}

export default function Citations(props: { list?: API.Reference[] }) {
  const { list } = props
  const { t } = useI18n()

  const [read, setRead] = useState<API.Reference | null>(null)

  return (
    <div className={styles['citations']}>
      <div className={styles['citations__search']}>
        <Input
          placeholder={t('chat.searchCitations')}
          suffix={<img src={IconSearch} alt="search" />}
        />

        <Button color="default" variant="outlined">
          <img src={IconFilter} alt="" />
          {t('chat.filter')}
        </Button>
      </div>

      <div className={styles['citations__title']}>
        {t('chat.selectedCitations')}
      </div>

      <div className={styles['citations__list']}>
        {list?.map((item, index) => (
          <CitationsItem
            key={item.id}
            item={item}
            index={index}
            onRead={() => setRead(item)}
          />
        ))}
      </div>

      <Drawer
        title={read?.document_name ?? ''}
        width={800}
        onClose={() => setRead(null)}
        open={!!read}
        destroyOnClose
      >
        <Markdown value={read?.content_with_weight ?? ''} />
      </Drawer>
    </div>
  )
}
