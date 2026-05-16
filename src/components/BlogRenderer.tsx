import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogRendererProps = {
  content: string;
};

export default function BlogRenderer({ content }: BlogRendererProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:p-4 prose-code:text-sky-700 prose-a:text-sky-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const isBlock = Boolean(className);

            if (!isBlock) {
              return (
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm" {...rest}>
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
