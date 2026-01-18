import type { TranslationWord, DeckCheatsheet } from "@/types";

// ============ AKKUSATIV PREPOSITIONS ============
// Always take the accusative case
export const akkusativPrepositionWords: TranslationWord[] = [
  {
    id: "durch",
    german: "durch",
    english: "through",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir gehen durch den Park.", english: "We walk through the park." },
      { german: "Der Fluss fließt durch die Stadt.", english: "The river flows through the city." },
    ],
  },
  {
    id: "für",
    german: "für",
    english: "for",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das ist für dich.", english: "This is for you." },
      { german: "Ich arbeite für eine Firma.", english: "I work for a company." },
    ],
  },
  {
    id: "gegen-against",
    german: "gegen",
    english: "against",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir spielen gegen die andere Mannschaft.", english: "We play against the other team." },
      { german: "Ich bin gegen diese Idee.", english: "I am against this idea." },
    ],
  },
  {
    id: "gegen-around",
    german: "gegen",
    english: "around",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir kommen gegen acht Uhr.", english: "We arrive around eight o'clock." },
      { german: "Gegen Mittag regnet es.", english: "Around noon it rains." },
    ],
  },
  {
    id: "ohne",
    german: "ohne",
    english: "without",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich trinke Kaffee ohne Milch.", english: "I drink coffee without milk." },
      { german: "Ohne dich gehe ich nicht.", english: "Without you I won't go." },
    ],
  },
  {
    id: "um-around",
    german: "um",
    english: "around",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir gehen um das Haus.", english: "We walk around the house." },
      { german: "Um die Ecke ist ein Café.", english: "Around the corner is a café." },
    ],
  },
  {
    id: "um-at",
    german: "um",
    english: "at",
    partOfSpeech: "preposition",
    examples: [
      { german: "Um acht Uhr beginnt der Film.", english: "At eight o'clock the film starts." },
      { german: "Wir treffen uns um drei.", english: "We meet at three." },
    ],
  },
  {
    id: "bis",
    german: "bis",
    english: "until / by",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich arbeite bis fünf Uhr.", english: "I work until five o'clock." },
      { german: "Bis morgen!", english: "See you tomorrow!" },
    ],
  },
  {
    id: "entlang",
    german: "entlang",
    english: "along",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir gehen den Fluss entlang.", english: "We walk along the river." },
      { german: "Fahren Sie die Straße entlang.", english: "Drive along the street." },
    ],
  },
];

