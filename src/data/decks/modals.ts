import type { DeckCheatsheet, LabelFormCard } from "@/types";

const PRES = { label: "PRÄSENS", type: "tense" } as const;
const PRET = { label: "PRÄTERITUM", type: "tense" } as const;
const KONJ = { label: "KONJUNKTIV II", type: "tense" } as const;

const ICH = { label: "ICH", type: "person" } as const;
const DU = { label: "DU", type: "person" } as const;
const ER = { label: "ER/SIE/ES", type: "person" } as const;
const WIR = { label: "WIR", type: "person" } as const;
const IHR = { label: "IHR", type: "person" } as const;
const SIE = { label: "SIE/SIE", type: "person" } as const;

// ============ KÖNNEN (can, to be able to) ============
export const koennenCards: LabelFormCard[] = [
  // Präsens
  { id: "koennen-ich", answer: "kann", context: "können", labels: [ICH, PRES], examples: [{ german: "Ich kann schwimmen.", english: "I can swim." }]},
  { id: "koennen-du", answer: "kannst", context: "können", labels: [DU, PRES], examples: [{ german: "Kannst du mir helfen?", english: "Can you help me?" }]},
  { id: "koennen-er", answer: "kann", context: "können", labels: [ER, PRES], examples: [{ german: "Er kann gut kochen.", english: "He can cook well." }]},
  { id: "koennen-wir", answer: "können", context: "können", labels: [WIR, PRES], examples: [{ german: "Wir können gehen.", english: "We can go." }]},
  { id: "koennen-ihr", answer: "könnt", context: "können", labels: [IHR, PRES], examples: [{ german: "Könnt ihr das machen?", english: "Can you (pl.) do that?" }]},
  { id: "koennen-sie", answer: "können", context: "können", labels: [SIE, PRES], examples: [{ german: "Sie können Deutsch.", english: "They can speak German." }]},
  // Präteritum
  { id: "koennen-ich-pret", answer: "konnte", context: "können", labels: [ICH, PRET], examples: [{ german: "Ich konnte nicht schlafen.", english: "I couldn't sleep." }]},
  { id: "koennen-du-pret", answer: "konntest", context: "können", labels: [DU, PRET], examples: [{ german: "Konntest du das sehen?", english: "Could you see that?" }]},
  { id: "koennen-er-pret", answer: "konnte", context: "können", labels: [ER, PRET], examples: [{ german: "Er konnte nicht kommen.", english: "He couldn't come." }]},
  { id: "koennen-wir-pret", answer: "konnten", context: "können", labels: [WIR, PRET], examples: [{ german: "Wir konnten nichts machen.", english: "We couldn't do anything." }]},
  { id: "koennen-ihr-pret", answer: "konntet", context: "können", labels: [IHR, PRET], examples: [{ german: "Konntet ihr ihn finden?", english: "Could you (pl.) find him?" }]},
  { id: "koennen-sie-pret", answer: "konnten", context: "können", labels: [SIE, PRET], examples: [{ german: "Sie konnten es nicht glauben.", english: "They couldn't believe it." }]},
  // Konjunktiv II
  { id: "koennen-ich-konj2", answer: "könnte", context: "können", labels: [ICH, KONJ], examples: [{ german: "Ich könnte dir helfen.", english: "I could help you." }]},
  { id: "koennen-du-konj2", answer: "könntest", context: "können", labels: [DU, KONJ], examples: [{ german: "Könntest du das machen?", english: "Could you do that?" }]},
  { id: "koennen-er-konj2", answer: "könnte", context: "können", labels: [ER, KONJ], examples: [{ german: "Er könnte recht haben.", english: "He could be right." }]},
  { id: "koennen-wir-konj2", answer: "könnten", context: "können", labels: [WIR, KONJ], examples: [{ german: "Wir könnten ins Kino gehen.", english: "We could go to the cinema." }]},
  { id: "koennen-ihr-konj2", answer: "könntet", context: "können", labels: [IHR, KONJ], examples: [{ german: "Ihr könntet mehr üben.", english: "You (pl.) could practice more." }]},
  { id: "koennen-sie-konj2", answer: "könnten", context: "können", labels: [SIE, KONJ], examples: [{ german: "Sie könnten morgen kommen.", english: "They could come tomorrow." }]},
];

