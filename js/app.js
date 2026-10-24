
const $=s=>document.querySelector(s);
const VAL='https://valhalla1.openstreetmap.de';
/* Colle ici ta clé gratuite Stadia Maps (https://client.stadiamaps.com) : routage Valhalla fiable, sans le serveur public. */
const STADIA_KEY='9852c83d-8a83-4773-b7cf-f5d4c78fd959';
const FU={ev:'Électrique',essence:'Essence',diesel:'Diesel',hybrid:'Hybride',gpl:'GPL'};
const CN={all:'Toutes les prises',dom:'Prise domestique',t2:'Type 2',t1:'Type 1',ccs:'Combo CCS',cha:'CHAdeMO'};
const ICONS=['🚗','🚙','🚕','🚐','🛻','🏎️','🛵','🏍️'];
const VEH=[{n:'Voiture sans permis',e:'🚗',v:45,d:'45 km/h · sans voie rapide'},{n:'Scooter 50 cc',e:'🛵',v:45,d:'45 km/h · sans voie rapide'},{n:'Scooter 125 cc',e:'🏍️',v:80,d:'Jusqu’à 80 km/h · sans autoroute'}];
VEH.forEach(x=>x.base=x.v);function applyVmax(){VEH.forEach((x,i)=>x.v=(i===vi&&S.vmax>0)?S.vmax:x.base)}
const G={get(k,d){try{const v=localStorage.getItem('g:'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('g:'+k,JSON.stringify(v))}catch(e){}}};
const CUR=G.get('cur','guest'),PF=CUR==='guest'?'':CUR+':';
const store={get(k,d){try{const v=localStorage.getItem(PF+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(PF+k,JSON.stringify(v))}catch(e){}if(typeof syncSoon==='function')syncSoon()}};
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DEF={voice:true,vol:1,alert:true,tol:3,notoll:true,noferry:true,notrack:true,alts:true,theme:'auto',showrep:true,repbtn:true,flow:true,avoid:true,incmap:true,focusrem:true,duck:true,vmax:0,cons:0,vcol:'#FFCF1F',beg:false,vsp:false,fuel:'essence',conn:'all',vicon:'',vname:'',cursor:'auto',style:'liberty',tilt:true,head:true,traffic:true,tomtom:'',stadia:''};
const S=Object.assign({},DEF,store.get('set',{}));
function applyTheme(){if(S.theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.dataset.theme=S.theme}
applyTheme();
const CI={fuel:'⛽',charging_station:'🔌',parking:'🅿️',supermarket:'🛒',convenience:'🛒',mall:'🛍️',restaurant:'🍽️',fast_food:'🍔',cafe:'☕',bar:'🍺',school:'🏫',university:'🎓',college:'🏫',hospital:'🏥',clinic:'🏥',pharmacy:'💊',doctors:'🩺',dentist:'🦷',station:'🚉',bus_station:'🚌',hotel:'🏨',bakery:'🥖',cinema:'🎬',library:'📚',bank:'🏦',post_office:'📮',townhall:'🏛️',stadium:'🏟️',sports_centre:'🏟️',park:'🌳',place_of_worship:'⛪'};
const emo=e=>{const d=document.createElement('div');d.className='emo';d.textContent=e;return d};
const VK={'🚗':'sedan','🚙':'suv','🚕':'compact','🚐':'van','🛻':'pick','🏎️':'sport','🛵':'sco','🏍️':'moto'};
const VN={sedan:'Berline',suv:'SUV',compact:'Citadine',van:'Van',pick:'Pick-up',sport:'Sportive',sco:'Scooter',moto:'Moto'};
const SV={
 sedan:'<rect x="6" y="3" width="28" height="58" rx="13" fill="@@" stroke="#fff" stroke-width="3"/><rect x="10" y="15" width="20" height="11" rx="4" fill="#1b2340" opacity=".85"/><rect x="11" y="38" width="18" height="9" rx="4" fill="#1b2340" opacity=".6"/><circle cx="13" cy="8" r="2.4" fill="#ffe88a"/><circle cx="27" cy="8" r="2.4" fill="#ffe88a"/>',
 suv:'<rect x="3" y="3" width="34" height="58" rx="9" fill="@@" stroke="#fff" stroke-width="3"/><rect x="8" y="14" width="24" height="12" rx="3" fill="#1b2340" opacity=".85"/><rect x="8" y="40" width="24" height="9" rx="3" fill="#1b2340" opacity=".6"/><rect x="10" y="28" width="2.5" height="11" rx="1" fill="#fff" opacity=".7"/><rect x="27.5" y="28" width="2.5" height="11" rx="1" fill="#fff" opacity=".7"/><rect x="6" y="5" width="6" height="3" rx="1.5" fill="#ffe88a"/><rect x="28" y="5" width="6" height="3" rx="1.5" fill="#ffe88a"/>',
 compact:'<rect x="8" y="9" width="24" height="46" rx="11" fill="@@" stroke="#fff" stroke-width="3"/><rect x="11" y="18" width="18" height="9" rx="4" fill="#1b2340" opacity=".85"/><rect x="12" y="38" width="16" height="7" rx="3" fill="#1b2340" opacity=".6"/><circle cx="14" cy="13" r="2" fill="#ffe88a"/><circle cx="26" cy="13" r="2" fill="#ffe88a"/>',
 van:'<rect x="5" y="2" width="30" height="60" rx="7" fill="@@" stroke="#fff" stroke-width="3"/><rect x="9" y="8" width="22" height="9" rx="3" fill="#1b2340" opacity=".85"/><rect x="9" y="22" width="22" height="34" rx="3" fill="#fff" opacity=".25"/><circle cx="12" cy="5.5" r="2" fill="#ffe88a"/><circle cx="28" cy="5.5" r="2" fill="#ffe88a"/>',
 pick:'<rect x="6" y="3" width="28" height="58" rx="8" fill="@@" stroke="#fff" stroke-width="3"/><rect x="9" y="11" width="22" height="9" rx="3" fill="#1b2340" opacity=".85"/><rect x="9" y="22" width="22" height="9" rx="3" fill="#1b2340" opacity=".6"/><rect x="9" y="34" width="22" height="23" rx="2" fill="#000" opacity=".28"/><circle cx="12" cy="7" r="2" fill="#ffe88a"/><circle cx="28" cy="7" r="2" fill="#ffe88a"/>',
 sport:'<path d="M20 2C28 2 33 12 33 24L34 44C34 56 29 62 20 62C11 62 6 56 6 44L7 24C7 12 12 2 20 2Z" fill="@@" stroke="#fff" stroke-width="3"/><rect x="10" y="22" width="20" height="10" rx="5" fill="#1b2340" opacity=".85"/><rect x="18" y="4" width="4" height="56" fill="#fff" opacity=".55"/><circle cx="13" cy="9" r="1.8" fill="#ffe88a"/><circle cx="27" cy="9" r="1.8" fill="#ffe88a"/>',
 sco:'<rect x="7" y="3" width="10" height="58" rx="5" fill="@@" stroke="#fff" stroke-width="2.5"/><rect x="3" y="6" width="18" height="13" rx="6" fill="@@" stroke="#fff" stroke-width="2"/><rect x="1" y="14" width="22" height="5" rx="2.5" fill="#1b2340"/><rect x="8" y="30" width="8" height="14" rx="4" fill="#1b2340"/>',
 moto:'<rect x="9" y="3" width="6" height="58" rx="3" fill="#1b2340"/><rect x="5" y="22" width="14" height="22" rx="7" fill="@@" stroke="#fff" stroke-width="2.5"/><rect x="0" y="11" width="24" height="3.5" rx="1.7" fill="#1b2340"/><circle cx="12" cy="36" r="4" fill="#fff" opacity=".8"/>'};
function vsvg(k,col,h){const w=(k==='sco'||k==='moto')?24:40;return '<svg viewBox="0 0 '+w+' 64" width="'+Math.round(h*w/64)+'" height="'+h+'" style="filter:drop-shadow(0 3px 3px #0006)">'+(SV[k]||SV.sedan).split('@@').join(col)+'</svg>'}
const vIc=()=>S.vicon||VEH[vi].e,vNm=()=>(S.vname||'').trim()||VEH[vi].n;
function curEl(){const d=document.createElement('div'),c=S.cursor,col=S.vcol||'#FFCF1F';
 if(c==='dot'){d.className='me';return d}
 if(c==='arrow'){d.innerHTML='<svg width="46" height="46" viewBox="0 0 44 44"><path d="M22 3 37 39 22 31 7 39Z" fill="'+col+'" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';return d}
 d.innerHTML=vsvg(VK[vIc()]||'sedan',col,58);return d}
function putMe(lng,lat){if(!me)me=new maplibregl.Marker({element:curEl(),rotationAlignment:'map',pitchAlignment:'map'});me.setLngLat([lng,lat]).addTo(map)}
function refreshMe(){if(!me)return;const l=me.getLngLat();me.remove();me=null;putMe(l.lng,l.lat)}
let vi=store.get('veh',0),pos=null,setting=null,dest=null,mk=null,me=null,busy=0;
applyVmax();

function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',3500)}

/* ---- Carte ---- */
const map=new maplibregl.Map({container:'map',style:'https://tiles.openfreemap.org/styles/'+(['positron','liberty','bright'].includes(S.style)?S.style:'positron'),center:[-0.07,47.26],zoom:11,minZoom:5,maxZoom:18,maxBounds:[[-8,40.5],[11,52]],attributionControl:false});
map.addControl(new maplibregl.AttributionControl({compact:true,customAttribution:'OpenFreeMap'}));
const VSPL=[['vsp-r','#e5484d',['motorway','trunk']],['vsp-o','#ff9f0a',['primary']],['vsp-y','#ffd60a',['secondary','tertiary']],['vsp-g','#30d158',['minor','service']]];
function vspOn(){try{VSPL.forEach(x=>{if(map.getLayer(x[0]))map.removeLayer(x[0])});if(!S.vsp)return;
 VSPL.forEach(([id,col,cl])=>map.addLayer({id,type:'line',source:'openmaptiles','source-layer':'transportation',minzoom:8,filter:['in',['get','class'],['literal',cl]],layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':col,'line-width':['interpolate',['linear'],['zoom'],8,.8,13,2.5,17,6],'line-opacity':.85}},map.getLayer('rc')?'rc':undefined))}catch(e){}}
const applyUi=()=>{$('#rep').style.display=S.repbtn?'':'none'};const legend=()=>{$('#lg').style.display=S.vsp?'block':'none'};
function addRoute(){try{vspOn()}catch(e){}try{trafficOn()}catch(e){}try{incLinesApply()}catch(e){}if(map.getSource('r'))return;map.addSource('r',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
 map.addLayer({id:'rc',type:'line',source:'r',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'#17140F','line-width':12}});
 map.addLayer({id:'rl',type:'line',source:'r',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'#0A8F68','line-width':7}});if(R&&R.c&&R.c.length&&typeof dest!=='undefined'&&dest)drawRoute(R.c)}
map.on('style.load',addRoute);
let errT=0,ttOff=false,errW=0,errN=0;
map.on('error',e=>{const er=(e&&e.error)||{},id=e&&e.sourceId,st=er.status,msg=String(er.message||'').slice(0,70);
 if(id==='tt'){if(ttOff)return;ttOff=true;try{if(map.getLayer('tt-flow'))map.removeLayer('tt-flow');if(map.getSource('tt'))map.removeSource('tt')}catch(x){}
  toast(st===401||st===403?'Clé TomTom refusée : active « Traffic API » (Flow + Incidents) et vérifie le domaine autorisé.':'Bouchons TomTom indisponibles'+(st?' (erreur '+st+')':'')+'.');return}
 if(er.name==='AbortError'||st===404||st===204)return;
 const now=Date.now();if(now-errW>10000){errW=now;errN=0}errN++;if(navigator.onLine!==false&&errN<4)return;if(now-errT<20000)return;errT=now;
 toast(id?'Une partie de la carte ne se charge pas ('+id+(st?', erreur '+st:'')+').':'Carte indisponible, vérifie ta connexion. ('+(msg||'erreur inconnue')+')')});
function drawRoute(c){const f=c?{type:'Feature',geometry:{type:'LineString',coordinates:c}}:null;const go=()=>map.getSource('r').setData({type:'FeatureCollection',features:f?[f]:[]});map.getSource('r')?go():map.once('load',go)}

/* ---- Position ---- */
function locate(fly=true){
 if(!navigator.geolocation){toast('Géolocalisation non disponible.');return}
 navigator.geolocation.getCurrentPosition(p=>{pos={lng:p.coords.longitude,lat:p.coords.latitude};
  putMe(pos.lng,pos.lat);
  if(fly)map.flyTo({center:[pos.lng,pos.lat],zoom:14})},
 e=>toast(e.code===1?'Position refusée : tu peux quand même chercher une adresse.':'Position introuvable.'),{enableHighAccuracy:true,timeout:10000,maximumAge:30000})}
$('#loc').onclick=()=>locate(true);

/* ---- Accueil ---- */
const SH=$('#sheet'),SS=$('#sscroll'),SB=$('#sbody');let stt='full',dragH=false;
function layout(){const h=SH.offsetHeight;$('#speed').style.bottom=(h+14)+'px';$('#loc').style.bottom=(h+14)+'px';$('#rep').style.bottom=(h+78)+'px'}
function heights(){const nat=SH.offsetHeight-SS.offsetHeight+SB.offsetHeight,H=innerHeight;return{min:Math.min(130,nat),mid:Math.min(nat,H*.5),full:Math.min(nat,H*.86)}}
function setSheet(k,an=true){stt=k;if(dragH)return;SH.style.transition=an?'height .25s ease':'none';SH.style.height=heights()[k]+'px'}
const refit=()=>setSheet(stt);
new MutationObserver(refit).observe(SB,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['open']});
addEventListener('resize',refit);
(()=>{const g=$('.grab');let y0=0,h0=0,t0=0,on=false,mv=false;
 g.addEventListener('pointerdown',e=>{on=true;mv=false;dragH=true;y0=e.clientY;h0=SH.offsetHeight;t0=Date.now();SH.style.transition='none';try{g.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()});
 g.addEventListener('pointermove',e=>{if(!on)return;const d=y0-e.clientY;if(Math.abs(d)>4)mv=true;const H=heights();SH.style.height=Math.min(Math.max(h0+d,H.min),H.full)+'px'});
 const end=e=>{if(!on)return;on=false;dragH=false;const H=heights();
  if(!mv){setSheet(stt==='min'?(H.mid>H.min+20?'mid':'full'):'min');return}
  const t=SH.offsetHeight+((y0-e.clientY)/(Date.now()-t0+1))*200,c=Object.entries(H).reduce((a,b)=>Math.abs(b[1]-t)<Math.abs(a[1]-t)?b:a);setSheet(c[0])};
 g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)})();
new ResizeObserver(layout).observe($('#sheet'));
function home(){setSheet('full');
 const v=VEH[vi];$('#sv').textContent=v.v;
 const H=store.get('home',null),W=store.get('work',null);
 $('#sbody').innerHTML=`<button class="search" id="go"><span>🔍</span>Où allez-vous ?</button>
 <div class="chips"><button class="chip" id="h">🏠 Domicile</button><button class="chip" id="w">💼 Travail</button><button class="chip" id="tp">📊 Trajets</button></div>
 <button class="veh" id="vb"><span class="em">${vIc()}</span><div style="flex:1"><b>${esc(vNm())}</b><span>${v.d} · ${FU[S.fuel]}</span></div><span>›</span></button>`;
 $('#go').onclick=()=>openSearch();
 $('#h').onclick=()=>H?plan(H):openSearch('home');
 $('#w').onclick=()=>W?plan(W):openSearch('work');$('#tp').onclick=()=>{drawTrips();$('#trips').classList.add('on')};
 $('#vb').onclick=()=>{drawV();$('#vehs').classList.add('on')};
}
function drawV(){
 const ev=S.fuel==='ev'||S.fuel==='hybrid';
 $('#vlist').innerHTML='<div class="sec">Type de véhicule</div>'+VEH.map((v,i)=>`<button class="opt ${i===vi?'sel':''}" data-vt="${i}"><span class="em">${v.e}</span><div><b>${v.n}</b><br><span style="color:var(--mute);font-size:14px">${v.d}</span></div></button>`).join('')+
 `<div class="sec">Icône sur la carte</div><div style="display:flex;flex-wrap:wrap;gap:10px;padding:12px 20px;background:var(--card)">${ICONS.map(x=>`<button class="chip" style="flex-direction:column;gap:4px;padding:8px 10px;${vIc()===x?'border-color:var(--blue);border-width:2.5px':''}" data-ic="${x}">${vsvg(VK[x],S.vcol||'#FFCF1F',46)}<small>${VN[VK[x]]}</small></button>`).join('')}</div>
 <div class="set"><span>Nom / modèle</span><input type="text" id="vn" value="${esc(S.vname)}" placeholder="ex. Aixam City"></div>
 <div class="set"><span>Vitesse max (facultatif)</span><input type="text" inputmode="numeric" id="vm" value="${S.vmax||''}" placeholder="${VEH[vi].base} km/h"></div>
 <div class="set"><span>Conso (${S.fuel==='ev'?'kWh':'L'}/100 km)</span><input type="text" inputmode="decimal" id="vc" value="${S.cons||''}" placeholder="ex. 4"></div>
 <div class="sec">Couleur sur la carte</div><div style="display:flex;gap:12px;padding:12px 20px;background:var(--card)">${['#FFCF1F','#e5484d','#1a9d5c','#ff7a59','#2B6FF3','#17140F'].map(x=>`<button data-col="${x}" style="width:38px;height:38px;border-radius:50%;border:3px solid ${S.vcol===x?'var(--ink)':'transparent'};background:${x}"></button>`).join('')}</div>
 <div class="sec">Motorisation</div>`+Object.keys(FU).map(k=>`<button class="opt ${S.fuel===k?'sel':''}" data-fu="${k}"><span class="em">${{ev:'🔌',essence:'⛽',diesel:'🛢️',hybrid:'♻️',gpl:'🟢'}[k]}</span><b>${FU[k]}</b></button>`).join('')+
 (ev?'<div class="sec">Prise de recharge de mon véhicule</div>'+Object.keys(CN).map(k=>`<button class="opt ${S.conn===k?'sel':''}" data-cn="${k}"><b>${CN[k]}</b></button>`).join(''):'')+
 '<div style="padding:20px"><button class="big" data-ok="1">Terminer</button></div>'}
$('#vlist').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.vt!=null){vi=+d.vt;store.set('veh',vi)}else if(d.fu)S.fuel=d.fu;else if(d.cn)S.conn=d.cn;else if(d.ic)S.vicon=d.ic;else if(d.col)S.vcol=d.col;
 else if(d.ok){$('#vehs').classList.remove('on');if($('#sets').classList.contains('on'))drawSets();if(dest)plan(dest);else home();return}
 else return;
 store.set('set',S);applyVmax();refreshMe();drawV()});
$('#vlist').addEventListener('change',e=>{const i=e.target.id,v=e.target.value;if(i==='vn')S.vname=v;else if(i==='vm'){const n=parseInt(v);S.vmax=(n>=10&&n<=130)?n:0}else if(i==='vc')S.cons=parseFloat(v.replace(',','.'))||0;else return;store.set('set',S);applyVmax();refreshMe();if(i!=='vn')drawV()});

/* ---- Recherche ---- */
function openSearch(mode){if(!pos)getPos();setting=mode||null;$('#q').value='';$('#q').placeholder=mode==='home'?'Adresse du domicile':mode==='work'?'Adresse du travail':'Où allez-vous ?';$('#search').classList.add('on');renderIdle();setTimeout(()=>$('#q').focus(),50)}
function row(ic,t,s,d){return `<button class="row" data-d='${esc(JSON.stringify(d))}'><i>${ic}</i><div><b>${esc(t)}</b><span>${esc(s||'')}</span></div></button>`}
function renderIdle(){
 const H=store.get('home',null),W=store.get('work',null),R=store.get('recent',[]),F=store.get('favs',[]);
 $('#res').innerHTML=`<div style="padding:0 12px 10px;display:flex;gap:8px;overflow:auto">${chipList().map(c=>`<button class="chip" data-cat="${c[0]}">${c[1]}</button>`).join('')}</div>`+
 (H?row('⌂','Domicile',H.label,H):`<button class="row" data-set="home"><i>⌂</i><div><b>Domicile</b><span>Ajouter une adresse</span></div></button>`)+
 (W?row('💼','Travail',W.label,W):`<button class="row" data-set="work"><i>💼</i><div><b>Travail</b><span>Ajouter une adresse</span></div></button>`)+
 (F.length?'<h4>⭐ Favoris</h4>'+F.map(r=>row('⭐',r.label.split(',')[0],r.label,r)).join(''):'')+(R.length?'<h4>Récent</h4>'+R.map(r=>row(r.ic||'◷',r.label.split(',')[0],r.label,r)).join(''):'')+'<h4 style="font-weight:400">💡 Adresse introuvable ? Ferme cet écran puis appuie longuement sur la carte pour choisir un point précis.</h4>';
}
let st;$('#q').addEventListener('input',()=>{clearTimeout(st);const q=$('#q').value.trim();if(q.length<3){renderIdle();return}st=setTimeout(()=>suggest(q),300)});
let rid=0;
async function suggest(q){const id=++rid;$('#res').innerHTML='<h4><span class="spin"></span>Recherche…</h4>';
 const c=pos||map.getCenter(),E=encodeURIComponent(q);
 const ban=fetch('https://api-adresse.data.gouv.fr/search/?limit=20&autocomplete=1&lat='+c.lat+'&lon='+c.lng+'&q='+E).then(r=>r.json()).then(j=>(j.features||[]).map(x=>{const p=x.properties;return{ic:{housenumber:'🏠',street:'🛣️',locality:'📍',municipality:'🏙️'}[p.type]||'📍',t:p.name,s:p.postcode+' '+p.city+(p.type==='street'?' · rue entière':p.type==='municipality'?' · commune':''),label:p.label,lng:x.geometry.coordinates[0],lat:x.geometry.coordinates[1]}})).catch(()=>[]);
 const pho=fetch('https://photon.komoot.io/api/?limit=12&lang=fr&bbox=-5.6,41.2,10,51.2&lat='+c.lat+'&lon='+c.lng+'&q='+E).then(r=>r.json()).then(j=>(j.features||[]).filter(x=>x.properties.countrycode==='FR').map(x=>{const p=x.properties,nm=p.name||[p.housenumber,p.street].filter(Boolean).join(' ')||p.city,ct=CI[p.osm_value];
  return{ic:ct||'📍',mi:ct,t:nm,s:[p.name&&p.street?(p.housenumber?p.housenumber+' ':'')+p.street:'',p.postcode,p.city].filter(Boolean).join(' '),label:nm+', '+(p.city||''),lng:x.geometry.coordinates[0],lat:x.geometry.coordinates[1]}})).catch(()=>[]);
 const [A,B]=await Promise.all([ban,pho]);if(id!==rid)return;
 const L=[...A,...B],out=[];L.forEach(x=>x.d=hav([c.lng,c.lat],[x.lng,x.lat]));L.sort((a,b)=>a.d-b.d);
 for(const x of L)if(!out.some(y=>Math.abs(y.lat-x.lat)<.0002&&Math.abs(y.lng-x.lng)<.0003))out.push(x);
 $('#res').innerHTML=out.length?out.slice(0,10).map(x=>row(x.ic,x.t,fd(x.d)+' · '+x.s,{label:x.label,lng:x.lng,lat:x.lat,ic:x.ic,mi:x.mi})).join(''):'<h4>Aucun résultat. Essaie une autre orthographe, ou appuie longuement sur la carte pour placer un point.</h4>'}
let cm=[];
function chipList(){const f=S.fuel,a=[];if(f==='ev'||f==='hybrid')a.push(['ev','🔌 Recharge']);if(f!=='ev')a.push(['fuel','⛽ '+({diesel:'Gazole',gpl:'GPL'}[f]||'Essence')]);a.push(['park','🅿️ Parking'],['shop','🛒 Supermarché']);return a}
const CAT={park:['🅿️','amenity','parking'],shop:['🛒','shop','supermarket'],ev:['🔌','amenity','charging_station'],fuel:['⛽','amenity','fuel']};
const PQ={park:'parking',shop:'supermarché',ev:'borne de recharge',fuel:'station-service'};
const SK={dom:['socket:schuko','socket:typee'],t2:['socket:type2'],t1:['socket:type1'],ccs:['socket:type2_combo'],cha:['socket:chademo']};
const SN={'socket:schuko':'Prise domestique','socket:typee':'Prise E','socket:type2':'Type 2','socket:type1':'Type 1','socket:type2_combo':'CCS','socket:chademo':'CHAdeMO'};
const PK={essence:['e10_prix','sp95_prix','sp98_prix'],hybrid:['e10_prix','sp95_prix','sp98_prix'],diesel:['gazole_prix'],gpl:['gplc_prix']};
function info(k,t){
 if(k==='ev'){const ks=Object.keys(SN).filter(x=>t[x]&&t[x]!=='no'),want=S.conn==='all'?null:SK[S.conn];
  const txt=ks.map(x=>SN[x]+(/^\d+$/.test(t[x])?' ×'+t[x]:'')+(t[x+':output']?' '+t[x+':output']:'')).join(' · ');
  const ex=[t.capacity?t.capacity+' points':'',t.fee==='no'?'gratuit':t.fee==='yes'?'payant':'',t.charge||'',t.opening_hours||''].filter(Boolean).join(' · ');
  if(!ks.length)return{st:'?',txt:'prises non précisées'+(ex?' · '+ex:'')};
  if(want&&!want.some(x=>ks.includes(x)))return{st:'no'};
  return{st:'ok',txt:txt+(ex?' · '+ex:'')}}
 if(k==='park'){if(t.access==='private')return{st:'no'};
  const a=[t.fee==='no'?'gratuit':t.fee==='yes'?'payant':'tarif ?',t.capacity?t.capacity+' places':'',t.maxheight?'⬆ '+t.maxheight+' m':'',(t['capacity:charging']||t.charging_station==='yes')?'🔌 bornes':'',t.opening_hours||''].filter(Boolean);return{st:'ok',txt:a.join(' · ')}}
 if(k==='shop')return{st:'ok',txt:t.opening_hours||''};
 return{st:'ok'}}
const OVP=['https://overpass-api.de/api/interpreter','https://overpass.private.coffee/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
const NQ={park:'parking',shop:'supermarket',ev:'charging station',fuel:'fuel'};
async function ovp(k,c,rad,errs){
 const [ic,key,val]=CAT[k],ar='(around:'+rad+','+c.lat+','+c.lng+')',q='[out:json][timeout:15];(node["'+key+'"="'+val+'"]'+ar+';way["'+key+'"="'+val+'"]'+ar+';);out center 50;';
 try{return await Promise.any(OVP.map(async u=>{const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),10000),h=new URL(u).host;
   try{const r=await fetch(u,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'data='+encodeURIComponent(q),signal:ac.signal});
    if(!r.ok)throw new Error(h+' : erreur '+r.status);const j=await r.json();if(!j.elements)throw new Error(h+' : réponse vide');return j.elements}
   catch(e){errs.push(e.name==='AbortError'?h+' : délai dépassé':(e.message&&e.message.includes(h)?e.message:h+' : injoignable'));throw e}finally{clearTimeout(tm)}}))}catch(e){}
 const dLa=rad/111320,dLo=rad/(111320*Math.cos(c.lat*Math.PI/180));
 try{const r=await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=40&bounded=1&accept-language=fr&viewbox='+[c.lng-dLo,c.lat+dLa,c.lng+dLo,c.lat-dLa].join(',')+'&q='+encodeURIComponent(NQ[k]));
  if(!r.ok)throw new Error('nominatim : erreur '+r.status);const j=await r.json();
  if(j.length)return j.map(x=>({lat:+x.lat,lon:+x.lon,tags:{name:x.name||(x.display_name||'').split(',')[0]}}))}catch(e){errs.push('nominatim : '+(e.message||'injoignable'))}
 try{const r=await fetch('https://photon.komoot.io/api/?limit=40&lang=fr&bbox='+[c.lng-dLo,c.lat-dLa,c.lng+dLo,c.lat+dLa].join(',')+'&osm_tag='+key+':'+val+'&q='+encodeURIComponent(PQ[k])),j=await r.json();
  if((j.features||[]).length)return j.features.map(f=>({lat:f.geometry.coordinates[1],lon:f.geometry.coordinates[0],tags:{name:f.properties.name}}))}catch(e){errs.push('photon : injoignable')}
 throw new Error('x')}
async function fuelGov(c){const u='https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit=100&where='+encodeURIComponent("within_distance(geom, GEOM'POINT("+c.lng+" "+c.lat+")', 8km)");
 const r=await fetch(u);if(!r.ok)throw 0;const j=await r.json();return j.results||[]}
async function nearby(k){const [ic]=CAT[k],c=pos||map.getCenter(),rad=k==='ev'?10000:6000,errs=[];clearPoi();
 $('#res').innerHTML='<h4><span class="spin"></span>Recherche autour de toi…</h4>';
 let rows=null,head='',foot='',pts=[],used=rad;
 try{
  if(k==='fuel'){try{const pk=PK[S.fuel]||PK.essence;
    const L=(await fuelGov(c)).map(r=>{const la=r.geom&&r.geom.lat,lo=r.geom&&r.geom.lon,pr=pk.map(x=>r[x]).filter(x=>typeof x==='number'&&x>0);
     return{lat:la,lng:lo,p:pr.length?Math.min(...pr):null,t:'Station · '+(r.adresse||'')+(r.ville?', '+r.ville:''),h:/^(oui|1|true)$/i.test(String(r.horaires_automate_24_24))?'24h/24':'',d:la?hav([c.lng,c.lat],[lo,la]):1e9}}).filter(x=>x.lat&&x.p!=null).sort((a,b)=>a.d-b.d).slice(0,12);
    if(L.length){const best=Math.min(...L.map(x=>x.p));head='Prix officiels · '+FU[S.fuel];foot='Prix du jour (data.economie.gouv.fr), à confirmer à la pompe.';
     rows=L.map(x=>row(ic,x.t,fd(x.d)+' · '+x.p.toFixed(3).replace('.',',')+' €/L'+(x.p===best?' · 💰 le moins cher':'')+(x.h?' · '+x.h:''),{label:x.t,lng:x.lng,lat:x.lat,ic,mi:ic}));pts=L}}catch(e){errs.push('prix officiels : indisponible')}}
  if(!rows){const nm={ev:'Borne de recharge',fuel:'Station-service',park:'Parking',shop:'Supermarché'}[k];let L=[];
   for(const rr of [rad,rad*2.5]){used=rr;let els;try{els=await ovp(k,c,rr,errs)}catch(e){if(L.length)break;throw e}
    L=els.map(e=>{const la=e.lat??(e.center&&e.center.lat),lo=e.lon??(e.center&&e.center.lon),t=e.tags||{};return{lat:la,lng:lo,t:t.name||t.brand||t.operator||nm,i:info(k,t),d:la?hav([c.lng,c.lat],[lo,la]):1e9}}).filter(x=>x.lat&&x.i.st!=='no'&&x.d<rr*1.5).sort((a,b)=>a.d-b.d).slice(0,12);
    if(L.length>=3)break}
   head=k==='ev'?'Bornes · '+CN[S.conn]:k==='fuel'?'Stations · '+FU[S.fuel]:'';
   foot=k==='ev'?'Disponibilité et prix en temps réel : non fournis par les données ouvertes. ❔ = infos incomplètes.':k==='park'?'Places libres en temps réel : non disponible gratuitement.':'';
   rows=L.map(x=>row(ic,x.t,fd(x.d)+(x.i.txt?' · '+(k==='ev'||k==='fuel'?(x.i.st==='ok'?'✅ ':'❔ '):'')+x.i.txt:''),{label:x.t,lng:x.lng,lat:x.lat,ic,mi:ic}));pts=L}
  $('#res').innerHTML=(head&&rows.length?'<h4>'+head+'</h4>':'')+(rows.length?rows.join(''):'<h4>Aucun résultat à moins de '+Math.round(used/1000)+' km.'+(k==='ev'&&S.conn!=='all'?' Dans « Mon véhicule », essaie « Toutes les prises ».':'')+'</h4>')+(foot&&rows.length?'<h4 style="font-weight:400">'+foot+'</h4>':'')+(pts.length?'<div style="padding:8px 20px"><button class="chip" data-map="1">📍 Voir sur la carte</button> <button class="chip" data-clr="1">🧹 Retirer les icônes</button></div>':'');
  cmD=[];lastPts=pts;cm=pts.map((x,i)=>mkPoi(x,ic,i));syncClr()}
 catch(e){$('#res').innerHTML='<h4>Les serveurs de données ne répondent pas depuis ta connexion.</h4><p style="padding:0 20px;font-size:12px;color:var(--mute)">'+esc(errs.slice(0,4).join(' · '))+'</p><div style="padding:0 20px"><button class="chip" data-cat="'+k+'">Réessayer</button></div>'}}
/* appui long sur la carte = point précis (adresse manquante) */
let lpT=null,lpP=null;const lpOff=()=>clearTimeout(lpT);
async function dropPin(ll){let label='Point sur la carte';try{const r=await fetch('https://api-adresse.data.gouv.fr/reverse/?lon='+ll.lng+'&lat='+ll.lat),j=await r.json(),q=j.features&&j.features[0]&&j.features[0].properties;if(q&&q.distance<80)label=q.label}catch(e){}
 if(navigator.vibrate)navigator.vibrate(30);plan({label,lng:ll.lng,lat:ll.lat,ic:'📍'})}
map.on('touchstart',e=>{lpOff();if(nav||(e.originalEvent.touches&&e.originalEvent.touches.length>1))return;lpP=e.point;lpT=setTimeout(()=>dropPin(e.lngLat),650)});
map.on('touchmove',e=>{if(lpP&&e.point.dist(lpP)>10)lpOff()});
['touchend','touchcancel','zoomstart','pitchstart'].forEach(ev=>map.on(ev,lpOff));
map.on('contextmenu',e=>{if(!nav)dropPin(e.lngLat)});
$('#res').onclick=e=>{const ch=e.target.closest('[data-cat]');if(ch){nearby(ch.dataset.cat);return}if(e.target.closest('[data-map]')){showPts();return}if(e.target.closest('[data-clr]')){clearPoi();$('#res').innerHTML='';renderIdle();return}const b=e.target.closest('.row');if(!b)return;
 if(b.dataset.set){setting=b.dataset.set;$('#q').placeholder=setting==='home'?'Adresse du domicile':'Adresse du travail';$('#q').focus();return}
 const d=JSON.parse(b.dataset.d);
 if(setting){store.set(setting,d);setting=null;toast('Adresse enregistrée');$('#search').classList.remove('on');home();return}
 const R=store.get('recent',[]).filter(r=>r.label!==d.label);R.unshift(d);store.set('recent',R.slice(0,10));
 $('#search').classList.remove('on');plan(d)};
document.addEventListener('click',e=>{if(e.target.closest('[data-close]')){e.target.closest('.ov').classList.remove('on');if(setting)setting=null}});

/* ---- Itinéraire ---- */
function dec(s){let i=0,la=0,lo=0,o=[];while(i<s.length){for(let k=0;k<2;k++){let r=0,sh=0,b;do{b=s.charCodeAt(i++)-63;r|=(b&31)<<sh;sh+=5}while(b>=32);const d=r&1?~(r>>1):r>>1;k?lo+=d:la+=d}o.push([lo/1e6,la/1e6])}return o}
async function vfetch(kind,body){
 const K=(S.stadia||STADIA_KEY).trim();
 let url,opt;
 if(K){url='https://api.stadiamaps.com/'+(kind==='route'?'route/v1':'trace_attributes/v1')+'?api_key='+encodeURIComponent(K);opt={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}}
 else if(kind==='route'){url=VAL+'/route?json='+encodeURIComponent(JSON.stringify(body));opt={}}
 else{url=VAL+'/trace_attributes';opt={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}}
 for(let i=0;i<3;i++){
  try{const r=await fetch(url,opt);
   if(r.status===429||r.status>=502){await new Promise(z=>setTimeout(z,1500*(i+1)));continue}
   if(r.status===401||r.status===403)throw new Error('clé Stadia refusée : vérifie STADIA_KEY');
   return r}
  catch(e){if(/Stadia/.test(e.message))throw e;if(i===2)throw new Error(K?'service de routage injoignable (réseau ou bloqueur de pub)':'serveur public injoignable depuis ta connexion : ajoute une clé Stadia (STADIA_KEY)');await new Promise(z=>setTimeout(z,1200))}}
 throw new Error('service de routage surchargé, réessaie dans un instant')}
const fmt=s=>{const m=Math.round(s/60);return m<60?m+' min':Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')}
const P={routes:[],sel:0,mode:'now',time:'',sched:null,touched:false};
let schedId=0,tfOK=null;const tfCache={};
const hm=d=>d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
const mkDate=t=>{const [h,m]=(t||'00:00').split(':').map(Number),d=new Date();d.setHours(h,m,0,0);if(d<Date.now()-60000)d.setDate(d.getDate()+1);return d};
const iso=d=>{const p=n=>String(n).padStart(2,'0'),o=-d.getTimezoneOffset(),a=Math.abs(o);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+p(d.getHours())+':'+p(d.getMinutes())+':00'+(o>=0?'+':'-')+p(Math.floor(a/60))+':'+p(a%60)};
const TT=()=>(S.traffic&&S.tomtom||'').trim();
/* Trafic : TomTom suit EXACTEMENT notre tracé (supportingPoints) et renvoie le retard lié au trafic (temps réel ou prévu) */
async function tfRatio(r,when){
 const K=TT();if(!K)return 1;
 const live=Math.abs(when-Date.now())<300000,key=r.shape.length+r.shape.slice(-16)+(live?'L'+Math.floor(Date.now()/300000):Math.round(when/900000));
 if(tfCache[key]!=null)return tfCache[key];
 const st=Math.max(1,Math.ceil(r.c.length/150)),sp=r.c.filter((_,i)=>i%st===0||i===r.c.length-1).map(q=>({latitude:q[1],longitude:q[0]})),a=r.c[0],b=r.c[r.c.length-1];
 let url='https://api.tomtom.com/routing/1/calculateRoute/'+a[1]+','+a[0]+':'+b[1]+','+b[0]+'/json?key='+encodeURIComponent(K)+'&traffic=true&computeTravelTimeFor=all&routeType=fastest';
 if(!live)url+='&departAt='+encodeURIComponent(iso(new Date(when)));
 let v=1;
 try{const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({supportingPoints:sp})});
  if(!res.ok)throw 0;const sm=(await res.json()).routes[0].summary,base=sm.noTrafficTravelTimeInSeconds||sm.travelTimeInSeconds;
  const t=live?(sm.liveTrafficIncidentsTravelTimeInSeconds||sm.travelTimeInSeconds):(sm.historicTrafficTravelTimeInSeconds||sm.travelTimeInSeconds);
  v=Math.min(3,Math.max(1,t/base));tfOK=true}catch(e){tfOK=false}
 tfCache[key]=v;return v}
