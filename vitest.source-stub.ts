import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

type VirtualFile = {
  path: string;
  absolutePath: string;
  type: 'page';
  data: {
    title: string;
    description: string;
    body: () => null;
    toc: [];
  };
};

function EmptyBody() {
  return null;
}

function createCollection(dir: string) {
  return {
    toFumadocsSource() {
      return {
        files: () => readCollectionFiles(dir),
      };
    },
  };
}

function readCollectionFiles(dir: string): VirtualFile[] {
  const absoluteDir = path.join(process.cwd(), dir);
  if (!existsSync(absoluteDir)) {
    return [];
  }

  return walkMdxFiles(absoluteDir).map((absolutePath) => {
    const relativePath = path
      .relative(absoluteDir, absolutePath)
      .split(path.sep)
      .join('/');
    const frontmatter = parseFrontmatter(readFileSync(absolutePath, 'utf8'));

    return {
      path: relativePath,
      absolutePath,
      type: 'page',
      data: {
        title: frontmatter.title || titleFromPath(relativePath),
        description: frontmatter.description || '',
        body: EmptyBody,
        toc: [],
      },
    };
  });
}

function walkMdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkMdxFiles(absolutePath);
    }

    return /\.(md|mdx)$/.test(entry.name) ? [absolutePath] : [];
  });
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter((line): line is RegExpMatchArray => Boolean(line))
      .map((line) => [line[1], line[2].replace(/^['"]|['"]$/g, '').trim()])
  );
}

function titleFromPath(filePath: string) {
  return path
    .basename(filePath, path.extname(filePath))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const docs = createCollection('content/docs');
export const logs = createCollection('content/logs');
export const pages = createCollection('content/pages');
export const posts = createCollection('content/posts');
