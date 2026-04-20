import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 加密文章校验
 */
export default function ArticleLock(props) {
  const { validPassword } = props
  const { locale } = useGlobal()

  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-[color:var(--zen-vermillion)]'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }
  const passwordInputRef = useRef(null)
  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  return (
    <div
      id='container'
      className='w-full flex justify-center items-center h-96'>
      <div className='text-center space-y-6 max-w-md'>
        <div
          className='zen-heading text-lg'
          style={{ fontFamily: 'var(--zen-font-cjk)' }}>
          {locale.COMMON.ARTICLE_LOCK_TIPS}
        </div>
        <div className='zen-divider-accent' style={{ margin: '0.5rem auto' }} />
        <div className='flex mx-4'>
          <input
            id='password'
            type='password'
            onKeyDown={e => {
              if (e.key === 'Enter') submitPassword()
            }}
            ref={passwordInputRef}
            className='outline-none w-full text-sm pl-4 transition font-light leading-10 bg-transparent'
            style={{
              borderBottom: '1px solid var(--zen-divider)',
              color: 'var(--zen-ink)',
              fontFamily: 'var(--zen-font-latin)'
            }}
          />
          <div
            onClick={submitPassword}
            className='px-4 whitespace-nowrap cursor-pointer items-center justify-center py-2 zen-menu-link text-xs uppercase tracking-widest'>
            {locale.COMMON.SUBMIT}
          </div>
        </div>
        <div id='tips'></div>
      </div>
    </div>
  )
}
