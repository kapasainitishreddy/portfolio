const contents = [
  ["Overview", "overview"],
  ["Selected work", "work"],
  ["Experience", "experience"],
  ["Systems & tools", "systems"],
  ["How I work", "method"],
  ["Lab", "lab"],
  ["Writing", "writing"],
  ["About", "about"],
  ["Contact", "contact"],
] as const;

export default function DocsContents() {
  return (
    <aside className="docs-toc" aria-label="On this page">
      <p className="docs-toc-title">On this page</p>
      <nav>
        {contents.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="docs-toc-note">
        <span className="status-dot" />
        <p><strong>Open to work</strong><br />Forward-deployed, product engineering, and applied AI roles.</p>
      </div>
    </aside>
  );
}