// ============ MÜSSEN (must, to have to) ============
export const muessenCards: LabelFormCard[] = [
  // Präsens
  { id: "muessen-ich", answer: "muss", context: "müssen", labels: [ICH, PRES], examples: [{ german: "Ich muss arbeiten.", english: "I must work." }]},
  { id: "muessen-du", answer: "musst", context: "müssen", labels: [DU, PRES], examples: [{ german: "Du musst lernen.", english: "You must study." }]},
  { id: "muessen-er", answer: "muss", context: "müssen", labels: [ER, PRES], examples: [{ german: "Er muss gehen.", english: "He must go." }]},
  { id: "muessen-wir", answer: "müssen", context: "müssen", labels: [WIR, PRES], examples: [{ german: "Wir müssen einkaufen.", english: "We must go shopping." }]},
  { id: "muessen-ihr", answer: "müsst", context: "müssen", labels: [IHR, PRES], examples: [{ german: "Ihr müsst leise sein.", english: "You (pl.) must be quiet." }]},
  { id: "muessen-sie", answer: "müssen", context: "müssen", labels: [SIE, PRES], examples: [{ german: "Sie müssen warten.", english: "They must wait." }]},
  // Präteritum
  { id: "muessen-ich-pret", answer: "musste", context: "müssen", labels: [ICH, PRET], examples: [{ german: "Ich musste früh aufstehen.", english: "I had to get up early." }]},
  { id: "muessen-du-pret", answer: "musstest", context: "müssen", labels: [DU, PRET], examples: [{ german: "Musstest du lange warten?", english: "Did you have to wait long?" }]},
  { id: "muessen-er-pret", answer: "musste", context: "müssen", labels: [ER, PRET], examples: [{ german: "Er musste zum Arzt.", english: "He had to go to the doctor." }]},
  { id: "muessen-wir-pret", answer: "mussten", context: "müssen", labels: [WIR, PRET], examples: [{ german: "Wir mussten umziehen.", english: "We had to move." }]},
  { id: "muessen-ihr-pret", answer: "musstet", context: "müssen", labels: [IHR, PRET], examples: [{ german: "Musstet ihr das bezahlen?", english: "Did you (pl.) have to pay for that?" }]},
  { id: "muessen-sie-pret", answer: "mussten", context: "müssen", labels: [SIE, PRET], examples: [{ german: "Sie mussten lachen.", english: "They had to laugh." }]},
  // Konjunktiv II
  { id: "muessen-ich-konj2", answer: "müsste", context: "müssen", labels: [ICH, KONJ], examples: [{ german: "Ich müsste eigentlich gehen.", english: "I should actually go." }]},
  { id: "muessen-du-konj2", answer: "müsstest", context: "müssen", labels: [DU, KONJ], examples: [{ german: "Du müsstest mehr lernen.", english: "You should study more." }]},
  { id: "muessen-er-konj2", answer: "müsste", context: "müssen", labels: [ER, KONJ], examples: [{ german: "Er müsste das wissen.", english: "He should know that." }]},
  { id: "muessen-wir-konj2", answer: "müssten", context: "müssen", labels: [WIR, KONJ], examples: [{ german: "Wir müssten uns beeilen.", english: "We should hurry." }]},
  { id: "muessen-ihr-konj2", answer: "müsstet", context: "müssen", labels: [IHR, KONJ], examples: [{ german: "Ihr müsstet das verstehen.", english: "You (pl.) should understand that." }]},
  { id: "muessen-sie-konj2", answer: "müssten", context: "müssen", labels: [SIE, KONJ], examples: [{ german: "Sie müssten bald ankommen.", english: "They should arrive soon." }]},
];

