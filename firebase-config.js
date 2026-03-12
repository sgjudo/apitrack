// ═══════════════════════════════════════════════════════
//  ApiTrack — Configuration Firebase
//  INSTRUCTIONS : Remplacez les valeurs ci-dessous par
//  celles de votre projet Firebase Console.
// ═══════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            "VOTRE_API_KEY",
  authDomain:        "VOTRE_PROJECT.firebaseapp.com",
  projectId:         "VOTRE_PROJECT_ID",
  storageBucket:     "VOTRE_PROJECT.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};

// Emails autorisés (liste blanche — 2 utilisateurs)
const ALLOWED_EMAILS = [
  "celine@example.com",   // ← remplacez par le vrai email de Céline
  "second@example.com"    // ← remplacez par le 2ème utilisateur
];

// Pages de l'app (ordre sidebar)
const NAV_PAGES = [
  { id:"dashboard",  icon:"🏠", label:"Tableau de bord",  file:"01-tableau-de-bord.html", group:"principal"  },
  { id:"rucher",     icon:"🏕️", label:"Au Rucher",         file:"02-au-rucher.html",       group:"principal"  },
  { id:"atelier",    icon:"🔧", label:"Atelier",            file:"03-atelier.html",         group:"principal", badge:3 },
  { id:"recoltes",   icon:"🍯", label:"Récoltes",           file:null,                      group:"principal", soon:true },
  { id:"elevage",    icon:"👑", label:"Élevage Reines",     file:"04-elevage-reines.html",  group:"elevage"    },
  { id:"resultats",  icon:"📊", label:"Résultats",          file:null,                      group:"elevage",   soon:true },
  { id:"vente",      icon:"🛒", label:"Vente",              file:"06-vente.html",           group:"commerce"   },
  { id:"achats",     icon:"📦", label:"Achats",             file:null,                      group:"commerce",  soon:true },
  { id:"meteo",      icon:"🌤️", label:"Météo Ruchers",      file:null,                      group:"elevage",   soon:true },
];
