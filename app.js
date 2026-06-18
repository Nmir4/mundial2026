
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore,doc,getDoc,setDoc,collection,getDocs,addDoc,query,orderBy,limit,onSnapshot,serverTimestamp,deleteDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig={
  apiKey:"AIzaSyChEWd6VY6x-6LmgTY6i17dtifZq6rmbNk",
  authDomain:"mundial2026-gui.firebaseapp.com",
  projectId:"mundial2026-gui",
  storageBucket:"mundial2026-gui.firebasestorage.app",
  messagingSenderId:"652983892220",
  appId:"1:652983892220:web:2582c84ee226719b317f79"
};
const fbapp=initializeApp(firebaseConfig);
const db=getFirestore(fbapp);

// ===== DADOS =====
const GROUPS=[
  {g:"A",cor:"#2d8a4e",teams:[{c:"MEX",n:"México",f:"🇲🇽",co:"#006847"},{c:"RSA",n:"África do Sul",f:"🇿🇦",co:"#007A4D"},{c:"KOR",n:"Coreia Rep.",f:"🇰🇷",co:"#CD2E3A"},{c:"CZE",n:"Chéquia",f:"🇨🇿",co:"#D7141A"}]},
  {g:"B",cor:"#c8102e",teams:[{c:"CAN",n:"Canadá",f:"🇨🇦",co:"#cc0000"},{c:"BIH",n:"Bósnia-Herz.",f:"🇧🇦",co:"#002395"},{c:"QAT",n:"Catar",f:"🇶🇦",co:"#8D1B3D"},{c:"SUI",n:"Suíça",f:"🇨🇭",co:"#d40000"}]},
  {g:"C",cor:"#c87000",teams:[{c:"BRA",n:"Brasil",f:"🇧🇷",co:"#009C3B"},{c:"MAR",n:"Marrocos",f:"🇲🇦",co:"#C1272D"},{c:"HAI",n:"Haiti",f:"🇭🇹",co:"#00209F"},{c:"SCO",n:"Escócia",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",co:"#003865"}]},
  {g:"D",cor:"#003f9e",teams:[{c:"USA",n:"EUA",f:"🇺🇸",co:"#B22234"},{c:"PAR",n:"Paraguai",f:"🇵🇾",co:"#D52B1E"},{c:"AUS",n:"Austrália",f:"🇦🇺",co:"#00843D"},{c:"TUR",n:"Türkiye",f:"🇹🇷",co:"#E30A17"}]},
  {g:"E",cor:"#c04000",teams:[{c:"GER",n:"Alemanha",f:"🇩🇪",co:"#888888"},{c:"CUW",n:"Curaçao",f:"🇨🇼",co:"#002B7F"},{c:"CIV",n:"Costa do Marfim",f:"🇨🇮",co:"#F77F00"},{c:"ECU",n:"Equador",f:"🇪🇨",co:"#b89000"}]},
  {g:"F",cor:"#6a0dad",teams:[{c:"NED",n:"Países Baixos",f:"🇳🇱",co:"#cc5500"},{c:"JPN",n:"Japão",f:"🇯🇵",co:"#BC002D"},{c:"SWE",n:"Suécia",f:"🇸🇪",co:"#006AA7"},{c:"TUN",n:"Tunísia",f:"🇹🇳",co:"#E70013"}]},
  {g:"G",cor:"#5b2d8e",teams:[{c:"BEL",n:"Bélgica",f:"🇧🇪",co:"#EF3340"},{c:"EGY",n:"Egito",f:"🇪🇬",co:"#CE1126"},{c:"IRN",n:"Irão",f:"🇮🇷",co:"#239F40"},{c:"NZL",n:"Nova Zelândia",f:"🇳🇿",co:"#00247D"}]},
  {g:"H",cor:"#006868",teams:[{c:"ESP",n:"Espanha",f:"🇪🇸",co:"#AA151B"},{c:"CPV",n:"Cabo Verde",f:"🇨🇻",co:"#003893"},{c:"KSA",n:"Arábia Saudita",f:"🇸🇦",co:"#006C35"},{c:"URU",n:"Uruguai",f:"🇺🇾",co:"#5080bb"}]},
  {g:"I",cor:"#1a6b3c",teams:[{c:"FRA",n:"França",f:"🇫🇷",co:"#002395"},{c:"SEN",n:"Senegal",f:"🇸🇳",co:"#00853F"},{c:"IRQ",n:"Iraque",f:"🇮🇶",co:"#007A3D"},{c:"NOR",n:"Noruega",f:"🇳🇴",co:"#cc1020"}]},
  {g:"J",cor:"#8B1010",teams:[{c:"ARG",n:"Argentina",f:"🇦🇷",co:"#5090cc"},{c:"ALG",n:"Argélia",f:"🇩🇿",co:"#006233"},{c:"AUT",n:"Áustria",f:"🇦🇹",co:"#ED2939"},{c:"JOR",n:"Jordânia",f:"🇯🇴",co:"#007A3D"}]},
  {g:"K",cor:"#006600",teams:[{c:"POR",n:"Portugal",f:"🇵🇹",co:"#009900"},{c:"COD",n:"Congo DR",f:"🇨🇩",co:"#0060cc"},{c:"UZB",n:"Uzbequistão",f:"🇺🇿",co:"#1EB53A"},{c:"COL",n:"Colômbia",f:"🇨🇴",co:"#c09000"}]},
  {g:"L",cor:"#8B0000",teams:[{c:"ENG",n:"Inglaterra",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",co:"#CC0010"},{c:"CRO",n:"Croácia",f:"🇭🇷",co:"#cc1020"},{c:"GHA",n:"Gana",f:"🇬🇭",co:"#006B3F"},{c:"PAN",n:"Panamá",f:"🇵🇦",co:"#DA121A"}]},
];
const SPECIALS=[
  {c:"FWC",n:"Abertura / Estádios",f:"🏆",co:"#c89000",st:[{n:"FWC1"},{n:"FWC2"},{n:"FWC3"},{n:"FWC4"},{n:"FWC5"},{n:"FWC6"},{n:"FWC7"},{n:"FWC8"}]},
  {c:"MUS",n:"FIFA Museum",f:"🏅",co:"#a07020",st:Array.from({length:11},(_,i)=>({n:"MUS"+(i+1)}))},
];
const TOTAL=980;
const EMOJIS=['⚽','🏆','⭐','🥇','🎯','🔥','💪','🦁','🦅','🐉','🌊','⚡','🎖️','🏅','👑','🎉','🤩','😎','🇵🇹','🌍'];
const ADMIN='Nmira_admin';

// ===== BASE DE DADOS JOGADORES (fonte: Panini oficial) =====
const PLAYERS = {"FWC1":"Official Emblem","FWC2":"Official Emblem","FWC3":"Official Mascots","FWC4":"Official Slogan","FWC5":"Official Ball","FWC6":"Canada Host","FWC7":"Mexico Host","FWC8":"USA Host","MUS1":"FIFA Museum 1","MUS2":"FIFA Museum 2","MUS3":"FIFA Museum 3","MUS4":"FIFA Museum 4","MUS5":"FIFA Museum 5","MUS6":"FIFA Museum 6","MUS7":"FIFA Museum 7","MUS8":"FIFA Museum 8","MUS9":"FIFA Museum 9","MUS10":"FIFA Museum 10","MUS11":"FIFA Museum 11","MEX1":"Team Logo","MEX2":"Luis Malagón","MEX3":"Johan Vasquez","MEX4":"Jorge Sánchez","MEX5":"Cesar Montes","MEX6":"Jesus Gallardo","MEX7":"Israel Reyes","MEX8":"Diego Lainez","MEX9":"Carlos Rodriguez","MEX10":"Edson Alvarez","MEX11":"Orbelin Pineda","MEX12":"Marcel Ruiz","MEX13":"Team Photo","MEX14":"Érick Sánchez","MEX15":"Hirving Lozano","MEX16":"Santiago Giménez","MEX17":"Raúl Jiménez","MEX18":"Alexis Vega","MEX19":"Roberto Alvarado","MEX20":"Cesar Huerta","RSA1":"Team Logo","RSA2":"Ronwen Williams","RSA3":"Sipho Chaine","RSA4":"Aubrey Modiba","RSA5":"Samukele Kabini","RSA6":"Mbekezeli Mbokazi","RSA7":"Khulumani Ndamane","RSA8":"Siyabonga Ngezana","RSA9":"Khuliso Mudau","RSA10":"Nkosinathi Sibisi","RSA11":"Teboho Mokoena","RSA12":"Thalente Mbatha","RSA13":"Team Photo","RSA14":"Bathasi Aubaas","RSA15":"Yaya Sithole","RSA16":"Sipho Mbule","RSA17":"Lyle Foster","RSA18":"Iqraam Rayners","RSA19":"Mohau Nkota","RSA20":"Oswin Appollis","KOR1":"Team Logo","KOR2":"Hyeon-woo Jo","KOR3":"Seung-Gyu Kim","KOR4":"Min-jae Kim","KOR5":"Yu-min Cho","KOR6":"Young-woo Seol","KOR7":"Han-beom Lee","KOR8":"Tae-seok Lee","KOR9":"Myung-jae Lee","KOR10":"Jae-sung Lee","KOR11":"In-beom Hwang","KOR12":"Kang-in Lee","KOR13":"Team Photo","KOR14":"Seung-ho Paik","KOR15":"Jens Castrop","KOR16":"Dongg-yeong Lee","KOR17":"Gue-sung Cho","KOR18":"Heung-min Son","KOR19":"Hee-chan Hwang","KOR20":"Hyeon-Gyu Oh","CZE1":"Team Logo","CZE2":"Matej Kovar","CZE3":"Jindrich Stanek","CZE4":"Ladislav Krejci","CZE5":"Vladimir Coufal","CZE6":"Jaroslav Zeleny","CZE7":"Tomas Holes","CZE8":"David Zima","CZE9":"Michal Sadilek","CZE10":"Lukas Provod","CZE11":"Lukas Cerv","CZE12":"Tomas Soucek","CZE13":"Team Photo","CZE14":"Pavel Sulc","CZE15":"Matej Vydra","CZE16":"Vasil Kusej","CZE17":"Tomas Chory","CZE18":"Vaclav Cerny","CZE19":"Adam Hlozek","CZE20":"Patrik Schick","CAN1":"Team Logo","CAN2":"Dayne St.Clair","CAN3":"Alphonso Davies","CAN4":"Alistair Johnston","CAN5":"Samuel Adekugbe","CAN6":"Riche Larvea","CAN7":"Derek Cornelius","CAN8":"Moïse Bombito","CAN9":"Kamal Miller","CAN10":"Stephen Eustáquio","CAN11":"Ismaël Koné","CAN12":"Jonathan Osorio","CAN13":"Team Photo","CAN14":"Jacob Shaffelburg","CAN15":"Mathieu Choinière","CAN16":"Niko Sigur","CAN17":"Tajon Buchanan","CAN18":"Liam Millar","CAN19":"Cyle Larin","CAN20":"Jonathan David","BIH1":"Team Logo","BIH2":"Nikola Vasilj","BIH3":"Amer Dedic","BIH4":"Sead Kolasinac","BIH5":"Tarik Muharemovic","BIH6":"Nihad Mujakic","BIH7":"Nikola Katic","BIH8":"Amir Hadziahmetovic","BIH9":"Benjamin Tahirovic","BIH10":"Armin Gigovic","BIH11":"Ivan Sunjic","BIH12":"Ivan Basic","BIH13":"Team Photo","BIH14":"Dzenis Burnic","BIH15":"Esmir Bajraktarevic","BIH16":"Amar Memic","BIH17":"Ermedin Demirovic","BIH18":"Edin Dzeko","BIH19":"Samed Bazdar","BIH20":"Haris Tabakovic","QAT1":"Team Logo","QAT2":"Meshaal Barsham","QAT3":"Sultan Albrake","QAT4":"Lucas Mendes","QAT5":"Homam Ahmed","QAT6":"Boualem Khoukhi","QAT7":"Pedro Miguel","QAT8":"Tarek Salman","QAT9":"Mohamed Al-Mannai","QAT10":"Karim Boudiaf","QAT11":"Assim Madibo","QAT12":"Ahmed Fatehi","QAT13":"Team Photo","QAT14":"Mohammed Waad","QAT15":"Abdulaziz Hatem","QAT16":"Hassan Al-Haydos","QAT17":"Edmilson Junior","QAT18":"Akram Hassan Afif","QAT19":"Ahmed Al Ganehi","QAT20":"Almoez Ali","SUI1":"Team Logo","SUI2":"Gregor Kobel","SUI3":"Yvon Mvogo","SUI4":"Manuel Akanji","SUI5":"Ricardo Rodriguez","SUI6":"Nico Elvedi","SUI7":"Aurèle Amenda","SUI8":"Silvan Widmer","SUI9":"Granit Xhaka","SUI10":"Denis Zakaria","SUI11":"Remo Freuler","SUI12":"Fabian Rieder","SUI13":"Team Photo","SUI14":"Ardon Jashari","SUI15":"Johan Manzambi","SUI16":"Michel Aebischer","SUI17":"Breel Embolo","SUI18":"Ruben Vargas","SUI19":"Dan Ndoye","SUI20":"Zeki Amdouni","BRA1":"Team Logo","BRA2":"Alisson","BRA3":"Bento","BRA4":"Marquinhos","BRA5":"Éder Militão","BRA6":"Gabriel Magalhães","BRA7":"Danilo","BRA8":"Wesley","BRA9":"Lucas Paquetá","BRA10":"Casemiro","BRA11":"Bruno Guimarães","BRA12":"Luiz Henrique","BRA13":"Team Photo","BRA14":"Vinicius Júnior","BRA15":"Rodrygo","BRA16":"João Pedro","BRA17":"Matheus Cunha","BRA18":"Gabriel Martinelli","BRA19":"Raphinha","BRA20":"Estévão","MAR1":"Team Logo","MAR2":"Yassine Bounou","MAR3":"Munir El Kajoui","MAR4":"Achraf Hakimi","MAR5":"Noussair Mazraoui","MAR6":"Nayef Aguerd","MAR7":"Roman Saiss","MAR8":"Jawad El Yamio","MAR9":"Adam Masina","MAR10":"Sofyan Amrabat","MAR11":"Azzedine Ounahi","MAR12":"Eliesse Ben Seghir","MAR13":"Team Photo","MAR14":"Bilal El Khannouss","MAR15":"Ismael Saibari","MAR16":"Youssef En-Nesyri","MAR17":"Abde Ezzalzouli","MAR18":"Soufiane Rahimi","MAR19":"Brahim Diaz","MAR20":"Ayoub El Kaabi","HAI1":"Team Logo","HAI2":"Johny Placide","HAI3":"Carlens Arcus","HAI4":"Martin Expérience","HAI5":"Jean-Kevin Duverne","HAI6":"Ricardo Adé","HAI7":"Duke Lacroix","HAI8":"Garven Metusala","HAI9":"Hannes Delcroix","HAI10":"Leverton Pierre","HAI11":"Danley Jean Jacques","HAI12":"Jean-Ricner Bellegarde","HAI13":"Team Photo","HAI14":"Christopher Attys","HAI15":"Derrick Etienne Jr","HAI16":"Josue Casimir","HAI17":"Ruben Providence","HAI18":"Duckens Nazon","HAI19":"Louicius Deedson","HAI20":"Frantzdy Pierrot","SCO1":"Team Logo","SCO2":"Angus Gunn","SCO3":"Jack Hendry","SCO4":"Kieran Tierney","SCO5":"Aaron Hickey","SCO6":"Andrew Robertson","SCO7":"Scott McKenna","SCO8":"John Souttar","SCO9":"Anthony Ralston","SCO10":"Grant Hanley","SCO11":"Scott McTominay","SCO12":"Billy Gilmour","SCO13":"Team Photo","SCO14":"Lewis Ferguson","SCO15":"Ryan Christie","SCO16":"Kenny McLean","SCO17":"John McGinn","SCO18":"Lyndon Dykes","SCO19":"Che Adams","SCO20":"Ben Gannon-Doak","USA1":"Team Logo","USA2":"Matt Freese","USA3":"Chris Richards","USA4":"Tim Ream","USA5":"Mark McKenzie","USA6":"Alex Freeman","USA7":"Antonee Robinson","USA8":"Tyler Adams","USA9":"Tanner Tessmann","USA10":"Weston McKennie","USA11":"Christian Roldan","USA12":"Timothy Weah","USA13":"Team Photo","USA14":"Diego Luna","USA15":"Malik Tillman","USA16":"Christian Pulisic","USA17":"Brenden Aaronson","USA18":"Ricardo Pepi","USA19":"Haji Wright","USA20":"Folarin Balogun","PAR1":"Team Logo","PAR2":"Roberto Fernandez","PAR3":"Orlando Gill","PAR4":"Gustavo Gomez","PAR5":"Fabián Balbuena","PAR6":"Juan José Cáceres","PAR7":"Omar Alderete","PAR8":"Junior Alonso","PAR9":"Mathías Villasanti","PAR10":"Diego Gomez","PAR11":"Damián Bobadilla","PAR12":"Andres Cubas","PAR13":"Team Photo","PAR14":"Matias Galarza Fonda","PAR15":"Julio Enciso","PAR16":"Alejandro Romero Gamarra","PAR17":"Miguel Almirón","PAR18":"Ramon Sosa","PAR19":"Angel Romero","PAR20":"Antonio Sanabria","AUS1":"Team Logo","AUS2":"Mathew Ryan","AUS3":"Joe Gauci","AUS4":"Harry Souttar","AUS5":"Alessandro Circati","AUS6":"Jordan Bos","AUS7":"Aziz Behich","AUS8":"Cameron Burgess","AUS9":"Lewis Miller","AUS10":"Milos Degenek","AUS11":"Jackson Irvine","AUS12":"Riley McGree","AUS13":"Team Photo","AUS14":"Aiden O Neill","AUS15":"Connor Metcalfe","AUS16":"Patrick Yazbek","AUS17":"Craig Goodwin","AUS18":"Kusini Vengi","AUS19":"Nestory Irankunda","AUS20":"Mohamed Touré","TUR1":"Team Logo","TUR2":"Ugurcan Cakir","TUR3":"Mert Muldur","TUR4":"Zeki Celik","TUR5":"Abdulkerim Bardakci","TUR6":"Caglar Soyuncu","TUR7":"Merih Demiral","TUR8":"Ferdi Kadioglu","TUR9":"Kaan Ayhan","TUR10":"Ismail Yuksek","TUR11":"Hakan Calhanoglu","TUR12":"Orkun Kokcu","TUR13":"Team Photo","TUR14":"Arda Guler","TUR15":"Irfan Can Kahveci","TUR16":"Yunus Akgun","TUR17":"Can Uzun","TUR18":"Baris Alper Yilmaz","TUR19":"Kerem Akturkoglu","TUR20":"Kenan Yildiz","GER1":"Team Logo","GER2":"Marc-André ter Stegen","GER3":"Jonathan Tah","GER4":"David Raum","GER5":"Nico Schlotterbeck","GER6":"Antonio Rüdiger","GER7":"Waldemar Anton","GER8":"Ridle Baku","GER9":"Maximilian Mittelstadt","GER10":"Joshua Kimmich","GER11":"Florian Wirtz","GER12":"Felix Nmecha","GER13":"Team Photo","GER14":"Leon Goretzka","GER15":"Jamal Musiala","GER16":"Serge Gnabry","GER17":"Kai Havertz","GER18":"Leroy Sane","GER19":"Karim Adeyemi","GER20":"Nick Woltemade","CUW1":"Team Logo","CUW2":"Eloy Room","CUW3":"Armando Obispo","CUW4":"Sherel Floranus","CUW5":"Jurien Gaari","CUW6":"Joshua Brenet","CUW7":"Roshon Van Eijma","CUW8":"Shurandy Sambo","CUW9":"Livano Comenencia","CUW10":"Godfried Roemeratoe","CUW11":"Juninho Bacuna","CUW12":"Leandro Bacuna","CUW13":"Team Photo","CUW14":"Tahith Chong","CUW15":"Kenji Gorre","CUW16":"Jearl Margaritha","CUW17":"Jurgen Locadia","CUW18":"Jeremy Antonisse","CUW19":"Gervane Kastaneer","CUW20":"Sontje Hansen","CIV1":"Team Logo","CIV2":"Yahia Fofana","CIV3":"Ghislain Konan","CIV4":"Wilfried Singo","CIV5":"Odilon Kossounou","CIV6":"Evan Ndicka","CIV7":"Willy Boly","CIV8":"Emmanuel Agbadou","CIV9":"Ousmane Diomande","CIV10":"Franck Kessie","CIV11":"Seko Fofana","CIV12":"Ibrahim Sangare","CIV13":"Team Photo","CIV14":"Jean-Philippe Gbamin","CIV15":"Amad Diallo","CIV16":"Sébastien Haller","CIV17":"Simon Adingra","CIV18":"Yan Diomande","CIV19":"Evann Guessand","CIV20":"Oumar Diakite","ECU1":"Team Logo","ECU2":"Hernán Galíndez","ECU3":"Gonzalo Valle","ECU4":"Piero Hincapié","ECU5":"Pervis Estupiñán","ECU6":"Willian Pacho","ECU7":"Ángelo Preciado","ECU8":"Joel Ordóñez","ECU9":"Moises Caicedo","ECU10":"Alan Franco","ECU11":"Kendry Paez","ECU12":"Pedro Vite","ECU13":"Team Photo","ECU14":"John Veboah","ECU15":"Leonardo Campana","ECU16":"Gonzalo Plata","ECU17":"Nilson Angulo","ECU18":"Alan Minda","ECU19":"Kevin Rodriguez","ECU20":"Enner Valencia","NED1":"Team Logo","NED2":"Bart Verbruggen","NED3":"Virgil van Dijk","NED4":"Micky van de Ven","NED5":"Jurrien Timber","NED6":"Denzel Dumfries","NED7":"Nathan Aké","NED8":"Jeremie Frimpong","NED9":"Jan Paul van Hecke","NED10":"Tijjani Reijnders","NED11":"Ryan Gravenberch","NED12":"Teun Koopmeiners","NED13":"Team Photo","NED14":"Frenkie de Jong","NED15":"Xavi Simons","NED16":"Justin Kluivert","NED17":"Memphis Depay","NED18":"Donyell Malen","NED19":"Wout Weghorst","NED20":"Cody Gakpo","JPN1":"Team Logo","JPN2":"Zion Suzuki","JPN3":"Henry Mochizuki","JPN4":"Ayumu Seko","JPN5":"Junnosuke Suzuki","JPN6":"Shogo Taniguchi","JPN7":"Tsuyoshi Watanabe","JPN8":"Kaishu Sano","JPN9":"Yuki Soma","JPN10":"Ao Tanaka","JPN11":"Daichi Kamada","JPN12":"Takefusa Kubo","JPN13":"Team Photo","JPN14":"Ritsu Doan","JPN15":"Keito Nakamura","JPN16":"Takumi Minamino","JPN17":"Shuto Machino","JPN18":"Junya Ito","JPN19":"Koki Ogawa","JPN20":"Ayase Ueda","SWE1":"Team Logo","SWE2":"Victor Johansson","SWE3":"Isak Hien","SWE4":"Gabriel Gudmundsson","SWE5":"Emil Holm","SWE6":"Victor Nilsson Lindelöf","SWE7":"Gustaf Lagerbielke","SWE8":"Lucas Bergvall","SWE9":"Hugo Larsson","SWE10":"Jesper Karlström","SWE11":"Yasin Ayari","SWE12":"Mattias Svanberg","SWE13":"Team Photo","SWE14":"Daniel Svensson","SWE15":"Ken Sema","SWE16":"Roony Bardghji","SWE17":"Dejan Kulusevski","SWE18":"Anthony Elanga","SWE19":"Alexander Isak","SWE20":"Viktor Gyökeres","TUN1":"Team Logo","TUN2":"Bechir Ben Said","TUN3":"Aymen Dahmen","TUN4":"Yan Valery","TUN5":"Montassar Talbi","TUN6":"Yassine Meriah","TUN7":"Ali Abdi","TUN8":"Dylan Bronn","TUN9":"Ellyes Skhiri","TUN10":"Aissa Laidouni","TUN11":"Ferjani Sassi","TUN12":"Mohamed Ali Ben Romdhane","TUN13":"Team Photo","TUN14":"Hannibal Mejbri","TUN15":"Elias Achouri","TUN16":"Elias Saad","TUN17":"Hazem Mastouri","TUN18":"Ismael Gharbi","TUN19":"Sayfallah Ltaief","TUN20":"Naim Sliti","BEL1":"Team Logo","BEL2":"Thibaut Courtois","BEL3":"Arthur Theate","BEL4":"Timothy Castagne","BEL5":"Zeno Debast","BEL6":"Brandon Mechele","BEL7":"Maxim De Cuyper","BEL8":"Thomas Meunier","BEL9":"Youri Tielemans","BEL10":"Amadou Onana","BEL11":"Nicolas Raskin","BEL12":"Alexis Saelemaekers","BEL13":"Team Photo","BEL14":"Hans Vanaken","BEL15":"Kevin De Bruyne","BEL16":"Jérémy Doku","BEL17":"Charles De Ketelaere","BEL18":"Leandro Trossard","BEL19":"Loïs Openda","BEL20":"Romelu Lukaku","EGY1":"Team Logo","EGY2":"Mohamed El Shenawy","EGY3":"Mohamed Hany","EGY4":"Mohamed Hamdy","EGY5":"Yasser Ibrahim","EGY6":"Khaled Sobhi","EGY7":"Ramy Rabia","EGY8":"Hossam Abdelmaguid","EGY9":"Ahmed Fatouh","EGY10":"Marwan Attia","EGY11":"Zizo","EGY12":"Hamdy Fathy","EGY13":"Team Photo","EGY14":"Mohamed Lasheen","EGY15":"Emam Ashour","EGY16":"Osama Faisal","EGY17":"Mohamed Salah","EGY18":"Mostafa Mohamed","EGY19":"Trezeguet","EGY20":"Omar Marmoush","IRN1":"Team Logo","IRN2":"Alireza Beiranvand","IRN3":"Morteza Pouraliganji","IRN4":"Ehsan Hajsafi","IRN5":"Milad Mohammadi","IRN6":"Shojae Khalilzadeh","IRN7":"Ramin Rezaeian","IRN8":"Hossein Kanaani","IRN9":"Sadegh Moharrami","IRN10":"Saleh Hardani","IRN11":"Saeed Ezatolahi","IRN12":"Saman Ghoddos","IRN13":"Team Photo","IRN14":"Omid Noorafkan","IRN15":"Roozbeh Cheshmi","IRN16":"Mohammad Mohebi","IRN17":"Sardar Azmoun","IRN18":"Mehdi Taremi","IRN19":"Alireza Jahanbakhsh","IRN20":"Ali Gholizadeh","NZL1":"Team Logo","NZL2":"Max Crocombe","NZL3":"Alex Paulsen","NZL4":"Michael Boxall","NZL5":"Liberato Cacace","NZL6":"Tim Payne","NZL7":"Tyler Bindon","NZL8":"Francis de Vries","NZL9":"Finn Surman","NZL10":"Joe Bell","NZL11":"Sarpreet Singh","NZL12":"Ryan Thomas","NZL13":"Team Photo","NZL14":"Matthew Garbett","NZL15":"Marko Stamenić","NZL16":"Ben Old","NZL17":"Chris Wood","NZL18":"Elijah Just","NZL19":"Callum McCowatt","NZL20":"Kosta Barbarouses","ESP1":"Team Logo","ESP2":"Unai Simon","ESP3":"Robin Le Normand","ESP4":"Aymeric Laporte","ESP5":"Dean Huijsen","ESP6":"Pedro Porro","ESP7":"Dani Carvajal","ESP8":"Marc Cucurella","ESP9":"Martín Zubimendi","ESP10":"Rodri","ESP11":"Pedri","ESP12":"Fabian Ruiz","ESP13":"Team Photo","ESP14":"Mikel Merino","ESP15":"Lamine Yamal","ESP16":"Dani Olmo","ESP17":"Nico Williams","ESP18":"Ferran Torres","ESP19":"Álvaro Morata","ESP20":"Mikel Oyarzabal","CPV1":"Team Logo","CPV2":"Vozinha","CPV3":"Logan Costa","CPV4":"Pico","CPV5":"Diney","CPV6":"Steven Moreira","CPV7":"Wagner Pina","CPV8":"Joao Paulo","CPV9":"Yannick Semedo","CPV10":"Kevin Pina","CPV11":"Patrick Andrade","CPV12":"Jamiro Monteiro","CPV13":"Team Photo","CPV14":"Garry Rodrigues","CPV15":"Núnio Tavares","CPV16":"Dylan Tavares","CPV17":"Bryan Teixeira","CPV18":"Júlio Tavares","CPV19":"Adilson Luís","CPV20":"Ciel","KSA1":"Team Logo","KSA2":"Mohammed Al-Owais","KSA3":"Fawaz Al-Qarni","KSA4":"Ali Al-Bulaihi","KSA5":"Saud Abdulhamid","KSA6":"Hassan Al-Tambakti","KSA7":"Abdulelah Al-Malki","KSA8":"Ali Al-Hassan","KSA9":"Salman Al-Faraj","KSA10":"Mohamed Kanno","KSA11":"Nasser Al-Dawsari","KSA12":"Musab Al-Juwayr","KSA13":"Team Photo","KSA14":"Sami Al-Najei","KSA15":"Riyadh Sharahili","KSA16":"Fahad Al-Muwallad","KSA17":"Firas Al-Buraikan","KSA18":"Haitham Asiri","KSA19":"Salem Al-Dawsari","KSA20":"Abdullah Al-Hamdan","URU1":"Team Logo","URU2":"Sergio Rochet","URU3":"Santiago Mele","URU4":"Ronald Araujo","URU5":"Mathías Olivera","URU6":"Martin Caceres","URU7":"Diego Godin","URU8":"Jose Maria Gimenez","URU9":"Nicolas Marichal","URU10":"Federico Valverde","URU11":"Manuel Ugarte","URU12":"Rodrigo Bentancur","URU13":"Team Photo","URU14":"Giorgian de Arrascaeta","URU15":"Nicolas de la Cruz","URU16":"Facundo Pellistri","URU17":"Maximiliano Araujo","URU18":"Darwin Nunez","URU19":"Luis Suarez","URU20":"Edinson Cavani","FRA1":"Team Logo","FRA2":"Mike Maignan","FRA3":"Alphonse Areola","FRA4":"William Saliba","FRA5":"Dayot Upamecano","FRA6":"Theo Hernandez","FRA7":"Jules Koundé","FRA8":"Benjamin Pavard","FRA9":"Lucas Digne","FRA10":"Aurélien Tchouaméni","FRA11":"Adrien Rabiot","FRA12":"Eduardo Camavinga","FRA13":"Team Photo","FRA14":"N Golo Kanté","FRA15":"Ousmane Dembélé","FRA16":"Kylian Mbappé","FRA17":"Marcus Thuram","FRA18":"Antoine Griezmann","FRA19":"Bradley Barcola","FRA20":"Randal Kolo Muani","SEN1":"Team Logo","SEN2":"Edouard Mendy","SEN3":"Seny Dieng","SEN4":"Kalidou Koulibaly","SEN5":"Nampalys Mendy","SEN6":"Ismail Jakobs","SEN7":"Abdou Diallo","SEN8":"Moussa Niakhate","SEN9":"Formose Mendy","SEN10":"Idrissa Gueye","SEN11":"Pape Matar Sarr","SEN12":"Habib Diallo","SEN13":"Team Photo","SEN14":"Ismaila Sarr","SEN15":"Krepin Diatta","SEN16":"Nicolas Jackson","SEN17":"Lamine Camara","SEN18":"Iliman Ndiaye","SEN19":"Boulaye Dia","SEN20":"Sadio Mané","IRQ1":"Team Logo","IRQ2":"Jalal Hassan","IRQ3":"Fahad Talib","IRQ4":"Ali Adnan","IRQ5":"Ahmed Ibrahim","IRQ6":"Rebin Sulaka","IRQ7":"Mustafa Nadhim","IRQ8":"Hussein Ali","IRQ9":"Saad Natiq","IRQ10":"Bashar Resan","IRQ11":"Ali Jasim","IRQ12":"Osama Rashid","IRQ13":"Team Photo","IRQ14":"Mohanad Ali","IRQ15":"Amir Al-Ammari","IRQ16":"Amjad Atwan","IRQ17":"Ayman Hussein","IRQ18":"Ibrahim Bayesh","IRQ19":"Ali Mabkhout","IRQ20":"Aymen Hussein","NOR1":"Team Logo","NOR2":"Ørjan Nyland","NOR3":"Matz Sels","NOR4":"Leo Ostigard","NOR5":"Andreas Hanche-Olsen","NOR6":"Birger Meling","NOR7":"Stian Gregersen","NOR8":"Kristoffer Ajer","NOR9":"David Møller Wolfe","NOR10":"Fredrik Aursnes","NOR11":"Sander Berge","NOR12":"Morten Thorsby","NOR13":"Team Photo","NOR14":"Martin Ødegaard","NOR15":"Alexander Sørloth","NOR16":"Antonio Nusa","NOR17":"Erling Haaland","NOR18":"Mohamed Elyounoussi","NOR19":"Ola Solbakken","NOR20":"Mathias Normann","ARG1":"Team Logo","ARG2":"Emiliano Martínez","ARG3":"Franco Armani","ARG4":"Lisandro Martínez","ARG5":"Nicolás Otamendi","ARG6":"Nahuel Molina","ARG7":"Germán Pezzella","ARG8":"Marcos Acuña","ARG9":"Rodrigo De Paul","ARG10":"Enzo Fernández","ARG11":"Alexis Mac Allister","ARG12":"Leandro Paredes","ARG13":"Team Photo","ARG14":"Nico González","ARG15":"Giovani Lo Celso","ARG16":"Lautaro Martínez","ARG17":"Julián Álvarez","ARG18":"Alejandro Garnacho","ARG19":"Lionel Messi","ARG20":"Nico Paz","ALG1":"Team Logo","ALG2":"Rais M Bolhi","ALG3":"Farouk Chafai","ALG4":"Djamel Benlamri","ALG5":"Amar Belaïli","ALG6":"Riyad Mahrez","ALG7":"Youcef Atal","ALG8":"Mehdi Zeffane","ALG9":"Haris Belkebla","ALG10":"Ismael Bennacer","ALG11":"Nabil Bentaleb","ALG12":"Sofiane Feghouli","ALG13":"Team Photo","ALG14":"Saïd Benrahma","ALG15":"Baghdad Bounedjah","ALG16":"Islam Slimani","ALG17":"Yacine Brahimi","ALG18":"Houssem Aouar","ALG19":"Amine Gouiri","ALG20":"Andy Delort","AUT1":"Team Logo","AUT2":"Patrick Pentz","AUT3":"Heinz Lindner","AUT4":"Philipp Lienhart","AUT5":"David Alaba","AUT6":"Stefan Posch","AUT7":"Maximilian Wöber","AUT8":"Christoph Baumgartner","AUT9":"Florian Grillitsch","AUT10":"Nicolas Seiwald","AUT11":"Marcel Sabitzer","AUT12":"Konrad Laimer","AUT13":"Team Photo","AUT14":"Marko Arnautovic","AUT15":"Michael Gregoritsch","AUT16":"Valentino Lazaro","AUT17":"Patrick Wimmer","AUT18":"Romano Schmid","AUT19":"Kevin Danso","AUT20":"Florian Kainz","JOR1":"Team Logo","JOR2":"Yazeed Abulaila","JOR3":"Amer Shafi","JOR4":"Yazan Al-Arab","JOR5":"Baha Faisal","JOR6":"Abdallah Nasib","JOR7":"Ehab Ismail","JOR8":"Ahmad Harman","JOR9":"Musa Al-Tamari","JOR10":"Yosef Hjow","JOR11":"Qusai Abu Warda","JOR12":"Anas Bani-Yaseen","JOR13":"Team Photo","JOR14":"Saleh Hardani","JOR15":"Yazeed Abed","JOR16":"Mahmoud Daoud","JOR17":"Hamza Barqawi","JOR18":"Ahmad Al-Abed","JOR19":"Sami Al-Nimer","JOR20":"Ahmad Shukri","POR1":"Team Logo","POR2":"Diogo Costa","POR3":"Rui Patrício","POR4":"Rúben Dias","POR5":"Pepe","POR6":"Nuno Mendes","POR7":"João Cancelo","POR8":"Danilo Pereira","POR9":"João Palhinha","POR10":"Rúben Neves","POR11":"Bruno Fernandes","POR12":"Bernardo Silva","POR13":"Team Photo","POR14":"Vitinha","POR15":"Rafael Leão","POR16":"Pedro Neto","POR17":"João Félix","POR18":"Cristiano Ronaldo","POR19":"Gonçalo Ramos","POR20":"Francisco Conceição","COD1":"Team Logo","COD2":"Joël Kiassumbua","COD3":"Ben Malango","COD4":"Chancel Mbemba","COD5":"Arthur Masuaku","COD6":"Marcel Tisserand","COD7":"Theo Bongonda","COD8":"Charles Pickel","COD9":"Ngal ayel Mukau","COD10":"Edo Kayembe","COD11":"Samuel Moutoussamy","COD12":"Noah Sadiki","COD13":"Team Photo","COD14":"Théo Bongonda","COD15":"Meschak Elia","COD16":"Yoane Wissa","COD17":"Brian Cipenga","COD18":"Fiston Mayele","COD19":"Cédric Bakambu","COD20":"Nathanaël Mbuku","UZB1":"Team Logo","UZB2":"Utkir Yusupov","UZB3":"Farrukh Savfiev","UZB4":"Sherzod Nasrullaev","UZB5":"Umar Eshmurodov","UZB6":"Husniddin Aliqulov","UZB7":"Rustamjon Ashurmatov","UZB8":"Khojiakbar Alijonov","UZB9":"Abdukodir Khusanov","UZB10":"Odiljon Hamrobekov","UZB11":"Otabek Shukurov","UZB12":"Jamshid Iskanderov","UZB13":"Team Photo","UZB14":"Azizbek Turgunboev","UZB15":"Khojimat Erkinov","UZB16":"Eldor Shomurodov","UZB17":"Oston Urunov","UZB18":"Jaloliddin Masharipov","UZB19":"Jasur Yakhshiboev","UZB20":"Shamsiddin Karimov","COL1":"Team Logo","COL2":"Camilo Vargas","COL3":"David Ospina","COL4":"Davinson Sanchez","COL5":"Yerry Mina","COL6":"Daniel Munoz","COL7":"Johan Mojica","COL8":"Santiago Arias","COL9":"Jefferson Lerma","COL10":"Wilmar Barrios","COL11":"Richard Rios","COL12":"Mateus Uribe","COL13":"Team Photo","COL14":"Juan Fernando Quintero","COL15":"James Rodriguez","COL16":"Luis Díaz","COL17":"Rafael Santos Borré","COL18":"Jhon Durán","COL19":"Falcao","COL20":"Cucho Hernandez","ENG1":"Team Logo","ENG2":"Jordan Pickford","ENG3":"Nick Pope","ENG4":"Harry Maguire","ENG5":"John Stones","ENG6":"Kieran Trippier","ENG7":"Luke Shaw","ENG8":"Trent Alexander-Arnold","ENG9":"Declan Rice","ENG10":"Jude Bellingham","ENG11":"Phil Foden","ENG12":"Bukayo Saka","ENG13":"Team Photo","ENG14":"Kobbie Mainoo","ENG15":"Cole Palmer","ENG16":"Marcus Rashford","ENG17":"Jack Grealish","ENG18":"Harry Kane","ENG19":"Ollie Watkins","ENG20":"Eberechi Eze","CRO1":"Team Logo","CRO2":"Dominik Livaković","CRO3":"Josip Stanišić","CRO4":"Josip Šutalo","CRO5":"Borna Sosa","CRO6":"Joško Gvardiol","CRO7":"Duje Ćaleta-Car","CRO8":"Martin Erlić","CRO9":"Luka Modrić","CRO10":"Mateo Kovačić","CRO11":"Marcelo Brozović","CRO12":"Ivan Perišić","CRO13":"Team Photo","CRO14":"Mario Pašalić","CRO15":"Andrej Kramarić","CRO16":"Bruno Petković","CRO17":"Nikola Vlašić","CRO18":"Ivan Zucco","CRO19":"Ante Budimir","CRO20":"Petar Sučić","GHA1":"Team Logo","GHA2":"Lawrence Ati-Zigi","GHA3":"Joe Wollacott","GHA4":"Abdul Mumin","GHA5":"Daniel Amartey","GHA6":"Alexander Djiku","GHA7":"Tariq Lamptey","GHA8":"Alidu Seidu","GHA9":"Emmanuel Gyasi","GHA10":"Thomas Partey","GHA11":"Salis Abdul Samed","GHA12":"Kamaldeen Sulemana","GHA13":"Team Photo","GHA14":"Antoine Semenyo","GHA15":"Mohammed Kudus","GHA16":"Jordan Ayew","GHA17":"Andrew Ayew","GHA18":"Joseph Paintsil","GHA19":"Osman Bukari","GHA20":"Abdul Fatawu Issahaku","PAN1":"Team Logo","PAN2":"Orlando Mosquera","PAN3":"Luis Mejia","PAN4":"Fidel Escobar","PAN5":"Andres Andrade","PAN6":"Michael Amir Murillo","PAN7":"Eric Davis","PAN8":"Jose Cordoba","PAN9":"Cesar Blackman","PAN10":"Cristian Martinez","PAN11":"Aníbal Godoy","PAN12":"Adalberto Carrasquilla","PAN13":"Team Photo","PAN14":"Édgar Bárcenas","PAN15":"Carlos Harvey","PAN16":"Ismael Díaz","PAN17":"Jose Fajardo","PAN18":"Cecilio Waterman","PAN19":"Jose Luiz Rodriguez","PAN20":"Alberto Quintero"};

const PAGE_MAP = {"FWC":2,"MUS":4,"MEX":6,"RSA":8,"KOR":10,"CZE":12,"CAN":14,"BIH":16,"QAT":18,"SUI":20,"BRA":22,"MAR":24,"HAI":26,"SCO":28,"USA":30,"PAR":32,"AUS":34,"TUR":36,"GER":38,"CUW":40,"CIV":42,"ECU":44,"NED":46,"JPN":48,"SWE":50,"TUN":52,"BEL":54,"EGY":56,"IRN":58,"NZL":60,"ESP":62,"CPV":64,"KSA":66,"URU":68,"FRA":70,"SEN":72,"IRQ":74,"NOR":76,"ARG":78,"ALG":80,"AUT":82,"JOR":84,"POR":86,"COD":88,"UZB":90,"COL":92,"ENG":94,"CRO":96,"GHA":98,"PAN":100};
window.openSidebar=function(){
  const s=document.getElementById('sidebar');
  const o=document.getElementById('sideOvl');
  if(s)s.classList.add('open');
  if(o)o.classList.add('open');
};
window.closeSidebar=function(){
  const s=document.getElementById('sidebar');
  const o=document.getElementById('sideOvl');
  if(s)s.classList.remove('open');
  if(o)o.classList.remove('open');
};




let ST={}, session=null, pendP=null, selE='⚽', fmode='all', srch='', ctab='c', chatUnsub=null, lastMsgCount=0;

function saveLocal(){
  if(session){
    localStorage.setItem('wc26_'+session.nome,JSON.stringify(ST));
    clearTimeout(window._fbSave);
    window._fbSave=setTimeout(saveFirebase,1500);
  }
}
async function saveFirebase(){
  if(!session) return;
  try{
    await setDoc(doc(db,'stickers',session.nome),{st:ST,updated:Date.now()},{merge:false});
  }catch(e){console.error('saveFirebase',e);}
}
async function loadFirebase(){
  if(!session) return;
  try{
    const d=await getDoc(doc(db,'stickers',session.nome));
    if(d.exists()&&d.data().st){
      const remote=d.data().st;
      const remoteCount=Object.values(remote).filter(v=>v>=1).length;
      const localCount=Object.values(ST).filter(v=>v>=1).length;
      // usar o que tem mais cromos marcados (migração automática)
      if(remoteCount>=localCount){
        ST=remote;
      } else {
        // local tem mais — guardar no Firebase
        await saveFirebase();
      }
      localStorage.setItem('wc26_'+session.nome,JSON.stringify(ST));
    } else if(Object.keys(ST).length>0){
      // não há dados no Firebase mas há local — migrar para Firebase
      await saveFirebase();
    }
  }catch(e){console.error('loadFirebase',e);}
}

// ===== FIRESTORE =====
async function getUser(nome){try{const d=await getDoc(doc(db,'users',nome));return d.exists()?d.data():null;}catch(e){return null;}}
async function setUser(nome,data){try{await setDoc(doc(db,'users',nome),data,{merge:true});}catch(e){console.error(e);}}
async function getAllUsers(){try{const s=await getDocs(collection(db,'users'));const r={};s.forEach(d=>r[d.id]=d.data());return r;}catch(e){return {};}}

async function pushShared(){
  if(!session)return;
  try{
    const reps=Object.entries(ST).filter(([,v])=>v===2).map(([k])=>k);
    const have=Object.values(ST).filter(v=>v>=1).length;
    await setDoc(doc(db,'shared',session.nome),{
      nome:session.nome,child:session.child||'',emoji:session.emoji||'⚽',photo:session.photo||'',
      reps,have,pct:Math.round(have/TOTAL*100),updated:Date.now()
    });
  }catch(e){console.error(e);}
}
async function loadShared(){
  try{const s=await getDocs(collection(db,'shared'));const r=[];s.forEach(d=>{if(d.id!==session.nome){const u=d.data();if(Date.now()-(u.updated||0)<30*24*3600*1000)r.push(u);}});return r;}
  catch(e){return [];}
}

// ===== ACCESS =====
window.swA=function(t){
  document.getElementById('atL').classList.toggle('on',t==='l');
  document.getElementById('atR').classList.toggle('on',t==='r');
  document.getElementById('panL').style.display=t==='l'?'flex':'none';
  document.getElementById('panR').style.display=t==='r'?'flex':'none';
};

window.doRegister=async function(){
  const child=document.getElementById('rChild').value.trim();
  const nome=document.getElementById('rName').value.trim();
  const pass=document.getElementById('rPass').value;
  const msg=document.getElementById('rMsg');
  if(!child||!nome||!pass){msg.className='amsg err';msg.textContent='Preenche todos os campos.';return;}
  if(pass.length<4){msg.className='amsg err';msg.textContent='Password com mínimo 4 caracteres.';return;}
  const existing=await getUser(nome);
  if(existing){
    msg.className='amsg err';
    msg.innerHTML='Este nome já existe.<br><small>Escolhe outro nome ou recupera o acesso com o admin.</small>';
    return;
  }
  const isAdmin=(nome===ADMIN);
  const u={nome,child,pass:btoa(pass),emoji:'⚽',photo:'',status:isAdmin?'approved':'pending',isAdmin:!!isAdmin,created:Date.now()};
  await setUser(nome,u);
  if(isAdmin){msg.className='amsg ok';msg.textContent='Conta admin criada! A entrar…';setTimeout(()=>startSession(u),1000);}
  else{msg.className='amsg info';msg.innerHTML=`Pedido enviado! 🎉<br><small>O Nicolau Mira irá aprovar o teu acesso em breve.</small>`;}
};

window.doLogin=async function(){
  const nome=document.getElementById('lName').value.trim();
  const pass=document.getElementById('lPass').value;
  const msg=document.getElementById('lMsg');
  if(!nome||!pass){msg.className='amsg err';msg.textContent='Preenche os campos.';return;}
  const u=await getUser(nome);
  if(!u||btoa(pass)!==u.pass){msg.className='amsg err';msg.textContent='Nome ou password incorrectos.';return;}
  if(u.status==='pending'){msg.className='amsg info';msg.innerHTML=`⏳ Aguarda aprovação.<br><small>O Nicolau Mira ainda não aprovou o teu acesso.</small>`;return;}
  if(u.status==='rejected'){msg.className='amsg err';msg.textContent='Acesso negado pelo administrador.';return;}
  startSession(u);
};

async function startSession(u){
  session=u;
  try{ST=JSON.parse(localStorage.getItem('wc26_'+u.nome)||'{}');}catch(e){}
  localStorage.setItem('wc26_sess',JSON.stringify({nome:u.nome,pass:u.pass}));
  document.getElementById('accessScreen').style.display='none';
  document.getElementById('appScreen').style.display='block';
  applyPrf();
  // carregar cromos do Firebase (sincroniza todos os dispositivos)
  await loadFirebase();
  updGlobal();renderC();
  if(u.isAdmin){
    document.getElementById('adminBtn').style.display='flex';
    document.getElementById('tadm').style.display='flex';
    checkPendingNotif();
  }
  startChatNotif();
  pushShared();
}

async function checkPendingNotif(){
  const users=await getAllUsers();
  const hasPending=Object.values(users).some(u=>u.status==='pending');
  document.getElementById('adminNotif').style.display=hasPending?'flex':'none';
}

// chat notif — conta mensagens novas
function startChatNotif(){
  const q=query(collection(db,'chat'),orderBy('ts','desc'),limit(1));
  onSnapshot(q,snap=>{
    if(ctab==='ch')return;
    const msgs=[];snap.forEach(d=>msgs.push(d.data()));
    if(msgs.length&&msgs[0].nome!==session.nome){
      document.getElementById('chatNotif').style.display='block';
    }
  });
}

// ===== PROFILE =====
window.openPrf=function(){
  document.getElementById('nInp').value=session.nome;
  selE=session.emoji||'⚽';pendP=session.photo||null;
  document.getElementById('egrid').innerHTML=EMOJIS.map(e=>`<div class="eopt${e===selE?' sel':''}" onclick="selEmoji('${e}')">${e}</div>`).join('');
  if(session.photo){
    document.getElementById('pprev2').src=session.photo;
    document.getElementById('pprev2').style.display='block';
    document.getElementById('pph').style.display='none';
    document.getElementById('pclr').style.display='block';
  }else{
    document.getElementById('pprev2').style.display='none';
    document.getElementById('pph').style.display='block';
    document.getElementById('pclr').style.display='none';
  }
  swAv(session.photo?'p':'e');
  document.getElementById('prfOvl').classList.add('open');
};
window.closePrf=function(){document.getElementById('prfOvl').classList.remove('open');};
window.swAv=function(t){
  document.getElementById('tsE').classList.toggle('on',t==='e');
  document.getElementById('tsP').classList.toggle('on',t==='p');
  document.getElementById('panE').style.display=t==='e'?'block':'none';
  document.getElementById('panP').style.display=t==='p'?'block':'none';
};
window.handlePh=function(ev){
  const file=ev.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    const img=new Image();
    img.onload=function(){
      const canvas=document.createElement('canvas'),S=160;
      canvas.width=S;canvas.height=S;
      const ctx=canvas.getContext('2d');
      const s=Math.min(img.width,img.height);
      ctx.drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,S,S);
      pendP=canvas.toDataURL('image/jpeg',.75);
      document.getElementById('pprev2').src=pendP;
      document.getElementById('pprev2').style.display='block';
      document.getElementById('pph').style.display='none';
      document.getElementById('pclr').style.display='block';
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
};
window.clrPh=function(){pendP=null;document.getElementById('finp').value='';document.getElementById('pprev2').style.display='none';document.getElementById('pph').style.display='block';document.getElementById('pclr').style.display='none';};
window.selEmoji=function(e){selE=e;document.querySelectorAll('.eopt').forEach(el=>el.classList.toggle('sel',el.textContent===e));};
window.savePrf=async function(){
  session.emoji=selE;session.photo=pendP||'';
  await setUser(session.nome,{emoji:selE,photo:pendP||''});
  localStorage.setItem('wc26_sess',JSON.stringify({nome:session.nome,pass:session.pass}));
  applyPrf();closePrf();pushShared();showToast('✓ Perfil guardado!');
};
function applyPrf(){
  if(!session)return;
  document.getElementById('hName').textContent=session.child||session.nome;
  document.getElementById('hSub').textContent=(session.child?'Pais: '+session.nome:session.nome)+' · 980 Cromos';
  const av=document.getElementById('avEl');
  av.innerHTML=session.photo?`<img src="${session.photo}">`:`<span style="font-size:40px">${session.emoji||'⚽'}</span>`;
  document.title=(session.child||session.nome)+' · Mundial 2026';
}

// ===== STATS =====
function updGlobal(){
  const vals=Object.values(ST);
  const have=vals.filter(v=>v>=1).length,rep=vals.filter(v=>v===2).length,pct=Math.round(have/TOTAL*100);
  document.getElementById('gbar').style.width=pct+'%';
  document.getElementById('gcnt').innerHTML=have+' <span>/ '+TOTAL+'</span>';
  document.getElementById('gpct').textContent=pct+'%';
  document.getElementById('shave').textContent='✓ '+have+' tenho';
  document.getElementById('smiss').textContent='✗ '+(TOTAL-have)+' em falta';
  document.getElementById('srep').textContent='⟳ '+rep+' repetidos';
}
function updSec(code,stickers){
  const el=document.getElementById('sp_'+code),bar=document.getElementById('spb_'+code);if(!el)return;
  const done=stickers.filter(n=>(ST[code+'_'+n]||0)>=1).length;
  const t=GROUPS.flatMap(g=>g.teams).find(t=>t.c===code)||SPECIALS.find(s=>s.c===code);
  const cor=t?.co||'#f5c518';
  el.textContent=done+'/'+stickers.length;
  el.style.color=done===stickers.length?'var(--ok)':done>0?cor:'var(--mu)';
  if(bar)bar.style.width=Math.round(done/stickers.length*100)+'%';
}

// ===== CICLO =====
window.cycle=function(code,n){
  const key=code+'_'+n,cur=ST[key]||0,next=(cur+1)%3;
  ST[key]=next;saveLocal();updGlobal();
  const t=GROUPS.flatMap(g=>g.teams).find(t=>t.c===code),sp=SPECIALS.find(s=>s.c===code);
  if(t)updSec(code,Array.from({length:20},(_,i)=>code+(i+1)));
  if(sp)updSec(code,sp.st.map(s=>s.n));
  const el=document.getElementById('cr_'+(code+'_'+n).replace(/[^a-z0-9]/gi,'_'));
  if(el){
    el.classList.remove('s1','s2');
    if(next===1)el.classList.add('s1');
    if(next===2)el.classList.add('s2');
    const b=el.querySelector('.cbdg');
    if(b)b.textContent=next===1?'✓':next===2?'⟳':'';
  }
  if(next===0)showToast('Removido','tc');
  else if(next===1)showToast('✓ '+n+' — tenho!');
  else showToast('⟳ '+n+' — repetido!','tr');
  setTimeout(pushShared,700);
};

// ===== BUILD CROMO =====
function bCromo(code,cor,n){
  const key=code+'_'+n,st=ST[key]||0;
  if(fmode==='missing'&&st>=1)return '';
  if(fmode==='have'&&st<1)return '';
  if(fmode==='rep'&&st!==2)return '';
  const ns=String(n);
  if(srch&&!code.toLowerCase().includes(srch)&&!ns.toLowerCase().includes(srch))return '';
  const sid='cr_'+(code+'_'+n).replace(/[^a-z0-9]/gi,'_');
  const cls='cromo'+(st===1?' s1':st===2?' s2':'');
  const badge=st===1?'✓':st===2?'⟳':'';
  const shortN=String(n).replace(code,'');
  const playerName = PLAYERS[n] || '';
  const pageNum = PAGE_MAP[code] || '';
  const tooltipTxt = playerName ? `${n} · ${playerName}${pageNum?' · pág.'+pageNum:''}` : n;
  return `<div class="${cls}" id="${sid}" onclick="cycle('${code}','${n}')" onmouseenter="showTip(event,'${tooltipTxt}')" onmouseleave="hideTip()">
    <div class="cbdg">${badge}</div>
    <div class="cnum">${shortN}</div>
    <div class="cbar" style="background:${cor}"></div>
  </div>`;
}

function bSec(code,flag,nome,cor,stickers){
  const done=stickers.filter(n=>(ST[code+'_'+n]||0)>=1).length,total=stickers.length,pct=Math.round(done/total*100);
  const pc=done===total?'var(--ok)':done>0?cor:'var(--mu)',bg=cor+'18';
  const cromosHtml=stickers.map(n=>bCromo(code,cor,n)).join('');
  if(!cromosHtml.trim())return '';
  return `<div class="sec" id="sec_${code}" style="border-color:${cor}40">
    <div class="sec-hdr" style="background:${bg}" onclick="togSec('${code}')">
      <div class="sec-flag">${flag}</div>
      <div class="sec-title" style="color:${cor}">${nome}</div>
      <div class="sec-pbw"><div class="sec-pb" id="spb_${code}" style="width:${pct}%;background:${cor}"></div></div>
      <div class="sec-prog" id="sp_${code}" style="color:${pc}">${done}/${total}</div>
      <div class="sec-tog">▾</div>
    </div>
    <div class="sec-body" style="background:${bg}">
      <div class="leg">
        <span class="li"><span class="ld" style="background:var(--ok2);border-color:var(--ok)"></span>1× tenho</span>
        <span class="li"><span class="ld" style="background:var(--rep2);border-color:var(--rep)"></span>2× repetido</span>
        <span class="li" style="font-size:9px;opacity:.7">3× limpar</span>
      </div>
      <div class="cgrid">${cromosHtml}</div>
    </div>
  </div>`;
}

// ===== RENDER CHECKLIST =====
function renderC(){
  let html='';
  for(const sp of SPECIALS){const h=bSec(sp.c,sp.f,sp.n,sp.co,sp.st.map(s=>s.n));if(h)html+=h;}
  for(const grp of GROUPS){
    let gh='';
    for(const t of grp.teams){const h=bSec(t.c,t.f,t.n,t.co,Array.from({length:20},(_,i)=>t.c+(i+1)));if(h)gh+=h;}
    if(!gh)continue;
    html+=`<div class="grp-div">
      <div class="grp-badge" style="background:${grp.cor}">${grp.g}</div>
      <div class="grp-label" style="color:${grp.cor}">GRUPO ${grp.g}</div>
      <div class="grp-line" style="background:${grp.cor}40"></div>
    </div>${gh}`;
  }
  document.getElementById('mc').innerHTML=html||`<div class="empty-state"><div class="ei">🔍</div><div class="et">Nenhum cromo encontrado</div></div>`;
  updGlobal();
}

// ===== RENDER REPETIDOS =====
function renderR(){
  const byTeam={};
  for(const grp of GROUPS)for(const t of grp.teams)for(let i=1;i<=20;i++){const n=t.c+i;if((ST[t.c+'_'+n]||0)===2){if(!byTeam[t.c])byTeam[t.c]={t,grp:grp.g,gc:grp.cor,nums:[]};byTeam[t.c].nums.push(n);}}
  for(const sp of SPECIALS)for(const st of sp.st)if((ST[sp.c+'_'+st.n]||0)===2){if(!byTeam[sp.c])byTeam[sp.c]={t:sp,grp:'ESP',gc:sp.co,nums:[]};byTeam[sp.c].nums.push(st.n);}
  const total=Object.values(byTeam).reduce((a,v)=>a+v.nums.length,0);
  if(!total){document.getElementById('mc').innerHTML=`<div class="empty-state"><div class="ei">🔁</div><div class="et">Sem repetidos</div><div class="es">Clica 2× num cromo para marcar como repetido</div></div>`;return;}

  // gerar texto para WhatsApp
  const waText=Object.values(byTeam).map(({t,nums})=>`${t.f} ${t.n}: ${nums.map(n=>String(n).replace(t.c||t.c,'')).join(', ')}`).join('\n');
  const waMsg=encodeURIComponent(`🌍⚽ *MUNDIAL 2026 · REPETIDOS PARA TROCA*\n${session.child||session.nome}\n\n${waText}\n\nnmir4.github.io/mundial2026`);

  let html=`<div style="background:var(--s2);border:1px solid var(--rep);border-radius:10px;padding:12px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
    <span style="font-size:24px">🔁</span>
    <div style="flex:1">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:2px;color:var(--rep)">REPETIDOS PARA TROCA</div>
      <div style="font-size:11px;color:var(--mu)">${total} cromos disponíveis</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <a class="wa-btn" href="https://wa.me/?text=${waMsg}" target="_blank">📲 WhatsApp</a>
      <button class="btn pdf" onclick="printPDF('repeated')">🖨️ PDF</button>
    </div>
  </div>`;

  for(const key in byTeam){
    const{t,grp,gc,nums}=byTeam[key],cor=t.co||t.cor,bg=cor+'18';
    html+=`<div class="sec" style="border-color:${cor}40;margin-bottom:8px">
      <div class="sec-hdr" style="background:${bg};cursor:default">
        <div class="sec-flag">${t.f}</div>
        <div class="sec-title" style="color:${cor}">${t.n}</div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;color:${gc};font-weight:700;letter-spacing:1px">Grupo ${grp}</div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:13px;color:var(--rep);font-weight:700;margin-left:6px">${nums.length}×</div>
      </div>
      <div class="sec-body" style="background:${bg}">
        <div class="cgrid">${nums.map(n=>{
          const sid='cr_'+(t.c+'_'+n).replace(/[^a-z0-9]/gi,'_');
          return `<div class="cromo s2" id="${sid}" onclick="cycle('${t.c}','${n}')" title="Clica para limpar">
            <div class="cbdg" style="display:flex;background:var(--rep);color:#000">⟳</div>
            <div class="cnum" style="color:var(--rep)">${String(n).replace(t.c,'')}</div>
            <div class="cbar" style="background:${cor}"></div>
          </div>`;
        }).join('')}</div>
      </div>
    </div>`;
  }
  document.getElementById('mc').innerHTML=html;
}

// ===== RENDER TROCAS =====
async function renderT(){
  document.getElementById('mc').innerHTML=`<div class="loading"><div class="spin"></div><br>A carregar trocas...</div>`;
  const myReps=new Set(Object.entries(ST).filter(([,v])=>v===2).map(([k])=>k));
  const myMiss=new Set();
  for(const grp of GROUPS)for(const t of grp.teams)for(let i=1;i<=20;i++){const n=t.c+i;if(!(ST[t.c+'_'+n]>=1))myMiss.add(t.c+'_'+n);}
  for(const sp of SPECIALS)for(const st of sp.st){if(!(ST[sp.c+'_'+st.n]>=1))myMiss.add(sp.c+'_'+st.n);}
  const users=await loadShared();
  if(!users.length){
    document.getElementById('mc').innerHTML=`<div class="empty-state"><div class="ei">🌍</div><div class="et">Ainda és o primeiro!</div><div class="es">Partilha o link com os outros pais.<br>Quando criarem conta e forem aprovados,<br>aparecem aqui automaticamente.</div></div>`;
    return;
  }
  const wm=users.map(u=>{
    const theirReps=new Set(u.reps||[]),canGet=[...theirReps].filter(r=>myMiss.has(r));
    return{...u,canGet,score:canGet.length};
  }).sort((a,b)=>b.score-a.score);

  let html=`<div style="background:var(--s2);border:1px solid var(--mat);border-radius:10px;padding:12px 14px;margin-bottom:12px">
    <div style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:2px;color:var(--mat)">🤝 BOLSA DE TROCAS · ${users.length} família${users.length>1?'s':''}</div>
    <div style="font-size:11px;color:var(--mu);margin-top:2px">Ordenado por compatibilidade · actualiza ao abrir o tab</div>
  </div>`;

  for(const u of wm){
    const mc=u.score===0?'m0':u.score>=5?'mgg':'mg';
    const ml=u.score===0?'Sem match':u.score>=5?`🔥 ${u.score} match!`:`✨ ${u.score} match`;
    const av=u.photo?`<img src="${u.photo}">`:(u.emoji||'⚽');
    // WhatsApp para combinar troca
    const waMsg=encodeURIComponent(`Olá! Sou ${session.child||session.nome} 👋\nVi que temos ${u.score} cromo${u.score!==1?'s':''} para trocar no Mundial 2026 🌍⚽\nPodemos combinar?`);
    html+=`<div class="ucard">
      <div class="uchead">
        <div class="uavsm">${av}</div>
        <div>
          <div class="unm">${u.child||u.nome}</div>
          <div class="ust">${u.nome} · ${u.reps?.length||0} repetidos · ${u.pct||0}% completo</div>
        </div>
        <div class="mbdg ${mc}">${ml}</div>
      </div>`;
    if(u.canGet.length){
      html+=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--ok);margin-bottom:4px;text-transform:uppercase">✓ Podes receber (${u.canGet.length})</div>
        <div class="stags">${u.canGet.slice(0,24).map(s=>`<span class="stag cg">${s.split('_')[1]||s}</span>`).join('')}${u.canGet.length>24?`<span class="stag">+${u.canGet.length-24}</span>`:''}</div>`;
    }
        const myRepsForThem=[...myReps].filter(r=>!(new Set(u.reps||[])).has(r));
    if(myRepsForThem.length){
      html+=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--rep);margin:7px 0 4px;text-transform:uppercase">⟳ Podes dar a ${u.child||u.nome} (${myRepsForThem.length})</div>
        <div class="stags">${myRepsForThem.slice(0,16).map(s=>{const k=s.split('_')[1]||s;const pn=PLAYERS[k]||'';return '<span class="stag cd" title="'+k+(pn?' · '+pn:'')+'">'+k+'</span>';}).join('')}${myRepsForThem.length>16?'<span class="stag">+'+String(myRepsForThem.length-16)+'</span>':''}</div>`;
    } else if(myReps.size){
      html+=`<div style="font-size:10px;color:var(--mu);margin-top:5px;font-style:italic">Sem repetidos novos para ${u.child||u.nome}</div>`;
    }
    if(u.score>0||myRepsForThem.length>0){
      // mensagem WhatsApp com detalhes dos cromos
      const getMsgs = u.canGet.slice(0,10).map(s=>s.split('_')[1]||s).join(', ');
      const giveMsgs = myRepsForThem.slice(0,10).map(s=>s.split('_')[1]||s).join(', ');
      const waDetail = encodeURIComponent(
        'Olá! Sou ' + (session.child||session.nome) + ' 👋\n' +
        'Podemos trocar cromos do Mundial 2026 🌍⚽\n\n' +
        (u.canGet.length ? '📥 Quero de ti: ' + getMsgs + (u.canGet.length>10?' e mais...':'') + '\n' : '') +
        (myRepsForThem.length ? '📤 Posso dar-te: ' + giveMsgs + (myRepsForThem.length>10?' e mais...':'') + '\n' : '') +
        '\nnmir4.github.io/mundial2026'
      );
      html+=`<a class="wa-btn" href="https://wa.me/?text=${waDetail}" target="_blank">📲 Combinar via WhatsApp</a>`;
    }
    html+=`</div>`;
  }
  document.getElementById('mc').innerHTML=html;
}

// ===== RENDER CHAT =====
async function renderCH(){
  if(chatUnsub){chatUnsub();chatUnsub=null;}
  document.getElementById('chatNotif').style.display='none';
  document.getElementById('mc').innerHTML=`<div class="chat-wrap"><div class="chat-msgs" id="chatMsgs"><div class="loading"><div class="spin"></div></div></div><div class="cinput"><textarea id="chatTxt" placeholder="Escreve uma mensagem…" rows="1" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();doSend();}"></textarea><button class="csend" onclick="doSend()">Enviar</button></div></div>`;
  const q=query(collection(db,'chat'),orderBy('ts','asc'),limit(100));
  chatUnsub=onSnapshot(q,snap=>{
    const msgs=[];snap.forEach(d=>msgs.push(d.data()));
    const cont=document.getElementById('chatMsgs');if(!cont)return;
    if(!msgs.length){cont.innerHTML='<div class="empty-state" style="padding:30px 20px"><div class="ei" style="font-size:36px">💬</div><div class="et">Sem mensagens ainda</div><div class="es">Sê o primeiro a escrever!</div></div>';return;}
    const wasBottom=cont.scrollHeight-cont.scrollTop-cont.clientHeight<80;
    cont.innerHTML=msgs.map(m=>{
      const mine=m.nome===session.nome;
      const av=m.photo?`<img src="${m.photo}">`:(m.emoji||'💬');
      const ts=m.ts?.toDate?m.ts.toDate():new Date(m.ts||Date.now());
      const time=ts.toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'});
      const date=ts.toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit'});
      const today=new Date().toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit'});
      const timeStr=date===today?time:`${date} ${time}`;
      return `<div class="cmsg${mine?' mine':''}">
        <div class="cmav">${av}</div>
        <div class="cmbbl">
          <div class="cmname">${m.child||m.nome}</div>
          <div class="cmtext">${String(m.text).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>
          <div class="cmtime">${timeStr}</div>
        </div>
      </div>`;
    }).join('');
    if(wasBottom||msgs[msgs.length-1]?.nome===session.nome)cont.scrollTop=cont.scrollHeight;
  });
}
window.doSend=async function(){
  const ta=document.getElementById('chatTxt');const txt=ta?.value.trim();if(!txt)return;
  ta.value='';ta.style.height='';
  try{await addDoc(collection(db,'chat'),{nome:session.nome,child:session.child||'',emoji:session.emoji||'⚽',photo:session.photo||'',text:txt,ts:serverTimestamp()});}
  catch(e){console.error(e);showToast('Erro ao enviar','tc');}
};

// ===== RANKING =====
async function renderS(){
  document.getElementById('mc').innerHTML=`<div class="loading"><div class="spin"></div><br>A carregar ranking...</div>`;
  const users=await loadShared();
  // incluir o próprio
  const myHave=Object.values(ST).filter(v=>v>=1).length;
  const myReps=Object.values(ST).filter(v=>v===2).length;
  const all=[
    {nome:session.nome,child:session.child||session.nome,emoji:session.emoji||'⚽',photo:session.photo||'',have:myHave,pct:Math.round(myHave/TOTAL*100),reps:myReps,me:true},
    ...users.map(u=>({...u,reps:u.reps?.length||0,me:false}))
  ].sort((a,b)=>b.have-a.have);

  const totalUsers=all.length;
  const totalHave=all.reduce((s,u)=>s+u.have,0);
  const totalReps=all.reduce((s,u)=>s+(u.reps||0),0);

  let html=`<div style="background:var(--s2);border:1px solid #f5c51840;border-radius:10px;padding:12px 14px;margin-bottom:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center">
    <div><div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--acc)">${totalUsers}</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--mu);text-transform:uppercase">Famílias</div></div>
    <div><div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--ok)">${totalHave}</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--mu);text-transform:uppercase">Cromos totais</div></div>
    <div><div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--rep)">${totalReps}</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--mu);text-transform:uppercase">Repetidos</div></div>
  </div>`;

  all.forEach((u,i)=>{
    const pos=i+1;
    const posClass=pos===1?'gold':pos===2?'silver':pos===3?'bronze':'';
    const posEmoji=pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':pos;
    const av=u.photo?`<img src="${u.photo}">`:(u.emoji||'⚽');
    const highlight=u.me?'border-color:var(--acc);background:var(--acc3);':'';
    html+=`<div class="ranking-card" style="${highlight}">
      <div class="rank-pos ${posClass}">${posEmoji}</div>
      <div class="rank-av">${av}</div>
      <div class="rank-info">
        <div class="rank-name">${u.child||u.nome}${u.me?' <span style="font-size:10px;color:var(--acc);font-family:Barlow Condensed,sans-serif;font-weight:700;letter-spacing:1px">(tu)</span>':''}</div>
        <div class="rank-sub">${u.have} cromos · ${u.reps||0} repetidos</div>
        <div class="rank-bar-wrap"><div class="rank-bar" style="width:${u.pct}%"></div></div>
      </div>
      <div class="rank-pct">${u.pct}%</div>
    </div>`;
  });
  document.getElementById('mc').innerHTML=html;
}

// ===== ADMIN =====
async function renderAdm(){
  if(!session?.isAdmin){document.getElementById('mc').innerHTML='<p style="color:var(--mu);text-align:center;padding:40px">Acesso restrito.</p>';return;}
  const users=await getAllUsers();const list=Object.values(users);
  const pending=list.filter(u=>u.status==='pending'),approved=list.filter(u=>u.status==='approved');
  // actualizar notif
  document.getElementById('adminNotif').style.display=pending.length?'flex':'none';

  let html=`<div class="asec"><div class="atit">⏳ Pedidos Pendentes <span style="background:#f5c51820;border:1px solid #f5c51840;color:var(--acc);font-size:11px;padding:1px 8px;border-radius:10px">${pending.length}</span></div>`;
  if(!pending.length)html+=`<div style="font-size:12px;color:var(--mu)">Sem pedidos pendentes.</div>`;
  for(const u of pending){
    html+=`<div class="urow">
      <div class="urav">${u.emoji||'⚽'}</div>
      <div style="flex:1"><div class="urname">${u.nome}</div><div style="font-size:10px;color:var(--mu)">Criança: ${u.child||'—'}</div></div>
      <span class="urbdg bpend">Pendente</span>
      <button class="btn grn" style="font-size:10px;padding:5px 9px" onclick="approveU('${u.nome}')">✓ Aprovar</button>
      <button class="btn red" style="font-size:10px;padding:5px 9px" onclick="rejectU('${u.nome}')">✕</button>
    </div>`;
  }
  html+=`</div><div class="asec"><div class="atit">✅ Membros Aprovados <span style="background:var(--ok2);border:1px solid #22c55e40;color:var(--ok);font-size:11px;padding:1px 8px;border-radius:10px">${approved.length}</span></div>`;
  for(const u of approved){
    const av=u.photo?`<img src="${u.photo}">`:(u.emoji||'⚽');
    html+=`<div class="urow">
      <div class="urav">${av}</div>
      <div style="flex:1"><div class="urname">${u.nome}</div><div style="font-size:10px;color:var(--mu)">Criança: ${u.child||'—'} · ${u.have||0} cromos</div></div>
      <span class="urbdg ${u.isAdmin?'badm':'bok'}">${u.isAdmin?'Admin':'Membro'}</span>
      ${!u.isAdmin?`<button class="btn" style="font-size:9px;padding:4px 7px;border-color:#60a5fa;color:#60a5fa" onclick="resetPw('${u.nome}')">🔑 PW</button><button class="btn red" style="font-size:10px;padding:5px 9px;margin-left:3px" onclick="removeU('${u.nome}')">✕</button>`:''}
    </div>`;
  }
  html+=`</div>`;
  document.getElementById('mc').innerHTML=html;
}

window.resetPw=async function(nome){
  const nova=prompt(`Nova password para ${nome}:`);
  if(!nova||nova.length<4){alert('Password mínimo 4 caracteres');return;}
  await setUser(nome,{pass:btoa(nova)});
  showToast('✓ Password de '+nome+' alterada!');
};
window.approveU=async function(nome){await setUser(nome,{status:'approved'});showToast('✓ '+nome+' aprovado!');renderAdm();};
window.rejectU=async function(nome){if(!confirm('Rejeitar '+nome+'?'))return;await setUser(nome,{status:'rejected'});showToast(nome+' rejeitado','tc');renderAdm();};
window.removeU=async function(nome){if(!confirm('Remover '+nome+'?'))return;try{await deleteDoc(doc(db,'users',nome));await deleteDoc(doc(db,'shared',nome));}catch(e){}showToast(nome+' removido','tc');renderAdm();};

// ===== PDF =====
function renderP(){
  const have=Object.values(ST).filter(v=>v>=1).length,miss=TOTAL-have,rep=Object.values(ST).filter(v=>v===2).length;
  function pr(ic,tit,cor,bc,sub,fn,dis){return `<div style="background:var(--s2);border:1px solid ${bc}40;border-radius:9px;padding:11px 13px;display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div style="font-size:22px">${ic}</div><div style="flex:1"><div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:13px;color:${cor}">${tit}</div><div style="font-size:11px;color:var(--mu)">${sub}</div></div><button class="btn pdf" onclick="${fn}" ${dis?'disabled':''}>🖨️ PDF</button></div>`;}
  document.getElementById('mc').innerHTML=`<div style="max-width:520px;margin:0 auto"><div style="background:var(--s1);border:1px solid var(--bd2);border-radius:10px;overflow:hidden;margin-bottom:12px">
    <div style="padding:13px 14px;border-bottom:1px solid var(--bd);background:var(--s2)">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--acc)">📄 RELATÓRIOS PDF</div>
      <div style="font-size:11px;color:var(--mu);margin-top:2px">${session.emoji||'⚽'} ${session.child||session.nome}</div>
    </div>
    <div style="padding:13px 14px;display:flex;flex-direction:column;gap:8px">
      ${pr('📋','Em Falta','#ff6b50','#ff4d2e',miss+' cromos','printPDF("missing")',miss===0)}
      ${pr('🔁','Repetidos','var(--rep)','#f97316',rep+' para troca','printPDF("repeated")',rep===0)}
      ${pr('📊','Resumo por Grupo','var(--ok)','#22c55e',Math.round(have/TOTAL*100)+'%','printPDF("summary")',false)}
      ${pr('📄','Relatório Completo','var(--acc)','#f5c518','Tudo junto','printPDF("all")',false)}
    </div>
  </div>
  <div style="font-size:10px;color:var(--mu);text-align:center;line-height:1.7">💡 No telemóvel: PDF → partilha → Guardar como PDF</div></div>`;
}

window.printPDF=function(type){
  const nome=session.child||session.nome,date=new Date().toLocaleDateString('pt-PT');
  const have=Object.values(ST).filter(v=>v>=1).length,miss=TOTAL-have,rep=Object.values(ST).filter(v=>v===2).length;
  let pages='';
  if(type==='summary'||type==='all'){
    let rows='';
    for(const sp of SPECIALS){const st=sp.st.map(s=>s.n),done=st.filter(n=>(ST[sp.c+'_'+n]||0)>=1).length,rc=st.filter(n=>(ST[sp.c+'_'+n]||0)===2).length,pct=Math.round(done/st.length*100);rows+=`<tr><td><b>${sp.f} ${sp.n}</b></td><td align="center">${st.length}</td><td align="center" style="color:green"><b>${done}</b></td><td align="center" style="color:red">${st.length-done}</td><td align="center" style="color:orange">${rc}</td><td>${pct}%</td></tr>`;}
    for(const grp of GROUPS){rows+=`<tr style="background:#e8e8e8"><td colspan="6" style="font-weight:900;letter-spacing:1px;padding:5px 8px;font-size:10px">⬛ GRUPO ${grp.g}</td></tr>`;for(const t of grp.teams){const st=Array.from({length:20},(_,i)=>t.c+(i+1)),done=st.filter(n=>(ST[t.c+'_'+n]||0)>=1).length,rc=st.filter(n=>(ST[t.c+'_'+n]||0)===2).length,pct=Math.round(done/20*100);rows+=`<tr><td>&nbsp;&nbsp;${t.f} <b>${t.n}</b></td><td align="center">20</td><td align="center" style="color:green"><b>${done}</b></td><td align="center" style="color:red">${20-done}</td><td align="center" style="color:orange">${rc}</td><td><div style="background:#eee;height:6px;width:50px;display:inline-block;vertical-align:middle;border-radius:3px;overflow:hidden"><div style="background:green;height:100%;width:${pct}%"></div></div> ${pct}%</td></tr>`;}}
    pages+=`<div class="pp"><div class="ph"><h2>FIFA WORLD CUP 2026 · PANINI</h2><p>${session.emoji||'⚽'} ${nome} · ${date}</p></div><div class="sr"><span>Total:<b>${TOTAL}</b></span><span style="color:green">Tenho:<b>${have}</b></span><span style="color:red">Falta:<b>${miss}</b></span><span style="color:orange">Rep.:<b>${rep}</b></span><span>Prog.:<b>${Math.round(have/TOTAL*100)}%</b></span></div><table class="tbl"><thead><tr><th>Seleção</th><th>Total</th><th>Tenho</th><th>Falta</th><th>Rep.</th><th>%</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  if(type==='missing'||type==='all'){
    let sh='';
    for(const sp of SPECIALS){const ms=sp.st.filter(st=>!(ST[sp.c+'_'+st.n]>=1));if(!ms.length)continue;sh+=`<div class="st">${sp.f} ${sp.n} <span class="sc">(${ms.length})</span></div><div class="nums">${ms.map(st=>`<span class="nb">${st.n}</span>`).join('')}</div>`;}
    for(const grp of GROUPS){let gs='';for(const t of grp.teams){const ms=Array.from({length:20},(_,i)=>t.c+(i+1)).filter(n=>!(ST[t.c+'_'+n]>=1));if(!ms.length)continue;gs+=`<div class="st">${t.f} ${t.n} <span class="sc">(${ms.length} em falta)</span></div><div class="nums">${ms.map(n=>`<span class="nb">${n}</span>`).join('')}</div>`;}if(gs)sh+=`<div style="font-weight:900;font-size:10px;letter-spacing:2px;margin:12px 0 3px;color:#666;border-bottom:1px solid #ddd;padding-bottom:3px">GRUPO ${grp.g}</div>`+gs;}
    pages+=`<div class="pp"><div class="ph"><h2>CROMOS EM FALTA · ${miss}</h2><p>${session.emoji||'⚽'} ${nome} · ${date}</p></div>${sh||'<p style="color:green;font-weight:bold;font-size:14px">🏆 Coleção completa! Parabéns!</p>'}</div>`;
  }
  if(type==='repeated'||type==='all'){
    let sh='';
    for(const sp of SPECIALS){const rs=sp.st.filter(st=>(ST[sp.c+'_'+st.n]||0)===2);if(!rs.length)continue;sh+=`<div class="st" style="border-color:orange">${sp.f} ${sp.n} <span class="sc">(${rs.length}×)</span></div><div class="nums">${rs.map(st=>`<span class="nb" style="border-color:orange">${st.n}</span>`).join('')}</div>`;}
    for(const grp of GROUPS){let gs='';for(const t of grp.teams){const rs=Array.from({length:20},(_,i)=>t.c+(i+1)).filter(n=>(ST[t.c+'_'+n]||0)===2);if(!rs.length)continue;gs+=`<div class="st" style="border-color:orange">${t.f} ${t.n} <span class="sc">(${rs.length}×)</span></div><div class="nums">${rs.map(n=>`<span class="nb" style="border-color:orange">${n}</span>`).join('')}</div>`;}if(gs)sh+=`<div style="font-weight:900;font-size:10px;letter-spacing:2px;margin:12px 0 3px;color:#666;border-bottom:1px solid #ddd;padding-bottom:3px">GRUPO ${grp.g}</div>`+gs;}
    pages+=`<div class="pp"><div class="ph"><h2>REPETIDOS PARA TROCA · ${rep}</h2><p>${session.emoji||'⚽'} ${nome} · ${date}</p></div>${sh||'<p>Sem repetidos.</p>'}</div>`;
  }
  // abrir PDF
  let win;
  try { win = window.open('','_blank'); } catch(e) { win = null; }
  if(!win || win.closed || typeof win.closed === 'undefined') {
    showToast('Permite pop-ups para gerar PDF','tc');
    return;
  }
  win.document.write(`<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Relatório · ${nome}</title><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;margin:0;padding:0;font-size:11px;color:#000;background:#fff}.pp{padding:18px 22px;page-break-after:always;max-width:780px;margin:0 auto}.pp:last-child{page-break-after:auto}.ph{text-align:center;margin-bottom:14px;border-bottom:3px solid #000;padding-bottom:10px}.ph h2{font-size:16px;font-weight:900;letter-spacing:3px;margin:0;text-transform:uppercase}.ph p{font-size:10px;color:#555;margin:4px 0 0}.sr{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px;font-size:11px;padding:8px;background:#f0f0f0;border-radius:4px}.st{font-weight:900;text-transform:uppercase;margin:11px 0 4px;border-left:4px solid #000;padding-left:8px;font-size:11px}.sc{font-weight:normal;font-size:9px}.nums{line-height:2.2}.nb{display:inline-block;min-width:34px;margin:1px 2px;padding:1px 5px;border:1px solid #ccc;border-radius:3px;font-size:9px;font-family:monospace;text-align:center}.tbl{width:100%;border-collapse:collapse;font-size:10px}.tbl th{background:#ddd;padding:5px 7px;text-align:left;border:1px solid #ccc;font-weight:900}.tbl td{padding:4px 7px;border:1px solid #ccc}.tbl tr:nth-child(even) td{background:#f9f9f9}@media print{@page{margin:13mm}}</style></head><body>${pages}</body></html>`);
  win.document.close();win.focus();setTimeout(()=>win.print(),400);
};

// ===== UTILS =====
window.setTab=function(t){
  ctab=t;
  if(chatUnsub&&t!=='ch'){chatUnsub();chatUnsub=null;}
  ['C','R','T','CH','S','P','adm'].forEach(x=>document.getElementById('t'+x)?.classList.toggle('active',x.toLowerCase()===t));
  document.getElementById('ctrlBar').style.display=t==='c'?'flex':'none';
  if(t==='c')renderC();
  else if(t==='r')renderR();
  else if(t==='t')renderT();
  else if(t==='ch')renderCH();
  else if(t==='s')renderS();
  else if(t==='p')renderP();
  else if(t==='adm')renderAdm();
};
window.fm=function(m){
  fmode=m;
  ['All','Miss','Have','Rep'].forEach(x=>{const val=x==='All'?'all':x==='Miss'?'missing':x==='Have'?'have':'rep';document.getElementById('b'+x)?.classList.toggle('on',m===val);});
  renderC();
};
window.resetAll=function(){if(!confirm('Apagar todo o progresso?'))return;ST={};saveLocal();updGlobal();renderC();showToast('Progresso apagado!','tc');};
window.togSec=function(id){document.getElementById('sec_'+id)?.classList.toggle('col');};
function showToast(msg,type=''){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast show'+(type?' '+type:'');
  clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),2000);
}
document.getElementById('lPass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('rPass').addEventListener('keydown',e=>{if(e.key==='Enter')doRegister();});
document.getElementById('srch').addEventListener('input',function(){srch=this.value.toLowerCase().trim();if(ctab==='c')renderC();});
document.getElementById('prfOvl').addEventListener('click',e=>{if(e.target===document.getElementById('prfOvl'))closePrf();});
document.addEventListener('input',e=>{if(e.target.tagName==='TEXTAREA'){e.target.style.height='';e.target.style.height=Math.min(e.target.scrollHeight,80)+'px';}});

// ===== TOOLTIP =====
window.showTip=function(e,txt){
  const t=document.getElementById('ctooltip');
  if(!t)return;
  t.textContent=txt;t.style.display='block';
  const x=Math.min(e.clientX+10, window.innerWidth-t.offsetWidth-10);
  const y=Math.max(e.clientY-40, 10);
  t.style.left=x+'px';t.style.top=y+'px';
};
window.hideTip=function(){
  const t=document.getElementById('ctooltip');
  if(t)t.style.display='none';
};
document.addEventListener('scroll',()=>hideTip(),{passive:true});

// ===== SIDEBAR =====

(async()=>{
  try{
    const saved=JSON.parse(localStorage.getItem('wc26_sess')||'null');
    if(saved){const u=await getUser(saved.nome);if(u&&u.pass===saved.pass&&u.status==='approved'){startSession(u);return;}}
  }catch(e){}
})();
