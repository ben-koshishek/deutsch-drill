import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ PERSONAL PRONOUNS ============
export const personalPronounCards: LabelFormCard[] = [
  // 1st person singular
  { id: "pers-i-nom", answer: "ich", labels: [{ label: "I", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ich bin hier.", english: "I am here." }] },
  { id: "pers-me-acc", answer: "mich", labels: [{ label: "ME", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er sieht mich.", english: "He sees me." }] },
  { id: "pers-me-dat", answer: "mir", labels: [{ label: "ME", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Gib mir das.", english: "Give me that." }] },
  // 2nd person singular (informal)
  { id: "pers-you-nom", answer: "du", labels: [{ label: "YOU", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Du bist nett.", english: "You are nice." }] },
  { id: "pers-you-acc", answer: "dich", labels: [{ label: "YOU", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich liebe dich.", english: "I love you." }] },
  { id: "pers-you-dat", answer: "dir", labels: [{ label: "YOU", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe dir.", english: "I help you." }] },
  // 3rd person singular masculine
  { id: "pers-he-nom", answer: "er", labels: [{ label: "HE", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Er arbeitet viel.", english: "He works a lot." }] },
  { id: "pers-him-acc", answer: "ihn", labels: [{ label: "HIM", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne ihn.", english: "I know him." }] },
  { id: "pers-him-dat", answer: "ihm", labels: [{ label: "HIM", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihm das Buch.", english: "I give him the book." }] },
  // 3rd person singular feminine
  { id: "pers-she-nom", answer: "sie", labels: [{ label: "SHE", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Sie singt schön.", english: "She sings beautifully." }] },
  { id: "pers-her-acc", answer: "sie", labels: [{ label: "HER", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe sie.", english: "I see her." }] },
  { id: "pers-her-dat", answer: "ihr", labels: [{ label: "HER", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihr das Buch.", english: "I give her the book." }] },
  // 3rd person singular neuter
  { id: "pers-it-nom", answer: "es", labels: [{ label: "IT", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Es regnet.", english: "It is raining." }] },
  { id: "pers-it-acc", answer: "es", labels: [{ label: "IT", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe es.", english: "I see it." }] },
  { id: "pers-it-dat", answer: "ihm", labels: [{ label: "IT", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihm Wasser.", english: "I give it water." }] },
  // 1st person plural
  { id: "pers-we-nom", answer: "wir", labels: [{ label: "WE", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Wir gehen zusammen.", english: "We go together." }] },
  { id: "pers-us-acc", answer: "uns", labels: [{ label: "US", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er sieht uns.", english: "He sees us." }] },
  { id: "pers-us-dat", answer: "uns", labels: [{ label: "US", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Er hilft uns.", english: "He helps us." }] },
  // 2nd person plural (informal)
  { id: "pers-yall-nom", answer: "ihr", labels: [{ label: "YOU ALL", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ihr seid willkommen.", english: "You all are welcome." }] },
  { id: "pers-yall-acc", answer: "euch", labels: [{ label: "YOU ALL", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe euch.", english: "I see you all." }] },
  { id: "pers-yall-dat", answer: "euch", labels: [{ label: "YOU ALL", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe euch.", english: "I help you all." }] },
  // 3rd person plural
  { id: "pers-they-nom", answer: "sie", labels: [{ label: "THEY", type: "meaning" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Sie kommen morgen.", english: "They are coming tomorrow." }] },
  { id: "pers-them-acc", answer: "sie", labels: [{ label: "THEM", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne sie.", english: "I know them." }] },
  { id: "pers-them-dat", answer: "ihnen", labels: [{ label: "THEM", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe ihnen.", english: "I help them." }] },
];

// ============ POSSESSIVE PRONOUNS ============
export const possessivePronounCards: LabelFormCard[] = [
  // === MEIN (my) ===
  { id: "mein", answer: "mein", context: "mein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Das ist mein Hund.", english: "That is my dog." }] },
  { id: "meine", answer: "meine", context: "mein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Meine Katze schläft.", english: "My cat is sleeping." }] },
  { id: "meinen", answer: "meinen", context: "mein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe meinen Bruder.", english: "I see my brother." }] },
  { id: "meinem", answer: "meinem", context: "mein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe meinem Vater.", english: "I help my father." }] },
  { id: "meiner", answer: "meiner", context: "mein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe meiner Mutter.", english: "I help my mother." }] },
  { id: "meines", answer: "meines", context: "mein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das ist das Buch meines Bruders.", english: "This is my brother's book." }] },
  { id: "meiner-gen", answer: "meiner", context: "mein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das ist das Auto meiner Mutter.", english: "This is my mother's car." }] },

  // === DEIN (your - informal) ===
  { id: "dein", answer: "dein", context: "dein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ist das dein Buch?", english: "Is that your book?" }] },
  { id: "deine", answer: "deine", context: "dein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Deine Schwester ist nett.", english: "Your sister is nice." }] },
  { id: "deinen", answer: "deinen", context: "dein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne deinen Bruder.", english: "I know your brother." }] },
  { id: "deinem", answer: "deinem", context: "dein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich fahre mit deinem Auto.", english: "I drive with your car." }] },
  { id: "deiner", answer: "deiner", context: "dein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich bin bei deiner Familie.", english: "I am with your family." }] },
  { id: "deines", answer: "deines", context: "dein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Haus deines Vaters.", english: "Your father's house." }] },
  { id: "deiner-gen", answer: "deiner", context: "dein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Auto deiner Schwester.", english: "Your sister's car." }] },

  // === SEIN (his/its) ===
  { id: "sein-poss", answer: "sein", context: "sein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Sein Hund ist groß.", english: "His dog is big." }] },
  { id: "seine", answer: "seine", context: "sein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Seine Mutter kocht.", english: "His mother is cooking." }] },
  { id: "seinen", answer: "seinen", context: "sein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er liebt seinen Bruder.", english: "He loves his brother." }] },
  { id: "seinem", answer: "seinem", context: "sein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Er hilft seinem Freund.", english: "He helps his friend." }] },
  { id: "seiner", answer: "seiner", context: "sein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Er wohnt bei seiner Schwester.", english: "He lives with his sister." }] },
  { id: "seines", answer: "seines", context: "sein", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Farbe seines Autos.", english: "The color of his car." }] },
  { id: "seiner-gen", answer: "seiner", context: "sein", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Haus seiner Eltern.", english: "His parents' house." }] },

  // === IHR (her) ===
  { id: "ihr-poss", answer: "ihr", context: "ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ihr Mann arbeitet.", english: "Her husband works." }] },
  { id: "ihre", answer: "ihre", context: "ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ihre Tasche ist rot.", english: "Her bag is red." }] },
  { id: "ihren", answer: "ihren", context: "ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Sie besucht ihren Vater.", english: "She visits her father." }] },
  { id: "ihrem", answer: "ihrem", context: "ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie spricht mit ihrem Chef.", english: "She speaks with her boss." }] },
  { id: "ihrer", answer: "ihrer", context: "ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie wohnt bei ihrer Familie.", english: "She lives with her family." }] },
  { id: "ihres", answer: "ihres", context: "ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Der Name ihres Hundes.", english: "Her dog's name." }] },
  { id: "ihrer-gen", answer: "ihrer", context: "ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Spielzeug ihrer Tochter.", english: "Her daughter's toy." }] },

  // === UNSER (our) ===
  { id: "unser", answer: "unser", context: "unser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Unser Haus ist alt.", english: "Our house is old." }] },
  { id: "unsere", answer: "unsere", context: "unser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Unsere Schule ist groß.", english: "Our school is big." }] },
  { id: "unseren", answer: "unseren", context: "unser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Wir sehen unseren Lehrer.", english: "We see our teacher." }] },
  { id: "unserem", answer: "unserem", context: "unser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Wir danken unserem Chef.", english: "We thank our boss." }] },
  { id: "unserer", answer: "unserer", context: "unser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Wir fahren zu unserer Oma.", english: "We drive to our grandma." }] },
  { id: "unseres", answer: "unseres", context: "unser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Der Garten unseres Hauses.", english: "Our house's garden." }] },
  { id: "unserer-gen", answer: "unserer", context: "unser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Adresse unserer Firma.", english: "Our company's address." }] },

  // === EUER (your - plural informal) ===
  { id: "euer", answer: "euer", context: "euer", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ist das euer Auto?", english: "Is that your car?" }] },
  { id: "eure", answer: "eure", context: "euer", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Eure Wohnung ist schön.", english: "Your apartment is nice." }] },
  { id: "euren", answer: "euren", context: "euer", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne euren Vater.", english: "I know your father." }] },
  { id: "eurem", answer: "eurem", context: "euer", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe eurem Sohn.", english: "I help your son." }] },
  { id: "eurer", answer: "eurer", context: "euer", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich spreche mit eurer Mutter.", english: "I speak with your mother." }] },
  { id: "eures", answer: "eures", context: "euer", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Der Name eures Lehrers.", english: "Your teacher's name." }] },
  { id: "eurer-gen", answer: "eurer", context: "euer", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Größe eurer Wohnung.", english: "Your apartment's size." }] },

  // === IHR (your - formal, always capitalized) ===
  { id: "Ihr-poss", answer: "Ihr", context: "Ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ist das Ihr Auto?", english: "Is that your car?" }] },
  { id: "Ihre", answer: "Ihre", context: "Ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ihre Tasche ist schön.", english: "Your bag is beautiful." }] },
  { id: "Ihren", answer: "Ihren", context: "Ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne Ihren Mann.", english: "I know your husband." }] },
  { id: "Ihrem", answer: "Ihrem", context: "Ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich mache das mit Ihrem Einverständnis.", english: "I do this with your consent." }] },
  { id: "Ihrer", answer: "Ihrer", context: "Ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Es gibt ein Restaurant in Ihrer Nähe.", english: "There is a restaurant near you." }] },
  { id: "Ihres", answer: "Ihres", context: "Ihr", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Qualität Ihres Produkts.", english: "Your product's quality." }] },
  { id: "Ihrer-gen", answer: "Ihrer", context: "Ihr", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Ergebnis Ihrer Arbeit.", english: "Your work's result." }] },
];

// ============ CHEATSHEETS ============
export const personalPronounsCheatsheet: DeckCheatsheet = {
  title: "Personal Pronouns",
  tables: [
    {
      title: "Singular",
      rows: [
        ["English", "NOM", "ACC", "DAT", "GEN"],
        ["I / me", "ich", "mi|ch", "mi|r", "mein|er"],
        ["you (informal)", "du", "di|ch", "di|r", "dein|er"],
        ["he / him", "er", "ih|n", "ih|m", "sein|er"],
        ["she / her", "sie", "sie", "ihr", "ihr|er"],
        ["it", "es", "es", "ih|m", "sein|er"],
        ["you (formal)", "Sie", "Sie", "Ih|nen", "Ihr|er"],
      ],
    },
    {
      title: "Plural",
      rows: [
        ["English", "NOM", "ACC", "DAT", "GEN"],
        ["we / us", "wir", "uns", "uns", "unser"],
        ["you (plural)", "ihr", "euch", "euch", "euer"],
        ["they / them", "sie", "sie", "ih|nen", "ihr|er"],
      ],
    },
  ],
  notes: [
    "NOM = subject (who?), ACC = direct object (whom?), DAT = indirect object (to whom?)",
    "Sie/Ihnen (formal) is always capitalized",
  ],
};

export const possessivePronounsCheatsheet: DeckCheatsheet = {
  title: "Possessive Pronouns",
  tables: [
    {
      title: "Base Forms",
      rows: [
        ["German", "English", "Person"],
        ["mein", "my", "ich"],
        ["dein", "your (informal)", "du"],
        ["sein", "his / its", "er / es"],
        ["ihr", "her / their", "sie (sg/pl)"],
        ["unser", "our", "wir"],
        ["euer*", "your (plural)", "ihr"],
        ["Ihr", "your (formal)", "Sie"],
      ],
    },
    {
      title: "Endings (add to base)",
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "\u2014", "-|e", "\u2014", "-|e"],
        ["ACC", "-|en", "-|e", "\u2014", "-|e"],
        ["DAT", "-|em", "-|er", "-|em", "-|en"],
        ["GEN", "-|es", "-|er", "-|es", "-|er"],
      ],
    },
  ],
  notes: [
    "*euer drops middle 'e' with endings (eure, euren, eurem)",
    "Example: Ihr + em = Ihrem (formal dative masc/neut)",
  ],
};
