import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
let lock = false

const SearchInput = ({ keyword, cRef, className }) => {
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()

  useImperativeHandle(cRef, () => ({
    focus: () => searchInputRef?.current?.focus()
  }))

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' })
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) handleSearch()
    else if (e.keyCode === 27) cleanSearch()
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = val => {
    if (lock) return
    searchInputRef.current.value = val
    setShowClean(!!val)
  }

  return (
    <div
      className={
        'flex w-full rounded-full border overflow-hidden my-4 ' +
        (className || '')
      }
      style={{
        background: 'var(--garden-bg-raise)',
        borderColor: 'var(--garden-line)'
      }}
    >
      <input
        ref={searchInputRef}
        type='text'
        className='outline-none w-full px-5 py-3 bg-transparent font-serif-garden text-base'
        style={{ color: 'var(--garden-text)' }}
        onKeyUp={handleKeyUp}
        onCompositionStart={() => (lock = true)}
        onCompositionUpdate={() => (lock = true)}
        onCompositionEnd={() => (lock = false)}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={keyword}
        placeholder='在花园里找点什么...'
      />

      <button
        onClick={handleSearch}
        className='px-5 flex items-center justify-center'
        style={{ color: 'var(--garden-coral)' }}
      >
        <i
          className={`fas ${
            onLoading ? 'fa-spinner animate-spin' : 'fa-search'
          }`}
        />
      </button>

      {showClean && (
        <button
          onClick={cleanSearch}
          className='pr-4'
          style={{ color: 'var(--garden-text-soft)' }}
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  )
}

export default SearchInput
