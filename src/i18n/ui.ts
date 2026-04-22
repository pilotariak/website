// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  fr: {
    // ── Nav ──────────────────────────────────────────────────────
    'nav.ariaHome': 'Pilotariak — Accueil',
    'nav.ariaMain': 'Navigation principale',
    'nav.pelote': 'Pelote Basque',
    'nav.projets': 'Projets',
    'nav.openMenu': 'Ouvrir le menu',

    // ── Footer ───────────────────────────────────────────────────
    'footer.ariaHome': 'Pilotariak — Accueil',
    'footer.ariaNav': 'Liens du pied de page',

    // ── Hero (index) ─────────────────────────────────────────────
    'hero.ariaLabel': 'Présentation de Pilotariak',
    'hero.eyebrow': 'Open Source · Pelote Basque',
    'hero.subtitle':
      "Une suite d'outils open source pour la communauté de la pelote basque — données, API et applications mobiles réunis sous un même toit.",
    'hero.cta.discover': 'Découvrir les projets',

    // ── Projects ─────────────────────────────────────────────────
    'projects.sport.eyebrow': 'Le sport',
    'projects.sport.title': 'La pelote basque',
    'projects.sport.body1':
      "Né au cœur du Pays Basque, ce sport ancestral se décline en une dizaine de spécialités — de la Cesta Punta au Grand Chistera, en passant par la Paleta et le Xare. Pratiquée des deux côtés des Pyrénées, la pelote basque rassemble des milliers de joueurs et de passionnés autour d'une culture sportive unique.",
    'projects.sport.body2':
      "Pilotariak est né de cette passion. Notre mission\u00a0: rendre les données, les résultats et la communauté accessibles à tous, via des outils ouverts et modernes.",
    'projects.eyebrow': 'Les projets',
    'projects.title': 'Des outils open source',
    'projects.frontis.body':
      "La passerelle GraphQL centralisée pour toutes les données de la pelote basque. Frontis expose une API unifiée pour accéder aux compétitions, résultats, joueurs et frontons — conçue pour les développeurs et les intégrateurs.",
    'projects.frontis.ariaLabel': 'Technologies',
    'projects.kancha.body':
      "L'application mobile de la communauté pelote basque. Kancha regroupe résultats en direct, calendrier des compétitions, profils de joueurs et carte des frontons — disponible sur iPhone et Android.",
    'projects.kancha.ariaLabel': 'Plateformes',
    'projects.xilo.body':
      "Le bot Slack de la communauté Pilotariak. Xilo s'intègre dans vos espaces de travail Slack pour apporter les données et commandes de la pelote basque directement dans vos canaux.",
    'projects.xilo.ariaLabel': 'Technologies',
    'projects.learnMore': 'En savoir plus',

    // ── Features ─────────────────────────────────────────────────
    'features.eyebrow': 'Fonctionnalités',
    'features.title': 'Tout ce dont vous avez besoin',
    'features.subtitle':
      "Une plateforme pensée par des passionnés, pour les passionnés. De la pelote basque dans toutes ses spécialités, couverte comme elle le mérite.",

    // ── Stats ────────────────────────────────────────────────────
    'stats.eyebrow': 'La pelote en chiffres',
    'stats.title': 'Un sport vivant, une communauté passionnée',
    'stats.subtitle':
      "Pilotariak centralise des données qui permettent de suivre l'évolution de la pelote basque dans toutes ses dimensions — du terrain aux archives.",
    'stats.cta': 'Découvrir la plateforme',
    'stats.ariaLabel': 'Chiffres clés de Pilotariak',

    // ── Competitions ─────────────────────────────────────────────
    'competitions.eyebrow': 'Compétitions',
    'competitions.title': 'Suivez les championnats en direct',
    'competitions.subtitle':
      "Des tournois locaux aux championnats professionnels — toutes les compétitions de pelote basque réunies sur une seule plateforme.",
    'competitions.badge.ongoing': 'En cours',
    'competitions.badge.open': 'Inscriptions ouvertes',
    'competitions.badge.upcoming': 'À venir',
    'competitions.stat.players': 'Joueurs',
    'competitions.stat.matches': 'Matchs',
    'competitions.stat.next': 'Prochain match',
    'competitions.cta': 'Voir les résultats',
    'competitions.ctaAll': 'Voir toutes les compétitions',

    // ── CTA (home) ───────────────────────────────────────────────
    'cta.eyebrow': 'Rejoignez la communauté',
    'cta.title': 'La pelote basque,\ncomme vous ne l\'avez jamais suivie',
    'cta.subtitle':
      "Créez votre compte gratuitement et accédez à tous les résultats, profils de joueurs et calendriers de la saison.",
    'cta.signup': 'Créer un compte gratuit',
    'cta.viewCompetitions': 'Voir les compétitions',
    'cta.note': 'Gratuit · Aucune carte bancaire requise · Données mises à jour en temps réel',

    // ── Pages meta ───────────────────────────────────────────────
    'index.title': 'Pilotariak — Open Source pour la pelote basque',
    'index.description':
      "Une suite d'outils open source pour la communauté de la pelote basque : Frontis la passerelle GraphQL et Kancha l'application mobile iOS & Android.",
    'frontis.meta.title': 'Frontis — API GraphQL | Pilotariak',
    'frontis.meta.description':
      "Frontis est la passerelle GraphQL de Pilotariak. Elle unifie cinq domaines de données en une seule API — compétitions, clubs, résultats et spécialités.",
    'kancha.meta.title': 'Kancha — Application mobile pelote basque | Pilotariak',
    'kancha.meta.description':
      "Kancha est l'application mobile iOS et Android de Pilotariak. Résultats en direct, compétitions, spécialités et phases de tournoi — disponible sur iPhone et Android.",
    'xilo.meta.title': 'Xilo — Bot Slack Pilotariak | Pilotariak',
    'xilo.meta.description':
      "Xilo est le bot Slack de Pilotariak. Commandes slash, événements et données de la pelote basque — directement dans votre espace de travail Slack.",

    // ── Frontis page ─────────────────────────────────────────────
    'frontis.hero.ariaLabel': 'Frontis — API GraphQL pour la pelote basque',
    'frontis.hero.back': 'Pilotariak',
    'frontis.hero.eyebrow': 'GraphQL · Open Source · Fédération',
    'frontis.hero.subtitle':
      "L'API GraphQL de Pilotariak — cinq domaines de données, un seul point d'entrée. Conçue pour les développeurs qui veulent accéder aux données de la pelote basque.",
    'frontis.hero.github': 'Voir sur GitHub',
    'frontis.hero.architecture': 'Comment ça marche',

    'frontis.overview.eyebrow': "Vue d'ensemble",
    'frontis.overview.title': 'Une API unifiée pour toutes les données',
    'frontis.overview.subtitle':
      "Frontis fédère cinq services indépendants en un seul point d'entrée GraphQL. Chaque domaine dispose de son propre schéma et de son propre cycle de déploiement.",

    'frontis.subgraph.echo': "Healthcheck et version de l'API.",
    'frontis.subgraph.categories': "Catégories de compétition — propriétaire de l'entité <code>Category</code>.",
    'frontis.subgraph.clubs': "Clubs de pelote basque — propriétaire de l'entité <code>Club</code>.",
    'frontis.subgraph.competitions':
      "Championnats et tournois — propriétaire de l'entité <code>Competition</code>.",
    'frontis.subgraph.results': "Résultats de matchs — propriétaire de l'entité <code>Result</code>.",
    'frontis.subgraph.specialties':
      "Spécialités de pelote — propriétaire de l'entité <code>Specialty</code>.",

    'frontis.arch.eyebrow': 'Comment ça marche',
    'frontis.arch.title': 'Simple, ouvert, extensible',
    'frontis.arch.subtitle':
      "Chaque service gère son propre domaine. La passerelle compose automatiquement les schémas et résout les requêtes cross-domaine.",
    'frontis.arch.01.title': 'Schéma fédéré',
    'frontis.arch.01.body':
      "Chaque service expose son propre schéma GraphQL et déclare les entités qu'il possède. La passerelle compose un supergraphe cohérent sans configuration manuelle.",
    'frontis.arch.02.title': 'Un seul point d\'entrée',
    'frontis.arch.02.body':
      "Les clients envoient leurs requêtes à un seul endpoint <code>/graphql</code>. La passerelle résout les champs à travers les services de manière transparente.",
    'frontis.arch.03.title': 'Multi-ligue',
    'frontis.arch.03.body':
      "Une seule instance de l'API dessert toutes les ligues. Un header de requête sélectionne le jeu de données actif — aucun déploiement par ligue.",
    'frontis.arch.04.title': 'Sécurité des requêtes',
    'frontis.arch.04.body':
      "Des limites sur la profondeur, la complexité et la taille des requêtes protègent l'API contre les opérations coûteuses — configurables par environnement.",

    'frontis.federation.eyebrow': 'Fédération GraphQL',
    'frontis.federation.subtitle':
      "Chaque service déclare les types qu'il possède. La passerelle résout automatiquement les champs qui traversent plusieurs services.",
    'frontis.federation.entities.eyebrow': 'Entités fédérées',
    'frontis.federation.table.entity': 'Entité',
    'frontis.federation.table.owner': 'Service',
    'frontis.federation.table.key': 'Clé',
    'frontis.federation.code.label': 'Résolution cross-service',
    'frontis.federation.code': `# Requête client :
{ results { clubA { name } } }

# La passerelle :
# 1. Récupère les Result avec clubA { id }
#    → service results
# 2. Envoie _entities([{ __typename:"Club", id }])
#    → service clubs
# 3. Fusionne { name } dans la réponse`,

    'frontis.contribute.eyebrow': 'Open Source · Apache 2.0',
    'frontis.contribute.title': 'Construisez-le avec nous',
    'frontis.contribute.subtitle':
      "Frontis est open source et accueille toutes les contributions — nouveaux sous-graphes, corrections de bugs ou amélioration de la documentation.",
    'frontis.contribute.step1.title': 'Forker & lancer en local',
    'frontis.contribute.step1.desc':
      "Clonez le dépôt, installez les dépendances et lancez le gateway Apollo localement.",
    'frontis.contribute.step2.title': 'Ouvrir une issue',
    'frontis.contribute.step2.desc':
      "Un bug ou une idée ? Les issues GitHub sont le bon endroit pour en discuter et suivre l'avancement.",
    'frontis.contribute.step3.title': 'Soumettre une pull request',
    'frontis.contribute.step3.desc':
      "Toutes les pull requests sont examinées. Consultez le guide de contribution dans le dépôt pour les conventions.",
    'frontis.contribute.github': 'Voir sur GitHub',
    'frontis.contribute.back': "← Retour à l'accueil",

    // ── Kancha page ──────────────────────────────────────────────
    'kancha.hero.ariaLabel': 'Kancha — Application mobile pelote basque',
    'kancha.hero.back': 'Pilotariak',
    'kancha.hero.eyebrow': 'Application mobile · iOS & Android',
    'kancha.hero.subtitle':
      "Les résultats de vos compétitions de pelote basque — par spécialité, par catégorie, organisés phase par phase. Sur iPhone et Android.",
    'kancha.hero.github': 'Voir sur GitHub',
    'kancha.hero.howItWorks': 'Comment ça marche',

    'kancha.flow.eyebrow': 'Comment ça marche',
    'kancha.flow.title': 'Vos résultats à portée de main',
    'kancha.flow.subtitle':
      "Kancha vous guide du choix de la compétition jusqu'au tableau complet, sans friction.",
    'kancha.step1.title': 'Choisissez une compétition',
    'kancha.step1.desc':
      "La compétition principale est mise en avant. Les autres sont listées en dessous, filtrables par ligue et par année.",
    'kancha.step2.title': 'Sélectionnez une spécialité',
    'kancha.step2.desc':
      "Main nue, pala, chistera, rebot — chaque discipline a ses propres résultats et son propre tableau.",
    'kancha.step3.title': 'Filtrez par catégorie',
    'kancha.step3.desc':
      "Seniors, juniors, femmes, vétérans — affinez pour afficher le bon tableau et les bons joueurs.",
    'kancha.step4.title': 'Consultez les résultats par phase',
    'kancha.step4.desc':
      "Poules, huitièmes, quarts, demi-finales et finale — dans l'ordre, avec scores et compositions d'équipes.",

    'kancha.leagues.eyebrow': 'Ligues & comités',
    'kancha.leagues.title': 'Comités supportés',
    'kancha.leagues.subtitle':
      "Kancha est actuellement connecté à un comité, avec d'autres intégrations prévues au fil des développements.",
    'kancha.leagues.badge.available': 'Disponible',
    'kancha.leagues.badge.planned': 'Prévu',

    'kancha.features.eyebrow': 'Fonctionnalités',
    'kancha.features.title': "Ce que fait l'application",
    'kancha.features.subtitle':
      "Kancha est pensé pour les passionnés de pelote basque — simple, rapide, et tout ce dont vous avez besoin.",
    'kancha.features.f1.title': 'Résultats phase par phase',
    'kancha.features.f1.desc':
      "Des poules à la finale — scores, compositions et phases dans une vue claire et organisée.",
    'kancha.features.f2.title': 'Toutes les spécialités',
    'kancha.features.f2.desc':
      "Main nue, pala, grand chistera, cesta punta, xare — chaque discipline avec ses propres tableaux.",
    'kancha.features.f3.title': 'Filtre par catégorie',
    'kancha.features.f3.desc':
      "Seniors, juniors, femmes, vétérans — affinez pour afficher exactement le bon tableau.",
    'kancha.features.f4.title': 'Multi-ligues',
    'kancha.features.f4.desc':
      "Connecté à plusieurs comités régionaux. Une seule application pour toutes les compétitions.",
    'kancha.features.f5.title': 'Calendrier des compétitions',
    'kancha.features.f5.desc':
      "Tournois à venir, résultats récents et compétitions en cours — consultables d'un coup d'œil.",
    'kancha.features.f6.title': 'Données ouvertes',
    'kancha.features.f6.desc':
      "Propulsé par Frontis, l'API GraphQL open source de Pilotariak — toutes les données sont communautaires.",

    'kancha.download.eyebrow': 'Télécharger',
    'kancha.download.title': 'Bientôt disponible sur iOS & Android',
    'kancha.download.subtitle':
      "Kancha est en développement actif. Suivez le projet sur GitHub pour être notifié lors du lancement sur l'App Store et Google Play.",
    'kancha.download.comingSoon': 'Bientôt',
    'kancha.download.github': 'Suivre sur GitHub',

    'kancha.web.eyebrow': 'Version web',
    'kancha.web.title': 'Aussi disponible dans le navigateur',
    'kancha.web.subtitle':
      "Consultez les résultats et compétitions directement depuis votre navigateur, sans installation.",
    'kancha.web.cta': 'Ouvrir l\'application web',

    'kancha.contribute.eyebrow': 'Open Source · Apache 2.0',
    'kancha.contribute.title': 'Construisez-le avec nous',
    'kancha.contribute.subtitle':
      "Kancha est open source et accueille toutes les contributions — rapports de bugs, nouvelles fonctionnalités ou documentation.",
    'kancha.contribute.step1.title': 'Forker & lancer en local',
    'kancha.contribute.step1.desc':
      "Clonez le dépôt, installez les dépendances avec npm et lancez sur votre appareil via Expo Go.",
    'kancha.contribute.step2.title': 'Ouvrir une issue',
    'kancha.contribute.step2.desc':
      "Un bug ou une idée ? Les issues GitHub sont le bon endroit pour en discuter et suivre l'avancement.",
    'kancha.contribute.step3.title': 'Soumettre une pull request',
    'kancha.contribute.step3.desc':
      "Toutes les pull requests sont examinées. Consultez le guide de contribution dans le dépôt pour les conventions.",
    'kancha.contribute.github': 'Voir sur GitHub',
    'kancha.contribute.back': "← Retour à l'accueil",

    // ── Xilo page ────────────────────────────────────────────────
    'xilo.hero.ariaLabel': 'Xilo — Bot Slack Pilotariak',
    'xilo.hero.back': 'Pilotariak',
    'xilo.hero.eyebrow': 'Slack Bot · Open Source',
    'xilo.hero.subtitle':
      "Le bot Slack de la communauté Pilotariak — commandes slash et événements directement dans vos canaux.",
    'xilo.hero.github': 'Voir sur GitHub',
    'xilo.hero.howItWorks': 'Comment ça marche',

    'xilo.setup.eyebrow': 'Comment ça marche',
    'xilo.setup.title': 'Opérationnel en trois étapes',
    'xilo.setup.subtitle':
      "Xilo s'intègre à votre espace Slack en quelques minutes.",
    'xilo.step1.title': "Créez votre application Slack",
    'xilo.step1.desc':
      "Rendez-vous sur api.slack.com, créez une nouvelle application et configurez les permissions de bot et les événements nécessaires.",
    'xilo.step2.title': "Invitez Xilo dans un canal",
    'xilo.step2.desc':
      "Installez l'application dans votre espace Slack et invitez @Xilo dans les canaux de votre communauté pelote basque.",
    'xilo.step3.title': 'Utilisez les commandes slash',
    'xilo.step3.desc':
      "Tapez <code>/xilo help</code> pour découvrir toutes les commandes disponibles. Le bot répond instantanément dans le canal.",

    'xilo.commands.eyebrow': 'Commandes disponibles',
    'xilo.commands.title': 'Contrôlez Xilo depuis Slack',
    'xilo.commands.subtitle':
      "Toutes les commandes sont disponibles via le préfixe <code>/xilo</code> dans n'importe quel canal où le bot est invité.",
    'xilo.commands.cmd.help.desc': "Affiche la liste des commandes disponibles et leur utilisation.",
    'xilo.commands.cmd.ping.desc': "Vérifie que le bot est opérationnel — poste une réponse dans le canal.",
    'xilo.commands.cmd.hello.desc': "Salue le canal avec un message personnalisé facultatif.",

    'xilo.features.eyebrow': 'Fonctionnalités',
    'xilo.features.title': 'Ce que fait Xilo',
    'xilo.features.subtitle':
      "Un bot léger, sécurisé et déployé à la périphérie du réseau pour une latence minimale.",
    'xilo.features.f1.title': 'Commandes slash',
    'xilo.features.f1.desc':
      "Déclenchez des actions directement depuis Slack avec des commandes <code>/xilo</code> intuitives.",
    'xilo.features.f2.title': 'Événements en temps réel',
    'xilo.features.f2.desc':
      "Répond aux mentions et aux messages — réactions automatiques dans vos canaux.",
    'xilo.features.f3.title': 'Sécurité HMAC-SHA256',
    'xilo.features.f3.desc':
      "Chaque requête Slack est vérifiée cryptographiquement. Protection contre les rejeux (fenêtre 5 min).",
    'xilo.features.f4.title': 'Toujours disponible',
    'xilo.features.f4.desc':
      "Hébergé sur une infrastructure serverless distribuée — zéro maintenance, disponible en permanence pour votre communauté.",
    'xilo.features.f5.title': 'Traitement asynchrone',
    'xilo.features.f5.desc':
      "Accusé de réception immédiat à Slack, traitement en arrière-plan pour les opérations longues.",
    'xilo.features.f6.title': 'Open Source',
    'xilo.features.f6.desc':
      "Code source Apache 2.0 sur GitHub — forker, adapter, contribuer.",

    'xilo.contribute.eyebrow': 'Open Source · Apache 2.0',
    'xilo.contribute.title': 'Construisez-le avec nous',
    'xilo.contribute.subtitle':
      "Xilo est open source et accueille toutes les contributions — nouvelles commandes, intégrations de données ou corrections de bugs.",
    'xilo.contribute.step1.title': 'Forker & installer',
    'xilo.contribute.step1.desc':
      "Clonez le dépôt et installez les dépendances. Configurez vos secrets Slack pour lancer le bot localement.",
    'xilo.contribute.step2.title': 'Ouvrir une issue',
    'xilo.contribute.step2.desc':
      "Une idée de commande ou un bug ? Les issues GitHub sont le bon endroit pour en discuter.",
    'xilo.contribute.step3.title': 'Soumettre une pull request',
    'xilo.contribute.step3.desc':
      "Toutes les contributions sont examinées. Consultez le guide de contribution dans le dépôt pour les conventions.",
    'xilo.contribute.github': 'Voir sur GitHub',
    'xilo.contribute.back': "← Retour à l'accueil",
  },

  en: {
    // ── Nav ──────────────────────────────────────────────────────
    'nav.ariaHome': 'Pilotariak — Home',
    'nav.ariaMain': 'Main navigation',
    'nav.pelote': 'Basque Pelota',
    'nav.projets': 'Projects',
    'nav.openMenu': 'Open menu',

    // ── Footer ───────────────────────────────────────────────────
    'footer.ariaHome': 'Pilotariak — Home',
    'footer.ariaNav': 'Footer links',

    // ── Hero (index) ─────────────────────────────────────────────
    'hero.ariaLabel': 'About Pilotariak',
    'hero.eyebrow': 'Open Source · Basque Pelota',
    'hero.subtitle':
      'An open source toolkit for the Basque pelota community — data, APIs and mobile apps, all under one roof.',
    'hero.cta.discover': 'Discover the projects',

    // ── Projects ─────────────────────────────────────────────────
    'projects.sport.eyebrow': 'The sport',
    'projects.sport.title': 'Basque Pelota',
    'projects.sport.body1':
      'Born in the heart of the Basque Country, this ancient sport encompasses around ten disciplines — from Cesta Punta to Grand Chistera, Paleta and Xare. Played on both sides of the Pyrenees, Basque pelota brings together thousands of players and fans around a unique sporting culture.',
    'projects.sport.body2':
      'Pilotariak was born from this passion. Our mission: make data, results and the community accessible to everyone through open, modern tools.',
    'projects.eyebrow': 'Projects',
    'projects.title': 'Open source tools',
    'projects.frontis.body':
      'The centralised GraphQL gateway for all Basque pelota data. Frontis exposes a unified API to access competitions, results, players and frontons — designed for developers and integrators.',
    'projects.frontis.ariaLabel': 'Technologies',
    'projects.kancha.body':
      'The mobile app for the Basque pelota community. Kancha brings together live results, competition calendars, player profiles and a fronton map — available on iPhone and Android.',
    'projects.kancha.ariaLabel': 'Platforms',
    'projects.xilo.body':
      "The Slack bot for the Pilotariak community. Xilo integrates into your Slack workspaces to bring Basque pelota data and commands directly into your channels.",
    'projects.xilo.ariaLabel': 'Technologies',
    'projects.learnMore': 'Learn more',

    // ── Features ─────────────────────────────────────────────────
    'features.eyebrow': 'Features',
    'features.title': 'Everything you need',
    'features.subtitle':
      'A platform built by enthusiasts, for enthusiasts. Basque pelota in all its disciplines, covered the way it deserves.',

    // ── Stats ────────────────────────────────────────────────────
    'stats.eyebrow': 'Pelota by the numbers',
    'stats.title': 'A living sport, a passionate community',
    'stats.subtitle':
      'Pilotariak centralises data to track the evolution of Basque pelota across all its dimensions — from the court to the archives.',
    'stats.cta': 'Discover the platform',
    'stats.ariaLabel': 'Pilotariak key figures',

    // ── Competitions ─────────────────────────────────────────────
    'competitions.eyebrow': 'Competitions',
    'competitions.title': 'Follow the championships live',
    'competitions.subtitle':
      'From local tournaments to professional championships — all Basque pelota competitions on a single platform.',
    'competitions.badge.ongoing': 'In progress',
    'competitions.badge.open': 'Open registrations',
    'competitions.badge.upcoming': 'Upcoming',
    'competitions.stat.players': 'Players',
    'competitions.stat.matches': 'Matches',
    'competitions.stat.next': 'Next match',
    'competitions.cta': 'See results',
    'competitions.ctaAll': 'See all competitions',

    // ── CTA (home) ───────────────────────────────────────────────
    'cta.eyebrow': 'Join the community',
    'cta.title': "Basque pelota,\nlike you've never followed it before",
    'cta.subtitle':
      'Create your free account and access all results, player profiles and season schedules.',
    'cta.signup': 'Create a free account',
    'cta.viewCompetitions': 'View competitions',
    'cta.note': 'Free · No credit card required · Real-time data updates',

    // ── Pages meta ───────────────────────────────────────────────
    'index.title': 'Pilotariak — Open Source for Basque Pelota',
    'index.description':
      'An open source toolkit for the Basque pelota community: Frontis the GraphQL gateway and Kancha the iOS & Android mobile app.',
    'frontis.meta.title': 'Frontis — GraphQL API | Pilotariak',
    'frontis.meta.description':
      'Frontis is the GraphQL gateway of Pilotariak. It unifies five data domains into a single API — competitions, clubs, results and disciplines.',
    'kancha.meta.title': 'Kancha — Basque Pelota Mobile App | Pilotariak',
    'kancha.meta.description':
      'Kancha is the iOS and Android mobile app from Pilotariak. Live results, competitions, disciplines and tournament brackets — available on iPhone and Android.',
    'xilo.meta.title': 'Xilo — Pilotariak Slack Bot | Pilotariak',
    'xilo.meta.description':
      'Xilo is the Pilotariak Slack bot. Slash commands, events and Basque pelota data — directly in your Slack workspace.',

    // ── Frontis page ─────────────────────────────────────────────
    'frontis.hero.ariaLabel': 'Frontis — GraphQL API for Basque pelota',
    'frontis.hero.back': 'Pilotariak',
    'frontis.hero.eyebrow': 'GraphQL · Open Source · Federation',
    'frontis.hero.subtitle':
      "Pilotariak's GraphQL API — five data domains, one entry point. Built for developers who want to access Basque pelota data.",
    'frontis.hero.github': 'View on GitHub',
    'frontis.hero.architecture': 'How it works',

    'frontis.overview.eyebrow': 'Overview',
    'frontis.overview.title': 'A unified API for all data',
    'frontis.overview.subtitle':
      'Frontis federates five independent services into a single GraphQL entry point. Each domain has its own schema and its own deployment cycle.',

    'frontis.subgraph.echo': 'API health check and version.',
    'frontis.subgraph.categories': 'Competition categories — owns the <code>Category</code> entity.',
    'frontis.subgraph.clubs': 'Basque pelota clubs — owns the <code>Club</code> entity.',
    'frontis.subgraph.competitions': 'Championships and tournaments — owns the <code>Competition</code> entity.',
    'frontis.subgraph.results': 'Match results — owns the <code>Result</code> entity.',
    'frontis.subgraph.specialties': 'Pelota disciplines — owns the <code>Specialty</code> entity.',

    'frontis.arch.eyebrow': 'How it works',
    'frontis.arch.title': 'Simple, open, extensible',
    'frontis.arch.subtitle':
      'Each service manages its own domain. The gateway composes schemas automatically and resolves cross-domain queries.',
    'frontis.arch.01.title': 'Federated schema',
    'frontis.arch.01.body':
      'Each service exposes its own GraphQL schema and declares the entities it owns. The gateway composes a consistent supergraph without manual configuration.',
    'frontis.arch.02.title': 'Single entry point',
    'frontis.arch.02.body':
      'Clients send queries to a single <code>/graphql</code> endpoint. The gateway resolves fields across services transparently.',
    'frontis.arch.03.title': 'Multi-league',
    'frontis.arch.03.body':
      'One API instance serves all leagues. A request header selects the active dataset — no per-league deployment.',
    'frontis.arch.04.title': 'Query safety',
    'frontis.arch.04.body':
      'Built-in limits on query depth, complexity and size protect the API from expensive operations — configurable per environment.',

    'frontis.federation.eyebrow': 'GraphQL Federation',
    'frontis.federation.subtitle':
      'Each service declares the types it owns. The gateway automatically resolves fields that span multiple services.',
    'frontis.federation.entities.eyebrow': 'Federated entities',
    'frontis.federation.table.entity': 'Entity',
    'frontis.federation.table.owner': 'Service',
    'frontis.federation.table.key': 'Key',
    'frontis.federation.code.label': 'Cross-service resolution',
    'frontis.federation.code': `# Client query:
{ results { clubA { name } } }

# The gateway:
# 1. Fetches Results with clubA { id }
#    → results service
# 2. Sends _entities([{ __typename:"Club", id }])
#    → clubs service
# 3. Merges { name } into the response`,

    'frontis.contribute.eyebrow': 'Open Source · Apache 2.0',
    'frontis.contribute.title': 'Build it with us',
    'frontis.contribute.subtitle':
      'Frontis is open source and welcomes contributions of all kinds — new subgraphs, bug fixes or documentation improvements.',
    'frontis.contribute.step1.title': 'Fork & run locally',
    'frontis.contribute.step1.desc':
      'Clone the repo, install dependencies and start the Apollo gateway locally.',
    'frontis.contribute.step2.title': 'Open an issue',
    'frontis.contribute.step2.desc':
      'Found a bug or have an idea? GitHub issues are the right place to discuss and track work.',
    'frontis.contribute.step3.title': 'Submit a pull request',
    'frontis.contribute.step3.desc':
      'All pull requests are reviewed. Check the contributing guide in the repository for conventions.',
    'frontis.contribute.github': 'View on GitHub',
    'frontis.contribute.back': '← Back to home',

    // ── Kancha page ──────────────────────────────────────────────
    'kancha.hero.ariaLabel': 'Kancha — Basque Pelota Mobile App',
    'kancha.hero.back': 'Pilotariak',
    'kancha.hero.eyebrow': 'Mobile app · iOS & Android',
    'kancha.hero.subtitle':
      'Your Basque pelota competition results — by discipline, by category, organised phase by phase. On iPhone and Android.',
    'kancha.hero.github': 'View on GitHub',
    'kancha.hero.howItWorks': 'How it works',

    'kancha.flow.eyebrow': 'How it works',
    'kancha.flow.title': 'Your results at your fingertips',
    'kancha.flow.subtitle': 'Kancha guides you from choosing a competition to the full bracket, without friction.',
    'kancha.step1.title': 'Choose a competition',
    'kancha.step1.desc': 'The main competition is featured. Others are listed below, filterable by league and year.',
    'kancha.step2.title': 'Select a discipline',
    'kancha.step2.desc': 'Main nue, pala, chistera, rebot — each discipline has its own results and bracket.',
    'kancha.step3.title': 'Filter by category',
    'kancha.step3.desc': 'Seniors, juniors, women, veterans — narrow down to display the right bracket and players.',
    'kancha.step4.title': 'View results by phase',
    'kancha.step4.desc':
      'Groups, round of 16, quarters, semi-finals and final — in order, with scores and team compositions.',

    'kancha.leagues.eyebrow': 'Leagues & committees',
    'kancha.leagues.title': 'Supported committees',
    'kancha.leagues.subtitle':
      'Kancha is currently connected to one committee, with more integrations planned as development progresses.',
    'kancha.leagues.badge.available': 'Available',
    'kancha.leagues.badge.planned': 'Planned',

    'kancha.features.eyebrow': 'Features',
    'kancha.features.title': 'What the app does',
    'kancha.features.subtitle':
      "Kancha is built for Basque pelota fans — simple, fast, and everything you need.",
    'kancha.features.f1.title': 'Phase-by-phase results',
    'kancha.features.f1.desc':
      "From group stages to the final — scores, teams and phases in one clear, organised view.",
    'kancha.features.f2.title': 'All disciplines',
    'kancha.features.f2.desc':
      "Main nue, pala, grand chistera, cesta punta, xare — each discipline with its own brackets.",
    'kancha.features.f3.title': 'Category filter',
    'kancha.features.f3.desc':
      "Seniors, juniors, women, veterans — narrow down to display exactly the right bracket.",
    'kancha.features.f4.title': 'Multi-league',
    'kancha.features.f4.desc':
      "Connected to multiple regional committees. One app for all competitions.",
    'kancha.features.f5.title': 'Competition calendar',
    'kancha.features.f5.desc':
      "Upcoming tournaments, recent results and ongoing competitions — all at a glance.",
    'kancha.features.f6.title': 'Open data',
    'kancha.features.f6.desc':
      "Powered by Frontis, Pilotariak's open source GraphQL API — all data is community-owned.",

    'kancha.download.eyebrow': 'Get the app',
    'kancha.download.title': 'Coming soon on iOS & Android',
    'kancha.download.subtitle':
      "Kancha is in active development. Follow the project on GitHub to be notified when it launches on the App Store and Google Play.",
    'kancha.download.comingSoon': 'Coming soon',
    'kancha.download.github': 'Follow on GitHub',

    'kancha.web.eyebrow': 'Web app',
    'kancha.web.title': 'Also available in your browser',
    'kancha.web.subtitle':
      'Browse competition results and standings directly from your browser — no installation required.',
    'kancha.web.cta': 'Open the web app',

    'kancha.contribute.eyebrow': 'Open Source · Apache 2.0',
    'kancha.contribute.title': 'Build it with us',
    'kancha.contribute.subtitle':
      "Kancha is open source and welcomes contributions of all kinds — bug reports, new features or documentation.",
    'kancha.contribute.step1.title': 'Fork & run locally',
    'kancha.contribute.step1.desc':
      "Clone the repo, install dependencies with npm and launch on your device via Expo Go.",
    'kancha.contribute.step2.title': 'Open an issue',
    'kancha.contribute.step2.desc':
      "Found a bug or have an idea? GitHub issues are the right place to discuss and track work.",
    'kancha.contribute.step3.title': 'Submit a pull request',
    'kancha.contribute.step3.desc':
      "All pull requests are reviewed. Check the contributing guide in the repository for conventions.",
    'kancha.contribute.github': 'View on GitHub',
    'kancha.contribute.back': '← Back to home',

    // ── Xilo page ────────────────────────────────────────────────
    'xilo.hero.ariaLabel': 'Xilo — Pilotariak Slack Bot',
    'xilo.hero.back': 'Pilotariak',
    'xilo.hero.eyebrow': 'Slack Bot · Open Source',
    'xilo.hero.subtitle':
      "The Pilotariak community Slack bot — slash commands and events delivered directly to your channels.",
    'xilo.hero.github': 'View on GitHub',
    'xilo.hero.howItWorks': 'How it works',

    'xilo.setup.eyebrow': 'How it works',
    'xilo.setup.title': 'Up and running in three steps',
    'xilo.setup.subtitle':
      'Xilo integrates with your Slack workspace in minutes.',
    'xilo.step1.title': 'Create your Slack app',
    'xilo.step1.desc':
      'Go to api.slack.com, create a new app and configure the required bot permissions and event subscriptions.',
    'xilo.step2.title': 'Invite Xilo to a channel',
    'xilo.step2.desc':
      'Install the app in your Slack workspace and invite @Xilo to your Basque pelota community channels.',
    'xilo.step3.title': 'Use slash commands',
    'xilo.step3.desc':
      'Type <code>/xilo help</code> to discover all available commands. The bot responds instantly in the channel.',

    'xilo.commands.eyebrow': 'Available commands',
    'xilo.commands.title': 'Control Xilo from Slack',
    'xilo.commands.subtitle':
      "All commands are available via the <code>/xilo</code> prefix in any channel where the bot is invited.",
    'xilo.commands.cmd.help.desc': 'Displays the list of available commands and their usage.',
    'xilo.commands.cmd.ping.desc': 'Checks that the bot is operational — posts a response in the channel.',
    'xilo.commands.cmd.hello.desc': 'Greets the channel with an optional custom message.',

    'xilo.features.eyebrow': 'Features',
    'xilo.features.title': 'What Xilo does',
    'xilo.features.subtitle':
      'A lightweight, secure bot deployed at the network edge for minimal latency.',
    'xilo.features.f1.title': 'Slash commands',
    'xilo.features.f1.desc':
      'Trigger actions directly from Slack with intuitive <code>/xilo</code> commands.',
    'xilo.features.f2.title': 'Real-time events',
    'xilo.features.f2.desc':
      'Responds to mentions and messages — automatic reactions in your channels.',
    'xilo.features.f3.title': 'HMAC-SHA256 security',
    'xilo.features.f3.desc':
      'Every Slack request is cryptographically verified. Replay attack protection (5-min window).',
    'xilo.features.f4.title': 'Always available',
    'xilo.features.f4.desc':
      'Hosted on distributed serverless infrastructure — zero maintenance, always available for your community.',
    'xilo.features.f5.title': 'Async processing',
    'xilo.features.f5.desc':
      'Immediate acknowledgement to Slack, background processing for long-running operations.',
    'xilo.features.f6.title': 'Open Source',
    'xilo.features.f6.desc':
      'Apache 2.0 source code on GitHub — fork it, adapt it, contribute.',

    'xilo.contribute.eyebrow': 'Open Source · Apache 2.0',
    'xilo.contribute.title': 'Build it with us',
    'xilo.contribute.subtitle':
      'Xilo is open source and welcomes all contributions — new commands, data integrations or bug fixes.',
    'xilo.contribute.step1.title': 'Fork & install',
    'xilo.contribute.step1.desc':
      'Clone the repo and install dependencies. Configure your Slack secrets to run the bot locally.',
    'xilo.contribute.step2.title': 'Open an issue',
    'xilo.contribute.step2.desc':
      'Have a command idea or found a bug? GitHub issues are the right place to discuss.',
    'xilo.contribute.step3.title': 'Submit a pull request',
    'xilo.contribute.step3.desc':
      'All contributions are reviewed. Check the contributing guide in the repository for conventions.',
    'xilo.contribute.github': 'View on GitHub',
    'xilo.contribute.back': '← Back to home',
  },
} as const;

