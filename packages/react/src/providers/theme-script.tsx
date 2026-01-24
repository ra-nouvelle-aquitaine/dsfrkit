export interface ThemeScriptProps {
  /**
   * Clé de stockage localStorage (doit correspondre à ThemeProvider)
   * @default 'dsfrkit-theme'
   */
  storageKey?: string
  /**
   * Attribut à appliquer sur l'élément html
   * @default 'class'
   */
  attribute?: 'class' | 'data-theme'
  /**
   * Thème par défaut si aucun n'est stocké
   * @default 'system'
   */
  defaultTheme?: 'light' | 'dark' | 'system'
  /**
   * Utiliser un nonce pour CSP
   */
  nonce?: string
}

/**
 * Script inline pour éviter le flash de thème au chargement
 * Doit être placé dans le <head> AVANT tout CSS ou React
 *
 * Ce script s'exécute de manière synchrone avant le rendu,
 * appliquant immédiatement la classe de thème sur <html>
 *
 * @example
 * ```tsx
 * // Next.js App Router - app/layout.tsx
 * import { ThemeScript } from '@dsfrkit/react/providers'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="fr" suppressHydrationWarning>
 *       <head>
 *         <ThemeScript />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Next.js Pages Router - pages/_document.tsx
 * import { ThemeScript } from '@dsfrkit/react/providers'
 *
 * export default function Document() {
 *   return (
 *     <Html lang="fr" suppressHydrationWarning>
 *       <Head>
 *         <ThemeScript />
 *       </Head>
 *       <body>
 *         <Main />
 *         <NextScript />
 *       </body>
 *     </Html>
 *   )
 * }
 * ```
 */
export function ThemeScript({
  storageKey = 'dsfrkit-theme',
  attribute = 'class',
  defaultTheme = 'system',
  nonce,
}: ThemeScriptProps) {
  const script = `
(function() {
  try {
    var stored = localStorage.getItem('${storageKey}');
    var theme = stored || '${defaultTheme}';
    var resolved;

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    var root = document.documentElement;
    ${
      attribute === 'class'
        ? `root.classList.remove('light', 'dark');
    root.classList.add(resolved);`
        : `root.removeAttribute('data-theme');
    root.setAttribute('data-theme', resolved);`
    }
    root.setAttribute('data-fr-theme', resolved);
  } catch (e) {}
})();
`.trim()

  // biome-ignore lint/security/noDangerouslySetInnerHtml: script inline intentionnel pour initialisation du thème
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: script }} />
}

/**
 * Variante du script qui retourne juste le code JS
 * Utile pour les cas où vous devez injecter le script manuellement
 */
export function getThemeScriptContent(options: Omit<ThemeScriptProps, 'nonce'> = {}): string {
  const { storageKey = 'dsfrkit-theme', attribute = 'class', defaultTheme = 'system' } = options

  return `
(function() {
  try {
    var stored = localStorage.getItem('${storageKey}');
    var theme = stored || '${defaultTheme}';
    var resolved;

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    var root = document.documentElement;
    ${
      attribute === 'class'
        ? `root.classList.remove('light', 'dark');
    root.classList.add(resolved);`
        : `root.removeAttribute('data-theme');
    root.setAttribute('data-theme', resolved);`
    }
    root.setAttribute('data-fr-theme', resolved);
  } catch (e) {}
})();
`.trim()
}