// ============ WOLLEN (to want) ============
export const wollenCards: LabelFormCard[] = [
  // Präsens
  { id: "wollen-ich", answer: "will", context: "wollen", labels: [ICH, PRES], examples: [{ german: "Ich will schlafen.", english: "I want to sleep." }]},
  { id: "wollen-du", answer: "willst", context: "wollen", labels: [DU, PRES], examples: [{ german: "Was willst du?", english: "What do you want?" }]},
  { id: "wollen-er", answer: "will", context: "wollen", labels: [ER, PRES], examples: [{ german: "Sie will nach Hause.", english: "She wants to go home." }]},
  { id: "wollen-wir", answer: "wollen", context: "wollen", labels: [WIR, PRES], examples: [{ german: "Wir wollen essen.", english: "We want to eat." }]},
  { id: "wollen-ihr", answer: "wollt", context: "wollen", labels: [IHR, PRES], examples: [{ german: "Wollt ihr mitkommen?", english: "Do you (pl.) want to come along?" }]},
  { id: "wollen-sie", answer: "wollen", context: "wollen", labels: [SIE, PRES], examples: [{ german: "Sie wollen bleiben.", english: "They want to stay." }]},
  // Präteritum
  { id: "wollen-ich-pret", answer: "wollte", context: "wollen", labels: [ICH, PRET], examples: [{ german: "Ich wollte dich anrufen.", english: "I wanted to call you." }]},
  { id: "wollen-du-pret", answer: "wolltest", context: "wollen", labels: [DU, PRET], examples: [{ german: "Wolltest du das wirklich?", english: "Did you really want that?" }]},
  { id: "wollen-er-pret", answer: "wollte", context: "wollen", labels: [ER, PRET], examples: [{ german: "Er wollte nicht gehen.", english: "He didn't want to go." }]},
  { id: "wollen-wir-pret", answer: "wollten", context: "wollen", labels: [WIR, PRET], examples: [{ german: "Wir wollten ins Kino.", english: "We wanted to go to the cinema." }]},
  { id: "wollen-ihr-pret", answer: "wolltet", context: "wollen", labels: [IHR, PRET], examples: [{ german: "Wolltet ihr das kaufen?", english: "Did you (pl.) want to buy that?" }]},
  { id: "wollen-sie-pret", answer: "wollten", context: "wollen", labels: [SIE, PRET], examples: [{ german: "Sie wollten helfen.", english: "They wanted to help." }]},
  // Konjunktiv II (identical to Präteritum for wollen)
  { id: "wollen-ich-konj2", answer: "wollte", context: "wollen", labels: [ICH, KONJ], examples: [{ german: "Ich wollte, ich wäre dort.", english: "I wish I were there." }]},
  { id: "wollen-du-konj2", answer: "wolltest", context: "wollen", labels: [DU, KONJ], examples: [{ german: "Wenn du wolltest, könntest du kommen.", english: "If you wanted, you could come." }]},
  { id: "wollen-er-konj2", answer: "wollte", context: "wollen", labels: [ER, KONJ], examples: [{ german: "Wenn er wollte, könnte er es schaffen.", english: "If he wanted, he could do it." }]},
  { id: "wollen-wir-konj2", answer: "wollten", context: "wollen", labels: [WIR, KONJ], examples: [{ german: "Wenn wir wollten, könnten wir gehen.", english: "If we wanted, we could go." }]},
  { id: "wollen-ihr-konj2", answer: "wolltet", context: "wollen", labels: [IHR, KONJ], examples: [{ german: "Wenn ihr wolltet, könntet ihr bleiben.", english: "If you (pl.) wanted, you could stay." }]},
  { id: "wollen-sie-konj2", answer: "wollten", context: "wollen", labels: [SIE, KONJ], examples: [{ german: "Wenn sie wollten, könnten sie kommen.", english: "If they wanted, they could come." }]},
];