async function schedule(){
 const r=P.routes[P.sel],base=r.s.time;
 if(P.mode==='now'){const f=await tfRatio(r,Date.now());return{dep:new Date(),dur:base*f}}
 const t=mkDate(P.time);
 if(P.mode==='dep')return{dep:t,dur:base*(await tfRatio(r,+t))};
 let dur=base;for(let i=0;i<3;i++)dur=base*(await tfRatio(r,+t-dur*1000));
 return{dep:new Date(+t-dur*1000),dur,arr:t}}
async function paintSched(){const my=++schedId;const x=await schedule();if(my!==schedId)return;P.sched=x;paintEta();view(true)}
function paintEta(){
 const x=P.sched,el=$('#sched');if(!x||!el)return;
 const dep=P.mode==='now'?new Date():x.dep,arr=x.arr||new Date(+dep+x.dur*1000),dl=Math.round((x.dur-P.routes[P.sel].s.time)/60);
 const late=P.mode==='arr'&&x.dep<new Date(Date.now()-60000);
 el.innerHTML=(P.mode==='arr'?`🕒 Pars à <b>${hm(dep)}</b> pour arriver à <b>${hm(arr)}</b>`:`🕒 Départ <b>${hm(dep)}</b> · arrivée <b>${hm(arr)}</b>`)+(late?'<br>⚠️ Trop tard pour cette heure : pars maintenant.':'')+
 `<br><small>${fmt(x.dur)} de trajet · ${!TT()?'trafic non pris en compte (ajoute une clé TomTom dans Réglages)':tfOK===false?'données trafic indisponibles (vérifie la clé)':dl>0?'+'+dl+' min de trafic':'trafic fluide'}</small>`}
