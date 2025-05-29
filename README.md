# 🌐 Hestya Landing Page

A beautiful "Coming Soon" landing page for Hestya - Your community, connected.

## ✨ Features

- **Beautiful Design** - Modern glassmorphism UI with your brand colors
- **Responsive** - Perfect on all devices (mobile, tablet, desktop)
- **Interactive** - Animated elements and smooth transitions
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Performance** - Optimized for fast loading
- **Email Capture** - Waitlist signup functionality

## 🎨 Brand Colors

- **Primary Green**: `#34d399` (RGB: 52, 211, 153)
- **Secondary Green**: `#10b981` (RGB: 16, 185, 129)
- **Dark Green**: `#059669` (RGB: 5, 150, 105)

## 🚀 Quick Deploy to Vercel (FREE)

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TheSuperiorMostafa/Hestia2/tree/main/hestya-landing)

### Option 2: Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd hestya-landing
   vercel --prod
   ```

4. **Custom Domain** (Optional)
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Domains
   - Add `hestya.app` and `www.hestya.app`

## 🌍 Alternative Deployment Options

### Netlify (FREE)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `hestya-landing` folder
3. Your site is live!

### GitHub Pages (FREE)
1. Create a new repository
2. Upload files to the repository
3. Go to Settings → Pages
4. Select source branch
5. Your site is live at `username.github.io/repository-name`

### Firebase Hosting (FREE)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📁 File Structure

```
hestya-landing/
├── index.html          # Main landing page
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## 🛠 Customization

### Update Content
Edit `index.html` to customize:
- Company information
- Feature descriptions
- Social media links
- Contact email

### Update Colors
The CSS uses CSS variables for easy color changes:
```css
:root {
    --primary-green: #34d399;
    --secondary-green: #10b981;
    --dark-green: #059669;
}
```

### Add Email Collection
To collect emails, uncomment and modify the fetch code in the JavaScript:
```javascript
fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
});
```

## 📧 Email Collection Services

### Mailchimp Integration
```javascript
// Add to the form submission handler
fetch('https://your-mailchimp-endpoint.com/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email })
});
```

### ConvertKit Integration
```javascript
fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        api_key: 'YOUR_API_KEY',
        email: email 
    })
});
```

## 🔧 Performance Optimizations

- **Inline CSS** - No external stylesheets for faster loading
- **SVG Icons** - Scalable vector graphics for crisp display
- **Optimized Images** - SVG favicon for all resolutions
- **Minimal JavaScript** - Only essential interactions
- **Preconnect** - DNS prefetching for external resources

## 📱 Mobile Optimization

- Responsive design with mobile-first approach
- Touch-friendly interactive elements
- Optimized typography for small screens
- Smooth animations that work on mobile

## 🎯 SEO Features

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready

## 🔒 Security Headers

The Vercel configuration includes security headers:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 📊 Analytics Integration

To add Google Analytics, add this to the `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🎨 Design Features

- **Glassmorphism** - Modern frosted glass effects
- **Gradient Backgrounds** - Beautiful color transitions
- **Floating Animations** - Subtle movement for engagement
- **Interactive Hover Effects** - Responsive to user interaction
- **Smooth Transitions** - Polished user experience

## 🚀 Next Steps

1. **Deploy the landing page**
2. **Set up email collection**
3. **Add Google Analytics**
4. **Configure custom domain**
5. **Test on all devices**
6. **Share on social media**

## 📞 Support

If you need help with deployment or customization, the landing page is ready to go live immediately!

---

**Status**: ✅ Ready for deployment
**Estimated Setup Time**: 5 minutes
**Cost**: FREE on all recommended platforms 