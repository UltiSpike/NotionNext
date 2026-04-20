/**
 * Garden —— a personal digital garden theme for NotionNext.
 *
 * Design rationale:
 *  1. Warm, cream palette with coral/moss/mustard accents; a deliberate
 *     counterweight to the cold K8s/Docker/infra subject matter.
 *  2. Serif (Crimson Pro + Noto Serif SC) for headlines to lend a hand-written,
 *     personal-essay quality; sans (Inter + Source Han Sans SC) for body.
 *  3. Asymmetric layout, stepped/tilted article cards with sticky-note corners
 *     and hover rotation — the page should feel hand-crafted, not generated.
 *  4. Tiny inline SVGs (squiggles, arrows, sticky corners) instead of icon
 *     libraries; marker-style highlights and hand-drawn wavy underlines
 *     replace boring horizontal rules.
 *  5. Cream-yellow tinted code blocks with JetBrains Mono and a prominent
 *     uppercase lang badge — so technical content feels inviting.
 *
 * Contract: exports the exact same names as themes/simple/index.js so upstream
 * code that imports layouts by name keeps working.
 */
import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import BlogPostBar from './components/BlogPostBar'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题组件
const BlogListScroll = dynamic(() => import('./components/BlogListScroll'), {
  ssr: false
})
const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), {
  ssr: false
})
const ArticleLock = dynamic(() => import('./components/ArticleLock'), {
  ssr: false
})
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), {
  ssr: false
})
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), {
  ssr: false
})
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })
const TopBar = dynamic(() => import('./components/TopBar'), { ssr: false })
const Header = dynamic(() => import('./components/Header'), { ssr: false })
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false })
const SideBar = dynamic(() => import('./components/SideBar'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), {
  ssr: false
})
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const SearchInput = dynamic(() => import('./components/SearchInput'), {
  ssr: false
})
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })
const BlogListPage = dynamic(() => import('./components/BlogListPage'), {
  ssr: false
})
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), {
  ssr: false
})

// 主题全局状态
const ThemeGlobalGarden = createContext()
export const useGardenGlobal = () => useContext(ThemeGlobalGarden)

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalGarden.Provider value={{ searchModal }}>
      <div
        id='theme-garden'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col scroll-smooth`}
      >
        <Style />

        {siteConfig('GARDEN_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        {/* Header: 头像 + 问候 */}
        <Header {...props} />

        {/* 导航栏（sticky） */}
        <NavBar {...props} />

        {/* 主体 */}
        <div
          id='container-wrapper'
          className={`${
            JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
              ? 'lg:flex-row-reverse'
              : ''
          } w-full flex-1 flex flex-col lg:flex-row items-start max-w-6xl mx-auto pt-10 px-4 md:px-6 gap-8`}
        >
          <div id='container-inner' className='w-full flex-1 min-w-0'>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-500 transform'
              enterFrom='opacity-0 translate-y-6'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in-out duration-200 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-4'
              unmount={false}
            >
              {slotTop}
              {children}
            </Transition>
            <AdSlot type='native' />
          </div>

          {!fullWidth && siteConfig('GARDEN_SIDEBAR_ENABLE', true, CONFIG) && (
            <aside
              id='right-sidebar'
              className='hidden xl:block flex-none sticky top-24 w-72'
            >
              <SideBar {...props} />
            </aside>
          )}
        </div>

        <div className='fixed right-5 bottom-5 z-40'>
          <JumpToTopButton />
        </div>

        <AlgoliaSearchModal cRef={searchModal} {...props} />

        <Footer {...props} />
      </div>
    </ThemeGlobalGarden.Provider>
  )
}

/**
 * 博客首页
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <>
      <BlogPostBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className:
            'text-[color:var(--garden-coral)] border-b border-dashed border-[color:var(--garden-coral)]'
        }
      })
    }
  }, [])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : (
    <SearchInput {...props} />
  )

  return <LayoutPostList {...props} slotTop={slotTop} />
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='mb-10 pb-20 md:py-8 min-h-screen w-full'>
      <div
        className='mb-8 font-serif-garden italic text-2xl'
        style={{ color: 'var(--garden-coral)' }}
      >
        时间的年轮
      </div>
      {Object.keys(archivePosts).map(archiveTitle => (
        <BlogArchiveItem
          key={archiveTitle}
          archiveTitle={archiveTitle}
          archivePosts={archivePosts}
        />
      ))}
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <article
          className={`garden-prose ${
            fullWidth ? '' : 'xl:max-w-3xl 2xl:max-w-4xl'
          }`}
        >
          <ArticleInfo post={post} />

          <WWAds orientation='horizontal' className='w-full' />

          <div
            id='article-wrapper'
            className='rounded-xl p-4 md:p-6 border'
            style={{
              background: 'var(--garden-bg-raise)',
              borderColor: 'var(--garden-line)'
            }}
          >
            {!lock && <NotionPage post={post} />}
          </div>

          <ShareBar post={post} />

          <AdSlot type={'in-article'} />

          {post?.type === 'Post' && (
            <>
              {siteConfig('GARDEN_ARTICLE_AROUND', true, CONFIG) && (
                <ArticleAround prev={prev} next={next} />
              )}
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}

          <Comment frontMatter={post} />
        </article>
      )}
    </>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center'>
      <div
        className='font-serif-garden text-8xl md:text-9xl'
        style={{ color: 'var(--garden-coral)' }}
      >
        404
      </div>
      <div
        className='mt-3 font-serif-garden italic text-xl'
        style={{ color: 'var(--garden-text-soft)' }}
      >
        这朵花还没种下 · Not found.
      </div>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div id='category-list' className='flex flex-wrap gap-3'>
      {categoryOptions?.map(category => (
        <SmartLink
          key={category.name}
          href={`/category/${category.name}`}
          passHref
          legacyBehavior
        >
          <div
            className='cursor-pointer px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5 hover:border-[color:var(--garden-coral)] hover:text-[color:var(--garden-coral)]'
            style={{
              borderColor: 'var(--garden-line)',
              color: 'var(--garden-text)'
            }}
          >
            <i className='mr-2 fas fa-folder' />
            {category.name}
            <span
              className='ml-2 text-xs'
              style={{ color: 'var(--garden-text-soft)' }}
            >
              {category.count}
            </span>
          </div>
        </SmartLink>
      ))}
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div id='tags-list' className='flex flex-wrap gap-2'>
      {tagOptions.map(tag => (
        <SmartLink
          key={tag.name}
          href={`/tag/${encodeURIComponent(tag.name)}`}
          passHref
          className='px-3 py-1.5 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:rotate-1'
          style={{
            background: 'var(--garden-bg-raise)',
            border: '1px solid var(--garden-line)',
            color: 'var(--garden-text)'
          }}
        >
          <span style={{ color: 'var(--garden-coral)' }}>#</span>
          {tag.name}
          {tag.count ? (
            <span
              className='ml-1.5 text-xs'
              style={{ color: 'var(--garden-text-soft)' }}
            >
              {tag.count}
            </span>
          ) : null}
        </SmartLink>
      ))}
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
