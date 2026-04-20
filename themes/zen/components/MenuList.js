import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 菜单导航 — Zen 风格（大写字母 + 字间距）
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
      icon: null,
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('ZEN_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: null,
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('ZEN_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: null,
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('ZEN_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: null,
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('ZEN_MENU_TAG', null, CONFIG)
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
      {/* 大屏模式菜单 */}
      <div
        id='nav-menu-pc'
        className='hidden md:flex my-auto space-x-8 uppercase text-xs'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} />
        ))}
      </div>
      {/* 移动端小屏菜单 */}
      <div
        id='nav-menu-mobile'
        className='flex md:hidden my-auto justify-start uppercase text-xs tracking-widest'>
        <div
          onClick={toggleIsOpen}
          className='cursor-pointer zen-menu-link'
          style={{ color: 'var(--zen-ink)' }}>
          <i
            className={`${isOpen ? 'rotate-90' : ''} transition-all duration-200 fa fa-bars mr-2`}
          />
          <span>{!isOpen ? 'MENU' : 'CLOSE'}</span>
        </div>

        <Collapse
          collapseRef={collapseRef}
          className='absolute w-full top-12 left-0'
          isOpen={isOpen}>
          <div
            id='menu-wrap'
            style={{
              backgroundColor: 'var(--zen-bg)',
              borderTop: '1px solid var(--zen-divider)',
              borderBottom: '1px solid var(--zen-divider)'
            }}>
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
