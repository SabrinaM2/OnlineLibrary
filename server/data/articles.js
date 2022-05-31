const articles = [
    {
        id: 1,
        name: 'Harry Potter t.1 ; Harry Potter à l\'école des sorciers',
        image: 'https://images.epagine.fr/628/9782070584628_1_m.jpg',
        auteur: 'J. K. Rowling',
        nb_pages: 320,
        description: `Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle
         et une tante qui le détestent, voit son existence bouleversée.`,
        nb_exemplaires: 10
    },
    {
        id: 2,
        name: 'Le seigneur des anneaux t.1 ; la fraternité de l\'anneau',
        image: 'https://images.epagine.fr/040/9782075134040_1_m.jpg',
        auteur: 'J.R.R. Tolkien',
        nb_pages: 726,
        description: `Dans les vertes prairies de la Comté, les Hobbits, ou Semi-hommes, vivaient en paix... Jusqu'au jour fatal où l'un d'entre eux,
         au cours de ses voyages, entra en possession de l'Anneau Unique aux immenses pouvoirs.`,
        nb_exemplaires: 7
    },
    {
        id: 3,
        name: 'Les misérables',
        image: 'https://images.epagine.fr/465/9782211238465_1_m.jpg',
        auteur: 'Victor Hugo',
        nb_pages: 316,
        description: `Valjean, l'ancien forçat devenu bourgeois et protecteur des faibles ; Fantine, l'ouvrière écrasée par sa condition ; le couple Thénardier,
         figure du mal et de l'opportunisme ; Marius, l'étudiant idéaliste, Cosette, l'enfant victime.`,
        nb_exemplaires: 5
    },
    {
        id: 4,
        name: 'Le petit prince',
        image: 'https://images.epagine.fr/758/9782070612758_1_m.jpg',
        auteur: 'Antoine de Saint-Exupéry',
        nb_pages: 113,
        description: `Le Petit Prince est une œuvre de langue française, la plus connue d'Antoine de Saint-Exupéry.
         Publié en 1943 à New York simultanément à sa traduction anglaise, c'est une œuvre poétique et philosophique
          sous l'apparence d'un conte pour enfants.`,
        nb_exemplaires: 8
    },
    {
        id: 5,
        name: 'ça t.1',
        image: 'https://images.epagine.fr/340/9782253151340_1_m.jpg',
        auteur: 'Stephen King',
        nb_pages: 798,
        description: `Stephen King ça (tome 1) Enfants, dans leur petite ville de Derry, Ben, Eddie, Richie et
         la petite bande du « Club des ratés », comme ils se désignaient, ont été confrontés à l'horreur absolue.`,
        nb_exemplaires: 6
    },
    {
        id: 6,
        name: 'Au bonheur des dames',
        image: 'https://images.epagine.fr/864/9782253002864_1_m.jpg',
        auteur: 'Emile Zola',
        nb_pages: 320,
        description: `Dans le Paris de la fin du XIXème siècle, nous suivons Denise, jeune provinciale,
         et Octave Mouret, patron du Bonheur des Dames, au milieu de l'ébullition crée par la naissance des grands magasins.`,
        nb_exemplaires: 4
    },
    {
        id: 7,
        name: 'Notre-Dame de Paris',
        image: 'https://images.epagine.fr/537/9782072864537_1_m.jpg',
        auteur: 'Victor Hugo',
        nb_pages: 960,
        description: `Notre-Dame de Paris est un roman historique de l'écrivain français Victor Hugo, publié en 1831.
Le titre fait référence à la cathédrale Notre-Dame de Paris, qui est un des lieux principaux de l'intrigue du roman. `,
        nb_exemplaires: 8
    },
    {
        id: 8,
        name: 'Python pour la data science : les meilleures outils pour travailler avec les données',
        image: 'https://images.epagine.fr/048/9782412070048_1_m.jpg',
        auteur: 'Jake Vanderplas',
        nb_pages: 562,
        description: `Pour de nombreux chercheurs, Python est un outil essentiel en raison de ses bibliothèques
         pour stocker, manipuler et obtenir un aperçu des données.`,
        nb_exemplaires: 10
    },
    {
        id: 9,
        name: 'Programmer avec Python',
        image: 'https://images.epagine.fr/145/9782412045145_1_75.jpg',
        auteur: 'Luciano Ramalho',
        nb_pages: 750,
        description: `La simplicité du langage Python permet d'être productif très rapidement mais cela
         ne signifie pas que vous utilisez tout le potentiel du langage.`,
        nb_exemplaires: 9
    },
    {
        id: 10,
        name: 'Data science avec Python pour les nuls',
        image: 'https://images.epagine.fr/729/9782412050729_1_75.jpg',
        auteur: 'John Paul Mueller',
        nb_pages: 472,
        description: `La science des données ou data science consiste à extraire des connaissance dans un flot
         de données. Elle utilise des techniques et des théories tirées de domaines comme les mathématiques et
          la statistique.`,
        nb_exemplaires: 11
    },
    {
        id: 11,
        name: 'C++ : les fondamentaux du langage',
        image: 'https://images.epagine.fr/208/9782409030208_1_m.jpg',
        auteur: 'Brice-Arnaud Guérin',
        nb_pages: 430,
        description: `Ce livre s'adresse à tout développeur désireux d'apprendre le langage C++, dans le cadre de ses
         études ou pour consolider son expérience professionnelle.`,
        nb_exemplaires: 6
    },
    {
        id: 12,
        name: 'Vue.js ; développez des applications web modernes en JavaScript avec un framework progressif',
        image: 'https://images.epagine.fr/424/9782409029424_1_m.jpg',
        auteur: 'Yoann Gauchard',
        nb_pages: 618,
        description: `Alliant théorie et pratique avec ses nombreux exemples, ce livre sur Vue.js, framework JavaScript
         facile à prendre en main.`,
        nb_exemplaires: 8
    },
    {
        id: 13,
        name: 'Les circuits FGPA et le langage VHDL ; une introduction pour les programmeurs et par l\'exemple',
        image: 'https://images.epagine.fr/989/9782340032989_1_m.jpg',
        auteur: 'Jocelyn Sérot',
        nb_pages: 336,
        description: `Ce livre est une introduction aux circuits reprogrammables de type FPGA ( Field Reprogrammable Gate Array )
         et au langage VHDL.`,
        nb_exemplaires: 10
    },
    {
        id: 14,
        name: 'Systèmes électroniques embarqués et transports : automobile, ferroviaire, aéronautique et espace',
        image: 'https://images.epagine.fr/277/9782100823277_1_75.jpg',
        auteur: 'Philipe Louvel',
        nb_pages: 400,
        description: `Cet ouvrage permet non seulement d'avoir une vision synthétique du secteur, mais donne aussi des revues détaillées de solutions,
 tant sur les aspects systèmes que sur les aspects composants ou logiciels.`,
        nb_exemplaires: 4
    },
    {
        id: 15,
        name: 'Aide-mémoire ; composants électroniques',
        image: 'https://images.epagine.fr/913/9782100828913_1_75.jpg',
        auteur: 'Pierre Mayé',
        nb_pages: 416,
        description: `Cet aide-mémoire décrit de manière simple et pratique les principales caractéristiques des composants de base,
         analogiques ou logiques, de l'électronique`,
        nb_exemplaires: 7
    },
    {
        id: 16,
        name: 'Arduino pour la domotique',
        image: 'https://images.epagine.fr/117/9782100727117_1_75.jpg',
        auteur: 'Marc-Olivier Schwartz',
        nb_pages: 256,
        description: `Cet ouvrage a pour objectif de vous initier à la domotique avec Arduino, et de vous guider pas à pas
         dans la réalisation de projets concrets pour équiper votre domicile de capteurs de température...`,
        nb_exemplaires: 8
    },
    {
        id: 17,
        name: 'Introduction aux probabilités ; modèles et applications',
        image: 'https://images.epagine.fr/862/9782100814862_1_75.jpg',
        auteur: 'Francesco Caravenna',
        nb_pages: 432,
        description: `Cet ouvrage propose une introduction à la théorie des probabilités et à ses applications.`,
        nb_exemplaires: 5
    }
]

module.exports = articles
