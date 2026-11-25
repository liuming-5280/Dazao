import * as api from '@/api'
import IconUpload from '@/assets/repository/upload.svg'
import { useI18n } from '@/configs'
import { Upload, UploadFile, UploadProps } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './upload.module.scss'

const MAX_FILE_SIZE_MB = 100

export type RepositoryUploadRef = {
  submit: () => Promise<void>
}

export default forwardRef<RepositoryUploadRef, UploadProps>(
  function RepositoryUpload(props: UploadProps, ref) {
    const { ...otherProps } = props
    const { t } = useI18n()

    const [fileList, setFileList] = useState<UploadFile[]>([])

    useImperativeHandle(ref, () => {
      return {
        submit: async () => {
          let hasError = false
          const errors: Error[] = []

          for (const file of fileList) {
            if (file.status === 'done') continue

            setFileList((prev) =>
              prev.map((item) => {
                if (item.uid === file.uid) {
                  return {
                    ...item,
                    status: 'uploading',
                  }
                }
                return item
              }),
            )
            try {
              // 检查文件大小
              if ((file.size ?? 0) > MAX_FILE_SIZE_MB * 1024 * 1024) {
                throw new Error(
                  t('repository.fileTooLarge', { limit: MAX_FILE_SIZE_MB }),
                )
              }
              //上传接口
              await api.repository.upload({ files: file.originFileObj as File })

              setFileList((prev) =>
                prev.map((item) => {
                  if (item.uid === file.uid) {
                    return {
                      ...item,
                      status: 'done',
                      url: '#',
                    }
                  }
                  return item
                }),
              )
            } catch (error: any) {
              hasError = true
              errors.push(error)
              setFileList((prev) =>
                prev.map((item) => {
                  if (item.uid === file.uid) {
                    return {
                      ...item,
                      status: 'error',
                      response: error?.message,
                    }
                  }
                  return item
                }),
              )
            }
          }

          if (hasError) {
            window.$app.message.error(errors?.[0]?.message)
            throw new Error(errors?.[0]?.message)
          } else {
            window.$app.message.success(t('repository.uploadDone'))
          }
        },
      }
    })

    return (
      <div className={styles['repository-upload']}>
        <Upload.Dragger
          {...otherProps}
          showUploadList={false}
          maxCount={10}
          fileList={fileList}
          onChange={(info) => setFileList(info.fileList)}
        >
          <img src={IconUpload} alt="" />
          <p
            className="ant-upload-text"
            style={{
              color: '#666',
            }}
          >
            {t('repository.drag')}{' '}
            <span style={{ color: '#C8161D' }}>
              {t('repository.clickUpload')}
            </span>
          </p>
        </Upload.Dragger>

        <p className={styles['repository-upload__desc']}>
          {t('repository.support')}
        </p>

        <Upload
          fileList={fileList}
          onChange={(info) => setFileList(info.fileList)}
        />
      </div>
    )
  },
)