// ============ DATIV PREPOSITIONS ============
// Always take the dative case
export const dativPrepositionWords: TranslationWord[] = [
  // === AUS ===
  {
    id: "aus-from",
    german: "aus",
    english: "from",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich komme aus Deutschland.", english: "I come from Germany." },
      { german: "Der Wein ist aus Frankreich.", english: "The wine is from France." },
    ],
  },
  {
    id: "aus-outof",
    german: "aus",
    english: "out of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Er geht aus dem Haus.", english: "He goes out of the house." },
      { german: "Sie nimmt das Buch aus der Tasche.", english: "She takes the book out of the bag." },
    ],
  },

  // === BEI ===
  {
    id: "bei-at",
    german: "bei",
    english: "at",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich bin bei der Arbeit.", english: "I am at work." },
      { german: "Er arbeitet bei Siemens.", english: "He works at Siemens." },
    ],
  },
  {
    id: "bei-with",
    german: "bei",
    english: "with",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich wohne bei meinen Eltern.", english: "I live with my parents." },
      { german: "Ich bin bei meiner Freundin.", english: "I'm with my girlfriend." },
    ],
  },

  // === MIT ===
  {
    id: "mit-with",
    german: "mit",
    english: "with",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich komme mit dir.", english: "I am coming with you." },
      { german: "Sie schreibt mit einem Kugelschreiber.", english: "She writes with a pen." },
    ],
  },
  {
    id: "mit-by",
    german: "mit",
    english: "by",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich fahre mit dem Bus.", english: "I go by bus." },
      { german: "Wir fliegen mit dem Flugzeug.", english: "We fly by plane." },
    ],
  },

  // === NACH ===
  {
    id: "nach-to",
    german: "nach",
    english: "to",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich fahre nach Berlin.", english: "I am going to Berlin." },
      { german: "Wir fliegen nach Japan.", english: "We are flying to Japan." },
    ],
  },
  {
    id: "nach-after",
    german: "nach",
    english: "after",
    partOfSpeech: "preposition",
    examples: [
      { german: "Nach dem Essen gehe ich spazieren.", english: "After the meal I go for a walk." },
      { german: "Nach der Arbeit bin ich müde.", english: "After work I am tired." },
    ],
  },

  // === SEIT ===
  {
    id: "seit-since",
    german: "seit",
    english: "since",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich wohne hier seit 2020.", english: "I have lived here since 2020." },
      { german: "Seit Montag bin ich krank.", english: "I have been sick since Monday." },
    ],
  },
  {
    id: "seit-for",
    german: "seit",
    english: "for",
    partOfSpeech: "preposition",
    examples: [
      { german: "Seit einem Jahr lerne ich Deutsch.", english: "I have been learning German for a year." },
      { german: "Wir warten seit drei Stunden.", english: "We have been waiting for three hours." },
    ],
  },

  // === VON ===
  {
    id: "von-from",
    german: "von",
    english: "from",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich komme von der Arbeit.", english: "I am coming from work." },
      { german: "Der Zug fährt von Berlin.", english: "The train departs from Berlin." },
    ],
  },
  {
    id: "von-of",
    german: "von",
    english: "of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das ist das Haus von meiner Freundin.", english: "That is my friend's house." },
      { german: "Die Farbe von dem Auto ist rot.", english: "The color of the car is red." },
    ],
  },
  {
    id: "von-by",
    german: "von",
    english: "by",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das Buch wurde von ihm geschrieben.", english: "The book was written by him." },
      { german: "Das Foto wurde von einer Künstlerin gemacht.", english: "The photo was taken by an artist." },
    ],
  },

  // === ZU ===
  {
    id: "zu",
    german: "zu",
    english: "to",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich gehe zu dir.", english: "I am going to you." },
      { german: "Wir fahren zum Bahnhof.", english: "We drive to the station." },
    ],
  },

  // === AUßER ===
  {
    id: "außer",
    german: "außer",
    english: "except / besides",
    partOfSpeech: "preposition",
    examples: [
      { german: "Alle kommen außer dir.", english: "Everyone is coming except you." },
      { german: "Außer einem Hund hat sie keine Haustiere.", english: "Besides a dog she has no pets." },
    ],
  },

  // === GEGENÜBER ===
  {
    id: "gegenüber",
    german: "gegenüber",
    english: "across from / opposite",
    partOfSpeech: "preposition",
    examples: [
      { german: "Die Bank ist gegenüber dem Supermarkt.", english: "The bank is across from the supermarket." },
      { german: "Er sitzt mir gegenüber.", english: "He sits opposite me." },
    ],
  },

  // === AB ===
  {
    id: "ab",
    german: "ab",
    english: "from / starting from",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ab morgen arbeite ich hier.", english: "Starting from tomorrow I work here." },
      { german: "Kinder ab sechs Jahren.", english: "Children from six years old." },
    ],
  },
];

