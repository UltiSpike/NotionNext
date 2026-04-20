import Collapse from '@/components/Collapse'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 折叠菜单（移动端）
 */
export const MenuItemCollapse = props => {
  const { link } = props
  const hasSubMenu = link?.subMenus?.length > 0
  const [isOpen, changeIsOpen] = useState(false)

  const toggleOpenSubMenu = () => changeIsOpen(!isOpen)

  if (!link || !link.show) {
    return null
  }

  return (
    <>
      <div
        className='w-full px-8 py-4 text-left'
        style={{ borderBottom: '1px solid var(--zen-divider)' }}>
        {!hasSubMenu && (
          <SmartLink
            href={link?.href}
            target={link?.target}
            className='zen-menu-link block text-xs uppercase tracking-widest'>
            {link?.name}
          </SmartLink>
        )}
        {hasSubMenu && (
          <div
            onClick={toggleOpenSubMenu}
            className='flex justify-between cursor-pointer zen-menu-link text-xs uppercase tracking-widest'>
            <span>{link?.name}</span>
            <i
              className={`fa fa-plus transition-all duration-200 ${isOpen && 'rotate-45'}`}
              style={{ color: 'var(--zen-gray)' }}
            />
          </div>
        )}
      </div>

      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {link.subMenus.map((sLink, index) => (
            <div
              key={index}
              className='text-left px-12 py-3'
              style={{
                borderBottom: '1px solid var(--zen-divider)',
                backgroundColor: 'var(--zen-paper)'
              }}>
              <SmartLink href={sLink.href} target={link?.target}>
                <span
                  className='text-xs uppercase tracking-widest'
                  style={{ color: 'var(--zen-indigo)' }}>
                  {sLink.title}
                </span>
              </SmartLink>
            </div>
          ))}
        </Collapse>
      )}
    </>
  )
}
