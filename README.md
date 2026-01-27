# Hash Future School Website

This is the source code for the Hash Future School website (hashfuture.school).

## 🚀 Deployment

### Option 1: Vercel (Recommended)

This project is configured for Vercel.

1.  **Install Vercel CLI:** `npm i -g vercel`
2.  **Deploy:** Run `vercel` in this directory.
3.  **Production Deploy:** Run `vercel --prod` to deploy to production.

Alternatively, connect this repository to your Vercel dashboard for automatic deployments on push.

### Option 2: AWS S3 + CloudFront

To deploy to AWS, you will need an S3 bucket configured for static website hosting and (optionally) a CloudFront distribution.

1.  **Configure AWS CLI:** Ensure you have access keys set up.
2.  **Sync to S3:**
    ```bash
    aws s3 sync . s3://your-bucket-name --exclude ".git/*" --exclude "node_modules/*"
    ```
3.  **Invalidate CloudFront Cache:**
    ```bash
    aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
    ```

### Option 3: GitHub Pages

You can enable GitHub Pages in the repository settings:
1.  Go to Settings > Pages.
2.  Select the `main` branch as the source.

## 🛠 Local Development

To run the site locally:

```bash
npx serve .
```

Open [http://localhost:3000](http://localhost:3000) to view it.
