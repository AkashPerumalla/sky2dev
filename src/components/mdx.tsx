import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

/**
 * MDX rendering.
 *
 * Compiled on the server at build time, so none of these plugins — including
 * the syntax highlighter — ship a single byte of JavaScript to the browser.
 * A 300-post archive costs the reader nothing extra.
 */

const prettyCodeOptions: PrettyCodeOptions = {
  /*
   * Both themes are baked in as CSS variables (--shiki-light / --shiki-dark)
   * and chosen by CSS in globals.css. That's why switching theme never
   * re-highlights or flashes.
   */
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  // Our own surface color is used instead, so code blocks match the page.
  keepBackground: false,
  // Ensures empty lines still occupy a row in the grid.
  defaultLang: "plaintext",
};

/**
 * Element overrides. Internal links route through `next/link` for client-side
 * navigation; external links get `target="_blank"` and a safe `rel`.
 */
const components = {
  a: ({ href = "", children, ...rest }: React.ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  },

  // Wrap tables so a wide one scrolls instead of blowing out the layout.
  table: ({ children, ...rest }: React.ComponentProps<"table">) => (
    <div className="-mx-1 overflow-x-auto">
      <table {...rest}>{children}</table>
    </div>
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: {
                    className: ["heading-anchor"],
                    ariaHidden: true,
                    tabIndex: -1,
                  },
                  content: { type: "text", value: "#" },
                },
              ],
              [rehypePrettyCode, prettyCodeOptions],
            ],
          },
        }}
      />
    </div>
  );
}
