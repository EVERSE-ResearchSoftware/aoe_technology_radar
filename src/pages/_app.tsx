import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const css = `
/* ===== MODERN FONT ===== */
*, body, html, div, span, p, h1, h2, h3, h4, h5, h6, a, label, input, button {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
}

/* ===== RADAR DOTS ===== */
svg circle[class*="blip"] {
  stroke: white !important;
  stroke-width: 2 !important;
  opacity: 1 !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
}

svg circle[class*="blip"]:hover {
  r: 14 !important;
  stroke-width: 3 !important;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)) !important;
  z-index: 100 !important;
}

/* ===== TEXT LABELS ===== */
svg text {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  text-transform: uppercase !important;
  letter-spacing: 1.2px !important;
  fill: #2d3748 !important;
  stroke: white !important;
  stroke-width: 4 !important;
  paint-order: stroke !important;
}

/* ===== RING CIRCLES - WHITE DASHED ===== */
svg circle[fill="none"] {
  stroke: white !important;
  stroke-width: 3 !important;
  stroke-dasharray: 8, 5 !important;
  opacity: 0.95 !important;
}

/* ===== SEGMENT DIVIDING LINES - WHITE ===== */
svg line {
  stroke: white !important;
  stroke-width: 3 !important;
  opacity: 0.95 !important;
}

/* ===== BACKGROUND RECT ===== */
svg rect[fill="#fafafa"] {
  fill: #ffffff !important;
}

/* ===== LARGER RADAR CONTAINER ===== */
svg {
  width: 100% !important;
  height: 1000px !important;
  max-width: 1100px !important;
  margin: 2rem auto !important;
  display: block !important;
  background: #ffffff !important;
  border-radius: 12px !important;
  padding: 50px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
}

/* ===== LAYOUT ===== */
main {
  display: flex !important;
  flex-direction: column !important;
  gap: 3rem !important;
}

main > div > div:last-child {
  display: grid !important;
  grid-template-columns: 320px 1fr !important;
  gap: 2.5rem !important;
  width: 100% !important;
  margin-top: 2rem !important;
}

@media (max-width: 1024px) {
  main > div > div:last-child {
    grid-template-columns: 1fr !important;
  }
  
  svg {
    height: 700px !important;
    max-width: 700px !important;
  }
}

div[class*="TagFilter"] {
  position: sticky !important;
  top: 20px !important;
  height: fit-content !important;
  max-height: calc(100vh - 100px) !important;
  overflow-y: auto !important;
  padding: 1.5rem !important;
  background: #f8f9fa !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border: 2px solid #e0e0e0 !important;
}

a[href*="?tag"] {
  display: inline-block !important;
  padding: 0.5rem 1rem !important;
  margin: 0.25rem !important;
  background: white !important;
  border: 2px solid #ddd !important;
  border-radius: 6px !important;
  font-size: 0.9rem !important;
  text-decoration: none !important;
  transition: all 0.2s !important;
}

a[href*="?tag"]:hover {
  background: #007bff !important;
  color: white !important;
  border-color: #007bff !important;
  transform: translateY(-2px) !important;
}

input[type="search"] {
  width: 100% !important;
  max-width: 800px !important;
  padding: 1rem 1.5rem !important;
  font-size: 1.1rem !important;
  border: 2px solid #ddd !important;
  border-radius: 10px !important;
  margin: 1rem auto !important;
  display: block !important;
}

section {
  margin-bottom: 2rem !important;
  padding: 1.5rem !important;
  background: white !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important;
  border-left: 5px solid #007bff !important;
}

h1 {
  font-size: 2.8rem !important;
  margin-bottom: 1rem !important;
  text-align: center !important;
  font-weight: 700 !important;
}

h2 {
  font-size: 1.8rem !important;
  margin: 2rem 0 1rem !important;
  font-weight: 600 !important;
}

h3 {
  font-size: 1.4rem !important;
  margin: 1.5rem 0 0.75rem !important;
  font-weight: 600 !important;
}

/* ===== CONTRIBUTION FOOTER ===== */
#contribution-footer {
  margin-top: 4rem !important;
  padding: 3rem 2rem !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 12px !important;
  color: white !important;
}

#contribution-footer h3 {
  color: white !important;
  font-size: 1.6rem !important;
  margin-bottom: 1.5rem !important;
  text-align: center !important;
}

#contribution-footer .links-container {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  gap: 1rem !important;
  margin-top: 2rem !important;
}

#contribution-footer a {
  color: white !important;
  text-decoration: none !important;
  padding: 0.75rem 1.5rem !important;
  background: rgba(255, 255, 255, 0.15) !important;
  border-radius: 8px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  transition: all 0.3s !important;
  font-weight: 600 !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  font-size: 0.95rem !important;
}

#contribution-footer a:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  transform: translateY(-2px) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

#contribution-footer .link-icon {
  width: 20px !important;
  height: 20px !important;
  flex-shrink: 0 !important;
}
`;

    const oldStyle = document.getElementById('everse-radar-ui-fix');
    if (oldStyle) {
      oldStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'everse-radar-ui-fix';
    style.innerHTML = css;
    document.head.appendChild(style);
    
    console.log('✅ CSS Applied!');
    
    // DRAW SEGMENT FILLS WITH CORRECT SCALING
    setTimeout(() => {
      const svg = document.querySelector('svg');
      if (!svg) {
        console.error('❌ SVG not found!');
        return;
      }

      console.log('🎨 Drawing enhanced radar...');
      
      // IMPORTANT: Dynamically get the center and radius from actual SVG
      // Find the largest ring circle to get the outer radius
      const ringCircles = Array.from(svg.querySelectorAll('circle[fill="none"]'));
      let maxRadius = 0;
      let centerX = 0;
      let centerY = 0;
      
      ringCircles.forEach(circle => {
        const r = parseFloat(circle.getAttribute('r') || '0');
        const cx = parseFloat(circle.getAttribute('cx') || '0');
        const cy = parseFloat(circle.getAttribute('cy') || '0');
        
        if (r > maxRadius) {
          maxRadius = r;
          centerX = cx;
          centerY = cy;
        }
      });
      
      console.log(`📐 Radar center: (${centerX}, ${centerY}), outer radius: ${maxRadius}`);
      
      // Find all dividing lines
      const lines = Array.from(svg.querySelectorAll('line'));
      console.log(`Found ${lines.length} dividing lines`);
      
      // Calculate angles from lines
      const angles: number[] = [];
      lines.forEach(line => {
        const x2 = parseFloat(line.getAttribute('x2') || '0');
        const y2 = parseFloat(line.getAttribute('y2') || '0');
        
        const dx = x2 - centerX;
        const dy = y2 - centerY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angles.push(angle);
      });
      
      angles.sort((a, b) => a - b);
      console.log('Segment angles:', angles.map(a => a.toFixed(1)));
      
      // Segment colors from config
      const segmentColors = [
        '#A8E6CF', '#FFD3B6', '#FFAAA5', '#FF8B94', '#C7CEEA',
        '#B5EAD7', '#FFE5B4', '#D4A5A5', '#FFDFD3', '#E8DFF5', '#CCE2CB'
      ];
      
      // Remove old segment fills if they exist
      const oldSegmentGroup = svg.querySelector('#segment-fills');
      if (oldSegmentGroup) {
        oldSegmentGroup.remove();
      }
      
      // Create segment fills group
      const segmentGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      segmentGroup.id = 'segment-fills';
      
      // Draw each segment with the ACTUAL radius
      for (let i = 0; i < angles.length; i++) {
        const startAngle = angles[i];
        const endAngle = angles[(i + 1) % angles.length] || angles[0] + 360;
        
        const startRad = startAngle * Math.PI / 180;
        const endRad = endAngle * Math.PI / 180;
        
        // Use the actual maxRadius from the SVG
        const x1 = centerX + maxRadius * Math.cos(startRad);
        const y1 = centerY + maxRadius * Math.sin(startRad);
        const x2 = centerX + maxRadius * Math.cos(endRad);
        const y2 = centerY + maxRadius * Math.sin(endRad);
        
        const angleDiff = endAngle - startAngle;
        const largeArc = angleDiff > 180 ? 1 : 0;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathData = `M ${centerX},${centerY} L ${x1},${y1} A ${maxRadius},${maxRadius} 0 ${largeArc},1 ${x2},${y2} Z`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', segmentColors[i % segmentColors.length]);
        path.setAttribute('fill-opacity', '0.5');
        path.setAttribute('stroke', 'none');
        
        segmentGroup.appendChild(path);
        
        console.log(`✅ Segment ${i + 1}: angle ${startAngle.toFixed(1)}° to ${endAngle.toFixed(1)}°, color ${segmentColors[i % segmentColors.length]}`);
      }
      
      // Insert segment group as second element (after background rect, before rings)
      const rect = svg.querySelector('rect');
      if (rect && rect.nextSibling) {
        svg.insertBefore(segmentGroup, rect.nextSibling);
      } else {
        svg.insertBefore(segmentGroup, svg.firstChild);
      }
      
      console.log(`✅ Added ${angles.length} colored segments with radius ${maxRadius}`);
      
      // Add ring labels with correct positioning
      const ringLabels = ['ADOPT', 'TRIAL', 'ASSESS'];
      const ringRadiiFromCircles: number[] = [];
      
      // Get actual ring radii from circle elements
      ringCircles.forEach(circle => {
        const r = parseFloat(circle.getAttribute('r') || '0');
        if (r > 0) ringRadiiFromCircles.push(r);
      });
      ringRadiiFromCircles.sort((a, b) => a - b);
      
      console.log('Ring radii:', ringRadiiFromCircles);
      
      ringLabels.forEach((label, i) => {
        if (i < ringRadiiFromCircles.length) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.textContent = label;
          text.setAttribute('x', centerX.toString());
          text.setAttribute('y', (centerY - ringRadiiFromCircles[i] + 20).toString());
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('font-size', '14');
          text.setAttribute('font-weight', '700');
          text.setAttribute('fill', '#1a202c');
          text.setAttribute('opacity', '0.85');
          text.setAttribute('letter-spacing', '1.5');
          text.style.pointerEvents = 'none';
          
          svg.appendChild(text);
        }
      });
      
      console.log('✅ Added ring labels');
      
      // Add tooltips
      let tooltip = document.getElementById('radar-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'radar-tooltip';
        tooltip.style.cssText = `
          position: fixed;
          background: rgba(0, 0, 0, 0.92);
          color: white;
          padding: 0.85rem 1.2rem;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          pointer-events: none;
          z-index: 10000;
          display: none;
          max-width: 280px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        document.body.appendChild(tooltip);
      }

      const blips = svg.querySelectorAll('circle[class*="blip"]');
      blips.forEach((circle: Element) => {
        if (!(circle instanceof SVGCircleElement)) return;
        
        circle.addEventListener('mouseenter', function(this: SVGCircleElement) {
          const parent = this.parentElement;
          let toolName = parent?.getAttribute('aria-label') ||
                        parent?.querySelector('title')?.textContent ||
                        'Technology Tool';
          
          tooltip!.textContent = toolName;
          tooltip!.style.display = 'block';
        });

        circle.addEventListener('mousemove', function(e: MouseEvent) {
          tooltip!.style.left = (e.clientX + 18) + 'px';
          tooltip!.style.top = (e.clientY + 18) + 'px';
        });

        circle.addEventListener('mouseleave', function() {
          tooltip!.style.display = 'none';
        });
      });

      console.log('✅ Tooltips enabled');
      console.log('✨ Radar enhancement complete!');
      
    }, 1500);
    
    // Add contribution footer (separate timeout to ensure it runs)
    setTimeout(() => {
      addContributionFooter();
    }, 2000);
    
  }, []);

  // Add contribution links footer
  function addContributionFooter() {
    // Find the main element or the last div in body
    let targetElement = document.querySelector('main');
    if (!targetElement) {
      // Fallback: find the container with the radar
      const containers = document.querySelectorAll('body > div');
      targetElement = containers[containers.length - 1];
    }
    
    if (!targetElement) {
      console.error('❌ Could not find target element for footer');
      return;
    }
    
    // Check if footer already exists
    if (document.getElementById('contribution-footer')) {
      console.log('ℹ️ Footer already exists');
      return;
    }
    
    const footer = document.createElement('div');
    footer.id = 'contribution-footer';
    footer.innerHTML = `
      <h3>🚀 Get Involved with EVERSE Technology Radar</h3>
      <div class="links-container">
        <a href="https://github.com/EVERSE-ResearchSoftware/aoe_technology_radar" target="_blank" rel="noopener">
          <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Source Code
        </a>
        
        <a href="https://github.com/EVERSE-ResearchSoftware/aoe_technology_radar/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">
          <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          How to Contribute
        </a>
        
        <a href="https://github.com/EVERSE-ResearchSoftware/aoe_technology_radar/graphs/contributors" target="_blank" rel="noopener">
          <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          Contributors
        </a>
        
        <a href="https://github.com/EVERSE-ResearchSoftware/aoe_technology_radar/issues/new" target="_blank" rel="noopener">
          <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
          </svg>
          Suggest a Tool
        </a>
        
        <a href="https://everse.software" target="_blank" rel="noopener">
          <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          About EVERSE
        </a>
      </div>
    `;
    
    targetElement.appendChild(footer);
    console.log('✅ Added contribution footer');
  }

  return <Component {...pageProps} />
}
