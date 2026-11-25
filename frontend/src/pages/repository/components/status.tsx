import { useI18n, type MessageKey } from '@/configs'
import { Tag } from 'antd'
import Color from 'color'
import { useMemo } from 'react'

const map: Record<string, { text: MessageKey; color: string }> = {
  unparsed: {
    text: 'repository.statusUnparsed',
    color: '#67C23A',
  },
  cancel: {
    text: 'repository.statusCancel',
    color: '#E6A23C',
  },
  success: {
    text: 'repository.statusSuccess',
    color: '#C8161D',
  },
  failed: {
    text: 'repository.statusFailed',
    color: '#F56C6C',
  },
}

export function Status(props: { status: string }) {
  const { status } = props
  const { t } = useI18n()

  const { text, color } = useMemo(() => {
    const meta = map[status]
    return {
      text: meta ? t(meta.text) : status,
      color: meta?.color ?? '#999',
    }
  }, [status, t])

  const backgroundColor = useMemo(() => {
    return new Color(color).alpha(0.1).toString()
  }, [color])

  const borderColor = useMemo(() => {
    return new Color(color).alpha(0.3).toString()
  }, [color])

  return (
    <Tag style={{ borderColor, color, backgroundColor }}>{text}</Tag>
  )
}
