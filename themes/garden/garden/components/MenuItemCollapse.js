import Collapse from '@/components/Collapse'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 移动端折叠菜单
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
        className='w-full px-5 py-3 border-b'
        style={{ borderColor: 'var(--garden-line)' }}
      >
        {!hasSubMenu && (
          <SmartLink
            href={link?.href}
            target={link?.target}
            className='flex items-center font-serif-garden'
            style={{ color: 'var(--garden-text)' }}
          >
            {link?.icon && <i className={`${link.icon} mr-3 text-sm`} />}
            {link?.name}
          </SmartLink>
        )}
        {hasSubMenu && (
          <div
            onClick={toggleOpenSubMenu}
            className='flex items-center justify-between cursor-pointer font-serif-garden'
            style={{ color: 'var(--garden-text)' }}
          >
            <span>
              {link?.icon && <i className={`${link.icon} mr-3 text-sm`} />}
              {link?.name}
            </span>
            <i
              className={`fa fa-plus text-xs transition-transform duration-200 ${
                isOpen && 'rotate-45'
              }`}
              style={{ color: 'var(--garden-text-soft)' }}
            />
          </div>
        )}
      </div>

      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {link.subMenus.map((sLink, index) => (
            <div
              key={index}
              className='pl-10 pr-5 py-2 text-sm border-b'
              style={{
                borderColor: 'var(--garden-line)',
                color: 'var(--garden-text-soft)'
              }}
            >
              <SmartLink href={sLink.href} target={link?.target}>
                {sLink?.icon && <i className={`${sLink.icon} mr-2`} />}
                {sLink.title}
              </SmartLink>
            </div>
          ))}
        </Collapse>
      )}
    </>
  )
}