// ── Typed data arrays ────────────────────────────────────────────────────────

export const featuresData: Record<Lang, { label: string; title: string; body: string }[]> = {
  fr: [
    {
      label: 'Résultats',
      title: 'Tous les résultats en temps réel',
      body: 'Suivez les scores de chaque match au fur et à mesure. Aucune rencontre ne vous échappe, des tournois locaux aux championnats officiels.',
    },
    {
      label: 'Joueurs',
      title: 'Profils et palmarès des joueurs',
      body: 'Retrouvez la fiche de chaque pelotari : statistiques, historique de compétitions, spécialités pratiquées et classement actualisé.',
    },
    {
      label: 'Calendrier',
      title: 'Calendrier officiel des compétitions',
      body: "Consultez l'agenda complet de la saison. Filtrez par spécialité, province ou niveau de compétition pour planifier votre suivi.",
    },
    {
      label: 'Palmarès',
      title: 'Titres et records historiques',
      body: "Explorez l'histoire de la pelote basque à travers les archives de championnats, les records et les grandes dates du sport.",
    },
    {
      label: 'Frontons',
      title: 'Carte des frontons',
      body: "Localisez les frontons de votre région, accédez aux informations pratiques et découvrez les compétitions qui s'y jouent.",
    },
    {
      label: 'Statistiques',
      title: 'Analyses et statistiques avancées',
      body: 'Plongez dans les données : performances individuelles, évolutions des classements, tendances par spécialité et analyses de saison.',
    },
  ],
  en: [
    {
      label: 'Results',
      title: 'All results in real time',
      body: 'Follow the scores of every match as they happen. Never miss a game, from local tournaments to official championships.',
    },
    {
      label: 'Players',
      title: 'Player profiles and records',
      body: "Find each pelotari's profile: statistics, competition history, disciplines played and up-to-date rankings.",
    },
    {
      label: 'Calendar',
      title: 'Official competition calendar',
      body: 'Browse the full season schedule. Filter by discipline, province or competition level to plan your viewing.',
    },
    {
      label: 'Honours',
      title: 'Titles and historical records',
      body: 'Explore the history of Basque pelota through championship archives, records and key dates in the sport.',
    },
    {
      label: 'Frontons',
      title: 'Fronton map',
      body: 'Locate frontons in your area, access practical information and discover which competitions are played there.',
    },
    {
      label: 'Statistics',
      title: 'Advanced analytics and statistics',
      body: 'Dive into the data: individual performances, ranking trends, discipline breakdowns and season analyses.',
    },
  ],
};

export const statsData: Record<
  Lang,
  { value: string; label: string; description: string }[]
> = {
  fr: [
    {
      value: '240+',
      label: 'Compétitions organisées',
      description: 'chaque année à travers le Pays Basque et la France',
    },
    {
      value: '1 800',
      label: 'Joueurs inscrits',
      description: 'du débutant au professionnel, toutes spécialités confondues',
    },
    {
      value: '7',
      label: 'Spécialités couvertes',
      description: 'Cesta Punta, Grand Chistera, Paleta, Xare et plus encore',
    },
    {
      value: '120',
      label: 'Frontons répertoriés',
      description: 'avec informations pratiques et calendrier des événements',
    },
  ],
  en: [
    {
      value: '240+',
      label: 'Competitions organised',
      description: 'each year across the Basque Country and France',
    },
    {
      value: '1,800',
      label: 'Registered players',
      description: 'from beginner to professional, across all disciplines',
    },
    {
      value: '7',
      label: 'Disciplines covered',
      description: 'Cesta Punta, Grand Chistera, Paleta, Xare and more',
    },
    {
      value: '120',
      label: 'Listed frontons',
      description: 'with practical information and event calendar',
    },
  ],
};
