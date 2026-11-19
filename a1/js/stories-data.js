/* Stories (rendered by texte.js on geschichten.html).
   kind: "news" (short report, written from a real source) | "story" | "mix" (story with a news element)
   paras: paragraphs; each sentence is [German, word-by-word English, natural English, number pronunciation (optional)].
   Markup in German: {der:Kaffee} {die:Milch} {das:Brot} {pl:Äpfel} = noun in its gender colour, {v:steht} = verb.
   words: [article | "pl" | "", word, English] shown as colour chips under the story. quiz: [German, English, true|false]. */
const STORIES = [
  { id: "christkindl-mia", kind: "mix", title: "Mias Abend auf dem Christkindlmarkt", en: "Mia's evening at the Christmas market", scene: "christkind",
    sum: "Mia spends a cold Friday evening at the Munich Christkindlmarkt: mulled wine, sausage and roasted almonds.",
    paras: [[
      ["Heute ist Freitag.", "Today · is · Friday", "Today is Friday."],
      ["Mia {v:hat} frei und es {v:ist} kalt.", "Mia · has · free · and · it · is · cold", "Mia has the day off and it is cold."],
      ["Sie {v:zieht} eine {die:Jacke} und einen {der:Schal} {v:an}.", "She · pulls · a · jacket · and · a · scarf · on", "She puts on a jacket and a scarf."],
      ["Um 17 Uhr {v:fährt} sie mit der {die:U-Bahn} zum {der:Marienplatz}.", "At · 17 · o'clock · goes · she · with · the · subway · to-the · Marienplatz", "At five o'clock she takes the U-Bahn to Marienplatz.", "17 = siebzehn (ZEEP-tsayn)"]
    ], [
      ["Dort {v:ist} der {der:Christkindlmarkt}.", "There · is · the · Christmas-market", "The Christmas market is there."],
      ["Es {v:gibt} viele {pl:Buden} und einen großen {der:Weihnachtsbaum}.", "There · gives · many · stalls · and · a · big · Christmas-tree", "There are many stalls and a big Christmas tree."],
      ["Alles {v:ist} hell, und es {v:riecht} nach {der:Zimt} und {pl:Mandeln}.", "Everything · is · bright · and · it · smells · of · cinnamon · and · almonds", "Everything is bright, and it smells of cinnamon and almonds."],
      ["Mia {v:möchte} einen {der:Glühwein}.", "Mia · would-like · a · mulled-wine", "Mia would like a mulled wine."],
      ["Der Mann {v:sagt}: „Das {v:macht} 5,50 Euro.“", "The · man · says · that · makes · 5.50 · euro", "The man says: “That is 5.50 euros.”", "5,50 = fünf Euro fünfzig (FUENF OY-ro FUENF-tsikh)"],
      ["Der {der:Glühwein} {v:ist} heiß und süß.", "The · mulled-wine · is · hot · and · sweet", "The mulled wine is hot and sweet."]
    ], [
      ["Dann {v:trifft} sie ihre {die:Freundin} Anna.", "Then · meets · she · her · friend · Anna", "Then she meets her friend Anna."],
      ["Anna {v:isst} eine {die:Bratwurst}. Mia {v:hat} auch {der:Hunger}.", "Anna · eats · a · bratwurst · Mia · has · also · hunger", "Anna is eating a bratwurst. Mia is hungry too."],
      ["Sie {v:nimmt} eine {die:Bratwurst} mit {das:Brot}.", "She · takes · a · bratwurst · with · bread", "She takes a bratwurst with bread."],
      ["Danach {v:kaufen} sie {pl:Mandeln}. Sie {v:sind} süß und warm.", "Afterwards · buy · they · almonds · they · are · sweet · and · warm", "Afterwards they buy almonds. They are sweet and warm."],
      ["Um 20 Uhr {v:ist} Mia müde. Sie {v:fährt} nach Hause.", "At · 20 · o'clock · is · Mia · tired · she · goes · to · home", "At eight o'clock Mia is tired. She goes home.", "20 = zwanzig (TSVAN-tsikh)"],
      ["Es {v:war} ein schöner Abend!", "It · was · a · beautiful · evening", "It was a lovely evening!"]
    ]],
    words: [["der", "Christkindlmarkt", "Christmas market"], ["der", "Glühwein", "mulled wine"], ["die", "Bratwurst", "bratwurst"], ["der", "Schal", "scarf"], ["die", "Jacke", "jacket"], ["pl", "Mandeln", "almonds"], ["die", "U-Bahn", "subway"], ["das", "Brot", "bread"]],
    tip: ["war = was: Es war ein schöner Abend. Mit + Dativ: mit der U-Bahn, mit dem Brot.", "war is the past of ist. After mit the article changes: mit der / mit dem."],
    quiz: [["Mia fährt mit dem Bus zum Marienplatz.", "Mia takes the bus to Marienplatz.", false], ["Der Glühwein kostet 5,50 Euro.", "The mulled wine costs 5.50.", true], ["Mia trifft Anna.", "Mia meets Anna.", true]] },

  { id: "news-christkindl", kind: "news", title: "Nachrichten: Der Christkindlmarkt beginnt", en: "News: the Christmas market starts", scene: "christkind",
    date: "19.11.2026",
    sum: "Munich's city Christmas market on Marienplatz opens on Friday 20 November and runs to 24 December, starting earlier than in the past.",
    source: ["Stadt München (muenchen.de)", "https://www.muenchen.de/christkindlmarkt"],
    paras: [[
      ["Am Freitag, 20. November, {v:beginnt} der {der:Christkindlmarkt} in München.", "On · Friday · 20th · November · begins · the · Christmas-market · in · Munich", "On Friday, 20 November, the Christmas market starts in Munich.", "20 = zwanzig (TSVAN-tsikh)"],
      ["Er {v:ist} auf dem {der:Marienplatz}.", "He · is · on · the · Marienplatz", "It is on Marienplatz."],
      ["Der {der:Markt} {v:dauert} bis zum 24. Dezember.", "The · market · lasts · until · to-the · 24th · December", "The market lasts until 24 December.", "24 = vierundzwanzig (FEER-oont-TSVAN-tsikh)"],
      ["In diesem Jahr {v:beginnt} er früher als sonst.", "In · this · year · begins · he · earlier · than · otherwise", "This year it starts earlier than usual."]
    ], [
      ["Es {v:gibt} 137 {pl:Stände}.", "There · gives · 137 · stalls", "There are 137 stalls.", "137 = hundertsiebenunddreißig (HOON-dert-ZEE-ben-oont-DRAI-sikh)"],
      ["Der {der:Weihnachtsbaum} {v:ist} etwa 25 {pl:Meter} hoch.", "The · Christmas-tree · is · about · 25 · metres · tall", "The Christmas tree is about 25 metres tall.", "25 = fünfundzwanzig (FUENF-oont-TSVAN-tsikh)"],
      ["Von Montag bis Samstag {v:ist} der {der:Markt} von 10 bis 21 Uhr {v:offen}.", "From · Monday · to · Saturday · is · the · market · from · 10 · to · 21 · o'clock · open", "From Monday to Saturday the market is open from 10 to 21 (9 pm).", "10 = zehn (TSAYN) · 21 = einundzwanzig (AIN-oont-TSVAN-tsikh)"],
      ["Am Sonntag {v:ist} er von 10 bis 20 Uhr {v:offen}.", "On · Sunday · is · he · from · 10 · to · 20 · o'clock · open", "On Sunday it is open from 10 to 20 (8 pm).", "20 = zwanzig (TSVAN-tsikh)"],
      ["Der {der:Eintritt} {v:ist} frei.", "The · entrance · is · free", "Entry is free."],
      ["Man {v:kann} mit der {die:U3} oder {die:U6} {v:fahren}.", "One · can · with · the · U3 · or · U6 · travel", "You can take the U3 or U6.", "U3 = U drei (OO DRAI) · U6 = U sechs (OO ZEKS)"]
    ]],
    words: [["der", "Markt", "market"], ["der", "Eintritt", "entrance"], ["der", "Stand", "stall"], ["pl", "Stände", "stalls"], ["der", "Meter", "metre"], ["", "offen", "open"], ["", "früher", "earlier"], ["", "frei", "free"]],
    tip: ["Datum: am Freitag, 20. November. Zeit: von 10 bis 21 Uhr. Man kann + Verb am Ende.", "Dates and times: am + day, von … bis … Uhr. With kann the second verb goes last."],
    quiz: [["Der Christkindlmarkt beginnt am 20. November.", "The market starts on 20 November.", true], ["Der Eintritt kostet 5 Euro.", "Entry costs 5 euros.", false], ["Am Sonntag ist er bis 20 Uhr offen.", "On Sunday it is open until 8 pm.", true]] },

  { id: "news-schnee", kind: "news", title: "Nachrichten: Der erste Schnee", en: "News: the first snow", scene: "snow",
    date: "10.11.2026",
    sum: "On 10 November the first snowflakes fell even in the lowlands of eastern Brandenburg, east of Berlin. The weather service explains why.",
    source: ["Deutscher Wetterdienst (wetterdienst.de)", "https://www.wetterdienst.de/Deutschlandwetter/Thema_des_Tages/6751/der-erste-schnee"],
    paras: [[
      ["Am 10. November {v:gibt} es den ersten {der:Schnee}.", "On · 10th · November · gives · it · the · first · snow", "On 10 November there is the first snow.", "10 = zehn (TSAYN)"],
      ["Er {v:kommt} im Osten von Deutschland, östlich von {das:Berlin}.", "He · comes · in-the · east · of · Germany · east · of · Berlin", "It comes in the east of Germany, east of Berlin."],
      ["Viele {pl:Menschen} {v:sind} am Morgen überrascht.", "Many · people · are · in-the · morning · surprised", "Many people are surprised in the morning."]
    ], [
      ["Der {der:Deutsche Wetterdienst} {v:erklärt}: Ein {das:Tief} {v:bringt} den {der:Schnee}.", "The · German · Weather-Service · explains · a · low · brings · the · snow", "The German Weather Service explains: a low-pressure area brings the snow."],
      ["In den {pl:Bergen} {v:schneit} es schon früher.", "In · the · mountains · snows · it · already · earlier", "In the mountains it already snows earlier."],
      ["Es {v:ist} kalt. {v:Zieh} eine warme {die:Jacke} {v:an}!", "It · is · cold · put · a · warm · jacket · on", "It is cold. Put on a warm jacket!"]
    ]],
    words: [["der", "Schnee", "snow"], ["der", "Winter", "winter"], ["das", "Wetter", "weather"], ["der", "Osten", "east"], ["pl", "Berge", "mountains"], ["", "kalt", "cold"], ["", "warm", "warm"], ["", "überrascht", "surprised"]],
    tip: ["Es gibt + Akkusativ: Es gibt den ersten Schnee. Befehl: Zieh eine Jacke an! (du)", "es gibt = there is. Command with du: verb first, no du; the separable part goes last."],
    quiz: [["Der erste Schnee kommt im Osten von Deutschland.", "The first snow comes in eastern Germany.", true], ["Es ist heiß.", "It is hot.", false]] },

  { id: "schluessel", kind: "story", title: "Wo ist mein Schlüssel?", en: "Where is my key?", scene: "key",
    sum: "Mia is leaving for work, but her key has disappeared. She looks everywhere. Then she finds it in a very strange place.",
    paras: [[
      ["Mia {v:will} aus dem {das:Haus} {v:gehen}.", "Mia · wants · out-of · the · house · to-go", "Mia wants to leave the house."],
      ["Aber der {der:Schlüssel} {v:ist} weg!", "But · the · key · is · gone", "But the key is gone!"],
      ["„Wo {v:ist} mein {der:Schlüssel}?“, {v:fragt} sie.", "Where · is · my · key · asks · she", "“Where is my key?” she asks."]
    ], [
      ["Sie {v:sucht} in der {die:Tasche}. Er {v:ist} nicht da.", "She · looks · in · the · bag · he · is · not · there", "She looks in the bag. It is not there."],
      ["Sie {v:sucht} in der {die:Jacke}. Dort {v:ist} nur ein {das:Taschentuch}.", "She · looks · in · the · jacket · there · is · only · a · tissue", "She looks in the jacket. There is only a tissue."],
      ["Sie {v:sucht} auf dem {der:Tisch} und unter dem {das:Sofa}. Nichts!", "She · looks · on · the · table · and · under · the · sofa · nothing", "She looks on the table and under the sofa. Nothing!"],
      ["Es {v:ist} schon 8 Uhr. Mia {v:ist} sehr nervös.", "It · is · already · 8 · o'clock · Mia · is · very · nervous", "It is already eight o'clock. Mia is very nervous.", "8 = acht (AKHT)"]
    ], [
      ["Sie {v:hat} {der:Hunger} und {v:geht} in die {die:Küche}.", "She · has · hunger · and · goes · into · the · kitchen", "She is hungry and goes into the kitchen."],
      ["Sie {v:öffnet} den {der:Kühlschrank}.", "She · opens · the · fridge", "She opens the fridge."],
      ["Da {v:sind} {die:Milch}, {der:Käse} … und der {der:Schlüssel}!", "There · are · milk · cheese · … · and · the · key", "There are milk, cheese … and the key!"],
      ["„Ha! Hier {v:ist} er!“, {v:ruft} sie.", "Ha · here · is · he · calls · she", "“Ha! Here it is!” she calls."],
      ["Warum {v:ist} der {der:Schlüssel} im {der:Kühlschrank}? Mia {v:lacht}.", "Why · is · the · key · in-the · fridge · Mia · laughs", "Why is the key in the fridge? Mia laughs."],
      ["„Ich {v:bin} heute sehr müde.“ Dann {v:geht} sie zur {die:Arbeit}.", "I · am · today · very · tired · then · goes · she · to-the · work", "“I am very tired today.” Then she goes to work."]
    ]],
    words: [["der", "Schlüssel", "key"], ["der", "Kühlschrank", "fridge"], ["die", "Tasche", "bag"], ["der", "Tisch", "table"], ["das", "Sofa", "sofa"], ["die", "Küche", "kitchen"], ["", "suchen", "to look for"], ["", "weg", "gone"]],
    tip: ["Wo? → in der Tasche (die), auf dem Tisch (der), unter dem Sofa (das): nach in, auf, unter ändert sich der Artikel.", "For \"where?\" the article changes: die → der, der/das → dem."],
    quiz: [["Der Schlüssel ist in der Tasche.", "The key is in the bag.", false], ["Mia findet den Schlüssel im Kühlschrank.", "Mia finds the key in the fridge.", true], ["Mia ist heute sehr müde.", "Mia is very tired today.", true]] },

  { id: "lea", kind: "story", title: "Leas Tag", en: "Lea's day", scene: "tag",
    sum: "A normal working day for Lea, from the alarm clock at seven to bed at ten. Practise times, daily verbs and separable verbs.",
    paras: [[
      ["Lea {v:steht} um 7 Uhr {v:auf}.", "Lea · gets · at · 7 · o'clock · up", "Lea gets up at seven o'clock.", "7 = sieben (ZEE-ben)"],
      ["Sie {v:trinkt} {der:Kaffee} und {v:isst} {das:Brot} mit {der:Marmelade}.", "She · drinks · coffee · and · eats · bread · with · jam", "She drinks coffee and eats bread with jam."],
      ["Um 8 Uhr {v:fährt} sie mit dem {der:Bus} zur {die:Arbeit}.", "At · 8 · o'clock · goes · she · with · the · bus · to-the · work", "At eight she takes the bus to work.", "8 = acht (AKHT)"],
      ["Die {die:Fahrt} {v:dauert} 25 Minuten.", "The · ride · lasts · 25 · minutes", "The ride takes 25 minutes.", "25 = fünfundzwanzig (FUENF-oont-TSVAN-tsikh)"]
    ], [
      ["Lea {v:arbeitet} im {das:Büro}. Sie {v:schreibt} {pl:E-Mails} und {v:telefoniert}.", "Lea · works · in-the · office · she · writes · emails · and · phones", "Lea works in the office. She writes emails and makes phone calls."],
      ["Um 12 Uhr {v:isst} sie {die:Pizza} mit einer {die:Kollegin}.", "At · 12 · o'clock · eats · she · pizza · with · a · colleague", "At twelve she eats pizza with a colleague.", "12 = zwölf (ZVOELF)"],
      ["Am Nachmittag {v:hat} sie ein {das:Meeting}.", "In-the · afternoon · has · she · a · meeting", "In the afternoon she has a meeting."],
      ["Um 17 Uhr {v:geht} sie nach {die:Hause}.", "At · 17 · o'clock · goes · she · to · home", "At five in the afternoon she goes home.", "17 = siebzehn (ZEEP-tsayn)"]
    ], [
      ["Am Abend {v:kocht} sie {die:Suppe} und {v:sieht} {v:fern}.", "In-the · evening · cooks · she · soup · and · looks · TV(fern)", "In the evening she cooks soup and watches TV."],
      ["Um 22 Uhr {v:ist} sie müde. Gute Nacht!", "At · 22 · o'clock · is · she · tired · good · night", "At ten at night she is tired. Good night!", "22 = zweiundzwanzig (TSVAI-oont-TSVAN-tsikh)"]
    ]],
    words: [["der", "Bus", "bus"], ["die", "Arbeit", "work"], ["das", "Büro", "office"], ["die", "Pizza", "pizza"], ["die", "Suppe", "soup"], ["der", "Kaffee", "coffee"], ["", "aufstehen", "to get up"], ["", "müde", "tired"]],
    tip: ["Trennbares Verb: aufstehen → Lea steht um 7 Uhr auf. Zeit: um + Zahl + Uhr.", "Separable verb: the prefix jumps to the end. Time: um + number + Uhr."],
    quiz: [["Lea fährt mit dem Bus zur Arbeit.", "Lea takes the bus to work.", true], ["Lea isst um 17 Uhr Pizza.", "Lea eats pizza at 5 pm.", false], ["Lea kocht am Abend Suppe.", "Lea cooks soup in the evening.", true]] },

  { id: "markt", kind: "story", title: "Auf dem Markt", en: "At the market", scene: "markt",
    sum: "Tom buys fruit, milk, bread and cheese at the weekly market and practises asking for prices.",
    paras: [[
      ["Am Samstag {v:geht} Tom auf den {der:Markt}.", "On · Saturday · goes · Tom · on · the · market", "On Saturday Tom goes to the market."],
      ["Es {v:ist} sonnig, und viele {pl:Leute} {v:sind} da.", "It · is · sunny · and · many · people · are · there", "It is sunny and many people are there."],
      ["Er {v:möchte} ein {das:Kilo} {pl:Äpfel}. „Was {v:kostet} das?“", "He · would-like · a · kilo · apples · what · costs · that", "He wants a kilo of apples. “What does that cost?”"]
    ], [
      ["Die {die:Verkäuferin} {v:sagt}: „Ein {das:Kilo} {v:kostet} 2,50 Euro.“", "The · saleswoman · says · a · kilo · costs · 2.50 · euro", "The saleswoman says: “A kilo costs 2.50 euros.”", "2,50 = zwei Euro fünfzig (TSVAI OY-ro FUENF-tsikh)"],
      ["Tom {v:nimmt} auch {die:Milch} und {das:Brot}.", "Tom · takes · also · milk · and · bread", "Tom also takes milk and bread."],
      ["Der {der:Käse} {v:sieht} gut {v:aus}. Er {v:probiert} ein {das:Stück}.", "The · cheese · looks · good · out · he · tries · a · piece", "The cheese looks good. He tries a piece."],
      ["„Mmm, {v:lecker}! Ich {v:nehme} 200 {pl:Gramm}.“", "Mmm · delicious · I · take · 200 · grams", "“Mmm, delicious! I'll take 200 grams.”", "200 = zweihundert (TSVAI-hoon-dert)"]
    ], [
      ["Zusammen {v:macht} das 8,30 Euro.", "Together · makes · that · 8.30 · euro", "Altogether that is 8.30 euros.", "8,30 = acht Euro dreißig (AKHT OY-ro DRAI-sikh)"],
      ["Tom {v:gibt} 10 Euro. Er {v:bekommt} 1,70 Euro zurück.", "Tom · gives · 10 · euro · he · gets · 1.70 · euro · back", "Tom gives 10 euros. He gets 1.70 euros back.", "10 = zehn (TSAYN) · 1,70 = ein Euro siebzig (AIN OY-ro ZEEP-tsikh)"],
      ["„{v:Danke}, tschüss!“ – „{v:Bitte} schön! Schönes Wochenende!“", "Thanks · bye · – · please · nice · nice · weekend", "“Thanks, bye!” – “You're welcome! Have a nice weekend!”"]
    ]],
    words: [["der", "Markt", "market"], ["das", "Kilo", "kilo"], ["die", "Milch", "milk"], ["der", "Käse", "cheese"], ["das", "Brot", "bread"], ["pl", "Äpfel", "apples"], ["", "lecker", "delicious"], ["", "kosten", "to cost"]],
    tip: ["Was kostet das? Ich nehme …  Preise: 2,50 € = zwei Euro fünfzig. Nach einer Zahl steht oft der Plural.", "Ask the price with Was kostet das? and decide with Ich nehme …"],
    quiz: [["Ein Kilo Äpfel kostet 2,50 Euro.", "A kilo of apples costs 2.50.", true], ["Tom kauft keine Milch.", "Tom does not buy milk.", false], ["Tom gibt 20 Euro.", "Tom gives 20 euros.", false]] },

  { id: "grill", kind: "story", title: "Die Grillparty", en: "The barbecue party", scene: "grill",
    sum: "At a barbecue Anna, a vegetarian, finds out what she can eat. Practise kein / keine and food words.",
    paras: [[
      ["Am Samstag {v:ist} eine {die:Grillparty} im {der:Garten}.", "On · Saturday · is · a · barbecue-party · in-the · garden", "On Saturday there is a barbecue party in the garden."],
      ["Viele {pl:Freunde} {v:kommen}. Es {v:ist} warm und sonnig.", "Many · friends · come · it · is · warm · and · sunny", "Many friends come. It is warm and sunny."],
      ["Es {v:gibt} {die:Wurst}, {das:Fleisch} und {der:Salat}.", "There · gives · sausage · meat · and · salad", "There is sausage, meat and salad."]
    ], [
      ["Anna {v:ist} Vegetarierin. Sie {v:isst} keine {die:Wurst} und kein {das:Fleisch}.", "Anna · is · vegetarian · she · eats · no · sausage · and · no · meat", "Anna is a vegetarian. She eats no sausage and no meat."],
      ["„{v:Gibt} es auch {der:Käse}?“, {v:fragt} sie.", "Gives · it · also · cheese · asks · she", "“Is there cheese too?” she asks."],
      ["„Ja, und {die:Tomaten}, {die:Gurke} und {das:Brot}!“", "Yes · and · tomatoes · cucumber · and · bread", "“Yes, and tomatoes, cucumber and bread!”"],
      ["Anna {v:nimmt} {der:Salat} und {das:Brot}. Das {v:schmeckt} lecker!", "Anna · takes · salad · and · bread · that · tastes · delicious", "Anna takes salad and bread. It tastes delicious!"]
    ], [
      ["„{v:Möchtest} du noch ein {das:Wasser}?“ – „Ja, gern!“", "Would-like · you · another · a · water · – · yes · gladly", "“Would you like another water?” – “Yes, please!”"],
      ["Um 20 Uhr {v:ist} Anna satt. Sie {v:sagt}: „{v:Danke}, es {v:war} sehr gut!“", "At · 20 · o'clock · is · Anna · full · she · says · thanks · it · was · very · good", "At eight Anna is full. She says: “Thanks, it was very good!”", "20 = zwanzig (TSVAN-tsikh)"]
    ]],
    words: [["die", "Wurst", "sausage"], ["das", "Fleisch", "meat"], ["der", "Salat", "salad"], ["der", "Käse", "cheese"], ["das", "Wasser", "water"], ["der", "Garten", "garden"], ["", "satt", "full"], ["", "lecker", "delicious"]],
    tip: ["kein/keine = nicht ein: keine Wurst (die), kein Fleisch (das), keinen Salat (der).", "kein/keine means \"no / not a\". Match it to the noun's gender."],
    quiz: [["Anna isst keine Wurst.", "Anna eats no sausage.", true], ["Es gibt keinen Käse.", "There is no cheese.", false]] },

  { id: "wochenende", kind: "story", title: "Mein Wochenende", en: "My weekend", scene: "bike",
    sum: "Ben's weekend: sleeping in, cycling, shopping and a birthday with his parents. Practise days (am Samstag) and sein / seine.",
    paras: [[
      ["Am Samstag {v:schläft} Ben lange.", "On · Saturday · sleeps · Ben · long", "On Saturday Ben sleeps in."],
      ["Um 10 Uhr {v:frühstückt} er mit {pl:Brötchen} und {der:Käse}.", "At · 10 · o'clock · has-breakfast · he · with · rolls · and · cheese", "At ten he has breakfast with rolls and cheese.", "10 = zehn (TSAYN)"],
      ["Dann {v:fährt} er {das:Fahrrad} im {der:Park}.", "Then · rides · he · bicycle · in-the · park", "Then he rides his bike in the park."],
      ["Am Nachmittag {v:geht} er {v:einkaufen}.", "In-the · afternoon · goes · he · shopping", "In the afternoon he goes shopping."]
    ], [
      ["Am Sonntag {v:besucht} er seine {pl:Eltern}.", "On · Sunday · visits · he · his · parents", "On Sunday he visits his parents."],
      ["Seine {die:Mutter} {v:hat} {der:Geburtstag}. Sie {v:ist} 50 {pl:Jahre} alt.", "His · mother · has · birthday · she · is · 50 · years · old", "His mother has a birthday. She is 50 years old.", "50 = fünfzig (FUENF-tsikh)"],
      ["Ben {v:schenkt} ihr {pl:Blumen} und eine {die:Torte}.", "Ben · gives · her · flowers · and · a · cake", "Ben gives her flowers and a cake."],
      ["Sie {v:feiern} zusammen. Seine {die:Schwester} {v:kommt} auch.", "They · celebrate · together · his · sister · comes · also", "They celebrate together. His sister comes too."],
      ["Am Abend {v:ist} Ben müde, aber {v:glücklich}.", "In-the · evening · is · Ben · tired · but · happy", "In the evening Ben is tired but happy."]
    ]],
    words: [["das", "Wochenende", "weekend"], ["das", "Fahrrad", "bicycle"], ["pl", "Eltern", "parents"], ["die", "Mutter", "mother"], ["die", "Schwester", "sister"], ["der", "Geburtstag", "birthday"], ["die", "Torte", "cake"], ["pl", "Blumen", "flowers"]],
    tip: ["am + Tag: am Samstag, am Sonntag. sein → seine vor die-Wörtern und Plural: seine Mutter, seine Eltern.", "am + day. Use seine in front of die-words and plurals."],
    quiz: [["Ben besucht seine Eltern am Samstag.", "Ben visits his parents on Saturday.", false], ["Bens Mutter ist 50 Jahre alt.", "Ben's mother is 50.", true]] },

  { id: "weber", kind: "story", title: "Familie Weber", en: "The Weber family", scene: "family",
    sum: "Meet the Webers: four people, a flat in Munich and a cat called Mimi. Practise family words, jobs and plurals.",
    paras: [[
      ["Das {v:ist} {die:Familie} Weber. Sie {v:sind} vier {pl:Personen}.", "That · is · family · Weber · they · are · four · persons", "This is the Weber family. They are four people.", "4 = vier (FEER)"],
      ["Herr Weber {v:ist} {der:Lehrer}. Frau Weber {v:ist} {die:Ärztin}.", "Mr · Weber · is · teacher · Mrs · Weber · is · doctor", "Mr Weber is a teacher. Mrs Weber is a doctor."],
      ["Sie {v:haben} zwei {pl:Kinder}: einen {der:Sohn} und eine {die:Tochter}.", "They · have · two · children · a · son · and · a · daughter", "They have two children: a son and a daughter.", "2 = zwei (TSVAI)"]
    ], [
      ["Sie {v:wohnen} in München. Die {die:Wohnung} {v:hat} 3 {pl:Zimmer}, eine {die:Küche} und ein {das:Bad}.", "They · live · in · Munich · the · flat · has · 3 · rooms · a · kitchen · and · a · bathroom", "They live in Munich. The flat has three rooms, a kitchen and a bathroom.", "3 = drei (DRAI)"],
      ["Im {das:Wohnzimmer} {v:steht} ein {das:Sofa}. Der {der:Tisch} {v:ist} groß.", "In-the · living-room · stands · a · sofa · the · table · is · big", "There is a sofa in the living room. The table is big."],
      ["Sie {v:haben} auch eine {die:Katze}. Sie {v:heißt} Mimi.", "They · have · also · a · cat · she · is-called · Mimi", "They also have a cat. Her name is Mimi."]
    ], [
      ["Am Sonntag {v:gehen} sie in den {der:Park}.", "On · Sunday · go · they · into · the · park", "On Sunday they go to the park."],
      ["Die {die:Tochter} {v:spielt} {der:Fußball}. Der {der:Sohn} {v:fährt} {das:Fahrrad}.", "The · daughter · plays · football · the · son · rides · bicycle", "The daughter plays football. The son rides his bike."],
      ["Am Abend {v:essen} alle zusammen. Das {v:ist} schön!", "In-the · evening · eat · all · together · that · is · nice", "In the evening everyone eats together. That is nice!"]
    ]],
    words: [["die", "Familie", "family"], ["der", "Sohn", "son"], ["die", "Tochter", "daughter"], ["pl", "Kinder", "children"], ["die", "Wohnung", "flat"], ["das", "Zimmer", "room"], ["die", "Katze", "cat"], ["der", "Lehrer", "teacher"]],
    tip: ["Nach einer Zahl: Plural. drei Zimmer, zwei Kinder. Beruf: Frau Weber ist Ärztin (ohne Artikel).", "After a number the noun is plural. Jobs have no article: Sie ist Ärztin."],
    quiz: [["Die Familie Weber wohnt in Berlin.", "The Webers live in Berlin.", false], ["Frau Weber ist Ärztin.", "Mrs Weber is a doctor.", true], ["Die Familie hat eine Katze.", "The family has a cat.", true]] }
];
