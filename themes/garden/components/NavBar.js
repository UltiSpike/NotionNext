import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useGardenGlobal } from '..'
import { MenuList } from './MenuList'

/**
 * 导航栏 —— 漂浮式胶囊，手绘下划线悬停动效
 */
export default function NavBar(props) {
  const [showSearchInput, changeShowSearchInput] = useState(false)
  const router = useRouter()
  const { searchModal } = useGardenGlobal()

  const toggleShowSearchInput = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      changeShowSearchInput(!showSearchInput)
    }
  }

  const onKeyUp = e => {
    if (e.keyCode === 13) {
      const search = document.getElementById('garden-search').value
      if (search) {
        router.push({ pathname: '/search/' + search })
      }
    }
  }

  return (
    <nav className='w-full sticky top-4 z-30 px-4 md:px-6'>
      <div
        className='mx-auto max-w-5xl rounded-2xl backdrop-blur-md border'
        style={{
          background: 'rgba(250, 246, 241, 0.85)',
          borderColor: 'var(--garden-line)',
          boxShadow: '0 8px 30px -12px rgba(42,42,42,0.15)'
        }}
      >
        <div
          id='nav-bar-inner'
          className='flex items-center justify-between px-4 md:px-6 h-14 text-sm relative dark:bg-transparent'
          style={{ background: 'transparent' }}
        >
          <div className='flex-1 flex items-center'>
            {showSearchInput && (
              <input
                autoFocus
                id='garden-search'
                onKeyUp={onKeyUp}
                className='w-full bg-transparent outline-none px-2 py-1 font-serif-garden text-base'
                style={{ color: 'var(--garden-text)' }}
                aria-label='Submit search'
                type='search'
                name='s'
                autoComplete='off'
                placeholder='随便找点什么…'
              />
            )}
            {!showSearchInput && <MenuList {...props} />}
          </div>

          <div
            className='ml-3 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200'
            style={{
              background: showSearchInput
                ? 'var(--garden-coral)'
                : 'transparent',
              color: showSearchInput ? 'white' : 'var(--garden-coral)'
            }}
            onClick={toggleShowSearchInput}
            title='搜索'
          >
            <i
              className={
                showSearchInput
                  ? 'fa-regular fa-circle-xmark'
                  : 'fa-solid fa-magnifying-glass'
              }
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
