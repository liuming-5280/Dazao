import IconCompleted from '@/assets/chat/completed.svg'
import IconFile from '@/assets/chat/file.svg'
import IconSelectFile from '@/assets/chat/select-file.svg'
import { useI18n } from '@/configs'
import { RightOutlined } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import { useState } from 'react'
import styles from './select-file.module.scss'

export default function ChooseFile(props: {
  list?: API.Document[]
  onSubmit?: (list: API.Document[]) => void
}) {
  const { list, onSubmit } = props
  const { t } = useI18n()

  const [selectedFileList, setSelectedFileList] = useState<string[]>([])

  return (
    <div className={styles['select-file']}>
      <div className={styles['select-file__header']}>
        <img className={styles['icon']} src={IconSelectFile} />
        {t('chat.sources')}: {list?.length ?? 0}
      </div>

      <Checkbox.Group
        className={styles['select-file__content']}
        value={selectedFileList}
        onChange={(value) => setSelectedFileList(value)}
      >
        {list?.map((file) => (
          <Checkbox key={file.document_id} value={file.document_id}>
            <img className={styles['icon']} src={IconFile} />
            <div className={styles['name']} title={file.document_name}>
              {file.document_name}
            </div>
            {/* <div className={styles['date']}>{file.date}</div> */}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <div className={styles['select-file__footer']}>
        <div>
          {t('chat.selectedCitations')} <b>{selectedFileList.length}</b>
        </div>

        <Button
          type="primary"
          size="small"
          disabled={selectedFileList.length === 0}
          onClick={() => {
            onSubmit?.(
              list?.filter((file) =>
                selectedFileList.includes(file.document_id),
              ) ?? [],
            )
          }}
        >
          {t('chat.add')}
        </Button>
      </div>
    </div>
  )
}

function SelectFileSearching() {
  const { t } = useI18n()

  return (
    <div className={styles['select-file-searching']}>
      <div className={styles['icon']}></div>
      <div className={styles['title']}>{t('chat.searching')}</div>
    </div>
  )
}
ChooseFile.Searching = SelectFileSearching

function SelectFileComplete(props: {
  contractsLength: number
  citationsLength: number
  onClick?: () => void
}) {
  const { contractsLength, citationsLength, onClick } = props
  const { t } = useI18n()

  return (
    <div className={styles['select-file-complete']} onClick={onClick}>
      <img className={styles['icon']} src={IconCompleted} />
      <div className={styles['title']}>{t('chat.reference')}</div>
      <div className={styles['desc']}>
        {t('chat.referenceSummary', {
          citations: citationsLength ?? 0,
          documents: contractsLength ?? 0,
        })}
      </div>
      <RightOutlined className={styles['arrow']} />
    </div>
  )
}

ChooseFile.Complete = SelectFileComplete
