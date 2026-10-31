#!/usr/bin/env node
/**
 * Creates a new content file with valid frontmatter.
 *
 *   npm run new notes "Route params are a Promise now"
 *   npm run new writing "Static until proven otherwise"
 *   npm run new projects "My new thing"
 *   npm run new work "Senior Engineer at Somewhere"
 *
 * The entire point: publishing should never require remembering the schema.
 */

import fs from "node:fs";
import path from "node:path";

const COLLECTIONS = ["work", "projects", "writing", "notes"];

const [collection, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!collection || !COLLECTIONS.includes(collection) || !title) {
  console.error(
    `Usage: npm run new <${COLLECTIONS.join("|")}> "Entry title"\n\n` +
      `Example:\n  npm run new notes "Format build-time dates in UTC"`,
  );
  process.exit(1);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(title);

/** Frontmatter per collection, matching src/lib/content/schema.ts. */
const templates = {
  work: () => `---
title: ${title}
position: ${title}
company: Company name
companyUrl: https://example.com
location: City, Country
start: ${today}
# end: omit while you're still in this role
summary: One line on what you did here.
date: ${today}
tags: []
draft: true
---

What you actually changed here — systems, decisions, numbers.
`,

  projects: () => `---
title: ${title}
summary: One line on what this is and who it's for.
date: ${today}
status: active # active | shipped | experiment | archived
# repo: https://github.com/
# url: https://example.com
tech: []
tags: []
draft: true
---

## The problem

## The approach

## What I'd do differently
`,

  writing: () => `---
title: ${title}
summary: One line that makes someone want to read this.
date: ${today}
tags: []
draft: true
---

Opening paragraph.
`,

  notes: () => `---
title: ${title}
summary: The whole learning in one or two sentences.
date: ${today}
tags: []
# source: https://example.com
# sourceLabel: Where this came from
draft: true
---

Three sentences and a code block is a complete note.
`,
};

const dir = path.join(process.cwd(), "content", collection);
const file = path.join(dir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`✗ Already exists: content/${collection}/${slug}.md`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, templates[collection](), "utf8");

console.log(`✓ content/${collection}/${slug}.md`);
console.log(`  Created as a draft — remove \`draft: true\` to publish.`);
