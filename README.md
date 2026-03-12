# 🐝 ApiTrack — Le Rucher de Céline

Application de gestion apicole — Version bêta · Mars 2026

## Structure des fichiers

```
├── INDEX.html                 ← Page d'accueil
├── 01-tableau-de-bord.html    ← Module 01
├── 02-au-rucher.html          ← Module 02
├── 03-atelier.html            ← Module 03
├── 04-elevage-reines.html     ← Module 04
├── 06-vente.html              ← Module 06
├── firebase-config.js         ← ⚙️ À CONFIGURER
└── apitrack-nav.js            ← Navigation + Auth
```

## Configuration Firebase

### 1. Créer le projet Firebase
1. [console.firebase.google.com](https://console.firebase.google.com)
2. Créer projet → Activer **Authentication > Google**
3. Copier la config Web depuis **Project settings**

### 2. Remplir `firebase-config.js`
```js
const FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "mon-projet.firebaseapp.com",
  // ...
};
const ALLOWED_EMAILS = [
  "celine@gmail.com",
  "seconduser@gmail.com"
];
```

### 3. Déployer sur GitHub Pages
```bash
git init && git add . && git commit -m "deploy"
git remote add origin https://github.com/USER/apitrack.git
git push -u origin main
# Settings > Pages > main / root
```

### 4. Autoriser le domaine dans Firebase
Authentication > Settings > Authorized domains → ajouter `USER.github.io`

## Responsive
- **PC** : sidebar rétractable
- **Mobile** : navbar bottom (5 raccourcis + menu Plus)
