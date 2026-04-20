import BLOG from "@/blog.config"

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  let pageIds = []
  // 兼容 Notion 新旧 API: 新版 collectionQuery 的 key 是 dataSourceId 而非 collectionId
  const collectionBucket = collectionQuery?.[collectionId] || Object.values(collectionQuery || {})[0]
  try {
    const groupIndex = BLOG.NOTION_INDEX || 0
    if (viewIds && viewIds.length > 0) {
      const ids = collectionBucket?.[viewIds[groupIndex]]?.collection_group_results?.blockIds || []
      for (const id of ids) {
        pageIds.push(id)
      }
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error)
  }

  // 兜底：遍历所有 collection/data-source 下的所有 view，不依赖 collectionId 匹配
  if (pageIds.length === 0 && collectionQuery) {
    const pageSet = new Set()
    Object.values(collectionQuery).forEach(bucket => {
      Object.values(bucket || {}).forEach(view => {
        view?.blockIds?.forEach(id => pageSet.add(id))
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
      })
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
