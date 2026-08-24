# Byeolter Website

Astro website for [byeolter.com](https://byeolter.com).

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-cloudflare.yml`.
Create a Cloudflare Pages project named `byeolter`, then add these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` — token with Cloudflare Pages edit access
- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID

Every push to `main` will build the Astro site and deploy `dist` to Cloudflare Pages. Attach
`byeolter.com` to the Pages project in Cloudflare's Custom Domains settings.
