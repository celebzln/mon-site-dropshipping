# NovaTrend - Dropshipping starter (Ready-to-deploy)

Ce dépôt contient un site React simple (Vite) prêt à déployer sur **Vercel** (ou Netlify).
Le site inclut :
- Landing, Boutique, Panier, Contact
- 5 produits sample (Montre, Lampe, Épilateur, Enceinte, Brosse visage)
- Endpoint serveur d'exemple pour Stripe (test) dans `/server/api/stripe.js`

## Contenu principal
- `/index.html` : page d'entrée
- `/src` : code React (App, main, styles)
- `/server` : exemple Express minimal pour créer une session Stripe côté serveur (utiliser sur Vercel / Railway / Render)

## Déploiement rapide (Vercel)
1. Crée un dépôt GitHub et pousse le contenu de ce dossier dessus.
2. Connecte ton dépôt sur https://vercel.com/new.
3. Vercel détecte automatiquement Vite. Clique sur **Deploy**.
4. Pour l'endpoint Stripe (server), ajoute une "Serverless Function" ou un dossier `api/` suivant la plateforme.

## Mode test Stripe
- Le fichier `server/api/stripe.js` contient un exemple d'implémentation utilisant `stripe` côté serveur.
- **NE PAS** mettre la clé secrète Stripe dans le client. Ajoute `STRIPE_SECRET_KEY` dans les variables d'environnement de la plateforme (ex : Vercel -> Settings -> Environment Variables).

## Si tu veux que je déploie pour toi
Dis-moi si tu veux que je te guide pas-à-pas pour :
- créer le dépôt GitHub,
- connecter Vercel et déployer,
- activer Stripe en mode test.

---
Généré le 2025-10-20T19:04:29.929309 UTC.
