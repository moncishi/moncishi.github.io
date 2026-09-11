import * as fs from 'node:fs';
import * as path from 'node:path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

export interface FetchMarkdownOptions {
  savePath?: string;
  vendorId?: string;
}

/**
 * Configure Turndown for clean Markdown extraction of tables and pricing text.
 */
function createTurndown(): TurndownService {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
  });

  // Keep table tags and structure
  turndown.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: (content) => ` ${content.trim().replace(/\n+/g, ' ')} |`,
  });

  turndown.addRule('tableRow', {
    filter: 'tr',
    replacement: (content) => `|${content}\n`,
  });

  turndown.addRule('table', {
    filter: 'table',
    replacement: (content, node) => {
      const rows = content.trim().split('\n');
      if (rows.length === 0) return '';
      // Ensure header separator if missing
      const firstRow = rows[0];
      const colCount = (firstRow.match(/\|/g) || []).length - 1;
      if (rows.length > 1 && !rows[1].includes('---')) {
        const sep = `|${' --- |'.repeat(Math.max(colCount, 1))}`;
        rows.splice(1, 0, sep);
      }
      return `\n\n${rows.join('\n')}\n\n`;
    },
  });

  return turndown;
}

/**
 * Clean HTML by stripping navigation, footer, scripts, and non-content elements.
 */
export function cleanHtml(html: string): string {
  const $ = cheerio.load(html);

  // Remove scripts, styles, navigations, footers, etc.
  $('script, style, noscript, nav, footer, iframe, svg, .navbar, .footer, .pagination-nav, .tableOfContents').remove();

  // Try to find the primary content container
  const main = $('article, main, #__docusaurus, .content, .page-body, body').first();
  return main.length > 0 ? main.html() || html : html;
}

/**
 * Special extractor for bigmodel.cn (which uses client-side API).
 */
async function fetchBigModelMarkdown(): Promise<string> {
  const res = await fetch('https://bigmodel.cn/api/biz/operation/query?ids=1160,1161');
  if (!res.ok) {
    throw new Error(`Failed to fetch BigModel pricing API: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const items: string[] = ['# 智谱 BigModel 官方 API 价格总览\n'];

  if (Array.isArray(json.data)) {
    for (const d of json.data) {
      try {
        const content = typeof d.content === 'string' ? JSON.parse(d.content) : d.content;
        if (content.title) {
          items.push(`## ${content.title}\n`);
          if (content.subtitle) items.push(`> ${content.subtitle}\n`);
        }

        // Parse list of models
        if (Array.isArray(content.list)) {
          for (const m of content.list) {
            items.push(`### ${m.title || m.name}`);
            if (m.desc) items.push(`- 描述: ${m.desc}`);
            if (m.tag) items.push(`- 标签: ${m.tag}`);
            if (m.table?.modelList) {
              items.push('| 计费项 | 价格/规格 |');
              items.push('| --- | --- |');
              for (const row of m.table.modelList) {
                const keys = Object.keys(row).filter((k) => k !== 'sort');
                if (keys.length >= 2) {
                  const label = row[keys[0]]?.value || '';
                  const val = row[keys[1]]?.value || '';
                  items.push(`| ${label} | ${val} |`);
                }
              }
            }
            items.push('\n');
          }
        }

        // Parse tabs of models/services
        if (Array.isArray(content.tabs)) {
          for (const tab of content.tabs) {
            items.push(`### ${tab.title}\n`);
            if (Array.isArray(tab.cards)) {
              for (const card of tab.cards) {
                items.push(`#### ${card.title}`);
                if (card.desc) items.push(`- 说明: ${card.desc}`);
                if (Array.isArray(card.fieldList)) {
                  items.push('| 项目 | 内容 |');
                  items.push('| --- | --- |');
                  for (const f of card.fieldList) {
                    items.push(`| ${f.label} | ${(f.values || []).join('、')} |`);
                  }
                }
                items.push('\n');
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to parse a BigModel content block:', err);
      }
    }
  }

  return items.join('\n');
}

/**
 * Universal function to fetch a URL and convert it into clean Markdown.
 */
export async function fetchUrlToMarkdown(url: string, opts?: FetchMarkdownOptions): Promise<string> {
  let md: string;

  if (url.includes('bigmodel.cn')) {
    md = await fetchBigModelMarkdown();
  } else {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }

    const html = await res.text();
    const cleanedHtml = cleanHtml(html);
    const turndown = createTurndown();
    md = turndown.turndown(cleanedHtml);
  }

  // Persist to scratch directory if requested or if vendorId provided
  const savePath =
    opts?.savePath ??
    (opts?.vendorId
      ? path.resolve(process.cwd(), `.scratch/pricing-raw/${opts.vendorId}.md`)
      : undefined);

  if (savePath) {
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, md, 'utf-8');
  }

  return md;
}
