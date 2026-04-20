import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }
  const active =
    link.href === '/'
      ? router.asPath === '/'
      : router.asPath?.startsWith(link.href)

  return (
    <div
      className='relative'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className={`garden-wiggle-link font-serif-garden text-base ${
            active ? 'active' : ''
          }`}
          style={{
            color: active ? 'var(--garden-coral)' : 'var(--garden-text)'
          }}
        >
          {link?.icon && (
            <span className='mr-1.5 text-sm'>
              <i className={link.icon} />
            </span>
          )}
          {link?.name}
        </SmartLink>
      )}

      {hasSubMenu && (
        <div
          className='garden-wiggle-link font-serif-garden text-base cursor-pointer'
          style={{ color: 'var(--garden-text)' }}
        >
          {link?.icon && (
            <span className='mr-1.5 text-sm'>
              <i className={link.icon} />
            </span>
          )}
          {link?.name}
          <i
            className={`ml-1 fas fa-chevron-down text-xs duration-300 transition-transform ${
              show ? 'rotate-180' : ''
            }`}
          />
        </div>
      )}

      {hasSubMenu && (
        <ul
          className={`${
            show
              ? 'visible opacity-100 translate-y-0'
              : 'invisible opacity-0 -translate-y-2'
          } absolute left-0 top-full mt-3 min-w-[160px] rounded-xl border py-2 transition-all duration-200 z-30`}
          style={{
            background: 'var(--garden-bg-raise)',
            borderColor: 'var(--garden-line)',
            boxShadow: '0 12px 30px -12px rgba(42,42,42,0.2)'
          }}
        >
          {link.subMenus.map((sLink, index) => (
            <li
              key={index}
              className='px-4 py-2 text-sm hover:bg-[color:var(--garden-cream-deep)] transition-colors'
              style={{ color: 'var(--garden-text)' }}
            >
              <SmartLink href={sLink.href} target={link?.target}>
                {sLink?.icon && <i className={`${sLink.icon} mr-2`} />}
                {sLink.title}
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
