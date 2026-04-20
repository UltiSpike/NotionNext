import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * 回到顶部
 */
const JumpToTopButton = () => {
  const { locale } = useGlobal()
  const [show, switchShow] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      switchShow(window.pageYOffset > 200)
    }
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <button
      title={locale.POST.TOP}
      className={`${
        show ? 'opacity-100' : 'invisible opacity-0'
      } transition-all duration-300 flex items-center justify-center cursor-pointer h-11 w-11 rounded-full shadow-lg text-white hover:-rotate-6`}
      style={{
        background: 'var(--garden-coral)',
        boxShadow: '0 10px 25px -10px rgba(232,121,109,0.8)'
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className='fas fa-angle-up' />
    </button>
  )
}

export default JumpToTopButton
