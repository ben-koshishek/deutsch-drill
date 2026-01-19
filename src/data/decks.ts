import type { Deck } from '../types';

export const decks: Deck[] = [
  {
    id: 'pronouns',
    name: 'Pronouns',
    description: 'Personal pronouns in all cases',
    category: 'sentence-structure',
    exerciseType: 'translation',
    words: [
      // First person singular
      { id: 'ich', german: 'ich', english: 'I', example: 'Ich bin hier.', exampleTranslation: 'I am here.', meta: { number: 'singular', case: 'nominative' } },
      { id: 'mich', german: 'mich', english: 'me', example: 'Er sieht mich.', exampleTranslation: 'He sees me.', meta: { number: 'singular', case: 'accusative' } },
      { id: 'mir', german: 'mir', english: 'me', example: 'Gib mir das.', exampleTranslation: 'Give me that.', meta: { number: 'singular', case: 'dative' } },
      // Second person informal singular
      { id: 'du', german: 'du', english: 'you', example: 'Du bist nett.', exampleTranslation: 'You are nice.', meta: { formality: 'informal', number: 'singular', case: 'nominative' } },
      { id: 'dich', german: 'dich', english: 'you', example: 'Ich liebe dich.', exampleTranslation: 'I love you.', meta: { formality: 'informal', number: 'singular', case: 'accusative' } },
      { id: 'dir', german: 'dir', english: 'you', example: 'Ich helfe dir.', exampleTranslation: 'I help you.', meta: { formality: 'informal', number: 'singular', case: 'dative' } },
      // Third person singular masculine
      { id: 'er', german: 'er', english: 'he', example: 'Er arbeitet viel.', exampleTranslation: 'He works a lot.', meta: { number: 'singular', case: 'nominative' } },
      { id: 'ihn', german: 'ihn', english: 'him', example: 'Ich kenne ihn.', exampleTranslation: 'I know him.', meta: { number: 'singular', case: 'accusative' } },
      { id: 'ihm', german: 'ihm', english: 'him', example: 'Ich gebe ihm das Buch.', exampleTranslation: 'I give him the book.', meta: { number: 'singular', case: 'dative' } },
      // Third person singular feminine
      { id: 'sie-she', german: 'sie', english: 'she / her', example: 'Sie singt schön.', exampleTranslation: 'She sings beautifully.', meta: { number: 'singular', case: 'nominative' } },
      { id: 'ihr-her', german: 'ihr', english: 'her', example: 'Ich gebe ihr das Buch.', exampleTranslation: 'I give her the book.', meta: { number: 'singular', case: 'dative' } },
      // First person plural
      { id: 'wir', german: 'wir', english: 'we', example: 'Wir gehen zusammen.', exampleTranslation: 'We go together.', meta: { number: 'plural', case: 'nominative' } },
      { id: 'uns', german: 'uns', english: 'us', example: 'Er hilft uns.', exampleTranslation: 'He helps us.', meta: { number: 'plural', case: 'accusative' } },
      // Second person informal plural
      { id: 'ihr', german: 'ihr', english: 'you all', example: 'Ihr seid willkommen.', exampleTranslation: 'You all are welcome.', meta: { formality: 'informal', number: 'plural', case: 'nominative' } },
      { id: 'euch', german: 'euch', english: 'you all', example: 'Ich sehe euch.', exampleTranslation: 'I see you all.', meta: { formality: 'informal', number: 'plural', case: 'accusative' } },
      // Third person plural
      { id: 'sie-they', german: 'sie', english: 'they / them', example: 'Sie kommen morgen.', exampleTranslation: 'They are coming tomorrow.', meta: { number: 'plural', case: 'nominative' } },
      { id: 'ihnen', german: 'ihnen', english: 'them', example: 'Ich helfe ihnen.', exampleTranslation: 'I help them.', meta: { number: 'plural', case: 'dative' } },
      // Second person formal (works for both singular & plural)
      { id: 'Sie', german: 'Sie', english: 'you / they', example: 'Wie heißen Sie?', exampleTranslation: 'What is your name?', meta: { formality: 'formal', case: 'nominative' } },
      { id: 'Ihnen', german: 'Ihnen', english: 'you', example: 'Ich danke Ihnen.', exampleTranslation: 'I thank you.', meta: { formality: 'formal', case: 'dative' } },
    ]
  },
  {
    id: 'prepositions',
    name: 'Prepositions',
    description: 'German prepositions with cases',
    category: 'sentence-structure',
    exerciseType: 'translation',
    words: [
      { id: 'in', german: 'in', english: 'in / into', example: 'Ich bin in der Stadt.', exampleTranslation: 'I am in the city.' },
      { id: 'an', german: 'an', english: 'at / on', example: 'Das Bild hängt an der Wand.', exampleTranslation: 'The picture hangs on the wall.' },
      { id: 'auf', german: 'auf', english: 'on / upon', example: 'Das Buch liegt auf dem Tisch.', exampleTranslation: 'The book is on the table.' },
      { id: 'mit', german: 'mit', english: 'with', example: 'Ich fahre mit dem Bus.', exampleTranslation: 'I am going by bus.' },
      { id: 'für', german: 'für', english: 'for', example: 'Das ist für dich.', exampleTranslation: 'This is for you.' },
      { id: 'von', german: 'von', english: 'from / of', example: 'Ich komme von der Arbeit.', exampleTranslation: 'I am coming from work.' },
      { id: 'zu', german: 'zu', english: 'to', example: 'Ich gehe zu dir.', exampleTranslation: 'I am going to you.' },
      { id: 'bei', german: 'bei', english: 'at / near', example: 'Ich bin bei der Arbeit.', exampleTranslation: 'I am at work.' },
      { id: 'nach', german: 'nach', english: 'to / after', example: 'Ich fahre nach Berlin.', exampleTranslation: 'I am going to Berlin.' },
      { id: 'aus', german: 'aus', english: 'from / out of', example: 'Ich komme aus Deutschland.', exampleTranslation: 'I come from Germany.' },
      { id: 'durch', german: 'durch', english: 'through', example: 'Wir gehen durch den Park.', exampleTranslation: 'We are walking through the park.' },
      { id: 'über', german: 'über', english: 'over / about', example: 'Wir sprechen über das Wetter.', exampleTranslation: 'We are talking about the weather.' },
      { id: 'unter', german: 'unter', english: 'under', example: 'Die Katze ist unter dem Tisch.', exampleTranslation: 'The cat is under the table.' },
      { id: 'vor', german: 'vor', english: 'before / in front of', example: 'Ich stehe vor dem Haus.', exampleTranslation: 'I am standing in front of the house.' },
      { id: 'seit', german: 'seit', english: 'since / for', example: 'Seit einem Jahr lerne ich.', exampleTranslation: 'I have been learning for a year.' },
    ]
  },
  {
    id: 'conjunctions',
    name: 'Conjunctions',
    description: 'Words that connect clauses',
    category: 'sentence-structure',
    exerciseType: 'translation',
    words: [
      { id: 'und', german: 'und', english: 'and', example: 'Ich esse und trinke.', exampleTranslation: 'I eat and drink.' },
      { id: 'aber', german: 'aber', english: 'but', example: 'Ich will, aber ich kann nicht.', exampleTranslation: "I want to, but I can't." },
      { id: 'oder', german: 'oder', english: 'or', example: 'Kaffee oder Tee?', exampleTranslation: 'Coffee or tea?' },
      { id: 'weil', german: 'weil', english: 'because', example: 'Ich bleibe, weil es regnet.', exampleTranslation: "I'm staying because it's raining." },
      { id: 'dass', german: 'dass', english: 'that', example: 'Ich weiß, dass du recht hast.', exampleTranslation: "I know that you're right." },
      { id: 'wenn', german: 'wenn', english: 'if / when', example: 'Wenn du kommst, rufe mich an.', exampleTranslation: 'If you come, call me.' },
      { id: 'ob', german: 'ob', english: 'whether / if', example: 'Ich weiß nicht, ob er kommt.', exampleTranslation: "I don't know if he's coming." },
      { id: 'obwohl', german: 'obwohl', english: 'although', example: 'Ich gehe, obwohl ich müde bin.', exampleTranslation: "I'm going although I'm tired." },
      { id: 'damit', german: 'damit', english: 'so that', example: 'Ich lerne, damit ich bestehe.', exampleTranslation: 'I study so that I pass.' },
      { id: 'sondern', german: 'sondern', english: 'but rather', example: 'Nicht rot, sondern blau.', exampleTranslation: 'Not red, but rather blue.' },
      { id: 'denn', german: 'denn', english: 'because / for', example: 'Ich bleibe, denn es regnet.', exampleTranslation: "I'm staying, for it's raining." },
      { id: 'also', german: 'also', english: 'so / therefore', example: 'Es regnet, also bleibe ich.', exampleTranslation: "It's raining, so I'm staying." },
    ]
  },
  {
    id: 'negation',
    name: 'Negation',
    description: 'How to say no in German',
    category: 'sentence-structure',
    exerciseType: 'translation',
    words: [
      { id: 'nicht', german: 'nicht', english: 'not', example: 'Ich verstehe nicht.', exampleTranslation: "I don't understand." },
      { id: 'kein', german: 'kein', english: 'no / not a', example: 'Ich habe kein Geld.', exampleTranslation: 'I have no money.' },
      { id: 'keine', german: 'keine', english: 'no (feminine/plural)', example: 'Ich habe keine Zeit.', exampleTranslation: 'I have no time.' },
      { id: 'nie', german: 'nie', english: 'never', example: 'Ich gehe nie dorthin.', exampleTranslation: 'I never go there.' },
      { id: 'niemals', german: 'niemals', english: 'never (emphatic)', example: 'Das werde ich niemals tun.', exampleTranslation: 'I will never do that.' },
      { id: 'niemand', german: 'niemand', english: 'nobody', example: 'Niemand ist hier.', exampleTranslation: 'Nobody is here.' },
      { id: 'nichts', german: 'nichts', english: 'nothing', example: 'Ich weiß nichts.', exampleTranslation: 'I know nothing.' },
      { id: 'noch-nicht', german: 'noch nicht', english: 'not yet', example: 'Er ist noch nicht da.', exampleTranslation: 'He is not here yet.' },
      { id: 'nicht-mehr', german: 'nicht mehr', english: 'no longer', example: 'Ich wohne nicht mehr dort.', exampleTranslation: 'I no longer live there.' },
      { id: 'nirgendwo', german: 'nirgendwo', english: 'nowhere', example: 'Ich finde es nirgendwo.', exampleTranslation: "I can't find it anywhere." },
    ]
  },
  {
    id: 'common-adjectives',
    name: 'Adjectives',
    description: 'Frequently used adjectives',
    category: 'descriptive-words',
    exerciseType: 'translation',
    words: [
      { id: 'gut', german: 'gut', english: 'good', example: 'Das ist gut.', exampleTranslation: 'That is good.' },
      { id: 'neu', german: 'neu', english: 'new', example: 'Das Auto ist neu.', exampleTranslation: 'The car is new.' },
      { id: 'groß', german: 'groß', english: 'big / tall', example: 'Das Haus ist groß.', exampleTranslation: 'The house is big.' },
      { id: 'klein', german: 'klein', english: 'small', example: 'Das Kind ist klein.', exampleTranslation: 'The child is small.' },
      { id: 'alt', german: 'alt', english: 'old', example: 'Der Mann ist alt.', exampleTranslation: 'The man is old.' },
      { id: 'jung', german: 'jung', english: 'young', example: 'Sie ist jung.', exampleTranslation: 'She is young.' },
      { id: 'lang', german: 'lang', english: 'long', example: 'Der Weg ist lang.', exampleTranslation: 'The path is long.' },
      { id: 'kurz', german: 'kurz', english: 'short', example: 'Das Haar ist kurz.', exampleTranslation: 'The hair is short.' },
      { id: 'schön', german: 'schön', english: 'beautiful', example: 'Die Blume ist schön.', exampleTranslation: 'The flower is beautiful.' },
      { id: 'schnell', german: 'schnell', english: 'fast', example: 'Das Auto ist schnell.', exampleTranslation: 'The car is fast.' },
      { id: 'langsam', german: 'langsam', english: 'slow', example: 'Geh langsam.', exampleTranslation: 'Walk slowly.' },
      { id: 'wichtig', german: 'wichtig', english: 'important', example: 'Das ist wichtig.', exampleTranslation: 'That is important.' },
      { id: 'richtig', german: 'richtig', english: 'correct / right', example: 'Das ist richtig.', exampleTranslation: 'That is correct.' },
      { id: 'falsch', german: 'falsch', english: 'wrong / false', example: 'Das ist falsch.', exampleTranslation: 'That is wrong.' },
      { id: 'einfach', german: 'einfach', english: 'simple / easy', example: 'Das ist einfach.', exampleTranslation: 'That is easy.' },
    ]
  },
  {
    id: 'time-adverbs',
    name: 'Time Words',
    description: 'When things happen',
    category: 'descriptive-words',
    exerciseType: 'translation',
    words: [
      { id: 'heute', german: 'heute', english: 'today', example: 'Heute ist Montag.', exampleTranslation: 'Today is Monday.' },
      { id: 'morgen', german: 'morgen', english: 'tomorrow', example: 'Bis morgen!', exampleTranslation: 'See you tomorrow!' },
      { id: 'gestern', german: 'gestern', english: 'yesterday', example: 'Gestern war ich krank.', exampleTranslation: 'Yesterday I was sick.' },
      { id: 'jetzt', german: 'jetzt', english: 'now', example: 'Ich gehe jetzt.', exampleTranslation: "I'm going now." },
      { id: 'immer', german: 'immer', english: 'always', example: 'Du bist immer spät.', exampleTranslation: "You're always late." },
      { id: 'manchmal', german: 'manchmal', english: 'sometimes', example: 'Manchmal regnet es.', exampleTranslation: 'Sometimes it rains.' },
      { id: 'oft', german: 'oft', english: 'often', example: 'Ich gehe oft ins Kino.', exampleTranslation: 'I often go to the cinema.' },
      { id: 'bald', german: 'bald', english: 'soon', example: 'Ich komme bald.', exampleTranslation: "I'm coming soon." },
      { id: 'später', german: 'später', english: 'later', example: 'Bis später!', exampleTranslation: 'See you later!' },
      { id: 'früh', german: 'früh', english: 'early', example: 'Ich stehe früh auf.', exampleTranslation: 'I get up early.' },
      { id: 'spät', german: 'spät', english: 'late', example: 'Es ist schon spät.', exampleTranslation: "It's already late." },
      { id: 'schon', german: 'schon', english: 'already', example: 'Ich bin schon fertig.', exampleTranslation: "I'm already done." },
      { id: 'noch', german: 'noch', english: 'still / yet', example: 'Ich bin noch hier.', exampleTranslation: "I'm still here." },
      { id: 'gerade', german: 'gerade', english: 'just now / right now', example: 'Ich esse gerade.', exampleTranslation: "I'm eating right now." },
    ]
  },
  {
    id: 'place-adverbs',
    name: 'Place Words',
    description: 'Where things are',
    category: 'descriptive-words',
    exerciseType: 'translation',
    words: [
      { id: 'hier', german: 'hier', english: 'here', example: 'Ich bin hier.', exampleTranslation: 'I am here.' },
      { id: 'dort', german: 'dort', english: 'there', example: 'Er steht dort.', exampleTranslation: 'He is standing there.' },
      { id: 'da', german: 'da', english: 'there / here', example: 'Da ist er!', exampleTranslation: 'There he is!' },
      { id: 'oben', german: 'oben', english: 'above / upstairs', example: 'Er ist oben.', exampleTranslation: 'He is upstairs.' },
      { id: 'unten', german: 'unten', english: 'below / downstairs', example: 'Sie wartet unten.', exampleTranslation: 'She is waiting downstairs.' },
      { id: 'links', german: 'links', english: 'left', example: 'Geh nach links.', exampleTranslation: 'Go left.' },
      { id: 'rechts', german: 'rechts', english: 'right', example: 'Das Haus ist rechts.', exampleTranslation: 'The house is on the right.' },
      { id: 'draußen', german: 'draußen', english: 'outside', example: 'Ich bin draußen.', exampleTranslation: 'I am outside.' },
      { id: 'drinnen', german: 'drinnen', english: 'inside', example: 'Bleib drinnen!', exampleTranslation: 'Stay inside!' },
      { id: 'vorne', german: 'vorne', english: 'in front', example: 'Sitz vorne.', exampleTranslation: 'Sit in front.' },
      { id: 'hinten', german: 'hinten', english: 'in back / behind', example: 'Er sitzt hinten.', exampleTranslation: 'He is sitting in back.' },
      { id: 'überall', german: 'überall', english: 'everywhere', example: 'Musik ist überall.', exampleTranslation: 'Music is everywhere.' },
    ]
  },
  {
    id: 'question-words',
    name: 'Question Words',
    description: 'How to ask questions in German',
    category: 'descriptive-words',
    exerciseType: 'translation',
    words: [
      { id: 'wer', german: 'wer', english: 'who', example: 'Wer bist du?', exampleTranslation: 'Who are you?' },
      { id: 'was', german: 'was', english: 'what', example: 'Was machst du?', exampleTranslation: 'What are you doing?' },
      { id: 'wo', german: 'wo', english: 'where', example: 'Wo wohnst du?', exampleTranslation: 'Where do you live?' },
      { id: 'wann', german: 'wann', english: 'when', example: 'Wann kommst du?', exampleTranslation: 'When are you coming?' },
      { id: 'warum', german: 'warum', english: 'why', example: 'Warum fragst du?', exampleTranslation: 'Why are you asking?' },
      { id: 'wie', german: 'wie', english: 'how', example: 'Wie geht es dir?', exampleTranslation: 'How are you?' },
      { id: 'welcher', german: 'welcher', english: 'which', example: 'Welcher Film?', exampleTranslation: 'Which movie?' },
      { id: 'woher', german: 'woher', english: 'from where', example: 'Woher kommst du?', exampleTranslation: 'Where are you from?' },
      { id: 'wohin', german: 'wohin', english: 'to where', example: 'Wohin gehst du?', exampleTranslation: 'Where are you going?' },
      { id: 'wieviel', german: 'wie viel', english: 'how much', example: 'Wie viel kostet das?', exampleTranslation: 'How much does this cost?' },
    ]
  },
  {
    id: 'numbers',
    name: 'Numbers 1-20',
    description: 'Basic German numbers',
    category: 'miscellaneous',
    exerciseType: 'translation',
    words: [
      { id: 'eins', german: 'eins', english: 'one', example: 'Ich habe eins.', exampleTranslation: 'I have one.' },
      { id: 'zwei', german: 'zwei', english: 'two', example: 'Zwei Kaffee, bitte.', exampleTranslation: 'Two coffees, please.' },
      { id: 'drei', german: 'drei', english: 'three', example: 'Drei Äpfel.', exampleTranslation: 'Three apples.' },
      { id: 'vier', german: 'vier', english: 'four', example: 'Vier Stühle.', exampleTranslation: 'Four chairs.' },
      { id: 'fünf', german: 'fünf', english: 'five', example: 'Fünf Minuten.', exampleTranslation: 'Five minutes.' },
      { id: 'sechs', german: 'sechs', english: 'six', example: 'Sechs Eier.', exampleTranslation: 'Six eggs.' },
      { id: 'sieben', german: 'sieben', english: 'seven', example: 'Sieben Tage.', exampleTranslation: 'Seven days.' },
      { id: 'acht', german: 'acht', english: 'eight', example: 'Acht Uhr.', exampleTranslation: "Eight o'clock." },
      { id: 'neun', german: 'neun', english: 'nine', example: 'Neun Euro.', exampleTranslation: 'Nine euros.' },
      { id: 'zehn', german: 'zehn', english: 'ten', example: 'Zehn Finger.', exampleTranslation: 'Ten fingers.' },
      { id: 'elf', german: 'elf', english: 'eleven', example: 'Elf Spieler.', exampleTranslation: 'Eleven players.' },
      { id: 'zwölf', german: 'zwölf', english: 'twelve', example: 'Zwölf Monate.', exampleTranslation: 'Twelve months.' },
    ]
  },
  {
    id: 'days-months',
    name: 'Days & Months',
    description: 'Days of the week and months',
    category: 'miscellaneous',
    exerciseType: 'translation',
    words: [
      { id: 'montag', german: 'der Montag', english: 'Monday', example: 'Am Montag arbeite ich.', exampleTranslation: 'On Monday I work.' },
      { id: 'dienstag', german: 'der Dienstag', english: 'Tuesday', example: 'Dienstag ist gut.', exampleTranslation: 'Tuesday is good.' },
      { id: 'mittwoch', german: 'der Mittwoch', english: 'Wednesday', example: 'Mittwoch ist Mitte der Woche.', exampleTranslation: 'Wednesday is the middle of the week.' },
      { id: 'donnerstag', german: 'der Donnerstag', english: 'Thursday', example: 'Am Donnerstag gehe ich.', exampleTranslation: 'On Thursday I am going.' },
      { id: 'freitag', german: 'der Freitag', english: 'Friday', example: 'Freitag ist schön.', exampleTranslation: 'Friday is nice.' },
      { id: 'samstag', german: 'der Samstag', english: 'Saturday', example: 'Am Samstag schlafe ich lange.', exampleTranslation: 'On Saturday I sleep in.' },
      { id: 'sonntag', german: 'der Sonntag', english: 'Sunday', example: 'Sonntag ist frei.', exampleTranslation: 'Sunday is free.' },
      { id: 'januar', german: 'der Januar', english: 'January', example: 'Im Januar ist es kalt.', exampleTranslation: 'In January it is cold.' },
      { id: 'februar', german: 'der Februar', english: 'February', example: 'Februar ist kurz.', exampleTranslation: 'February is short.' },
      { id: 'maerz', german: 'der März', english: 'March', example: 'Im März wird es wärmer.', exampleTranslation: 'In March it gets warmer.' },
      { id: 'dezember', german: 'der Dezember', english: 'December', example: 'Dezember ist Weihnachten.', exampleTranslation: 'December is Christmas.' },
    ]
  },
  {
    id: 'common-nouns',
    name: 'Common Nouns',
    description: 'Everyday nouns with their genders',
    category: 'miscellaneous',
    exerciseType: 'translation',
    words: [
      // Masculine (der)
      { id: 'mann', german: 'der Mann', english: 'man', example: 'Der Mann liest.', exampleTranslation: 'The man reads.' },
      { id: 'tisch', german: 'der Tisch', english: 'table', example: 'Der Tisch ist groß.', exampleTranslation: 'The table is big.' },
      { id: 'stuhl', german: 'der Stuhl', english: 'chair', example: 'Der Stuhl ist alt.', exampleTranslation: 'The chair is old.' },
      { id: 'hund', german: 'der Hund', english: 'dog', example: 'Der Hund bellt.', exampleTranslation: 'The dog barks.' },
      { id: 'apfel', german: 'der Apfel', english: 'apple', example: 'Der Apfel ist rot.', exampleTranslation: 'The apple is red.' },
      // Feminine (die)
      { id: 'frau', german: 'die Frau', english: 'woman', example: 'Die Frau singt.', exampleTranslation: 'The woman sings.' },
      { id: 'katze', german: 'die Katze', english: 'cat', example: 'Die Katze schläft.', exampleTranslation: 'The cat sleeps.' },
      { id: 'blume', german: 'die Blume', english: 'flower', example: 'Die Blume ist schön.', exampleTranslation: 'The flower is beautiful.' },
      { id: 'stadt', german: 'die Stadt', english: 'city', example: 'Die Stadt ist groß.', exampleTranslation: 'The city is big.' },
      { id: 'zeit', german: 'die Zeit', english: 'time', example: 'Die Zeit vergeht.', exampleTranslation: 'Time passes.' },
      // Neuter (das)
      { id: 'kind', german: 'das Kind', english: 'child', example: 'Das Kind spielt.', exampleTranslation: 'The child plays.' },
      { id: 'buch', german: 'das Buch', english: 'book', example: 'Das Buch ist interessant.', exampleTranslation: 'The book is interesting.' },
      { id: 'haus', german: 'das Haus', english: 'house', example: 'Das Haus ist weiß.', exampleTranslation: 'The house is white.' },
      { id: 'wasser', german: 'das Wasser', english: 'water', example: 'Das Wasser ist kalt.', exampleTranslation: 'The water is cold.' },
      { id: 'auto', german: 'das Auto', english: 'car', example: 'Das Auto ist schnell.', exampleTranslation: 'The car is fast.' },
    ]
  },
];

export function getDeck(id: string): Deck | undefined {
  return decks.find(d => d.id === id);
}
