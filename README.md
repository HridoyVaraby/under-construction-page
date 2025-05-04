# Modern "Under Construction" Page

A sleek, modern, and responsive "Coming Soon" / "Under Construction" page that you can use for any website while it's being developed.

## Features

- 🎨 Modern design with animations and particle effects
- ⏱️ Customizable countdown timer
- 📱 Fully responsive for all devices
- 📧 Email subscription form for launch notifications
- 🔗 Social media links
- 🌐 Easy to customize for any brand or website

## How to Use

1. Download all files: `index.html`, `styles.css`, `script.js`, `bg-abstract.png`, and `construction-icon.png`

2. Customize for your brand:
   - Update the "YourBrand" text in the HTML
   - Change countdown date in script.js (default is 30 days from loading)
   - Update social media links
   - Modify colors in styles.css (main colors are in gradients using #5e72eb and #ff77eb)

3. Upload to your web hosting:
   - Upload all files to your web server's root directory
   - Make sure all files are in the same directory
   - Set as index page or rename as needed

## Customization Options

### Change Countdown Date

In `script.js`, modify:

```javascript
// Set the date we're counting down to (30 days from now)
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 30);
```

Replace with a specific date:

```javascript
// Set specific launch date
const countDownDate = new Date("June 1, 2025 00:00:00").getTime();
```

### Change Colors

Main gradient colors can be found in `styles.css`:

```css
.highlight::after {
    background: linear-gradient(90deg, #5e72eb 0%, #ff77eb 100%);
}
```

Replace the hex codes with your brand colors.

### Replace Background Image

Simply replace `bg-abstract.png` with your own image of the same name, or update the image reference in `styles.css`:

```css
body {
    background-image: url('your-new-background.jpg');
}
```

## Credits

- Particles.js for interactive background
- Font Awesome for social media icons
- Google Fonts (Poppins and Montserrat)

## License

This template is free to use for both personal and commercial projects.

---

Enjoy your new under construction page! For any questions or customization help, please contact the creator.