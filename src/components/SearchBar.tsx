import styles from './SearchBar.module.css'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
  typeFilter: string
  onTypeChange: (type: string) => void
  segments: Array<{ id: string; title: string }>
  rings: Array<{ id: string; title: string }>
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  typeFilter,
  onTypeChange,
  segments,
  rings
}: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search tools by name, description, or tag..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
        aria-label="Search tools"
      />

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.filterSelect}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {segments.map((seg) => (
          <option key={seg.id} value={seg.id}>
            {seg.title}
          </option>
        ))}
      </select>

      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        className={styles.filterSelect}
        aria-label="Filter by ring"
      >
        <option value="">All Rings</option>
        {rings.map((ring) => (
          <option key={ring.id} value={ring.id}>
            {ring.title}
          </option>
        ))}
      </select>
    </div>
  )
}