function fit(c){map.fitBounds(c.reduce((b,q)=>b.extend(q),new maplibregl.LngLatBounds(c[0],c[0])),{padding:{top:90,bottom:420,left:40,right:40},maxZoom:16})}
const isFav=d=>store.get('favs',[]).some(x=>x.label===d.label);
function toggleFav(d){let L=store.get('favs',[]);L=isFav(d)?L.filter(x=>x.label!==d.label):[...L,{label:d.label,lng:d.lng,lat:d.lat,ic:d.ic,mi:d.mi}];store.set('favs',L)}
function pick_(i,nf){P.sel=i;setRoute(P.routes[i]);if(!nf)fit(P.routes[i].c);view();paintSched();loadAlerts()}
function getPos(){return Promise.race([new Promise(r=>setTimeout(()=>r(pos),5000)),new Promise(res=>{if(!navigator.geolocation)return res(pos);navigator.geolocation.getCurrentPosition(g=>{pos={lng:g.coords.longitude,lat:g.coords.latitude};putMe(pos.lng,pos.lat);res(pos)},()=>res(pos),{enableHighAccuracy:true,timeout:5000,maximumAge:30000})})])}
async function plan(d){
 dest=d;const my=++busy,v=VEH[vi];P.inc=[];P.wx=[];P.routes=[];P.moved=false;setSheet('mid');P.sel=0;P.sched=null;P.touched=false;
 $('#sbody').innerHTML=`<b style="font-size:20px">${esc(d.label.split(',')[0])}</b><div class="note n"><span class="spin"></span>Calcul d'un itinéraire adapté…</div>`;
 if(mk)mk.remove();clearPoi();mk=new maplibregl.Marker(d.mi?{element:emo(d.mi)}:{color:'#ff7a59'}).setLngLat([d.lng,d.lat]).addTo(map);
 await getPos();if(my!==busy)return;
 const o=pos||{lng:map.getCenter().lng,lat:map.getCenter().lat};
 try{
  const bl=await blockers(o,d);if(my!==busy)return;let rs;
  try{rs=await fetchRoute(o,d,v,bl.pts)}catch(e){if(!bl.pts.length)throw e;rs=await fetchRoute(o,d,v);bl.failed=true}
  if(my!==busy)return;P.avoid=bl;
  if(!rs.length)throw new Error('Pas de trajet');
  P.routes=rs;setRoute(rs[0]);fit(rs[0].c);view();paintSched();setSheet('mid');loadAlerts();
  await Promise.all(rs.map(async r=>{r.chk=await verify(r.shape,v.v);r.f=await tfRatio(r,Date.now());if(my===busy)view(true)}));
  if(my!==busy)return;
  const ok=rs.map((r,i)=>i).filter(i=>rs[i].chk.ok!==false),pool=ok.length?ok:rs.map((r,i)=>i);
  const sc=r=>r.s.time*(r.f||1)+(S.beg?r.m.length*25:0),best=pool.reduce((a,b)=>sc(rs[b])<sc(rs[a])?b:a,pool[0]);
  P.best=best;if(best!==P.sel&&!P.touched)pick_(best,P.moved);else{view();paintSched()}
 }catch(e){if(my!==busy)return;
  $('#sbody').innerHTML=`<b style="font-size:20px">${esc(d.label.split(',')[0])}</b><div class="note warn">Impossible de calculer l'itinéraire (${esc(e.message||'erreur réseau')}).</div>${(S.stadia||STADIA_KEY).trim()?'':'<div class="note n">Astuce : ajoute ta clé Stadia dans les Réglages pour des itinéraires fiables.</div><button class="big" data-act="sets">Ouvrir les réglages</button>'}<button class="big" data-act="retry">Réessayer</button><button class="ghost" data-act="end">Annuler</button>`}}
