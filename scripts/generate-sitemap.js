#!/usr/bin/env node

/**
 * Sitemap Generator for Kaattal AI
 * Automatically generates sitemap.xml with current dates and proper URLs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kaattal-ai.vercel.app',
  outputPath: path.join(process.cwd(), 'public', 'sitemap.xml'),
  pages: [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      path: '/chat',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      path: '/upload',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: new Date().toISOString().split('T')[0]
    }
  ]
};

/**
 * Generate sitemap XML content
 */
function generateSitemapXML() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetEnd = '</urlset>';

  const urls = config.pages.map(page => {
    return `  <url>
    <loc>${config.baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}
${urlsetStart}
${urls}
${urlsetEnd}`;
}

/**
 * Write sitemap to file
 */
function writeSitemap() {
  try {
    const sitemapContent = generateSitemapXML();
    fs.writeFileSync(config.outputPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${config.outputPath}`);
    console.log(`🌐 Base URL: ${config.baseUrl}`);
    console.log(`📄 Pages included: ${config.pages.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

/**
 * Main execution
 */
if (require.main === module) {
  console.log('🚀 Generating sitemap for Kaattal AI...');
  writeSitemap();
}

module.exports = { generateSitemapXML, writeSitemap };
