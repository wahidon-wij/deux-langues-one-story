import type { Lang } from "./site";

/**
 * All visible copy, in both languages.
 * French is the source of truth; English is a faithful translation.
 * Every key must exist in both languages (enforced by the Content type and tests).
 *
 * CONFIDENTIALITY: never name the current employer, its clients, colleagues,
 * supervisors, internal tools, clusters, domains or URLs. Never invent metrics,
 * clients, testimonials or certifications.
 */

export type ProjectVisual = "ephemeral" | "citybus" | "waterwatch" | "cloudinfragen";

export interface Project {
  slug: string;
  visual: ProjectVisual;
  shortTitle: string;
  title: string;
  summary: string;
  context?: string;
  achievements?: string[];
  result?: string;
  stack: string[];
  /** Public repository URL. Empty string = not available yet. */
  repository: string;
  visualAlt: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  dateTime: string;
  points: { text: string; linkToFeatured?: boolean }[];
}

export interface EducationItem {
  title: string;
  place: string;
  period?: string;
  details?: string;
  kind: "degree" | "prep" | "certification";
}

export interface DiagramLabels {
  ephemeral: {
    pipelines: string;
    create: string;
    extend: string;
    cleanup: string;
    agent: string;
    vault: string;
    namespace: string;
    templates: string;
    dns: string;
    storage: string;
  };
  citybus: {
    web: string;
    gateway: string;
    discovery: string;
    tracking: string;
    ticketing: string;
    schedules: string;
    subscriptions: string;
    bus: string;
    realtime: string;
  };
  waterwatch: {
    satellite: string;
    api: string;
    models: string;
    dashboard: string;
    tabs: [string, string, string];
  };
  cloudinfragen: {
    editor: string;
    prompt: string;
    model: string;
    output: string;
  };
}

export interface Content {
  meta: { title: string; description: string };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    switchLanguageShort: string;
    switchLanguageTargetLang: Lang;
    themeToggle: string;
    newTab: string;
  };
  nav: {
    projects: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    name: string;
    role: string;
    intro: string;
    photoAlt: string;
    contactCta: string;
    cvCta: string;
  };
  projects: {
    title: string;
    intro: string;
    featuredLabel: string;
    view: string;
    close: string;
    detailLabel: string;
    contextLabel: string;
    achievementsLabel: string;
    resultLabel: string;
    stackLabel: string;
    repositoryLabel: string;
    items: Project[];
  };
  diagrams: DiagramLabels;
  experience: {
    title: string;
    featuredLinkLabel: string;
    items: ExperienceItem[];
  };
  skills: {
    title: string;
    groups: { name: string; items: string[] }[];
  };
  education: {
    title: string;
    kinds: Record<EducationItem["kind"], string>;
    items: EducationItem[];
  };
  contact: {
    title: string;
    sentence: string;
    formTitle: string;
    linksTitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    requiredHint: string;
    submit: string;
    privacyNote: string;
    opened: string;
    errorSummary: string;
    characters: string;
    errors: {
      nameRequired: string;
      nameTooLong: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageTooLong: string;
    };
    mail: {
      subject: string;
      nameLine: string;
      emailLine: string;
    };
    emailLinkLabel: string;
    linkedinLinkLabel: string;
    githubLinkLabel: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
}