// ============ SOLLEN (should, to be supposed to) ============
export const sollenCards: LabelFormCard[] = [
  // Präsens
  { id: "sollen-ich", answer: "soll", context: "sollen", labels: [ICH, PRES], examples: [{ german: "Was soll ich machen?", english: "What should I do?" }]},
  { id: "sollen-du", answer: "sollst", context: "sollen", labels: [DU, PRES], examples: [{ german: "Du sollst nicht lügen.", english: "You shall not lie." }]},
  { id: "sollen-er", answer: "soll", context: "sollen", labels: [ER, PRES], examples: [{ german: "Er soll kommen.", english: "He is supposed to come." }]},
  { id: "sollen-wir", answer: "sollen", context: "sollen", labels: [WIR, PRES], examples: [{ german: "Sollen wir gehen?", english: "Should we go?" }]},
  { id: "sollen-ihr", answer: "sollt", context: "sollen", labels: [IHR, PRES], examples: [{ german: "Ihr sollt aufpassen.", english: "You (pl.) should pay attention." }]},
  { id: "sollen-sie", answer: "sollen", context: "sollen", labels: [SIE, PRES], examples: [{ german: "Sie sollen anrufen.", english: "They are supposed to call." }]},
  // Präteritum
  { id: "sollen-ich-pret", answer: "sollte", context: "sollen", labels: [ICH, PRET], examples: [{ german: "Ich sollte das machen.", english: "I was supposed to do that." }]},
  { id: "sollen-du-pret", answer: "solltest", context: "sollen", labels: [DU, PRET], examples: [{ german: "Du solltest dort sein.", english: "You were supposed to be there." }]},
  { id: "sollen-er-pret", answer: "sollte", context: "sollen", labels: [ER, PRET], examples: [{ german: "Er sollte anrufen.", english: "He was supposed to call." }]},
  { id: "sollen-wir-pret", answer: "sollten", context: "sollen", labels: [WIR, PRET], examples: [{ german: "Wir sollten um acht da sein.", english: "We were supposed to be there at eight." }]},
  { id: "sollen-ihr-pret", answer: "solltet", context: "sollen", labels: [IHR, PRET], examples: [{ german: "Ihr solltet das wissen.", english: "You (pl.) were supposed to know that." }]},
  { id: "sollen-sie-pret", answer: "sollten", context: "sollen", labels: [SIE, PRET], examples: [{ german: "Sie sollten kommen.", english: "They were supposed to come." }]},
  // Konjunktiv II (identical to Präteritum for sollen)
  { id: "sollen-ich-konj2", answer: "sollte", context: "sollen", labels: [ICH, KONJ], examples: [{ german: "Ich sollte mehr Sport machen.", english: "I should do more sports." }]},
  { id: "sollen-du-konj2", answer: "solltest", context: "sollen", labels: [DU, KONJ], examples: [{ german: "Du solltest das lesen.", english: "You should read that." }]},
  { id: "sollen-er-konj2", answer: "sollte", context: "sollen", labels: [ER, KONJ], examples: [{ german: "Er sollte zum Arzt gehen.", english: "He should go to the doctor." }]},
  { id: "sollen-wir-konj2", answer: "sollten", context: "sollen", labels: [WIR, KONJ], examples: [{ german: "Wir sollten uns beeilen.", english: "We should hurry." }]},
  { id: "sollen-ihr-konj2", answer: "solltet", context: "sollen", labels: [IHR, KONJ], examples: [{ german: "Ihr solltet vorsichtig sein.", english: "You (pl.) should be careful." }]},
  { id: "sollen-sie-konj2", answer: "sollten", context: "sollen", labels: [SIE, KONJ], examples: [{ german: "Sie sollten das versuchen.", english: "They should try that." }]},
];

