import { useMemo } from 'react'
import styles from './RadarVisualization.module.css'

interface RadarVisualizationProps {
  data: any
  config: any
  onItemClick?: (item: any) => void
}

export default function RadarVisualization({ data, config, onItemClick }: RadarVisualizationProps) {
  const size = config.chart?.size || 600
  const centerX = size / 2
  const centerY = size / 2
  const maxRadius = (size / 2) * 0.75  // Reduced to leave room for labels

  const segments = config.segments || []
  const rings = config.rings || []
  const items = data.items || []

  const angleStep = (2 * Math.PI) / segments.length

  // Calculate positions for items
  const positionedItems = useMemo(() => {
    return items.map((item: any, index: number) => {
      const segmentIndex = segments.findIndex((s: any) => s.id === item.segment)
      const ringIndex = rings.findIndex((r: any) => r.id === item.ring)

      if (segmentIndex === -1 || ringIndex === -1) return null

      const baseAngle = segmentIndex * angleStep - Math.PI / 2
      const angleSpread = angleStep * 0.8
      const randomAngle = baseAngle + (Math.random() - 0.5) * angleSpread

      const ring = rings[ringIndex]
      const ringRadius = ring.radius * maxRadius
      const minRadius = ringIndex > 0 ? rings[ringIndex - 1].radius * maxRadius : 0
      const radiusRange = ringRadius - minRadius
      const randomRadius = minRadius + Math.random() * radiusRange * 0.8 + radiusRange * 0.1

      const x = centerX + randomRadius * Math.cos(randomAngle)
      const y = centerY + randomRadius * Math.sin(randomAngle)

      return { ...item, x, y, color: ring.color }
    }).filter(Boolean)
  }, [items, segments, rings, angleStep, maxRadius, centerX, centerY])

  return (
    <svg
      viewBox={`-50 -50 ${size + 100} ${size + 100}`}
      className={styles.radar}
      aria-label="Technology Radar Visualization"
    >
      {/* Background */}
      <rect x="-50" y="-50" width={size + 100} height={size + 100} fill="#fafafa" />

      {/* Rings */}
      {rings.map((ring: any, index: number) => {
        const radius = ring.radius * maxRadius
        return (
          <circle
            key={ring.id}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth={ring.strokeWidth || 1}
          />
        )
      })}

      {/* Segment lines */}
      {segments.map((segment: any, index: number) => {
        const angle = index * angleStep - Math.PI / 2
        const x = centerX + maxRadius * Math.cos(angle)
        const y = centerY + maxRadius * Math.sin(angle)

        return (
          <line
            key={segment.id}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="#d0d0d0"
            strokeWidth="1"
          />
        )
      })}

      {/* Segment labels */}
      {segments.map((segment: any, index: number) => {
        const angle = index * angleStep - Math.PI / 2
        const labelRadius = maxRadius + 50
        const x = centerX + labelRadius * Math.cos(angle)
        const y = centerY + labelRadius * Math.sin(angle)

        const textAnchor = x > centerX + 5 ? 'start' : x < centerX - 5 ? 'end' : 'middle'
        
        // Split long labels into multiple lines
        const words = segment.title.split(' ')
        const lines: string[] = []
        let currentLine = ''
        
        words.forEach((word: string) => {
          if ((currentLine + word).length > 15 && currentLine) {
            lines.push(currentLine.trim())
            currentLine = word + ' '
          } else {
            currentLine += word + ' '
          }
        })
        if (currentLine) lines.push(currentLine.trim())

        return (
          <g key={`label-${segment.id}`}>
            {lines.map((line, lineIndex) => (
              <text
                key={`${segment.id}-${lineIndex}`}
                x={x}
                y={y + (lineIndex * 14) - ((lines.length - 1) * 7)}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fontSize="12"
                fill="#2c3e50"
                fontWeight="600"
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}

      {/* Items (blips) */}
      {positionedItems.map((item: any) => (
        <g key={item.id}>
          <circle
            cx={item.x}
            cy={item.y}
            r="5"
            fill={item.color}
            opacity="0.8"
            className={styles.blip}
            onClick={() => onItemClick?.(item)}
            style={{ cursor: onItemClick ? 'pointer' : 'default' }}
          >
            <title>{item.title}</title>
          </circle>
          {onItemClick && (
            <circle
              cx={item.x}
              cy={item.y}
              r="8"
              fill="transparent"
              stroke="transparent"
              strokeWidth="10"
              className={styles.blipHitArea}
              onClick={() => onItemClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <title>{item.title}</title>
            </circle>
          )}
        </g>
      ))}
    </svg>
  )
}