const fr: Content = {
  meta: {
    title: "Abdelouahed Akabbab — Ingénieur logiciel Full-Stack & DevOps",
    description:
      "Portfolio d'Abdelouahed Akabbab, ingénieur logiciel Full-Stack & DevOps diplômé de l'ENSIAS : Java/Spring Boot, React, Angular, Kubernetes et CI/CD. Disponible pour des missions freelance.",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    primaryNav: "Navigation principale",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLanguage: "Switch to English",
    switchLanguageShort: "EN",
    switchLanguageTargetLang: "en",
    themeToggle: "Thème sombre",
    newTab: "(nouvel onglet)",
  },
  nav: {
    projects: "Projets",
    experience: "Expérience",
    skills: "Compétences",
    education: "Formation",
    contact: "Contact",
  },
  hero: {
    name: "Abdelouahed Akabbab",
    role: "Ingénieur logiciel Full-Stack & DevOps",
    intro:
      "Je conçois des applications web complètes et les pipelines qui les livrent. Diplômé de l'ENSIAS, je travaille avec Java/Spring Boot, React, Angular, Kubernetes et CI/CD. Disponible pour des missions freelance.",
    photoAlt: "Portrait d'Abdelouahed Akabbab",
    contactCta: "Me contacter",
    cvCta: "Télécharger mon CV",
  },
  projects: {
    title: "Projets",
    intro: "Une sélection de projets, de l'application au pipeline qui la déploie.",
    featuredLabel: "Projet phare",
    view: "Voir le projet",
    close: "Fermer",
    detailLabel: "Détail du projet",
    contextLabel: "Contexte",
    achievementsLabel: "Réalisations",
    resultLabel: "Résultat",
    stackLabel: "Stack",
    repositoryLabel: "Voir le dépôt",
    items: [
      {
        slug: "environnements-ephemeres",
        visual: "ephemeral",
        shortTitle: "Environnements Kubernetes éphémères",
        title: "Environnements Kubernetes éphémères et modernisation de la chaîne CI/CD",
        summary:
          "Des environnements de test isolés, créés à la demande et détruits automatiquement, après un audit de la chaîne CI/CD existante.",
        context:
          "Projet de fin d'études et stage, 2026. Une équipe produit avait besoin d'environnements de test isolés, créés à la demande et détruits automatiquement. J'ai audité la chaîne CI/CD existante, puis automatisé le cycle de vie complet d'un environnement.",
        achievements: [
          "Trois pipelines (création, prolongation de la durée de vie, nettoyage) orchestrés avec Jenkins.",
          "Manifestes Kubernetes générés à partir de modèles et déployés automatiquement.",
          "DNS, stockage objet et namespaces gérés et nettoyés automatiquement.",
          "Agent de build conteneurisé sur mesure, avec les identifiants stockés dans le coffre-fort Jenkins.",
        ],
        // [À VALIDER : chiffre cible, à remplacer par une mesure réelle ou à retirer]
        result: "Environnement prêt en moins de 5 minutes.",
        stack: ["Jenkins", "Kubernetes", "Helm", "Docker", "Python", "Jinja2"],
        repository: "",
        visualAlt:
          "Schéma : trois pipelines Jenkins (créer, prolonger, nettoyer) pilotent un namespace Kubernetes éphémère avec ses manifestes, son DNS et son stockage objet.",
      },
      {
        slug: "citybus",
        visual: "citybus",
        shortTitle: "CityBus",
        title: "CityBus, plateforme de transport urbain",
        summary:
          "Projet d'équipe : suivi des véhicules en temps réel, billetterie, horaires et abonnements, conçu en microservices.",
        context:
          "Projet d'équipe : suivi des véhicules en temps réel, billetterie, horaires et abonnements, conçu en microservices. J'ai contribué à l'ensemble du projet.",
        achievements: [
          "Microservices Spring Boot communiquant de façon asynchrone via Kafka.",
          "API REST sécurisées par JWT, passerelle centrale et découverte de services.",
          "Interface web avec mises à jour en temps réel via WebSocket.",
          "Pipelines GitHub Actions (tests unitaires, tests de bout en bout, images Docker, déploiement) et infrastructure Terraform.",
        ],
        stack: [
          "Spring Boot",
          "Kafka",
          "React", // [À VALIDER : React ou Angular]
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Kubernetes",
          "Terraform",
          "GitHub Actions",
        ],
        repository: "",
        visualAlt:
          "Schéma : l'interface web passe par une passerelle vers les microservices de suivi, billetterie, horaires et abonnements, reliés par un bus Kafka.",
      },
      {
        slug: "waterwatch",
        visual: "waterwatch",
        shortTitle: "WaterWatch",
        title: "WaterWatch, suivi de la qualité de l'eau par satellite",
        summary: "Plateforme Full-Stack combinant imagerie satellite et modèles d'IA.",
        context: "Plateforme Full-Stack combinant imagerie satellite et modèles d'IA.",
        achievements: [
          "API REST sécurisées par JWT.",
          "Tableau de bord multi-onglets.",
          "Intégration de l'API Sentinel Hub.",
          "Orchestration de trois modèles d'IA (NDWI, Sen2Coral, Cyanonet).",
        ],
        stack: ["Spring Boot", "Angular", "JWT", "IA"],
        repository: "", // [À COMPLÉTER]
        visualAlt:
          "Schéma : les images satellites Sentinel Hub passent par une API Spring Boot vers trois modèles d'IA, puis vers un tableau de bord multi-onglets.",
      },
      {
        slug: "cloudinfragen",
        visual: "cloudinfragen",
        shortTitle: "CloudInfraGen",
        title: "CloudInfraGen, génération d'infrastructure cloud par IA",
        summary:
          "Extension VS Code qui transforme une description en langage naturel en code Terraform prêt à l'emploi, grâce à un LLM.",
        context:
          "Extension VS Code qui transforme une description en langage naturel en code Terraform prêt à l'emploi, grâce à un LLM.",
        stack: ["TypeScript", "LLM", "Terraform"],
        repository: "", // [À COMPLÉTER]
        visualAlt:
          "Schéma : une description en langage naturel dans VS Code est transformée par un LLM en fichier Terraform.",
      },
    ],
  },
  diagrams: {
    ephemeral: {
      pipelines: "Pipelines Jenkins",
      create: "créer",
      extend: "prolonger",
      cleanup: "nettoyer",
      agent: "agent de build",
      vault: "coffre Jenkins",
      namespace: "namespace éphémère",
      templates: "modèles → manifestes",
      dns: "DNS",
      storage: "stockage objet",
    },
    citybus: {
      web: "interface web",
      gateway: "passerelle",
      discovery: "découverte",
      tracking: "suivi",
      ticketing: "billetterie",
      schedules: "horaires",
      subscriptions: "abonnements",
      bus: "Kafka · événements",
      realtime: "temps réel",
    },
    waterwatch: {
      satellite: "Sentinel Hub",
      api: "API Spring Boot",
      models: "modèles d'IA",
      dashboard: "tableau de bord",
      tabs: ["carte", "qualité", "alertes"],
    },
    cloudinfragen: {
      editor: "VS Code",
      prompt: "description en langage naturel",
      model: "LLM",
      output: "main.tf",
    },
  },
  experience: {
    title: "Expérience",
    featuredLinkLabel: "voir le projet phare",
    items: [
      {
        role: "Stagiaire DevOps & Full-Stack",
        organization: "Entreprise de plateforme DevOps, Casablanca",
        period: "Févr. – août 2026",
        dateTime: "2026-02/2026-08",
        points: [
          {
            text: "Audit de la chaîne DevOps (Kubernetes, CI/CD), avec des pistes d'optimisation des coûts et du délai de mise en production.",
          },
          { text: "Pipelines d'environnements éphémères", linkToFeatured: true },
          {
            text: "Plateforme web de supervision des clusters : front-end Angular, back-end Spring Boot.",
          },
        ],
      },
      {
        role: "Stagiaire Full-Stack & DevOps",
        organization: "SmartFactory, Mohammedia",
        period: "Juin – sept. 2025",
        dateTime: "2025-06/2025-09",
        points: [
          {
            text: "Application web complète : Angular, API REST Spring Boot, authentification JWT, tableaux de bord.",
          },
          {
            text: "Conteneurisation Docker, orchestration Kubernetes, pipeline CI/CD GitHub Actions.",
          },
        ],
      },
      {
        role: "Stage d'initiation : architecture data",
        organization: "Direction régionale de la transition énergétique, Agadir",
        period: "Juin – juil. 2024",
        dateTime: "2024-06/2024-07",
        points: [
          { text: "Modélisation relationnelle et mise en place d'un Data Warehouse." },
          {
            text: "Tableaux de bord géospatiaux interactifs et automatisation des traitements ETL en Python.",
          },
        ],
      },
    ],
  },
  skills: {
    title: "Compétences",
    groups: [
      {
        name: "Back-end",
        items: ["Java", "Spring Boot", "Spring Security", "API REST", "JPA/Hibernate", "Node.js"],
      },
      {
        name: "Front-end",
        items: ["Angular", "React", "TypeScript", "HTML5", "CSS3", "Tailwind"],
      },
      {
        name: "DevOps & Cloud",
        items: [
          "Kubernetes",
          "Docker",
          "Helm",
          "Jenkins",
          "GitHub Actions",
          "Terraform",
          "Ansible",
          "ArgoCD",
        ],
      },
      {
        name: "Données",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Apache Kafka"],
      },
      {
        name: "Supervision, langages & outils",
        items: ["Prometheus", "Grafana", "AWS", "Scaleway", "Python", "Git"],
      },
    ],
  },
  education: {
    title: "Formation",
    kinds: {
      degree: "Diplôme",
      prep: "Classes préparatoires",
      certification: "Certification",
    },
    items: [
      {
        kind: "degree",
        title: "Diplôme d'ingénieur d'État, Génie logiciel",
        place: "ENSIAS, Rabat",
        period: "2026",
        details:
          "Mention Assez Bien. Option : Ingénierie logicielle et systèmes d'information.",
      },
      {
        kind: "prep",
        title: "Classes préparatoires MP (Mathématiques & Physique)",
        place: "Lycée Reda Slaoui, Agadir",
        period: "2021 – 2023",
      },
      {
        kind: "certification",
        title: "AWS Certified Cloud Practitioner",
        place: "Amazon Web Services",
      },
    ],
  },
  contact: {
    title: "Contact",
    sentence: "Une mission, un projet ou une question ? Écrivez-moi, je réponds sous 24 heures.",
    formTitle: "Écrire un message",
    linksTitle: "Liens",
    nameLabel: "Nom",
    emailLabel: "E-mail",
    messageLabel: "Message",
    requiredHint: "Tous les champs sont obligatoires.",
    submit: "Ouvrir ma messagerie",
    privacyNote:
      "Le formulaire ouvre votre logiciel de messagerie avec le message pré-rempli. Rien n'est envoyé à un serveur.",
    opened:
      "Votre messagerie devrait s'ouvrir avec le message pré-rempli. Si rien ne se passe, écrivez directement à",
    errorSummary: "Merci de corriger les champs signalés.",
    characters: "caractères",
    errors: {
      nameRequired: "Indiquez votre nom.",
      nameTooLong: "Votre nom ne doit pas dépasser 100 caractères.",
      emailRequired: "Indiquez votre adresse e-mail.",
      emailInvalid: "Cette adresse e-mail ne semble pas valide.",
      messageRequired: "Écrivez votre message.",
      messageTooLong: "Votre message ne doit pas dépasser 1 500 caractères.",
    },
    mail: {
      subject: "Contact depuis le portfolio",
      nameLine: "Nom",
      emailLine: "E-mail",
    },
    emailLinkLabel: "E-mail",
    linkedinLinkLabel: "LinkedIn",
    githubLinkLabel: "GitHub",
  },
  footer: {
    rights: "Tous droits réservés.",
    backToTop: "Retour en haut",
  },
};