async function verify(shape,max){
 try{const r=await vfetch('trace',{encoded_polyline:shape,costing:'auto',shape_match:'map_snap',filters:{attributes:['edge.road_class','edge.speed_limit','edge.length','edge.names'],action:'include'}});
  if(!r.ok)throw 0;const j=await r.json();const bad=new Set(),lim=[];let km=0,cum=0;
  for(const e of j.edges||[]){const l=typeof e.speed_limit==='number'?e.speed_limit:0,fast=e.road_class==='motorway'||e.road_class==='trunk'||(max<=45&&l>80);
   cum+=(e.length||0)*1000;lim.push([cum,l]);
   if(fast&&e.length>0.05){km+=e.length;bad.add((e.names&&e.names[0])||e.road_class)}}
  return bad.size?{ok:false,names:[...bad].slice(0,3),km,lim}:{ok:true,lim}}catch(e){return{ok:null}}}
const INC={1:'🚨 Accident',2:'🌫️ Brouillard',3:'⚠️ Conditions dangereuses',4:'🌧️ Pluie',5:'🧊 Verglas',6:'🚦 Embouteillage',7:'🚧 Voie fermée',8:'⛔ Route fermée',9:'🚧 Travaux',10:'💨 Vent',11:'🌊 Inondation',14:'🚗 Véhicule en panne'};
const incLabel=x=>String(x.cat).startsWith('r_')?RT[x.cat.slice(2)][0]+' '+RT[x.cat.slice(2)][1]+(x.rel?' '+x.rel:''):(INC[x.cat]||'⚠️ Incident');
const WX=c=>c>=95?'⛈️ Orages':(c>=71&&c<=77)||c===85||c===86?'❄️ Neige':[56,57,66,67].includes(c)?'🧊 Pluie verglaçante':c===45||c===48?'🌫️ Brouillard':c>=61&&c<=82?'🌧️ Pluie':c>=51&&c<=55?'🌦️ Bruine':'';
async function wx(ll){try{const r=await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ll[1]+'&longitude='+ll[0]+'&current=weather_code,wind_gusts_10m&timezone=auto'),j=(await r.json()).current,a=[],t=WX(j.weather_code);if(t)a.push(t);if(j.wind_gusts_10m>=60)a.push('💨 Rafales '+Math.round(j.wind_gusts_10m)+' km/h');return a}catch(e){return[]}}
async function incidents(r){const K=TT();if(!K)return null;
 const b=r.c.reduce((a,q)=>[Math.min(a[0],q[0]),Math.min(a[1],q[1]),Math.max(a[2],q[0]),Math.max(a[3],q[1])],[1e9,1e9,-1e9,-1e9]);
 if((b[2]-b[0])*(b[3]-b[1])>0.9)return[];
 const f='{incidents{geometry{type,coordinates},properties{iconCategory}}}';
 try{const res=await fetch('https://api.tomtom.com/traffic/services/5/incidentDetails?key='+encodeURIComponent(K)+'&bbox='+b.join(',')+'&fields='+encodeURIComponent(f)+'&language=fr-FR&timeValidityFilter=present');
  if(!res.ok)throw 0;const j=await res.json(),out=[];
  for(const it of j.incidents||[]){const g=it.geometry,pt=g.type==='Point'?g.coordinates:g.coordinates[0],sn=snap(pt,0,true);if(sn.d<120)out.push({cat:it.properties.iconCategory,along:sn.along,pt})}
  return out}catch(e){return null}}
let alId=0;
async function loadAlerts(){const my=++alId,r=P.routes[P.sel];if(!r)return;const c=r.c;
 const b=c.reduce((a,q)=>[Math.min(a[0],q[0]),Math.min(a[1],q[1]),Math.max(a[2],q[0]),Math.max(a[3],q[1])],[1e9,1e9,-1e9,-1e9]);
 const [W,I,Rp]=await Promise.all([Promise.all([wx(c[Math.floor(c.length/2)]),wx(c[c.length-1])]),incidents(r),repsNear(b)]);if(my!==alId)return;
 P.wx=[...new Set(W.flat())];const inc=(I||[]).slice();
 for(const x of Rp){const sn=snap([x.lon,x.lat],0,true);if(sn.d<150)inc.push({cat:'r_'+x.type,along:sn.along,pt:[x.lon,x.lat],rel:x.local?'':((x.up||0)-(x.down||0)>=2?'✅':'🕒')})}
 P.inc=inc.sort((a,b)=>a.along-b.along);P.incNull=I===null&&!!TT();view()}
function alertsAhead(a){for(const x of R.inc||[]){const d=x.along-a;if(d>0&&d<800&&!x.said){x.said=1;const l=incLabel(x);toast(l+' dans '+fd(d));say(l.replace(/^\S+\s/,'')+' dans '+fd(d).replace(' m',' mètres'))}}}
function fastKm(lim){let pv=0,km=0;for(const q of lim){if(q[1]>=80)km+=q[0]-pv;pv=q[0]}return km/1000}
function extra(){const r=P.routes[P.sel];let h='';
 if(P.avoid&&P.avoid.n)h+=P.avoid.failed?'<div class="note warn">🚧 '+P.avoid.n+' route(s) barrée(s) ou travaux graves sur le trajet, impossible de les éviter : reste très vigilant.</div>':'<div class="note ok">🚧 Trajet recalculé : '+P.avoid.n+' route(s) barrée(s) ou travaux graves évitée(s).</div>';
 if(P.wx&&P.wx.length)h+='<div class="note warn">🌦️ Météo : '+P.wx.map(esc).join(' · ')+'. Adapte ta conduite.</div>';
 if(P.inc&&P.inc.length){const n={};P.inc.forEach(x=>{const l=incLabel(x);n[l]=(n[l]||0)+1});h+='<div class="note warn">'+Object.entries(n).map(([k,v])=>v>1?v+'× '+k:k).join(' · ')+' sur ton trajet</div>'}
 else if(P.inc&&TT()&&!P.incNull)h+='<div class="note ok">Aucun incident signalé sur le trajet.</div>';
 if(r&&r.chk&&r.chk.lim&&VEH[vi].v<=50){const km=fastKm(r.chk.lim);if(km>0.3)h+='<div class="note warn">⚠️ '+km.toFixed(1).replace('.',',')+' km sur des routes limitées à 80 km/h ou plus : véhicule lent, reste très vigilant.</div>'}
 if(!TT())h+='<div class="note n">Travaux, accidents, embouteillages : ajoute une clé TomTom dans Réglages.</div>';
 return h}
function view(){
 const d=dest,r=P.routes[P.sel];if(!d||!r)return;const chk=r.chk;
 const cards=P.routes.length>1?'<div class="rcs">'+P.routes.map((x,i)=>`<button class="rc ${i===P.sel?'sel':''}" data-act="sel" data-i="${i}"><b>${fmt(x.s.time*(x.f||1))}</b><small>${x.s.length.toFixed(1).replace('.',',')} km${i===P.best?' · ⚡ rapide':''}</small><small>${!x.chk?'vérification…':x.chk.ok===true?'✅ conforme':x.chk.ok===false?'⚠️ route à éviter':'❔ non vérifié'}</small></button>`).join('')+'</div>':'';
 const note=!chk?'<div class="note n"><span class="spin"></span>Vérification des routes…</div>'
  :chk.ok===true?'<div class="note ok">✅ Aucun tronçon interdit détecté (autoroute, voie rapide, route trop rapide).</div>'
  :chk.ok===false?`<div class="note warn">⚠️ Ce trajet passe par une route à éviter (${esc(chk.names.join(', '))}, ~${chk.km.toFixed(1)} km). Choisis un autre trajet.</div>`
  :'<div class="note warn">⚠️ Impossible de vérifier les routes. Reste attentif aux panneaux.</div>';
 const M=[['now','Maintenant'],['dep','Partir à…'],['arr','Arriver à…']];
 const sg=`<div class="seg">${M.map(m=>`<button class="${P.mode===m[0]?'on':''}" data-act="mode" data-m="${m[0]}">${m[1]}</button>`).join('')}</div>`+(P.mode!=='now'?`<input class="tm" type="time" id="tm" value="${P.time}">`:'');
 const t=$('#tm'),keep=t&&document.activeElement===t;
 if(keep)return;
 $('#sbody').innerHTML=`<b style="font-size:20px">${esc(d.label.split(',')[0])}</b>${cards}
 <div style="color:var(--mute);margin-top:4px">${r.s.length.toFixed(1).replace('.',',')} km · ${vIc()} ${VEH[vi].v} km/h</div>${sg}<div id="sched"></div>${note}${extra()}
 ${!pos?'<div class="note n">Départ = centre de la carte (position non activée).</div>':''}
 <details style="margin-top:10px"><summary style="font-weight:600;cursor:pointer">Étapes (${r.m.length})</summary><ul class="steps">${r.m.map(x=>`<li><span>${esc(x.instruction)}</span><small>${x.length>=1?x.length.toFixed(1).replace('.',',')+' km':Math.round(x.length*1000)+' m'}</small></li>`).join('')}</ul></details>
 <button class="big" data-act="start">▶ Démarrer</button><button class="ghost" data-act="fav">${isFav(d)?"★ Retirer des favoris":"☆ Ajouter aux favoris"}</button><button class="ghost" data-act="sim">Simuler le trajet (test sans bouger)</button><button class="ghost" data-act="end">Terminer</button>`;
 paintEta()}
