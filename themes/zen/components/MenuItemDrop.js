import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
      className='relative'>
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className='zen-menu-link'>
          {link?.name}
        </SmartLink>
      )}

      {hasSubMenu && (
        <div className='cursor-pointer zen-menu-link'>
          {link?.name}
          <i
            className={`px-2 fas fa-chevron-down text-xs duration-500 transition-all ${show ? 'rotate-180' : ''}`}
          />
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-8' : 'invisible opacity-0 top-6'} transition-all duration-300 z-20 absolute block min-w-[10rem]`}
          style={{
            backgroundColor: 'var(--zen-bg)',
            border: '1px solid var(--zen-divider)'
          }}>
          {link.subMenus.map((sLink, index) => (
            <li
              key={index}
              className='transition-colors duration-200 py-2 px-4 hover:text-[color:var(--zen-vermillion)]'
              style={{
                borderBottom:
                  index === link.subMenus.length - 1
                    ? 'none'
                    : '1px solid var(--zen-divider)'
              }}>
              <SmartLink href={sLink.href} target={link?.target}>
                <span className='text-xs uppercase tracking-widest whitespace-nowrap'>
                  {sLink.title}
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
