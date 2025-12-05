# Product Images Not Showing on Deployment - Fix Guide

## Problem
Product images are not displaying on the deployed site at http://147.79.66.79:3000/

## Root Cause
The `public` folder containing all product images (bags, nails, earrings, etc.) is not present or accessible on the deployed server.

## Diagnosis
- ✅ Images exist locally in `c:\Projects\presson-store\public\`
- ✅ Database has correct relative image paths (e.g., `/bags/bag1.jpg`)
- ❌ Images are missing on the deployed server

## Solutions

### Solution 1: Upload Public Folder to Deployment Server (Quick Fix)

1. **Connect to your deployment server** at `147.79.66.79`

2. **Locate your application directory** on the server (usually something like `/var/www/presson-store` or `/app`)

3. **Upload the entire `public` folder** from your local machine to the server:
   ```bash
   # Using SCP (from your local machine)
   scp -r c:\Projects\presson-store\public user@147.79.66.79:/path/to/your/app/
   
   # Or using SFTP
   # Or use an FTP client like FileZilla
   ```

4. **Verify the folder structure** on the server:
   ```
   /path/to/your/app/
   ├── public/
   │   ├── bags/
   │   │   ├── bag1.jpg
   │   │   ├── bag2.jpg
   │   │   └── ...
   │   ├── nails/
   │   │   ├── nail1.jpg
   │   │   └── ...
   │   ├── earrings/
   │   ├── rings/
   │   └── ...
   ```

5. **Restart your application** (if using PM2):
   ```bash
   pm2 restart all
   # or
   pm2 restart presson-store
   ```

### Solution 2: Use Cloud Storage (Production-Ready)

For better performance and scalability, upload images to a cloud service:

#### Option A: Cloudinary (Recommended)

1. **Sign up for Cloudinary** (free tier available)

2. **Upload all images** to Cloudinary

3. **Update database** with full Cloudinary URLs using the migration script below

4. **Run the migration API** endpoint

#### Option B: AWS S3, Google Cloud Storage, etc.

Similar process - upload images and update database with full URLs.

### Solution 3: Fix Deployment Configuration

If using Git deployment, ensure `public` folder is not in `.gitignore`:

1. **Check `.gitignore`**:
   ```bash
   # Make sure these lines are NOT in .gitignore
   # public/
   # public/**
   ```

2. **Commit and push public folder**:
   ```bash
   git add public/
   git commit -m "Add public folder with product images"
   git push
   ```

3. **Redeploy the application**

## Quick Test

Test if images are accessible directly:
- Try: http://147.79.66.79:3000/bags/bag1.jpg
- Try: http://147.79.66.79:3000/nails/nail1.jpg

If these return 404, the public folder is not deployed correctly.

## Image Inventory

Your local public folder contains:
- **Bags**: 26 images (bag1.jpg - bag27.jpg, missing bag25)
- **Nails**: 53 images (nail1.jpg - nail53.jpg)
- **Earrings**: Multiple images
- **Rings**: Multiple images
- **Other categories**: Multiple images

## Next Steps

1. Choose a solution above (Solution 1 is quickest)
2. Implement the chosen solution
3. Test the deployed site
4. If issues persist, check server logs for errors
