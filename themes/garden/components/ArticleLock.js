import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 文章加密校验组件
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
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }
  const passwordInputRef = useRef(null)
  useEffect(() => {
    passwordInputRef.current.focus()
  }, [])

  return (
    <div className='w-full flex justify-center items-center h-96'>
      <div
        className='rounded-2xl border px-8 py-10 text-center space-y-4 max-w-sm w-full'
        style={{
          background: 'var(--garden-bg-raise)',
          borderColor: 'var(--garden-line)'
        }}
      >
        <div
          className='text-4xl mb-2'
          style={{ color: 'var(--garden-coral)' }}
        >
          <i className='fas fa-key' />
        </div>
        <div
          className='font-serif-garden text-xl'
          style={{ color: 'var(--garden-text)' }}
        >
          {locale.COMMON.ARTICLE_LOCK_TIPS}
        </div>
        <div className='flex'>
          <input
            id='password'
            type='password'
            onKeyDown={e => {
              if (e.key === 'Enter') submitPassword()
            }}
            ref={passwordInputRef}
            className='flex-1 outline-none text-sm pl-4 py-2 rounded-l-lg border'
            style={{
              background: 'var(--garden-bg)',
              borderColor: 'var(--garden-line)',
              color: 'var(--garden-text)'
            }}
          />
          <button
            onClick={submitPassword}
            className='px-4 rounded-r-lg font-semibold text-white'
            style={{ background: 'var(--garden-coral)' }}
          >
            {locale.COMMON.SUBMIT}
          </button>
        </div>
        <div id='tips' />
      </div>
    </div>
  )
}
