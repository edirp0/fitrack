var EX_DB=[
  {id:'push-up',name:'Push-up',m:'push',tags:['petto','tricipiti'],icon:'🔴'},
  {id:'push-up-w',name:'Push-up zavorra',m:'push',tags:['petto'],icon:'🔴'},
  {id:'dips',name:'Dips',m:'push',tags:['petto','tricipiti'],icon:'🔴'},
  {id:'dips-w',name:'Dips zavorra',m:'push',tags:['petto','tricipiti'],icon:'🔴'},
  {id:'archer-pu',name:'Archer Push-up',m:'push',tags:['petto'],icon:'🔴'},
  {id:'pike-pu',name:'Pike Push-up',m:'push',tags:['spalle'],icon:'🔴'},
  {id:'ohp',name:'Overhead Press',m:'push',tags:['spalle','tricipiti'],icon:'🔴'},
  {id:'bench',name:'Panca piana bilanciere',m:'push',tags:['petto','tricipiti','fondamentale'],icon:'🔴',fundamental:true},
  {id:'incl-bench',name:'Panca inclinata manubri',m:'push',tags:['petto alto','spalle'],icon:'🔴'},
  {id:'lateral-r',name:'Lateral Raises',m:'push',tags:['spalle'],icon:'🔴'},
  {id:'hspu',name:'Handstand Push-up',m:'push',tags:['spalle','skill'],icon:'🔴'},
  {id:'pull-up',name:'Pull-up',m:'pull',tags:['dorsali','bicipiti'],icon:'🟢'},
  {id:'pull-up-w',name:'Pull-up zavorra',m:'pull',tags:['dorsali'],icon:'🟢'},
  {id:'pull-exp',name:'Pull-up esplosivo',m:'pull',tags:['dorsali','skill'],icon:'🟢'},
  {id:'chin-up',name:'Chin-up',m:'pull',tags:['bicipiti'],icon:'🟢'},
  {id:'row',name:'Australian Row',m:'pull',tags:['dorsali'],icon:'🟢'},
  {id:'deadlift',name:'Stacco da terra',m:'pull',tags:['schiena','glutei','fondamentale'],icon:'🟢',fundamental:true},
  {id:'barbell-row',name:'Rematore bilanciere',m:'pull',tags:['dorsali','trapezi'],icon:'🟢'},
  {id:'face-pull',name:'Face Pull',m:'pull',tags:['spalle'],icon:'🟢'},
  {id:'hammer-c',name:'Hammer Curl',m:'pull',tags:['bicipiti'],icon:'🟢'},
  {id:'squat',name:'Squat',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡'},
  {id:'back-squat',name:'Back Squat',m:'lower',tags:['quadricipiti','glutei','fondamentale'],icon:'🟡',fundamental:true},
  {id:'front-squat',name:'Front Squat',m:'lower',tags:['quadricipiti','core'],icon:'🟡'},
  {id:'squat-w',name:'Squat zavorra',m:'lower',tags:['quadricipiti'],icon:'🟡'},
  {id:'squat-j',name:'Squat Jump',m:'lower',tags:['esplosività'],icon:'🟡'},
  {id:'pistol',name:'Pistol Squat',m:'lower',tags:['quadricipiti'],icon:'🟡'},
  {id:'pistol-w',name:'Pistol Squat zavorra',m:'lower',tags:['quadricipiti'],icon:'🟡'},
  {id:'bss',name:'Bulgarian Split Squat',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡'},
  {id:'nordic',name:'Nordic Curl',m:'lower',tags:['femorali'],icon:'🟡'},
  {id:'calf',name:'Calf Raises',m:'lower',tags:['polpacci'],icon:'🟡'},
  {id:'glute-b',name:'Glute Bridge',m:'lower',tags:['glutei'],icon:'🟡'},
  {id:'tuck-p',name:'Tuck Planche Hold',m:'skill',tags:['spalle','petto'],icon:'🟣'},
  {id:'planche-pu',name:'Planche Push-up',m:'skill',tags:['spalle'],icon:'🟣'},
  {id:'lsit',name:'L-Sit Hold',m:'skill',tags:['core','hip flexor'],icon:'🟣'},
  {id:'mu',name:'Muscle-up',m:'skill',tags:['pull','push'],icon:'🟣'},
  {id:'neg-mu',name:'Negative Muscle-up',m:'skill',tags:['pull'],icon:'🟣'},
  {id:'hshold',name:'Handstand Hold',m:'skill',tags:['spalle','core'],icon:'🟣'},
  {id:'hollow',name:'Hollow Body Hold',m:'core',tags:['addominali'],icon:'🔵'},
  {id:'plank',name:'Plank',m:'core',tags:['addominali'],icon:'🔵'},
  {id:'side-plank',name:'Side Plank',m:'core',tags:['obliqui'],icon:'🔵'},
  {id:'dragon-f',name:'Dragon Flag negativo',m:'core',tags:['addominali'],icon:'🔵'},
  {id:'v-ups',name:'V-Ups',m:'core',tags:['addominali'],icon:'🔵'},
  {id:'hang-kr',name:'Hanging Knee Raise',m:'core',tags:['hip flexor'],icon:'🔵'},
  {id:'burpees',name:'Burpees',m:'cardio',tags:['full body'],icon:'🔷'},
  {id:'mt-cl',name:'Mountain Climber',m:'cardio',tags:['core'],icon:'🔷'},
  {id:'jump-j',name:'Jumping Jacks',m:'cardio',tags:[],icon:'🔷'},
  {id:'hi-kn',name:'Ginocchia alte',m:'cardio',tags:[],icon:'🔷'},
  {id:'sprint',name:'Sprint sul posto',m:'cardio',tags:[],icon:'🔷'},
  {id:'ct-push',name:'Push-up su sedie',m:'push',tags:['petto','casa'],icon:'🏠'},
  {id:'ct-dip',name:'Dips su sedia',m:'push',tags:['tricipiti','casa'],icon:'🏠'},
  {id:'ct-incl',name:'Push-up inclinati',m:'push',tags:['petto alto','casa'],icon:'🏠'},
  {id:'ct-decl',name:'Push-up declinati',m:'push',tags:['petto basso','casa'],icon:'🏠'},
  {id:'ct-pike',name:'Pike push-up su sedia',m:'push',tags:['spalle','casa'],icon:'🏠'},
  {id:'ct-row',name:'Row sotto tavolo',m:'pull',tags:['dorsali','casa'],icon:'🏠'},
  {id:'ct-towel',name:'Row con asciugamano',m:'pull',tags:['dorsali','casa'],icon:'🏠'},
  {id:'ct-squat',name:'Squat corpo libero',m:'lower',tags:['quadricipiti','casa'],icon:'🏠'},
  {id:'ct-lunge',name:'Affondi',m:'lower',tags:['quadricipiti','glutei','casa'],icon:'🏠'},
  {id:'ct-wall',name:'Wall sit',m:'lower',tags:['quadricipiti','casa'],icon:'🏠'},
  {id:'ct-glute',name:'Glute Bridge pavimento',m:'lower',tags:['glutei','casa'],icon:'🏠'},
  {id:'ct-step',name:'Step-up su sedia',m:'lower',tags:['gambe','casa'],icon:'🏠'},
  {id:'ct-calf',name:'Calf raises scalino',m:'lower',tags:['polpacci','casa'],icon:'🏠'},
  {id:'ct-hollow',name:'Hollow body pavimento',m:'core',tags:['addominali','casa'],icon:'🏠'},
  {id:'ct-crunch',name:'Crunch',m:'core',tags:['addominali','casa'],icon:'🏠'},
  {id:'ct-vup',name:'V-ups pavimento',m:'core',tags:['addominali','casa'],icon:'🏠'},
  {id:'ct-hiit1',name:'Burpees modificati',m:'cardio',tags:['casa','full body'],icon:'🏠'},
  {id:'ct-hiit2',name:'Shadow boxing',m:'cardio',tags:['casa'],icon:'🏠'},
];
var EX_GUIDES={
  'push-up':{difficulty:'Beginner',objective:'Forza petto e tricipiti',desc:'Esercizio base a corpo libero per costruire controllo scapolare e spinta orizzontale.',steps:['Mani poco oltre la larghezza spalle e addome attivo.','Scendi con gomiti a 45 gradi mantenendo corpo in linea.','Spingi forte senza perdere assetto lombare.'],tip:'Espira in salita e non cedere con il bacino.'},
  'dips-w':{difficulty:'Advanced',objective:'Ipertrofia petto/tricipiti',desc:'Versione zavorrata dei dips per aumentare tensione meccanica e forza massimale.',steps:['Blocca scapole depresse prima di partire.','Scendi fino a gomito oltre 90 gradi controllando il core.','Risalita esplosiva mantenendo petto aperto.'],tip:'Aumenta il carico solo se chiudi tutte le serie pulite.'},
  'pull-up-w':{difficulty:'Advanced',objective:'Forza dorsali e bicipiti',desc:'Trazione verticale con carico aggiuntivo utile per progressi di forza.',steps:['Parti in dead hang attivo con spalle stabili.','Tira i gomiti verso il fianco fino al mento sopra la sbarra.','Scendi in 2-3 secondi mantenendo controllo.'],tip:'Evita slancio e usa ROM completo.'},
  'squat-w':{difficulty:'Intermediate',objective:'Forza gambe e glutei',desc:'Squat con sovraccarico per costruire massa su lower body.',steps:['Piedi a larghezza spalle, punte leggermente aperte.','Scendi con ginocchia in linea ai piedi e schiena neutra.','Risalita spingendo il pavimento con tutta la pianta.'],tip:'Mantieni il carico vicino al baricentro.'},
  'nordic':{difficulty:'Advanced',objective:'Forza femorali e prevenzione infortuni',desc:'Eccellente per catena posteriore e stabilita del ginocchio.',steps:['Blocca i piedi e attiva glutei.','Scendi lentamente in eccentrica mantenendo allineamento.','Aiutati con mani solo alla fine e risali controllato.'],tip:'Punta prima al controllo eccentrico.'},
  'plank':{difficulty:'Beginner',objective:'Stabilita core',desc:'Isometria per addome e controllo lombare.',steps:['Gomiti sotto le spalle e glutei contratti.','Crea una linea testa-anche-talloni.','Respira corto senza perdere l assetto.'],tip:'Meglio 30 secondi perfetti che 90 secondi in compenso.'}
};

const TC={
  push:{bg:'var(--red-d)',c:'var(--red)'},
  pull:{bg:'var(--green-d)',c:'var(--green)'},
  lower:{bg:'var(--orange-d)',c:'var(--orange)'},
  full:{bg:'var(--purple-d)',c:'var(--purple)'},
  calisthenics:{bg:'var(--acc3)',c:'var(--acc)'},
  cardio:{bg:'var(--blue-d)',c:'var(--blue)'},
  skill:{bg:'var(--acc3)',c:'var(--acc)'},
  rest:{bg:'rgba(138,135,126,.1)',c:'#8A8799'},
  custom:{bg:'var(--blue-d)',c:'var(--blue)'},
};

var FOOD_DB=[
  // PROTEINE ANIMALI
  {id:'pollo',name:'Petto di Pollo',kcal:110,p:23,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'tacchino',name:'Petto di Tacchino',kcal:104,p:24,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'tonno',name:'Tonno al naturale',kcal:116,p:26,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'salmon',name:'Salmone',kcal:208,p:20,c:0,g:13,unit:'g',cat:'🍗 Proteine'},
  {id:'uova',name:'Uova intere',kcal:155,p:13,c:1,g:11,unit:'pz',cat:'🍗 Proteine'},
  {id:'albumi',name:'Albume',kcal:52,p:11,c:1,g:0,unit:'pz',cat:'🍗 Proteine'},
  {id:'ricotta',name:'Ricotta magra',kcal:136,p:11,c:3,g:9,unit:'g',cat:'🍗 Proteine'},
  {id:'manzo',name:'Carne di Manzo 5%',kcal:137,p:21,c:0,g:5,unit:'g',cat:'🍗 Proteine'},
  {id:'merluzzo',name:'Merluzzo',kcal:82,p:18,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'gamberi',name:'Gamberi',kcal:99,p:24,c:0,g:0,unit:'g',cat:'🍗 Proteine'},
  {id:'sgombro',name:'Sgombro al naturale',kcal:139,p:19,c:0,g:7,unit:'g',cat:'🍗 Proteine'},
  {id:'prosciutto',name:'Prosciutto cotto magro',kcal:103,p:18,c:1,g:3,unit:'g',cat:'🍗 Proteine'},
  // LATTICINI
  {id:'yogurt',name:'Yogurt greco 0%',kcal:59,p:10,c:4,g:0,unit:'g',cat:'🥛 Latticini'},
  {id:'latte',name:'Latte parz. scremato',kcal:47,p:3,c:5,g:2,unit:'ml',cat:'🥛 Latticini'},
  {id:'mozzarella',name:'Mozzarella',kcal:280,p:20,c:2,g:22,unit:'g',cat:'🥛 Latticini'},
  {id:'fiocchi-l',name:'Fiocchi di latte',kcal:72,p:11,c:2,g:2,unit:'g',cat:'🥛 Latticini'},
  {id:'parmigiano',name:'Parmigiano reggiano',kcal:392,p:33,c:0,g:28,unit:'g',cat:'🥛 Latticini'},
  // INTEGRATORI
  {id:'whey',name:'Whey Protein',kcal:400,p:80,c:8,g:5,unit:'g',cat:'💊 Integratori'},
  {id:'caseina',name:'Caseina',kcal:370,p:78,c:5,g:3,unit:'g',cat:'💊 Integratori'},
  {id:'creatina',name:'Creatina monoidrato',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'gainers',name:'Mass Gainer',kcal:380,p:30,c:60,g:4,unit:'g',cat:'💊 Integratori'},
  // CEREALI
  {id:'riso',name:'Riso Basmati cotto',kcal:130,p:3,c:28,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'pasta',name:'Pasta cotta',kcal:158,p:6,c:31,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'avena',name:'Avena',kcal:389,p:17,c:66,g:7,unit:'g',cat:'🌾 Cereali'},
  {id:'pane',name:'Pane integrale',kcal:247,p:9,c:48,g:3,unit:'g',cat:'🌾 Cereali'},
  {id:'pane-b',name:'Pane bianco',kcal:265,p:9,c:52,g:2,unit:'g',cat:'🌾 Cereali'},
  {id:'quinoa',name:'Quinoa cotta',kcal:120,p:4,c:21,g:2,unit:'g',cat:'🌾 Cereali'},
  {id:'farro',name:'Farro cotto',kcal:147,p:5,c:29,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'patatine',name:'Patate dolci',kcal:86,p:2,c:20,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'patate',name:'Patate bollite',kcal:77,p:2,c:17,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'tortilla',name:'Tortilla di grano',kcal:294,p:8,c:52,g:7,unit:'g',cat:'🌾 Cereali'},
  {id:'fiocchi-av',name:'Fiocchi d\'avena',kcal:379,p:13,c:68,g:7,unit:'g',cat:'🌾 Cereali'},
  // FRUTTA
  {id:'banana',name:'Banana',kcal:89,p:1,c:23,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'mela',name:'Mela',kcal:52,p:0,c:14,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'arancia',name:'Arancia',kcal:47,p:1,c:12,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'fragole',name:'Fragole',kcal:32,p:1,c:8,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'mirtilli',name:'Mirtilli',kcal:57,p:1,c:14,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'ananas',name:'Ananas',kcal:50,p:1,c:13,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'kiwi',name:'Kiwi',kcal:61,p:1,c:15,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'avocado',name:'Avocado',kcal:160,p:2,c:9,g:15,unit:'g',cat:'🍎 Frutta'},
  {id:'datteri',name:'Datteri',kcal:282,p:2,c:75,g:0,unit:'g',cat:'🍎 Frutta'},
  // VERDURE
  {id:'broccoli',name:'Broccoli',kcal:34,p:3,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'spinaci',name:'Spinaci',kcal:23,p:3,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'zucchine',name:'Zucchine',kcal:17,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'pomodori',name:'Pomodori',kcal:18,p:1,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'cavolfiore',name:'Cavolfiore',kcal:25,p:2,c:5,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'carote',name:'Carote',kcal:41,p:1,c:10,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'piselli',name:'Piselli',kcal:81,p:5,c:14,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'asparagi',name:'Asparagi',kcal:20,p:2,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
  // LEGUMI
  {id:'lenticchie',name:'Lenticchie cotte',kcal:116,p:9,c:20,g:0,unit:'g',cat:'🫘 Legumi'},
  {id:'ceci',name:'Ceci cotti',kcal:164,p:9,c:27,g:3,unit:'g',cat:'🫘 Legumi'},
  {id:'fagioli',name:'Fagioli neri cotti',kcal:132,p:9,c:24,g:1,unit:'g',cat:'🫘 Legumi'},
  {id:'edamame',name:'Edamame',kcal:121,p:11,c:9,g:5,unit:'g',cat:'🫘 Legumi'},
  {id:'tofu',name:'Tofu',kcal:76,p:8,c:2,g:5,unit:'g',cat:'🫘 Legumi'},
  // GRASSI
  {id:'olio',name:'Olio EVO',kcal:884,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
  {id:'mandorle',name:'Mandorle',kcal:579,p:21,c:22,g:50,unit:'g',cat:'🫒 Grassi'},
  {id:'noci',name:'Noci',kcal:654,p:15,c:14,g:65,unit:'g',cat:'🫒 Grassi'},
  {id:'arachidi',name:'Burro di arachidi',kcal:588,p:25,c:20,g:50,unit:'g',cat:'🫒 Grassi'},
  {id:'semi-chia',name:'Semi di chia',kcal:486,p:17,c:42,g:31,unit:'g',cat:'🫒 Grassi'},
  {id:'semi-lino',name:'Semi di lino',kcal:534,p:18,c:29,g:42,unit:'g',cat:'🫒 Grassi'},
  {id:'semi-zucca',name:'Semi di zucca',kcal:559,p:30,c:11,g:49,unit:'g',cat:'🫒 Grassi'},
  {id:'pistacchi',name:'Pistacchi',kcal:560,p:20,c:28,g:45,unit:'g',cat:'🫒 Grassi'},
  {id:'nocciole',name:'Nocciole',kcal:628,p:15,c:17,g:61,unit:'g',cat:'🫒 Grassi'},
  {id:'bresaola',name:'Bresaola',kcal:151,p:32,c:0,g:2,unit:'g',cat:'🍗 Proteine'},
  {id:'sarde',name:'Sarde',kcal:208,p:25,c:0,g:11,unit:'g',cat:'🍗 Proteine'},
  {id:'seitan',name:'Seitan',kcal:120,p:23,c:4,g:1,unit:'g',cat:'🫘 Legumi'},
  {id:'tempeh',name:'Tempeh',kcal:192,p:20,c:8,g:11,unit:'g',cat:'🫘 Legumi'},
  {id:'riso-int',name:'Riso integrale cotto',kcal:111,p:3,c:23,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'couscous',name:'Couscous cotto',kcal:112,p:4,c:23,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'orzo',name:'Orzo cotto',kcal:123,p:2,c:28,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'pera',name:'Pera',kcal:57,p:0,c:15,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'uva',name:'Uva',kcal:69,p:1,c:18,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'mango',name:'Mango',kcal:60,p:1,c:15,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'peperoni',name:'Peperoni',kcal:31,p:1,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'melanzane',name:'Melanzane',kcal:25,p:1,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'cetrioli',name:'Cetrioli',kcal:15,p:1,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'funghi',name:'Funghi',kcal:22,p:3,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'fiocchi-m',name:'Muesli',kcal:365,p:11,c:68,g:7,unit:'g',cat:'🌾 Cereali'},
  {id:'orata',name:'Orata',kcal:121,p:20,c:0,g:4,unit:'g',cat:'🍗 Proteine'},
  {id:'branzino',name:'Branzino',kcal:124,p:22,c:0,g:4,unit:'g',cat:'🍗 Proteine'},
  {id:'petto-anatra',name:'Petto d anatra',kcal:201,p:24,c:0,g:11,unit:'g',cat:'🍗 Proteine'},
  {id:'fesa-vitello',name:'Fesa di vitello',kcal:133,p:21,c:0,g:5,unit:'g',cat:'🍗 Proteine'},
  {id:'skyr',name:'Skyr',kcal:62,p:11,c:4,g:0,unit:'g',cat:'🥛 Latticini'},
  {id:'kefir',name:'Kefir',kcal:64,p:3,c:7,g:3,unit:'ml',cat:'🥛 Latticini'},
  {id:'grana',name:'Grana padano',kcal:398,p:33,c:0,g:29,unit:'g',cat:'🥛 Latticini'},
  {id:'riso-venere',name:'Riso venere cotto',kcal:145,p:4,c:30,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'grano-sar',name:'Grano saraceno cotto',kcal:92,p:3,c:20,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'polenta',name:'Polenta cotta',kcal:70,p:2,c:15,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'mais',name:'Mais',kcal:86,p:3,c:19,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'rapa',name:'Rapa rossa',kcal:43,p:2,c:10,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'cavolo',name:'Cavolo cappuccio',kcal:25,p:1,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'lattuga',name:'Lattuga',kcal:15,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'rucola',name:'Rucola',kcal:25,p:3,c:4,g:1,unit:'g',cat:'🥦 Verdure'},
  {id:'fagiolini',name:'Fagiolini',kcal:31,p:2,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'lamponi',name:'Lamponi',kcal:52,p:1,c:12,g:1,unit:'g',cat:'🍎 Frutta'},
  {id:'papaya',name:'Papaya',kcal:43,p:1,c:11,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'pesca',name:'Pesca',kcal:39,p:1,c:10,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'albicocche',name:'Albicocche',kcal:48,p:1,c:11,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'castagne',name:'Castagne',kcal:213,p:2,c:45,g:2,unit:'g',cat:'🍎 Frutta'},
  {id:'anacardi',name:'Anacardi',kcal:553,p:18,c:30,g:44,unit:'g',cat:'🫒 Grassi'},
  {id:'macadamia',name:'Noci macadamia',kcal:718,p:8,c:14,g:76,unit:'g',cat:'🫒 Grassi'},
  {id:'sesamo',name:'Semi di sesamo',kcal:573,p:18,c:23,g:50,unit:'g',cat:'🫒 Grassi'},
  {id:'olive',name:'Olive nere',kcal:116,p:1,c:6,g:11,unit:'g',cat:'🫒 Grassi'},
  {id:'cioccolato85',name:'Cioccolato fondente 85%',kcal:598,p:12,c:19,g:52,unit:'g',cat:'🫒 Grassi'},
  {id:'hummus',name:'Hummus',kcal:166,p:8,c:14,g:10,unit:'g',cat:'🫘 Legumi'},
  {id:'soia',name:'Fagioli di soia cotti',kcal:173,p:16,c:10,g:9,unit:'g',cat:'🫘 Legumi'},
  {id:'piselli-prot',name:'Proteine di pisello',kcal:390,p:80,c:6,g:7,unit:'g',cat:'💊 Integratori'},
  {id:'iso-whey',name:'Whey Isolate',kcal:370,p:87,c:3,g:2,unit:'g',cat:'💊 Integratori'},
  {id:'beta-ala',name:'Beta alanina',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'omega3',name:'Omega 3',kcal:900,p:0,c:0,g:100,unit:'g',cat:'💊 Integratori'},
  // ── V6 FOOD EXPANSION ──────────────────────────────────────
  // Proteine aggiuntive
  {id:'lonza',name:'Lonza di maiale',kcal:143,p:22,c:0,g:6,unit:'g',cat:'🍗 Proteine'},
  {id:'pollo-cosce',name:'Coscia di pollo (senza pelle)',kcal:177,p:25,c:0,g:8,unit:'g',cat:'🍗 Proteine'},
  {id:'alici',name:'Alici sott\'olio scol.',kcal:170,p:22,c:0,g:9,unit:'g',cat:'🍗 Proteine'},
  {id:'polpo',name:'Polpo bollito',kcal:82,p:15,c:2,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'calamari',name:'Calamari',kcal:92,p:16,c:3,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'cozze',name:'Cozze',kcal:86,p:12,c:4,g:2,unit:'g',cat:'🍗 Proteine'},
  {id:'vongole',name:'Vongole',kcal:48,p:11,c:1,g:1,unit:'g',cat:'🍗 Proteine'},
  {id:'tacchino-macinato',name:'Tacchino macinato',kcal:150,p:21,c:0,g:7,unit:'g',cat:'🍗 Proteine'},
  {id:'manzo-macinato',name:'Manzo macinato 10%',kcal:176,p:19,c:0,g:11,unit:'g',cat:'🍗 Proteine'},
  {id:'speck',name:'Speck',kcal:280,p:26,c:0,g:19,unit:'g',cat:'🍗 Proteine'},
  {id:'prosciutto-crudo',name:'Prosciutto crudo magro',kcal:145,p:28,c:1,g:3,unit:'g',cat:'🍗 Proteine'},
  {id:'coppa',name:'Coppa di testa magra',kcal:100,p:15,c:1,g:4,unit:'g',cat:'🍗 Proteine'},
  // Latticini aggiuntivi
  {id:'quark',name:'Quark proteico',kcal:72,p:12,c:4,g:0,unit:'g',cat:'🥛 Latticini'},
  {id:'cottage',name:'Cottage cheese',kcal:98,p:11,c:3,g:4,unit:'g',cat:'🥛 Latticini'},
  {id:'feta',name:'Feta',kcal:264,p:14,c:4,g:21,unit:'g',cat:'🥛 Latticini'},
  {id:'caciotta',name:'Caciotta magra',kcal:280,p:24,c:1,g:20,unit:'g',cat:'🥛 Latticini'},
  {id:'latte-parz',name:'Latte intero',kcal:64,p:3,c:5,g:4,unit:'ml',cat:'🥛 Latticini'},
  {id:'yogurt-magro',name:'Yogurt magro bianco',kcal:45,p:5,c:6,g:0,unit:'g',cat:'🥛 Latticini'},
  {id:'yogurt-greco-2',name:'Yogurt greco 2%',kcal:73,p:10,c:4,g:2,unit:'g',cat:'🥛 Latticini'},
  // Cereali aggiuntivi
  {id:'kamut',name:'Grano Khorasan (kamut) cotto',kcal:132,p:5,c:28,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'teff',name:'Teff cotto',kcal:101,p:4,c:20,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'miglio',name:'Miglio cotto',kcal:119,p:4,c:23,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'amaranto',name:'Amaranto cotto',kcal:102,p:4,c:18,g:2,unit:'g',cat:'🌾 Cereali'},
  {id:'pane-segale',name:'Pane di segale',kcal:259,p:9,c:48,g:3,unit:'g',cat:'🌾 Cereali'},
  {id:'pasta-int',name:'Pasta integrale cotta',kcal:140,p:6,c:27,g:1,unit:'g',cat:'🌾 Cereali'},
  {id:'pasta-prot',name:'Pasta proteica (Barilla Prot.)',kcal:340,p:36,c:40,g:3,unit:'g',cat:'🌾 Cereali'},
  {id:'cracker-int',name:'Cracker integrali',kcal:416,p:10,c:72,g:10,unit:'g',cat:'🌾 Cereali'},
  {id:'riso-bianco',name:'Riso bianco cotto',kcal:130,p:3,c:28,g:0,unit:'g',cat:'🌾 Cereali'},
  {id:'pancake-av',name:'Pancake di avena (no uova)',kcal:260,p:8,c:46,g:5,unit:'g',cat:'🌾 Cereali'},
  // Frutta aggiuntiva
  {id:'ciliegie',name:'Ciliegie',kcal:63,p:1,c:16,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'melograno',name:'Melograno',kcal:83,p:2,c:19,g:1,unit:'g',cat:'🍎 Frutta'},
  {id:'cocco-fresco',name:'Cocco fresco',kcal:354,p:3,c:15,g:33,unit:'g',cat:'🍎 Frutta'},
  {id:'prugne',name:'Prugne fresche',kcal:46,p:1,c:11,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'fichi',name:'Fichi freschi',kcal:74,p:1,c:19,g:0,unit:'g',cat:'🍎 Frutta'},
  {id:'nettarine',name:'Nettarine',kcal:44,p:1,c:11,g:0,unit:'g',cat:'🍎 Frutta'},
  // Verdure aggiuntive
  {id:'pak-choi',name:'Pak choi / Bok choy',kcal:13,p:2,c:2,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'carciofi',name:'Carciofi bolliti',kcal:53,p:3,c:9,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'sedano',name:'Sedano',kcal:16,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'finocchi',name:'Finocchi',kcal:31,p:1,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'cicoria',name:'Cicoria',kcal:23,p:2,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'indivia',name:'Indivia',kcal:17,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'ravanelli',name:'Ravanelli',kcal:16,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'rape',name:'Rape',kcal:28,p:1,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'cavolo-nero',name:'Cavolo nero',kcal:35,p:3,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  {id:'broccoletti',name:'Broccoletti',kcal:40,p:4,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  // Legumi aggiuntivi
  {id:'fave',name:'Fave cotte',kcal:110,p:8,c:20,g:0,unit:'g',cat:'🫘 Legumi'},
  {id:'ceci-in-scatola',name:'Ceci in scatola',kcal:119,p:7,c:20,g:2,unit:'g',cat:'🫘 Legumi'},
  {id:'fagioli-borlotti',name:'Fagioli borlotti cotti',kcal:136,p:9,c:24,g:1,unit:'g',cat:'🫘 Legumi'},
  {id:'lupini',name:'Lupini',kcal:119,p:16,c:11,g:3,unit:'g',cat:'🫘 Legumi'},
  {id:'piselli-surgelati',name:'Piselli surgelati cotti',kcal:65,p:5,c:11,g:0,unit:'g',cat:'🫘 Legumi'},
  // Grassi / Condimenti
  {id:'tahini',name:'Tahini (pasta di sesamo)',kcal:595,p:17,c:21,g:54,unit:'g',cat:'🫒 Grassi'},
  {id:'olio-cocco',name:'Olio di cocco',kcal:862,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
  {id:'ghee',name:'Ghee (burro chiarificato)',kcal:876,p:0,c:0,g:99,unit:'g',cat:'🫒 Grassi'},
  {id:'aceto-balsamico',name:'Aceto balsamico',kcal:88,p:0,c:17,g:0,unit:'ml',cat:'🫒 Grassi'},
  {id:'salsa-soia',name:'Salsa di soia',kcal:53,p:8,c:5,g:0,unit:'ml',cat:'🫒 Grassi'},
  // Integratori aggiuntivi
  {id:'eaa',name:'EAA (amminoacidi essenziali)',kcal:30,p:7,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'bcaa',name:'BCAA',kcal:20,p:5,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'pre-workout',name:'Pre-Workout',kcal:10,p:0,c:2,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'glutammina',name:'Glutammina',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'vitamina-d',name:'Vitamina D3',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'zma',name:'ZMA (Zinco+Magnesio+B6)',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'caffeina',name:'Caffeina anidra',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
  {id:'citrullina',name:'Citrullina malato',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
];

/* ── V6 RICETTE FIT ─────────────────────────────────────────── */
var RECIPES_DB = [
  // COLAZIONE
  {id:'r-oatmeal-pro',name:'Porridge proteico al cioccolato',goal:['massa','mantenimento'],kcal:420,p:32,c:48,g:8,time:5,cat:'🌅 Colazione',
   ing:['80g avena','30g whey cioccolato','200ml latte scremato','1 banana','1 cucchiaio burro arachidi'],
   steps:'Cuoci l\'avena nel latte per 3 min. Fuori dal fuoco aggiungi la whey e mescola bene. Topping: banana a fette e burro di arachidi.'},
  {id:'r-pancake-albumi',name:'Pancake di albumi e avena',goal:['massa','definizione','mantenimento'],kcal:310,p:28,c:35,g:5,time:10,cat:'🌅 Colazione',
   ing:['150g albumi','60g fiocchi avena','1 banana matura','cannella','vaniglia'],
   steps:'Frulla tutti gli ingredienti. Cuoci porzioni in padella antiaderente 2 min per lato. Servi con frutta fresca.'},
  {id:'r-yogurt-bowl',name:'Yogurt greco bowl fit',goal:['definizione','mantenimento'],kcal:290,p:30,c:28,g:5,time:3,cat:'🌅 Colazione',
   ing:['200g yogurt greco 0%','30g granola integrale','100g mirtilli','1 cucchiaio miele','10g mandorle'],
   steps:'Versa lo yogurt in una bowl. Aggiungi granola, mirtilli, miele e mandorle a scaglie.'},
  {id:'r-uova-avocado',name:'Uova strapazzate e avocado su toast',goal:['massa','mantenimento'],kcal:480,p:28,c:32,g:22,time:8,cat:'🌅 Colazione',
   ing:['3 uova intere','1/2 avocado','2 fette pane integrale','pepe nero','sale','erba cipollina'],
   steps:'Strapazza le uova in padella. Schiaccia l\'avocado sul pane tostato. Topping: uova + pepe + erba cipollina.'},
  {id:'r-smoothie-verde',name:'Smoothie verde proteico',goal:['definizione','mantenimento'],kcal:280,p:25,c:30,g:4,time:4,cat:'🌅 Colazione',
   ing:['1 scoop whey vaniglia','100g spinaci freschi','1 banana congelata','200ml latte mandorla','1 cucchiaio semi chia'],
   steps:'Frulla tutto fino a ottenere una consistenza liscia. Servi subito ghiacciato.'},
  {id:'r-overnight-oats',name:'Overnight Oats al burro arachidi',goal:['massa','mantenimento'],kcal:460,p:26,c:55,g:12,time:5,cat:'🌅 Colazione',
   ing:['80g avena','200ml latte scremato','30g whey vaniglia','2 cucchiai burro arachidi','1 cucchiaio miele'],
   steps:'Mescola tutto in un barattolo la sera. Metti in frigo overnight. Al mattino aggiungi frutta a piacere.'},
  {id:'r-frittata-verdure',name:'Frittata di albumi e verdure',goal:['definizione','cut'],kcal:220,p:30,c:8,g:6,time:12,cat:'🌅 Colazione',
   ing:['200g albumi','50g spinaci','50g peperoni','30g feta','origano','pepe'],
   steps:'Rosola le verdure. Aggiungi gli albumi conditi. Copri e cuoci 5 min. Aggiungi feta e servi.'},
  // PRANZO
  {id:'r-bowl-pollo-riso',name:'Power Bowl: riso + pollo + avocado',goal:['massa','mantenimento'],kcal:520,p:42,c:48,g:12,time:15,cat:'🍽️ Pranzo',
   ing:['150g petto di pollo','150g riso basmati cotto','1/2 avocado','100g zucchine grigliate','limone','curcuma','olio EVO'],
   steps:'Griglia il pollo con curcuma e limone. Componi la bowl con riso, pollo a fettine, zucchine e avocado. Filo d\'olio.'},
  {id:'r-pasta-tonno',name:'Pasta proteica al tonno e pomodorini',goal:['mantenimento','massa'],kcal:490,p:38,c:52,g:8,time:15,cat:'🍽️ Pranzo',
   ing:['90g pasta integrale','160g tonno al naturale','150g pomodorini','aglio','basilico','10ml olio EVO'],
   steps:'Cuoci la pasta. Rosola aglio, aggiungi pomodorini. Unisci tonno sgocciolato. Condisci la pasta scolata con il sugo.'},
  {id:'r-buddha-bowl-quinoa',name:'Buddha Bowl: quinoa + salmone + verdure',goal:['definizione','mantenimento'],kcal:490,p:36,c:40,g:14,time:20,cat:'🍽️ Pranzo',
   ing:['120g quinoa cotta','120g salmone al forno','100g edamame','100g carote rape','rucola','tahini 1 cucchiaio','limone'],
   steps:'Cuoci la quinoa. Cuoci il salmone in forno 12 min a 180°C. Componi la bowl e condisci con tahini e limone.'},
  {id:'r-wrap-pollo',name:'Wrap proteico pollo e hummus',goal:['definizione','mantenimento'],kcal:380,p:34,c:38,g:9,time:10,cat:'🍽️ Pranzo',
   ing:['1 tortilla integrale','130g petto pollo grigliato','50g hummus','lattuga','pomodoro','peperone arrostito'],
   steps:'Spalma hummus sulla tortilla. Aggiungi pollo a listarelle, lattuga, pomodoro e peperoni. Arrotola e servi.'},
  {id:'r-zuppa-legumi',name:'Zuppa di legumi misti',goal:['definizione','mantenimento'],kcal:340,p:20,c:50,g:5,time:25,cat:'🍽️ Pranzo',
   ing:['100g ceci cotti','100g lenticchie cotte','100g fagioli borlotti','1 carota','sedano','cipolla','pomodori pelati','rosmarino'],
   steps:'Soffriggi cipolla, carota e sedano. Aggiungi pomodori e legumi. Cuoci 20 min con rosmarino. Frulla metà per cremosità.'},
  {id:'r-poke-bowl',name:'Poke Bowl proteico',goal:['massa','mantenimento'],kcal:540,p:38,c:52,g:14,time:15,cat:'🍽️ Pranzo',
   ing:['150g riso venere','150g salmone fresco a cubetti','1/2 avocado','edamame 50g','cetriolo','salsa soia 1 cucchiaio','sesamo'],
   steps:'Prepara il riso. Marina il salmone 5 min in salsa soia. Componi la bowl con tutti gli ingredienti e guarnisci con sesamo.'},
  {id:'r-insalata-proteica',name:'Insalata proteica di polpo',goal:['definizione','cut'],kcal:280,p:32,c:12,g:8,time:10,cat:'🍽️ Pranzo',
   ing:['200g polpo bollito','100g rucola','100g ceci','pomodorini','sedano','prezzemolo','limone','10ml olio EVO'],
   steps:'Taglia il polpo a tocchetti. Mescola con gli altri ingredienti. Condisci con olio e limone.'},
  {id:'r-pasta-pollo-pesto',name:'Pasta integrale pollo e pesto leggero',goal:['massa','mantenimento'],kcal:510,p:40,c:50,g:12,time:18,cat:'🍽️ Pranzo',
   ing:['80g pasta integrale','130g pollo grigliato','2 cucchiai pesto leggero','pomodorini','spinaci freschi'],
   steps:'Cuoci la pasta. A parte, mescola pesto con un po\' di acqua di cottura. Unisci pollo, spinaci e pomodorini.'},
  // CENA
  {id:'r-salmone-al-forno',name:'Salmone al forno con verdure',goal:['definizione','mantenimento','massa'],kcal:420,p:38,c:18,g:18,time:20,cat:'🌙 Cena',
   ing:['200g salmone','200g asparagi','150g pomodorini','limone','aglio','rosmarino','10ml olio EVO'],
   steps:'Metti il salmone con asparagi e pomodorini in teglia. Condisci con aglio, rosmarino, limone e olio. Forno 180°C per 18 min.'},
  {id:'r-pollo-patate',name:'Petto di pollo con patate dolci al forno',goal:['massa','mantenimento'],kcal:480,p:44,c:42,g:8,time:30,cat:'🌙 Cena',
   ing:['180g petto pollo','200g patate dolci','paprika','curcuma','olio EVO','rosmarino','aglio'],
   steps:'Taglia le patate a cubetti. Condisci tutto con spezie e olio. Forno 200°C per 25 min. Gira a metà cottura.'},
  {id:'r-merluzzo-vapore',name:'Merluzzo al vapore con quinoa',goal:['definizione','cut'],kcal:340,p:38,c:30,g:5,time:20,cat:'🌙 Cena',
   ing:['200g merluzzo','120g quinoa cotta','150g broccoli','limone','prezzemolo','sale','pepe'],
   steps:'Cuoci il merluzzo al vapore 12 min. Cuoci la quinoa. Sbollenta i broccoli. Servi con limone e prezzemolo.'},
  {id:'r-manzo-spinaci',name:'Manzo magro con spinaci saltati',goal:['massa','definizione'],kcal:400,p:40,c:10,g:18,time:15,cat:'🌙 Cena',
   ing:['180g carne manzo 5%','200g spinaci freschi','aglio','olio EVO','pepe nero','vino bianco secco'],
   steps:'Rosola la carne con aglio. Sfuma con vino. Separa e, nella stessa padella, salta gli spinaci con aglio. Servi insieme.'},
  {id:'r-frittata-proteica',name:'Frittata proteica alta al forno',goal:['definizione','cut'],kcal:290,p:38,c:6,g:12,time:20,cat:'🌙 Cena',
   ing:['4 uova intere','150g albumi','100g spinaci','100g funghi','50g feta','erbe aromatiche'],
   steps:'Mescola uova e albumi. Aggiungi verdure e feta. Versa in teglia antiaderente e cuoci in forno a 180°C per 18 min.'},
  {id:'r-burger-tonno',name:'Burger di tonno e ceci',goal:['definizione','mantenimento'],kcal:360,p:34,c:32,g:8,time:20,cat:'🌙 Cena',
   ing:['160g tonno naturale','100g ceci cotti','1 uovo','prezzemolo','limone','curcuma','pangrattato integrale 2 cucchiai'],
   steps:'Frulla ceci e tonno grossolanamente. Aggiungi uovo, spezie e pangrattato. Forma 2 burger. Cuoci in padella 4 min per lato.'},
  {id:'r-gamberi-zucchine',name:'Gamberi saltati con zucchine',goal:['definizione','cut'],kcal:260,p:30,c:8,g:10,time:12,cat:'🌙 Cena',
   ing:['200g gamberi','2 zucchine','aglio','pomodorini','vino bianco','olio EVO','prezzemolo'],
   steps:'Rosola aglio, aggiungi zucchine a rondelle. Unisci gamberi, sfuma con vino. Aggiungi pomodorini e prezzemolo.'},
  // SNACK
  {id:'r-frullato-post',name:'Shake post-allenamento',goal:['massa','mantenimento'],kcal:380,p:35,c:40,g:5,time:3,cat:'⚡ Snack / Post WO',
   ing:['30g whey vaniglia','1 banana','200ml latte scremato','5g creatina','1 cucchiaio miele'],
   steps:'Frulla tutto. Consuma entro 30 minuti dall\'allenamento.'},
  {id:'r-ricotta-miele',name:'Ciotola di ricotta con miele e frutta',goal:['mantenimento','massa'],kcal:260,p:18,c:28,g:8,time:2,cat:'⚡ Snack / Post WO',
   ing:['150g ricotta magra','1 cucchiaio miele','100g fragole','15g mandorle'],
   steps:'Monta leggermente la ricotta. Aggiungi miele e frutta. Guarnisci con mandorle a scaglie.'},
  {id:'r-hummus-verdure',name:'Hummus fatto in casa con verdure crude',goal:['definizione','mantenimento'],kcal:220,p:9,c:25,g:9,time:10,cat:'⚡ Snack / Post WO',
   ing:['200g ceci cotti','1 cucchiaio tahini','limone','aglio','olio EVO','paprika','carote e sedano per intingere'],
   steps:'Frulla ceci con tahini, limone, aglio e un po\' d\'acqua di cottura. Condisci con olio e paprika. Servi con verdure crude.'},
  {id:'r-muffin-avena',name:'Muffin fit avena e mirtilli',goal:['mantenimento','massa'],kcal:180,p:8,c:26,g:5,time:20,cat:'⚡ Snack / Post WO',
   ing:['120g avena','2 uova','100g yogurt greco','80g mirtilli','30ml miele','1 cucchiaino lievito','cannella'],
   steps:'Mescola avena, uova, yogurt e miele. Aggiungi mirtilli e lievito. Distribuisci in 6 pirottini. Forno 180°C per 18 min.'},
  {id:'r-energy-balls',name:'Energy Balls avena e burro arachidi',goal:['massa','mantenimento'],kcal:200,p:7,c:22,g:10,time:10,cat:'⚡ Snack / Post WO',
   ing:['100g avena','3 cucchiai burro arachidi','2 cucchiai miele','30g cioccolato fondente 85% a scaglie','semi chia'],
   steps:'Mescola tutto. Forma 8 palline. Metti in frigo 30 min prima di consumare.'},
  // MEAL PREP
  {id:'r-chili-tacchino',name:'Chili di tacchino e fagioli',goal:['massa','definizione','mantenimento'],kcal:390,p:42,c:34,g:8,time:35,cat:'🍱 Meal Prep',
   ing:['300g tacchino macinato','200g fagioli neri cotti','200g pomodori pelati','peperoni','cipolla','aglio','cumino','paprika affumicata','coriandolo'],
   steps:'Rosola tacchino con cipolla e aglio. Aggiungi peperoni, pomodori e spezie. Cuoci 25 min. Aggiungi fagioli e cuoci altri 5 min.'},
  {id:'r-meal-prep-pollo',name:'Meal prep: 5 petti di pollo grigliati',goal:['massa','definizione'],kcal:220,p:46,c:0,g:3,time:25,cat:'🍱 Meal Prep',
   ing:['5 petti di pollo 130g cad.','paprika','curcuma','aglio in polvere','sale','olio EVO','limone'],
   steps:'Marina i petti con spezie, olio e limone 1h. Griglia 6-7 min per lato. Lascia riposare. Conserva in frigo fino a 4 giorni.'},
  {id:'r-curry-lenticchie',name:'Curry di lenticchie e spinaci',goal:['definizione','mantenimento'],kcal:360,p:22,c:50,g:7,time:30,cat:'🍱 Meal Prep',
   ing:['200g lenticchie rosse secche','200ml latte di cocco','200g spinaci','cipolla','aglio','zenzero','curry in polvere','pomodori'],
   steps:'Soffriggi cipolla, aglio e zenzero. Aggiungi curry, lenticchie, pomodori e latte di cocco. Cuoci 20 min. Unisci spinaci a fine cottura.'},
];
window.RECIPES_DB = RECIPES_DB;

/* ── V6 UI: sezione ricette nella pagina nutrizione ── */
function renderRecipeSuggestions(goal) {
  const goalMap = {dimagrimento:['definizione','cut'],massa:['massa'],mantenimento:['mantenimento'],definizione:['definizione','cut']};
  const tags = goalMap[goal] || ['mantenimento'];
  return RECIPES_DB.filter(r => r.goal.some(g=>tags.includes(g))).slice(0,6);
}

const MOTO=[
  'Ogni goccia di sudore è un passo verso il successo.',
  'La forza non viene dalla vittoria, ma dalla lotta.',
  'Un giorno o il giorno uno. Tu scegli.',
  'Il dolore di oggi è la forza di domani.',
  'Nessuno rimpiange di essersi allenato.',
  'Il corpo raggiunge quello che la mente crede.',
  'Discipline is choosing between what you want now and what you want most.',
];

// ── PRESETS ─────────────────────────────────
var PRESETS_DATA=[

  /* ════════════════════════════════════════════
     CALISTHENICS — tutti i livelli
  ════════════════════════════════════════════ */
  {
    id:'cali-starter',name:'Calisthenics Starter',icon:'🌱',color:'var(--green)',
    t:'calisthenics',diff:'beginner',dur:'35',
    goals:['calisthenics','hypertrophy'],
    levels:['beginner'],
    desc:'Il punto di partenza assoluto. Push-up, squat, hollow e trazione australiana per imparare i movimenti fondamentali.',
    days:[
      {name:'Lunedì — Push + Core',type:'push',rest:false,exercises:[
        {id:'ct-incl',s:'4',r:'10',rs:'60s'},
        {id:'push-up',s:'3',r:'8',rs:'60s'},
        {id:'ct-pike',s:'3',r:'8',rs:'75s'},
        {id:'plank',s:'3',r:'30s',rs:'45s'},
        {id:'ct-hollow',s:'3',r:'25s',rs:'45s'},
      ]},
      {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mercoledì — Pull + Lower',type:'pull',rest:false,exercises:[
        {id:'row',s:'4',r:'10',rs:'60s'},
        {id:'ct-row',s:'3',r:'12',rs:'60s'},
        {id:'ct-squat',s:'4',r:'15',rs:'60s'},
        {id:'ct-lunge',s:'3',r:'10',rs:'60s'},
        {id:'ct-glute',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Full Body',type:'full',rest:false,exercises:[
        {id:'push-up',s:'3',r:'10',rs:'60s'},
        {id:'row',s:'3',r:'10',rs:'60s'},
        {id:'ct-squat',s:'3',r:'15',rs:'60s'},
        {id:'ct-hollow',s:'3',r:'30s',rs:'45s'},
        {id:'burpees',s:'3',r:'8',rs:'75s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'cali-base',name:'Calisthenics Base 3×',icon:'⚪',color:'var(--blue)',
    t:'calisthenics',diff:'beginner',dur:'40',
    goals:['calisthenics','hypertrophy'],
    levels:['beginner','intermediate'],
    desc:'3 giorni a settimana. Push, Pull, Lower separati. Il programma ideale per chi ha già qualche mese di base.',
    days:[
      {name:'Giorno A — Push',type:'push',rest:false,exercises:[
        {id:'push-up',s:'4',r:'12',rs:'60s'},
        {id:'dips',s:'3',r:'10',rs:'75s'},
        {id:'ct-pike',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'hollow',s:'3',r:'35s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giorno B — Pull',type:'pull',rest:false,exercises:[
        {id:'pull-up',s:'4',r:'6',rs:'90s'},
        {id:'row',s:'3',r:'12',rs:'60s'},
        {id:'chin-up',s:'3',r:'6',rs:'90s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'hang-kr',s:'3',r:'12',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giorno C — Lower',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'10',rs:'75s'},
        {id:'bss',s:'3',r:'10',rs:'75s'},
        {id:'glute-b',s:'3',r:'15',rs:'60s'},
        {id:'calf',s:'3',r:'20',rs:'45s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'cali-intermediate',name:'Calisthenics Intermedio',icon:'🔵',color:'var(--blue)',
    t:'calisthenics',diff:'intermediate',dur:'50',
    goals:['calisthenics','hypertrophy','strength'],
    levels:['intermediate'],
    desc:'4 giorni con introduzione alle skill: tuck planche e L-sit. Sbarra e parallele obbligatorie.',
    days:[
      {name:'Lunedì — Push + Skill',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'push-up-w',s:'3',r:'10',rs:'75s'},
        {id:'archer-pu',s:'3',r:'6',rs:'90s'},
        {id:'tuck-p',s:'4',r:'20s',rs:'90s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Martedì — Pull + Skill',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'chin-up',s:'3',r:'8',rs:'75s'},
        {id:'row',s:'3',r:'12',rs:'60s'},
        {id:'lsit',s:'4',r:'25s',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'face-pull',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Lower + Core',type:'lower',rest:false,exercises:[
        {id:'pistol',s:'4',r:'6',rs:'90s'},
        {id:'bss',s:'3',r:'10',rs:'75s'},
        {id:'nordic',s:'3',r:'5',rs:'90s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
        {id:'hollow',s:'4',r:'40s',rs:'45s'},
        {id:'dragon-f',s:'3',r:'4',rs:'60s'},
      ]},
      {name:'Venerdì — Full Body',type:'full',rest:false,exercises:[
        {id:'dips',s:'3',r:'10',rs:'75s'},
        {id:'pull-up',s:'3',r:'8',rs:'75s'},
        {id:'squat-w',s:'3',r:'10',rs:'75s'},
        {id:'tuck-p',s:'3',r:'20s',rs:'90s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'cali5',name:'Calisthenics Ipertrofia 5×',icon:'⚡',color:'var(--acc)',
    t:'calisthenics',diff:'advanced',dur:'55',
    goals:['calisthenics','hypertrophy','strength'],
    levels:['advanced','athlete'],
    desc:'5 giorni — Lower, Push+Skill, Riposo, Pull+Skill, Full Body superset, HIIT. Il programma definitivo per massa calistenica.',
    days:[
      {name:'Lunedì — Lower',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'4',r:'8',rs:'90s'},
        {id:'squat-j',s:'3',r:'8',rs:'60s'},
        {id:'nordic',s:'3',r:'7',rs:'90s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
        {id:'dragon-f',s:'3',r:'5',rs:'60s'},
      ]},
      {name:'Martedì — Push+Skill',type:'push',rest:false,exercises:[
        {id:'tuck-p',s:'4',r:'25s',rs:'120s'},
        {id:'planche-pu',s:'3',r:'6',rs:'120s'},
        {id:'dips-w',s:'4',r:'10',rs:'90s'},
        {id:'push-up-w',s:'3',r:'12',rs:'75s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'14',rs:'60s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Pull+Skill',type:'pull',rest:false,exercises:[
        {id:'pull-exp',s:'3',r:'5',rs:'120s'},
        {id:'neg-mu',s:'3',r:'3',rs:'120s'},
        {id:'pull-up-w',s:'4',r:'8',rs:'90s'},
        {id:'face-pull',s:'3',r:'14',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'lsit',s:'3',r:'40s',rs:'60s'},
      ]},
      {name:'Venerdì — Full Body',type:'full',rest:false,exercises:[
        {id:'dips-w',s:'3',r:'10',rs:'90s'},
        {id:'pull-up-w',s:'3',r:'8',rs:'90s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'14',rs:'45s'},
        {id:'hammer-c',s:'3',r:'12',rs:'45s'},
        {id:'v-ups',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Sabato — HIIT+Skill',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'4',r:'4min',rs:'3min'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'lsit',s:'3',r:'35s',rs:'60s'},
        {id:'tuck-p',s:'3',r:'25s',rs:'90s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'cali-skill',name:'Calisthenics Skill Avanzato',icon:'🟣',color:'var(--purple)',
    t:'calisthenics',diff:'advanced',dur:'65',
    goals:['calisthenics','strength'],
    levels:['advanced','athlete'],
    desc:'Muscle-up, Planche progressions, Handstand e Dragon Flag. Skill pure con volume ridotto e qualità massima.',
    days:[
      {name:'Lunedì — Planche + Push',type:'push',rest:false,exercises:[
        {id:'tuck-p',s:'5',r:'30s',rs:'120s'},
        {id:'planche-pu',s:'4',r:'5',rs:'150s'},
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'archer-pu',s:'3',r:'6',rs:'90s'},
        {id:'hspu',s:'3',r:'5',rs:'120s'},
      ]},
      {name:'Martedì — Muscle-up + Pull',type:'pull',rest:false,exercises:[
        {id:'mu',s:'4',r:'4',rs:'180s'},
        {id:'neg-mu',s:'3',r:'4',rs:'120s'},
        {id:'pull-exp',s:'4',r:'5',rs:'120s'},
        {id:'pull-up-w',s:'3',r:'6',rs:'90s'},
        {id:'lsit',s:'4',r:'45s',rs:'60s'},
      ]},
      {name:'Mercoledì — Riposo attivo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Handstand + Core',type:'skill',rest:false,exercises:[
        {id:'hshold',s:'5',r:'30s',rs:'90s'},
        {id:'hspu',s:'4',r:'4',rs:'120s'},
        {id:'dragon-f',s:'4',r:'6',rs:'90s'},
        {id:'hollow',s:'4',r:'50s',rs:'45s'},
        {id:'v-ups',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Venerdì — Lower + Pistol',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'5',r:'6',rs:'90s'},
        {id:'nordic',s:'4',r:'6',rs:'120s'},
        {id:'bss',s:'3',r:'10',rs:'75s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
        {id:'hang-kr',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     PUSH / PULL / LOWER — varianti
  ════════════════════════════════════════════ */
  {
    id:'ppl-beginner',name:'PPL Principiante',icon:'🟢',color:'var(--green)',
    t:'full',diff:'beginner',dur:'40',
    goals:['hypertrophy','strength'],
    levels:['beginner'],
    desc:'Push Pull Lower su 3 giorni. Esercizi semplici, volume moderato. Il primo programma strutturato.',
    days:[
      {name:'Push',type:'push',rest:false,exercises:[
        {id:'push-up',s:'4',r:'10',rs:'60s'},
        {id:'ct-pike',s:'3',r:'10',rs:'75s'},
        {id:'ct-dip',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Pull',type:'pull',rest:false,exercises:[
        {id:'row',s:'4',r:'12',rs:'60s'},
        {id:'chin-up',s:'3',r:'5',rs:'90s'},
        {id:'ct-row',s:'3',r:'12',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'hang-kr',s:'3',r:'12',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Lower',type:'lower',rest:false,exercises:[
        {id:'ct-squat',s:'4',r:'15',rs:'60s'},
        {id:'ct-lunge',s:'3',r:'12',rs:'60s'},
        {id:'ct-glute',s:'3',r:'15',rs:'45s'},
        {id:'ct-wall',s:'3',r:'50s',rs:'45s'},
        {id:'calf',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'ppl',name:'Push / Pull / Lower',icon:'💪',color:'var(--purple)',
    t:'full',diff:'intermediate',dur:'55',
    goals:['hypertrophy','strength'],
    levels:['intermediate','advanced'],
    desc:'3 giorni classici con sbarra e parallele. Semplice, efficace, collaudato. Il programma più usato nel calisthenics.',
    days:[
      {name:'Push',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'push-up-w',s:'3',r:'12',rs:'75s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'hollow',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Pull',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'row',s:'3',r:'14',rs:'60s'},
        {id:'face-pull',s:'3',r:'15',rs:'45s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
      ]},
      {name:'Lower',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'8',rs:'90s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
      ]},
    ]
  },
  {
    id:'ppl-6day',name:'PPL × 6 Giorni',icon:'🔥',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'55',
    goals:['hypertrophy','strength'],
    levels:['advanced','athlete'],
    desc:'Push Pull Lower ripetuto due volte a settimana per massimo volume. Per chi si allena 6 giorni.',
    days:[
      {name:'Push A',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'5',r:'8',rs:'90s'},
        {id:'push-up-w',s:'4',r:'12',rs:'75s'},
        {id:'ohp',s:'4',r:'8',rs:'90s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'tuck-p',s:'3',r:'25s',rs:'90s'},
      ]},
      {name:'Pull A',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'5',r:'6',rs:'90s'},
        {id:'pull-exp',s:'3',r:'5',rs:'120s'},
        {id:'row',s:'4',r:'12',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'lsit',s:'3',r:'35s',rs:'60s'},
      ]},
      {name:'Lower A',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'4',r:'6',rs:'90s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'hollow',s:'4',r:'45s',rs:'45s'},
        {id:'calf',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Push B',type:'push',rest:false,exercises:[
        {id:'archer-pu',s:'4',r:'6',rs:'90s'},
        {id:'dips-w',s:'4',r:'10',rs:'90s'},
        {id:'planche-pu',s:'3',r:'5',rs:'120s'},
        {id:'lateral-r',s:'4',r:'15',rs:'60s'},
        {id:'v-ups',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Pull B',type:'pull',rest:false,exercises:[
        {id:'neg-mu',s:'3',r:'4',rs:'120s'},
        {id:'pull-up-w',s:'4',r:'8',rs:'90s'},
        {id:'chin-up',s:'3',r:'8',rs:'75s'},
        {id:'face-pull',s:'3',r:'15',rs:'45s'},
        {id:'hang-kr',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Lower B',type:'lower',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'12',rs:'60s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'glute-b',s:'4',r:'15',rs:'60s'},
        {id:'dragon-f',s:'3',r:'5',rs:'60s'},
        {id:'side-plank',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     FORZA
  ════════════════════════════════════════════ */
  {
    id:'forza-base',name:'Forza Base 3×',icon:'🔩',color:'var(--orange)',
    t:'full',diff:'beginner',dur:'45',
    goals:['strength'],
    levels:['beginner','intermediate'],
    desc:'Tre giorni di forza su schemi semplici. Progressione lineare su pull-up, dips e squat.',
    days:[
      {name:'Full A — Spinta',type:'push',rest:false,exercises:[
        {id:'dips',s:'5',r:'5',rs:'120s'},
        {id:'push-up-w',s:'3',r:'8',rs:'90s'},
        {id:'ohp',s:'3',r:'8',rs:'90s'},
        {id:'plank',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full B — Trazione',type:'pull',rest:false,exercises:[
        {id:'pull-up',s:'5',r:'5',rs:'120s'},
        {id:'chin-up',s:'3',r:'6',rs:'90s'},
        {id:'row',s:'3',r:'10',rs:'75s'},
        {id:'hollow',s:'3',r:'35s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full C — Lower',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'5',r:'5',rs:'120s'},
        {id:'bss',s:'3',r:'8',rs:'90s'},
        {id:'nordic',s:'3',r:'5',rs:'120s'},
        {id:'calf',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'forza',name:'Forza Pura',icon:'🏋️',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'75',
    goals:['strength'],
    levels:['advanced','athlete'],
    desc:'Serie pesanti, basse reps, riposi lunghi. Per chi vuole numeri e forza assoluta.',
    days:[
      {name:'Lower Forza',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'5',r:'5',rs:'150s'},
        {id:'bss',s:'4',r:'6',rs:'120s'},
        {id:'nordic',s:'4',r:'5',rs:'120s'},
        {id:'calf',s:'4',r:'12',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Upper Forza',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'5',r:'5',rs:'180s'},
        {id:'pull-up-w',s:'5',r:'5',rs:'180s'},
        {id:'ohp',s:'4',r:'6',rs:'120s'},
        {id:'row',s:'4',r:'8',rs:'90s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body Pesante',type:'full',rest:false,exercises:[
        {id:'pistol-w',s:'4',r:'5',rs:'150s'},
        {id:'dips-w',s:'4',r:'6',rs:'150s'},
        {id:'pull-up-w',s:'4',r:'5',rs:'150s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     CASA — zero attrezzi
  ════════════════════════════════════════════ */
  {
    id:'casa-starter',name:'Casa — Primo Mese',icon:'🏡',color:'var(--green)',
    t:'full',diff:'beginner',dur:'25',
    goals:['fat_loss','endurance'],
    levels:['beginner'],
    desc:'Completamente senza attrezzi, 3 sessioni da 25 min. Perfetto per chi inizia da zero.',
    days:[
      {name:'Sessione A',type:'full',rest:false,exercises:[
        {id:'ct-push',s:'3',r:'8',rs:'60s'},
        {id:'ct-squat',s:'3',r:'12',rs:'60s'},
        {id:'ct-glute',s:'3',r:'12',rs:'45s'},
        {id:'ct-hollow',s:'3',r:'20s',rs:'45s'},
        {id:'ct-hiit1',s:'3',r:'6',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B',type:'full',rest:false,exercises:[
        {id:'ct-incl',s:'3',r:'8',rs:'60s'},
        {id:'ct-lunge',s:'3',r:'10',rs:'60s'},
        {id:'ct-wall',s:'3',r:'40s',rs:'45s'},
        {id:'ct-crunch',s:'3',r:'15',rs:'45s'},
        {id:'jump-j',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione C — Cardio',type:'cardio',rest:false,exercises:[
        {id:'ct-hiit1',s:'4',r:'30s',rs:'30s'},
        {id:'ct-hiit2',s:'3',r:'30s',rs:'30s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
        {id:'hi-kn',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'casa-full',name:'Casa — Corpo Libero Totale',icon:'🏠',color:'var(--green)',
    t:'full',diff:'beginner',dur:'40',
    goals:['hypertrophy','fat_loss','endurance'],
    levels:['beginner'],
    desc:'Zero attrezzi, solo sedia e pavimento. Perfetto per iniziare o allenarsi ovunque.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'ct-push',s:'4',r:'10',rs:'60s'},
        {id:'ct-row',s:'3',r:'12',rs:'60s'},
        {id:'ct-squat',s:'4',r:'15',rs:'60s'},
        {id:'ct-hollow',s:'3',r:'40s',rs:'45s'},
        {id:'ct-lunge',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'ct-dip',s:'3',r:'10',rs:'60s'},
        {id:'ct-towel',s:'3',r:'12',rs:'60s'},
        {id:'ct-glute',s:'4',r:'15',rs:'45s'},
        {id:'ct-vup',s:'3',r:'15',rs:'45s'},
        {id:'ct-step',s:'3',r:'12',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'HIIT Casa',type:'cardio',rest:false,exercises:[
        {id:'ct-hiit1',s:'4',r:'30s',rs:'30s'},
        {id:'ct-hiit2',s:'3',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'30s',rs:'30s'},
        {id:'jump-j',s:'3',r:'40s',rs:'20s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'casa-cal',name:'Casa — Calisthenics Intermedio',icon:'🤸',color:'var(--purple)',
    t:'calisthenics',diff:'intermediate',dur:'45',
    goals:['calisthenics','mobility'],
    levels:['beginner','intermediate'],
    desc:'Progressioni calisthenics senza sbarra. Forza, mobilità e skill con sedia e pavimento.',
    days:[
      {name:'Push + Core',type:'push',rest:false,exercises:[
        {id:'ct-decl',s:'4',r:'10',rs:'75s'},
        {id:'ct-incl',s:'3',r:'12',rs:'60s'},
        {id:'ct-pike',s:'3',r:'10',rs:'90s'},
        {id:'ct-dip',s:'3',r:'10',rs:'75s'},
        {id:'ct-hollow',s:'4',r:'45s',rs:'45s'},
      ]},
      {name:'Lower + Core',type:'lower',rest:false,exercises:[
        {id:'ct-squat',s:'4',r:'20',rs:'60s'},
        {id:'ct-lunge',s:'4',r:'12',rs:'60s'},
        {id:'ct-wall',s:'3',r:'60s',rs:'45s'},
        {id:'ct-glute',s:'3',r:'20',rs:'45s'},
        {id:'ct-calf',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Pull + Skill',type:'pull',rest:false,exercises:[
        {id:'ct-row',s:'4',r:'12',rs:'75s'},
        {id:'ct-towel',s:'4',r:'10',rs:'75s'},
        {id:'lsit',s:'3',r:'20s',rs:'60s'},
        {id:'tuck-p',s:'3',r:'15s',rs:'90s'},
        {id:'hollow',s:'4',r:'40s',rs:'45s'},
      ]},
      {name:'HIIT + Core',type:'cardio',rest:false,exercises:[
        {id:'ct-hiit1',s:'5',r:'30s',rs:'30s'},
        {id:'ct-hiit2',s:'3',r:'40s',rs:'20s'},
        {id:'ct-crunch',s:'3',r:'20',rs:'45s'},
        {id:'ct-vup',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     FULL BODY
  ════════════════════════════════════════════ */
  {
    id:'full-beginner',name:'Full Body Principiante',icon:'🌟',color:'var(--green)',
    t:'full',diff:'beginner',dur:'35',
    goals:['hypertrophy','fat_loss'],
    levels:['beginner'],
    desc:'3 sessioni full body da 35 min. Un esercizio per gruppo muscolare, ideale per costruire abitudini.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'push-up',s:'3',r:'10',rs:'60s'},
        {id:'row',s:'3',r:'10',rs:'60s'},
        {id:'ct-squat',s:'3',r:'15',rs:'60s'},
        {id:'ct-hollow',s:'3',r:'30s',rs:'45s'},
        {id:'burpees',s:'3',r:'8',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'ct-push',s:'3',r:'10',rs:'60s'},
        {id:'chin-up',s:'3',r:'5',rs:'90s'},
        {id:'ct-lunge',s:'3',r:'12',rs:'60s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
        {id:'jump-j',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body C',type:'full',rest:false,exercises:[
        {id:'dips',s:'3',r:'8',rs:'75s'},
        {id:'pull-up',s:'3',r:'5',rs:'90s'},
        {id:'ct-wall',s:'3',r:'50s',rs:'45s'},
        {id:'ct-crunch',s:'3',r:'15',rs:'45s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'full-intermediate',name:'Full Body Intermedio 4×',icon:'🔷',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'50',
    goals:['hypertrophy','strength'],
    levels:['intermediate'],
    desc:'4 sessioni full body con split A/B. Volume più alto, progressione su tutti i movimenti.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'squat-w',s:'4',r:'10',rs:'75s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'push-up-w',s:'4',r:'12',rs:'75s'},
        {id:'chin-up',s:'4',r:'8',rs:'90s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
        {id:'burpees',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'squat-w',s:'4',r:'10',rs:'75s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'push-up-w',s:'4',r:'12',rs:'75s'},
        {id:'chin-up',s:'4',r:'8',rs:'90s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
        {id:'burpees',s:'3',r:'10',rs:'75s'},
      ]},
    ]
  },

  /* ════════════════════════════════════════════
     CARDIO & FAT LOSS
  ════════════════════════════════════════════ */
  {
    id:'hiit-beginner',name:'HIIT Principiante',icon:'🟡',color:'var(--acc)',
    t:'cardio',diff:'beginner',dur:'20',
    goals:['fat_loss','endurance'],
    levels:['beginner'],
    desc:'Circuiti brevi ad alta intensità per bruciare grassi. 20 min, nessun attrezzo, nessuna scusa.',
    days:[
      {name:'Circuito A',type:'cardio',rest:false,exercises:[
        {id:'jump-j',s:'3',r:'30s',rs:'30s'},
        {id:'ct-squat',s:'3',r:'12',rs:'30s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
        {id:'ct-push',s:'3',r:'8',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Circuito B',type:'cardio',rest:false,exercises:[
        {id:'hi-kn',s:'3',r:'30s',rs:'30s'},
        {id:'ct-lunge',s:'3',r:'10',rs:'30s'},
        {id:'ct-hiit2',s:'3',r:'30s',rs:'30s'},
        {id:'ct-crunch',s:'3',r:'15',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Circuito C',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'3',r:'30s',rs:'30s'},
        {id:'ct-hiit1',s:'3',r:'8',rs:'30s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
        {id:'plank',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'hiit',name:'HIIT & Definizione',icon:'🔥',color:'var(--red)',
    t:'cardio',diff:'intermediate',dur:'30',
    goals:['fat_loss','endurance'],
    levels:['beginner','intermediate','advanced'],
    desc:'Brucia grassi, massimizza il VO₂ Max, resistenza esplosiva. Zero attrezzi.',
    days:[
      {name:'HIIT A',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'4',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'jump-j',s:'4',r:'40s',rs:'20s'},
        {id:'hi-kn',s:'4',r:'40s',rs:'20s'},
      ]},
      {name:'HIIT B',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'ct-hiit1',s:'4',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'3',r:'50s',rs:'10s'},
        {id:'plank',s:'3',r:'45s',rs:'30s'},
      ]},
    ]
  },
  {
    id:'hiit-advanced',name:'HIIT Avanzato + Forza',icon:'💥',color:'var(--red)',
    t:'cardio',diff:'advanced',dur:'40',
    goals:['fat_loss','endurance','strength'],
    levels:['advanced','athlete'],
    desc:'Tabata, circuiti esplosivi e superset ad alta intensità. Condizionamento atletico totale.',
    days:[
      {name:'Lunedì — Tabata Upper',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'8',r:'20s',rs:'10s'},
        {id:'push-up-w',s:'4',r:'15',rs:'30s'},
        {id:'pull-exp',s:'4',r:'6',rs:'60s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
      ]},
      {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mercoledì — Tabata Lower',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'8',r:'20s',rs:'10s'},
        {id:'pistol',s:'4',r:'6',rs:'60s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'hi-kn',s:'4',r:'40s',rs:'20s'},
      ]},
      {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Full HIIT',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'5',r:'40s',rs:'20s'},
        {id:'dips-w',s:'4',r:'10',rs:'60s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'60s'},
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     UPPER / LOWER SPLIT
  ════════════════════════════════════════════ */
  {
    id:'upper-lower',name:'Upper / Lower Split',icon:'⬆️',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'50',
    goals:['hypertrophy','strength'],
    levels:['intermediate','advanced'],
    desc:'Classico split Upper/Lower su 4 giorni. Alto volume per gruppo muscolare, recupero ottimale.',
    days:[
      {name:'Lunedì — Upper A',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'face-pull',s:'3',r:'15',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Martedì — Lower A',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'10',rs:'90s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'calf',s:'4',r:'20',rs:'45s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Upper B',type:'full',rest:false,exercises:[
        {id:'push-up-w',s:'4',r:'12',rs:'75s'},
        {id:'chin-up',s:'4',r:'8',rs:'90s'},
        {id:'lateral-r',s:'4',r:'15',rs:'60s'},
        {id:'row',s:'3',r:'12',rs:'75s'},
        {id:'tuck-p',s:'3',r:'25s',rs:'90s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
      ]},
      {name:'Venerdì — Lower B',type:'lower',rest:false,exercises:[
        {id:'pistol',s:'4',r:'6',rs:'90s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'glute-b',s:'4',r:'15',rs:'60s'},
        {id:'squat-j',s:'3',r:'12',rs:'60s'},
        {id:'dragon-f',s:'3',r:'5',rs:'60s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     CORE SPECIALIST
  ════════════════════════════════════════════ */
  {
    id:'core-base',name:'Core Strong — Base',icon:'🔵',color:'var(--teal)',
    t:'custom',diff:'beginner',dur:'25',
    goals:['mobility','hypertrophy'],
    levels:['beginner','intermediate'],
    desc:'Focus totale sul core. Hollow, plank, crunch e L-sit progressioni. Addominali funzionali, non solo estetici.',
    days:[
      {name:'Core A',type:'custom',rest:false,exercises:[
        {id:'plank',s:'4',r:'45s',rs:'30s'},
        {id:'ct-hollow',s:'4',r:'30s',rs:'30s'},
        {id:'ct-crunch',s:'3',r:'20',rs:'45s'},
        {id:'side-plank',s:'3',r:'30s',rs:'30s'},
        {id:'ct-vup',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Core B',type:'custom',rest:false,exercises:[
        {id:'hollow',s:'4',r:'40s',rs:'30s'},
        {id:'hang-kr',s:'4',r:'12',rs:'45s'},
        {id:'v-ups',s:'3',r:'15',rs:'45s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
        {id:'plank',s:'3',r:'50s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Core C — Skill',type:'skill',rest:false,exercises:[
        {id:'lsit',s:'5',r:'15s',rs:'60s'},
        {id:'hollow',s:'4',r:'40s',rs:'30s'},
        {id:'dragon-f',s:'3',r:'4',rs:'75s'},
        {id:'hang-kr',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'core-advanced',name:'Core Avanzato + Dragon Flag',icon:'🐉',color:'var(--purple)',
    t:'custom',diff:'advanced',dur:'35',
    goals:['strength','calisthenics'],
    levels:['advanced','athlete'],
    desc:'Dragon Flag, hollow progressioni pesanti, L-sit su parallele e hanging leg raise. Core da atleta.',
    days:[
      {name:'Core Heavy A',type:'skill',rest:false,exercises:[
        {id:'dragon-f',s:'5',r:'6',rs:'90s'},
        {id:'hollow',s:'5',r:'55s',rs:'45s'},
        {id:'lsit',s:'5',r:'40s',rs:'60s'},
        {id:'v-ups',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Core Heavy B',type:'skill',rest:false,exercises:[
        {id:'hang-kr',s:'5',r:'15',rs:'45s'},
        {id:'side-plank',s:'4',r:'50s',rs:'45s'},
        {id:'dragon-f',s:'4',r:'5',rs:'90s'},
        {id:'plank',s:'4',r:'75s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     MOBILITÀ & RECUPERO
  ════════════════════════════════════════════ */
  {
    id:'mob',name:'Mobilità & Recupero Attivo',icon:'🧘',color:'var(--teal)',
    t:'custom',diff:'beginner',dur:'30',
    goals:['mobility'],
    levels:['beginner','intermediate','advanced','athlete'],
    desc:'Sessioni di mobilità, stretching dinamico e recupero attivo. Ideale come complemento o nei giorni di riposo.',
    days:[
      {name:'Mobilità Full Body',type:'custom',rest:false,exercises:[
        {id:'plank',s:'3',r:'60s',rs:'30s'},
        {id:'hollow',s:'3',r:'30s',rs:'30s'},
        {id:'ct-wall',s:'3',r:'60s',rs:'30s'},
        {id:'glute-b',s:'3',r:'20',rs:'30s'},
      ]},
    ]
  },
  {
    id:'mob-advanced',name:'Mobilità Avanzata + Flessibilità',icon:'🌊',color:'var(--teal)',
    t:'custom',diff:'intermediate',dur:'40',
    goals:['mobility'],
    levels:['intermediate','advanced','athlete'],
    desc:'Routine di mobilità profonda per atleti. Lavoro sull\'apertura delle anche, spalle e colonna vertebrale.',
    days:[
      {name:'Mobilità A — Anche e Gambe',type:'custom',rest:false,exercises:[
        {id:'ct-wall',s:'4',r:'90s',rs:'30s'},
        {id:'glute-b',s:'3',r:'20',rs:'30s'},
        {id:'ct-lunge',s:'3',r:'12',rs:'30s'},
        {id:'plank',s:'3',r:'60s',rs:'30s'},
        {id:'side-plank',s:'3',r:'45s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mobilità B — Spalle e Core',type:'custom',rest:false,exercises:[
        {id:'ct-pike',s:'3',r:'60s',rs:'30s'},
        {id:'hshold',s:'4',r:'20s',rs:'60s'},
        {id:'hollow',s:'4',r:'40s',rs:'30s'},
        {id:'lsit',s:'3',r:'20s',rs:'60s'},
        {id:'hang-kr',s:'3',r:'10',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ════════════════════════════════════════════
     PROGRAMMI ATLETICI SPECIALI
  ════════════════════════════════════════════ */
  {
    id:'athlete-full',name:'Atleta — Forza + Esplosività',icon:'🏅',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'70',
    goals:['strength','endurance','hypertrophy'],
    levels:['advanced','athlete'],
    desc:'Programma da atleta completo: forza massimale, potenza esplosiva e condizionamento. 5 giorni strutturati.',
    days:[
      {name:'Lunedì — Forza Lower',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'5',r:'5',rs:'150s'},
        {id:'nordic',s:'4',r:'5',rs:'120s'},
        {id:'bss',s:'4',r:'6',rs:'120s'},
        {id:'squat-j',s:'4',r:'8',rs:'75s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Martedì — Forza Upper Push',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'5',r:'5',rs:'150s'},
        {id:'planche-pu',s:'4',r:'5',rs:'120s'},
        {id:'hspu',s:'4',r:'5',rs:'120s'},
        {id:'ohp',s:'3',r:'8',rs:'90s'},
        {id:'tuck-p',s:'3',r:'30s',rs:'90s'},
      ]},
      {name:'Mercoledì — Condizionamento',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'5',r:'40s',rs:'20s'},
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'hi-kn',s:'4',r:'40s',rs:'20s'},
      ]},
      {name:'Giovedì — Forza Upper Pull',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'5',r:'5',rs:'150s'},
        {id:'mu',s:'4',r:'4',rs:'180s'},
        {id:'pull-exp',s:'3',r:'5',rs:'120s'},
        {id:'lsit',s:'4',r:'40s',rs:'60s'},
        {id:'neg-mu',s:'3',r:'4',rs:'120s'},
      ]},
      {name:'Venerdì — Skill + Power',type:'skill',rest:false,exercises:[
        {id:'hshold',s:'5',r:'30s',rs:'90s'},
        {id:'tuck-p',s:'4',r:'30s',rs:'120s'},
        {id:'dragon-f',s:'4',r:'6',rs:'75s'},
        {id:'pistol-w',s:'3',r:'6',rs:'90s'},
        {id:'v-ups',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'lean-mass',name:'Massa Magra — Lean Bulk',icon:'🎯',color:'var(--green)',
    t:'full',diff:'intermediate',dur:'55',
    goals:['hypertrophy','strength'],
    levels:['intermediate','advanced'],
    desc:'Costruisci massa muscolare minimizzando il grasso. Volume moderato, alta frequenza per gruppo muscolare.',
    days:[
      {name:'Lunedì — Upper Ipertrofia A',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'10',rs:'75s'},
        {id:'pull-up-w',s:'4',r:'8',rs:'90s'},
        {id:'ohp',s:'4',r:'12',rs:'75s'},
        {id:'lateral-r',s:'3',r:'15',rs:'60s'},
        {id:'hammer-c',s:'3',r:'12',rs:'60s'},
      ]},
      {name:'Martedì — Lower Ipertrofia A',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'12',rs:'75s'},
        {id:'bss',s:'4',r:'12',rs:'75s'},
        {id:'glute-b',s:'4',r:'15',rs:'60s'},
        {id:'calf',s:'4',r:'20',rs:'45s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Upper Ipertrofia B',type:'full',rest:false,exercises:[
        {id:'archer-pu',s:'4',r:'8',rs:'90s'},
        {id:'chin-up',s:'4',r:'10',rs:'90s'},
        {id:'push-up-w',s:'3',r:'15',rs:'75s'},
        {id:'face-pull',s:'3',r:'15',rs:'60s'},
        {id:'lsit',s:'3',r:'30s',rs:'60s'},
      ]},
      {name:'Venerdì — Lower Ipertrofia B',type:'lower',rest:false,exercises:[
        {id:'pistol',s:'4',r:'8',rs:'90s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'squat-j',s:'3',r:'12',rs:'60s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
      ]},
      {name:'Sabato — Cardio leggero',type:'cardio',rest:false,exercises:[
        {id:'jump-j',s:'3',r:'60s',rs:'30s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
        {id:'ct-hiit1',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
];
// Alias for compatibility with older patches
var WORKOUT_PRESETS = PRESETS_DATA;


// ── GOAL → PRESET MAPPING ─────────────────

/* ═══════════════════════════════════════════════
   PRESET PALESTRA — aggiuntivi (richiede EX_DB gym)
   Gli esercizi con attrezzi usano le descrizioni
   già presenti nel DB; per macchinari viene usato
   un id "gym-*" che il coach tratta come custom.
═══════════════════════════════════════════════ */
(function addGymAndHybridPresets(){

/* ── Aggiungi esercizi palestra all'EX_DB ── */
const GYM_EX = [
  {id:'bp',name:'Panca Piana',m:'push',tags:['petto','tricipiti','fondamentale'],icon:'🏋️',fundamental:true},
  {id:'ip',name:'Panca Inclinata',m:'push',tags:['petto alto','spalle'],icon:'🏋️'},
  {id:'dp',name:'Panca Declinata',m:'push',tags:['petto basso'],icon:'🏋️'},
  {id:'fly',name:'Croci con manubri',m:'push',tags:['petto'],icon:'🏋️'},
  {id:'cfly',name:'Cable Crossover',m:'push',tags:['petto'],icon:'🏋️'},
  {id:'pec-deck',name:'Pec Deck',m:'push',tags:['petto'],icon:'🏋️'},
  {id:'mil-press',name:'Military Press bilanciere',m:'push',tags:['spalle','fondamentale'],icon:'🏋️',fundamental:true},
  {id:'db-ohp',name:'Shoulder Press manubri',m:'push',tags:['spalle'],icon:'🏋️'},
  {id:'lat-mach',name:'Lateral Raise macchina',m:'push',tags:['spalle'],icon:'🏋️'},
  {id:'tri-rope',name:'Tricipiti corda cavi',m:'push',tags:['tricipiti'],icon:'🏋️'},
  {id:'skull',name:'Skull Crusher',m:'push',tags:['tricipiti'],icon:'🏋️'},
  {id:'tri-dip-mach',name:'Dip Machine',m:'push',tags:['petto','tricipiti'],icon:'🏋️'},
  {id:'lat-pull',name:'Lat Machine',m:'pull',tags:['dorsali'],icon:'🏋️',fundamental:true},
  {id:'seated-row',name:'Rematore seduto ai cavi',m:'pull',tags:['dorsali','trapezi'],icon:'🏋️'},
  {id:'t-row',name:'T-Bar Row',m:'pull',tags:['dorsali'],icon:'🏋️'},
  {id:'cable-row',name:'Cable Row basso',m:'pull',tags:['dorsali'],icon:'🏋️'},
  {id:'rev-fly',name:'Rear Delt Fly manubri',m:'pull',tags:['spalle posteriori'],icon:'🏋️'},
  {id:'face-pull-c',name:'Face Pull cavo',m:'pull',tags:['spalle','rotatori'],icon:'🏋️'},
  {id:'bic-bar',name:'Curl bilanciere',m:'pull',tags:['bicipiti'],icon:'🏋️'},
  {id:'bic-db',name:'Curl manubri',m:'pull',tags:['bicipiti'],icon:'🏋️'},
  {id:'bic-cab',name:'Curl cavi',m:'pull',tags:['bicipiti'],icon:'🏋️'},
  {id:'dl',name:'Stacco convenzionale',m:'pull',tags:['schiena','glutei','fondamentale'],icon:'🏋️',fundamental:true},
  {id:'rdl',name:'Romanian Deadlift',m:'pull',tags:['femorali','glutei'],icon:'🏋️'},
  {id:'bs',name:'Back Squat',m:'lower',tags:['quadricipiti','glutei','fondamentale'],icon:'🏋️',fundamental:true},
  {id:'fs',name:'Front Squat',m:'lower',tags:['quadricipiti'],icon:'🏋️'},
  {id:'hack-sq',name:'Hack Squat macchina',m:'lower',tags:['quadricipiti'],icon:'🏋️'},
  {id:'leg-press',name:'Leg Press',m:'lower',tags:['quadricipiti','glutei'],icon:'🏋️'},
  {id:'leg-ext',name:'Leg Extension',m:'lower',tags:['quadricipiti'],icon:'🏋️'},
  {id:'leg-curl',name:'Leg Curl sdraiato',m:'lower',tags:['femorali'],icon:'🏋️'},
  {id:'hip-thr',name:'Hip Thrust bilanciere',m:'lower',tags:['glutei'],icon:'🏋️'},
  {id:'abductor',name:'Abductor macchina',m:'lower',tags:['glutei','abduttori'],icon:'🏋️'},
  {id:'calf-mach',name:'Calf Raise macchina',m:'lower',tags:['polpacci'],icon:'🏋️'},
  {id:'ab-crunch',name:'Cable Crunch',m:'core',tags:['addominali'],icon:'🏋️'},
  {id:'ab-roll',name:'Ab Wheel Rollout',m:'core',tags:['addominali'],icon:'🏋️'},
  // ── MACCHINARI AGGIUNTIVI V6 ──────────────────────────────
  // PETTO — macchine
  {id:'mac-chest-press',name:'Chest Press (macchinario)',m:'push',tags:['petto','tricipiti'],icon:'🔴',machine:true,equipment:['chest_press']},
  {id:'mac-incl-chest-press',name:'Panca Inclinata (macchinario)',m:'push',tags:['petto alto'],icon:'🔴',machine:true,equipment:['chest_press']},
  {id:'mac-decl-chest-press',name:'Panca Declinata (macchinario)',m:'push',tags:['petto basso'],icon:'🔴',machine:true,equipment:['chest_press']},
  {id:'mac-pec-deck',name:'Pec Deck / Butterfly',m:'push',tags:['petto'],icon:'🔴',machine:true,equipment:['pec_deck']},
  {id:'mac-cable-fly-mid',name:'Cable Crossover medio',m:'push',tags:['petto'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-cable-fly-low',name:'Cable Fly dal basso',m:'push',tags:['petto alto'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-cable-fly-high',name:'Cable Fly dall\'alto',m:'push',tags:['petto basso'],icon:'🔴',machine:true,equipment:['cavi']},
  // SPALLE — macchine
  {id:'mac-shoulder-press',name:'Shoulder Press (macchinario)',m:'push',tags:['spalle'],icon:'🔴',machine:true,equipment:['shoulder_press']},
  {id:'mac-lateral-raise-mach',name:'Lateral Raise (macchinario)',m:'push',tags:['spalle laterale'],icon:'🔴',machine:true,equipment:['lateral_raise_machine']},
  {id:'mac-cable-lateral',name:'Cable Lateral Raise',m:'push',tags:['spalle laterale'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-cable-front-raise',name:'Cable Front Raise',m:'push',tags:['spalle anteriore'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-cable-rearfly',name:'Cable Rear Delt Fly',m:'pull',tags:['spalle posteriore'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-cable-facepull',name:'Cable Face Pull',m:'pull',tags:['spalle posteriore','trapezi'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-pec-deck-rear',name:'Pec Deck inverso (posteriore)',m:'pull',tags:['spalle posteriore'],icon:'🟢',machine:true,equipment:['pec_deck']},
  {id:'mac-shrug-mach',name:'Shoulder Shrug (macchinario)',m:'pull',tags:['trapezi'],icon:'🟢',machine:true,equipment:['shoulder_press']},
  // TRICIPITI — cavi/macchinari
  {id:'mac-tri-pushdown',name:'Tricep Pushdown al cavo (barra)',m:'push',tags:['tricipiti'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-tri-rope',name:'Tricep Pushdown corda',m:'push',tags:['tricipiti'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-tri-overhead',name:'Overhead Tricep Extension cavo',m:'push',tags:['tricipiti'],icon:'🔴',machine:true,equipment:['cavi']},
  {id:'mac-tri-mach',name:'Tricep Machine',m:'push',tags:['tricipiti'],icon:'🔴',machine:true,equipment:['tricep_machine']},
  {id:'mac-tri-kickback',name:'Tricep Kickback al cavo',m:'push',tags:['tricipiti'],icon:'🔴',machine:true,equipment:['cavi']},
  // BICIPITI — cavi/macchinari
  {id:'mac-bic-cable',name:'Curl al cavo basso',m:'pull',tags:['bicipiti'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-bic-hammer-cable',name:'Hammer Curl al cavo',m:'pull',tags:['bicipiti','brachiale'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-bic-mach',name:'Curl Macchina',m:'pull',tags:['bicipiti'],icon:'🟢',machine:true,equipment:['bicep_machine']},
  {id:'mac-bic-preacher',name:'Curl Larry Scott (macchinario)',m:'pull',tags:['bicipiti'],icon:'🟢',machine:true,equipment:['preacher_curl']},
  {id:'mac-bic-concentration',name:'Concentration Curl cavo',m:'pull',tags:['bicipiti'],icon:'🟢',machine:true,equipment:['cavi']},
  // DORSALI — lat machine / cavi / rematori
  {id:'mac-lat-pull-wide',name:'Lat Machine presa larga',m:'pull',tags:['dorsali'],icon:'🟢',machine:true,equipment:['lat_machine']},
  {id:'mac-lat-pull-narrow',name:'Lat Machine presa stretta',m:'pull',tags:['dorsali','bicipiti'],icon:'🟢',machine:true,equipment:['lat_machine']},
  {id:'mac-lat-pull-rev',name:'Lat Machine presa inversa',m:'pull',tags:['dorsali','bicipiti'],icon:'🟢',machine:true,equipment:['lat_machine']},
  {id:'mac-seated-row-wide',name:'Rematore cavo presa larga',m:'pull',tags:['dorsali','trapezi'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-seated-row-narrow',name:'Rematore cavo presa stretta',m:'pull',tags:['dorsali'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-high-row',name:'High Row (macchinario)',m:'pull',tags:['dorsali','lats'],icon:'🟢',machine:true,equipment:['high_row']},
  {id:'mac-low-row',name:'Low Row (macchinario)',m:'pull',tags:['dorsali'],icon:'🟢',machine:true,equipment:['rowing_machine']},
  {id:'mac-chest-supported-row',name:'Rematore petto supportato',m:'pull',tags:['dorsali'],icon:'🟢',machine:true,equipment:['rowing_machine']},
  {id:'mac-pullover-mach',name:'Pullover (macchinario)',m:'pull',tags:['dorsali','petto'],icon:'🟢',machine:true,equipment:['pullover_machine']},
  {id:'mac-cable-pulldown-str',name:'Straight Arm Pulldown cavo',m:'pull',tags:['dorsali'],icon:'🟢',machine:true,equipment:['cavi']},
  // GAMBE — macchinari
  {id:'mac-leg-press-45',name:'Leg Press 45°',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',machine:true,equipment:['leg_press']},
  {id:'mac-leg-press-horiz',name:'Leg Press orizzontale',m:'lower',tags:['quadricipiti'],icon:'🟡',machine:true,equipment:['leg_press']},
  {id:'mac-leg-ext',name:'Leg Extension',m:'lower',tags:['quadricipiti'],icon:'🟡',machine:true,equipment:['leg_extension']},
  {id:'mac-leg-curl-lying',name:'Leg Curl sdraiato',m:'lower',tags:['femorali'],icon:'🟡',machine:true,equipment:['leg_curl']},
  {id:'mac-leg-curl-seated',name:'Leg Curl seduto',m:'lower',tags:['femorali'],icon:'🟡',machine:true,equipment:['leg_curl']},
  {id:'mac-hack-squat',name:'Hack Squat (macchinario)',m:'lower',tags:['quadricipiti'],icon:'🟡',machine:true,equipment:['hack_squat']},
  {id:'mac-smith-squat',name:'Squat al multipower',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',machine:true,equipment:['smith_machine']},
  {id:'mac-smith-lunge',name:'Affondi al multipower',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',machine:true,equipment:['smith_machine']},
  {id:'mac-hip-thrust-mach',name:'Hip Thrust (macchinario)',m:'lower',tags:['glutei'],icon:'🟡',machine:true,equipment:['hip_thrust']},
  {id:'mac-abductor',name:'Abduttori (macchinario)',m:'lower',tags:['glutei laterali'],icon:'🟡',machine:true,equipment:['abductor_machine']},
  {id:'mac-adductor',name:'Adduttori (macchinario)',m:'lower',tags:['interno coscia'],icon:'🟡',machine:true,equipment:['adductor_machine']},
  {id:'mac-calf-press',name:'Calf Press al leg press',m:'lower',tags:['polpacci'],icon:'🟡',machine:true,equipment:['leg_press']},
  {id:'mac-calf-seated',name:'Calf Raise seduto (macchinario)',m:'lower',tags:['soleo','polpacci'],icon:'🟡',machine:true,equipment:['calf_seated']},
  {id:'mac-glute-kickback',name:'Glute Kickback (macchinario)',m:'lower',tags:['glutei'],icon:'🟡',machine:true,equipment:['cable_kickback']},
  {id:'mac-back-ext-mach',name:'Back Extension (macchinario)',m:'pull',tags:['lombari','glutei'],icon:'🟢',machine:true,equipment:['back_extension']},
  {id:'mac-rdl-cable',name:'Romanian Deadlift al cavo',m:'pull',tags:['femorali','glutei'],icon:'🟢',machine:true,equipment:['cavi']},
  {id:'mac-cable-pullthrough',name:'Cable Pull-Through',m:'lower',tags:['glutei','femorali'],icon:'🟡',machine:true,equipment:['cavi']},
  // CORE — macchinari
  {id:'mac-ab-crunch-mach',name:'Crunch (macchinario)',m:'core',tags:['addominali'],icon:'🔵',machine:true,equipment:['ab_machine']},
  {id:'mac-cable-crunch-kn',name:'Cable Crunch in ginocchio',m:'core',tags:['addominali'],icon:'🔵',machine:true,equipment:['cavi']},
  {id:'mac-rotary-torso',name:'Rotary Torso (macchinario)',m:'core',tags:['obliqui'],icon:'🔵',machine:true,equipment:['rotary_torso']},
  {id:'mac-cable-woodchop',name:'Cable Woodchop',m:'core',tags:['obliqui','core'],icon:'🔵',machine:true,equipment:['cavi']},
  {id:'mac-cable-pallof',name:'Pallof Press al cavo',m:'core',tags:['core','obliqui'],icon:'🔵',machine:true,equipment:['cavi']},
  {id:'mac-cable-sidebend',name:'Side Bend al cavo',m:'core',tags:['obliqui'],icon:'🔵',machine:true,equipment:['cavi']},
  // CARDIO macchine
  {id:'mac-treadmill',name:'Tapis Roulant',m:'cardio',tags:['cardio','gambe'],icon:'🔷',machine:true,equipment:['treadmill']},
  {id:'mac-ellittica',name:'Ellittica',m:'cardio',tags:['cardio','full body'],icon:'🔷',machine:true,equipment:['elliptical']},
  {id:'mac-bike',name:'Cyclette / Spin Bike',m:'cardio',tags:['cardio','gambe'],icon:'🔷',machine:true,equipment:['bike']},
  {id:'mac-rowing-erg',name:'Vogatore (ergometro)',m:'cardio',tags:['cardio','schiena','gambe'],icon:'🔷',machine:true,equipment:['rowing_erg']},
  {id:'mac-stairmaster',name:'Stairmaster',m:'cardio',tags:['cardio','glutei'],icon:'🔷',machine:true,equipment:['stairmaster']},
  {id:'mac-ski-erg',name:'Ski Erg',m:'cardio',tags:['cardio','dorsali','core'],icon:'🔷',machine:true,equipment:['ski_erg']},
];
GYM_EX.forEach(ex => {
  if(!EX_DB.find(e=>e.id===ex.id)) EX_DB.push(ex);
});

/* ── V6: macchinari expanded ── */
const GYM_MACHINE_EX_V6 = GYM_EX.filter(e=>e.machine);
GYM_MACHINE_EX_V6.forEach(ex => {
  if(!EX_DB.find(e=>e.id===ex.id)) EX_DB.push(ex);
});

/* ── V6: helper — l'utente usa solo palestra con macchinari? ── */
function userPrefersGymMachines() {
  try {
    const p = window.profile || {};
    const env = p.multi?.env || p.env || '';
    const eqs = p.multi?.eqs || p.equipment || [];
    const isGymOnly = env === 'gym' && !eqs.includes('eq_corpo_libero') && !eqs.includes('eq_sbarra');
    // considera "solo macchine" se ha selezionato palestra completa oppure ha macchinari ma non sbarra/corpo libero
    const hasMachines = eqs.some(e=>['eq_chest_press','eq_lat_machine','eq_leg_press','eq_hack_squat','eq_leg_curl','eq_leg_ext','eq_shoulder_press'].includes(e));
    // Se ha solo spuntato "palestra" senza scegliere attrezzature libere → machine-first
    return env === 'gym' && (hasMachines || eqs.length === 0);
  } catch(e) { return false; }
}
window.userPrefersGymMachines = userPrefersGymMachines;

/* ── Preset PALESTRA ── */
const gymPresets = [
  {
    id:'gym-beginner',name:'Palestra — Primo Programma',icon:'🟢',color:'var(--green)',
    t:'full',diff:'beginner',dur:'45',env:'gym',
    goals:['hypertrophy','strength'],levels:['beginner'],
    desc:'Full body su macchine. Impara i movimenti fondamentali in sicurezza prima di passare ai pesi liberi.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'leg-press',s:'3',r:'12',rs:'75s'},
        {id:'leg-curl',s:'3',r:'12',rs:'60s'},
        {id:'lat-pull',s:'3',r:'12',rs:'75s'},
        {id:'tri-dip-mach',s:'3',r:'12',rs:'75s'},
        {id:'db-ohp',s:'3',r:'12',rs:'75s'},
        {id:'calf-mach',s:'3',r:'15',rs:'45s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'hack-sq',s:'3',r:'12',rs:'75s'},
        {id:'rdl',s:'3',r:'12',rs:'75s'},
        {id:'seated-row',s:'3',r:'12',rs:'75s'},
        {id:'pec-deck',s:'3',r:'12',rs:'75s'},
        {id:'lat-mach',s:'3',r:'15',rs:'60s'},
        {id:'bic-db',s:'3',r:'12',rs:'60s'},
        {id:'tri-rope',s:'3',r:'12',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body C',type:'full',rest:false,exercises:[
        {id:'leg-press',s:'3',r:'15',rs:'75s'},
        {id:'leg-ext',s:'3',r:'15',rs:'60s'},
        {id:'lat-pull',s:'3',r:'12',rs:'75s'},
        {id:'fly',s:'3',r:'15',rs:'75s'},
        {id:'db-ohp',s:'3',r:'12',rs:'75s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-fbw',name:'Palestra — Full Body Intermedio',icon:'⚡',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'55',env:'gym',
    goals:['hypertrophy','strength'],levels:['intermediate'],
    desc:'3 sessioni full body con pesi liberi. Squat, panca, rematore: i fondamentali che costruiscono davvero.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'120s'},
        {id:'bp',s:'4',r:'8',rs:'120s'},
        {id:'seated-row',s:'4',r:'10',rs:'90s'},
        {id:'db-ohp',s:'3',r:'10',rs:'90s'},
        {id:'bic-bar',s:'3',r:'12',rs:'60s'},
        {id:'tri-rope',s:'3',r:'12',rs:'60s'},
        {id:'calf-mach',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'150s'},
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'3',r:'15',rs:'60s'},
        {id:'bic-db',s:'3',r:'12',rs:'60s'},
        {id:'skull',s:'3',r:'12',rs:'60s'},
        {id:'ab-roll',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body C',type:'full',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'10',rs:'90s'},
        {id:'fly',s:'4',r:'12',rs:'75s'},
        {id:'t-row',s:'4',r:'10',rs:'90s'},
        {id:'mil-press',s:'3',r:'10',rs:'90s'},
        {id:'bic-cab',s:'3',r:'15',rs:'60s'},
        {id:'tri-dip-mach',s:'3',r:'12',rs:'60s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-ppl',name:'Palestra — Push Pull Legs',icon:'💪',color:'var(--purple)',
    t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['hypertrophy','strength'],levels:['intermediate','advanced'],
    desc:'Il PPL classico da palestra su pesi liberi e cavi. Il programma più usato al mondo per la massa.',
    days:[
      {name:'Push',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'8',rs:'120s'},
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'fly',s:'3',r:'12',rs:'75s'},
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
        {id:'skull',s:'3',r:'12',rs:'60s'},
      ]},
      {name:'Pull',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'150s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'t-row',s:'3',r:'10',rs:'90s'},
        {id:'face-pull-c',s:'4',r:'15',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'bic-db',s:'3',r:'12',rs:'60s'},
      ]},
      {name:'Legs',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'leg-press',s:'4',r:'12',rs:'90s'},
        {id:'rdl',s:'4',r:'10',rs:'90s'},
        {id:'leg-curl',s:'3',r:'12',rs:'75s'},
        {id:'leg-ext',s:'3',r:'15',rs:'60s'},
        {id:'hip-thr',s:'3',r:'12',rs:'75s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-upper-lower',name:'Palestra — Upper/Lower 4×',icon:'⬆️',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'65',env:'gym',
    goals:['hypertrophy','strength'],levels:['intermediate','advanced'],
    desc:'4 giorni Upper/Lower: forza nei giorni A, ipertrofia nei giorni B. Il massimo della periodizzazione.',
    days:[
      {name:'Upper A — Forza',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'5',rs:'180s'},
        {id:'lat-pull',s:'4',r:'6',rs:'150s'},
        {id:'mil-press',s:'3',r:'6',rs:'150s'},
        {id:'seated-row',s:'3',r:'8',rs:'120s'},
        {id:'bic-bar',s:'3',r:'10',rs:'75s'},
        {id:'tri-rope',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Lower A — Forza',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'5',rs:'180s'},
        {id:'rdl',s:'4',r:'6',rs:'150s'},
        {id:'leg-press',s:'3',r:'8',rs:'120s'},
        {id:'leg-curl',s:'3',r:'10',rs:'90s'},
        {id:'calf-mach',s:'4',r:'12',rs:'60s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Upper B — Ipertrofia',type:'full',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'t-row',s:'4',r:'12',rs:'90s'},
        {id:'fly',s:'3',r:'15',rs:'75s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-db',s:'4',r:'12',rs:'60s'},
        {id:'skull',s:'4',r:'12',rs:'60s'},
      ]},
      {name:'Lower B — Ipertrofia',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'12',rs:'90s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'rdl',s:'3',r:'12',rs:'90s'},
        {id:'leg-curl',s:'4',r:'15',rs:'75s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'abductor',s:'3',r:'20',rs:'60s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-ppl-6day',name:'Palestra — PPL × 6 Giorni',icon:'🔥',color:'var(--red)',
    t:'full',diff:'advanced',dur:'65',env:'gym',
    goals:['hypertrophy'],levels:['advanced','athlete'],
    desc:'Push Pull Legs doppio nella settimana. Volume massimo per chi ha già 2+ anni di palestra costante.',
    days:[
      {name:'Push A — Petto focus',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'6',rs:'150s'},
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'fly',s:'4',r:'12',rs:'75s'},
        {id:'pec-deck',s:'3',r:'15',rs:'60s'},
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Pull A — Schiena focus',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'180s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'10',rs:'90s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'bic-cab',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Legs A — Quad focus',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'6',rs:'180s'},
        {id:'leg-press',s:'4',r:'12',rs:'90s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'rdl',s:'4',r:'10',rs:'90s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Push B — Spalle focus',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'5',r:'8',rs:'120s'},
        {id:'lat-mach',s:'5',r:'15',rs:'60s'},
        {id:'ip',s:'4',r:'12',rs:'90s'},
        {id:'cfly',s:'4',r:'15',rs:'75s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Pull B — Bicipiti focus',type:'pull',rest:false,exercises:[
        {id:'t-row',s:'4',r:'10',rs:'90s'},
        {id:'lat-pull',s:'4',r:'12',rs:'90s'},
        {id:'cable-row',s:'4',r:'12',rs:'75s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bic-db',s:'5',r:'12',rs:'60s'},
      ]},
      {name:'Legs B — Glute/Ham focus',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'10',rs:'90s'},
        {id:'hip-thr',s:'5',r:'12',rs:'90s'},
        {id:'rdl',s:'4',r:'10',rs:'90s'},
        {id:'leg-curl',s:'5',r:'12',rs:'75s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-strength',name:'Palestra — Forza Massimale',icon:'🏋️',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'70',env:'gym',
    goals:['strength'],levels:['advanced','athlete'],
    desc:'Periodizzazione lineare su squat, panca e stacco. Serie pesanti, basse reps, riposi completi.',
    days:[
      {name:'Lunedì — Squat',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'240s'},
        {id:'fs',s:'3',r:'3',rs:'180s'},
        {id:'leg-press',s:'3',r:'8',rs:'120s'},
        {id:'rdl',s:'3',r:'8',rs:'120s'},
        {id:'leg-curl',s:'3',r:'10',rs:'90s'},
        {id:'ab-roll',s:'3',r:'8',rs:'75s'},
      ]},
      {name:'Mercoledì — Panca',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'5',rs:'240s'},
        {id:'ip',s:'4',r:'6',rs:'180s'},
        {id:'mil-press',s:'3',r:'6',rs:'180s'},
        {id:'lat-pull',s:'4',r:'8',rs:'120s'},
        {id:'seated-row',s:'4',r:'8',rs:'120s'},
        {id:'skull',s:'3',r:'10',rs:'90s'},
      ]},
      {name:'Venerdì — Stacco',type:'pull',rest:false,exercises:[
        {id:'dl',s:'5',r:'3',rs:'300s'},
        {id:'t-row',s:'4',r:'6',rs:'180s'},
        {id:'lat-pull',s:'4',r:'8',rs:'120s'},
        {id:'rdl',s:'4',r:'6',rs:'180s'},
        {id:'face-pull-c',s:'3',r:'15',rs:'60s'},
        {id:'bic-bar',s:'4',r:'8',rs:'90s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-hypertrophy',name:'Palestra — Ipertrofia Pura',icon:'🔴',color:'var(--red)',
    t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['hypertrophy'],levels:['intermediate','advanced'],
    desc:'Split per massimizzare la crescita muscolare. Alto volume, TUT ottimale, tecniche avanzate.',
    days:[
      {name:'Lunedì — Petto + Tricipiti',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'10',rs:'90s'},
        {id:'ip',s:'4',r:'12',rs:'75s'},
        {id:'fly',s:'4',r:'15',rs:'60s'},
        {id:'pec-deck',s:'3',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
        {id:'tri-dip-mach',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Martedì — Schiena + Bicipiti',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'5',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'t-row',s:'4',r:'10',rs:'90s'},
        {id:'cable-row',s:'3',r:'15',rs:'60s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bic-bar',s:'4',r:'12',rs:'75s'},
        {id:'bic-db',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Mercoledì — Gambe',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'10',rs:'120s'},
        {id:'leg-press',s:'4',r:'15',rs:'90s'},
        {id:'rdl',s:'4',r:'12',rs:'90s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'leg-curl',s:'4',r:'15',rs:'75s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Spalle + Braccia',type:'push',rest:false,exercises:[
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'db-ohp',s:'4',r:'12',rs:'90s'},
        {id:'lat-mach',s:'5',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'bic-cab',s:'4',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-powerbuilding',name:'Palestra — Powerbuilding',icon:'⚡',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'75',env:'gym',
    goals:['strength','hypertrophy'],levels:['advanced','athlete'],
    desc:'Il meglio di forza e ipertrofia. Serie pesanti (3-6 reps) seguite da lavoro di accumulo (8-15 reps).',
    days:[
      {name:'Lunedì — Panca + Spalle',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'4',rs:'240s'},
        {id:'bp',s:'3',r:'10',rs:'90s'},
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'mil-press',s:'4',r:'8',rs:'120s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
        {id:'skull',s:'3',r:'12',rs:'75s'},
      ]},
      {name:'Martedì — Stacco + Schiena',type:'pull',rest:false,exercises:[
        {id:'dl',s:'5',r:'3',rs:'300s'},
        {id:'dl',s:'2',r:'8',rs:'120s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Squat + Gambe',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'4',rs:'240s'},
        {id:'bs',s:'3',r:'10',rs:'120s'},
        {id:'rdl',s:'4',r:'8',rs:'120s'},
        {id:'leg-press',s:'3',r:'15',rs:'90s'},
        {id:'leg-curl',s:'4',r:'12',rs:'75s'},
        {id:'hip-thr',s:'4',r:'12',rs:'90s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Venerdì — Upper Accessori',type:'full',rest:false,exercises:[
        {id:'ip',s:'4',r:'12',rs:'90s'},
        {id:'t-row',s:'4',r:'12',rs:'90s'},
        {id:'fly',s:'4',r:'15',rs:'75s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bic-db',s:'4',r:'15',rs:'60s'},
        {id:'tri-dip-mach',s:'4',r:'15',rs:'60s'},
        {id:'ab-roll',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'gym-arnold',name:'Arnold Split',icon:'🏅',color:'var(--purple)',
    t:'full',diff:'advanced',dur:'70',env:'gym',
    goals:['hypertrophy'],levels:['advanced','athlete'],
    desc:'Il classico split di Arnold: Petto+Schiena, Spalle+Braccia, Gambe. Volume alto, alta frequenza.',
    days:[
      {name:'Petto + Schiena A',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'10',rs:'90s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'ip',s:'4',r:'12',rs:'75s'},
        {id:'seated-row',s:'4',r:'12',rs:'75s'},
        {id:'fly',s:'3',r:'15',rs:'60s'},
        {id:'cable-row',s:'3',r:'15',rs:'60s'},
        {id:'pec-deck',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Spalle + Braccia A',type:'push',rest:false,exercises:[
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'5',r:'15',rs:'60s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'bic-db',s:'4',r:'12',rs:'60s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Gambe A',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'10',rs:'120s'},
        {id:'leg-press',s:'4',r:'15',rs:'90s'},
        {id:'rdl',s:'4',r:'12',rs:'90s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'leg-curl',s:'4',r:'15',rs:'75s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Petto + Schiena B',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'t-row',s:'4',r:'10',rs:'90s'},
        {id:'bp',s:'4',r:'12',rs:'90s'},
        {id:'lat-pull',s:'4',r:'12',rs:'90s'},
        {id:'cfly',s:'3',r:'15',rs:'60s'},
        {id:'rev-fly',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Spalle + Braccia B',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'12',rs:'90s'},
        {id:'lat-mach',s:'5',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'bic-cab',s:'4',r:'15',rs:'60s'},
        {id:'bic-db',s:'3',r:'15',rs:'60s'},
        {id:'tri-dip-mach',s:'4',r:'15',rs:'75s'},
        {id:'skull',s:'3',r:'12',rs:'75s'},
      ]},
      {name:'Gambe B',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'12',rs:'90s'},
        {id:'rdl',s:'4',r:'12',rs:'90s'},
        {id:'leg-curl',s:'5',r:'15',rs:'75s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
        {id:'hip-thr',s:'4',r:'15',rs:'90s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── PRESET IBRIDO (calisthenics + palestra) ── */
  {
    id:'hybrid-starter',name:'Ibrido — Starter',icon:'🌿',color:'var(--green)',
    t:'full',diff:'beginner',dur:'40',env:'hybrid',
    goals:['hypertrophy','strength'],levels:['beginner'],
    desc:'Corpo libero + macchine base. Impari i movimenti fondamentali sia alla sbarra che ai macchinari.',
    days:[
      {name:'Lunedì — Push ibrido',type:'push',rest:false,exercises:[
        {id:'push-up',s:'3',r:'10',rs:'60s'},
        {id:'leg-press',s:'3',r:'12',rs:'75s'},
        {id:'db-ohp',s:'3',r:'12',rs:'75s'},
        {id:'lat-mach',s:'3',r:'15',rs:'60s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mercoledì — Pull ibrido',type:'pull',rest:false,exercises:[
        {id:'row',s:'3',r:'12',rs:'60s'},
        {id:'lat-pull',s:'3',r:'12',rs:'75s'},
        {id:'chin-up',s:'3',r:'5',rs:'90s'},
        {id:'bic-db',s:'3',r:'12',rs:'60s'},
        {id:'hollow',s:'3',r:'30s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Gambe ibrido',type:'lower',rest:false,exercises:[
        {id:'bs',s:'3',r:'8',rs:'120s'},
        {id:'leg-press',s:'3',r:'12',rs:'90s'},
        {id:'rdl',s:'3',r:'10',rs:'90s'},
        {id:'ct-lunge',s:'3',r:'12',rs:'60s'},
        {id:'calf-mach',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'hybrid-ppl',name:'Ibrido — PPL Corpo Libero + Pesi',icon:'🔀',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'55',env:'hybrid',
    goals:['hypertrophy','calisthenics','strength'],levels:['intermediate'],
    desc:'Sbarra e parallele per pull e push, pesi liberi per le gambe. Il meglio di entrambi i mondi.',
    days:[
      {name:'Push — Dips + Panca',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'bp',s:'3',r:'10',rs:'120s'},
        {id:'archer-pu',s:'3',r:'6',rs:'90s'},
        {id:'mil-press',s:'3',r:'10',rs:'90s'},
        {id:'lat-mach',s:'3',r:'15',rs:'60s'},
        {id:'tri-rope',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Pull — Sbarra + Cavi',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'chin-up',s:'3',r:'8',rs:'90s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-bar',s:'3',r:'10',rs:'75s'},
        {id:'lsit',s:'3',r:'25s',rs:'60s'},
      ]},
      {name:'Legs — Pesi liberi',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'bss',s:'3',r:'10',rs:'90s'},
        {id:'leg-curl',s:'3',r:'12',rs:'75s'},
        {id:'pistol',s:'3',r:'5',rs:'90s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'hybrid-strength',name:'Ibrido — Forza Totale',icon:'⚔️',color:'var(--orange)',
    t:'full',diff:'advanced',dur:'70',env:'hybrid',
    goals:['strength','calisthenics'],levels:['advanced','athlete'],
    desc:'Squat, stacco e panca pesanti. Poi sbarra, dips e skill per la forza funzionale. L\'ibrido definitivo.',
    days:[
      {name:'Lunedì — Lower Pesante',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'240s'},
        {id:'rdl',s:'4',r:'6',rs:'180s'},
        {id:'pistol-w',s:'3',r:'6',rs:'120s'},
        {id:'nordic',s:'3',r:'6',rs:'120s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Martedì — Upper Push',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'5',rs:'240s'},
        {id:'dips-w',s:'4',r:'8',rs:'120s'},
        {id:'tuck-p',s:'4',r:'30s',rs:'90s'},
        {id:'mil-press',s:'3',r:'8',rs:'120s'},
        {id:'planche-pu',s:'3',r:'5',rs:'120s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Stacco + Pull',type:'pull',rest:false,exercises:[
        {id:'dl',s:'5',r:'3',rs:'300s'},
        {id:'pull-up-w',s:'5',r:'5',rs:'150s'},
        {id:'mu',s:'3',r:'4',rs:'180s'},
        {id:'seated-row',s:'4',r:'8',rs:'120s'},
        {id:'lsit',s:'4',r:'40s',rs:'60s'},
      ]},
      {name:'Venerdì — Skill + Accessori',type:'skill',rest:false,exercises:[
        {id:'hshold',s:'5',r:'30s',rs:'90s'},
        {id:'hspu',s:'4',r:'5',rs:'120s'},
        {id:'dragon-f',s:'4',r:'6',rs:'75s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'hybrid-athlete',name:'Ibrido — Programma Atleta',icon:'🏅',color:'var(--acc)',
    t:'full',diff:'advanced',dur:'75',env:'hybrid',
    goals:['strength','hypertrophy','calisthenics','endurance'],levels:['advanced','athlete'],
    desc:'6 giorni. Forza con bilanciere, skill calisteniche, condizionamento atletico. Per chi vuole tutto.',
    days:[
      {name:'Lunedì — Squat + Lower',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'240s'},
        {id:'bs',s:'2',r:'10',rs:'120s'},
        {id:'pistol-w',s:'4',r:'6',rs:'120s'},
        {id:'nordic',s:'4',r:'6',rs:'120s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Martedì — Spinta + Planche',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'6',rs:'180s'},
        {id:'dips-w',s:'4',r:'8',rs:'120s'},
        {id:'tuck-p',s:'4',r:'30s',rs:'120s'},
        {id:'planche-pu',s:'3',r:'5',rs:'150s'},
        {id:'mil-press',s:'3',r:'8',rs:'120s'},
      ]},
      {name:'Mercoledì — Condizionamento',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'5',r:'40s',rs:'20s'},
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'pull-exp',s:'4',r:'5',rs:'60s'},
      ]},
      {name:'Giovedì — Stacco + Trazione',type:'pull',rest:false,exercises:[
        {id:'dl',s:'5',r:'3',rs:'300s'},
        {id:'pull-up-w',s:'5',r:'5',rs:'150s'},
        {id:'mu',s:'4',r:'4',rs:'180s'},
        {id:'t-row',s:'4',r:'8',rs:'120s'},
        {id:'lsit',s:'4',r:'40s',rs:'60s'},
      ]},
      {name:'Venerdì — Handstand + Accessori',type:'skill',rest:false,exercises:[
        {id:'hshold',s:'5',r:'30s',rs:'90s'},
        {id:'hspu',s:'4',r:'5',rs:'120s'},
        {id:'dragon-f',s:'4',r:'6',rs:'90s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Sabato — Lower ipertrofia',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'12',rs:'90s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'leg-curl',s:'4',r:'15',rs:'75s'},
        {id:'abductor',s:'3',r:'20',rs:'60s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
];

gymPresets.forEach(p => {
  if(!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
});

})(); // end addGymAndHybridPresets

/* ═══════════════════════════════════════════════════════════════════
   NUOVI PRESET SPECIALIZZATI V44
   Atletici, esplosivi, sport-specific, mobilità, dimagrimento smart
═══════════════════════════════════════════════════════════════════ */
(function addV44Presets(){

/* Esercizi aggiuntivi per i nuovi preset */
const V44_EX = [
  {id:'box-jump',name:'Box Jump',m:'lower',tags:['esplosività','gambe'],icon:'💥'},
  {id:'depth-jump',name:'Depth Jump',m:'lower',tags:['esplosività','reattività'],icon:'💥'},
  {id:'broad-jump',name:'Broad Jump',m:'lower',tags:['esplosività','gambe'],icon:'💥'},
  {id:'single-leg-rdl',name:'Single-Leg RDL',m:'lower',tags:['femorali','equilibrio'],icon:'🟡'},
  {id:'lateral-bound',name:'Lateral Bound',m:'lower',tags:['gambe','agilità'],icon:'💥'},
  {id:'sprint-drills',name:'Drill Accelerazione',m:'cardio',tags:['velocità'],icon:'⚡'},
  {id:'agility-ladder',name:'Scala di Agilità',m:'cardio',tags:['coordinazione','velocità'],icon:'🎪'},
  {id:'med-ball-throw',name:'Lancio Medicine Ball',m:'push',tags:['potenza braccia','esplosività'],icon:'💥'},
  {id:'med-ball-slam',name:'Slam Medicine Ball',m:'full',tags:['potenza','core'],icon:'💥'},
  {id:'clap-push',name:'Push-up con battito',m:'push',tags:['esplosività','petto'],icon:'💥'},
  {id:'plyo-push',name:'Push-up pliometrico',m:'push',tags:['esplosività','petto'],icon:'💥'},
  {id:'tuck-jump',name:'Tuck Jump',m:'lower',tags:['esplosività','gambe'],icon:'💥'},
  {id:'hip-mob',name:'Hip 90/90 Stretch',m:'mobility',tags:['anca','mobilità'],icon:'🧘'},
  {id:'thoracic-rot',name:'Rotazione toracica',m:'mobility',tags:['schiena','mobilità'],icon:'🧘'},
  {id:'ankle-mob',name:'Mobilità caviglia',m:'mobility',tags:['caviglia','mobilità'],icon:'🧘'},
  {id:'dynamic-lunge',name:'Affondo dinamico con rotazione',m:'lower',tags:['gambe','mobilità'],icon:'🧘'},
  {id:'inchworm',name:'Inchworm',m:'mobility',tags:['catena posteriore','mobilità'],icon:'🧘'},
  {id:'world-greatest',name:'World Greatest Stretch',m:'mobility',tags:['full body','mobilità'],icon:'🧘'},
  {id:'shoulder-mob',name:'Mobilità spalle (wall slide)',m:'mobility',tags:['spalle','mobilità'],icon:'🧘'},
  {id:'pallof-press',name:'Pallof Press',m:'core',tags:['core','anti-rotazione'],icon:'🔵'},
  {id:'cable-pull-through',name:'Pull-Through ai cavi',m:'lower',tags:['glutei','femorali'],icon:'🏋️'},
  {id:'single-arm-row',name:'Single-Arm DB Row',m:'pull',tags:['dorsali','asimmetria'],icon:'🏋️'},
  {id:'farmers-carry',name:'Farmers Carry',m:'full',tags:['grip','core','gambe'],icon:'💪'},
  {id:'turkish-getup',name:'Turkish Get-Up',m:'full',tags:['core','spalle','mobilità'],icon:'⭐'},
  {id:'kb-swing',name:'Kettlebell Swing',m:'full',tags:['glutei','core','esplosività'],icon:'🔔'},
  {id:'suitcase-carry',name:'Suitcase Carry',m:'core',tags:['core laterale','grip'],icon:'💼'},
  {id:'pull-up-iso',name:'Pull-up isometrico (hold)',m:'pull',tags:['dorsali','forza isometrica'],icon:'🟢'},
  {id:'ring-row',name:'Ring Row',m:'pull',tags:['dorsali','anelli'],icon:'⭕'},
  {id:'ring-push',name:'Ring Push-up',m:'push',tags:['petto','stabilità'],icon:'⭕'},
  {id:'ring-dip',name:'Ring Dip',m:'push',tags:['tricipiti','petto','anelli'],icon:'⭕'},
  {id:'false-grip',name:'False Grip Hold',m:'skill',tags:['grip','anelli'],icon:'⭕'},
  {id:'pike-push-prog',name:'Pike Push-up progressivo',m:'push',tags:['spalle','handstand'],icon:'🟣'},
  {id:'wall-walk',name:'Wall Walk',m:'skill',tags:['handstand','spalle'],icon:'🟣'},
  {id:'crow-pose',name:'Crow Pose',m:'skill',tags:['equilibrio','polsi'],icon:'🟣'},
  {id:'skin-cat',name:'Skin the Cat',m:'skill',tags:['spalle','mobilità'],icon:'⭕'},
  {id:'nordic-alt',name:'Nordic Curl eccentrico',m:'lower',tags:['femorali','prevenzione'],icon:'🟡'},
];
V44_EX.forEach(ex => { if(!EX_DB.find(e=>e.id===ex.id)) EX_DB.push(ex); });

const newPresets = [

  /* ─── ESPLOSIVITÀ & SALTO ─── */
  {
    id:'explosive-beginner',name:'Forza Esplosiva — Base',icon:'💥',color:'var(--acc)',
    t:'full',diff:'beginner',dur:'35',
    goals:['strength','endurance'],
    levels:['beginner','intermediate'],
    perfGoals:['perf_salto','perf_velocita','perf_potenza_braccia'],
    sports:['sport_basket','sport_calcio','sport_volley'],
    desc:'Introduce i movimenti esplosivi in modo sicuro. Squat jump, broad jump e push-up pliometrici per sviluppare potenza da zero.',
    days:[
      {name:'Sessione A — Gambe esplosive',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'6',rs:'120s'},
        {id:'squat-j',s:'4',r:'8',rs:'90s'},
        {id:'tuck-jump',s:'3',r:'6',rs:'90s'},
        {id:'broad-jump',s:'4',r:'5',rs:'120s'},
        {id:'calf',s:'3',r:'20',rs:'45s'},
        {id:'hollow',s:'3',r:'30s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B — Upper esplosivo',type:'push',rest:false,exercises:[
        {id:'plyo-push',s:'4',r:'8',rs:'90s'},
        {id:'clap-push',s:'3',r:'6',rs:'90s'},
        {id:'pull-exp',s:'3',r:'5',rs:'120s'},
        {id:'row',s:'3',r:'12',rs:'75s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione C — Full Body potenza',type:'full',rest:false,exercises:[
        {id:'tuck-jump',s:'4',r:'8',rs:'90s'},
        {id:'broad-jump',s:'3',r:'6',rs:'120s'},
        {id:'plyo-push',s:'3',r:'8',rs:'90s'},
        {id:'burpees',s:'3',r:'8',rs:'75s'},
        {id:'hollow',s:'3',r:'35s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'explosive-advanced',name:'Potenza Atletica Avanzata',icon:'⚡',color:'var(--acc)',
    t:'full',diff:'advanced',dur:'55',
    goals:['strength','endurance','calisthenics'],
    levels:['advanced','athlete'],
    perfGoals:['perf_salto','perf_velocita','perf_potenza_braccia','perf_gambe'],
    sports:['sport_basket','sport_calcio','sport_volley','sport_rugby','sport_arti_marziali'],
    desc:'Vertical jump, depth jump, pull-up esplosivi e sprint drill. Il programma per chi vuole dominare nel proprio sport.',
    days:[
      {name:'Lunedì — Potenza gambe',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'4',r:'5',rs:'150s'},
        {id:'box-jump',s:'5',r:'5',rs:'120s'},
        {id:'depth-jump',s:'4',r:'4',rs:'150s'},
        {id:'broad-jump',s:'4',r:'5',rs:'120s'},
        {id:'nordic-alt',s:'3',r:'5',rs:'120s'},
        {id:'calf',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Martedì — Potenza upper',type:'push',rest:false,exercises:[
        {id:'plyo-push',s:'5',r:'6',rs:'120s'},
        {id:'clap-push',s:'4',r:'6',rs:'120s'},
        {id:'pull-exp',s:'5',r:'5',rs:'120s'},
        {id:'med-ball-throw',s:'4',r:'8',rs:'90s'},
        {id:'dips-w',s:'3',r:'8',rs:'90s'},
        {id:'pull-up-w',s:'3',r:'6',rs:'90s'},
      ]},
      {name:'Mercoledì — Velocità & agilità',type:'cardio',rest:false,exercises:[
        {id:'sprint-drills',s:'6',r:'30s',rs:'90s'},
        {id:'agility-ladder',s:'5',r:'45s',rs:'60s'},
        {id:'lateral-bound',s:'4',r:'8',rs:'90s'},
        {id:'burpees',s:'3',r:'40s',rs:'20s'},
      ]},
      {name:'Giovedì — Riposo attivo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Full body potenza',type:'full',rest:false,exercises:[
        {id:'box-jump',s:'4',r:'5',rs:'120s'},
        {id:'plyo-push',s:'4',r:'6',rs:'120s'},
        {id:'pull-exp',s:'4',r:'5',rs:'120s'},
        {id:'tuck-jump',s:'3',r:'8',rs:'90s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
        {id:'dragon-f',s:'3',r:'5',rs:'60s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── SPORT SPECIFICI ─── */
  {
    id:'sport-calcio',name:'Atletico — Calcio & Sport di squadra',icon:'⚽',color:'var(--green)',
    t:'full',diff:'intermediate',dur:'45',
    goals:['strength','endurance','fat_loss'],
    levels:['beginner','intermediate','advanced'],
    perfGoals:['perf_salto','perf_velocita','perf_resistenza','perf_gambe'],
    sports:['sport_calcio','sport_volley','sport_rugby'],
    desc:'Progettato per calciatori e atleti di squadra. Forza gambe, accelerazione, resistenza aerobica e prevenzione infortuni.',
    days:[
      {name:'Forza gambe + accelerazione',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'6',rs:'150s'},
        {id:'bss',s:'4',r:'8',rs:'90s'},
        {id:'box-jump',s:'4',r:'5',rs:'120s'},
        {id:'sprint-drills',s:'5',r:'20s',rs:'100s'},
        {id:'nordic-alt',s:'3',r:'5',rs:'120s'},
        {id:'calf',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Condizionamento + upper',type:'full',rest:false,exercises:[
        {id:'burpees',s:'4',r:'40s',rs:'20s'},
        {id:'lateral-bound',s:'4',r:'8',rs:'90s'},
        {id:'agility-ladder',s:'4',r:'40s',rs:'60s'},
        {id:'push-up',s:'3',r:'15',rs:'60s'},
        {id:'row',s:'3',r:'12',rs:'60s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Forza + prevenzione',type:'lower',rest:false,exercises:[
        {id:'single-leg-rdl',s:'4',r:'8',rs:'90s'},
        {id:'hip-thr',s:'4',r:'12',rs:'75s'},
        {id:'lateral-bound',s:'4',r:'6',rs:'90s'},
        {id:'ankle-mob',s:'3',r:'60s',rs:'30s'},
        {id:'dynamic-lunge',s:'3',r:'10',rs:'60s'},
        {id:'hollow',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'sport-arti-marziali',name:'Atletico — Arti Marziali & Combat',icon:'🥊',color:'var(--red)',
    t:'full',diff:'intermediate',dur:'50',
    goals:['strength','endurance','fat_loss'],
    levels:['intermediate','advanced'],
    perfGoals:['perf_potenza_braccia','perf_velocita','perf_core','perf_resistenza'],
    sports:['sport_arti_marziali'],
    desc:'Potenza di spinta, trazione e rotazione. Condizionamento metabolico ad alta intensità. Per chi pratica boxe, MMA, judo e arti marziali.',
    days:[
      {name:'Potenza push + core',type:'push',rest:false,exercises:[
        {id:'plyo-push',s:'5',r:'6',rs:'120s'},
        {id:'med-ball-throw',s:'4',r:'8',rs:'90s'},
        {id:'med-ball-slam',s:'4',r:'8',rs:'90s'},
        {id:'dips-w',s:'3',r:'8',rs:'90s'},
        {id:'pallof-press',s:'4',r:'12',rs:'60s'},
        {id:'hollow',s:'4',r:'40s',rs:'45s'},
      ]},
      {name:'Condizionamento',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'5',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'sprint-drills',s:'5',r:'30s',rs:'90s'},
        {id:'hi-kn',s:'4',r:'40s',rs:'20s'},
        {id:'lateral-bound',s:'3',r:'8',rs:'90s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Trazione + core anti-rotazione',type:'pull',rest:false,exercises:[
        {id:'pull-exp',s:'4',r:'5',rs:'120s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'farmers-carry',s:'4',r:'40s',rs:'60s'},
        {id:'suitcase-carry',s:'3',r:'30s',rs:'60s'},
        {id:'pallof-press',s:'4',r:'12',rs:'60s'},
        {id:'dragon-f',s:'3',r:'5',rs:'75s'},
      ]},
      {name:'Full body + gambe',type:'full',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'10',rs:'90s'},
        {id:'box-jump',s:'4',r:'5',rs:'120s'},
        {id:'bss',s:'3',r:'10',rs:'75s'},
        {id:'med-ball-slam',s:'3',r:'10',rs:'75s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'sport-nuoto',name:'Atletico — Nuoto & Sport acquatici',icon:'🏊',color:'var(--blue)',
    t:'full',diff:'intermediate',dur:'45',
    goals:['strength','endurance','mobility'],
    levels:['beginner','intermediate','advanced'],
    perfGoals:['perf_spalle','perf_resistenza','perf_core','perf_flessibilita'],
    sports:['sport_nuoto'],
    desc:'Spalle forti, core solido, mobilità toracica e resistenza. Potenzia ogni stile di nuoto e previene le tendinopatie da nuotatore.',
    days:[
      {name:'Spalle + dorsali',type:'pull',rest:false,exercises:[
        {id:'pull-up',s:'4',r:'8',rs:'90s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'single-arm-row',s:'3',r:'12',rs:'75s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s'},
      ]},
      {name:'Riposo + mobilità',type:'rest',rest:true,exercises:[]},
      {name:'Core + rotazione',type:'full',rest:false,exercises:[
        {id:'hollow',s:'4',r:'50s',rs:'45s'},
        {id:'pallof-press',s:'4',r:'12',rs:'60s'},
        {id:'thoracic-rot',s:'3',r:'60s',rs:'30s'},
        {id:'inchworm',s:'3',r:'8',rs:'45s'},
        {id:'world-greatest',s:'3',r:'5',rs:'45s'},
        {id:'side-plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Forza funzionale + gambe',type:'lower',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'10',rs:'90s'},
        {id:'bss',s:'3',r:'10',rs:'75s'},
        {id:'hip-thr',s:'3',r:'15',rs:'75s'},
        {id:'ankle-mob',s:'3',r:'60s',rs:'30s'},
        {id:'calf',s:'4',r:'20',rs:'45s'},
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── MOBILITÀ & RECOVERY ─── */
  {
    id:'mobility-full',name:'Mobilità Totale',icon:'🧘',color:'var(--purple)',
    t:'mobility',diff:'beginner',dur:'30',
    goals:['mobility'],
    levels:['beginner','intermediate','advanced','athlete'],
    perfGoals:['perf_flessibilita','perf_coordinazione'],
    sports:['sport_ginnastica','sport_danza'],
    desc:'Mobilità articolare sistematica. Anca, spalle, colonna, caviglie. Perfetto come programma standalone o complementare.',
    days:[
      {name:'Mobilità anca + caviglie',type:'mobility',rest:false,exercises:[
        {id:'hip-mob',s:'3',r:'90s',rs:'30s'},
        {id:'ankle-mob',s:'3',r:'60s',rs:'30s'},
        {id:'dynamic-lunge',s:'3',r:'10',rs:'45s'},
        {id:'inchworm',s:'3',r:'8',rs:'45s'},
        {id:'ct-wall',s:'2',r:'60s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mobilità spalle + colonna',type:'mobility',rest:false,exercises:[
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s'},
        {id:'thoracic-rot',s:'3',r:'60s',rs:'30s'},
        {id:'world-greatest',s:'3',r:'5',rs:'45s'},
        {id:'skin-cat',s:'3',r:'8',rs:'60s'},
        {id:'inchworm',s:'3',r:'8',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full mobility flow',type:'mobility',rest:false,exercises:[
        {id:'world-greatest',s:'4',r:'5',rs:'45s'},
        {id:'hip-mob',s:'3',r:'90s',rs:'30s'},
        {id:'thoracic-rot',s:'3',r:'60s',rs:'30s'},
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s'},
        {id:'hollow',s:'3',r:'30s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'mobility-strength',name:'Mobilità + Forza',icon:'⚖️',color:'var(--purple)',
    t:'full',diff:'intermediate',dur:'50',
    goals:['mobility','strength'],
    levels:['intermediate','advanced'],
    perfGoals:['perf_flessibilita','perf_core','perf_spalle'],
    sports:['sport_ginnastica','sport_danza','sport_nuoto'],
    desc:'Allena forza e mobilità insieme. Turkish get-up, split squat profondi, hollow + arch. Il programma dei ginnasti e dei danzatori.',
    days:[
      {name:'Forza + mobilità lower',type:'lower',rest:false,exercises:[
        {id:'turkish-getup',s:'3',r:'3',rs:'120s'},
        {id:'pistol',s:'4',r:'6',rs:'90s'},
        {id:'dynamic-lunge',s:'3',r:'10',rs:'60s'},
        {id:'hip-mob',s:'3',r:'90s',rs:'30s'},
        {id:'ankle-mob',s:'3',r:'60s',rs:'30s'},
        {id:'single-leg-rdl',s:'3',r:'8',rs:'90s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Forza + mobilità upper',type:'push',rest:false,exercises:[
        {id:'wall-walk',s:'4',r:'5',rs:'90s'},
        {id:'pike-push-prog',s:'4',r:'8',rs:'90s'},
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s'},
        {id:'thoracic-rot',s:'3',r:'60s',rs:'30s'},
        {id:'skin-cat',s:'3',r:'6',rs:'90s'},
        {id:'dips',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full body flusso',type:'full',rest:false,exercises:[
        {id:'turkish-getup',s:'3',r:'3',rs:'120s'},
        {id:'world-greatest',s:'4',r:'5',rs:'45s'},
        {id:'pull-up',s:'3',r:'8',rs:'90s'},
        {id:'hollow',s:'4',r:'40s',rs:'45s'},
        {id:'inchworm',s:'3',r:'8',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── KETTLEBELL / FUNZIONALE ─── */
  {
    id:'kettlebell-full',name:'Kettlebell — Full Body',icon:'🔔',color:'var(--orange)',
    t:'full',diff:'intermediate',dur:'40',
    goals:['strength','endurance','fat_loss'],
    levels:['intermediate','advanced'],
    perfGoals:['perf_core','perf_potenza_braccia','perf_resistenza','perf_grip'],
    desc:'Solo kettlebell. Swing, turkish get-up, goblet squat e farmer carry. Forza funzionale ad alto transfer atletico.',
    days:[
      {name:'Kettlebell A',type:'full',rest:false,exercises:[
        {id:'kb-swing',s:'5',r:'20',rs:'60s'},
        {id:'turkish-getup',s:'4',r:'4',rs:'120s'},
        {id:'goblet-sq',s:'4',r:'12',rs:'75s'},
        {id:'farmers-carry',s:'4',r:'40s',rs:'60s'},
        {id:'hollow',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Kettlebell B — Potenza',type:'full',rest:false,exercises:[
        {id:'kb-swing',s:'6',r:'15',rs:'45s'},
        {id:'plyo-push',s:'4',r:'6',rs:'90s'},
        {id:'suitcase-carry',s:'4',r:'30s',rs:'60s'},
        {id:'pull-up',s:'3',r:'8',rs:'90s'},
        {id:'med-ball-slam',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Kettlebell C — Resistenza',type:'cardio',rest:false,exercises:[
        {id:'kb-swing',s:'4',r:'30s',rs:'30s'},
        {id:'burpees',s:'3',r:'40s',rs:'20s'},
        {id:'farmers-carry',s:'3',r:'60s',rs:'30s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GRIP & ANELLI ─── */
  {
    id:'rings-beginner',name:'Anelli — Introduzione',icon:'⭕',color:'var(--blue)',
    t:'calisthenics',diff:'intermediate',dur:'45',
    goals:['calisthenics','strength'],
    levels:['intermediate'],
    perfGoals:['perf_skill_cali','perf_potenza_braccia','perf_grip'],
    desc:'Prima presa sugli anelli. Ring row, ring push-up, skin the cat. Instabilità che costruisce forza vera.',
    days:[
      {name:'Anelli Push + Stabilità',type:'push',rest:false,exercises:[
        {id:'ring-push',s:'4',r:'10',rs:'90s'},
        {id:'ring-dip',s:'3',r:'8',rs:'120s'},
        {id:'push-up-w',s:'3',r:'10',rs:'75s'},
        {id:'false-grip',s:'4',r:'30s',rs:'90s'},
        {id:'plank',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Anelli Pull + Mobilità',type:'pull',rest:false,exercises:[
        {id:'ring-row',s:'4',r:'12',rs:'75s'},
        {id:'pull-up',s:'4',r:'6',rs:'90s'},
        {id:'skin-cat',s:'4',r:'8',rs:'90s'},
        {id:'false-grip',s:'3',r:'30s',rs:'90s'},
        {id:'hollow',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full body anelli',type:'full',rest:false,exercises:[
        {id:'ring-dip',s:'3',r:'8',rs:'120s'},
        {id:'ring-row',s:'3',r:'12',rs:'75s'},
        {id:'squat-w',s:'4',r:'10',rs:'75s'},
        {id:'skin-cat',s:'3',r:'6',rs:'90s'},
        {id:'lsit',s:'3',r:'20s',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── PALESTRA DONNA / SHAPE ─── */
  {
    id:'gym-shape-f',name:'Palestra — Tonificazione & Shape',icon:'💗',color:'var(--pink,#f472b6)',
    t:'full',diff:'beginner',dur:'50',env:'gym',
    goals:['fat_loss','hypertrophy'],
    levels:['beginner','intermediate'],
    desc:'Glutei, gambe e postura. Hip thrust, split squat e macchine selettive per costruire la forma che vuoi senza bulk.',
    days:[
      {name:'Glute Day A',type:'lower',rest:false,exercises:[
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'leg-press',s:'4',r:'15',rs:'75s'},
        {id:'bss',s:'3',r:'12',rs:'75s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
        {id:'leg-curl',s:'4',r:'15',rs:'60s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Upper A — Spalle + braccia',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'12',rs:'75s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'lat-pull',s:'4',r:'12',rs:'75s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-db',s:'3',r:'15',rs:'60s'},
        {id:'tri-rope',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Glute Day B — Femorali + glutei',type:'lower',rest:false,exercises:[
        {id:'rdl',s:'4',r:'12',rs:'90s'},
        {id:'hack-sq',s:'4',r:'15',rs:'90s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'cable-pull-through',s:'4',r:'15',rs:'60s'},
        {id:'abductor',s:'3',r:'20',rs:'60s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Upper B — Petto + schiena',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'12',rs:'75s'},
        {id:'seated-row',s:'4',r:'12',rs:'75s'},
        {id:'fly',s:'3',r:'15',rs:'60s'},
        {id:'rev-fly',s:'3',r:'15',rs:'60s'},
        {id:'ab-roll',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── MINIMUM EFFECTIVE DOSE (2 giorni) ─── */
  {
    id:'med-2day',name:'Minimo Efficace — 2 Giorni',icon:'🌿',color:'var(--green)',
    t:'full',diff:'beginner',dur:'40',
    goals:['hypertrophy','strength','fat_loss'],
    levels:['beginner','intermediate'],
    perfGoals:['perf_muscoli_grandi'],
    desc:'Due sessioni full body ad alto impatto. Il minimo per mantenere e costruire massa muscolare. Perfetto per chi ha poco tempo.',
    days:[
      {name:'Full Body A — Push dominante',type:'full',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'pull-up',s:'4',r:'6',rs:'90s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'ohp',s:'3',r:'10',rs:'75s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
        {id:'squat-j',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B — Pull dominante',type:'full',rest:false,exercises:[
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'push-up-w',s:'4',r:'12',rs:'75s'},
        {id:'pistol',s:'4',r:'6',rs:'90s'},
        {id:'row',s:'3',r:'12',rs:'75s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
        {id:'burpees',s:'3',r:'10',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GRIP & FORZA BRACCIA ─── */
  {
    id:'grip-arms',name:'Forza Braccia & Grip',icon:'✊',color:'var(--orange)',
    t:'full',diff:'intermediate',dur:'45',
    goals:['strength','calisthenics'],
    levels:['intermediate','advanced'],
    perfGoals:['perf_grip','perf_potenza_braccia','perf_spalle'],
    desc:'Pull-up isometrici, farmer carry, chin-up pesanti e curl variations. Braccia, avambracci e grip di ferro.',
    days:[
      {name:'Pull + Grip pesante',type:'pull',rest:false,exercises:[
        {id:'pull-up-w',s:'5',r:'5',rs:'180s'},
        {id:'pull-up-iso',s:'4',r:'30s',rs:'120s'},
        {id:'chin-up',s:'4',r:'8',rs:'120s'},
        {id:'farmers-carry',s:'4',r:'60s',rs:'60s'},
        {id:'hammer-c',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Push + isometrie',type:'push',rest:false,exercises:[
        {id:'dips-w',s:'5',r:'6',rs:'150s'},
        {id:'clap-push',s:'4',r:'6',rs:'120s'},
        {id:'archer-pu',s:'3',r:'6',rs:'120s'},
        {id:'skull',s:'4',r:'10',rs:'90s'},
        {id:'false-grip',s:'3',r:'40s',rs:'90s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full body + carry',type:'full',rest:false,exercises:[
        {id:'pull-exp',s:'4',r:'5',rs:'120s'},
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'suitcase-carry',s:'4',r:'40s',rs:'60s'},
        {id:'farmers-carry',s:'3',r:'60s',rs:'60s'},
        {id:'bic-bar',s:'3',r:'12',rs:'75s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM DONNA AVANZATA ─── */
  {
    id:'gym-powerbuilding-f',name:'Palestra — Powerbuilding Donna',icon:'🔥',color:'var(--red)',
    t:'full',diff:'advanced',dur:'65',env:'gym',
    goals:['strength','hypertrophy'],
    levels:['advanced','athlete'],
    desc:'Squat, stacco e hip thrust pesanti + volume ipertrofico selettivo. Per donne che vogliono forza vera e muscolo.',
    days:[
      {name:'Lunedì — Squat & Quad',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'240s'},
        {id:'hack-sq',s:'4',r:'10',rs:'120s'},
        {id:'leg-ext',s:'4',r:'15',rs:'75s'},
        {id:'leg-curl',s:'3',r:'15',rs:'75s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
        {id:'ab-roll',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Martedì — Push',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'6',rs:'180s'},
        {id:'ip',s:'4',r:'10',rs:'90s'},
        {id:'db-ohp',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
        {id:'skull',s:'3',r:'12',rs:'75s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Stacco & Glutei',type:'lower',rest:false,exercises:[
        {id:'dl',s:'5',r:'4',rs:'240s'},
        {id:'hip-thr',s:'5',r:'10',rs:'120s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
        {id:'cable-pull-through',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Venerdì — Pull + Accessori',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

];

newPresets.forEach(p => {
  if(!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
});

// Fix missing goblet-sq in EX_DB
if(!EX_DB.find(e=>e.id==='goblet-sq')) EX_DB.push({id:'goblet-sq',name:'Goblet Squat',m:'lower',tags:['quadricipiti','glutei'],icon:'🔔'});

})(); // end addV44Presets


/* ═══════════════════════════════════════════════════════════════════
   GYM PRESETS V44 — copertura completa tutti i casi utente palestra
═══════════════════════════════════════════════════════════════════ */
(function addGymV44Presets(){

const gymV44 = [

  /* ─── BEGINNER GYM ─── */
  {id:'gym-beginner-3day',name:'Palestra — Principiante Full Body',icon:'🌱',color:'var(--green)',t:'full',diff:'beginner',dur:'45',env:'gym',
    goals:['hypertrophy','strength'],levels:['beginner','zero'],
    desc:'3 sessioni full body in palestra. Impara i movimenti fondamentali con bilanciere e manubri prima di passare a split avanzati.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'bs',s:'3',r:'8',rs:'120s',kg:''},
        {id:'bp',s:'3',r:'10',rs:'90s',kg:''},
        {id:'lat-pull',s:'3',r:'12',rs:'75s',kg:''},
        {id:'db-ohp',s:'3',r:'12',rs:'75s',kg:''},
        {id:'bic-bar',s:'2',r:'15',rs:'60s',kg:''},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'dl',s:'3',r:'6',rs:'150s',kg:''},
        {id:'ip',s:'3',r:'10',rs:'90s',kg:''},
        {id:'seated-row',s:'3',r:'12',rs:'75s',kg:''},
        {id:'leg-press',s:'3',r:'15',rs:'90s',kg:''},
        {id:'tri-rope',s:'2',r:'15',rs:'60s',kg:''},
        {id:'plank',s:'3',r:'30s',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body C',type:'full',rest:false,exercises:[
        {id:'bs',s:'3',r:'8',rs:'120s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'lat-pull',s:'3',r:'12',rs:'75s',kg:''},
        {id:'leg-curl',s:'3',r:'15',rs:'60s',kg:''},
        {id:'leg-ext',s:'3',r:'15',rs:'60s',kg:''},
        {id:'calf-mach',s:'3',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM IPERTROFIA 3 GIORNI ─── */
  {id:'gym-ppl-3day',name:'Palestra — PPL 3 giorni',icon:'💪',color:'var(--orange)',t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['hypertrophy'],levels:['intermediate'],
    desc:'Push / Pull / Legs in 3 sessioni settimanali. Il classico split per chi ha 3 giorni disponibili e vuole costruire massa.',
    days:[
      {name:'Push — Petto, Spalle, Tricipiti',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'8',rs:'150s',kg:''},
        {id:'ip',s:'3',r:'10',rs:'90s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'db-ohp',s:'4',r:'10',rs:'90s',kg:''},
        {id:'lat-mach',s:'3',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'3',r:'12',rs:'75s',kg:''},
        {id:'tri-rope',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Pull — Schiena, Bicipiti',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'210s',kg:''},
        {id:'lat-pull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'seated-row',s:'4',r:'12',rs:'90s',kg:''},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s',kg:''},
        {id:'bic-bar',s:'4',r:'12',rs:'75s',kg:''},
        {id:'hammer-c',s:'3',r:'12',rs:'60s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Legs — Quadricipiti, Glutei, Femorali',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'180s',kg:''},
        {id:'leg-press',s:'4',r:'12',rs:'120s',kg:''},
        {id:'leg-ext',s:'3',r:'15',rs:'75s',kg:''},
        {id:'rdl',s:'4',r:'10',rs:'120s',kg:''},
        {id:'leg-curl',s:'3',r:'15',rs:'75s',kg:''},
        {id:'calf-mach',s:'4',r:'20',rs:'45s',kg:''},
        {id:'ab-roll',s:'3',r:'10',rs:'60s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM FORZA 4 GIORNI UPPER/LOWER ─── */
  {id:'gym-upper-lower-4',name:'Palestra — Upper / Lower 4 giorni',icon:'⚡',color:'var(--blue)',t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['strength','hypertrophy'],levels:['intermediate','advanced'],
    desc:'Upper/Lower classico con frequenza 2 per muscolo. Bilancio perfetto tra volume e recupero per progressi costanti.',
    days:[
      {name:'Upper A — Forza',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'5',rs:'210s',kg:''},
        {id:'seated-row',s:'4',r:'6',rs:'180s',kg:''},
        {id:'db-ohp',s:'3',r:'8',rs:'120s',kg:''},
        {id:'lat-pull',s:'3',r:'8',rs:'120s',kg:''},
        {id:'bic-bar',s:'3',r:'10',rs:'90s',kg:''},
        {id:'tri-rope',s:'3',r:'10',rs:'90s',kg:''},
      ]},
      {name:'Lower A — Forza',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'5',rs:'240s',kg:''},
        {id:'rdl',s:'4',r:'6',rs:'180s',kg:''},
        {id:'leg-press',s:'3',r:'10',rs:'120s',kg:''},
        {id:'leg-curl',s:'3',r:'12',rs:'90s',kg:''},
        {id:'calf-mach',s:'4',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Upper B — Ipertrofia',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s',kg:''},
        {id:'lat-pull',s:'4',r:'12',rs:'90s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s',kg:''},
        {id:'hammer-c',s:'3',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Lower B — Ipertrofia',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'10',rs:'120s',kg:''},
        {id:'hip-thr',s:'4',r:'12',rs:'90s',kg:''},
        {id:'leg-ext',s:'4',r:'15',rs:'75s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'abductor',s:'3',r:'20',rs:'60s',kg:''},
        {id:'calf-mach',s:'4',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM PPL 6 GIORNI ─── */
  {id:'gym-ppl-6day',name:'Palestra — PPL 6 giorni (Doppio)',icon:'🔥',color:'var(--red)',t:'full',diff:'advanced',dur:'70',env:'gym',
    goals:['hypertrophy'],levels:['advanced','athlete'],
    desc:'PPL doppio — ogni gruppo muscolare colpito 2 volte a settimana. Il programma classico per massimizzare la crescita muscolare.',
    days:[
      {name:'Push A — Forza',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'5',rs:'240s',kg:''},
        {id:'ip',s:'3',r:'8',rs:'120s',kg:''},
        {id:'db-ohp',s:'4',r:'8',rs:'120s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'lat-mach',s:'4',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'3',r:'12',rs:'75s',kg:''},
      ]},
      {name:'Pull A — Forza',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'4',rs:'270s',kg:''},
        {id:'seated-row',s:'4',r:'6',rs:'180s',kg:''},
        {id:'lat-pull',s:'4',r:'8',rs:'120s',kg:''},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s',kg:''},
        {id:'bic-bar',s:'4',r:'8',rs:'90s',kg:''},
      ]},
      {name:'Legs A — Quad dom.',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'6',rs:'240s',kg:''},
        {id:'leg-press',s:'4',r:'10',rs:'120s',kg:''},
        {id:'leg-ext',s:'4',r:'15',rs:'75s',kg:''},
        {id:'leg-curl',s:'3',r:'15',rs:'75s',kg:''},
        {id:'calf-mach',s:'5',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Push B — Ipertrofia',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s',kg:''},
        {id:'fly',s:'4',r:'15',rs:'60s',kg:''},
        {id:'lat-mach',s:'4',r:'20',rs:'45s',kg:''},
        {id:'db-ohp',s:'3',r:'12',rs:'90s',kg:''},
        {id:'tri-rope',s:'4',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Pull B — Ipertrofia',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'12',rs:'90s',kg:''},
        {id:'seated-row',s:'4',r:'12',rs:'90s',kg:''},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s',kg:''},
        {id:'hammer-c',s:'4',r:'15',rs:'60s',kg:''},
        {id:'bic-bar',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Legs B — Glutei & Femorali',type:'lower',rest:false,exercises:[
        {id:'rdl',s:'4',r:'8',rs:'150s',kg:''},
        {id:'hip-thr',s:'4',r:'12',rs:'90s',kg:''},
        {id:'hack-sq',s:'4',r:'12',rs:'120s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'abductor',s:'3',r:'20',rs:'60s',kg:''},
        {id:'calf-mach',s:'5',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM POWERBUILDING ─── */
  {id:'gym-powerbuilding',name:'Palestra — Powerbuilding',icon:'🏆',color:'var(--orange)',t:'full',diff:'advanced',dur:'75',env:'gym',
    goals:['strength','hypertrophy'],levels:['advanced','athlete'],
    desc:'Forza e massa insieme. Movimenti principali in stile powerlifting + volume accessorio in stile bodybuilding.',
    days:[
      {name:'Lunedì — Squat + accessori',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'3',rs:'300s',kg:''},
        {id:'hack-sq',s:'4',r:'8',rs:'150s',kg:''},
        {id:'leg-ext',s:'3',r:'15',rs:'75s',kg:''},
        {id:'leg-curl',s:'4',r:'12',rs:'90s',kg:''},
        {id:'calf-mach',s:'5',r:'20',rs:'45s',kg:''},
        {id:'ab-roll',s:'4',r:'12',rs:'60s',kg:''},
      ]},
      {name:'Martedì — Panca + accessori',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'3',rs:'300s',kg:''},
        {id:'ip',s:'4',r:'8',rs:'120s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'db-ohp',s:'4',r:'10',rs:'90s',kg:''},
        {id:'skull',s:'4',r:'12',rs:'75s',kg:''},
        {id:'tri-rope',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Stacco + accessori',type:'lower',rest:false,exercises:[
        {id:'dl',s:'5',r:'2',rs:'360s',kg:''},
        {id:'rdl',s:'4',r:'8',rs:'150s',kg:''},
        {id:'hip-thr',s:'4',r:'12',rs:'90s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'calf-mach',s:'5',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Venerdì — Schiena + bicipiti',type:'pull',rest:false,exercises:[
        {id:'seated-row',s:'4',r:'6',rs:'180s',kg:''},
        {id:'lat-pull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s',kg:''},
        {id:'bic-bar',s:'5',r:'8',rs:'90s',kg:''},
        {id:'hammer-c',s:'4',r:'12',rs:'75s',kg:''},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM DEFINIZIONE / FAT LOSS ─── */
  {id:'gym-cut',name:'Palestra — Definizione & Taglio',icon:'🎯',color:'var(--green)',t:'full',diff:'intermediate',dur:'55',env:'gym',
    goals:['fat_loss','hypertrophy'],levels:['intermediate','advanced'],
    desc:'Volume alto, recuperi brevi, super-set. Mantieni la massa, brucia il grasso. Ideale in fase di cut.',
    days:[
      {name:'Upper A — Superset',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'10',rs:'60s',kg:''},
        {id:'seated-row',s:'4',r:'10',rs:'60s',kg:''},
        {id:'ip',s:'3',r:'12',rs:'45s',kg:''},
        {id:'lat-pull',s:'3',r:'12',rs:'45s',kg:''},
        {id:'lat-mach',s:'3',r:'20',rs:'30s',kg:''},
        {id:'face-pull-c',s:'3',r:'20',rs:'30s',kg:''},
        {id:'ab-roll',s:'3',r:'15',rs:'45s',kg:''},
      ]},
      {name:'Legs A — Circuit',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'12',rs:'90s',kg:''},
        {id:'leg-press',s:'3',r:'20',rs:'60s',kg:''},
        {id:'leg-ext',s:'3',r:'20',rs:'30s',kg:''},
        {id:'leg-curl',s:'3',r:'20',rs:'30s',kg:''},
        {id:'hip-thr',s:'4',r:'15',rs:'60s',kg:''},
        {id:'calf-mach',s:'4',r:'20',rs:'30s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Upper B + Cardio finisher',type:'full',rest:false,exercises:[
        {id:'ip',s:'4',r:'12',rs:'60s',kg:''},
        {id:'lat-pull',s:'4',r:'12',rs:'60s',kg:''},
        {id:'db-ohp',s:'3',r:'15',rs:'45s',kg:''},
        {id:'seated-row',s:'3',r:'15',rs:'45s',kg:''},
        {id:'bic-bar',s:'3',r:'15',rs:'30s',kg:''},
        {id:'skull',s:'3',r:'15',rs:'30s',kg:''},
        {id:'tapis_cardio',s:'1',r:'15min',rs:'—',kg:''},
      ]},
      {name:'Legs B + HIIT',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'15',rs:'75s',kg:''},
        {id:'rdl',s:'4',r:'12',rs:'90s',kg:''},
        {id:'abductor',s:'3',r:'25',rs:'30s',kg:''},
        {id:'leg-curl',s:'3',r:'20',rs:'30s',kg:''},
        {id:'burpees',s:'5',r:'45s',rs:'15s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM SPALLE SPECIALIZZAZIONE ─── */
  {id:'gym-shoulders-focus',name:'Palestra — Spalle Protagoniste',icon:'🦅',color:'var(--blue)',t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['hypertrophy'],levels:['intermediate','advanced'],
    perfGoals:['perf_spalle'],
    desc:'Deltoidi anteriori, medi e posteriori. Face pull, alzate laterali, overhead press — spalle a 3D.',
    days:[
      {name:'Spalle A + Push',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'5',r:'6',rs:'180s',kg:''},
        {id:'lat-mach',s:'5',r:'15',rs:'60s',kg:''},
        {id:'face-pull-c',s:'4',r:'25',rs:'45s',kg:''},
        {id:'bp',s:'4',r:'10',rs:'120s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'4',r:'12',rs:'75s',kg:''},
      ]},
      {name:'Pull + Core',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'seated-row',s:'4',r:'12',rs:'90s',kg:''},
        {id:'face-pull-c',s:'5',r:'25',rs:'45s',kg:''},
        {id:'rev-fly',s:'4',r:'20',rs:'45s',kg:''},
        {id:'bic-bar',s:'4',r:'12',rs:'75s',kg:''},
        {id:'ab-roll',s:'3',r:'12',rs:'60s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Spalle B + Lower',type:'full',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'8',rs:'120s',kg:''},
        {id:'lat-mach',s:'5',r:'20',rs:'30s',kg:''},
        {id:'face-pull-c',s:'4',r:'25',rs:'30s',kg:''},
        {id:'bs',s:'4',r:'8',rs:'180s',kg:''},
        {id:'hip-thr',s:'4',r:'15',rs:'90s',kg:''},
        {id:'calf-mach',s:'4',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM GLUTEI SPECIALIZZAZIONE ─── */
  {id:'gym-glutes-focus',name:'Palestra — Glutei Protagonisti',icon:'🍑',color:'var(--pink,#f472b6)',t:'full',diff:'intermediate',dur:'55',env:'gym',
    goals:['hypertrophy','fat_loss'],levels:['beginner','intermediate'],
    desc:'Hip thrust, squat bulgaro, abductor — tutto pensato per costruire glutei forti e sodi. Per donne e uomini.',
    days:[
      {name:'Glute Day A',type:'lower',rest:false,exercises:[
        {id:'hip-thr',s:'5',r:'10',rs:'90s',kg:''},
        {id:'bs',s:'4',r:'10',rs:'120s',kg:''},
        {id:'bss',s:'4',r:'12',rs:'75s',kg:''},
        {id:'abductor',s:'4',r:'25',rs:'45s',kg:''},
        {id:'cable-pull-through',s:'4',r:'15',rs:'60s',kg:''},
        {id:'calf-mach',s:'3',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Upper Leggero',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'3',r:'12',rs:'75s',kg:''},
        {id:'seated-row',s:'3',r:'12',rs:'75s',kg:''},
        {id:'ip',s:'3',r:'12',rs:'75s',kg:''},
        {id:'face-pull-c',s:'4',r:'20',rs:'45s',kg:''},
        {id:'bic-db',s:'3',r:'15',rs:'60s',kg:''},
        {id:'ab-crunch',s:'3',r:'20',rs:'30s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Glute Day B — Femorali',type:'lower',rest:false,exercises:[
        {id:'rdl',s:'4',r:'10',rs:'120s',kg:''},
        {id:'hip-thr',s:'5',r:'12',rs:'90s',kg:''},
        {id:'hack-sq',s:'4',r:'15',rs:'90s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'gluteus_machine',s:'4',r:'20',rs:'45s',kg:''},
        {id:'abductor',s:'3',r:'25',rs:'30s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM FORZA PURA 3 GIORNI ─── */
  {id:'gym-strength-3day',name:'Palestra — Forza Pura (SL 5×5)',icon:'⚙️',color:'var(--orange)',t:'full',diff:'intermediate',dur:'45',env:'gym',
    goals:['strength'],levels:['beginner','intermediate'],
    desc:'StrongLifts 5×5 style. Tre sessioni alterne con squat, panca, stacco, overhead e rematore. Semplice, pesante, efficace.',
    days:[
      {name:'Sessione A',type:'full',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'300s',kg:''},
        {id:'bp',s:'5',r:'5',rs:'240s',kg:''},
        {id:'seated-row',s:'5',r:'5',rs:'210s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B',type:'full',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'300s',kg:''},
        {id:'db-ohp',s:'5',r:'5',rs:'240s',kg:''},
        {id:'dl',s:'1',r:'5',rs:'360s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione A (alt.)',type:'full',rest:false,exercises:[
        {id:'bs',s:'5',r:'5',rs:'300s',kg:''},
        {id:'bp',s:'5',r:'5',rs:'240s',kg:''},
        {id:'seated-row',s:'5',r:'5',rs:'210s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM ANZIANI / OVER 50 ─── */
  {id:'gym-over50',name:'Palestra — Over 50 & Mobilità',icon:'🧓',color:'var(--green)',t:'full',diff:'beginner',dur:'40',env:'gym',
    goals:['strength','mobility'],levels:['beginner','intermediate'],
    desc:'Forza funzionale, basso impatto articolare, focus postura e mobilità. Ideale per adulti e over 50 che tornano in palestra.',
    days:[
      {name:'Full Body A — Basso impatto',type:'full',rest:false,exercises:[
        {id:'leg-press',s:'3',r:'12',rs:'90s',kg:''},
        {id:'chest_press',s:'3',r:'12',rs:'90s',kg:''},
        {id:'lat-pull',s:'3',r:'12',rs:'90s',kg:''},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s',kg:''},
        {id:'hip-mob',s:'2',r:'60s',rs:'30s',kg:''},
        {id:'calf-mach',s:'3',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mobilità + Core',type:'full',rest:false,exercises:[
        {id:'world-greatest',s:'3',r:'5',rs:'45s',kg:''},
        {id:'thoracic-rot',s:'3',r:'60s',rs:'30s',kg:''},
        {id:'shoulder-mob',s:'3',r:'60s',rs:'30s',kg:''},
        {id:'plank',s:'3',r:'30s',rs:'45s',kg:''},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s',kg:''},
        {id:'hip-thr',s:'3',r:'15',rs:'75s',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'hack-sq',s:'3',r:'12',rs:'90s',kg:''},
        {id:'seated-row',s:'3',r:'12',rs:'90s',kg:''},
        {id:'db-ohp',s:'3',r:'10',rs:'90s',kg:''},
        {id:'bic-bar',s:'3',r:'12',rs:'75s',kg:''},
        {id:'leg-curl',s:'3',r:'15',rs:'60s',kg:''},
        {id:'ellittica',s:'1',r:'15min',rs:'—',kg:''},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM DONNA GLUTEI + PETTO ─── */
  {id:'gym-woman-5day',name:'Palestra — Full Donna 5 giorni',icon:'💗',color:'var(--pink,#f472b6)',t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['hypertrophy','fat_loss'],levels:['intermediate','advanced'],
    desc:'5 giorni bilanciati per donna. 2 glute day, upper, arms e un giorno metabolico. Costruzione fisica completa.',
    days:[
      {name:'Lunedì — Glutei & Quad',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s',kg:''},
        {id:'hip-thr',s:'4',r:'12',rs:'90s',kg:''},
        {id:'bss',s:'3',r:'12',rs:'75s',kg:''},
        {id:'leg-ext',s:'3',r:'20',rs:'45s',kg:''},
        {id:'abductor',s:'4',r:'25',rs:'30s',kg:''},
        {id:'calf-mach',s:'3',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Martedì — Petto & Spalle',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s',kg:''},
        {id:'fly',s:'4',r:'15',rs:'60s',kg:''},
        {id:'db-ohp',s:'4',r:'12',rs:'75s',kg:''},
        {id:'lat-mach',s:'4',r:'20',rs:'30s',kg:''},
        {id:'face-pull-c',s:'3',r:'25',rs:'30s',kg:''},
      ]},
      {name:'Mercoledì — Schiena & Braccia',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'12',rs:'90s',kg:''},
        {id:'seated-row',s:'4',r:'12',rs:'90s',kg:''},
        {id:'bic-db',s:'4',r:'15',rs:'60s',kg:''},
        {id:'hammer-c',s:'3',r:'15',rs:'60s',kg:''},
        {id:'tri-rope',s:'4',r:'15',rs:'60s',kg:''},
        {id:'skull',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Giovedì — Glutei & Femorali',type:'lower',rest:false,exercises:[
        {id:'rdl',s:'4',r:'10',rs:'120s',kg:''},
        {id:'hip-thr',s:'5',r:'12',rs:'90s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'cable-pull-through',s:'4',r:'15',rs:'60s',kg:''},
        {id:'abductor',s:'3',r:'25',rs:'30s',kg:''},
      ]},
      {name:'Venerdì — Metabolico Full Body',type:'full',rest:false,exercises:[
        {id:'burpees',s:'4',r:'45s',rs:'15s',kg:''},
        {id:'leg-press',s:'3',r:'20',rs:'60s',kg:''},
        {id:'lat-pull',s:'3',r:'15',rs:'60s',kg:''},
        {id:'hip-thr',s:'3',r:'20',rs:'60s',kg:''},
        {id:'ab-crunch',s:'4',r:'20',rs:'30s',kg:''},
        {id:'tapis_cardio',s:'1',r:'12min',rs:'—',kg:''},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ─── GYM ARNOLD SPLIT ─── */
  {id:'gym-arnold-6day',name:'Palestra — Arnold Split 6 giorni',icon:'🦁',color:'var(--orange)',t:'full',diff:'advanced',dur:'75',env:'gym',
    goals:['hypertrophy'],levels:['advanced','athlete'],
    desc:'Petto+Schiena, Spalle+Braccia, Gambe — ogni pair 2 volte a settimana. Il metodo di Arnold Schwarzenegger.',
    days:[
      {name:'Lun — Petto + Schiena',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'8',rs:'180s',kg:''},
        {id:'seated-row',s:'4',r:'8',rs:'180s',kg:''},
        {id:'ip',s:'4',r:'10',rs:'90s',kg:''},
        {id:'lat-pull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'fly',s:'3',r:'15',rs:'60s',kg:''},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s',kg:''},
      ]},
      {name:'Mar — Spalle + Braccia',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'8',rs:'150s',kg:''},
        {id:'lat-mach',s:'4',r:'20',rs:'30s',kg:''},
        {id:'bic-bar',s:'4',r:'10',rs:'90s',kg:''},
        {id:'skull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'hammer-c',s:'3',r:'15',rs:'60s',kg:''},
        {id:'tri-rope',s:'3',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Mer — Gambe',type:'lower',rest:false,exercises:[
        {id:'bs',s:'5',r:'6',rs:'240s',kg:''},
        {id:'leg-press',s:'4',r:'12',rs:'120s',kg:''},
        {id:'leg-ext',s:'4',r:'15',rs:'75s',kg:''},
        {id:'rdl',s:'4',r:'8',rs:'150s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'calf-mach',s:'5',r:'20',rs:'45s',kg:''},
      ]},
      {name:'Gio — Petto + Schiena (B)',type:'push',rest:false,exercises:[
        {id:'ip',s:'4',r:'10',rs:'90s',kg:''},
        {id:'lat-pull',s:'4',r:'10',rs:'90s',kg:''},
        {id:'bp',s:'4',r:'10',rs:'90s',kg:''},
        {id:'seated-row',s:'4',r:'12',rs:'75s',kg:''},
        {id:'fly',s:'4',r:'15',rs:'45s',kg:''},
        {id:'face-pull-c',s:'4',r:'25',rs:'30s',kg:''},
      ]},
      {name:'Ven — Spalle + Braccia (B)',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'10',rs:'90s',kg:''},
        {id:'lat-mach',s:'5',r:'25',rs:'20s',kg:''},
        {id:'bic-bar',s:'4',r:'12',rs:'75s',kg:''},
        {id:'skull',s:'4',r:'12',rs:'75s',kg:''},
        {id:'bic-db',s:'3',r:'20',rs:'30s',kg:''},
        {id:'tri-rope',s:'3',r:'20',rs:'30s',kg:''},
      ]},
      {name:'Sab — Gambe (B)',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'5',r:'10',rs:'180s',kg:''},
        {id:'hip-thr',s:'4',r:'15',rs:'90s',kg:''},
        {id:'leg-curl',s:'4',r:'15',rs:'75s',kg:''},
        {id:'abductor',s:'3',r:'25',rs:'30s',kg:''},
        {id:'calf-mach',s:'5',r:'25',rs:'30s',kg:''},
        {id:'ab-roll',s:'4',r:'15',rs:'60s',kg:''},
      ]},
      {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

];

gymV44.forEach(p => {
  if (!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
});

})(); // end addGymV44Presets

/* ═══════════════════════════════════════════════════════════════════
   V6 — PRESET SOLO MACCHINARI (machine-first, ogni obiettivo)
   Progettati per chi sceglie "palestra" come ambiente.
   Tutti gli esercizi principali sono su macchinario.
═══════════════════════════════════════════════════════════════════ */
(function addV6MachinePurePresets() {
  const v6MachinePresets = [
    /* 1 — PRINCIPIANTE MACCHINARI */
    {
      id:'mach-beginner-fb',name:'🟢 Macchinari — Principiante Full Body',icon:'🟢',color:'var(--green)',
      t:'full',diff:'beginner',dur:'45',env:'gym',machine_primary:true,
      desc:'Il primo programma da palestra con soli macchinari. Sicuro, guidato, ideale per imparare i pattern motori senza rischio posturale.',
      tags:['principiante','macchinari','full body'],
      days:[
        {label:'A — Full Body',exs:[
          {id:'mac-chest-press',s:'3',r:'12',rs:'75s'},{id:'mac-lat-pull-wide',s:'3',r:'12',rs:'75s'},
          {id:'mac-shoulder-press',s:'3',r:'12',rs:'75s'},{id:'mac-leg-press-45',s:'3',r:'12',rs:'90s'},
          {id:'mac-leg-curl-lying',s:'3',r:'12',rs:'60s'},{id:'mac-ab-crunch-mach',s:'3',r:'15',rs:'60s'},
          {id:'mac-calf-seated',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'B — Full Body',exs:[
          {id:'mac-incl-chest-press',s:'3',r:'12',rs:'75s'},{id:'mac-seated-row-narrow',s:'3',r:'12',rs:'75s'},
          {id:'mac-lateral-raise-mach',s:'3',r:'12',rs:'60s'},{id:'mac-hack-squat',s:'3',r:'10',rs:'90s'},
          {id:'mac-leg-ext',s:'3',r:'12',rs:'60s'},{id:'mac-back-ext-mach',s:'3',r:'15',rs:'60s'},
          {id:'mac-cable-crunch-kn',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'C — Full Body',exs:[
          {id:'mac-pec-deck',s:'3',r:'15',rs:'60s'},{id:'mac-lat-pull-narrow',s:'3',r:'12',rs:'75s'},
          {id:'mac-shoulder-press',s:'3',r:'12',rs:'75s'},{id:'mac-leg-press-45',s:'3',r:'15',rs:'90s'},
          {id:'mac-abductor',s:'3',r:'15',rs:'60s'},{id:'mac-adductor',s:'3',r:'15',rs:'60s'},
          {id:'mac-calf-press',s:'3',r:'15',rs:'60s'}
        ]}
      ]
    },
    /* 2 — IPERTROFIA UPPER/LOWER MACCHINARI */
    {
      id:'mach-upper-lower',name:'⚡ Macchinari — Upper/Lower 4 giorni',icon:'⚡',color:'var(--blue)',
      t:'full',diff:'intermediate',dur:'60',env:'gym',machine_primary:true,
      desc:'Doppio stimolo per ogni distretto muscolare nella settimana. Macchinari come base, cavi per isolamento preciso.',
      tags:['ipertrofia','macchinari','upper lower'],
      days:[
        {label:'Upper A',exs:[
          {id:'mac-chest-press',s:'4',r:'10',rs:'90s'},{id:'mac-incl-chest-press',s:'3',r:'12',rs:'75s'},
          {id:'mac-pec-deck',s:'3',r:'15',rs:'60s'},{id:'mac-lat-pull-wide',s:'4',r:'10',rs:'90s'},
          {id:'mac-seated-row-wide',s:'3',r:'12',rs:'75s'},{id:'mac-cable-pulldown-str',s:'3',r:'15',rs:'60s'},
          {id:'mac-shoulder-press',s:'3',r:'12',rs:'75s'},{id:'mac-cable-lateral',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'Lower A',exs:[
          {id:'mac-leg-press-45',s:'4',r:'10',rs:'120s'},{id:'mac-hack-squat',s:'4',r:'10',rs:'120s'},
          {id:'mac-leg-ext',s:'3',r:'15',rs:'60s'},{id:'mac-leg-curl-lying',s:'4',r:'12',rs:'75s'},
          {id:'mac-hip-thrust-mach',s:'4',r:'12',rs:'90s'},{id:'mac-abductor',s:'3',r:'15',rs:'60s'},
          {id:'mac-calf-seated',s:'4',r:'15',rs:'60s'},{id:'mac-calf-press',s:'3',r:'20',rs:'60s'}
        ]},
        {label:'Upper B',exs:[
          {id:'mac-incl-chest-press',s:'4',r:'10',rs:'90s'},{id:'mac-cable-fly-mid',s:'3',r:'15',rs:'60s'},
          {id:'mac-cable-fly-low',s:'3',r:'15',rs:'60s'},{id:'mac-lat-pull-narrow',s:'4',r:'10',rs:'90s'},
          {id:'mac-chest-supported-row',s:'3',r:'12',rs:'75s'},{id:'mac-cable-rearfly',s:'3',r:'15',rs:'60s'},
          {id:'mac-tri-rope',s:'4',r:'12',rs:'60s'},{id:'mac-bic-cable',s:'4',r:'12',rs:'60s'}
        ]},
        {label:'Lower B',exs:[
          {id:'mac-smith-squat',s:'4',r:'10',rs:'120s'},{id:'mac-leg-press-horiz',s:'3',r:'15',rs:'90s'},
          {id:'mac-leg-curl-seated',s:'4',r:'12',rs:'75s'},{id:'mac-rdl-cable',s:'3',r:'12',rs:'75s'},
          {id:'mac-glute-kickback',s:'4',r:'15',rs:'60s'},{id:'mac-adductor',s:'3',r:'20',rs:'60s'},
          {id:'mac-cable-crunch-kn',s:'3',r:'15',rs:'60s'},{id:'mac-cable-woodchop',s:'3',r:'12',rs:'60s'}
        ]}
      ]
    },
    /* 3 — PUSH PULL LEGS MACCHINARI */
    {
      id:'mach-ppl',name:'💪 Macchinari — Push Pull Legs 6gg',icon:'💪',color:'var(--purple)',
      t:'full',diff:'advanced',dur:'65',env:'gym',machine_primary:true,
      desc:'Il classico PPL rivisitato per chi si allena con macchinari e cavi. Doppio stimolo settimanale per ogni distretto.',
      tags:['ipertrofia','macchinari','ppl','avanzato'],
      days:[
        {label:'Push A',exs:[
          {id:'mac-chest-press',s:'4',r:'8',rs:'120s'},{id:'mac-incl-chest-press',s:'4',r:'10',rs:'90s'},
          {id:'mac-pec-deck',s:'3',r:'15',rs:'60s'},{id:'mac-cable-fly-low',s:'3',r:'15',rs:'60s'},
          {id:'mac-shoulder-press',s:'4',r:'10',rs:'90s'},{id:'mac-cable-lateral',s:'4',r:'15',rs:'60s'},
          {id:'mac-cable-front-raise',s:'3',r:'15',rs:'60s'},{id:'mac-tri-rope',s:'4',r:'12',rs:'60s'},
          {id:'mac-tri-overhead',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'Pull A',exs:[
          {id:'mac-lat-pull-wide',s:'4',r:'8',rs:'120s'},{id:'mac-seated-row-wide',s:'4',r:'10',rs:'90s'},
          {id:'mac-chest-supported-row',s:'3',r:'12',rs:'75s'},{id:'mac-cable-pulldown-str',s:'3',r:'15',rs:'60s'},
          {id:'mac-high-row',s:'3',r:'12',rs:'75s'},{id:'mac-cable-rearfly',s:'4',r:'15',rs:'60s'},
          {id:'mac-cable-facepull',s:'4',r:'20',rs:'60s'},{id:'mac-bic-cable',s:'4',r:'12',rs:'60s'},
          {id:'mac-bic-hammer-cable',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'Legs A',exs:[
          {id:'mac-leg-press-45',s:'4',r:'10',rs:'120s'},{id:'mac-hack-squat',s:'4',r:'10',rs:'120s'},
          {id:'mac-leg-ext',s:'3',r:'15',rs:'60s'},{id:'mac-leg-curl-lying',s:'4',r:'12',rs:'75s'},
          {id:'mac-hip-thrust-mach',s:'4',r:'12',rs:'90s'},{id:'mac-abductor',s:'3',r:'20',rs:'60s'},
          {id:'mac-calf-seated',s:'5',r:'15',rs:'60s'}
        ]},
        {label:'Push B',exs:[
          {id:'mac-incl-chest-press',s:'4',r:'8',rs:'120s'},{id:'mac-decl-chest-press',s:'3',r:'12',rs:'75s'},
          {id:'mac-cable-fly-mid',s:'4',r:'15',rs:'60s'},{id:'mac-shoulder-press',s:'3',r:'10',rs:'90s'},
          {id:'mac-lateral-raise-mach',s:'4',r:'15',rs:'60s'},{id:'mac-cable-front-raise',s:'3',r:'15',rs:'60s'},
          {id:'mac-tri-pushdown',s:'4',r:'12',rs:'60s'},{id:'mac-tri-mach',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'Pull B',exs:[
          {id:'mac-lat-pull-narrow',s:'4',r:'10',rs:'90s'},{id:'mac-lat-pull-rev',s:'3',r:'12',rs:'75s'},
          {id:'mac-seated-row-narrow',s:'4',r:'10',rs:'90s'},{id:'mac-low-row',s:'3',r:'12',rs:'75s'},
          {id:'mac-pullover-mach',s:'3',r:'15',rs:'60s'},{id:'mac-pec-deck-rear',s:'4',r:'15',rs:'60s'},
          {id:'mac-bic-mach',s:'4',r:'12',rs:'60s'},{id:'mac-bic-preacher',s:'3',r:'12',rs:'60s'}
        ]},
        {label:'Legs B',exs:[
          {id:'mac-smith-squat',s:'4',r:'10',rs:'120s'},{id:'mac-leg-press-horiz',s:'4',r:'12',rs:'90s'},
          {id:'mac-leg-curl-seated',s:'4',r:'12',rs:'75s'},{id:'mac-rdl-cable',s:'4',r:'12',rs:'75s'},
          {id:'mac-glute-kickback',s:'3',r:'15',rs:'60s'},{id:'mac-adductor',s:'3',r:'20',rs:'60s'},
          {id:'mac-calf-press',s:'5',r:'15',rs:'60s'}
        ]}
      ]
    },
    /* 4 — DEFINIZIONE / CUT MACCHINARI */
    {
      id:'mach-cut',name:'🎯 Macchinari — Definizione & Cut',icon:'🎯',color:'var(--green)',
      t:'full',diff:'intermediate',dur:'55',env:'gym',machine_primary:true,
      desc:'Circuiti ad alta densità su macchinari. Riposi brevi per massimizzare il consumo calorico preservando la massa muscolare.',
      tags:['definizione','cut','macchinari','dimagrimento'],
      days:[
        {label:'Upper (Cut)',exs:[
          {id:'mac-chest-press',s:'4',r:'15',rs:'60s'},{id:'mac-lat-pull-wide',s:'4',r:'15',rs:'60s'},
          {id:'mac-shoulder-press',s:'3',r:'15',rs:'60s'},{id:'mac-cable-lateral',s:'3',r:'20',rs:'45s'},
          {id:'mac-pec-deck',s:'3',r:'20',rs:'45s'},{id:'mac-cable-rearfly',s:'3',r:'20',rs:'45s'},
          {id:'mac-tri-rope',s:'3',r:'20',rs:'45s'},{id:'mac-bic-cable',s:'3',r:'20',rs:'45s'},
          {id:'mac-cable-crunch-kn',s:'4',r:'20',rs:'45s'}
        ]},
        {label:'Lower (Cut)',exs:[
          {id:'mac-leg-press-45',s:'4',r:'20',rs:'75s'},{id:'mac-hack-squat',s:'3',r:'15',rs:'75s'},
          {id:'mac-leg-ext',s:'4',r:'20',rs:'45s'},{id:'mac-leg-curl-lying',s:'4',r:'20',rs:'45s'},
          {id:'mac-hip-thrust-mach',s:'4',r:'20',rs:'60s'},{id:'mac-abductor',s:'3',r:'25',rs:'45s'},
          {id:'mac-glute-kickback',s:'3',r:'20',rs:'45s'},{id:'mac-calf-press',s:'4',r:'25',rs:'45s'}
        ]},
        {label:'Full Body HIIT macchinari',exs:[
          {id:'mac-leg-press-45',s:'3',r:'20',rs:'60s'},{id:'mac-chest-press',s:'3',r:'20',rs:'60s'},
          {id:'mac-lat-pull-wide',s:'3',r:'20',rs:'60s'},{id:'mac-shoulder-press',s:'3',r:'15',rs:'60s'},
          {id:'mac-leg-ext',s:'3',r:'20',rs:'45s'},{id:'mac-leg-curl-lying',s:'3',r:'20',rs:'45s'},
          {id:'mac-cable-crunch-kn',s:'3',r:'20',rs:'45s'},{id:'mac-treadmill',s:'1',r:'20min HIIT',rs:'0s'}
        ]}
      ]
    },
    /* 5 — FORZA BASE MACCHINARI */
    {
      id:'mach-strength',name:'⚙️ Macchinari — Forza Base',icon:'⚙️',color:'var(--orange)',
      t:'full',diff:'intermediate',dur:'50',env:'gym',machine_primary:true,
      desc:'Carichi pesanti sui grandi macchinari per costruire forza reale. Riposi lunghi, poche serie, qualità massima.',
      tags:['forza','macchinari','strength'],
      days:[
        {label:'Lower Forza',exs:[
          {id:'mac-leg-press-45',s:'5',r:'5',rs:'180s'},{id:'mac-hack-squat',s:'4',r:'6',rs:'150s'},
          {id:'mac-leg-curl-lying',s:'4',r:'8',rs:'120s'},{id:'mac-leg-ext',s:'3',r:'10',rs:'90s'},
          {id:'mac-calf-seated',s:'4',r:'10',rs:'90s'}
        ]},
        {label:'Upper Push Forza',exs:[
          {id:'mac-chest-press',s:'5',r:'5',rs:'180s'},{id:'mac-incl-chest-press',s:'4',r:'6',rs:'150s'},
          {id:'mac-shoulder-press',s:'4',r:'6',rs:'150s'},{id:'mac-tri-pushdown',s:'3',r:'10',rs:'90s'},
          {id:'mac-cable-lateral',s:'3',r:'12',rs:'75s'}
        ]},
        {label:'Upper Pull Forza',exs:[
          {id:'mac-lat-pull-wide',s:'5',r:'5',rs:'180s'},{id:'mac-seated-row-wide',s:'4',r:'6',rs:'150s'},
          {id:'mac-high-row',s:'4',r:'8',rs:'120s'},{id:'mac-bic-cable',s:'3',r:'10',rs:'90s'},
          {id:'mac-cable-facepull',s:'3',r:'15',rs:'75s'}
        ]}
      ]
    },
    /* 6 — GLUTEI & GAMBE DONNA (macchinari) */
    {
      id:'mach-glutes-woman',name:'🍑 Macchinari — Glutei & Shape Donna',icon:'🍑',color:'var(--pink,#f472b6)',
      t:'full',diff:'intermediate',dur:'55',env:'gym',machine_primary:true,
      desc:'Programma femminile su macchinari specializzati per glutei, gambe e postura. Hip thrust, leg press e cavi per una shape equilibrata.',
      tags:['glutei','donna','macchinari','shape'],
      days:[
        {label:'Glutes Heavy',exs:[
          {id:'mac-hip-thrust-mach',s:'5',r:'10',rs:'120s'},{id:'mac-leg-press-45',s:'4',r:'12',rs:'90s'},
          {id:'mac-glute-kickback',s:'4',r:'15',rs:'60s'},{id:'mac-abductor',s:'4',r:'20',rs:'60s'},
          {id:'mac-rdl-cable',s:'4',r:'12',rs:'75s'},{id:'mac-leg-curl-lying',s:'3',r:'15',rs:'60s'},
          {id:'mac-adductor',s:'3',r:'20',rs:'60s'},{id:'mac-calf-seated',s:'3',r:'20',rs:'45s'}
        ]},
        {label:'Upper Shape',exs:[
          {id:'mac-lat-pull-wide',s:'4',r:'12',rs:'75s'},{id:'mac-seated-row-narrow',s:'3',r:'15',rs:'60s'},
          {id:'mac-chest-press',s:'3',r:'12',rs:'75s'},{id:'mac-cable-lateral',s:'4',r:'20',rs:'45s'},
          {id:'mac-cable-rearfly',s:'4',r:'20',rs:'45s'},{id:'mac-bic-cable',s:'3',r:'15',rs:'45s'},
          {id:'mac-tri-rope',s:'3',r:'20',rs:'45s'},{id:'mac-cable-crunch-kn',s:'3',r:'20',rs:'45s'}
        ]},
        {label:'Legs & Cardio',exs:[
          {id:'mac-hack-squat',s:'4',r:'12',rs:'90s'},{id:'mac-leg-ext',s:'4',r:'20',rs:'60s'},
          {id:'mac-leg-curl-seated',s:'4',r:'15',rs:'60s'},{id:'mac-hip-thrust-mach',s:'3',r:'15',rs:'75s'},
          {id:'mac-glute-kickback',s:'3',r:'20',rs:'45s'},{id:'mac-stairmaster',s:'1',r:'20min',rs:'0s'},
          {id:'mac-calf-press',s:'4',r:'20',rs:'45s'}
        ]},
        {label:'Full Body Shape',exs:[
          {id:'mac-leg-press-45',s:'4',r:'15',rs:'75s'},{id:'mac-chest-press',s:'3',r:'15',rs:'60s'},
          {id:'mac-lat-pull-narrow',s:'3',r:'15',rs:'60s'},{id:'mac-hip-thrust-mach',s:'4',r:'15',rs:'75s'},
          {id:'mac-cable-pullthrough',s:'3',r:'15',rs:'60s'},{id:'mac-abductor',s:'3',r:'20',rs:'45s'},
          {id:'mac-cable-woodchop',s:'3',r:'15',rs:'45s'},{id:'mac-ellittica',s:'1',r:'15min',rs:'0s'}
        ]}
      ]
    },
    /* 7 — OVER 50 MACCHINARI */
    {
      id:'mach-over50',name:'🧓 Macchinari — Over 50 & Funzionale',icon:'🧓',color:'var(--teal)',
      t:'full',diff:'beginner',dur:'40',env:'gym',machine_primary:true,
      desc:'Basso impatto articolare, macchinari guidati per sicurezza totale. Forza funzionale, mobilità e prevenzione degli infortuni.',
      tags:['over50','macchinari','funzionale','senior'],
      days:[
        {label:'Full Body A',exs:[
          {id:'mac-chest-press',s:'3',r:'12',rs:'90s'},{id:'mac-lat-pull-wide',s:'3',r:'12',rs:'90s'},
          {id:'mac-shoulder-press',s:'2',r:'12',rs:'90s'},{id:'mac-leg-press-45',s:'3',r:'15',rs:'90s'},
          {id:'mac-leg-curl-lying',s:'3',r:'15',rs:'75s'},{id:'mac-back-ext-mach',s:'3',r:'15',rs:'75s'},
          {id:'mac-ab-crunch-mach',s:'2',r:'15',rs:'60s'},{id:'mac-ellittica',s:'1',r:'10min',rs:'0s'}
        ]},
        {label:'Full Body B',exs:[
          {id:'mac-incl-chest-press',s:'3',r:'12',rs:'90s'},{id:'mac-seated-row-narrow',s:'3',r:'12',rs:'90s'},
          {id:'mac-lateral-raise-mach',s:'2',r:'15',rs:'75s'},{id:'mac-hack-squat',s:'3',r:'12',rs:'90s'},
          {id:'mac-leg-ext',s:'3',r:'15',rs:'75s'},{id:'mac-adductor',s:'2',r:'20',rs:'60s'},
          {id:'mac-calf-seated',s:'3',r:'15',rs:'60s'},{id:'mac-bike',s:'1',r:'10min',rs:'0s'}
        ]},
        {label:'Mobilità + Core',exs:[
          {id:'mac-back-ext-mach',s:'3',r:'15',rs:'75s'},{id:'mac-ab-crunch-mach',s:'3',r:'15',rs:'60s'},
          {id:'mac-rotary-torso',s:'2',r:'15',rs:'60s'},{id:'mac-cable-pallof',s:'2',r:'12',rs:'60s'},
          {id:'mac-leg-press-45',s:'2',r:'20',rs:'75s'},{id:'mac-treadmill',s:'1',r:'20min camminata',rs:'0s'}
        ]}
      ]
    },
    /* 8 — MASSA MUSCOLARE MACCHINARI 3gg */
    {
      id:'mach-mass-3day',name:'🔴 Macchinari — Massa 3 giorni',icon:'🔴',color:'var(--red)',
      t:'full',diff:'intermediate',dur:'60',env:'gym',machine_primary:true,
      desc:'Full body 3 volte a settimana su macchinari con volume alto per massima ipertrofia. Ideale per chi vuole mettere massa.',
      tags:['massa','ipertrofia','macchinari'],
      days:[
        {label:'Full Body Massa A',exs:[
          {id:'mac-chest-press',s:'4',r:'10',rs:'90s'},{id:'mac-incl-chest-press',s:'3',r:'12',rs:'75s'},
          {id:'mac-lat-pull-wide',s:'4',r:'10',rs:'90s'},{id:'mac-seated-row-wide',s:'3',r:'12',rs:'75s'},
          {id:'mac-shoulder-press',s:'3',r:'10',rs:'90s'},{id:'mac-leg-press-45',s:'4',r:'10',rs:'120s'},
          {id:'mac-leg-curl-lying',s:'3',r:'12',rs:'75s'},{id:'mac-tri-rope',s:'3',r:'15',rs:'60s'},
          {id:'mac-bic-cable',s:'3',r:'15',rs:'60s'}
        ]},
        {label:'Full Body Massa B',exs:[
          {id:'mac-pec-deck',s:'4',r:'12',rs:'75s'},{id:'mac-cable-fly-mid',s:'3',r:'15',rs:'60s'},
          {id:'mac-lat-pull-narrow',s:'4',r:'10',rs:'90s'},{id:'mac-chest-supported-row',s:'3',r:'12',rs:'75s'},
          {id:'mac-lateral-raise-mach',s:'4',r:'15',rs:'60s'},{id:'mac-hack-squat',s:'4',r:'10',rs:'120s'},
          {id:'mac-leg-ext',s:'3',r:'15',rs:'60s'},{id:'mac-hip-thrust-mach',s:'4',r:'12',rs:'90s'},
          {id:'mac-calf-seated',s:'4',r:'15',rs:'60s'}
        ]},
        {label:'Full Body Massa C',exs:[
          {id:'mac-decl-chest-press',s:'3',r:'12',rs:'75s'},{id:'mac-cable-fly-low',s:'3',r:'15',rs:'60s'},
          {id:'mac-high-row',s:'4',r:'10',rs:'90s'},{id:'mac-pullover-mach',s:'3',r:'15',rs:'60s'},
          {id:'mac-cable-rearfly',s:'3',r:'20',rs:'45s'},{id:'mac-leg-press-horiz',s:'4',r:'12',rs:'90s'},
          {id:'mac-leg-curl-seated',s:'3',r:'15',rs:'75s'},{id:'mac-bic-preacher',s:'3',r:'12',rs:'60s'},
          {id:'mac-tri-overhead',s:'3',r:'15',rs:'60s'}
        ]}
      ]
    },
  ];

  v6MachinePresets.forEach(p => {
    if (!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
    if (typeof WORKOUT_PRESETS !== 'undefined' && !WORKOUT_PRESETS.find(x=>x.id===p.id)) WORKOUT_PRESETS.push(p);
  });
})();

(function addV45Presets() {
  const v45Presets = [
    /* 1 ─ HIIT Brucia Grassi Express */
    {
      id:'hiit-express-v45', name:'HIIT Brucia Grassi Express', icon:'🔥',
      desc:'4 sessioni settimanali di HIIT ad alta intensità: circuiti brucia-grassi con recupero attivo e finisher metabolico.',
      goals:['fat_loss','endurance'], levels:['intermediate','advanced'],
      diff:'intermediate', dur:'30', type:'calisthenics',
      tags:['HIIT','Fat Loss','Cardio','Intensità Alta'],
      days:[
        {name:'Lun — HIIT Lower Body',type:'workout',exercises:[
          {id:'jump-squat',s:'4',r:'15',rs:'30s'},{id:'lunge',s:'3',r:'12',rs:'30s'},
          {id:'jumping-jack',s:'3',r:'30',rs:'20s'},{id:'mountain-climber',s:'4',r:'20',rs:'30s'}]},
        {name:'Mar — Riposo Attivo',type:'rest',rest:true,exercises:[]},
        {name:'Mer — HIIT Upper Body',type:'workout',exercises:[
          {id:'push-up',s:'4',r:'15',rs:'30s'},{id:'pull-up',s:'3',r:'8',rs:'40s'},
          {id:'burpee',s:'4',r:'10',rs:'40s'},{id:'dip',s:'3',r:'12',rs:'30s'}]},
        {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — HIIT Full Body',type:'workout',exercises:[
          {id:'burpee',s:'5',r:'12',rs:'30s'},{id:'jump-squat',s:'3',r:'15',rs:'30s'},
          {id:'push-up',s:'3',r:'15',rs:'25s'},{id:'mountain-climber',s:'3',r:'25',rs:'25s'}]},
        {name:'Sab — HIIT Cardio Finale',type:'workout',exercises:[
          {id:'jumping-jack',s:'4',r:'40',rs:'20s'},{id:'burpee',s:'3',r:'10',rs:'35s'},
          {id:'lunge',s:'3',r:'16',rs:'30s'},{id:'plank',s:'3',r:'45s',rs:'30s'}]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 2 ─ Forza Funzionale Kettlebell */
    {
      id:'kettlebell-functional-v45', name:'Forza Funzionale Kettlebell', icon:'🔔',
      desc:'3 sessioni con kettlebell: swing, clean & press, snatch e Turkish get-up per forza totale e mobilità.',
      goals:['strength','fat_loss','endurance'], levels:['intermediate','advanced'],
      diff:'intermediate', dur:'45', type:'gym',
      tags:['Kettlebell','Funzionale','Forza','Mobilità'],
      days:[
        {name:'Lun — Kettlebell Lower',type:'workout',exercises:[
          {id:'goblet-sq',s:'4',r:'12',rs:'75s'},{id:'deadlift',s:'4',r:'8',rs:'90s'},
          {id:'lunge',s:'3',r:'10',rs:'60s'},{id:'jump-squat',s:'3',r:'10',rs:'45s'}]},
        {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mer — Kettlebell Upper',type:'workout',exercises:[
          {id:'push-up',s:'4',r:'12',rs:'60s'},{id:'pull-up',s:'4',r:'8',rs:'75s'},
          {id:'dip',s:'3',r:'10',rs:'60s'},{id:'ab-roll',s:'3',r:'12',rs:'60s'}]},
        {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — Kettlebell Full Body',type:'workout',exercises:[
          {id:'goblet-sq',s:'3',r:'15',rs:'60s'},{id:'push-up',s:'3',r:'15',rs:'45s'},
          {id:'pull-up',s:'3',r:'8',rs:'60s'},{id:'deadlift',s:'3',r:'10',rs:'90s'}]},
        {name:'Sab — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 3 ─ Atleta Esplosivo — Sport Performance */
    {
      id:'sport-performance-v45', name:'Atleta Esplosivo — Sport Performance', icon:'⚡',
      desc:'6 giorni per atleti agonisti: potenza esplosiva, agilità, forza massimale e condizionamento specifico per lo sport.',
      goals:['strength','endurance','hypertrophy'], levels:['advanced','athlete'],
      diff:'advanced', dur:'75', type:'gym',
      tags:['Sport','Potenza','Atletismo','Alta Performance'],
      days:[
        {name:'Lun — Potenza Lower',type:'workout',exercises:[
          {id:'squat',s:'5',r:'5',rs:'120s'},{id:'deadlift',s:'4',r:'4',rs:'150s'},
          {id:'lunge',s:'3',r:'8',rs:'75s'},{id:'jump-squat',s:'5',r:'8',rs:'60s'}]},
        {name:'Mar — Potenza Upper',type:'workout',exercises:[
          {id:'bench-press',s:'5',r:'5',rs:'120s'},{id:'pull-up',s:'5',r:'6',rs:'90s'},
          {id:'push-up',s:'3',r:'15',rs:'60s'},{id:'dip',s:'4',r:'10',rs:'75s'}]},
        {name:'Mer — Condizionamento',type:'workout',exercises:[
          {id:'burpee',s:'5',r:'15',rs:'45s'},{id:'mountain-climber',s:'4',r:'30',rs:'30s'},
          {id:'jumping-jack',s:'4',r:'40',rs:'20s'},{id:'plank',s:'3',r:'60s',rs:'45s'}]},
        {name:'Gio — Recupero Attivo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — Full Body Forza',type:'workout',exercises:[
          {id:'squat',s:'4',r:'6',rs:'105s'},{id:'bench-press',s:'4',r:'6',rs:'105s'},
          {id:'pull-up',s:'4',r:'7',rs:'90s'},{id:'deadlift',s:'3',r:'5',rs:'120s'}]},
        {name:'Sab — Esplosività',type:'workout',exercises:[
          {id:'jump-squat',s:'6',r:'6',rs:'90s'},{id:'push-up',s:'4',r:'15',rs:'45s'},
          {id:'pull-up',s:'4',r:'8',rs:'75s'},{id:'burpee',s:'4',r:'12',rs:'50s'}]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 4 ─ Yoga & Mobilità Total Body */
    {
      id:'yoga-mobility-v45', name:'Yoga & Mobilità Total Body', icon:'🧘',
      desc:'5 sessioni settimanali di yoga dinamico e stretching attivo per migliorare flessibilità, postura e recupero.',
      goals:['mobility','endurance'], levels:['zero','beginner','intermediate'],
      diff:'beginner', dur:'40', type:'calisthenics',
      tags:['Yoga','Mobilità','Flessibilità','Postura'],
      days:[
        {name:'Lun — Yoga Mattutino',type:'workout',exercises:[
          {id:'plank',s:'3',r:'45s',rs:'30s'},{id:'hip-thrust',s:'3',r:'15',rs:'45s'},
          {id:'lunge',s:'2',r:'10',rs:'30s'}]},
        {name:'Mar — Stretching Profondo',type:'workout',exercises:[
          {id:'plank',s:'2',r:'60s',rs:'30s'},{id:'hip-thrust',s:'2',r:'20',rs:'30s'},
          {id:'mountain-climber',s:'2',r:'15',rs:'30s'}]},
        {name:'Mer — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Gio — Yoga Serale',type:'workout',exercises:[
          {id:'plank',s:'3',r:'50s',rs:'30s'},{id:'push-up',s:'2',r:'8',rs:'45s'},
          {id:'lunge',s:'2',r:'12',rs:'30s'}]},
        {name:'Ven — Core & Respiro',type:'workout',exercises:[
          {id:'plank',s:'4',r:'45s',rs:'25s'},{id:'ab-roll',s:'2',r:'10',rs:'45s'},
          {id:'mountain-climber',s:'2',r:'20',rs:'30s'}]},
        {name:'Sab — Flow Completo',type:'workout',exercises:[
          {id:'hip-thrust',s:'3',r:'15',rs:'30s'},{id:'lunge',s:'3',r:'12',rs:'30s'},
          {id:'plank',s:'3',r:'45s',rs:'25s'}]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 5 ─ Massa Muscolare Over 40 */
    {
      id:'hypertrophy-over40-v45', name:'Massa Muscolare Over 40', icon:'💪',
      desc:'4 giorni di allenamento ottimizzato per over 40: volume moderato, recupero adeguato e focus sulla qualità del movimento.',
      goals:['hypertrophy','strength'], levels:['beginner','intermediate'],
      diff:'intermediate', dur:'55', type:'gym', ageGroup:'senior',
      tags:['Over 40','Massa','Recupero','Salute'],
      days:[
        {name:'Lun — Upper A',type:'workout',exercises:[
          {id:'bench-press',s:'4',r:'10',rs:'90s'},{id:'cable-row',s:'4',r:'10',rs:'90s'},
          {id:'shoulder-press',s:'3',r:'12',rs:'75s'},{id:'curl-bicep',s:'3',r:'12',rs:'60s'}]},
        {name:'Mar — Lower A',type:'workout',exercises:[
          {id:'squat',s:'4',r:'10',rs:'90s'},{id:'leg-press',s:'3',r:'12',rs:'75s'},
          {id:'leg-curl',s:'3',r:'12',rs:'60s'},{id:'hip-thrust',s:'3',r:'15',rs:'60s'}]},
        {name:'Mer — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Gio — Upper B',type:'workout',exercises:[
          {id:'pull-up',s:'3',r:'8',rs:'90s'},{id:'dip',s:'3',r:'10',rs:'75s'},
          {id:'lat-machine',s:'4',r:'12',rs:'75s'},{id:'curl-bicep',s:'3',r:'15',rs:'60s'}]},
        {name:'Ven — Lower B',type:'workout',exercises:[
          {id:'deadlift',s:'3',r:'8',rs:'105s'},{id:'lunge',s:'3',r:'10',rs:'75s'},
          {id:'leg-press',s:'3',r:'15',rs:'60s'},{id:'ab-roll',s:'3',r:'12',rs:'60s'}]},
        {name:'Sab — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 6 ─ Definizione Donna — Full Body Sculpt */
    {
      id:'sculpt-woman-v45', name:'Definizione Donna — Full Body Sculpt', icon:'🌸',
      desc:'5 sessioni settimanali per donna: circuiti tonificanti con focus su glutei, gambe e core. Perfetto per definizione.',
      goals:['fat_loss','hypertrophy'], levels:['beginner','intermediate'],
      diff:'intermediate', dur:'50', type:'gym', sex:['f'],
      tags:['Donna','Glutei','Tonificazione','Sculpt'],
      days:[
        {name:'Lun — Glutei & Gambe',type:'workout',exercises:[
          {id:'hip-thrust',s:'4',r:'15',rs:'60s'},{id:'lunge',s:'3',r:'12',rs:'60s'},
          {id:'squat',s:'3',r:'15',rs:'60s'},{id:'leg-curl',s:'3',r:'15',rs:'45s'}]},
        {name:'Mar — Upper Toning',type:'workout',exercises:[
          {id:'push-up',s:'3',r:'12',rs:'45s'},{id:'lat-machine',s:'3',r:'12',rs:'60s'},
          {id:'shoulder-press',s:'3',r:'12',rs:'60s'},{id:'curl-bicep',s:'3',r:'15',rs:'45s'}]},
        {name:'Mer — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Gio — Glutei Avanzato',type:'workout',exercises:[
          {id:'hip-thrust',s:'5',r:'15',rs:'60s'},{id:'squat',s:'4',r:'12',rs:'60s'},
          {id:'leg-press',s:'3',r:'15',rs:'60s'},{id:'lunge',s:'3',r:'14',rs:'50s'}]},
        {name:'Ven — Full Body Circuit',type:'workout',exercises:[
          {id:'squat',s:'3',r:'15',rs:'45s'},{id:'push-up',s:'3',r:'10',rs:'40s'},
          {id:'hip-thrust',s:'3',r:'15',rs:'45s'},{id:'mountain-climber',s:'3',r:'20',rs:'35s'}]},
        {name:'Sab — Core & Postura',type:'workout',exercises:[
          {id:'plank',s:'4',r:'45s',rs:'30s'},{id:'ab-roll',s:'3',r:'12',rs:'45s'},
          {id:'hip-thrust',s:'3',r:'20',rs:'45s'}]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 7 ─ Forza Massimale 5x5 */
    {
      id:'strength-5x5-v45', name:'Forza Massimale 5×5', icon:'🏆',
      desc:'Il metodo 5x5 classico: tre sessioni settimanali sui movimenti fondamentali per incrementare la forza massimale.',
      goals:['strength'], levels:['intermediate','advanced'],
      diff:'advanced', dur:'60', type:'gym',
      tags:['5x5','Forza Massimale','Compound','Barbell'],
      days:[
        {name:'Lun — Sessione A',type:'workout',exercises:[
          {id:'squat',s:'5',r:'5',rs:'150s'},{id:'bench-press',s:'5',r:'5',rs:'150s'},
          {id:'cable-row',s:'5',r:'5',rs:'150s'}]},
        {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mer — Sessione B',type:'workout',exercises:[
          {id:'squat',s:'5',r:'5',rs:'150s'},{id:'shoulder-press',s:'5',r:'5',rs:'150s'},
          {id:'deadlift',s:'1',r:'5',rs:'180s'}]},
        {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — Sessione A',type:'workout',exercises:[
          {id:'squat',s:'5',r:'5',rs:'150s'},{id:'bench-press',s:'5',r:'5',rs:'150s'},
          {id:'cable-row',s:'5',r:'5',rs:'150s'}]},
        {name:'Sab — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
    /* 8 ─ Corpo Libero Principiante — Zero a Calisthenics */
    {
      id:'calisthenics-starter-v45', name:'Corpo Libero — Zero a Calisthenics', icon:'🌱',
      desc:'Perfetto per chi inizia da zero: movimenti base del calisthenics con progressione graduale su 4 giorni settimanali.',
      goals:['calisthenics','endurance','fat_loss'], levels:['zero','beginner'],
      diff:'beginner', dur:'35', type:'calisthenics',
      tags:['Principiante','Corpo Libero','Casa','Progressivo'],
      days:[
        {name:'Lun — Corpo Libero Base',type:'workout',exercises:[
          {id:'push-up',s:'3',r:'8',rs:'60s'},{id:'squat',s:'3',r:'12',rs:'45s'},
          {id:'plank',s:'3',r:'20s',rs:'30s'},{id:'lunge',s:'2',r:'10',rs:'45s'}]},
        {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mer — Cardio Leggero',type:'workout',exercises:[
          {id:'jumping-jack',s:'3',r:'30',rs:'30s'},{id:'mountain-climber',s:'3',r:'15',rs:'30s'},
          {id:'push-up',s:'2',r:'8',rs:'45s'},{id:'plank',s:'2',r:'25s',rs:'30s'}]},
        {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — Full Body',type:'workout',exercises:[
          {id:'squat',s:'3',r:'15',rs:'45s'},{id:'push-up',s:'3',r:'10',rs:'45s'},
          {id:'lunge',s:'3',r:'10',rs:'40s'},{id:'mountain-climber',s:'3',r:'15',rs:'30s'}]},
        {name:'Sab — Core Starter',type:'workout',exercises:[
          {id:'plank',s:'3',r:'30s',rs:'30s'},{id:'ab-roll',s:'2',r:'8',rs:'45s'},
          {id:'hip-thrust',s:'3',r:'15',rs:'40s'}]},
        {name:'Dom — Riposo',type:'rest',rest:true,exercises:[]}
      ]
    },
  ];

  v45Presets.forEach(p => {
    if (!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
    if (typeof WORKOUT_PRESETS !== 'undefined' && !WORKOUT_PRESETS.find(x=>x.id===p.id)) WORKOUT_PRESETS.push(p);
  });
})();


/* ═══════════════════════════════════════════════════════════════════
   Scoring multidimensionale: obiettivi fisici, sport, livello, env,
   intensità desiderata, sesso — trova il preset perfetto sempre.
═══════════════════════════════════════════════════════════════════ */
function getRecommendedPreset(goals, level, extraData) {
  return getRecommendedPresetV44(Object.assign({ goals, level }, extraData||{}));
}

window.getRecommendedPresetV34 = function(data) { return getRecommendedPresetV44(data); };

function getRecommendedPresetV44(data) {
  const goals     = data.goals     || ['hypertrophy'];
  const level     = data.level     || 'intermediate';
  const env       = data.env       || 'calisthenics';
  const sex       = data.sex       || 'm';
  const sports    = data.sports    || data.multi?.sports || [];
  const perfs     = data.perfs     || data.multi?.perfs  || [];
  const sportRoles= data.sportRoles|| data.multi?.sportRoles || {};
  const intensity = data.intensity || data.trainingIntensity || 'moderate';
  const eqs       = data.equipment || data.multi?.eqs    || [];
  const age       = parseInt(data.age) || 0;

  const isGym    = env==='gym';
  const isHome   = env==='home';
  const isHybrid = env==='hybrid';
  const isBeg    = ['beginner','zero'].includes(level);
  const isInter  = level==='intermediate';
  const isAdv    = ['advanced','athlete'].includes(level);
  const isFemale = sex==='f';
  const isOld    = age>=50;
  const isMinimal= intensity==='minimal';
  const isHardcore=intensity==='hardcore';

  const hasAnelli = eqs.includes('eq_anelli');
  const hasKB     = eqs.includes('eq_kettlebell');

  const wantStrength    = goals.includes('strength');
  const wantHypertrophy = goals.includes('hypertrophy');
  const wantFatLoss     = goals.includes('fat_loss');
  const wantEndurance   = goals.includes('endurance');
  const wantMobility    = goals.includes('mobility');
  const wantCali        = goals.includes('calisthenics');

  const hasExplosive = perfs.some(p=>['perf_salto','perf_velocita'].includes(p));
  const hasGrip      = perfs.includes('perf_grip');
  const hasMobPerf   = perfs.includes('perf_flessibilita') || wantMobility;
  const hasBraccia   = perfs.includes('perf_potenza_braccia');
  const hasSkill     = perfs.includes('perf_skill_cali') || wantCali;
  const hasResist    = perfs.includes('perf_resistenza') || wantEndurance;
  const hasSpalle    = perfs.includes('perf_spalle');
  const hasGlutei    = perfs.includes('perf_gambe');

  const sportRoleKeys = Object.keys(sportRoles);

  // --- SPORT CON RUOLO ---
  if (sportRoles['nuoto'] || sports.some(s=>['sport_nuoto','nuoto'].includes(s))) {
    if (!isBeg) return 'sport-nuoto';
  }
  if (sportRoles['boxe'] || sportRoles['judo'] || sports.some(s=>['sport_arti_marziali','boxe','judo'].includes(s))) {
    if (!isBeg) return 'sport-arti-marziali';
  }
  if (sportRoles['arrampicata']) return 'grip-arms';
  if (sportRoles['powerlifting'] || goals.includes('powerlifting')) return isGym ? 'gym-powerbuilding' : 'forza';
  if (sportRoles['crossfit']) return 'kettlebell-full';
  if (sportRoles['ginnastica'] || sportRoles['danza']) return 'mobility-strength';
  const atleticaRole = sportRoles['atletica'];
  if (atleticaRole === 'velocista' || atleticaRole === 'saltatore') return isAdv ? 'explosive-advanced' : 'explosive-beginner';
  if (atleticaRole === 'fondo' || atleticaRole === 'mezzofondo') return 'sport-calcio';
  if (sportRoles['basket'] || sports.some(s=>['sport_basket','basket'].includes(s))) {
    return isAdv ? 'explosive-advanced' : 'explosive-beginner';
  }
  const isTeamSport = sports.some(s=>['sport_calcio','calcio','sport_volley','pallavolo','sport_rugby','rugby'].includes(s))
    || ['calcio','pallavolo','rugby'].some(s=>sportRoleKeys.includes(s));
  if (isTeamSport && !isBeg) {
    const isJumpSport = sports.some(s=>['sport_volley','pallavolo'].includes(s)) || sportRoles['pallavolo'];
    if (isJumpSport && isAdv) return 'explosive-advanced';
    return 'sport-calcio';
  }

  // --- OBIETTIVI FISICI ---
  if (hasExplosive && isAdv) return 'explosive-advanced';
  if (hasExplosive) return 'explosive-beginner';
  if (hasGrip && hasBraccia && !isBeg) return 'grip-arms';
  if (hasMobPerf && hasSkill) return 'mobility-strength';
  if (hasMobPerf && !isGym) return 'mobility-full';
  if (hasAnelli && hasSkill && !isBeg) return 'rings-beginner';
  if (hasKB && !isBeg && !isGym) return 'kettlebell-full';

  // --- OVER 50 ---
  if (isOld && isGym) return 'gym-over50';

  // --- MINIMAL ---
  if (isMinimal) return isGym ? 'gym-strength-3day' : 'med-2day';

  // --- GYM ---
  if (isGym || isHybrid) {
    if (isHybrid && isAdv && wantStrength) return 'hybrid-strength';
    if (isHybrid && !isBeg) return 'hybrid-ppl';
    if (isHybrid) return 'hybrid-starter';
    // Donna
    if (isFemale) {
      if (hasGlutei || hasSpalle) return isAdv ? 'gym-powerbuilding-f' : 'gym-glutes-focus';
      if (isAdv && isHardcore) return 'gym-powerbuilding-f';
      if (isAdv) return 'gym-powerbuilding-f';
      if (isInter && isHardcore) return 'gym-woman-5day';
      if (wantFatLoss) return 'gym-cut';
      return 'gym-shape-f';
    }
    // Spalle focus uomo
    if (hasSpalle && isAdv) return 'gym-shoulders-focus';

    // ── V6: RILEVAMENTO PREFERENZA MACCHINARI ──────────────────
    // Se l'utente ha scelto solo palestra (env=gym) senza corpo libero/sbarra,
    // oppure ha attrezzatura machine-oriented → usa preset machine-primary
    const hasFreeWeightOnly = eqs.some(e=>['eq_sbarra','eq_anelli'].includes(e));
    const hasMachineEq = eqs.some(e=>['eq_chest_press','eq_lat_machine','eq_leg_press',
      'eq_hack_squat','eq_leg_curl','eq_leg_ext','eq_shoulder_press','eq_cable_torre',
      'eq_rematore_cavi','eq_leg_press'].includes(e));
    // Se ha esplicitamente macchinari O se ha solo palestra senza sbarre
    const machinePrimary = hasMachineEq || (!hasFreeWeightOnly && isGym && eqs.length >= 0);

    if (machinePrimary && !hasFreeWeightOnly) {
      if (isOld) return 'mach-over50';
      if (isFemale) {
        if (wantFatLoss) return 'mach-cut';
        if (hasGlutei) return 'mach-glutes-woman';
        if (isAdv) return 'mach-ppl';
        if (isInter) return 'mach-upper-lower';
        return 'mach-beginner-fb';
      }
      if (wantFatLoss && !wantStrength) return 'mach-cut';
      if (wantStrength && !wantHypertrophy) return 'mach-strength';
      if (wantHypertrophy) {
        if (isAdv && isHardcore) return 'mach-ppl';
        if (isAdv) return 'mach-ppl';
        if (isInter) return 'mach-upper-lower';
        return 'mach-mass-3day';
      }
      if (isAdv) return 'mach-ppl';
      if (isInter) return 'mach-upper-lower';
      if (isBeg) return 'mach-beginner-fb';
    }
    // ── fine logica machine ─────────────────────────────────────

    // Taglio
    if (wantFatLoss && !wantStrength) return 'gym-cut';
    // Forza pura
    if (wantStrength && !wantHypertrophy) {
      return (isBeg || isInter) ? 'gym-strength-3day' : 'gym-powerbuilding';
    }
    // Powerbuilding
    if (wantStrength && wantHypertrophy && isAdv) return 'gym-powerbuilding';
    // Ipertrofia
    if (wantHypertrophy) {
      if (isAdv && isHardcore) return 'gym-arnold-6day';
      if (isAdv && intensity==='serious') return 'gym-ppl-6day';
      if (isAdv) return 'gym-ppl-6day';
      if (isInter && intensity==='serious') return 'gym-upper-lower-4';
      if (isInter) return 'gym-ppl-3day';
      return 'gym-beginner-3day';
    }
    // Default per livello
    if (isAdv) return 'gym-ppl-6day';
    if (isInter) return 'gym-upper-lower-4';
    return 'gym-beginner-3day';
  }

  // --- CASA ---
  if (isHome) {
    if (wantFatLoss || wantEndurance) return isBeg ? 'hiit-beginner' : 'hiit';
    return isBeg ? 'casa-starter' : 'casa-cal';
  }

  // --- CALISTHENICS ---
  if (wantFatLoss && wantEndurance) return isAdv ? 'hiit-advanced' : 'hiit';
  if (hasSkill && isAdv) return 'cali-skill';
  if (hasSkill && isInter) return 'cali-intermediate';
  if (hasSkill) return 'cali-starter';
  if (wantStrength && isAdv) return 'forza';
  if (wantStrength) return 'forza-base';
  if (wantHypertrophy && isAdv) return 'cali5';
  if (wantHypertrophy && isInter) return 'cali-intermediate';
  if (wantHypertrophy) return 'full-beginner';
  if (isInter) return 'full-intermediate';
  if (isBeg) return 'cali-starter';
  return 'cali-intermediate';
}

// ── STATE ─────────────────────────────────
var profile={
  name:'', level:'', goals:[], days:'5',
  kcalTarget:2500, macros:{p:180,c:280,g:70}, tdee:2500,
  physique:{age:17,weight:70,height:175,sex:'m',activity:1.55},
  weeklyWorkoutsTarget:3,
  /* ── Obiettivi strutturati (formato canonico) ── */
  goalsMeta: {
    calories:  2500,
    weight:    70,
    goalType:  'maintain'   // 'cut' | 'bulk' | 'maintain'
  },
  /* ── Storico peso (max 50 voci) ── */
  weightHistory: []
};

/* ════════════════════════════════════════════════════════════════
   SAFE NUMBER — validazione numerica centralizzata
   Usata per sets, reps, peso, calorie.
   Tutti i parseFloat / parseInt sensibili passano da qui.
════════════════════════════════════════════════════════════════ */
function safeNumber(val, min, max, fallback) {
  let n = parseFloat(val);
  if (isNaN(n) || !isFinite(n)) return fallback;
  if (n < min) n = min;
  if (n > max) n = max;
  return n;
}

/* Wrappers semantici per leggibilità */
const safeSets    = (v) => safeNumber(v, 1,   20,   3);
const safeReps    = (v) => safeNumber(v, 1,  100,  10);
const safeWeight  = (v) => safeNumber(v, 0,  500,   0);
const safeKcal    = (v) => safeNumber(v, 0, 9999,   0);

/* ================================================================
   GOALS — profile.goals = SEMPRE un array ['hypertrophy', ...]
           profile.goalsMeta = { calories, weight, goalType }
   I due concetti sono separati e non si sovrascrivono mai.
================================================================ */

/** Garantisce che profile.goals sia SEMPRE un array di stringhe */
function _ensureGoalsArray(){
  if(profile.goals && !Array.isArray(profile.goals) && typeof profile.goals === 'object'){
    // Bug legacy: goals era un oggetto — spostalo in goalsMeta
    if(!profile.goalsMeta) profile.goalsMeta = { ...profile.goals };
    profile.goals = [];
  }
  if(!Array.isArray(profile.goals)) profile.goals = [];
  return profile.goals;
}

/** Garantisce che profile.goalsMeta sia un oggetto strutturato */
function _ensureGoals(){
  _ensureGoalsArray();
  if(!profile.goalsMeta || typeof profile.goalsMeta !== 'object'){
    profile.goalsMeta = {
      calories: profile.kcalTarget || 2500,
      weight:   profile.physique?.weight || 70,
      goalType: 'maintain'
    };
  }
  if(!['cut','bulk','maintain'].includes(profile.goalsMeta.goalType)){
    profile.goalsMeta.goalType = 'maintain';
  }
  return profile.goalsMeta;
}

function sanitizeRuntimeState(){
  if(!profile || typeof profile !== 'object') profile = {};
  profile.name = (profile.name || '').toString().trim();
  profile.level = ['zero','beginner','intermediate','advanced','athlete'].includes(profile.level) ? profile.level : 'intermediate';
  profile.days = String(safeNumber(profile.days, 1, 7, 5));
  profile.kcalTarget = safeKcal(profile.kcalTarget) || 2500;
  profile.tdee = safeKcal(profile.tdee) || profile.kcalTarget || 2500;
  profile.macros = {
    p: safeNumber(profile.macros?.p, 0, 500, 180),
    c: safeNumber(profile.macros?.c, 0, 800, 280),
    g: safeNumber(profile.macros?.g, 0, 300, 70)
  };
  profile.physique = {
    age: safeNumber(profile.physique?.age, 13, 90, 17),
    weight: safeWeight(profile.physique?.weight) || 70,
    height: safeNumber(profile.physique?.height, 100, 250, 175),
    sex: profile.physique?.sex === 'f' ? 'f' : 'm',
    activity: safeNumber(profile.physique?.activity, 1.0, 2.5, 1.55)
  };
  _ensureGoals();
  if(!Array.isArray(sessions)) sessions = [];
  if(!nutrition || typeof nutrition !== 'object') nutrition = {};
  if(!metrics || typeof metrics !== 'object') metrics = {};
  if(!pbs || typeof pbs !== 'object') pbs = {};
  // Protezione extra: rimuovi sessioni corrotte (senza date valide)
  sessions = sessions.filter(function(s){ return s && s.date; });
  if(profile.generatedPlan && !Array.isArray(profile.generatedPlan.schedule)){
    profile.generatedPlan = null;
  }
}

function updateGoals(newGoals){
  _ensureGoals();
  profile.goalsMeta = { ...profile.goalsMeta, ...newGoals };
  if(newGoals.calories !== undefined)
    profile.kcalTarget = safeKcal(newGoals.calories) || profile.kcalTarget;
  saveAll();
}

function goalsFromGoalType(goalType){
  if(goalType === 'cut') return ['fat_loss'];
  if(goalType === 'bulk') return ['hypertrophy','strength'];
  return ['hypertrophy'];
}

function derivePlanNumbersFromGoalType(goalType, tdee, weight){
  const baseTdee = safeKcal(tdee) || 2500;
  const bw = safeWeight(weight) || 70;
  let kcal = baseTdee;
  if(goalType === 'cut') kcal = Math.round(baseTdee * 0.82);
  else if(goalType === 'bulk') kcal = Math.round(baseTdee * 1.12);
  kcal = Math.max(1200, safeKcal(kcal) || 2500);
  const p = Math.round(bw * (goalType === 'bulk' ? 2.2 : goalType === 'cut' ? 2.0 : 1.8));
  const g = Math.round(kcal * 0.25 / 9);
  const c = Math.max(0, Math.round((kcal - p*4 - g*9) / 4));
  return { kcal, macros: { p, c, g } };
}

/* ═══════════════════════════════════════════════════════════════
   MODAL IN-APP — sostituisce tutti i prompt() nativi del profilo
   Un unico helper che genera un bottom-sheet coerente con l'app.
═══════════════════════════════════════════════════════════════ */
function _showProfileModal(cfg) {
  // cfg: { title, fields:[{id,label,type,value,min,max,options}], onSave }
  document.getElementById('_ft-profile-modal')?.remove();
  const ovl = document.createElement('div');
  ovl.id = '_ft-profile-modal';
  ovl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9800;display:flex;align-items:flex-end;backdrop-filter:blur(10px);';

  const fieldsHtml = cfg.fields.map(f => {
    if (f.type === 'select') {
      const opts = f.options.map(o =>
        `<option value="${o.v}" ${String(f.value)===String(o.v)?'selected':''}>${o.l}</option>`
      ).join('');
      return `<div style="margin-bottom:14px;">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:6px;">${f.label}</div>
        <select id="pfm-${f.id}" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r);padding:12px 14px;font-family:'Syne',sans-serif;font-size:14px;color:var(--text);outline:none;cursor:pointer;">
          ${opts}
        </select>
      </div>`;
    }
    return `<div style="margin-bottom:14px;">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:6px;">${f.label}</div>
      <input id="pfm-${f.id}" type="${f.type||'text'}" value="${f.value||''}"
        ${f.min!=null?'min="'+f.min+'"':''} ${f.max!=null?'max="'+f.max+'"':''}
        style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r);padding:12px 14px;font-family:'Syne',sans-serif;font-size:16px;color:var(--text);outline:none;transition:border-color .15s;"
        onfocus="this.style.borderColor='var(--acc)'" onblur="this.style.borderColor='var(--border)'">
    </div>`;
  }).join('');

  ovl.innerHTML = `
    <div style="background:var(--bg2);border-radius:24px 24px 0 0;width:100%;padding:24px 20px calc(32px + env(safe-area-inset-bottom));max-height:88vh;overflow-y:auto;">
      <div style="width:40px;height:4px;border-radius:4px;background:var(--border2);margin:0 auto 20px;"></div>
      <div style="font-size:18px;font-weight:800;margin-bottom:20px;">${cfg.title}</div>
      ${fieldsHtml}
      <div style="display:flex;gap:10px;margin-top:6px;">
        <button onclick="document.getElementById('_ft-profile-modal').remove()"
          style="flex:1;padding:13px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text2);cursor:pointer;">
          Annulla
        </button>
        <button id="_pfm-save-btn"
          style="flex:2;padding:13px;background:var(--acc);color:#080810;border:none;border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;">
          ✓ Salva
        </button>
      </div>
    </div>`;

  document.body.appendChild(ovl);
  ovl.addEventListener('click', e => { if (e.target === ovl) ovl.remove(); });

  document.getElementById('_pfm-save-btn').onclick = () => {
    const vals = {};
    cfg.fields.forEach(f => {
      const el = document.getElementById('pfm-' + f.id);
      vals[f.id] = el ? el.value : '';
    });
    const err = cfg.onSave(vals);
    if (!err) ovl.remove();
    else showToast('⚠️ ' + err);
  };
}

/** Opens a modal to edit calories, weight goal and goalType */
function editGoalsPrompt(){
  _ensureGoals();
  const g = profile.goalsMeta;
  _showProfileModal({
    title: '🎯 Obiettivi',
    fields: [
      { id:'kcal', label:'Calorie giornaliere (kcal)', type:'number', value: g.calories||profile.kcalTarget||2500, min:1000, max:8000 },
      { id:'weight', label:'Peso obiettivo (kg)', type:'number', value: g.weight||profile.physique?.weight||70, min:30, max:300 },
      { id:'goalType', label:'Tipo obiettivo', type:'select', value: g.goalType||'maintain',
        options:[{v:'cut',l:'📉 Definizione (Cut)'},{v:'maintain',l:'⚖️ Mantenimento'},{v:'bulk',l:'📈 Massa (Bulk)'}] },
    ],
    onSave(vals) {
      const kcal = safeKcal(vals.kcal);
      if(!kcal) return 'Valore calorie non valido (1000–8000)';
      const wt = safeNumber(vals.weight, 30, 300, null);
      if(wt===null) return 'Peso obiettivo non valido (30–300 kg)';
      updateGoals({ calories:kcal, weight:wt, goalType:vals.goalType });
      renderProfilePage();
      showToast('✅ Obiettivi salvati');
    }
  });
}

/* ─── Singoli modal di modifica ──────────────────────────────── */

function editLevelPrompt(){
  _showProfileModal({
    title: '🏅 Livello',
    fields:[{ id:'level', label:'Il tuo livello attuale', type:'select', value:profile.level||'intermediate',
      options:[{v:'beginner',l:'🌱 Principiante'},{v:'intermediate',l:'💪 Intermedio'},{v:'advanced',l:'⚡ Avanzato'},{v:'athlete',l:'🏆 Atleta'}] }],
    onSave(vals){
      profile.level = vals.level;
      saveAll(); renderProfilePage();
      showToast('✅ Livello aggiornato');
    }
  });
}

function editSexPrompt(){
  _showProfileModal({
    title: '👤 Sesso',
    fields:[{ id:'sex', label:'Sesso biologico', type:'select', value:profile.physique?.sex||'m',
      options:[{v:'m',l:'♂ Maschio'},{v:'f',l:'♀ Femmina'}] }],
    onSave(vals){
      profile.physique = { ...(profile.physique||{}), sex:vals.sex };
      saveAll(); renderProfilePage();
      showToast('✅ Sesso aggiornato');
    }
  });
}

function editAgePrompt(){
  _showProfileModal({
    title: '🎂 Età',
    fields:[{ id:'age', label:'La tua età (anni)', type:'number', value:profile.physique?.age||25, min:13, max:90 }],
    onSave(vals){
      const v = safeNumber(vals.age, 13, 90, null);
      if(v===null) return 'Età non valida (13–90)';
      profile.physique = { ...(profile.physique||{}), age:v };
      saveAll(); renderProfilePage();
      showToast('✅ Età: ' + v + ' anni');
    }
  });
}

function editHeightPrompt(){
  _showProfileModal({
    title: '📏 Altezza',
    fields:[{ id:'height', label:'Altezza (cm)', type:'number', value:profile.physique?.height||175, min:100, max:250 }],
    onSave(vals){
      const v = safeNumber(vals.height, 100, 250, null);
      if(v===null) return 'Altezza non valida (100–250 cm)';
      profile.physique = { ...(profile.physique||{}), height:v };
      saveAll(); renderProfilePage();
      showToast('✅ Altezza: ' + v + ' cm');
    }
  });
}

function editDaysPrompt(){
  _showProfileModal({
    title: '📅 Giorni allenamento',
    fields:[{ id:'days', label:'Sessioni a settimana (1–7)', type:'number', value:profile.days||'3', min:1, max:7 }],
    onSave(vals){
      const v = safeNumber(vals.days, 1, 7, null);
      if(v===null) return 'Valore non valido (1–7)';
      profile.days = String(v);
      saveAll(); renderProfilePage();
      showToast('✅ Giorni: ' + v + '/settimana');
    }
  });
}

function editMacrosPrompt(){
  const m = profile.macros || {p:180,c:280,g:70};
  _showProfileModal({
    title: '🥦 Macronutrienti',
    fields:[
      { id:'p', label:'Proteine (g)', type:'number', value:m.p, min:0, max:500 },
      { id:'c', label:'Carboidrati (g)', type:'number', value:m.c, min:0, max:800 },
      { id:'g', label:'Grassi (g)', type:'number', value:m.g, min:0, max:300 },
    ],
    onSave(vals){
      const p=safeNumber(vals.p,0,500,null), c=safeNumber(vals.c,0,800,null), g=safeNumber(vals.g,0,300,null);
      if(p===null||c===null||g===null) return 'Valori non validi';
      profile.macros = {p,c,g};
      const fromMacros = Math.round(p*4+c*4+g*9);
      if(fromMacros>0){ profile.kcalTarget=fromMacros; updateGoals({calories:fromMacros}); }
      saveAll(); renderProfilePage();
      showToast('✅ Macro salvati · ' + fromMacros + ' kcal');
    }
  });
}

function editPresetPrompt(){
  const opts = [{v:'',l:'— Nessuno —'}].concat(
    PRESETS_DATA.map(p => ({v:p.id, l:p.icon+' '+p.name}))
  );
  _showProfileModal({
    title: '🏋️ Programma attivo',
    fields:[{ id:'preset', label:'Seleziona programma', type:'select', value:profile.recPreset||'', options:opts }],
    onSave(vals){
      profile.recPreset = vals.preset;
      saveAll(); renderProfilePage();
      const p = PRESETS_DATA.find(x=>x.id===vals.preset);
      showToast('✅ Programma: ' + (p ? p.name : 'Nessuno'));
    }
  });
}

/* ─── logWeightPrompt — usa modal in-app ─────────────────── */
function logWeightPrompt(){
  _showProfileModal({
    title: '⚖️ Peso attuale',
    fields:[{ id:'weight', label:'Peso attuale (kg)', type:'number', value:profile.physique?.weight||70, min:20, max:400 }],
    onSave(vals){
      const w = safeNumber(vals.weight, 20, 400, null);
      if(w===null) return 'Peso non valido (20–400 kg)';
      updateWeight(w);
      renderProfilePage();
      showToast('✅ Peso: ' + w + ' kg');
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   WEIGHT HISTORY — storico peso (max 50 voci)
════════════════════════════════════════════════════════════════ */
function updateWeight(newWeight) {
  const w = safeNumber(newWeight, 20, 400, null);
  if (w === null) { console.warn('[Weight] Valore non valido:', newWeight); return; }

  profile.physique = profile.physique || {};
  profile.physique.weight = w;

  if (!Array.isArray(profile.weightHistory)) profile.weightHistory = [];
  profile.weightHistory.push({ value: w, date: new Date().toISOString() });

  if (profile.weightHistory.length > 50) profile.weightHistory.shift();

  // Keep profile.goalsMeta.weight in sync
  _ensureGoals();
  if(w !== null) profile.goalsMeta.weight = w;

  saveAll();
}

let sessions=[], nutrition={}, metrics={}, pbs={};
let editProg=null, sheetDayIdx=null, exFilter='all', addFoodMeal=null;
let woActive=false, woProgram=null, woDayData=null, woSets={}, woWeights={}, woStart=null, woTimer=null;
let restTot=75, restLeft=75, restInterval=null;
let trainingTypeFilter='all', libFilter='all';

// ── TDEE ──────────────────────────────────
let _tdeeVal = 0;
let _weightGoalData = {};
function calcTDEE() {
  const age    = parseFloat(document.getElementById('ob-age')?.value)||0;
  const weight = safeNumber(document.getElementById('ob-weight')?.value, 20, 400, 0);
  const height = parseFloat(document.getElementById('ob-height')?.value)||0;
  const sex    = document.getElementById('ob-sex')?.value||'m';
  const act    = parseFloat(document.getElementById('ob-activity')?.value)||1.55;

  if(!age||!weight||!height){
    const _trw0=document.getElementById('tdee-result-wrap');
    if(_trw0){
      _trw0.style.display='block';
      const box=document.getElementById('tdee-result-box');
      if(box) box.innerHTML='<div style="text-align:center;padding:16px;color:var(--text3);font-size:13px;">👆 Compila età, peso e altezza per calcolare le calorie</div>';
    }
    return;
  }

  // Mifflin-St Jeor
  let bmr = sex==='m'
    ? 10*weight + 6.25*height - 5*age + 5
    : 10*weight + 6.25*height - 5*age - 161;
  let tdee = Math.round(bmr * act);
  _tdeeVal = tdee;

  // Adjust for goal
  const goals = obGoals;
  let kcalTarget = tdee;
  if(goals.includes('fat_loss')) kcalTarget = Math.round(tdee * 0.82);
  else if(goals.includes('hypertrophy')||goals.includes('strength')) kcalTarget = Math.round(tdee * 1.12);
  else if(goals.includes('endurance')) kcalTarget = Math.round(tdee * 1.05);

  const proteinG = Math.round((weight * (goals.includes('hypertrophy')||goals.includes('strength') ? 2.2 : 1.8)));
  const fatG     = Math.round(kcalTarget * 0.25 / 9);
  const carbsG   = Math.round((kcalTarget - proteinG*4 - fatG*9) / 4);

  let goalLabel = 'Mantenimento';
  if(goals.includes('fat_loss')) goalLabel = 'Deficit (-18%) per definizione';
  else if(goals.includes('hypertrophy')||goals.includes('strength')) goalLabel = 'Surplus (+12%) per massa';
  else if(goals.includes('endurance')) goalLabel = 'Surplus leggero (+5%) per resistenza';

  document.getElementById('tdee-result-wrap').style.display='block';
  document.getElementById('tdee-result-box').innerHTML=`
    <div class="tdee-result-title">⚡ Calorie Calcolate — Formula Mifflin-St Jeor</div>
    <div class="tdee-result-kcal">${kcalTarget}</div>
    <div class="tdee-result-sub">
      TDEE di base: <strong>${tdee} kcal</strong> · ${goalLabel}
    </div>
    <div class="tdee-macros">
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--green)">${proteinG}g</div><div class="tdee-macro-lbl">Proteine</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--blue)">${carbsG}g</div><div class="tdee-macro-lbl">Carbs</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--orange)">${fatG}g</div><div class="tdee-macro-lbl">Grassi</div></div>
    </div>`;

  // Store temporarily
  window._tempKcal = kcalTarget;
  window._tempMacros = {p:proteinG, c:carbsG, g:fatG};
  window._tempPhysique = {age,weight,height,sex,activity:act};

  // Re-run weight goal if already entered
  calcWeightGoal();
}

function calcWeightGoal() {
  const currentWeight = safeNumber(document.getElementById('ob-weight')?.value, 20, 400, 0);
  const goalWeight    = safeNumber(document.getElementById('ob-goal-weight')?.value, 20, 400, 0);
  const pace          = parseFloat(document.getElementById('ob-pace')?.value)||0.5;
  if(!currentWeight||!goalWeight){ document.getElementById('weight-goal-result').style.display='none'; return; }

  const diff = goalWeight - currentWeight;
  const absDiff = Math.abs(diff);
  const isGain = diff > 0;
  const isSame = Math.abs(diff) < 0.5;

  let kcalAdjust = 0;
  let weeks = 0;
  let months = 0;
  let dateTarget = '';

  if(isSame){
    kcalAdjust = 0;
    weeks = 0;
  } else {
    // 7700 kcal = 1 kg
    const weeklyKcalDelta = pace * 7700 / 7; // kcal/day surplus or deficit
    kcalAdjust = isGain ? Math.round(weeklyKcalDelta) : -Math.round(weeklyKcalDelta);
    weeks = Math.ceil(absDiff / pace);
    months = (weeks / 4.33).toFixed(1);
    const d = new Date(); d.setDate(d.getDate() + weeks*7);
    dateTarget = d.toLocaleDateString('it-IT', {month:'long', year:'numeric'});
  }

  // Usa sempre il TDEE base reale, non il precedente target già corretto.
  const baseTdee = safeKcal(_tdeeVal || profile?.tdee) || 2500;
  const rawFinalKcal = baseTdee + kcalAdjust;
  const sex = document.getElementById('ob-sex')?.value || 'm';
  const minSafe = sex === 'f' ? 1200 : 1500;
  const finalKcal = Math.max(minSafe, rawFinalKcal);
  const goalFloored = rawFinalKcal < minSafe;
  window._tempKcal = finalKcal;

  const weight = safeNumber(document.getElementById('ob-weight')?.value, 20, 400, 70);
  const goals = obGoals;
  const proteinG = Math.round(weight * (goals.includes('hypertrophy')||goals.includes('strength') ? 2.2 : 1.8));
  const fatG = Math.round(finalKcal * 0.25 / 9);
  const carbsG = Math.round((finalKcal - proteinG*4 - fatG*9) / 4);
  window._tempMacros = {p:proteinG, c:carbsG, g:fatG};

  _weightGoalData = {goalWeight, diff, isGain, isSame, weeks, months, dateTarget, finalKcal,
    startWeight: weight,  // peso al momento della creazione obiettivo
    createdAt: new Date().toISOString()};

  const diffLabel = isSame ? 'Mantenimento del peso attuale' :
    isGain ? `+${absDiff.toFixed(1)} kg da guadagnare` : `-${absDiff.toFixed(1)} kg da perdere`;
  const icon = isSame ? '⚖️' : isGain ? '📈' : '📉';
  const timeLabel = isSame ? '—' : `~${weeks} settimane (~${months} mesi)`;
  const endLabel = isSame ? '' : `Obiettivo stimato: <b>${dateTarget}</b>`;
  const floorWarn = goalFloored ? `<div style="margin-top:10px;background:rgba(255,154,60,.12);border:1px solid rgba(255,154,60,.3);border-radius:8px;padding:8px 12px;font-size:11px;color:var(--orange);">⚠️ Con questo ritmo il calcolo darebbe <strong>${Math.round(rawFinalKcal)} kcal</strong>, sotto il minimo sicuro. Target portato a ${minSafe} kcal/giorno — considera un ritmo più graduale (±0.25 kg/sett) per un deficit sostenibile.</div>` : '';

  document.getElementById('weight-goal-result').style.display='block';
  document.getElementById('weight-goal-box').innerHTML=`
    <div class="tdee-result-title">${icon} Piano di trasformazione</div>
    <div class="tdee-result-kcal">${finalKcal}</div>
    <div class="tdee-result-sub">kcal/giorno · ${diffLabel}</div>
    <div style="font-size:12px;color:var(--text2);margin-top:8px;line-height:1.7">
      ⏱ Tempo stimato: <b style="color:var(--acc)">${timeLabel}</b><br>
      ${endLabel}
      ${!isSame?`<br>📉 Deficit/surplus: <b>${Math.abs(kcalAdjust)} kcal/giorno</b>`:''}
    </div>
    ${floorWarn}
    <div class="tdee-macros" style="margin-top:10px">
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--green)">${proteinG}g</div><div class="tdee-macro-lbl">Proteine</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--blue)">${carbsG}g</div><div class="tdee-macro-lbl">Carbs</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--orange)">${fatG}g</div><div class="tdee-macro-lbl">Grassi</div></div>
    </div>`;
}

// ── ONBOARDING ────────────────────────────
let obSel={}, obGoals=[], obCurStep=0;
window._ftOnboardingActive = false; // true mentre onboarding è aperto

// Safety: se _ftOnboardingActive resta true per più di 15 minuti, resetta
(function() {
  var _obWatchdog = null;
  Object.defineProperty(window, '_ftOnboardingActive', {
    get: function() { return window.__ftOBActive; },
    set: function(v) {
      window.__ftOBActive = v;
      clearTimeout(_obWatchdog);
      if (v === true) {
        // Onboarding avviato — watchdog 15 minuti
        _obWatchdog = setTimeout(function() {
          if (window.__ftOBActive) {
            console.warn('[FitTrack] _ftOnboardingActive watchdog scattato — reset forzato');
            window.__ftOBActive = false;
          }
        }, 15 * 60 * 1000);
      }
    },
    configurable: true
  });
})();

const OB_TOTAL = 16; // steps 0..15

// New sequential navigation using ob_s{N} IDs
function obNext(step) {
  // Validation on forward navigation
  if(step > obCurStep) {
    if(obCurStep===0 && !document.getElementById('ob-name').value.trim()) {
      const inp = document.getElementById('ob-name');
      if(inp){ inp.style.borderColor='var(--red)'; setTimeout(()=>inp.style.borderColor='',1800); inp.focus(); }
      showToast('⚠️ Inserisci il tuo nome!'); return;
    }
    // Step 1 — ob_s1 = LIVELLO (obbligatorio)
    if(obCurStep===1) {
      const hasLevel = document.querySelector('#ob_s1 .ob-card.sel') ||
                       (typeof obSel!=='undefined' && obSel.level);
      if(!hasLevel) {
        document.querySelectorAll('#ob_s1 .ob-card').forEach(c=>{ c.style.borderColor='var(--red)'; setTimeout(()=>c.style.borderColor='',1800); });
        showToast('⚠️ Seleziona il tuo livello per continuare'); return;
      }
    }
    // Step 2 — ob_s2 = SESSO (obbligatorio)
    if(obCurStep===2) {
      const hasSex = document.querySelector('#ob_s2 .ob-card.sel') ||
                     (typeof obSel!=='undefined' && obSel.sex);
      if(!hasSex) {
        document.querySelectorAll('#ob_s2 .ob-card').forEach(c=>{ c.style.borderColor='var(--red)'; setTimeout(()=>c.style.borderColor='',1800); });
        showToast('⚠️ Seleziona il tuo sesso per continuare'); return;
      }
    }
    // Step 3 — ob_s3 = OBIETTIVI (almeno uno obbligatorio)
    if(obCurStep===3) {
      const hasGoal = document.querySelector('#ob_s3 .ob-card.sel') ||
                      (typeof obGoals!=='undefined' && obGoals && obGoals.length>0);
      if(!hasGoal) {
        document.querySelectorAll('#ob_s3 .ob-card').forEach(c=>{ c.style.borderColor='var(--red)'; setTimeout(()=>c.style.borderColor='',1800); });
        showToast('⚠️ Seleziona almeno un obiettivo'); return;
      }
    }
    // Step 4 — ob_s4 = AMBIENTE (obbligatorio)
    if(obCurStep===4) {
      const hasEnv = document.querySelector('#ob_s4 .ob-card.sel') ||
                     (typeof obSel!=='undefined' && obSel.env);
      if(!hasEnv) {
        document.querySelectorAll('#ob_s4 .ob-card').forEach(c=>{ c.style.borderColor='var(--red)'; setTimeout(()=>c.style.borderColor='',1800); });
        showToast('⚠️ Seleziona dove ti alleni'); return;
      }
    }
  }
  // On reaching final step, build plan preview
  if(step===15) {
    buildPresetRec();
    // Also trigger generated plan display if available
    setTimeout(()=>{
      if(typeof obBuildGeneratedPlan==='function') obBuildGeneratedPlan();
    }, 100);
  }

  // Hide current step
  const prevEl = document.getElementById('ob_s'+obCurStep);
  if(prevEl) prevEl.classList.remove('active');

  // Show new step
  obCurStep = step;
  const el = document.getElementById('ob_s'+step);
  if(el) {
    el.classList.add('active');
    el.style.animation='none';
    el.offsetHeight;
    el.style.animation='';
    // Scroll to top
    const wrap = document.querySelector('#scr-onboard .ob-wrap');
    if(wrap) wrap.scrollTop=0;
    try { el.scrollIntoView({behavior:'smooth',block:'start'}); } catch(e){}
  } else {
    console.warn('[obNext] Step not found: ob_s'+step);
  }

  // Update progress bar
  const segs = document.querySelectorAll('.ob-prog-seg');
  segs.forEach((seg,i) => seg.classList.toggle('on', i<=step));
}

// Keep obGo as alias for old code that still uses it (e.g. sport/equip helpers)
function obGo(step) {
  // Map old step IDs to new sequential IDs for backward compat
  const legacyMap = {
    0:'s0',1:'s1',22:'s2',2:'s3',21:'s4',23:'s5',24:'s6',25:'s7',
    26:'s8',27:'s9','45a':'s9','45b':'s9','45c':'s10','3b':'s9','3c':'s10',
    3:'s10',4:'s11',5:'s12',6:'s14',7:'s15'
  };
  const mapped = legacyMap[step];
  if(mapped) {
    const idx = parseInt(mapped.replace('s',''));
    obNext(idx);
  } else {
    obNext(typeof step==='number' ? step : obCurStep);
  }
}

/* ── Maximal strength helpers ── */
window._obMaximals = {};

function ob1RMHint(key) {
  const ids = { squat:'max-squat', bench:'max-bench', deadlift:'max-deadlift', ohp:'max-ohp', row:'max-row', pullup:'max-pullup' };
  const hintIds = { squat:'hint-squat', bench:'hint-bench', deadlift:'hint-deadlift', ohp:'hint-ohp', row:'hint-row', pullup:'hint-pullup' };
  const val = parseFloat(document.getElementById(ids[key])?.value);
  const hint = document.getElementById(hintIds[key]);
  if(!hint) return;
  if(!val || isNaN(val)) { hint.style.display='none'; return; }
  if(key==='pullup') {
    const zones = val<=5?'Principiante':val<=12?'Intermedio':val<=20?'Avanzato':'Atleta';
    hint.textContent = `→ ${val} trazioni max → livello: ${zones}`;
    hint.style.display='block';
    window._obMaximals[key] = val;
    return;
  }
  // Estimate 1RM if this is a 5RM (Brzycki formula: 1RM ≈ w × 36/(37−5))
  // We treat the entered value as 1RM directly
  const pct = { squat:[0.6,0.7,0.8], bench:[0.6,0.7,0.8], deadlift:[0.6,0.7,0.8], ohp:[0.55,0.65,0.75], row:[0.6,0.7,0.8] };
  const [p1,p2,p3] = pct[key]||[0.6,0.7,0.8];
  hint.textContent = `→ Carichi suggeriti: ${Math.round(val*p1)}kg (riscaldamento) · ${Math.round(val*p2)}kg (lavoro) · ${Math.round(val*p3)}kg (pesante)`;
  hint.style.display='block';
  window._obMaximals[key] = val;
}

function obSaveMaximals() {
  const fields = {squat:'max-squat',bench:'max-bench',deadlift:'max-deadlift',ohp:'max-ohp',row:'max-row',pullup:'max-pullup'};
  const result = {};
  Object.entries(fields).forEach(([k,id])=>{
    const v = parseFloat(document.getElementById(id)?.value);
    if(v && !isNaN(v)) result[k]=v;
  });
  window._obMaximals = result;
  // Also persist to profile if already exists
  if(typeof profile !== 'undefined') profile.maxStrength = result;
  if(Object.keys(result).length>0 && typeof saveAll==='function') saveAll();
}

/* ── Progressive overload engine ──
   Called after each completed session to suggest weight/rep progression */
function ftProgressionCheck(exerciseId, lastSets) {
  const max = (profile?.maxStrength)||{};
  const mapToMax = {
    'barbell-squat':'squat','back-squat':'squat',
    'bench-press':'bench','barbell-bench':'bench',
    'deadlift':'deadlift','conventional-deadlift':'deadlift',
    'overhead-press':'ohp','ohp':'ohp',
    'barbell-row':'row','bent-over-row':'row',
    'pull-up':'pullup','pullup':'pullup',
  };
  const maxKey = mapToMax[exerciseId];
  const currentMax = maxKey ? max[maxKey] : null;

  // If all sets completed at target: suggest +2.5kg (lower body) or +1.25kg (upper)
  const allCompleted = lastSets?.every(s=>s.completed);
  if(!allCompleted) return null;

  const isLower = ['squat','deadlift'].includes(maxKey);
  const increment = isLower ? 2.5 : 1.25;

  return {
    suggestion: `+${increment}kg alla prossima sessione`,
    increment,
    newMax: currentMax ? currentMax + increment : null,
  };
}

/* Expose for use in session completion */
window.ftProgressionCheck = ftProgressionCheck;

function obPick(el,k,v){
  el.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c=>{ c.classList.remove('sel'); c.classList.remove('on'); });
  el.classList.add('sel');
  obSel[k]=v;
}
function obToggle(el,k){
  el.classList.toggle('sel');
  const i=obGoals.indexOf(k);i>=0?obGoals.splice(i,1):obGoals.push(k);
}

function buildPresetRec() {
  // Auto-calculate days if not yet set
  if (typeof obCalcSmartDays === 'function' && !obSel.days) {
    obSel.days = String(obCalcSmartDays());
  }
  const pid = (typeof getRecommendedPresetV34==='function')
    ? getRecommendedPresetV34({
        goals:obGoals.length?[...obGoals]:['hypertrophy'],
        level:obSel.level||'intermediate',
        env:obSel.env||'calisthenics',
        sex:obSel.sex||'m',
        trainingDays:obSel.days||'3',
        sports: obSel.multi?.sports || [],
        perfs:  obSel.multi?.perfs  || [],
      })
    : getRecommendedPreset(obGoals, obSel.level);
  const p = PRESETS_DATA.find(x=>x.id===pid);
  if(!p) return;
  const wrap = document.getElementById('ob-preset-rec');
  const tc = TC[p.t]||TC.custom;
  wrap.innerHTML=`
    <div class="preset-rec-eye">🎯 Preset consigliato per te</div>
    <div class="preset-rec-name">${p.icon} ${p.name}</div>
    <div class="preset-rec-desc">${p.desc}</div>
    <div class="preset-rec-tags">
      <span class="pr-tag" style="background:${tc.bg};color:${tc.c}">${p.t}</span>
      <span class="pr-tag" style="background:var(--bg4);color:var(--text2)">${p.dur} min</span>
      <span class="pr-tag" style="background:var(--bg4);color:var(--text2)">${p.diff}</span>
      <span class="pr-tag" style="background:var(--bg4);color:var(--text2)">${p.days.filter(d=>!d.rest).length} sessioni/sett.</span>
    </div>`;
  wrap.style.display='block';
  window._recPresetId = pid;
}

// ── NUTRIZIONE ONBOARDING ──
var obNutriSel = { protSource: '', diet: '', intolleranze: [], budget: '' };

function obPickNutri(el, key, val) {
  // Trova il container diretto della card
  var parent = el.parentElement;
  // Assicurati di prendere il wrapper .ob-grid e non qualcosa sopra
  if (parent && parent.querySelectorAll) {
    parent.querySelectorAll('.ob-card').forEach(function(c) { c.classList.remove('on'); });
  }
  el.classList.add('on');
  obNutriSel[key] = val;
  // Visual feedback
  el.style.transform = 'scale(0.97)';
  setTimeout(function(){ el.style.transform = ''; }, 120);
}

function obMultiNutri(el, val) {
  el.classList.toggle('on');
  var idx = obNutriSel.intolleranze.indexOf(val);
  if (idx >= 0) obNutriSel.intolleranze.splice(idx, 1);
  else obNutriSel.intolleranze.push(val);
  var parent = el.parentElement;
  if (val === 'intoll_none') {
    if (parent) parent.querySelectorAll('.ob-card').forEach(function(c) {
      var oc = c.getAttribute('onclick') || '';
      if (!oc.includes('intoll_none')) c.classList.remove('on');
    });
    obNutriSel.intolleranze = ['intoll_none'];
  } else {
    var noneIdx = obNutriSel.intolleranze.indexOf('intoll_none');
    if (noneIdx >= 0) obNutriSel.intolleranze.splice(noneIdx, 1);
    if (parent) parent.querySelectorAll('[onclick*="intoll_none"]').forEach(function(c) { c.classList.remove('on'); });
  }
  el.style.transform = 'scale(0.97)';
  setTimeout(function(){ el.style.transform = ''; }, 120);
}

function obSaveNutriPrefs() {
  profile.nutriPrefs = {
    protSource: obNutriSel.protSource || 'omnivore',
    diet: obNutriSel.diet || 'omnivore',
    intolleranze: [...obNutriSel.intolleranze],
    budget: obNutriSel.budget || 'medium',
  };
  // Stress già salvato nel TDEE step, aggiunge anche qui
  const stressEl = document.getElementById('ob-stress');
  if (stressEl) {
    const sv = parseInt(stressEl.value) || 0;
    profile.stressLevel = sv >= 200 ? 'high' : sv >= 100 ? 'medium' : 'low';
  }
  const sleepEl = document.getElementById('ob-sleep');
  if (sleepEl) {
    const sv = parseInt(sleepEl.value) || 0;
    profile.sleepQuality = sv <= -100 ? 'poor' : sv <= -50 ? 'fair' : sv >= 50 ? 'great' : 'good';
  }
  if (typeof saveAll === 'function') saveAll();
}

// ob_s14_5 rimosso — obNext passa direttamente

async function finishOnboard() {
  const btn = document.getElementById('ob-finish-btn');
  if(btn){ btn.disabled=true; btn.textContent='⏳ Salvataggio...'; }

  const name = document.getElementById('ob-name')?.value.trim()||'Atleta';
  const kcal = window._tempKcal || 2500;
  const macros = window._tempMacros || {p:180,c:280,g:70};
  const physique = window._tempPhysique || {};

  // Calcola preset raccomandato
  const envForMatch = obSel.env || 'calisthenics';
  const sexForMatch = obSel.sex || 'm';
  const ageForMatch = parseInt(physique.age) || 25;
  const recId = (typeof getRecommendedPresetV44 === 'function')
    ? getRecommendedPresetV44({
        goals: obGoals.length?[...obGoals]:['hypertrophy'],
        level: obSel.level||'intermediate',
        env: envForMatch,
        sex: sexForMatch,
        age: ageForMatch,
        sports:    obSel.multi?.sports || [],
        perfs:     obSel.multi?.perfs  || [],
        intensity: obTrainingIntensity || 'moderate',
        equipment: obSel.multi?.eqs    || [],
        physique,
      })
    : (window._obSmartPresetId || window._recPresetId || 'cali-intermediate');

  // Ciclo mestruale
  let cycleData = null;
  if (sexForMatch === 'f' && obSel.cycle === 'yes') {
    cycleData = {
      trackCycle: true,
      cycleLen:   parseInt(document.getElementById('ob-cycle-len')?.value)   || 28,
      periodLen:  parseInt(document.getElementById('ob-period-len')?.value) || 5,
      lastPeriod: document.getElementById('ob-last-period')?.value || '',
    };
  }

  profile = {
    name, level: obSel.level||'intermediate',
    goals: obGoals.length?[...obGoals]:['hypertrophy'],
    days: obSel.days || '3',
    specificDays: obSel.specificDays || [],
    myPresets: [],
    env: envForMatch,
    sex: sexForMatch,
    injuries:    (obSel.multi?.injs || []),
    equipment:   (obSel.multi?.eqs  || []),
    sessionDur:  obSel.sessionDur || '45',
    timeOfDay:   obSel.timeOfDay  || 'any',
    style:       obSel.style      || 'moderate_vol',
    event:       obSel.event      || 'none',
    energyLevel: obSel.energyLevel|| 3,
    sports:      obSel.multi?.sports || [],
    perfGoals:   obSel.multi?.perfs  || [],
    bodyFocusZone:  obSel.bodyFocusZone   || 'fullbody',
    recovery:       obSel.recovery        || 'normal',
    sleepHours:     obSel.sleepHours      || '7to8',
    cardioBase:     obSel.cardioBase      || 'low',
    motivationStyle:obSel.motivationStyle || 'aesthetic',
    trainingIntensity: obTrainingIntensity || 'moderate',
    kcalTarget:kcal, macros, tdee:_tdeeVal||kcal,
    physique, recPreset: recId,
    weightGoal: _weightGoalData,
    cycle: cycleData,
    generatedPlan: (typeof obGeneratedPlan !== 'undefined' ? obGeneratedPlan : null) || window.obGeneratedPlan || null,
    // Maximal strength data
    maxStrength: window._obMaximals || {},
    nutriPrefs: profile.nutriPrefs || { protSource:'omnivore', diet:'omnivore', intolleranze:[], budget:'medium' },
    stressLevel: profile.stressLevel || 'low',
    sleepQuality: profile.sleepQuality || 'good',
  };

  await saveAll();

  // ── Salva subito sul cloud (nuovo utente — priorità massima) ──
  try {
    if (typeof window.firestoreSave === 'function' && window._firebaseUser) {
      await window.firestoreSave();
    } else if (window.GoogleSync && window.GoogleSync.isConfigured()) {
      window.GoogleSync.save().catch(function(){});
    }
  } catch(e) {}

  // ── Launch the app ──
  window._ftOnboardingActive = false;
  document.getElementById('scr-onboard').classList.remove('active');
  document.getElementById('scr-splash').classList.remove('active');
  document.getElementById('scr-app').classList.add('active');
  // Pulisci tutti i flag temporanei
  localStorage.removeItem('ft_just_reset');
  localStorage.removeItem('ft_pending_google_login');
  initApp();
  if(typeof showToast==='function') showToast('👋 Benvenuto, '+name+'! Il tuo programma è pronto.');
}

// ── DB ────────────────────────────────────
let db;
function initDB(){
  return new Promise(res=>{
    const r=indexedDB.open('FitTrackDBv3',1);
    r.onupgradeneeded=e=>{if(!e.target.result.objectStoreNames.contains('kv'))e.target.result.createObjectStore('kv');};
    r.onsuccess=e=>{db=e.target.result;res();};
    r.onerror=()=>{db=null;res();};
  });
}
async function dbSet(k,v){
  const d=JSON.stringify(v);
  if(db){return new Promise(r=>{const t=db.transaction('kv','readwrite');t.objectStore('kv').put(d,k);t.oncomplete=r;});}
  try{localStorage.setItem('ft3_'+k,d);}catch(e){}
}
async function dbGet(k){
  if(db){return new Promise(r=>{const t=db.transaction('kv','readonly');const q=t.objectStore('kv').get(k);q.onsuccess=()=>{try{r(q.result?JSON.parse(q.result):null);}catch(e){r(null);}};q.onerror=()=>r(null);});}
  try{const v=localStorage.getItem('ft3_'+k);return v?JSON.parse(v):null;}catch(e){return null;}
}
async function saveAll(){
  await Promise.all([dbSet('profile',profile),dbSet('sessions',sessions),dbSet('nutrition',nutrition),dbSet('metrics',metrics),dbSet('pbs',pbs)]);
}

function today(){
  const n=new Date();
  const y=n.getFullYear(), m=String(n.getMonth()+1).padStart(2,'0'), d=String(n.getDate()).padStart(2,'0');
  return y+'-'+m+'-'+d;
}
function todayNutr(){if(!nutrition[today()]) nutrition[today()]={meals:[{name:'Colazione',items:[]},{name:'Pranzo',items:[]},{name:'Cena',items:[]},{name:'Spuntini',items:[]}]};return nutrition[today()];}
function calcNutritionTotals(dayNutr){
  const meals = (dayNutr && Array.isArray(dayNutr.meals)) ? dayNutr.meals : [];
  return meals.reduce((acc,m)=>{
    const items = Array.isArray(m?.items) ? m.items : [];
    (items||[]).forEach(it=>{
      const kcal = safeNumber(it?.kcal, 0, 50000, 0);
      const p = safeNumber(it?.p, 0, 5000, 0);
      const c = safeNumber(it?.c, 0, 5000, 0);
      const fat = safeNumber((it?.g_fat ?? it?.g), 0, 5000, 0);
      acc.eaten += kcal;
      acc.p += p;
      acc.c += c;
      acc.g += fat;
    });
    return acc;
  }, { eaten:0, p:0, c:0, g:0 });
}

// ── NAV ───────────────────────────────────
function launchApp(){
  document.getElementById('scr-onboard').classList.remove('active');
  document.getElementById('scr-splash').classList.remove('active');
  document.getElementById('scr-app').classList.add('active');
  initApp();
}
function goPage(p){
  // Guard reset e onboarding
  if (localStorage.getItem('ft_just_reset') === '1') return;
  if (window._ftOnboardingActive) return;
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.bni').forEach(el=>el.classList.remove('on'));
  const pageEl = document.getElementById('page-'+p);
  if(!pageEl){ console.warn('Page not found:', p); return; }
  pageEl.classList.add('active');
  const ni=document.getElementById('bni-'+p);if(ni)ni.classList.add('on');
  if(p==='home'){ renderHome(); renderWeeklyGoalCard(); }
  if(p==='allenamento'){renderAllenamento();renderWeeklyProgram();renderPresetsInTraining();}
  if(p==='esplora') renderPresetExplorer();
  if(p==='esercizi') filterLibrary();
  if(!profile.myPresets) profile.myPresets = [];
  if(p==='nutrizione') {
    if(typeof window._nutrDayOffset !== 'undefined') window._nutrDayOffset = 0;
    const _ndt2=document.getElementById('nutr-dt'); if(_ndt2) _ndt2.textContent='Oggi';
    const _nnext=document.getElementById('nutr-nav-next');
    if(_nnext){ _nnext.style.opacity='0.3'; _nnext.style.pointerEvents='none'; }
    renderNutrizione();
  }
  if(p==='progressi') renderProgressi();
  if(p==='coach') renderCoach();
  if(p==='ricette') renderRicette && renderRicette();
  if(p==='profile') renderProfilePage();
}
function openSub(id){
  if(id==='sub-workout') renderSubWorkout();
  if(id==='sub-nutr-tips') renderSubNutrTips();
  if(id==='sub-skill') renderSubSkill();
  if(id==='sub-recovery') renderSubRecovery();
  document.getElementById(id).classList.add('open');
}
function closeSub(id){document.getElementById(id).classList.remove('open');}

// ── INIT ──────────────────────────────────