// ============ DÜRFEN (may, to be allowed to) ============
export const duerfenCards: LabelFormCard[] = [
  // Präsens
  { id: "duerfen-ich", answer: "darf", context: "dürfen", labels: [ICH, PRES], examples: [{ german: "Darf ich fragen?", english: "May I ask?" }]},
  { id: "duerfen-du", answer: "darfst", context: "dürfen", labels: [DU, PRES], examples: [{ german: "Du darfst das nicht.", english: "You are not allowed to do that." }]},
  { id: "duerfen-er", answer: "darf", context: "dürfen", labels: [ER, PRES], examples: [{ german: "Er darf bleiben.", english: "He may stay." }]},
  { id: "duerfen-wir", answer: "dürfen", context: "dürfen", labels: [WIR, PRES], examples: [{ german: "Wir dürfen nicht rauchen.", english: "We are not allowed to smoke." }]},
  { id: "duerfen-ihr", answer: "dürft", context: "dürfen", labels: [IHR, PRES], examples: [{ german: "Ihr dürft gehen.", english: "You (pl.) may go." }]},
  { id: "duerfen-sie", answer: "dürfen", context: "dürfen", labels: [SIE, PRES], examples: [{ german: "Sie dürfen hier parken.", english: "They may park here." }]},
  // Präteritum
  { id: "duerfen-ich-pret", answer: "durfte", context: "dürfen", labels: [ICH, PRET], examples: [{ german: "Ich durfte nicht raus.", english: "I wasn't allowed to go outside." }]},
  { id: "duerfen-du-pret", answer: "durftest", context: "dürfen", labels: [DU, PRET], examples: [{ german: "Durftest du das?", english: "Were you allowed to do that?" }]},
  { id: "duerfen-er-pret", answer: "durfte", context: "dürfen", labels: [ER, PRET], examples: [{ german: "Er durfte nicht mitkommen.", english: "He wasn't allowed to come along." }]},
  { id: "duerfen-wir-pret", answer: "durften", context: "dürfen", labels: [WIR, PRET], examples: [{ german: "Wir durften länger bleiben.", english: "We were allowed to stay longer." }]},
  { id: "duerfen-ihr-pret", answer: "durftet", context: "dürfen", labels: [IHR, PRET], examples: [{ german: "Durftet ihr das machen?", english: "Were you (pl.) allowed to do that?" }]},
  { id: "duerfen-sie-pret", answer: "durften", context: "dürfen", labels: [SIE, PRET], examples: [{ german: "Sie durften nicht sprechen.", english: "They weren't allowed to speak." }]},
  // Konjunktiv II
  { id: "duerfen-ich-konj2", answer: "dürfte", context: "dürfen", labels: [ICH, KONJ], examples: [{ german: "Dürfte ich Sie fragen?", english: "Might I ask you?" }]},
  { id: "duerfen-du-konj2", answer: "dürftest", context: "dürfen", labels: [DU, KONJ], examples: [{ german: "Du dürftest das eigentlich nicht.", english: "You shouldn't really do that." }]},
  { id: "duerfen-er-konj2", answer: "dürfte", context: "dürfen", labels: [ER, KONJ], examples: [{ german: "Das dürfte stimmen.", english: "That should be correct." }]},
  { id: "duerfen-wir-konj2", answer: "dürften", context: "dürfen", labels: [WIR, KONJ], examples: [{ german: "Wir dürften bald ankommen.", english: "We should arrive soon." }]},
  { id: "duerfen-ihr-konj2", answer: "dürftet", context: "dürfen", labels: [IHR, KONJ], examples: [{ german: "Ihr dürftet das nicht tun.", english: "You (pl.) shouldn't do that." }]},
  { id: "duerfen-sie-konj2", answer: "dürften", context: "dürfen", labels: [SIE, KONJ], examples: [{ german: "Sie dürften recht haben.", english: "They are probably right." }]},
];