// ============ WECHSELPRÄPOSITIONEN ============
// Accusative for movement (wohin?), Dative for location (wo?)
export const wechselPrepositionWords: TranslationWord[] = [
  // === AN ===
  {
    id: "an-at",
    german: "an",
    english: "at",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich warte an der Haltestelle.", english: "I wait at the bus stop." },
      { german: "An der Ecke steht ein Baum.", english: "At the corner stands a tree." },
    ],
  },
  {
    id: "an-on",
    german: "an",
    english: "on",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das Bild hängt an der Wand.", english: "The picture hangs on the wall." },
      { german: "Ich hänge das Bild an die Wand.", english: "I hang the picture on the wall." },
    ],
  },

  // === AUF ===
  {
    id: "auf",
    german: "auf",
    english: "on",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das Buch liegt auf dem Tisch.", english: "The book is on the table." },
      { german: "Ich lege das Buch auf den Tisch.", english: "I put the book on the table." },
    ],
  },

  // === HINTER ===
  {
    id: "hinter",
    german: "hinter",
    english: "behind",
    partOfSpeech: "preposition",
    examples: [
      { german: "Die Katze sitzt hinter dem Sofa.", english: "The cat sits behind the sofa." },
      { german: "Die Katze läuft hinter das Sofa.", english: "The cat runs behind the sofa." },
    ],
  },

  // === IN ===
  {
    id: "in-location",
    german: "in",
    english: "in",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich bin in der Stadt.", english: "I am in the city." },
      { german: "Das Buch ist in der Tasche.", english: "The book is in the bag." },
    ],
  },
  {
    id: "in-movement",
    german: "in",
    english: "into",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich gehe in die Stadt.", english: "I go into the city." },
      { german: "Er legt das Buch in die Tasche.", english: "He puts the book into the bag." },
    ],
  },

  // === NEBEN ===
  {
    id: "neben",
    german: "neben",
    english: "next to / beside",
    partOfSpeech: "preposition",
    examples: [
      { german: "Die Lampe steht neben dem Bett.", english: "The lamp stands next to the bed." },
      { german: "Ich stelle die Lampe neben das Bett.", english: "I place the lamp next to the bed." },
    ],
  },

  // === ÜBER ===
  {
    id: "über-over",
    german: "über",
    english: "over / above",
    partOfSpeech: "preposition",
    examples: [
      { german: "Die Lampe hängt über dem Tisch.", english: "The lamp hangs over the table." },
      { german: "Der Vogel fliegt über das Haus.", english: "The bird flies over the house." },
    ],
  },
  {
    id: "über-about",
    german: "über",
    english: "about",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wir sprechen über das Wetter.", english: "We talk about the weather." },
      { german: "Ich denke über das Problem nach.", english: "I think about the problem." },
    ],
  },

  // === UNTER ===
  {
    id: "unter-under",
    german: "unter",
    english: "under / below",
    partOfSpeech: "preposition",
    examples: [
      { german: "Die Katze ist unter dem Tisch.", english: "The cat is under the table." },
      { german: "Die Katze kriecht unter den Tisch.", english: "The cat crawls under the table." },
    ],
  },
  {
    id: "unter-among",
    german: "unter",
    english: "among",
    partOfSpeech: "preposition",
    examples: [
      { german: "Unter Freunden kann man offen reden.", english: "Among friends one can speak openly." },
      { german: "Das bleibt unter uns.", english: "That stays between us." },
    ],
  },

  // === VOR ===
  {
    id: "vor-infront",
    german: "vor",
    english: "in front of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Ich stehe vor dem Haus.", english: "I stand in front of the house." },
      { german: "Ich gehe vor das Haus.", english: "I go to the front of the house." },
    ],
  },
  {
    id: "vor-before",
    german: "vor",
    english: "before",
    partOfSpeech: "preposition",
    examples: [
      { german: "Vor dem Essen wasche ich mir die Hände.", english: "Before eating I wash my hands." },
      { german: "Vor der Prüfung bin ich nervös.", english: "Before the exam I am nervous." },
    ],
  },
  {
    id: "vor-ago",
    german: "vor",
    english: "ago",
    partOfSpeech: "preposition",
    examples: [
      { german: "Vor zwei Jahren war ich dort.", english: "Two years ago I was there." },
      { german: "Das war vor einer Woche.", english: "That was a week ago." },
    ],
  },

  // === ZWISCHEN ===
  {
    id: "zwischen",
    german: "zwischen",
    english: "between",
    partOfSpeech: "preposition",
    examples: [
      { german: "Das Café ist zwischen der Bank und dem Kino.", english: "The café is between the bank and the cinema." },
      { german: "Ich setze mich zwischen die beiden.", english: "I sit down between the two of them." },
    ],
  },
];

