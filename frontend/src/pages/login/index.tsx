import * as api from '@/api'
import Logo from '@/assets/logo.svg'
import LanguageSwitch from '@/components/language-switch'
import { brandByLang, useI18n } from '@/configs'
import { Background } from '@/layout/base/background'
import { userActions, userState } from '@/store/user'
import { Button, Flex, Form, Input, Tabs, TabsProps } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import styles from './index.module.scss'

const IconUser = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(0, 0, 0, 0.45)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

export default function Login() {
  const user = useSnapshot(userState)
  const navigate = useNavigate()
  const { lang, t } = useI18n()
  const brand = brandByLang(lang)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const [form] = Form.useForm<{
    username: string
    password: string
    repeatPassword: string
  }>()
  useEffect(() => {
    if (user.username) {
      form.setFieldValue('username', user.username)
    }
  }, [])

  async function login() {
    const { username, password } = form.getFieldsValue()
    const { data } = await api.user.login({ username, password })
    window.$app.message.success(t('login.loginSuccess'))
    userActions.setUsername(username)
    userActions.setToken(data.access_token)
    navigate('/')
  }
  async function register() {
    const { username, password } = form.getFieldsValue()
    await api.user.register({ username, password })
    window.$app.message.success(t('login.registerSuccess'))
    form.setFieldValue('password', '')
    form.setFieldValue('repeatPassword', '')
    setActiveTab('login')
  }

  const tabs: TabsProps['items'] = [
    {
      key: 'login',
      label: t('login.login'),
      children: (
        <Form form={form} onFinish={login} layout="vertical">
          <div className={styles['login-title']}>{t('login.welcomeBack')}</div>
          <Form.Item
            label={t('login.username')}
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input
              className={styles['login-input']}
              value={form.getFieldValue('username')}
              onChange={(e) => form.setFieldValue('username', e.target.value)}
              placeholder={t('login.usernamePlaceholder')}
              size="large"
              suffix={IconUser}
            />
          </Form.Item>
          <Form.Item
            label={t('login.password')}
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password
              className={styles['login-input']}
              value={form.getFieldValue('password')}
              onChange={(e) => {
                form.setFieldValue('password', e.target.value)
                form.setFieldValue('repeatPassword', '')
              }}
              placeholder={t('login.passwordPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles['login-button']}
              type="primary"
              htmlType="submit"
              size="large"
            >
              {t('login.login')}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'register',
      label: t('login.register'),
      children: (
        <Form form={form} onFinish={register} layout="vertical">
          <div className={styles['login-title']}>
            {t('login.createAccount')}
          </div>
          <Form.Item
            label={t('login.username')}
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input
              className={styles['login-input']}
              value={form.getFieldValue('username')}
              onChange={(e) => form.setFieldValue('username', e.target.value)}
              placeholder={t('login.usernamePlaceholder')}
              size="large"
              suffix={IconUser}
            />
          </Form.Item>
          <Form.Item
            label={t('login.password')}
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password
              className={styles['login-input']}
              value={form.getFieldValue('password')}
              onChange={(e) => {
                form.setFieldValue('password', e.target.value)
                form.setFieldValue('repeatPassword', '')
              }}
              placeholder={t('login.passwordPlaceholder')}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={t('login.repeatPassword')}
            name="repeatPassword"
            rules={[
              { required: true, message: t('login.repeatRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value !== getFieldValue('password')) {
                    return Promise.reject(
                      new Error(t('login.passwordMismatch')),
                    )
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input.Password
              className={styles['login-input']}
              value={form.getFieldValue('repeatPassword')}
              onChange={(e) =>
                form.setFieldValue('repeatPassword', e.target.value)
              }
              placeholder={t('login.repeatPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles['login-button']}
              type="primary"
              htmlType="submit"
              size="large"
            >
              {t('login.register')}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ]

  return (
    <Flex
      className={styles['login-page']}
      justify="center"
      align="center"
      style={{ minHeight: '100vh' }}
    >
      <Background />
      <div className={styles['login-card']}>
        <LanguageSwitch className={styles['login-language']} />
        <div className={styles['login-brand']}>
          <img
            className={styles['login-brand__logo']}
            src={Logo}
            alt={brand.name}
          />
          <div className={styles['login-brand__name']}>{brand.name}</div>
          <div className={styles['login-brand__slogan']}>{brand.slogan}</div>
        </div>
        <Tabs
          className={styles['login-tabs']}
          items={tabs}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'login' | 'register')}
          destroyOnHidden
        />
      </div>
    </Flex>
  )
}
