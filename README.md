# Abdullah Abbas Portfolio

Static GitHub Pages copy of Abdullah Abbas's mechanical engineering portfolio.

## Preview locally

```powershell
node scripts/serve.mjs
```

Then open `http://127.0.0.1:4173`.

## Publish on GitHub Pages

1. Create a GitHub repository. For the cleanest free URL, name it `<your-github-username>.github.io`.
2. Push this folder to the repository's `main` branch.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. GitHub will publish the site at `https://<your-github-username>.github.io/`.

## Use a custom domain

1. In **Settings → Pages → Custom domain**, enter the domain you own and save it first. With branch-based publishing, GitHub creates the required `CNAME` file for you.
2. At your domain registrar, point a `www` subdomain to `<your-github-username>.github.io` with a CNAME record. For an apex domain, use the DNS records shown by GitHub.
3. After DNS resolves, enable **Enforce HTTPS** in the Pages settings.

Do not add DNS records before saving the custom domain in GitHub. GitHub recommends this order to reduce domain-takeover risk.

## Refresh from the Lovable deployment

If the Lovable site changes, run:

```powershell
node scripts/sync-from-lovable.mjs
```

This downloads the latest compiled site, localizes its assets, removes the Lovable badge and analytics script, and updates the metadata.

Portfolio-specific projects, copy changes, and the meshing gear animation are reapplied by `scripts/project-customizations.mjs` whenever the site is refreshed.
