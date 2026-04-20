import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 菜单导航
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const [isOpen, changeIsOpen] = useState(false)
  const toggleIsOpen = () => changeIsOpen(!isOpen)
  const closeMenu = () => changeIsOpen(false)
  const router = useRouter()
  const collapseRef = useRef(null)

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
  })

  let links = [
    {
      icon: 'fas fa-seedling',
      name: locale.NAV.INDEX || '首页',
      href: '/',
      show: true
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('GARDEN_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('GARDEN_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('GARDEN_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('GARDEN_MENU_TAG', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }
  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      {/* 桌面端 */}
      <div id='nav-menu-pc' className='hidden md:flex items-center gap-5'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} />
        ))}
      </div>

      {/* 移动端 */}
      <div id='nav-menu-mobile' className='flex md:hidden items-center'>
        <div
          onClick={toggleIsOpen}
          className='cursor-pointer inline-flex items-center gap-2 font-serif-garden'
          style={{ color: 'var(--garden-text)' }}
        >
          <i
            className={`${
              isOpen && 'rotate-90'
            } transition-all duration-200 fa fa-bars`}
          />
          <span>{!isOpen ? 'Menu' : 'Close'}</span>
        </div>

        <Collapse
          collapseRef={collapseRef}
          className='absolute w-full top-14 left-0 px-4'
          isOpen={isOpen}
        >
          <div
            id='menu-wrap'
            className='rounded-xl border overflow-hidden mt-2'
            style={{
              background: 'var(--garden-bg-raise)',
              borderColor: 'var(--garden-line)'
            }}
          >
            {links?.map((link, index) => (
              <MenuItemCollapse
                key={index}
                link={link}
                onHeightChange={param =>
                  collapseRef.current?.updateCollapseHeight(param)
                }
              />
            ))}
          </div>
        </Collapse>
      </div>
    </>
  )
}
