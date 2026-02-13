export interface RadarItem {
  id: string
  title: string
  segment: string
  ring: string
  description?: string
  tags?: string[]
  [key: string]: any
}

export interface RadarData {
  items: RadarItem[]
  segments: any[]
  rings: any[]
  allItems?: RadarItem[]
}

export function filterRadarData(
  data: RadarData,
  searchTerm: string,
  categoryFilter: string,
  typeFilter: string
): RadarData {
  let filtered = [...(data.items || [])]

  // Search filter
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim()
    filtered = filtered.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(term)
      const descMatch = item.description?.toLowerCase().includes(term)
      const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(term))
      return titleMatch || descMatch || tagMatch
    })
  }

  // Category filter (segment)
  if (categoryFilter) {
    filtered = filtered.filter((item) => item.segment === categoryFilter)
  }

  // Type filter (ring)
  if (typeFilter) {
    filtered = filtered.filter((item) => item.ring === typeFilter)
  }

  return {
    ...data,
    items: filtered,
    allItems: data.items // Keep original items for stats
  }
}

export function groupBySegment(items: RadarItem[], segments: any[]) {
  return segments.map((segment) => ({
    ...segment,
    items: items.filter((item) => item.segment === segment.id)
  }))
}

export function groupByRing(items: RadarItem[], rings: any[]) {
  return rings.map((ring) => ({
    ...ring,
    items: items.filter((item) => item.ring === ring.id)
  }))
}

export function calculateStats(data: RadarData) {
  const total = data.allItems?.length || data.items?.length || 0
  const visible = data.items?.length || 0
  const categories = data.segments?.length || 0
  const rings = data.rings?.length || 0

  return {
    total,
    visible,
    categories,
    rings,
    filtered: total - visible
  }
}

export function searchItems(items: RadarItem[], query: string): RadarItem[] {
  if (!query || !query.trim()) return items

  const term = query.toLowerCase().trim()
  
  return items.filter((item) => {
    const titleScore = item.title?.toLowerCase().includes(term) ? 10 : 0
    const descScore = item.description?.toLowerCase().includes(term) ? 5 : 0
    const tagScore = item.tags?.some((tag) => tag.toLowerCase().includes(term)) ? 3 : 0
    
    return (titleScore + descScore + tagScore) > 0
  })
}
