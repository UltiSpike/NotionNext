import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useZenGlobal } from '..'
import { MenuList } from './MenuList'

/**
 * Zen 导航 — 仅一行极细字距的大写字母
 * 无阴影、无背景色、细底边
 */
export default function NavBar(props) {
  const [showSearchInput, changeShowSearchInput] = useState(false)
  const router = useRouter()
  const { searchModal } = useZenGlobal()

  const toggleShowSearchInput = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      changeShowSearchInput(!showSearchInput)
    }
  }

  const onKeyUp = e => {
    if (e.keyCode === 13) {
      const search = document.getElementById('zen-search').value
      if (search) {
        router.push({ pathname: '/search/' + search })
      }
    }
  }

  return (
    <nav
      className='w-full relative z-20'
      style={{
        backgroundColor: 'var(--zen-bg)',
        borderTop: '1px solid var(--zen-divider)',
        borderBottom: '1px solid var(--zen-divider)'
      }}>
      <div
        id='nav-bar-inner'
        className='h-12 mx-auto max-w-6xl px-5 sm:px-8 flex justify-between items-center text-sm relative'>
        <div className='h-full flex-1 flex items-center justify-center md:justify-start'>
          {showSearchInput ? (
            <input
              autoFocus
              id='zen-search'
              onKeyUp={onKeyUp}
              className='w-full outline-none h-full px-2 bg-transparent border-b'
              style={{
                color: 'var(--zen-ink)',
                borderColor: 'var(--zen-divider)',
                fontFamily: 'var(--zen-font-latin)'
              }}
              aria-label='Submit search'
              type='search'
              name='s'
              autoComplete='off'
              placeholder='enter a keyword…'
            />
          ) : (
            <MenuList {...props} />
          )}
        </div>

        <div
          className='ml-4 flex items-center cursor-pointer'
          style={{ color: 'var(--zen-gray)' }}>
          <i
            className={`${showSearchInput
                ? 'fa-regular fa-circle-xmark'
                : 'fa-solid fa-magnifying-glass'} align-middle hover:text-[color:var(--zen-vermillion)] transition-colors duration-200`}
            onClick={toggleShowSearchInput}
          />
        </div>
      </div>
    </nav>
  )
}
