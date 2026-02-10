import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ PERSONAL PRONOUNS ============
export const personalPronounCards: LabelFormCard[] = [
  // ICH (1st person singular)
  { id: "pers-ich-nom", answer: "ich", labels: [{ label: "ICH", type: "person" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ich bin hier.", english: "I am here." }] },
  { id: "pers-ich-acc", answer: "mich", labels: [{ label: "ICH", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er sieht mich.", english: "He sees me." }] },
  { id: "pers-ich-dat", answer: "mir", labels: [{ label: "ICH", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Gib mir das.", english: "Give me that." }] },
  // DU (2nd person singular informal)
  { id: "pers-du-nom", answer: "du", labels: [{ label: "DU", type: "person" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Du bist nett.", english: "You are nice." }] },
  { id: "pers-du-acc", answer: "dich", labels: [{ label: "DU", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich liebe dich.", english: "I love you." }] },
  { id: "pers-du-dat", answer: "dir", labels: [{ label: "DU", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe dir.", english: "I help you." }] },
  // ER/SIE/ES + MASCULINE (3rd person singular masculine)
  { id: "pers-er-nom", answer: "er", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Er arbeitet viel.", english: "He works a lot." }] },
  { id: "pers-er-acc", answer: "ihn", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne ihn.", english: "I know him." }] },
  { id: "pers-er-dat", answer: "ihm", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihm das Buch.", english: "I give him the book." }] },
  // ER/SIE/ES + FEMININE (3rd person singular feminine)
  { id: "pers-sie-f-nom", answer: "sie", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Sie singt schön.", english: "She sings beautifully." }] },
  { id: "pers-sie-f-acc", answer: "sie", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe sie.", english: "I see her." }] },
  { id: "pers-sie-f-dat", answer: "ihr", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihr das Buch.", english: "I give her the book." }] },
  // ER/SIE/ES + NEUTER (3rd person singular neuter)
  { id: "pers-es-nom", answer: "es", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Es regnet.", english: "It is raining." }] },
  { id: "pers-es-acc", answer: "es", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe es.", english: "I see it." }] },
  { id: "pers-es-dat", answer: "ihm", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich gebe ihm Wasser.", english: "I give it water." }] },
  // WIR (1st person plural)
  { id: "pers-wir-nom", answer: "wir", labels: [{ label: "WIR", type: "person" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Wir gehen zusammen.", english: "We go together." }] },
  { id: "pers-wir-acc", answer: "uns", labels: [{ label: "WIR", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er sieht uns.", english: "He sees us." }] },
  { id: "pers-wir-dat", answer: "uns", labels: [{ label: "WIR", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Er hilft uns.", english: "He helps us." }] },
  // IHR (2nd person plural informal)
  { id: "pers-ihr-nom", answer: "ihr", labels: [{ label: "IHR", type: "person" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ihr seid willkommen.", english: "You all are welcome." }] },
  { id: "pers-ihr-acc", answer: "euch", labels: [{ label: "IHR", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe euch.", english: "I see you all." }] },
  { id: "pers-ihr-dat", answer: "euch", labels: [{ label: "IHR", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe euch.", english: "I help you all." }] },
  // SIE/SIE (3rd person plural / 2nd person formal)
  { id: "pers-sie-pl-nom", answer: "sie", labels: [{ label: "SIE/SIE", type: "person" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Sie kommen morgen.", english: "They are coming tomorrow." }] },
  { id: "pers-sie-pl-acc", answer: "sie", labels: [{ label: "SIE/SIE", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich kenne sie.", english: "I know them." }] },
  { id: "pers-sie-pl-dat", answer: "ihnen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe ihnen.", english: "I help them." }] },
  // Genitive (literary/formal — used with genitive verbs like sich erinnern, sich bedienen)
  { id: "pers-ich-gen", answer: "meiner", labels: [{ label: "ICH", type: "person" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Erinnere dich meiner.", english: "Remember me." }] },
  { id: "pers-du-gen", answer: "deiner", labels: [{ label: "DU", type: "person" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Ich gedenke deiner.", english: "I think of you." }] },
  { id: "pers-er-gen", answer: "seiner", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Man bedarf seiner.", english: "One needs him." }] },
  { id: "pers-sie-f-gen", answer: "ihrer", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Er erinnert sich ihrer.", english: "He remembers her." }] },
  { id: "pers-es-gen", answer: "seiner", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Man bedarf seiner.", english: "One needs it." }] },
  { id: "pers-wir-gen", answer: "unser", labels: [{ label: "WIR", type: "person" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Gedenke unser.", english: "Remember us." }] },
  { id: "pers-ihr-gen", answer: "euer", labels: [{ label: "IHR", type: "person" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Man gedenkt euer.", english: "One remembers you all." }] },
  { id: "pers-sie-pl-gen", answer: "ihrer", labels: [{ label: "SIE/SIE", type: "person" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Man erinnert sich ihrer.", english: "One remembers them." }] },
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