$('#sbody').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
 if(a==='sel'){P.touched=true;pick_(+b.dataset.i)}
 else if(a==='mode'){P.mode=b.dataset.m;if(P.mode!=='now'&&!P.time)P.time=hm(new Date(Date.now()+3600000));view();paintSched()}
 else if(a==='start'){const c=P.routes[P.sel].chk;if(c&&c.ok===false&&!confirm('Ce trajet passe par une route à éviter. Continuer quand même ?'))return;startNav(false)}
 else if(a==='fav'){toggleFav(dest);view()}else if(a==='sim')startNav(true);else if(a==='retry')plan(dest);else if(a==='sets'){drawSets();$('#sets').classList.add('on')}else if(a==='end')cancel()});
$('#sbody').addEventListener('change',e=>{if(e.target.id==='tm'){P.time=e.target.value;e.target.blur();view();paintSched()}});
function cancel(){busy++;dest=null;P.routes=[];P.sched=null;if(mk){mk.remove();mk=null}drawRoute(null);home()}

/* ---- Navigation guidée ---- */
const R={c:[],cum:[],m:[],total:1,time:0,idx:0,sp:{}};
let follow=true,lastFix=null,offT0=0,trT=null,nav=false,watchId=null,simT=null,voice=true,off=0,rr=false,wl=null,endT=null;
const rad=Math.PI/180;
function hav(a,b){const dl=(b[1]-a[1])*rad,dg=(b[0]-a[0])*rad,x=Math.sin(dl/2)**2+Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin(dg/2)**2;return 12742000*Math.asin(Math.sqrt(x))}
function brg(a,b){const y=Math.sin((b[0]-a[0])*rad)*Math.cos(b[1]*rad),x=Math.cos(a[1]*rad)*Math.sin(b[1]*rad)-Math.sin(a[1]*rad)*Math.cos(b[1]*rad)*Math.cos((b[0]-a[0])*rad);return(Math.atan2(y,x)/rad+360)%360}
function setRoute(r){R.c=r.c;R.cum=[0];for(let i=1;i<r.c.length;i++)R.cum.push(R.cum[i-1]+hav(r.c[i-1],r.c[i]));R.m=r.m;R.total=R.cum[R.cum.length-1]||1;R.time=r.s.time;R.idx=0;R.sp={};drawRoute(r.c)}
async function fetchRoute(o,d,v,ex){
 const au={use_highways:0,use_tolls:S.notoll?0:0.5,use_ferry:S.noferry?0:0.5,use_tracks:S.notrack?0:0.5,top_speed:v.v};if(S.beg)au.maneuver_penalty=40;
 const body={locations:[{lon:o.lng,lat:o.lat},{lon:d.lng,lat:d.lat}],costing:'auto',costing_options:{auto:au},directions_options:{language:'fr-FR',units:'kilometers'}};
 if(S.alts&&!nav)body.alternates=2;if(ex&&ex.length)body.exclude_locations=ex;
 const r=await vfetch('route',body),j=await r.json();
 if(!r.ok||!j.trip)throw new Error(j.error||'Pas de trajet');
 return [j.trip,...(j.alternates||[]).map(a=>a.trip)].filter(t=>t&&t.legs).map(t=>{const l=t.legs[0];return{c:dec(l.shape),m:l.maneuvers,s:t.summary,shape:l.shape}})}
function snap(p,from,all){let best={d:1e9,i:0,along:0};const n=R.c.length-2,lo=all?0:Math.max(0,from-3),hi=all?n:Math.min(n,from+150),k=Math.cos(p[1]*rad)*111320,kk=110540;
 for(let i=lo;i<=hi;i++){const a=R.c[i],b=R.c[i+1],ax=(a[0]-p[0])*k,ay=(a[1]-p[1])*kk,dx=(b[0]-a[0])*k,dy=(b[1]-a[1])*kk,l2=dx*dx+dy*dy;
  const t=l2?Math.max(0,Math.min(1,-(ax*dx+ay*dy)/l2)):0,d=Math.hypot(ax+t*dx,ay+t*dy);
  if(d<best.d)best={d,i,along:R.cum[i]+t*(R.cum[i+1]-R.cum[i])}}return best}
const ic=t=>[4,5,6].includes(t)?'🏁':[9,10,11,18,20,23].includes(t)?'↱':[14,15,16,19,21,24].includes(t)?'↰':[12,13].includes(t)?'↩':[26,27].includes(t)?'⟳':'↑';
const fd=m=>m>=1000?(m/1000).toFixed(1).replace('.',',')+' km':(m>=100?Math.round(m/10)*10:Math.round(m/5)*5)+' m';
/* GPS : on ignore le bruit quand on est arrêté et on lisse les positions */
function gpsFix(g){const c=g.coords,acc=c.accuracy||99;if(acc>50)return;
 const q={lng:c.longitude,lat:c.latitude,spd:(typeof c.speed==='number'&&c.speed>=0)?c.speed:null,hdg:c.heading,acc};
 if(lastFix){const d=hav([lastFix.lng,lastFix.lat],[q.lng,q.lat]),moving=q.spd!=null?q.spd>1.5:d>25;
  if(!moving&&d<Math.max(acc,15))return;
  const a=moving?0.75:0.4;q.lng=lastFix.lng+(q.lng-lastFix.lng)*a;q.lat=lastFix.lat+(q.lat-lastFix.lat)*a}
 lastFix=q;onPos(q)}
/* Déplacement fluide : la position affichée glisse vers la position GPS, avec anticipation entre deux mesures */
let tg=null,sh=null,rafId=0,lastT=0,touching=false;
(()=>{const cc=map.getCanvasContainer();cc.addEventListener('touchstart',()=>{touching=true},{passive:true});['touchend','touchcancel'].forEach(ev=>cc.addEventListener(ev,()=>{touching=false},{passive:true}))})();
function setTarget(p,h){const now=performance.now();let v=p.spd;
 if(v==null&&tg){const dt=(now-tg.t)/1000;v=dt>0?hav([tg.lng,tg.lat],[p.lng,p.lat])/dt:0;if(v>60)v=0}
 tg={lng:p.lng,lat:p.lat,h,spd:v||0,t:now};if(!sh){const c=me?me.getLngLat():null;sh={lng:p.lng,lat:p.lat,h}}
 if(!rafId){lastT=now;rafId=requestAnimationFrame(frame)}}
function frame(now){rafId=0;if(!nav||!tg||!sh)return;const dt=Math.min(100,now-lastT);lastT=now;
 const ahead=Math.min(1.5,(now-tg.t)/1000)*tg.spd,r=tg.h*rad,k=Math.cos(tg.lat*rad)*111320;
 const px=tg.lng+Math.sin(r)*ahead/k,py=tg.lat+Math.cos(r)*ahead/110540,a=1-Math.exp(-dt/130);
 sh.lng+=(px-sh.lng)*a;sh.lat+=(py-sh.lat)*a;
 const d=((tg.h-sh.h+540)%360)-180;sh.h=(sh.h+d*(1-Math.exp(-dt/220))+360)%360;
 if(me){me.setLngLat([sh.lng,sh.lat]);if(S.cursor!=='dot')me.setRotation(sh.h)}
 if(follow&&!touching)map.jumpTo({center:[sh.lng,sh.lat],bearing:S.head?sh.h:0});
 rafId=requestAnimationFrame(frame)}
/* Icônes de résultats cliquables */
let cmD=[],lastPts=[];
function clearPoi(){cm.forEach(m=>m.remove());cm=[];cmD=[];lastPts=[];syncClr()}
function syncClr(){const b=$('#clrpoi');if(b)b.style.display=cm.length?'flex':'none'}
$('#clrpoi').onclick=()=>{clearPoi();document.querySelectorAll('.maplibregl-popup').forEach(q=>q.remove());toast('Icônes retirées')};
function mkPoi(x,ic,i){cmD[i]={label:x.t,lng:x.lng,lat:x.lat,ic,mi:ic};const e=emo(ic);e.style.cursor='pointer';
 const m=new maplibregl.Marker({element:e}).setLngLat([x.lng,x.lat]).addTo(map);
 e.onclick=ev=>{ev.stopPropagation();const sub=[fd(x.d),x.p?x.p.toFixed(3).replace('.',',')+' €/L':'',x.h||'',(x.i&&x.i.txt)||''].filter(Boolean).join(' · ');
  new maplibregl.Popup({offset:26}).setLngLat([x.lng,x.lat]).setHTML('<div style="color:#17133D"><b>'+esc(x.t)+'</b><br>'+esc(sub)+'<br><button data-go="'+i+'">Y aller</button></div>').addTo(map)};
 return m}
function showPts(){if(!lastPts.length)return;$('#search').classList.remove('on');setSheet('min');
 const c=pos||map.getCenter(),b=new maplibregl.LngLatBounds([c.lng,c.lat],[c.lng,c.lat]);lastPts.forEach(x=>b.extend([x.lng,x.lat]));
 map.fitBounds(b,{padding:{top:110,bottom:220,left:40,right:40},maxZoom:15});toast('Touche une icône, puis « Y aller »')}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(!g)return;
 document.querySelectorAll('.maplibregl-popup').forEach(q=>q.remove());const d=cmD[+g.dataset.go];
 if(d){clearPoi();$('#search').classList.remove('on');plan(d)}});
function limAt(a){const L=R.lim||((P.routes[P.sel]||{}).chk||{}).lim;if(!L||!L.length)return 0;const x=a*L[L.length-1][0]/R.total;for(const q of L)if(q[0]>=x)return q[1]||0;return 0}
function say(t){if(!S.voice||!('speechSynthesis' in window))return;
 const as=navigator.audioSession,back=()=>{try{if(as)as.type='auto'}catch(e){}};
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.volume=S.vol;
  if(S.duck){try{if(as)as.type='transient'}catch(e){}u.onend=u.onerror=()=>setTimeout(back,350)}
  speechSynthesis.speak(u)}catch(e){back()}}
function navEta(){if(R.rem==null)return;const t=R.time*(R.ratio||1)*R.rem/R.total;$('#neta').textContent=hm(new Date(Date.now()+t*1000));$('#nrem').textContent=fmt(t)}
setInterval(()=>{if(nav)navEta();else if(P.routes.length&&P.mode==='now')paintEta()},5000);
function onPos(p){
 pos={lng:p.lng,lat:p.lat};
 if(!nav||!me)putMe(p.lng,p.lat);
 if(!nav||rr)return;
 const ll=[p.lng,p.lat];let s=snap(ll,R.idx);
 if(s.d>60)s=snap(ll,0,true);
 if(!R.seen){R.seen=1;if(s.d>80&&!p.sim){reroute(ll);return}}
 const thr=Math.max(60,(p.acc||0)*2.5);
 if(s.d>thr){if(++off===1)offT0=Date.now();
  if(off>=5&&Date.now()-offT0>10000&&Date.now()-(R.lastRr||0)>25000&&(p.spd==null||p.spd>1.5||s.d>150)){R.lastRr=Date.now();reroute(ll);return}}
 else{off=0;offT0=0}
 R.idx=s.i;const rem=Math.max(0,R.total-s.along);R.maxAlong=Math.max(R.maxAlong||0,s.along);alertsAhead(s.along);
 let mi=R.m.findIndex(x=>x.begin_shape_index>s.i);if(mi<0)mi=R.m.length-1;
 const nm=R.m[mi],dn=Math.max(0,R.cum[nm.begin_shape_index]-s.along),last=mi===R.m.length-1;
 if(rem<25&&!endT){$('#nic').textContent='🏁';$('#ndist').textContent='Arrivée';$('#ntxt').textContent='Vous êtes arrivé à destination';say('Vous êtes arrivé à destination.');endT=setTimeout(()=>stopNav(),5000);return}
 if(endT)return;
 $('#nic').textContent=ic(nm.type);$('#ndist').textContent=fd(dn);$('#ntxt').textContent=nm.instruction;
 if(dn<=(S.beg?600:300)&&!R.sp[mi+'a']){R.sp[mi+'a']=1;if(nm.verbal_transition_alert_instruction&&!last)say(nm.verbal_transition_alert_instruction)}
 if(dn<=(S.beg?120:70)&&!R.sp[mi+'b']){R.sp[mi+'b']=1;say(nm.verbal_pre_transition_instruction||nm.instruction)}
R.rem=rem;navEta();$('#nkm').textContent=(rem/1000).toFixed(1).replace('.',',');
 const lm=limAt(s.along),eff=lm>0?Math.min(lm,VEH[vi].v):VEH[vi].v;
 document.body.classList.toggle('haslim',lm>0);if(lm>0)$('#lv2').textContent=lm;if(S.beg&&lm>0&&lm!==R.lastLm)say('Limitation '+lm);R.lastLm=lm;
 if(p.spd!=null){const k=Math.round(p.spd*3.6),over=S.alert&&k>eff+S.tol;$('#lv').textContent=k;$('#live').style.color=over?'#e5484d':'';
  if(over&&Date.now()-(R.lastAl||0)>20000){R.lastAl=Date.now();say('Attention, vitesse limitée à '+eff+' kilomètres heure.')}}
 const h=(p.hdg!=null&&!isNaN(p.hdg)&&(p.spd||0)>1.5)?p.hdg:brg(R.c[s.i],R.c[s.i+1]);
 R.lastP={ll,h};setTarget(p,h)}
