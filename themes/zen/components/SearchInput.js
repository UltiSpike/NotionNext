import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
let lock = false

/**
 * 搜索框 — 细底线，无背景
 */
const SearchInput = ({ keyword, cRef, className }) => {
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  useImperativeHandle(cRef, () => ({
    focus: () => {
      searchInputRef?.current?.focus()
    }
  }))

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' }).then(r => {})
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = val => {
    if (lock) return
    searchInputRef.current.value = val
    setShowClean(!!val)
  }
  const lockSearchInput = () => {
    lock = true
  }
  const unLockSearchInput = () => {
    lock = false
  }

  return (
    <div
      className={`flex w-full my-6 ${className || ''}`}
      style={{
        borderBottom: '1px solid var(--zen-divider)'
      }}>
      <input
        ref={searchInputRef}
        type='text'
        className='outline-none w-full text-base pl-2 bg-transparent font-light leading-10'
        style={{
          color: 'var(--zen-ink)',
          fontFamily: 'var(--zen-font-latin)'
        }}
        placeholder='Search…'
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={keyword}
      />

      <div
        className='-ml-8 cursor-pointer flex items-center justify-center py-2'
        onClick={handleSearch}>
        <i
          className={`fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-search'} transition-colors duration-200 hover:text-[color:var(--zen-vermillion)]`}
          style={{ color: 'var(--zen-gray)' }}
        />
      </div>

      {showClean && (
        <div className='-ml-8 cursor-pointer flex items-center justify-center py-2'>
          <i
            className='fas fa-times transition-colors duration-200 hover:text-[color:var(--zen-vermillion)] cursor-pointer'
            style={{ color: 'var(--zen-gray)' }}
            onClick={cleanSearch}
          />
        </div>
      )}
    </div>
  )
}

export default SearchInput
