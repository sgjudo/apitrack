// ═══════════════════════════════════════════════════════
//  ApiTrack — Configuration Firebase
//  INSTRUCTIONS : Remplacez les valeurs ci-dessous par
//  celles de votre projet Firebase Console.
// ═══════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBMwN1idPo4QdWQn0sG-bB7o-SfXbK8SGg",
  authDomain:        "rucher-9bb59.firebaseapp.com",
  projectId:         "rucher-9bb59",
  storageBucket:     "rucher-9bb59.firebasestorage.app",
  messagingSenderId: "1041501775027",
  appId:             "1:1041501775027:web:dc9bfe120366b0696d3cc6"
};

// Emails autorisés (liste blanche — 2 utilisateurs)
const ALLOWED_EMAILS = [
  "chrisbellot257@gmail.com",
  "celinegrieco@gmail.com"
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