async function reroute(ll){
 rr=true;$('#ndist').textContent='Recalcul…';$('#ntxt').textContent='Nouvel itinéraire en cours';say("Recalcul de l'itinéraire.");
 try{const o2={lng:ll[0],lat:ll[1]},bl=await blockers(o2,dest);let rs;try{rs=await fetchRoute(o2,dest,VEH[vi],bl.pts)}catch(x){if(!bl.pts.length)throw x;rs=await fetchRoute(o2,dest,VEH[vi])}const r=rs[0];if(!nav)return;setRoute(r);R.rem=R.total;off=0;
  R.lim=[];verify(r.shape,VEH[vi].v).then(c=>{R.lim=c.lim||[];if(c.ok===false)toast('⚠️ Ce passage emprunte une route à éviter : '+c.names[0])})}
 catch(e){toast('Recalcul impossible, reste sur la route.')}
 rr=false}
function startNav(sim){
 if(!R.c.length)return;
 if(!sim&&!navigator.geolocation){toast('Géolocalisation indisponible.');return}
 if(S.focusrem&&!sim&&!window.fcShown){window.fcShown=1;$('#fcm').classList.add('on')}follow=true;$('#rcn').style.display='none';R.t0=Date.now();R.maxAlong=0;R.sim=!!sim;R.inc=(P.inc||[]).map(x=>({...x}));R.lastLm=0;nav=true;off=0;offT0=0;lastFix=null;R.seen=false;R.lastRr=0;rr=false;endT=null;R.idx=0;R.sp={};document.body.classList.add('nav');
 say('Navigation démarrée. Bonne route.');
 try{if(navigator.wakeLock)navigator.wakeLock.request('screen').then(w=>wl=w).catch(()=>{})}catch(e){}
 R.lim=null;clT=setInterval(checkClosures,120000);R.ratio=(P.routes[P.sel]&&P.routes[P.sel].f)||1;R.rem=R.total;navEta();trT=setInterval(async()=>{const r=P.routes[P.sel];if(nav&&r&&TT())R.ratio=await tfRatio(r,Date.now())},300000);
 map.easeTo({center:R.c[0],zoom:17,pitch:S.tilt?50:0,padding:{top:230,bottom:130,left:0,right:0},duration:800});tg=null;sh=null;
 if(sim){let sd=0;simT=setInterval(()=>{sd=Math.min(sd+12,R.total-1);let i=0;while(i<R.c.length-2&&R.cum[i+1]<sd)i++;
   const t=(sd-R.cum[i])/((R.cum[i+1]-R.cum[i])||1),a=R.c[i],b=R.c[i+1];onPos({lng:a[0]+(b[0]-a[0])*t,lat:a[1]+(b[1]-a[1])*t,spd:12,hdg:null,sim:1})},1000)}
 else watchId=navigator.geolocation.watchPosition(gpsFix,
  e=>toast(e.code===1?'Active la position pour naviguer.':'Signal GPS perdu…'),{enableHighAccuracy:true,maximumAge:1000,timeout:15000})}
function stopNav(){endTrip();cancelAnimationFrame(rafId);rafId=0;tg=null;sh=null;$('#rcn').style.display='none';
 clearInterval(simT);simT=null;lastFix=null;clearInterval(trT);clearInterval(clT);R.rem=null;if(watchId!=null)navigator.geolocation.clearWatch(watchId);watchId=null;clearTimeout(endT);endT=null;
 nav=false;document.body.classList.remove('nav');if('speechSynthesis' in window)speechSynthesis.cancel();
 if(wl){wl.release().catch(()=>{});wl=null}$('#live').style.color='';document.body.classList.remove('haslim');$('#lv').textContent='0';R.lim=null;
 map.easeTo({pitch:0,bearing:0,padding:{top:0,bottom:0,left:0,right:0},duration:600});cancel()}
$('#nx').onclick=()=>stopNav();
$('#fc1').onclick=()=>{$('#fcm').classList.remove('on');$('#focus').classList.add('on')};$('#fc2').onclick=()=>$('#fcm').classList.remove('on');$('#fc3').onclick=()=>{S.focusrem=false;store.set('set',S);$('#fcm').classList.remove('on');toast('Rappel désactivé (modifiable dans Réglages)')};
(()=>{const cc=map.getCanvasContainer();
 ['touchstart','mousedown','wheel'].forEach(ev=>cc.addEventListener(ev,()=>{if(nav){if(follow){follow=false;$('#rcn').style.display='flex'}}else P.moved=true},{passive:true}))})();
map.on('movestart',e=>{if(nav&&e.originalEvent){follow=false;$('#rcn').style.display='flex'}});
$('#rcn').onclick=()=>{follow=true;$('#rcn').style.display='none';const q=R.lastP;if(q)map.easeTo({center:q.ll,bearing:S.head?q.h:0,pitch:S.tilt?50:0,zoom:17,padding:{top:230,bottom:130,left:0,right:0},duration:600})};
$('#nv').onclick=()=>{S.voice=!S.voice;store.set('set',S);$('#nv').textContent=S.voice?'🔊':'🔇';if(!S.voice&&'speechSynthesis' in window)speechSynthesis.cancel()};
document.addEventListener('visibilitychange',()=>{if(nav&&!document.hidden&&navigator.wakeLock)navigator.wakeLock.request('screen').then(w=>wl=w).catch(()=>{})});

/* ---- Comptes : données séparées par profil, sauvegarde en ligne (Supabase) optionnelle ---- */
const profs=()=>G.get('profiles',[]),curProf=()=>profs().find(x=>x.id===CUR)||{id:'guest',name:'Invité'};
const saveProf=q=>{G.set('profiles',[...profs().filter(x=>x.id!==q.id),q])};
const SYNC=['veh','set','home','work','recent','favs'];
async function sbf(path,opt,pr){const c=G.get('sb',{});if(!c.url)throw new Error('Compte en ligne non configuré');const base=c.url.replace(/\/$/,'');
 const go=()=>fetch(base+path,{...opt,headers:{apikey:c.key,'Content-Type':'application/json',...(pr?{Authorization:'Bearer '+pr.access}:{}),...((opt&&opt.headers)||{})}});
 let r=await go();
 if(r.status===401&&pr&&pr.refresh){const t=await fetch(base+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:c.key,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:pr.refresh})});
  if(t.ok){const j=await t.json();pr.access=j.access_token;pr.refresh=j.refresh_token;saveProf(pr);r=await go()}}
 return r}
let synT=null;
function syncSoon(){const q=curProf();if(!q.uid)return;clearTimeout(synT);synT=setTimeout(async()=>{try{const data={};SYNC.forEach(k=>data[k]=store.get(k,null));if(data.set)data.set={...data.set,tomtom:'',stadia:''};
 const r=await sbf('/rest/v1/profiles?on_conflict=user_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates'},body:JSON.stringify({user_id:q.uid,data})},q);if(!r.ok)throw 0}catch(e){toast('Sauvegarde en ligne impossible pour le moment')}},2000)}
async function authGo(mode,email,pw){const c=G.get('sb',{}),base=c.url.replace(/\/$/,'');
 const r=await fetch(base+(mode==='up'?'/auth/v1/signup':'/auth/v1/token?grant_type=password'),{method:'POST',headers:{apikey:c.key,'Content-Type':'application/json'},body:JSON.stringify({email,password:pw})});
 const j=await r.json();if(!r.ok)throw new Error(j.msg||j.error_description||j.message||'Erreur');
 if(!j.access_token)return false;
 const uid=j.user.id,id='c_'+uid.slice(0,12),q={id,name:j.user.email,uid,access:j.access_token,refresh:j.refresh_token};saveProf(q);
 try{const g=await sbf('/rest/v1/profiles?select=data&user_id=eq.'+uid,{},q),a=await g.json();if(a[0]&&a[0].data)SYNC.forEach(k=>{if(a[0].data[k]!=null)localStorage.setItem(id+':'+k,JSON.stringify(a[0].data[k]))})}catch(e){}
 G.set('cur',id);location.reload();return true}
function drawAcct(msg){const c=G.get('sb',{}),cp=curProf();
 $('#acl').innerHTML=`<div class="sec">Profil actuel</div><div class="set"><span>👤 ${esc(cp.name)}</span><span style="color:var(--mute);font-size:13px">${cp.uid?'en ligne ☁️':'sur cet appareil'}</span></div>
 <div class="sec">Profils sur cet appareil (données séparées)</div>`+[{id:'guest',name:'Invité'},...profs()].map(x=>`<button class="set" data-a="sw" data-id="${esc(x.id)}"><span>${x.id===CUR?'✅ ':''}${esc(x.name)}${x.uid?' ☁️':''}</span><span style="color:var(--blue)">${x.id===CUR?'':'Utiliser'}</span></button>`).join('')+
 `<div class="set"><input class="in" id="nn" placeholder="Nom du nouveau profil"><button class="chip" data-a="new">Créer</button></div>
 <div class="sec">Compte en ligne (sauvegarde sur tous tes appareils)</div>`+
 (c.url&&c.key?`<div class="set"><input class="in" id="em" type="email" placeholder="E-mail" autocapitalize="off"></div><div class="set"><input class="in" id="pw" type="password" placeholder="Mot de passe (6 caractères min.)"></div>
 <div class="set"><button class="chip" data-a="in">Se connecter</button><button class="chip" data-a="up">Créer un compte</button><button class="chip" data-a="cfg0">Modifier la config</button></div>`
 :`<div class="set" style="color:var(--mute);font-size:14px;display:block">Pour activer les comptes en ligne, renseigne ton projet Supabase gratuit (l'URL et la clé « anon »).</div>
 <div class="set"><input class="in" id="su" placeholder="https://xxxx.supabase.co" autocapitalize="off"></div><div class="set"><input class="in" id="sk" placeholder="Clé anon (publique)" autocapitalize="off"><button class="chip" data-a="cfg">OK</button></div>`)+
 `<div id="am" style="padding:14px 20px;color:var(--warn);font-size:14px">${esc(msg||'')}</div>`}
$('#acl').addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a==='sw'){G.set('cur',b.dataset.id);location.reload()}
 else if(a==='new'){const n=$('#nn').value.trim();if(!n)return;const id='l'+Date.now().toString(36);saveProf({id,name:n});G.set('cur',id);location.reload()}
 else if(a==='cfg'){const u=$('#su').value.trim(),k=$('#sk').value.trim();if(!/^https:\/\//.test(u)||!k){drawAcct('URL (https://…) et clé requises.');return}G.set('sb',{url:u,key:k});drawAcct('Configuration enregistrée.')}
 else if(a==='cfg0'){G.set('sb',{});drawAcct()}
 else if(a==='in'||a==='up'){const em=$('#em').value.trim(),pw=$('#pw').value;if(!em||pw.length<6){$('#am').textContent='E-mail et mot de passe (6 caractères min.) requis.';return}
  $('#am').textContent='Un instant…';try{const ok=await authGo(a,em,pw);if(ok===false)$('#am').textContent='Compte créé. Confirme ton e-mail (lien reçu), puis connecte-toi.'}catch(x){$('#am').textContent=x.message}}});

