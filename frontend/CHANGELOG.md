# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-03-18

### Added
- Full background image support in Hero section with WDU building photo
- Zoom animation on Hero background image (1x to 1.15x over 20 seconds)
- Separate `globals.css` file for custom styles (glass effects, gradients, animations, buttons)
- `animate-zoom-bg` CSS animation keyframes

### Changed
- Hero section now uses full-width background image positioned to the right
- Gradient overlay updated: solid white (left) transitioning to 30% opacity (right)
- Logo size reduced from `h-10` to `h-8` in Navbar and Footer for better proportion
- Navbar logo updated to use `wdu-ijo.png`
- CTA button text changed to "Download Company Profile"
- Tailwind `fontFamily` configuration updated to use direct font names instead of CSS variables

### Removed
- Testimonials section from main page
- Inline styles from `layout.tsx` (moved to `globals.css`)

## [1.0.0] - 2026-03-18

### Added
- Initial WDU CMS monorepo setup
- Backend with Express.js and Prisma ORM
- Frontend with Next.js 14, TypeScript, and Tailwind CSS
- Core components: Navbar, Hero, Services, Gallery, About, Footer
- Brand assets: logo.png and wdu-ijo.png
