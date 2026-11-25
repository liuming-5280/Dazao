import * as api from '@/api'
import IconDelete from '@/assets/repository/action/delete.svg'
import IconSearch from '@/assets/repository/search.svg'
import { brandByLang, useI18n } from '@/configs'
import { PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Input, Modal, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'
import { FileIcon } from './components/file-icon'
import { Status } from './components/status'
import RepositoryUpload, { RepositoryUploadRef } from './components/upload'
import styles from './index.module.scss'

type IRepository = API.Repository & {
  id: number
  $suffix: FileIcon
  number: number
  method: string
  enable: boolean
  status: string
}

export default function Index() {
  const { lang, t } = useI18n()
  const brand = brandByLang(lang)

  const { data, refresh } = useRequest(async () => {
    const { data } = await api.repository.list()
    return data?.map(
      (item, index) =>
        ({
          ...item,
          $suffix: item.file_name.split('.').pop() as FileIcon,
          id: index + 1,
          number: 0,
          method: 'General',
          enable: true,
          status: 'success',
        }) satisfies IRepository,
    )
  })

  const columns = useMemo<ColumnsType<IRepository>>(
    () => [
      {
        title: t('repository.columnFileName'),
        dataIndex: 'file_name',
        width: 200,
        render(value, row) {
          return (
            <div className={styles['repository-page__file-name']} title={value}>
              <FileIcon className={styles['icon']} suffix={row.$suffix} />
              {value}
            </div>
          )
        },
      },
      {
        title: t('repository.columnChunks'),
        dataIndex: 'number',
        width: 100,
      },
      {
        title: t('repository.columnUpdatedAt'),
        dataIndex: 'updated_at',
        width: 200,
        render(value) {
          return dayjs(value).format('MM/DD/YYYY HH:mm:ss')
        },
      },
      {
        title: t('repository.columnMethod'),
        dataIndex: 'method',
        width: 100,
        render() {
          return t('repository.methodGeneral')
        },
      },
      {
        title: t('repository.columnStatus'),
        dataIndex: 'status',
        width: 100,
        render(value) {
          return <Status status={value} />
        },
      },
      {
        title: t('repository.columnActions'),
        dataIndex: 'action',
        width: 100,
        render(_, row) {
          return (
            <Space>
              <Popconfirm
                title={t('repository.deleteConfirm')}
                onConfirm={async () => {
                  await api.repository.remove({ file_name: row.file_name })
                  refresh()
                }}
              >
                <Button
                  color="default"
                  variant="text"
                  shape="circle"
                  size="small"
                >
                  <img src={IconDelete} />
                </Button>
              </Popconfirm>
            </Space>
          )
        },
      },
    ],
    [t, refresh],
  )
  const scroll = useMemo(() => {
    return {
      x: columns?.reduce((prev, current) => {
        return prev + parseInt(String(current.width ?? 0))
      }, 0),
    }
  }, [columns])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection: TableRowSelection<IRepository> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  /* 上传 */
  const [openUpload, setOpenUpload] = useState(false)
  const uploadRef = useRef<RepositoryUploadRef>(null)
  const [uploading, setUploading] = useState(false)

  return (
    <div className={styles['repository-page']}>
      <div className={styles['repository-page__header']}>
        <div className={styles['title']}>{brand.repoName}</div>
        <div className={styles['desc']}>{t('repository.description')}</div>
      </div>

      <div className={styles['repository-page__body']}>
        <div className={styles['header']}>
          <Input
            placeholder={t('repository.searchPlaceholder')}
            prefix={<img src={IconSearch} alt="" />}
            style={{ width: 210 }}
          />

          <Button type="primary" onClick={() => setOpenUpload(true)}>
            <PlusOutlined />
            {t('repository.addDocument')}
          </Button>
        </div>

        <Table<IRepository>
          rowKey="id"
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          scroll={scroll}
          pagination={false}
        />
      </div>

      <Modal
        title={t('repository.uploadTitle')}
        open={openUpload}
        width={400}
        destroyOnClose
        onCancel={() => {
          if (uploading) return
          setOpenUpload(false)
        }}
        onOk={async () => {
          setUploading(true)
          try {
            await uploadRef.current?.submit()
            setOpenUpload(false)
            refresh()
          } finally {
            setUploading(false)
          }
        }}
      >
        <RepositoryUpload beforeUpload={() => false} ref={uploadRef} />
      </Modal>
    </div>
  )
}
