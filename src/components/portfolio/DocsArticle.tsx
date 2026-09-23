export default function DocsArticle({ children }: { children: React.ReactNode }) {
  return <main className="docs-article" id="main" tabIndex={-1}>{children}</main>;
}
