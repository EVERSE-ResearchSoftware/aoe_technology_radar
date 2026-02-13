import { useState, useMemo } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import SearchBar from '@/components/SearchBar'
import RadarVisualization from '@/components/RadarVisualization'
import ToolCatalog from '@/components/ToolCatalog'
import ToolDetail from '@/components/ToolDetail'
import { filterRadarData } from '@/lib/filterData'
import styles from '@/styles/Home.module.css'

interface HomeProps {
  radarData: any
  config: any
}

export default function Home({ radarData, config }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedTool, setSelectedTool] = useState<any>(null)

  const filteredData = useMemo(() => {
    return filterRadarData(radarData, searchTerm, categoryFilter, typeFilter)
  }, [radarData, searchTerm, categoryFilter, typeFilter])

  const showSplitLayout = config.toggles?.showSplitLayout !== false

  return (
    <>
      <Head>
        <title>{config.labels?.title || 'EVERSE Technology Radar'}</title>
        <meta name="description" content="Technology Radar for research software quality" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Header with Search */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>🎯 {config.labels?.title || 'EVERSE Technology Radar'}</h1>
            {config.toggles?.showSearch && (
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                segments={config.segments || []}
                rings={config.rings || []}
              />
            )}
          </div>
        </header>

        {/* Main Content */}
        {showSplitLayout ? (
          <div className={styles.mainContent}>
            {/* Left: Radar Chart */}
            <div className={styles.radarSection}>
              <div className={styles.radarContainer}>
                <RadarVisualization
                  data={filteredData}
                  config={config}
                  onItemClick={setSelectedTool}
                />
              </div>
              <div className={styles.legend}>
                {config.rings?.map((ring: any) => (
                  <div key={ring.id} className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ background: ring.color }}
                    />
                    <span>{ring.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Catalog/Details */}
            <div className={styles.catalogSection}>
              {selectedTool ? (
                <ToolDetail
                  tool={selectedTool}
                  onBack={() => setSelectedTool(null)}
                  config={config}
                />
              ) : (
                <ToolCatalog
                  data={filteredData}
                  config={config}
                  onToolSelect={setSelectedTool}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.traditionalLayout}>
            <RadarVisualization
              data={filteredData}
              config={config}
              onItemClick={setSelectedTool}
            />
            <ToolCatalog
              data={filteredData}
              config={config}
              onToolSelect={setSelectedTool}
            />
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>
              Technology Radar for tools and services for research software quality developed as part of the EVERSE project
            </p>
            <div className={styles.footerLinks}>
              {config.footerLinks?.map((link: any, idx: number) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')
  
  let config = {}
  let radarData = { items: [], segments: [], rings: [] }
  
  try {
    // Load config
    const configPath = path.join(process.cwd(), 'config.json')
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    }
    
    // Load radar data from markdown files
    const radarDir = path.join(process.cwd(), 'data', 'radar')
    const items: any[] = []
    
    if (fs.existsSync(radarDir)) {
      const releases = fs.readdirSync(radarDir)
        .filter((file: string) => fs.statSync(path.join(radarDir, file)).isDirectory())
        .sort()
        .reverse()
      
      if (releases.length > 0) {
        const latestRelease = releases[0]
        const releasePath = path.join(radarDir, latestRelease)
        const files = fs.readdirSync(releasePath).filter((file: string) => file.endsWith('.md'))
        
        files.forEach((file: string) => {
          try {
            const filePath = path.join(releasePath, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const { data: frontmatter, content } = matter(fileContent)
            
            if (frontmatter.title && frontmatter.ring && frontmatter.segment) {
              items.push({
                id: file.replace('.md', ''),
                title: frontmatter.title,
                ring: frontmatter.ring,
                segment: frontmatter.segment,
                tags: frontmatter.tags || [],
                description: content,
                featured: frontmatter.featured !== false,
                release: latestRelease
              })
            }
          } catch (err) {
            console.error(`Error parsing ${file}:`, err)
          }
        })
      }
    }
    
    radarData = {
      items: items.filter(item => item.featured !== false),
      segments: config.segments || [],
      rings: config.rings || []
    }
  } catch (error) {
    console.error('Error loading config:', error)
  }

  return {
    props: {
      radarData,
      config
    }
  }
}
