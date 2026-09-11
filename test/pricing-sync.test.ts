import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { cleanHtml } from '../tools/pricing-sync/1-fetch-markdown.ts';
import { applyExtractedPricing } from '../tools/pricing-sync/3-apply-updates.ts';
import type { ExtractedModel } from '../tools/pricing-sync/types.ts';

test('cleanHtml removes script, style, and nav elements', () => {
  const dirtyHtml = `
    <html>
      <head><script>alert("bad")</script><style>body{color:red}</style></head>
      <body>
        <nav><a href="/">Home</a></nav>
        <main>
          <h1>API Pricing</h1>
          <p>Model A costs 10元/M</p>
        </main>
        <footer>Copyright 2026</footer>
      </body>
    </html>
  `;
  const cleaned = cleanHtml(dirtyHtml);
  assert.equal(cleaned.includes('<script>'), false);
  assert.equal(cleaned.includes('<style>'), false);
  assert.equal(cleaned.includes('<nav>'), false);
  assert.equal(cleaned.includes('<footer>'), false);
  assert.ok(cleaned.includes('API Pricing'));
  assert.ok(cleaned.includes('Model A costs 10元/M'));
});

test('applyExtractedPricing correctly creates model YAML file structure', () => {
  // Test with mock data in temporary directory
  const mockModels: ExtractedModel[] = [
    {
      id: 'test-llm-v1',
      name: 'Test LLM V1',
      modality: 'text',
      official: {
        input: 2.0,
        output: 8.0,
        cacheRead: 0.2,
        cacheWrite: 0,
        currency: 'CNY',
      },
      description: 'A mock model for testing',
    },
  ];

  // Run against actual content directory (safe test model, then clean up)
  const summary = applyExtractedPricing(mockModels, 'test-vendor', 'test-official');
  assert.ok(summary.createdModels.includes('test-llm-v1') || summary.updatedModels.includes('test-llm-v1'));

  const testFile = path.resolve(process.cwd(), 'src/content/models/test-llm-v1.yaml');
  assert.ok(fs.existsSync(testFile));
  const content = fs.readFileSync(testFile, 'utf-8');
  assert.ok(content.includes('id: test-llm-v1'));
  assert.ok(content.includes('input: 2'));
  assert.ok(content.includes('output: 8'));
  assert.ok(content.includes('currency: CNY'));

  // Cleanup test file
  fs.unlinkSync(testFile);
});