// ============ MÖGEN (to like) ============
export const moegenCards: LabelFormCard[] = [
  // Präsens
  { id: "moegen-ich", answer: "mag", context: "mögen", labels: [ICH, PRES], examples: [{ german: "Ich mag Schokolade.", english: "I like chocolate." }]},
  { id: "moegen-du", answer: "magst", context: "mögen", labels: [DU, PRES], examples: [{ german: "Magst du Kaffee?", english: "Do you like coffee?" }]},
  { id: "moegen-er", answer: "mag", context: "mögen", labels: [ER, PRES], examples: [{ german: "Sie mag Musik.", english: "She likes music." }]},
  { id: "moegen-wir", answer: "mögen", context: "mögen", labels: [WIR, PRES], examples: [{ german: "Wir mögen Pizza.", english: "We like pizza." }]},
  { id: "moegen-ihr", answer: "mögt", context: "mögen", labels: [IHR, PRES], examples: [{ german: "Mögt ihr Fußball?", english: "Do you (pl.) like football?" }]},
  { id: "moegen-sie", answer: "mögen", context: "mögen", labels: [SIE, PRES], examples: [{ german: "Sie mögen das Essen.", english: "They like the food." }]},
  // Präteritum
  { id: "moegen-ich-pret", answer: "mochte", context: "mögen", labels: [ICH, PRET], examples: [{ german: "Ich mochte das nicht.", english: "I didn't like that." }]},
  { id: "moegen-du-pret", answer: "mochtest", context: "mögen", labels: [DU, PRET], examples: [{ german: "Mochtest du das Essen?", english: "Did you like the food?" }]},
  { id: "moegen-er-pret", answer: "mochte", context: "mögen", labels: [ER, PRET], examples: [{ german: "Er mochte keinen Fisch.", english: "He didn't like fish." }]},
  { id: "moegen-wir-pret", answer: "mochten", context: "mögen", labels: [WIR, PRET], examples: [{ german: "Wir mochten das Haus.", english: "We liked the house." }]},
  { id: "moegen-ihr-pret", answer: "mochtet", context: "mögen", labels: [IHR, PRET], examples: [{ german: "Mochtet ihr den Film?", english: "Did you (pl.) like the movie?" }]},
  { id: "moegen-sie-pret", answer: "mochten", context: "mögen", labels: [SIE, PRET], examples: [{ german: "Sie mochten die Stadt.", english: "They liked the city." }]},
  // Konjunktiv II (möchte — "would like")
  { id: "moegen-ich-konj2", answer: "möchte", context: "mögen", labels: [ICH, KONJ], examples: [{ german: "Ich möchte einen Kaffee.", english: "I would like a coffee." }]},
  { id: "moegen-du-konj2", answer: "möchtest", context: "mögen", labels: [DU, KONJ], examples: [{ german: "Möchtest du mitkommen?", english: "Would you like to come along?" }]},
  { id: "moegen-er-konj2", answer: "möchte", context: "mögen", labels: [ER, KONJ], examples: [{ german: "Er möchte schlafen.", english: "He would like to sleep." }]},
  { id: "moegen-wir-konj2", answer: "möchten", context: "mögen", labels: [WIR, KONJ], examples: [{ german: "Wir möchten bestellen.", english: "We would like to order." }]},
  { id: "moegen-ihr-konj2", answer: "möchtet", context: "mögen", labels: [IHR, KONJ], examples: [{ german: "Möchtet ihr etwas trinken?", english: "Would you (pl.) like something to drink?" }]},
  { id: "moegen-sie-konj2", answer: "möchten", context: "mögen", labels: [SIE, KONJ], examples: [{ german: "Sie möchten bezahlen.", english: "They would like to pay." }]},
];

// ============ PER-VERB CHEATSHEETS ============

