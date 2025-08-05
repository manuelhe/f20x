import type { SiteConfig } from '@types'

const config: SiteConfig = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: 'https://f20x.com',
  // The name of your site, used in the title and for SEO.
  title: 'f20x',
  // The description of your site, used for SEO and RSS feed.
  description:
    'a blog about random web development topics',
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: 'Manuel Herrera',
  // Keywords for SEO, used in the meta tags.
  tags: ['Web Development', 'software', 'javascript', 'html', 'css'],
  // Path to the image used for generating social media previews.
  // Needs to be a square JPEG file due to limitations of the social card generator.
  // Try https://squoosh.app/ to easily convert images to JPEG.
  socialCardAvatarImage: './src/content/avatar.jpg',
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // For pagination, the number of posts to display per page.
  pageSize: 5,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Archive',
      url: '/posts',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/manuelhe/f20x',
      external: true,
    },
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: 'light-dark-auto',
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: 'slack-ochin',
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    // include: [
    //   'github-light',
    //   'github-dark',
    // ]
    include: [
      'slack-dark',
      'slack-ochin',
    ],
  },
  // Social links to display in the footer.
  socialLinks: {
    github: 'https://github.com/manuelhe',
    email: 'info@f20x.com',
    linkedin: 'https://linkedin.com/in/manuelhe',
    twitter: 'https://github.com/fractalsoftware',
    rss: true, // Set to true to include an RSS feed link in the footer
  },
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // If you don't want to use Giscus, set this to undefined.
  giscus: {
    repo: 'stelcodes/multiterm-astro',
    repoId: 'R_kgDOPNnBig',
    category: 'Giscus',
    categoryId: 'DIC_kwDOPNnBis4CteOc',
    reactionsEnabled: true, // Enable reactions on post itself
  },
}

export default config