// ============ GENITIV PREPOSITIONS ============
// Traditionally take genitive (some shift to dative in spoken German)
export const genitivPrepositionWords: TranslationWord[] = [
  {
    id: "wegen",
    german: "wegen",
    english: "because of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Wegen des Regens bleiben wir zu Hause.", english: "Because of the rain we stay at home." },
      { german: "Wegen der Kinder fahren wir langsamer.", english: "Because of the children we drive slower." },
    ],
  },
  {
    id: "während",
    german: "während",
    english: "during",
    partOfSpeech: "preposition",
    examples: [
      { german: "Während des Unterrichts muss man leise sein.", english: "During class one must be quiet." },
      { german: "Während der Ferien reisen wir.", english: "During the holidays we travel." },
    ],
  },
  {
    id: "trotz",
    german: "trotz",
    english: "despite / in spite of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Trotz des schlechten Wetters gehen wir spazieren.", english: "Despite the bad weather we go for a walk." },
      { german: "Trotz der Müdigkeit arbeitet sie weiter.", english: "In spite of the tiredness she keeps working." },
    ],
  },
  {
    id: "statt",
    german: "(an)statt",
    english: "instead of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Statt des Kuchens nehme ich einen Salat.", english: "Instead of the cake I take a salad." },
      { german: "Anstatt einer Antwort schweigt er.", english: "Instead of an answer he stays silent." },
    ],
  },
  {
    id: "innerhalb",
    german: "innerhalb",
    english: "within / inside of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Innerhalb der Stadt gibt es viele Parks.", english: "Within the city there are many parks." },
      { german: "Innerhalb einer Woche ist es fertig.", english: "Within a week it will be done." },
    ],
  },
  {
    id: "außerhalb",
    german: "außerhalb",
    english: "outside of",
    partOfSpeech: "preposition",
    examples: [
      { german: "Außerhalb der Stadt ist es ruhig.", english: "Outside the city it is quiet." },
      { german: "Außerhalb der Öffnungszeiten ist geschlossen.", english: "Outside opening hours it is closed." },
    ],
  },
];

export const prepositionsCheatsheet: DeckCheatsheet = {
  title: "Prepositions by Case",
  tables: [
    {
      title: "Accusative",
      rows: [
        ["", "Meaning"],
        ["durch", "through"],
        ["für", "for"],
        ["gegen", "against, around"],
        ["ohne", "without"],
        ["um", "around, at"],
        ["bis", "until, by"],
        ["entlang", "along"],
      ],
    },
    {
      title: "Dative",
      rows: [
        ["", "Meaning"],
        ["aus", "from, out of"],
        ["außer", "except, besides"],
        ["bei", "at, with"],
        ["mit", "with, by"],
        ["nach", "to, after"],
        ["seit", "since, for"],
        ["von", "from, of, by"],
        ["zu", "to"],
        ["gegenüber", "across from"],
        ["ab", "from, starting from"],
      ],
    },
    {
      title: "Two-way (Wechselpräpositionen)",
      rows: [
        ["", "Meaning"],
        ["an", "at, on"],
        ["auf", "on"],
        ["hinter", "behind"],
        ["in", "in, into"],
        ["neben", "next to"],
        ["über", "over, about"],
        ["unter", "under, among"],
        ["vor", "in front of, before, ago"],
        ["zwischen", "between"],
      ],
    },
    {
      title: "Genitive",
      rows: [
        ["", "Meaning"],
        ["wegen", "because of"],
        ["während", "during"],
        ["trotz", "despite"],
        ["(an)statt", "instead of"],
        ["innerhalb", "within"],
        ["außerhalb", "outside of"],
      ],
    },
  ],
  notes: [
    "Two-way: Wo? (location) → Dative, Wohin? (movement) → Accusative",
    "Genitive prepositions often use dative in spoken German",
  ],
};