/* ---- Signalements ---- */
const RT={danger:['⚠️','Route dangereuse',720],works:['🚧','Travaux',336],closed:['⛔','Route fermée',72],bad:['🕳️','Chaussée dégradée',1440],slow:['🐢','Difficile pour un VSP',1440],accident:['🚨','Accident',3],animal:['🐗','Animaux sur la route',3],weather:['🌧️','Météo difficile',4],jam:['🚦','Embouteillage',2],parking:['🅿️','Nouveau parking',8760],station:['⛽','Station-service',8760]};
const sbOn=()=>{const c=G.get('sb',{});return !!(c.url&&c.key)};
async function repsNear(b){
 let out=store.get('myrep',[]).filter(x=>x.lon>=b[0]&&x.lon<=b[2]&&x.lat>=b[1]&&x.lat<=b[3]);
 if(sbOn()){try{const c=G.get('sb',{}),q=curProf().uid?curProf():{access:c.key},
  r=await sbf('/rest/v1/reports_scored?select=*&lat=gte.'+b[1]+'&lat=lte.'+b[3]+'&lon=gte.'+b[0]+'&lon=lte.'+b[2]+'&limit=200',{},q);
  if(r.ok)out=out.concat((await r.json()).map(x=>({id:x.id,type:x.type,lat:x.lat,lon:x.lon,t:Date.parse(x.created_at),up:x.up||0,down:x.down||0,uid:x.user_id})))}catch(e){}}
 const now=Date.now();const hid=store.get('hidrep',[]);return out.filter(x=>!hid.includes(x.id)&&RT[x.type]&&now-x.t<RT[x.type][2]*3600000&&(x.up||0)-(x.down||0)>-2)}
let rmk=[],lastRep=0,rT=null;
async function showReps(){if(nav&&Date.now()-lastRep<30000)return;lastRep=Date.now();rmk.forEach(m=>m.remove());rmk=[];if(!S.showrep||map.getZoom()<11)return;const b=map.getBounds();
 const L=await repsNear([b.getWest(),b.getSouth(),b.getEast(),b.getNorth()]);
 rmk=L.slice(0,60).map(x=>{const e=emo(RT[x.type][0]);e.style.fontSize='26px';e.style.cursor='pointer';const m=new maplibregl.Marker({element:e}).setLngLat([x.lon,x.lat]).addTo(map);
  e.onclick=ev=>{ev.stopPropagation();const sc=(x.up||0)-(x.down||0),mn=Math.max(1,Math.round((Date.now()-x.t)/60000));
   new maplibregl.Popup({offset:18}).setLngLat([x.lon,x.lat]).setHTML('<div style="color:#17140F;font-family:inherit"><b>'+RT[x.type][0]+' '+RT[x.type][1]+'</b><br>il y a '+(mn<90?mn+' min':Math.round(mn/60)+' h')+'<br>'+(x.local?'Sur cet appareil':sc>=2?'✅ Confirmé ('+x.up+')':'🕒 À confirmer')+(x.local?'':'<br><button data-v="1" data-id="'+x.id+'">✅ Toujours là</button> <button data-v="-1" data-id="'+x.id+'">❌ Plus là</button>')+'<br><button data-hide="'+x.id+'">🙈 Masquer</button>'+((x.local||(curProf().uid&&x.uid===curProf().uid))?' <button data-del="'+x.id+'">🗑️ Supprimer</button>':'')+'</div>').addTo(map)};return m})}
map.on('moveend',()=>{clearTimeout(rT);rT=setTimeout(showReps,700)});
document.addEventListener('click',async e=>{const h=e.target.closest('[data-hide]'),d=e.target.closest('[data-del]');if(!h&&!d)return;
 document.querySelectorAll('.maplibregl-popup').forEach(q=>q.remove());
 if(h){const L=store.get('hidrep',[]);L.push(h.dataset.hide);store.set('hidrep',L.slice(-200));toast('Icône masquée')}
 else{const id=d.dataset.del;if(id[0]==='l')store.set('myrep',store.get('myrep',[]).filter(x=>x.id!==id));else{try{await sbf('/rest/v1/reports?id=eq.'+id,{method:'DELETE'},curProf())}catch(x){}}toast('Signalement supprimé')}
 lastRep=0;showReps()});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-v]');if(!b)return;
 if(!curProf().uid||!sbOn()){toast('Connecte un compte en ligne pour confirmer un signalement.');return}
 try{const r=await sbf('/rest/v1/report_votes?on_conflict=report_id,user_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({report_id:b.dataset.id,vote:+b.dataset.v})},curProf());if(!r.ok)throw 0;toast('Merci pour ton retour !');lastRep=0;showReps()}catch(x){toast('Vote impossible pour le moment')}});
async function sendRep(t){if(Date.now()-(sendRep.t||0)<20000){toast('Patiente quelques secondes');return}sendRep.t=Date.now();
 const c=pos||map.getCenter(),o={type:t,lat:+c.lat.toFixed(5),lon:+c.lng.toFixed(5)},q=curProf();$('#repo').classList.remove('on');
 if(sbOn()&&q.uid){try{const r=await sbf('/rest/v1/reports',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(o)},q);if(!r.ok)throw 0;toast('Signalement partagé, merci !');lastRep=0;showReps();return}catch(e){toast('Envoi impossible : enregistré sur cet appareil')}}
 else toast('Enregistré sur cet appareil. Connecte un compte en ligne pour le partager.');
 const L=store.get('myrep',[]);L.push({...o,id:'l'+Date.now(),t:Date.now(),local:1});store.set('myrep',L.slice(-50));lastRep=0;showReps()}
$('#repg').innerHTML=Object.entries(RT).map(([k,v])=>`<button class="rt" data-t="${k}"><span>${v[0]}</span><small>${v[1]}</small></button>`).join('');
$('#repg').onclick=e=>{const b=e.target.closest('[data-t]');if(b)sendRep(b.dataset.t)};
$('#rep').onclick=()=>$('#repo').classList.add('on');
map.once('idle',showReps);

/* ---- Trafic en direct (TomTom) : routes colorées + incidents sur toute la carte ---- */
async function testTT(){const K=(S.tomtom||'').trim();if(!K){alert('Colle d\'abord ta clé TomTom dans le champ au-dessus.');return}
 toast('Test en cours…');const c=map.getCenter(),z=10,x=Math.floor((c.lng+180)/360*2**z),y=Math.floor((1-Math.log(Math.tan(c.lat*rad)+1/Math.cos(c.lat*rad))/Math.PI)/2*2**z);
 let a='',b='';
 try{const r=await fetch('https://api.tomtom.com/traffic/map/4/tile/flow/relative/'+z+'/'+x+'/'+y+'.png?key='+encodeURIComponent(K));a=r.ok?'OK':'erreur '+r.status}catch(e){a='injoignable'}
 try{const L=await ttInc([c.lng-.2,c.lat-.12,c.lng+.2,c.lat+.12]);b='OK : '+L.length+' incident(s) dans ta zone, dont '+L.filter(i=>bigOf(i.properties)).length+' grave(s) (route barrée ou travaux majeurs)'}catch(e){b=e.status?'erreur '+e.status:'injoignable'}
 alert('Test de ta clé TomTom\n\nBouchons (carte du trafic) : '+a+'\nIncidents et routes barrées : '+b+(/40[13]/.test(a+b)?'\n\nSur developer.tomtom.com, ouvre ta clé : coche « Traffic API », vérifie les domaines autorisés, patiente 2-3 minutes.':'')+(/injoignable/.test(a+b)?'\n\nUn bloqueur de pub, un VPN ou une restriction de domaine peut bloquer TomTom.':'')+(a==='OK'&&/ 0 incident/.test(b)?'\n\nLa clé marche : il n\'y a simplement aucun incident dans ta zone en ce moment.':''))}
/* Tuiles de trafic TomTom : le vert (fluide) est rendu transparent, le reste devient jaune ou rouge */
function ttRecolor(d){for(let i=0;i<d.length;i+=4){if(d[i+3]<8)continue;const R=d[i],G=d[i+1],B=d[i+2],mx=Math.max(R,G,B),del=mx-Math.min(R,G,B);
  if(del<40){d[i+3]=0;continue}
  let h=mx===R?((G-B)/del)%6:mx===G?(B-R)/del+2:(R-G)/del+4;h*=60;if(h<0)h+=360;
  if(h>=75&&h<=175){d[i+3]=0}
  else if(h>=38&&h<75){d[i]=255;d[i+1]=196;d[i+2]=0}
  else{d[i]=229;d[i+1]=40;d[i+2]=45}}}
async function ttTile(url,sig){
 const r=await fetch(url,{signal:sig});if(!r.ok){const e=new Error('TomTom '+r.status);e.status=r.status;throw e}
 const bmp=await createImageBitmap(await r.blob()),w=bmp.width,h=bmp.height;let cv;
 if(typeof OffscreenCanvas!=='undefined')cv=new OffscreenCanvas(w,h);else{cv=document.createElement('canvas');cv.width=w;cv.height=h}
 const ctx=cv.getContext('2d',{willReadFrequently:true});ctx.drawImage(bmp,0,0);const im=ctx.getImageData(0,0,w,h);ttRecolor(im.data);ctx.putImageData(im,0,0);
 const blob=cv.convertToBlob?await cv.convertToBlob({type:'image/png'}):await new Promise(res=>cv.toBlob(res,'image/png'));
 return blob.arrayBuffer()}
let ttProto=false;
function regTT(){if(ttProto||!maplibregl.addProtocol)return;ttProto=true;
 maplibregl.addProtocol('ttflow',async(p,ac)=>{const m=p.url.match(/(\d+)\/(\d+)\/(\d+)/),K=TT();
  return{data:await ttTile('https://api.tomtom.com/traffic/map/4/tile/flow/relative/'+m[1]+'/'+m[2]+'/'+m[3]+'.png?key='+encodeURIComponent(K),ac&&ac.signal)}})}
function trafficOn(){ttErr=0;ttWarn=false;try{if(map.getLayer('tt-flow'))map.removeLayer('tt-flow');if(map.getSource('tt'))map.removeSource('tt')}catch(e){}
 const K=TT();if(!K||!S.flow||!maplibregl.addProtocol)return;regTT();
 try{map.addSource('tt',{type:'raster',tiles:['ttflow://{z}/{x}/{y}'],tileSize:256,minzoom:8,maxzoom:18,attribution:'© TomTom'});
  map.addLayer({id:'tt-flow',type:'raster',source:'tt',paint:{'raster-opacity':.95,'raster-fade-duration':0}},map.getLayer('rc')?'rc':undefined)}catch(e){}}
let incFC={type:'FeatureCollection',features:[]};
function incLinesApply(){try{if(!map.getSource('ttl')){map.addSource('ttl',{type:'geojson',data:incFC});
  const add=(id,paint)=>map.addLayer({id,type:'line',source:'ttl',layout:{'line-cap':'round','line-join':'round'},paint},map.getLayer('rc')?'rc':undefined);
  add('ttl-c',{'line-color':'#fff','line-width':['interpolate',['linear'],['zoom'],8,3,14,8,18,14],'line-opacity':.05});
  add('ttl-l',{'line-color':['match',['get','c'],'r','#E5282D','#FFC400'],'line-width':['interpolate',['linear'],['zoom'],8,1.8,14,5,18,9],'line-opacity':.05})}
 else map.getSource('ttl').setData(incFC)}catch(e){}}
async function ttInc(b){const K=TT();const f='{incidents{geometry{type,coordinates},properties{iconCategory,magnitudeOfDelay,events{description},from,to,roadNumbers,delay}}}';
 const r=await fetch('https://api.tomtom.com/traffic/services/5/incidentDetails?key='+encodeURIComponent(K)+'&bbox='+b.join(',')+'&fields='+encodeURIComponent(f)+'&language=fr-FR&timeValidityFilter=present');
 if(r.status===401||r.status===403){const e=new Error('key');e.status=r.status;throw e}
 if(!r.ok){const e=new Error('http');e.status=r.status;throw e}return(await r.json()).incidents||[]}
const sevOf=p=>{const c=p.iconCategory,m=p.magnitudeOfDelay||0;if(c===8||m===4)return'r';if(c===6)return m>=3?'r':m===2?'y':null;if([1,3,7,9,14].includes(c))return m>=3?'r':'y';return null};
const bigOf=p=>{const c=p.iconCategory,m=p.magnitudeOfDelay||0;return c===8||m===4||([1,7,9,14].includes(c)&&m>=3)};
/* Routes barrées et travaux graves : on les envoie au calcul d'itinéraire pour les éviter */
async function blockers(o,d){const K=TT();if(!K||!S.avoid)return{pts:[],n:0};
 const pad=.04,w=Math.min(o.lng,d.lng)-pad,so=Math.min(o.lat,d.lat)-pad,e=Math.max(o.lng,d.lng)+pad,n=Math.max(o.lat,d.lat)+pad;
 if((e-w)*(n-so)>0.9)return{pts:[],n:0};
 try{const L=(await ttInc([w,so,e,n])).filter(it=>bigOf(it.properties)),pts=[];
  for(const it of L){const g=it.geometry,c=g.type==='Point'?[g.coordinates]:g.coordinates,st=Math.max(1,Math.ceil(c.length/6));for(let i=0;i<c.length;i+=st)pts.push({lat:c[i][1],lon:c[i][0]});if(c.length>1)pts.push({lat:c[c.length-1][1],lon:c[c.length-1][0]})}
  return{pts:pts.slice(0,40),n:L.length}}catch(x){return{pts:[],n:0}}}
let clT=null;
async function checkClosures(){if(!nav||rr||!TT()||!S.avoid||!pos||!dest||Date.now()-(R.lastCl||0)<180000)return;
 const bl=await blockers(pos,dest);if(!bl.pts.length||!nav)return;const a0=snap([pos.lng,pos.lat],R.idx).along;
 if(bl.pts.some(q=>{const sn=snap([q.lon,q.lat],0,true);return sn.d<60&&sn.along>a0})){R.lastCl=Date.now();toast('🚧 Route barrée ou travaux devant : nouvel itinéraire');reroute([pos.lng,pos.lat])}}
const IC_INC={1:['🚨','Accident'],2:['🌫️','Brouillard'],3:['⚠️','Conditions dangereuses'],4:['🌧️','Fortes pluies'],5:['🧊','Verglas'],6:['🚦','Embouteillage'],7:['🚧','Voie fermée'],8:['⛔','Route fermée'],9:['🚧','Travaux'],10:['💨','Vent fort'],11:['🌊','Inondation'],14:['🚗','Véhicule en panne']};
let imk=[],lastInc=0,incT=null,incWarned=false;
async function loadMapInc(){
 imk.forEach(m=>m.remove());imk=[];const K=TT(),clr=()=>{if(incFC.features.length){incFC={type:'FeatureCollection',features:[]};incLinesApply()}};
 if(!K||map.getZoom()<9.5||(!S.incmap&&!S.flow)){clr();return}
 if(nav&&Date.now()-lastInc<60000)return;lastInc=Date.now();
 const b=map.getBounds(),w=b.getWest(),so=b.getSouth(),e=b.getEast(),n=b.getNorth();
 if((e-w)*Math.cos(so*Math.PI/180)*111*(n-so)*111>9000)return;
 try{const L=await ttInc([w,so,e,n]);
  if(!window.ttHello){window.ttHello=1;toast(L.length?'Trafic TomTom actif : '+L.length+' incident(s) dans cette zone':'Trafic TomTom actif : rien à signaler dans cette zone')}
  if(S.flow){incFC={type:'FeatureCollection',features:L.filter(it=>it.geometry.type!=='Point'&&sevOf(it.properties)).slice(0,300).map(it=>({type:'Feature',geometry:it.geometry,properties:{c:sevOf(it.properties)}}))};incLinesApply()}else clr();
  if(S.incmap)imk=L.filter(it=>{const c=it.properties.iconCategory;return c!==0&&(c!==6||(it.properties.magnitudeOfDelay||0)>=3)}).slice(0,80).map(it=>{
   const g=it.geometry,pt=g.type==='Point'?g.coordinates:g.coordinates[Math.floor(g.coordinates.length/2)],p=it.properties,c=IC_INC[p.iconCategory]||['⚠️','Incident'];
   const el=emo(c[0]);el.style.cursor='pointer';el.style.width='36px';el.style.height='36px';el.style.fontSize='20px';
   const m=new maplibregl.Marker({element:el}).setLngLat(pt).addTo(map);
   el.onclick=ev=>{ev.stopPropagation();const d=(p.events&&p.events[0]&&p.events[0].description)||'',mn=p.delay?Math.round(p.delay/60):0;
    new maplibregl.Popup({offset:22}).setLngLat(pt).setHTML('<div style="color:#17133D"><b>'+c[0]+' '+c[1]+'</b>'+(d?'<br>'+esc(d):'')+(p.from?'<br>'+esc(p.from)+(p.to?' → '+esc(p.to):''):'')+((p.roadNumbers||[]).length?'<br>'+esc(p.roadNumbers.join(', ')):'')+(mn>0?'<br>Retard : '+mn+' min':'')+'<br><small>Source : TomTom</small></div>').addTo(map)};
   return m})}
 catch(err){if(err.status&&!incWarned){incWarned=true;toast(err.status===401||err.status===403?'Clé TomTom refusée : coche « Traffic API » sur ta clé (Réglages → Tester ma clé).':'TomTom : erreur '+err.status+' (Réglages → Tester ma clé).')}}}
map.on('moveend',()=>{clearTimeout(incT);incT=setTimeout(loadMapInc,900)});
setInterval(()=>{if(!document.hidden)loadMapInc()},120000);
map.once('idle',loadMapInc);

/* ---- Historique des trajets ---- */
function endTrip(){if(!R.t0||R.sim){R.t0=null;return}const km=(R.maxAlong||0)/1000;
 if(km>0.2&&dest){const L=store.get('trips',[]);L.unshift({t:R.t0,ms:Date.now()-R.t0,km:+km.toFixed(2),d:dest,veh:vNm(),cons:S.cons,fuel:S.fuel});store.set('trips',L.slice(0,100))}R.t0=null}
function drawTrips(){const L=store.get('trips',[]),km=L.reduce((a,x)=>a+x.km,0),ms=L.reduce((a,x)=>a+x.ms,0),cs=L.reduce((a,x)=>a+(x.cons?x.km*x.cons/100:0),0),u=S.fuel==='ev'?'kWh':'L';
 const ord=L.map((x,i)=>({x,i})).sort((a,b)=>(b.x.fav?1:0)-(a.x.fav?1:0));
 $('#trl').innerHTML='<div class="set" style="display:block;line-height:1.8"><b style="font-size:22px">'+L.length+' trajet'+(L.length>1?'s':'')+'</b><br>🛣️ '+km.toFixed(1).replace('.',',')+' km · ⏱️ '+fmt(ms/1000)+(cs?' · ⛽ ≈ '+cs.toFixed(1).replace('.',',')+' '+u+' (estimation selon ta conso)':'')+'</div>'+
 (ord.length?ord.map(({x,i})=>`<button class="row" data-i="${i}"><i data-star="${i}" style="padding:6px;font-size:24px">${x.fav?'★':'☆'}</i><div><b>${esc(x.d.label.split(',')[0])}</b><span>${new Date(x.t).toLocaleDateString('fr-FR')} · ${x.km.toFixed(1).replace('.',',')} km · ${fmt(x.ms/1000)} · ${esc(x.veh)}</span></div></button>`).join(''):'<h4>Aucun trajet pour l\'instant. Ils s\'enregistrent quand tu roules avec le guidage.</h4>')}
$('#trl').onclick=e=>{const st=e.target.closest('[data-star]');const L=store.get('trips',[]);
 if(st){const i=+st.dataset.star;L[i].fav=!L[i].fav;store.set('trips',L);drawTrips();return}
 const b=e.target.closest('.row');if(b){$('#trips').classList.remove('on');$('#sets').classList.remove('on');plan(L[+b.dataset.i].d)}};
function exportData(){const o={profil:curProf().name,exporte:new Date().toISOString()};['veh','set','home','work','recent','favs','trips','myrep'].forEach(k=>o[k]=store.get(k,null));
 if(o.set)o.set={...o.set,tomtom:'(masquée)',stadia:'(masquée)'};
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(o,null,2)],{type:'application/json'}));a.download='mes-donnees-vroomy.json';a.click()}

