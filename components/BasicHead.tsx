const favicon192 = "https://www.pkmn.help/favicon-192.png";

let csp = [
  "default-src 'self' https://plausible.io;",
  "script-src 'self' https://plausible.io;",
  "img-src 'self' https://plausible.io;",
  "style-src 'self' 'unsafe-inline';",
].join(" ");

if (process.env.NODE_ENV === "development") {
  csp = "";
}

interface BasicHeadProps {
  title?: string;
  description?: string;
}

const BasicHead: React.FC<BasicHeadProps> = ({
  title = "Pokémon Type Calculator",
  description = "A Pokémon type calculator to show strengths/weaknesses of different type combinations",
}) => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="content-security-policy" content={csp} />
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <link rel="icon" sizes="16x16" href="/favicon-16.png" />
      <link rel="icon" sizes="32x32" href="/favicon-32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="og:image" content={favicon192} />
      <meta name="twitter:image" content={favicon192} />
      <meta name="twitter:image:src" content={favicon192} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@wavebeem" />
      <meta name="twitter:creator" content="@wavebeem" />
      <script
        async
        defer
        data-domain="pkmn.help"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </>
  );
};

export default BasicHead;
