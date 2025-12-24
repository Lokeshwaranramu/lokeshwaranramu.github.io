# Minification & Optimization Guide

This guide explains how to minify CSS and JavaScript files for production deployment.

## Quick Setup

### Option 1: Online Minifiers (Easiest)

1. **CSS Minification:**
   - Go to https://cssminifier.com/
   - Copy contents of `assets/css/antigravity-style.css`
   - Paste and minify
   - Save as `assets/css/antigravity-style.min.css`

2. **JavaScript Minification:**
   - Go to https://javascript-minifier.com/
   - Copy contents of `assets/js/antigravity-main.js`
   - Paste and minify
   - Save as `assets/js/antigravity-main.min.js`

3. **Update HTML:**
   - Change CSS link: `antigravity-style.css` → `antigravity-style.min.css`
   - Change JS script: `antigravity-main.js` → `antigravity-main.min.js`

### Option 2: Node.js Build Tools (Recommended for Automation)

```bash
# Install dependencies
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o assets/css/antigravity-style.min.css assets/css/antigravity-style.css

# Minify JavaScript
uglifyjs assets/js/antigravity-main.js -o assets/js/antigravity-main.min.js -c -m
```

### Option 3: VS Code Extension

1. Install "Minify" extension by HookyQR
2. Right-click on CSS/JS files
3. Select "Minify" from context menu

## WebP Image Conversion

Convert PNG/JPG images to WebP format for better performance:

### Using Online Tools:
- https://cloudconvert.com/png-to-webp
- https://squoosh.app/

### Using Command Line (cwebp):

```bash
# Install cwebp
# Windows: Download from https://developers.google.com/speed/webp/download
# Mac: brew install webp
# Linux: sudo apt-get install webp

# Convert images
cwebp assets/img/COCETPIMAGE.png -o assets/img/COCETPIMAGE.webp -q 80
cwebp assets/img/SEOMC.png -o assets/img/SEOMC.webp -q 80
```

## Build Script (package.json)

Create a `package.json` file in the root directory:

```json
{
  "name": "lokeshwaran-portfolio",
  "version": "1.0.0",
  "scripts": {
    "minify:css": "cleancss -o assets/css/antigravity-style.min.css assets/css/antigravity-style.css",
    "minify:js": "uglifyjs assets/js/antigravity-main.js -o assets/js/antigravity-main.min.js -c -m",
    "minify": "npm run minify:css && npm run minify:js",
    "build": "npm run minify"
  },
  "devDependencies": {
    "clean-css-cli": "^5.6.2",
    "uglify-js": "^3.17.4"
  }
}
```

Then run:
```bash
npm install
npm run build
```

## File Size Comparison (Expected)

| File | Original | Minified | Savings |
|------|----------|----------|---------|
| antigravity-style.css | ~60 KB | ~45 KB | ~25% |
| antigravity-main.js | ~25 KB | ~15 KB | ~40% |

## Production Checklist

- [ ] Minify CSS files
- [ ] Minify JavaScript files
- [ ] Convert images to WebP (with PNG/JPG fallbacks)
- [ ] Update HTML to reference minified files
- [ ] Upload `.htaccess` for server compression
- [ ] Test all functionality after minification
- [ ] Verify reCAPTCHA site key is updated (replace placeholder)
- [ ] Test PWA installation
- [ ] Verify dark mode toggle works
- [ ] Check GitHub stats are loading
- [ ] Confirm visitor counter is working

## reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Register your domain
3. Get your Site Key
4. Replace `6LdYourSiteKeyHere` in `index-antigravity.html` with your actual Site Key
5. Add Secret Key to your backend/EmailJS settings

## Performance Testing

After deployment, test your site:

1. **Google PageSpeed Insights:** https://pagespeed.web.dev/
2. **GTmetrix:** https://gtmetrix.com/
3. **WebPageTest:** https://www.webpagetest.org/

Target Scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

## Deployment

1. Commit changes to GitHub
2. Push to main branch
3. GitHub Pages will automatically deploy
4. Wait 2-5 minutes for propagation
5. Clear browser cache and test

## Maintenance

- Rerun minification after any CSS/JS changes
- Update version numbers in service-worker.js to force cache refresh
- Monitor Google Analytics for performance metrics
- Update Trailblazer stats manually in `antigravity-main.js`

## Troubleshooting

**Issue:** Minified files break functionality
- **Solution:** Use source maps or revert to non-minified versions for debugging

**Issue:** Service Worker not updating
- **Solution:** Increment version in `service-worker.js` (e.g., v1 → v2)

**Issue:** WebP images not showing
- **Solution:** Ensure fallback to PNG/JPG is working, check .htaccess configuration

**Issue:** Dark mode not persisting
- **Solution:** Check localStorage is enabled in browser, clear storage and test

---

For questions or issues, refer to the main README.md or contact the developer.