const en: Content = {
  meta: {
    title: "Abdelouahed Akabbab — Full-Stack & DevOps Software Engineer",
    description:
      "Portfolio of Abdelouahed Akabbab, Full-Stack & DevOps software engineer and ENSIAS graduate: Java/Spring Boot, React, Angular, Kubernetes and CI/CD. Available for freelance missions.",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Passer en français",
    switchLanguageShort: "FR",
    switchLanguageTargetLang: "fr",
    themeToggle: "Dark theme",
    newTab: "(new tab)",
  },
  nav: {
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    name: "Abdelouahed Akabbab",
    role: "Full-Stack & DevOps Software Engineer",
    intro:
      "I build complete web applications and the pipelines that ship them. ENSIAS engineering graduate, working with Java/Spring Boot, React, Angular, Kubernetes and CI/CD. Available for freelance missions.",
    photoAlt: "Portrait of Abdelouahed Akabbab",
    contactCta: "Get in touch",
    cvCta: "Download my CV",
  },
  projects: {
    title: "Projects",
    intro: "A selection of projects, from the application to the pipeline that deploys it.",
    featuredLabel: "Featured project",
    view: "View project",
    close: "Close",
    detailLabel: "Project details",
    contextLabel: "Context",
    achievementsLabel: "Achievements",
    resultLabel: "Result",
    stackLabel: "Stack",
    repositoryLabel: "View repository",
    items: [
      {
        slug: "environnements-ephemeres",
        visual: "ephemeral",
        shortTitle: "Ephemeral Kubernetes environments",
        title: "Ephemeral Kubernetes environments and CI/CD modernization",
        summary:
          "Isolated test environments, created on demand and destroyed automatically, following an audit of the existing CI/CD chain.",
        context:
          "Final-year project and internship, 2026. A product team needed isolated test environments, created on demand and destroyed automatically. I audited the existing CI/CD chain, then automated the full lifecycle of an environment.",
        achievements: [
          "Three pipelines (create, extend lifetime, clean up) orchestrated with Jenkins.",
          "Kubernetes manifests generated from templates and deployed automatically.",
          "DNS, object storage and namespaces managed and cleaned up automatically.",
          "Custom containerized build agent, with credentials stored in the Jenkins vault.",
        ],
        // [À VALIDER : chiffre cible, à remplacer par une mesure réelle ou à retirer]
        result: "Environment ready in under 5 minutes.",
        stack: ["Jenkins", "Kubernetes", "Helm", "Docker", "Python", "Jinja2"],
        repository: "",
        visualAlt:
          "Diagram: three Jenkins pipelines (create, extend, clean up) drive an ephemeral Kubernetes namespace with its manifests, DNS and object storage.",
      },
      {
        slug: "citybus",
        visual: "citybus",
        shortTitle: "CityBus",
        title: "CityBus, urban transport platform",
        summary:
          "Team project: real-time vehicle tracking, ticketing, schedules and subscriptions, built as microservices.",
        context:
          "Team project: real-time vehicle tracking, ticketing, schedules and subscriptions, built as microservices. I contributed across the whole project.",
        achievements: [
          "Spring Boot microservices with asynchronous communication through Kafka.",
          "JWT-secured REST APIs, central gateway and service discovery.",
          "Web interface with real-time updates over WebSocket.",
          "GitHub Actions pipelines (unit tests, end-to-end tests, Docker images, deployment) and Terraform infrastructure.",
        ],
        stack: [
          "Spring Boot",
          "Kafka",
          "React", // [À VALIDER : React ou Angular]
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Kubernetes",
          "Terraform",
          "GitHub Actions",
        ],
        repository: "",
        visualAlt:
          "Diagram: the web interface goes through a gateway to the tracking, ticketing, schedules and subscriptions microservices, connected by a Kafka bus.",
      },
      {
        slug: "waterwatch",
        visual: "waterwatch",
        shortTitle: "WaterWatch",
        title: "WaterWatch, satellite water-quality monitoring",
        summary: "Full-Stack platform combining satellite imagery and AI models.",
        context: "Full-Stack platform combining satellite imagery and AI models.",
        achievements: [
          "JWT-secured REST APIs.",
          "Multi-tab dashboard.",
          "Sentinel Hub API integration.",
          "Orchestration of three AI models (NDWI, Sen2Coral, Cyanonet).",
        ],
        stack: ["Spring Boot", "Angular", "JWT", "AI"],
        repository: "", // [À COMPLÉTER]
        visualAlt:
          "Diagram: Sentinel Hub satellite images go through a Spring Boot API to three AI models, then to a multi-tab dashboard.",
      },
      {
        slug: "cloudinfragen",
        visual: "cloudinfragen",
        shortTitle: "CloudInfraGen",
        title: "CloudInfraGen, AI-driven cloud infrastructure generation",
        summary:
          "VS Code extension that turns a natural-language description into ready-to-use Terraform code, powered by an LLM.",
        context:
          "VS Code extension that turns a natural-language description into ready-to-use Terraform code, powered by an LLM.",
        stack: ["TypeScript", "LLM", "Terraform"],
        repository: "", // [À COMPLÉTER]
        visualAlt:
          "Diagram: a natural-language description in VS Code is turned by an LLM into a Terraform file.",
      },
    ],
  },
  diagrams: {
    ephemeral: {
      pipelines: "Jenkins pipelines",
      create: "create",
      extend: "extend",
      cleanup: "clean up",
      agent: "build agent",
      vault: "Jenkins vault",
      namespace: "ephemeral namespace",
      templates: "templates → manifests",
      dns: "DNS",
      storage: "object storage",
    },
    citybus: {
      web: "web interface",
      gateway: "gateway",
      discovery: "discovery",
      tracking: "tracking",
      ticketing: "ticketing",
      schedules: "schedules",
      subscriptions: "subscriptions",
      bus: "Kafka · events",
      realtime: "real time",
    },
    waterwatch: {
      satellite: "Sentinel Hub",
      api: "Spring Boot API",
      models: "AI models",
      dashboard: "dashboard",
      tabs: ["map", "quality", "alerts"],
    },
    cloudinfragen: {
      editor: "VS Code",
      prompt: "natural-language description",
      model: "LLM",
      output: "main.tf",
    },
  },
  experience: {
    title: "Experience",
    featuredLinkLabel: "see the featured project",
    items: [
      {
        role: "DevOps & Full-Stack Intern",
        organization: "DevOps platform company, Casablanca",
        period: "Feb. – Aug. 2026",
        dateTime: "2026-02/2026-08",
        points: [
          {
            text: "DevOps chain audit (Kubernetes, CI/CD) with optimization paths for cost and time-to-production.",
          },
          { text: "Ephemeral environment pipelines", linkToFeatured: true },
          {
            text: "Web monitoring platform for clusters: Angular front-end, Spring Boot back-end.",
          },
        ],
      },
      {
        role: "Full-Stack & DevOps Intern",
        organization: "SmartFactory, Mohammedia",
        period: "June – Sept. 2025",
        dateTime: "2025-06/2025-09",
        points: [
          {
            text: "Complete web application: Angular, Spring Boot REST API, JWT authentication, dashboards.",
          },
          {
            text: "Docker containerization, Kubernetes orchestration, GitHub Actions CI/CD pipeline.",
          },
        ],
      },
      {
        role: "Initiation internship: data architecture",
        organization: "Regional Energy Transition Directorate, Agadir",
        period: "June – July 2024",
        dateTime: "2024-06/2024-07",
        points: [
          { text: "Relational modelling and Data Warehouse implementation." },
          { text: "Interactive geospatial dashboards and Python ETL automation." },
        ],
      },
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      {
        name: "Back-end",
        items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "JPA/Hibernate", "Node.js"],
      },
      {
        name: "Front-end",
        items: ["Angular", "React", "TypeScript", "HTML5", "CSS3", "Tailwind"],
      },
      {
        name: "DevOps & Cloud",
        items: [
          "Kubernetes",
          "Docker",
          "Helm",
          "Jenkins",
          "GitHub Actions",
          "Terraform",
          "Ansible",
          "ArgoCD",
        ],
      },
      {
        name: "Data",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Apache Kafka"],
      },
      {
        name: "Monitoring, languages & tools",
        items: ["Prometheus", "Grafana", "AWS", "Scaleway", "Python", "Git"],
      },
    ],
  },
  education: {
    title: "Education",
    kinds: {
      degree: "Degree",
      prep: "Preparatory classes",
      certification: "Certification",
    },
    items: [
      {
        kind: "degree",
        title: "State Engineering Diploma, Software Engineering",
        place: "ENSIAS, Rabat",
        period: "2026",
        details: "Grade: Assez Bien (Good). Option: Software Engineering and Information Systems.",
      },
      {
        kind: "prep",
        title: "Preparatory classes MP (Maths & Physics)",
        place: "Lycée Reda Slaoui, Agadir",
        period: "2021 – 2023",
      },
      {
        kind: "certification",
        title: "AWS Certified Cloud Practitioner",
        place: "Amazon Web Services",
      },
    ],
  },
  contact: {
    title: "Contact",
    sentence: "A mission, a project or a question? Write to me, I reply within 24 hours.",
    formTitle: "Write a message",
    linksTitle: "Links",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    requiredHint: "All fields are required.",
    submit: "Open my email app",
    privacyNote:
      "This form opens your email app with the message pre-filled. Nothing is sent to a server.",
    opened:
      "Your email app should open with the message pre-filled. If nothing happens, write directly to",
    errorSummary: "Please fix the highlighted fields.",
    characters: "characters",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooLong: "Your name must not exceed 100 characters.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "This email address doesn't look valid.",
      messageRequired: "Please write your message.",
      messageTooLong: "Your message must not exceed 1,500 characters.",
    },
    mail: {
      subject: "Contact from the portfolio",
      nameLine: "Name",
      emailLine: "Email",
    },
    emailLinkLabel: "Email",
    linkedinLinkLabel: "LinkedIn",
    githubLinkLabel: "GitHub",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export const content: Record<Lang, Content> = { fr, en };