/* ---- Menu & démarrage ---- */
const SCH=[['Conduite'],['sw','beg','Mode débutant (plus d’alertes, trajets simples)'],['Concentration'],['sw','focusrem','Rappel « mode Conduite » au départ'],['btn','fc_','📵 Comment bloquer les notifications'],['Guidage'],['sw','voice','Guidage vocal'],['sw','duck','Ne pas couper ma musique (expérimental)'],['rng','vol','Volume de la voix'],['sw','alert','Alerte de dépassement de vitesse'],['sel','tol','Tolérance avant alerte',[[0,'0 km/h'],[3,'3 km/h'],[5,'5 km/h'],[10,'10 km/h']]],
['Itinéraire'],['sw','notoll','Éviter les péages'],['sw','noferry','Éviter les bacs'],['sw','notrack','Éviter pistes et chemins'],['sw','alts','Proposer des trajets alternatifs'],['sw','avoid','Éviter routes barrées et travaux graves (TomTom)'],['info','Autoroutes et voies rapides : toujours évitées (sécurité)'],
['Carte'],['sel','style','Style de carte',[['positron','Clair épuré'],['liberty','En couleurs'],['bright','Couleurs vives']]],['sel','cursor','Icône de mon véhicule sur la carte',[['auto','Selon mon icône'],['arrow','➤ Flèche'],['dot','● Point']]],['sel','theme','Apparence',[['auto','Automatique'],['light','Clair'],['dark','Sombre']]],['sw','tilt','Vue 3D en navigation'],['sw','head','Carte orientée dans le sens de la route'],['sw','vsp','Couleur des routes pour VSP (🟢🟡🟠🔴)'],['sw','showrep','Afficher les signalements sur la carte'],['sw','repbtn','Afficher le bouton ⚠️ Signaler'],
['Trafic et services'],['sw','traffic','Tenir compte du trafic'],['sw','flow','Routes barrées et bouchons en couleur (rouge / jaune)'],['sw','incmap','Accidents et travaux sur la carte'],['txt','tomtom','Clé TomTom (trafic)'],['btn','tt_','🔍 Tester ma clé TomTom'],['txt','stadia','Clé Stadia (itinéraires)']];
function drawSets(){const v=VEH[vi];
 $('#setl').innerHTML=`<div class="sec">Compte</div><button class="set" id="ac_"><span>👤 ${esc(curProf().name)}</span><span>›</span></button><div class="sec">Mon véhicule</div><button class="set" id="sv_"><span>${vIc()} ${esc(vNm())} · ${FU[S.fuel]}</span><span>›</span></button>`+SCH.map(r=>{
  if(r.length===1)return `<div class="sec">${r[0]}</div>`;
  if(r[0]==='btn')return `<button class="set" id="${r[1]}"><span>${r[2]}</span><span>›</span></button>`;
  if(r[0]==='info')return `<div class="set" style="color:var(--mute);font-size:14px">🔒 ${r[1]}</div>`;
  const [t,k,l,o]=r,c=S[k];
  const inp=t==='sw'?`<input type="checkbox" data-k="${k}" ${c?'checked':''}>`:t==='rng'?`<input type="range" data-k="${k}" min="0" max="1" step="0.1" value="${c}">`:
   t==='sel'?`<select data-k="${k}">${o.map(x=>`<option value="${x[0]}" ${String(x[0])===String(c)?'selected':''}>${x[1]}</option>`).join('')}</select>`:`<input type="text" data-k="${k}" value="${esc(c)}" placeholder="optionnel" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  return `<label class="set"><span>${l}</span>${inp}</label>`}).join('')+
  `<div class="sec">Mes données</div><button class="set" id="tr_"><span>📊 Mes trajets</span><span>›</span></button><button class="set" id="ex_"><span>⬇️ Exporter mes données</span><span>›</span></button><div class="sec">Application</div><button class="set" id="lg_"><span>⚖️ Informations légales</span><span>›</span></button><button class="set" id="ab_"><span>À propos et sécurité</span><span>›</span></button><button class="set" id="rs_" style="color:#e5484d"><span>Réinitialiser les réglages</span></button>`;
 $('#ac_').onclick=()=>{drawAcct();$('#acct').classList.add('on')};$('#sv_').onclick=()=>{drawV();$('#vehs').classList.add('on')};$('#ab_').onclick=()=>$('#about').classList.add('on');$('#fc_').onclick=()=>$('#focus').classList.add('on');$('#tt_').onclick=testTT;$('#tr_').onclick=()=>{drawTrips();$('#trips').classList.add('on')};$('#lg_').onclick=()=>$('#legal').classList.add('on');$('#ex_').onclick=exportData;
 $('#rs_').onclick=()=>{if(confirm('Remettre tous les réglages par défaut ?')){Object.assign(S,DEF);store.set('set',S);applyTheme();drawSets();$('#nv').textContent='🔊'}}}
$('#setl').addEventListener('change',e=>{const k=e.target.dataset.k;if(!k)return;const el=e.target;S[k]=el.type==='checkbox'?el.checked:el.type==='range'?+el.value:k==='tol'?+el.value:el.value.trim();store.set('set',S);applyTheme();if(k==='style')map.setStyle('https://tiles.openfreemap.org/styles/'+S.style);if(k==='cursor')refreshMe();if(k==='vsp'){vspOn();legend()}if(k==='showrep'){lastRep=0;showReps()}if(k==='flow')trafficOn();if(k==='incmap'){lastInc=0;loadMapInc()}if(k==='repbtn')applyUi();if(k==='voice')$('#nv').textContent=S.voice?'🔊':'🔇';if(k==='tomtom'||k==='traffic'){tfOK=null;Object.keys(tfCache).forEach(x=>delete tfCache[x]);ttOff=false;trafficOn();lastInc=0;loadMapInc();if(dest)plan(dest)}});
$('#menu').onclick=()=>{drawSets();$('#sets').classList.add('on')};
$('#clr').onclick=()=>{['veh','set','home','work','recent','favs','trips','myrep','seen'].forEach(k=>{try{localStorage.removeItem(PF+k)}catch(e){}});vi=0;$('#about').classList.remove('on');home();toast('Données effacées')};
$('#cg').onchange=()=>{$('#ok').disabled=!$('#cg').checked;$('#ok').style.opacity=$('#cg').checked?1:.5};
['#l1','#l2'].forEach(x=>$(x).onclick=e=>{e.preventDefault();$('#legal').classList.add('on')});
$('#ok').onclick=()=>{G.set('consent',{v:1,t:Date.now()});store.set('seen',1);$('#intro').style.display='none'};
if(!G.get('consent',0))$('#intro').style.display='block';
home();layout();legend();applyUi();

if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