export const koennenCheatsheet: DeckCheatsheet = {
  title: "können — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "kann", "konnt|e", "könnt|e"],
      ["du", "kann|st", "konnt|est", "könnt|est"],
      ["er/sie/es", "kann", "konnt|e", "könnt|e"],
      ["wir", "könn|en", "konnt|en", "könnt|en"],
      ["ihr", "könn|t", "konnt|et", "könnt|et"],
      ["sie/Sie", "könn|en", "konnt|en", "könnt|en"],
    ],
  }],
  notes: ["Präsens singular loses umlaut: können → kann", "Konjunktiv II adds umlaut to Präteritum stem: konnt- → könnt-"],
};

export const muessenCheatsheet: DeckCheatsheet = {
  title: "müssen — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "muss", "musst|e", "müsst|e"],
      ["du", "muss|t", "musst|est", "müsst|est"],
      ["er/sie/es", "muss", "musst|e", "müsst|e"],
      ["wir", "müss|en", "musst|en", "müsst|en"],
      ["ihr", "müss|t", "musst|et", "müsst|et"],
      ["sie/Sie", "müss|en", "musst|en", "müsst|en"],
    ],
  }],
  notes: ["Präsens singular loses umlaut: müssen → muss", "Konjunktiv II adds umlaut: musst- → müsst-"],
};

export const wollenCheatsheet: DeckCheatsheet = {
  title: "wollen — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "will", "wollt|e", "wollt|e"],
      ["du", "will|st", "wollt|est", "wollt|est"],
      ["er/sie/es", "will", "wollt|e", "wollt|e"],
      ["wir", "woll|en", "wollt|en", "wollt|en"],
      ["ihr", "woll|t", "wollt|et", "wollt|et"],
      ["sie/Sie", "woll|en", "wollt|en", "wollt|en"],
    ],
  }],
  notes: ["Präsens singular has vowel change: wollen → will", "Konjunktiv II = Präteritum (no umlaut shift)"],
};

export const sollenCheatsheet: DeckCheatsheet = {
  title: "sollen — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "soll", "sollt|e", "sollt|e"],
      ["du", "soll|st", "sollt|est", "sollt|est"],
      ["er/sie/es", "soll", "sollt|e", "sollt|e"],
      ["wir", "soll|en", "sollt|en", "sollt|en"],
      ["ihr", "soll|t", "sollt|et", "sollt|et"],
      ["sie/Sie", "soll|en", "sollt|en", "sollt|en"],
    ],
  }],
  notes: ["No umlaut change in any form", "Konjunktiv II = Präteritum"],
};

export const duerfenCheatsheet: DeckCheatsheet = {
  title: "dürfen — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "darf", "durft|e", "dürft|e"],
      ["du", "darf|st", "durft|est", "dürft|est"],
      ["er/sie/es", "darf", "durft|e", "dürft|e"],
      ["wir", "dürf|en", "durft|en", "dürft|en"],
      ["ihr", "dürf|t", "durft|et", "dürft|et"],
      ["sie/Sie", "dürf|en", "durft|en", "dürft|en"],
    ],
  }],
  notes: ["Präsens singular loses umlaut: dürfen → darf", "Konjunktiv II adds umlaut: durft- → dürft-"],
};

export const moegenCheatsheet: DeckCheatsheet = {
  title: "mögen — Conjugation",
  tables: [{
    rows: [
      ["", "Präsens", "Präteritum", "Konj. II"],
      ["ich", "mag", "mocht|e", "möcht|e"],
      ["du", "mag|st", "mocht|est", "möcht|est"],
      ["er/sie/es", "mag", "mocht|e", "möcht|e"],
      ["wir", "mög|en", "mocht|en", "möcht|en"],
      ["ihr", "mög|t", "mocht|et", "möcht|et"],
      ["sie/Sie", "mög|en", "mocht|en", "möcht|en"],
    ],
  }],
  notes: ["Präsens singular: mögen → mag", "Konjunktiv II (möchte) = 'would like' — very common in everyday German"],
};
