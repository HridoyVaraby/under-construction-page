#!/usr/bin/env node

/**
 * CLI Configuration Script
 * Interactive setup for generating config.json
 * Run with: npm run configure
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Color presets for accent color
const COLOR_PRESETS = [
    { name: 'Electric Teal', value: '#0DFFD7', hover: '#00E5C0' },
    { name: 'International Orange', value: '#FF4F00', hover: '#E64500' },
    { name: 'Neon Purple', value: '#B537F2', hover: '#A020DD' },
    { name: 'Acid Green', value: '#CCFF00', hover: '#B8E600' },
    { name: 'Hot Pink', value: '#FF0080', hover: '#E60073' },
    { name: 'Ocean Blue', value: '#0066FF', hover: '#0052E6' },
    { name: 'Custom', value: null, hover: null }
];

// Default configuration
const defaultConfig = {
    company: {
        name: 'VARABIT',
        tagline: 'Crafted with intention'
    },
    logo: {
        type: 'svg',
        image: '',
        alt: 'VARABIT Logo'
    },
    page: {
        title: 'Something Remarkable is Coming',
        description: "We're building something remarkable. Stay tuned for launch.",
        metaTitle: 'Something Remarkable is Coming',
        metaDescription: "We're building something remarkable. Stay tuned for launch."
    },
    hero: {
        eyebrow: 'Launching 2025',
        title: ['Some', 'thing', 'Remarkable'],
        accentWord: 1,
        description: "We're engineering a new experience that will redefine expectations. The wait won't be long—and we promise it'll be worth it."
    },
    branding: {
        accentColor: '#0DFFD7',
        accentHover: '#00E5C0',
        accentGlow: 'rgba(13, 255, 215, 0.25)',
        accentDim: 'rgba(13, 255, 215, 0.12)'
    },
    countdown: {
        label: 'Launching In',
        initialDays: 15
    },
    subscribe: {
        title: 'Be the first to know',
        description: "Drop your email and we'll notify you the moment we launch.",
        buttonText: 'Notify Me',
        placeholder: 'your@email.com'
    },
    social: {
        twitter: '#',
        github: '#',
        linkedin: '#'
    }
};

// Helper function to prompt for input
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

// Helper to convert hex to RGB for rgba values
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Helper to create rgba string
function createRgba(hex, alpha) {
    const rgb = hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : null;
}

// Display header
function printHeader() {
    console.log('\n' + '='.repeat(50));
    console.log('  Under Construction Page - Configuration');
    console.log('='.repeat(50));
    console.log('\nThis wizard will help you configure the page for a new client.');
    console.log('Press Enter to use the default value shown in [brackets].\n');
}

// Display success message
function printSuccess(config) {
    console.log('\n' + '='.repeat(50));
    console.log('  ✓ Configuration Complete!');
    console.log('='.repeat(50));
    console.log(`\nCompany: ${config.company.name}`);
    console.log(`Tagline: ${config.company.tagline}`);
    console.log(`Accent Color: ${config.branding.accentColor}`);
    console.log(`\nconfig.json has been created successfully.`);

    if (config.logo.type === 'image' && config.logo.image) {
        console.log(`\nLogo: ${config.logo.image}`);
        console.log('Make sure the logo file exists in the assets/ directory.');
    }

    console.log('\nNext steps:');
    console.log('  1. Review config.json if needed');
    console.log('  2. Run "npm run admin" for visual editing (optional)');
    console.log('  3. Deploy files to your client\'s server\n');
}

// Main configuration function
async function configure() {
    printHeader();

    const config = JSON.parse(JSON.stringify(defaultConfig));

    // Company Information
    console.log('\n--- Company Information ---');
    const companyName = await question(`Company name [${config.company.name}]: `);
    if (companyName.trim()) config.company.name = companyName.trim();

    const tagline = await question(`Tagline [${config.company.tagline}]: `);
    if (tagline.trim()) config.company.tagline = tagline.trim();

    // Logo
    console.log('\n--- Logo ---');
    const useCustomLogo = await question('Use custom logo image? (y/N): ');
    if (useCustomLogo.toLowerCase() === 'y') {
        config.logo.type = 'image';
        const logoPath = await question('Logo filename (e.g., client-logo.png): ');
        if (logoPath.trim()) {
            config.logo.image = logoPath.startsWith('assets/')
                ? logoPath.trim()
                : `assets/${logoPath.trim()}`;
        }
        config.logo.alt = `${config.company.name} Logo`;
    }

    // Page Meta
    console.log('\n--- Page Meta ---');
    const metaTitle = await question(`Page title [${config.company.name}]: `);
    const finalTitle = metaTitle.trim() || config.company.name;
    config.page.metaTitle = `${config.page.title} | ${finalTitle}`;
    config.page.metaDescription = config.page.metaDescription.replace('VARABIT', finalTitle);

    // Hero Section
    console.log('\n--- Hero Section ---');
    const eyebrow = await question(`Eyebrow text [${config.hero.eyebrow}]: `);
    if (eyebrow.trim()) config.hero.eyebrow = eyebrow.trim();

    const title = await question(`Hero title (3 words, comma-separated) [Some,thing,Remarkable]: `);
    if (title.trim()) {
        config.hero.title = title.split(',').map(t => t.trim());
    }

    const description = await question(`Hero description [press Enter to keep default]: `);
    if (description.trim()) config.hero.description = description.trim();

    // Branding Colors
    console.log('\n--- Branding Colors ---');
    console.log('Select an accent color:');
    COLOR_PRESETS.forEach((preset, i) => {
        if (preset.value) {
            console.log(`  ${i + 1}. ${preset.name} (${preset.value})`);
        } else {
            console.log(`  ${i + 1}. ${preset.name}`);
        }
    });

    const colorChoice = await question('Choice [1]: ');
    const choiceIndex = parseInt(colorChoice) - 1;

    if (choiceIndex >= 0 && choiceIndex < COLOR_PRESETS.length) {
        const preset = COLOR_PRESETS[choiceIndex];
        if (preset.value) {
            config.branding.accentColor = preset.value;
            config.branding.accentHover = preset.hover;
            config.branding.accentGlow = createRgba(preset.value, '0.25');
            config.branding.accentDim = createRgba(preset.value, '0.12');
        } else {
            // Custom color
            const customColor = await question('Enter hex color (e.g., #FF0080): ');
            if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
                config.branding.accentColor = customColor;
                config.branding.accentHover = customColor;
                config.branding.accentGlow = createRgba(customColor, '0.25');
                config.branding.accentDim = createRgba(customColor, '0.12');
            }
        }
    }

    // Countdown
    console.log('\n--- Countdown ---');
    const countdownLabel = await question(`Countdown label [${config.countdown.label}]: `);
    if (countdownLabel.trim()) config.countdown.label = countdownLabel.trim();

    const days = await question(`Initial countdown days [${config.countdown.initialDays}]: `);
    if (days.trim() && !isNaN(parseInt(days))) {
        config.countdown.initialDays = parseInt(days);
    }

    // Social Links
    console.log('\n--- Social Media Links ---');
    const twitter = await question('Twitter URL [press Enter to skip]: ');
    if (twitter.trim()) config.social.twitter = twitter.trim();

    const github = await question('GitHub URL [press Enter to skip]: ');
    if (github.trim()) config.social.github = github.trim();

    const linkedin = await question('LinkedIn URL [press Enter to skip]: ');
    if (linkedin.trim()) config.social.linkedin = linkedin.trim();

    rl.close();

    // Write config.json
    const configPath = path.join(__dirname, '..', 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    printSuccess(config);
}

// Run configuration
configure().catch(err => {
    console.error('Error:', err.message);
    rl.close();
    process.exit(1);
});
