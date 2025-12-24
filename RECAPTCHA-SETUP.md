# reCAPTCHA Configuration Guide

## Step 1: Get Your reCAPTCHA Keys

1. **Go to reCAPTCHA Admin Console:**
   - Visit: https://www.google.com/recaptcha/admin/create

2. **Register a New Site:**
   - **Label:** Enter a name (e.g., "Lokeshwaran Portfolio")
   - **reCAPTCHA type:** Select **"reCAPTCHA v2"**
   - **Choose:** ☑️ **"I'm not a robot" Checkbox**
   - **Domains:** Add your domains:
     - `lokeshwaranramu.com`
     - `www.lokeshwaranramu.com`
     - `lokeshwaranramu.github.io` (for testing)
     - `localhost` (for local testing)
   - **Accept reCAPTCHA Terms of Service:** ✓
   - Click **"Submit"**

3. **Copy Your Keys:**
   You'll receive two keys:
   - **Site Key** (public) - Use this in your HTML
   - **Secret Key** (private) - Keep this secure, use in backend

## Step 2: Update Your HTML

Replace the placeholder site key in `index-antigravity.html`:

**Find this line (around line 890):**
```html
<div class="g-recaptcha" data-sitekey="6LdYourSiteKeyHere"></div>
```

**Replace with your actual Site Key:**
```html
<div class="g-recaptcha" data-sitekey="YOUR_ACTUAL_SITE_KEY_HERE"></div>
```

**Example:**
```html
<div class="g-recaptcha" data-sitekey="6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"></div>
```

## Step 3: Configure EmailJS Backend

Since you're using EmailJS, you need to add the Secret Key to EmailJS:

1. **Login to EmailJS:**
   - Visit: https://dashboard.emailjs.com/

2. **Go to your Email Service:**
   - Click on your service (service_hln8j1b)

3. **Enable reCAPTCHA:**
   - Look for "reCAPTCHA" or "Security" settings
   - Paste your **Secret Key**
   - Save settings

## Step 4: Test the Implementation

1. **Open your website**
2. **Go to Contact form**
3. **You should see:**
   ```
   ☐ I'm not a robot
   ```
4. **Check the box**
5. **Fill out the form**
6. **Submit**

### Testing Checklist:
- [ ] reCAPTCHA widget appears
- [ ] Checkbox is clickable
- [ ] Form cannot submit without checking the box
- [ ] Form submits successfully after checking
- [ ] Success message appears

## Troubleshooting

### Issue: reCAPTCHA not showing

**Check:**
1. Site Key is correct (not the Secret Key!)
2. Domain is registered in reCAPTCHA admin
3. Script is loaded: `<script src="https://www.google.com/recaptcha/api.js" async defer></script>`
4. No console errors (F12 → Console tab)

**Common Error:**
```
ERROR for site owner: Invalid domain for site key
```
**Solution:** Add your domain in reCAPTCHA admin console

### Issue: "Invalid site key"

**Solution:**
- Double-check you copied the **Site Key** (not Secret Key)
- Ensure no extra spaces in the key
- Re-generate keys if needed

### Issue: reCAPTCHA shows but form doesn't submit

**Solution:**
- Check EmailJS Secret Key is configured
- Look for JavaScript errors in console
- Verify EmailJS service is active

### Issue: reCAPTCHA works locally but not on production

**Solution:**
- Add production domain to reCAPTCHA admin
- Wait 30 minutes for DNS propagation
- Clear browser cache

## Advanced Configuration

### Customize Appearance

**Theme (Light/Dark):**
```html
<div class="g-recaptcha" 
     data-sitekey="YOUR_KEY" 
     data-theme="dark"></div>
```

**Size (Normal/Compact):**
```html
<div class="g-recaptcha" 
     data-sitekey="YOUR_KEY" 
     data-size="compact"></div>
```

**Both Options:**
```html
<div class="g-recaptcha" 
     data-sitekey="YOUR_KEY" 
     data-theme="dark"
     data-size="compact"></div>
```

### Responsive Styling

Already included in your CSS! The reCAPTCHA widget will automatically adjust to mobile screens.

## Security Best Practices

✅ **DO:**
- Use your Site Key in HTML (it's public)
- Keep Secret Key secure (never expose in frontend)
- Use HTTPS on production
- Register all your domains

❌ **DON'T:**
- Share your Secret Key publicly
- Use the same keys across multiple sites
- Skip backend verification

## Quick Reference

**Site Key Location:** `index-antigravity.html` line ~890
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

**Script Location:** `index-antigravity.html` line ~52
```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

**Form Handler:** `assets/js/antigravity-main.js` line ~760
```javascript
const recaptchaResponse = grecaptcha.getResponse();
if (!recaptchaResponse) {
  showFormStatus('Please complete the reCAPTCHA verification.', 'error');
  return;
}
```

## Example Configuration

**Your reCAPTCHA Setup:**
```
Label: Lokeshwaran Portfolio
Type: reCAPTCHA v2 ("I'm not a robot")
Domains:
  - lokeshwaranramu.com
  - www.lokeshwaranramu.com
  - lokeshwaranramu.github.io
  - localhost

Site Key: 6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (Use in HTML)
Secret Key: 6LeYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY (Use in EmailJS)
```

## Testing URLs

**Local Testing:**
- http://localhost:5500/index-antigravity.html
- http://127.0.0.1:5500/index-antigravity.html

**Production Testing:**
- https://www.lokeshwaranramu.com
- https://lokeshwaranramu.github.io/index-antigravity.html

## Support

**Official Documentation:**
- reCAPTCHA Docs: https://developers.google.com/recaptcha/docs/display
- EmailJS reCAPTCHA: https://www.emailjs.com/docs/user-guide/adding-captcha-verification/

**Need Help?**
- reCAPTCHA not appearing? Check browser console for errors
- Form not submitting? Verify EmailJS Secret Key is configured
- Still stuck? Test in incognito mode to rule out browser extensions

---

**Estimated Setup Time:** 5-10 minutes

**Once configured, you're protected from spam! 🛡️**
