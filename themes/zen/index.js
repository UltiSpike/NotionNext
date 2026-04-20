/**
 * Zen theme — East Asian zen minimalism for NotionNext.
 *
 * Design rationale (10 lines):
 *   1. Single centered column; no sidebar on article pages — the page is a book.
 *   2. Serif everything (Noto Serif SC + EB Garamond) — programmer-as-thinker aesthetic.
 *   3. Vermillion #A93A2E reserved for strong/link/accent only; never decorative.
 *   4. Rice-paper background #FAF8F3; ink #1A1A1A — no pure white, no pure black.
 *   5. Tiny 3px vermillion bar left of every heading (Japanese book-cover 竖排 cue).
 *   6. Massive vertical whitespace; no shadows, no gradients, no scaling transitions.
 *   7. Code blocks: paper-tinted bg + thin border + Fira Code — understated, not neon.
 *   8. Pull-quotes use CJK「」brackets in vermillion (restrained typographic accent).
 *   9. Chinese line-height ≥ 1.9; letter-spacing 0.04em on headings for punctuation rhythm.
 *  10. Dark mode: ink bg #15161A, warm cream text — preserve the print-on-paper feel.
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
const ThemeGlobalZen = createContext()
export const useZenGlobal = () => useContext(ThemeGlobalZen)

/**
 * 基础布局
 * 单列居中、无侧栏于文章页；massive 留白。
 * @param {*} props
 * @returns
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)
  const router = useRouter()

  // 文章页永远隐藏侧栏
  const isArticlePage = router.pathname === '/[prefix]' ||
                        router.pathname === '/[prefix]/[slug]' ||
                        router.pathname === '/[prefix]/[slug]/[...suffix]'
  const hideSidebarOnArticle = siteConfig('ZEN_SIDEBAR_HIDE_ON_ARTICLE', true, CONFIG)
  const sidebarEnabled = siteConfig('ZEN_SIDEBAR_ENABLE', false, CONFIG)
  const showSidebar = !fullWidth && sidebarEnabled && !(hideSidebarOnArticle && isArticlePage)

  return (
    <ThemeGlobalZen.Provider value={{ searchModal }}>
      <div
        id='theme-zen'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col scroll-smooth`}>
        <Style />

        {siteConfig('ZEN_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        {/* 顶部 LOGO */}
        <Header {...props} />

        {/* 导航栏 */}
        <NavBar {...props} />

        {/* 主体 */}
        <div
          id='container-wrapper'
          className='w-full flex-1 flex items-start max-w-6xl mx-auto px-5 sm:px-8 pt-16 md:pt-24'>
          <div id='container-inner' className='w-full flex-grow min-h-fit'>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-4'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-4'
              unmount={false}>
              {slotTop}
              {children}
            </Transition>
            <AdSlot type='native' />
          </div>

          {showSidebar && (
            <aside
              id='right-sidebar'
              className='hidden xl:block flex-none sticky top-12 w-72 pl-10 ml-8 border-l'
              style={{ borderColor: 'var(--zen-divider)' }}>
              <SideBar {...props} />
            </aside>
          )}
        </div>

        <div className='fixed right-6 bottom-6 z-20'>
          <JumpToTopButton />
        </div>

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        <Footer {...props} />
      </div>
    </ThemeGlobalZen.Provider>
  )
}

/**
 * 博客首页 — 列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表页
 */
const LayoutPostList = props => {
  return (
    <div className='zen-list'>
      <BlogPostBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </div>
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
          className: 'zen-search-hit'
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
 * 归档页 — 年份 / 月份分组
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='zen-list mb-16 pb-16 md:py-12 min-h-screen w-full'>
      <div className='mb-10 text-center'>
        <div className='zen-meta uppercase tracking-widest text-xs mb-3'>
          Archive
        </div>
        <h1 className='zen-heading text-2xl md:text-3xl'>归档</h1>
        <div className='zen-divider-accent' />
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
          className={`${fullWidth ? '' : 'zen-prose'} pb-16`}>
          {/* 文章信息 */}
          <ArticleInfo post={post} />

          <hr className='zen-divider' style={{ margin: '1.5rem 0 2.5rem' }} />

          <WWAds orientation='horizontal' className='w-full' />

          <div id='article-wrapper' className='zen-article-body'>
            {!lock && <NotionPage post={post} />}
          </div>

          <div className='zen-divider-accent' />

          {/* 分享 */}
          <ShareBar post={post} />

          <AdSlot type={'in-article'} />

          {post?.type === 'Post' && (
            <>
              {siteConfig('ZEN_ARTICLE_AROUND', true, CONFIG) && (
                <ArticleAround prev={prev} next={next} />
              )}
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}

          {/* 评论区 */}
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
    <div className='zen-prose text-center py-32'>
      <div className='zen-meta uppercase tracking-widest text-xs mb-4'>
        404
      </div>
      <h1 className='zen-heading text-3xl mb-6'>此处无物</h1>
      <div className='zen-divider-accent' />
      <p className='text-base' style={{ color: 'var(--zen-gray)' }}>
        你寻找的页面，如落叶般已不在此处。
      </p>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div className='zen-list py-12'>
      <div className='mb-10 text-center'>
        <div className='zen-meta uppercase tracking-widest text-xs mb-3'>
          Categories
        </div>
        <h1 className='zen-heading text-2xl md:text-3xl'>分类</h1>
        <div className='zen-divider-accent' />
      </div>
      <div
        id='category-list'
        className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
        {categoryOptions?.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
            <div className='zen-menu-link cursor-pointer px-2 py-1'>
              {category.name}
              <span
                className='ml-1 text-xs'
                style={{ color: 'var(--zen-gray)' }}>
                ({category.count})
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div className='zen-list py-12'>
      <div className='mb-10 text-center'>
        <div className='zen-meta uppercase tracking-widest text-xs mb-3'>
          Tags
        </div>
        <h1 className='zen-heading text-2xl md:text-3xl'>标签</h1>
        <div className='zen-divider-accent' />
      </div>
      <div
        id='tags-list'
        className='flex flex-wrap justify-center gap-2 px-4'>
        {tagOptions.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            passHref>
            <span className='zen-tag cursor-pointer'>
              {tag.name}
              {tag.count ? ` · ${tag.count}` : ''}
            </span>
          </SmartLink>
        ))}
      </div>
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
