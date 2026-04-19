// This layout scopes highlight.js styles only to blog pages,
// removing them from the global bundle (~52KB saved on non-blog pages)
import "highlight.js/styles/github-dark.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
