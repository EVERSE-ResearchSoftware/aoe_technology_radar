import ReactMarkdown from 'react-markdown'
import styles from './ToolDetail.module.css'

interface ToolDetailProps {
  tool: any
  onBack: () => void
  config: any
}

export default function ToolDetail({ tool, onBack, config }: ToolDetailProps) {
  const segment = config.segments?.find((s: any) => s.id === tool.segment)
  const ring = config.rings?.find((r: any) => r.id === tool.ring)

  return (
    <div className={styles.toolDetail}>
      <button onClick={onBack} className={styles.backButton} aria-label="Back to catalog">
        ← Back to Catalog
      </button>

      <h1 className={styles.toolTitle}>{tool.title}</h1>

      <div className={styles.toolMeta}>
        {segment && (
          <span className={styles.metaTag} style={{ borderColor: segment.color }}>
            📁 {segment.title}
          </span>
        )}
        {ring && (
          <span className={styles.metaTag} style={{ borderColor: ring.color }}>
            🔧 {ring.title}
          </span>
        )}
        {tool.tags?.map((tag: string) => (
          <span key={tag} className={styles.metaTag}>
            🏷️ {tag}
          </span>
        ))}
      </div>

      {tool.description && (
        <div className={styles.toolDescription}>
          <h2>Description</h2>
          <ReactMarkdown>{tool.description}</ReactMarkdown>
        </div>
      )}

      {segment && (
        <div className={styles.toolSection}>
          <h2>Category: {segment.title}</h2>
          <p>{segment.description}</p>
        </div>
      )}

      {ring && (
        <div className={styles.toolSection}>
          <h2>Recommendation: {ring.title}</h2>
          <p>{ring.description}</p>
        </div>
      )}

      {tool.history && tool.history.length > 0 && (
        <div className={styles.toolHistory}>
          <h2>History</h2>
          <div className={styles.timeline}>
            {tool.history.map((entry: any, idx: number) => (
              <div key={idx} className={styles.historyEntry}>
                <div className={styles.historyDate}>{entry.date}</div>
                <div className={styles.historyRing}>{entry.ring}</div>
                {entry.description && (
                  <div className={styles.historyDescription}>{entry.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tool.links && tool.links.length > 0 && (
        <div className={styles.toolLinks}>
          <h2>Resources</h2>
          <ul>
            {tool.links.map((link: any, idx: number) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title || link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
