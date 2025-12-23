# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static "Under Construction" / "Coming Soon" landing page with no build process or dependencies. It consists of three core files (HTML, CSS, JS) plus two image assets.

**File Structure:**
- `index.html` - Main page structure
- `styles.css` - All styling including responsive breakpoints
- `script.js` - Countdown timer, particle effects, form handling, and animations
- `bg-abstract.webp` - Background image (can be replaced)
- `construction-icon.webp` - Favicon/brand icon

## Key Architecture Details

### Countdown Timer Behavior
The countdown auto-resets every 15 days (not 30 as the README states). This is handled in `script.js:139-172`:
- Initial countdown is set to 15 days from page load
- When countdown reaches zero, it automatically extends by another 15 days via `countDownDate.setDate(countDownDate.getDate() + 15)`

### Particle Background
Uses `particles.js` loaded via CDN (`https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js`). Configuration is in `script.js:27-134`.

### Brand Colors
The gradient colors are hardcoded in multiple places:
- Primary: `#5e72eb` (purple-blue)
- Secondary: `#ff77eb` (pink)
- These appear in CSS (gradient text, buttons, hover states) and JS (particle link colors)

### External Dependencies
- Font Awesome 6.0.0 (CDN) - Social media icons
- Google Fonts: Poppins and Montserrat
- particles.js 2.0.0 (CDN) - Interactive particle background

## Customization Points

| What to Change | Where |
|----------------|-------|
| Countdown duration | `script.js:141` - change `+ 15` to desired days |
| Brand colors | `styles.css:101, 117, 171, 239, 307` - replace `#5e72eb` and `#ff77eb` |
| Social media links | `index.html:62-67` - update `href="#"` attributes |
| Logo/brand text | `index.html:23-28` |
| Background image | `styles.css:11` - change `url('bg-abstract.webp')` |

## Email Form Behavior

The subscribe form is client-side only with no backend integration:
- Empty emails trigger a shake animation
- Valid emails show a success message replacing the form content
- No data is actually stored or sent anywhere
