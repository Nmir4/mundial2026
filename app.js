
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
  if(existing){msg.className='amsg err';msg.textContent='Este nome já existe.';return;}
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
  return `<div class="${cls}" id="${sid}" onclick="cycle('${code}','${n}')" title="${n}">
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
    if(myReps.size){
      html+=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--rep);margin:7px 0 4px;text-transform:uppercase">⟳ Podes dar (${myReps.size})</div>
        <div class="stags">${[...myReps].slice(0,16).map(s=>`<span class="stag cd">${s.split('_')[1]||s}</span>`).join('')}${myReps.size>16?`<span class="stag">+${myReps.size-16}</span>`:''}</div>`;
    }
    if(u.score>0){
      html+=`<a class="wa-btn" href="https://wa.me/?text=${waMsg}" target="_blank">📲 Combinar troca via WhatsApp</a>`;
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
      <div style="flex:1"><div class="urname">${u.nome}</div><div style="font-size:10px;color:var(--mu)">Criança: ${u.child||'—'}</div></div>
      <span class="urbdg ${u.isAdmin?'badm':'bok'}">${u.isAdmin?'Admin':'Membro'}</span>
      ${!u.isAdmin?`<button class="btn red" style="font-size:10px;padding:5px 9px" onclick="removeU('${u.nome}')">Remover</button>`:''}
    </div>`;
  }
  html+=`</div>`;
  document.getElementById('mc').innerHTML=html;
}
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
(async()=>{
  try{
    const saved=JSON.parse(localStorage.getItem('wc26_sess')||'null');
    if(saved){const u=await getUser(saved.nome);if(u&&u.pass===saved.pass&&u.status==='approved'){startSession(u);return;}}
  }catch(e){}
})();
