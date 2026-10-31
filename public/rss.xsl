<?xml version="1.0" encoding="UTF-8"?>
<!--
  Makes the RSS feed readable when opened in a browser.

  Browsers stopped rendering feeds natively, so a reader who clicks the RSS link
  gets raw XML and a scary "no style information" warning. This stylesheet is
  applied by browsers and ignored entirely by feed readers, which parse the
  underlying XML as usual — so the feed stays valid while becoming a real page.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS</title>
        <style>
          :root {
            --bg: #fdfdfc; --surface: #f5f5f4; --fg: #18181b;
            --muted: #5c5c66; --faint: #8e8e98; --line: #e6e6e3;
            --accent: #2448d8; --accent-soft: #edf0fe;
            color-scheme: light;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #0b0b0d; --surface: #15151a; --fg: #ededf0;
              --muted: #9b9ba6; --faint: #6d6d78; --line: #27272e;
              --accent: #90a8ff; --accent-soft: #181d33;
              color-scheme: dark;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 3.5rem 1.25rem;
            background: var(--bg); color: var(--fg);
            font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .wrap { max-width: 44rem; margin: 0 auto; }
          .banner {
            padding: .875rem 1.125rem; margin-bottom: 2.5rem;
            border: 1px solid var(--line); border-left: 2px solid var(--accent);
            border-radius: .5rem; background: var(--accent-soft);
            font-size: .875rem; color: var(--muted);
          }
          .banner strong { color: var(--fg); }
          h1 { margin: 0; font-size: 1.75rem; letter-spacing: -.02em; }
          .desc { margin: .625rem 0 0; color: var(--muted); }
          .home {
            display: inline-block; margin-top: 1rem; font-size: .875rem;
            color: var(--accent); text-decoration: none;
          }
          .home:hover { text-decoration: underline; }
          h2.count {
            margin: 3rem 0 0; padding-bottom: .5rem;
            border-bottom: 1px solid var(--line);
            font-size: .6875rem; font-weight: 600; text-transform: uppercase;
            letter-spacing: .12em; color: var(--faint);
            font-family: ui-monospace, SFMono-Regular, monospace;
          }
          article { padding: 1.5rem 0; border-bottom: 1px solid var(--line); }
          article h3 { margin: .35rem 0 0; font-size: 1.0625rem; font-weight: 600; }
          article h3 a { color: inherit; text-decoration: none; }
          article h3 a:hover { color: var(--accent); }
          .meta {
            font: .6875rem/1.4 ui-monospace, SFMono-Regular, monospace;
            color: var(--faint);
          }
          .summary { margin: .5rem 0 0; color: var(--muted); font-size: .9375rem; }
          footer { margin-top: 3rem; font-size: .8125rem; color: var(--faint); }
          code {
            padding: .1em .35em; border-radius: .25rem;
            background: var(--surface); border: 1px solid var(--line);
            font-family: ui-monospace, SFMono-Regular, monospace; font-size: .85em;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="banner">
            <strong>This is an RSS feed.</strong> Paste this page's address into
            a feed reader to get new posts and notes automatically — no email,
            no algorithm, no account.
          </div>

          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="desc"><xsl:value-of select="/rss/channel/description" /></p>
          <a class="home">
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link" />
            </xsl:attribute>
            ← Back to the site
          </a>

          <h2 class="count">
            <xsl:value-of select="count(/rss/channel/item)" /> recent entries
          </h2>

          <xsl:for-each select="/rss/channel/item">
            <article>
              <div class="meta"><xsl:value-of select="pubDate" /></div>
              <h3>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h3>
              <p class="summary"><xsl:value-of select="description" /></p>
            </article>
          </xsl:for-each>

          <footer>
            Feed URL: <code><xsl:value-of select="/rss/channel/link" />/rss.xml</code>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
