import { useMemo } from 'react'
import styles from './ToolCatalog.module.css'

interface ToolCatalogProps {
  data: any
  config: any
  onToolSelect: (tool: any) => void
}

export default function ToolCatalog({ data, config, onToolSelect }: ToolCatalogProps) {
  const stats = useMemo(() => {
    const total = data.allItems?.length || data.items?.length || 0
    const categories = config.segments?.length || 0
    const visible = data.items?.length || 0
    return { total, categories, visible }
  }, [data, config])

  const groupedItems = useMemo(() => {
    const groups: any = {}
    config.segments?.forEach((segment: any) => {
      groups[segment.id] = {
        segment,
        items: data.items?.filter((item: any) => item.segment === segment.id) || []
      }
    })
    return groups
  }, [data, config])

  return (
    <div className={styles.catalog}>
      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Tools</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.categories}</div>
          <div className={styles.statLabel}>Categories</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.visible}</div>
          <div className={styles.statLabel}>Showing</div>
        </div>
      </div>

      {/* Category Sections */}
      <div className={styles.catalogContent}>
        {Object.keys(groupedItems).map((segmentId) => {
          const { segment, items } = groupedItems[segmentId]
          
          if (items.length === 0) return null

          return (
            <CategorySection
              key={segment.id}
              segment={segment}
              items={items}
              onToolSelect={onToolSelect}
            />
          )
        })}
        
        {data.items?.length === 0 && (
          <div className={styles.noResults}>
            <p>No tools found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface CategorySectionProps {
  segment: any
  items: any[]
  onToolSelect: (tool: any) => void
}

function CategorySection({ segment, items, onToolSelect }: CategorySectionProps) {
  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2>{segment.title}</h2>
        <span className={styles.categoryCount}>{items.length} tools</span>
      </div>
      <p className={styles.categoryDescription}>{segment.description}</p>

      <div className={styles.toolsGrid}>
        {items.map((item: any) => (
          <div
            key={item.id}
            className={styles.toolCard}
            onClick={() => onToolSelect(item)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onToolSelect(item)
            }}
          >
            <div className={styles.toolName}>{item.title}</div>
            <div className={styles.toolRing}>{item.ring}</div>
            {item.tags && item.tags.length > 0 && (
              <div className={styles.toolTags}>
                {item.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
