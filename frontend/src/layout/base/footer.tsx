import iconEdit from '@/assets/layout/edit.svg'
import { useI18n } from '@/configs'
import { userState } from '@/store/user'
import { Avatar } from 'antd'
import { useSnapshot } from 'valtio'
import './footer.scss'

export function Footer() {
  const user = useSnapshot(userState)
  const { t } = useI18n()
  const name = user.username ?? t('nav.userFallback')

  return (
    <div className="base-layout-footer">
      <div className="base-layout-footer__main">
        <div className="header">
          <Avatar className="avatar" size="large">
            {name.slice(0, 1).toUpperCase()}
          </Avatar>

          <img className="edit" src={iconEdit} alt="" />
        </div>

        <div className="body scrollbar-style">
          <div className="username">{name}</div>
        </div>

        <div className="footer" />
      </div>
    </div>
  )
}
