/**
 * Minimal Markdown → safe HTML for product manuals (no external deps).
 * Escapes HTML first, then applies a small subset of Markdown.
 */
export function simpleMarkdownToHtml(source: string): string {
  const escaped = escapeHtml(String(source || "").replace(/\r\n/g, "\n").trim());
  if (!escaped) return "";

  const blocks = escaped.split(/\n{2,}/);
  const html: string[] = [];

  for (const rawBlock of blocks) {
    const block = rawBlock.trim();
    if (!block) continue;

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
      html.push("<hr />");
      continue;
    }

    if (block.startsWith("# ")) {
      html.push(`<h1>${inline(block.slice(2))}</h1>`);
      continue;
    }
    if (block.startsWith("## ")) {
      html.push(`<h2>${inline(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith("### ")) {
      html.push(`<h3>${inline(block.slice(4))}</h3>`);
      continue;
    }

    const lines = block.split("\n");
    if (isTable(lines)) {
      html.push(renderTable(lines));
      continue;
    }

    if (lines.every((line) => /^[-*]\s+/.test(line))) {
      html.push(
        `<ul>${lines
          .map((line) => `<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`)
          .join("")}</ul>`,
      );
      continue;
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line))) {
      html.push(
        `<ol>${lines
          .map((line) => `<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`)
          .join("")}</ol>`,
      );
      continue;
    }

    html.push(`<p>${inline(lines.join("<br />"))}</p>`);
  }

  return html.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    );
}

function isTable(lines: string[]): boolean {
  if (lines.length < 2) return false;
  if (!lines.every((line) => line.includes("|"))) return false;
  return /^\|?[\s:-]+\|[\s|:-]+$/.test(lines[1].trim());
}

function renderTable(lines: string[]): string {
  const rows = lines
    .filter((_, index) => index !== 1)
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    );
  const [header, ...body] = rows;
  if (!header) return "";
  return `<table><thead><tr>${header
    .map((cell) => `<th>${inline(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`,
    )
    .join("")}</tbody></table>`;
}
