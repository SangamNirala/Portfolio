import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-background rounded transition-colors text-muted-foreground hover:text-foreground"
      title="Copy code"
      data-testid="button-copy-code"
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

export const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const code = String(children).replace(/\n$/, "");

    if (inline) {
      return (
        <code className="bg-background/50 px-2 py-1 rounded text-primary/90 font-mono text-xs border border-border/30">
          {children}
        </code>
      );
    }

    return (
      <div className="my-3 rounded-lg overflow-hidden border border-border/30">
        <div className="flex items-center justify-between bg-background/50 px-4 py-2 border-b border-border/20">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
          <CopyButton code={code} />
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  },
  ul({ children }: any) {
    return (
      <ul className="my-2 space-y-1 pl-4">
        {children}
      </ul>
    );
  },
  li({ children }: any) {
    return (
      <li className="flex gap-2 text-sm">
        <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
        <span>{children}</span>
      </li>
    );
  },
  p({ children }: any) {
    return <p className="mb-3 text-sm leading-relaxed">{children}</p>;
  },
  h1({ children }: any) {
    return <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>;
  },
  h2({ children }: any) {
    return <h2 className="text-base font-bold mb-2 text-foreground">{children}</h2>;
  },
  h3({ children }: any) {
    return <h3 className="text-sm font-semibold mb-2 text-foreground">{children}</h3>;
  },
  strong({ children }: any) {
    return <strong className="font-semibold text-foreground">{children}</strong>;
  },
  em({ children }: any) {
    return <em className="italic">{children}</em>;
  },
  blockquote({ children }: any) {
    return (
      <blockquote className="border-l-3 border-primary pl-3 my-2 py-1 italic text-muted-foreground">
        {children}
      </blockquote>
    );
  },
};
