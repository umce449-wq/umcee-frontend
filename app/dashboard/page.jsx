"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   UMCEM DASHBOARD — Premium SaaS · 13 Sections
   Design: #10B981 · Inter · #0B0F19 · Cards #111827
   Supabase-Ready DataService pattern
═══════════════════════════════════════════════════ */

const DS = {
  getStats: async () => ({ totalOrders:1247,confirmed:873,pending:198,cancelled:176,revenue:84320,netProfit:31840,confirmRate:70.0,returnRate:14.1,revChange:+18.4,ordChange:+12.7,profChange:+22.1,confChange:+5.3,retChange:+2.3,todayOrders:47,todayRevenue:4120,roi:37.7 }),
  getOrders: async () => [
    {id:"#4821",product:"Smart Watch Pro",store:"Shopify",agent:"أحمد علي",status:"confirmed",price:220,profit:43,city:"طرابلس",date:"16 مارس",time:"10:24"},
    {id:"#4820",product:"Wireless Earbuds",store:"YouCan",agent:"سارة محمد",status:"pending",price:85,profit:0,city:"بنغازي",date:"16 مارس",time:"09:58"},
    {id:"#4819",product:"Phone Stand",store:"WooCommerce",agent:"محمد كامل",status:"confirmed",price:35,profit:18,city:"مصراتة",date:"16 مارس",time:"09:31"},
    {id:"#4818",product:"Smart Watch Pro",store:"Shopify",agent:"أحمد علي",status:"cancelled",price:220,profit:0,city:"الزاوية",date:"15 مارس",time:"18:44"},
    {id:"#4817",product:"Laptop Stand",store:"YouCan",agent:"فاطمة حسن",status:"confirmed",price:120,profit:52,city:"طرابلس",date:"15 مارس",time:"17:12"},
    {id:"#4816",product:"Wireless Earbuds",store:"Shopify",agent:"سارة محمد",status:"no_answer",price:85,profit:0,city:"سبها",date:"15 مارس",time:"16:05"},
    {id:"#4815",product:"Smart Watch Pro",store:"WooCommerce",agent:"محمد كامل",status:"confirmed",price:220,profit:43,city:"طبرق",date:"15 مارس",time:"14:33"},
    {id:"#4814",product:"Phone Stand",store:"YouCan",agent:"أحمد علي",status:"pending",price:35,profit:0,city:"بنغازي",date:"15 مارس",time:"13:21"},
    {id:"#4813",product:"Laptop Stand",store:"Shopify",agent:"نور الدين",status:"confirmed",price:120,profit:52,city:"طرابلس",date:"14 مارس",time:"11:00"},
    {id:"#4812",product:"Smart Watch Pro",store:"YouCan",agent:"عمر سالم",status:"returned",price:220,profit:-15,city:"بنغازي",date:"14 مارس",time:"10:30"},
  ],
  getTeam: async () => [
    {id:1,name:"فاطمة حسن",role:"مندوبة أولى",calls:52,confirmed:41,rate:79,av:"FH",color:"#10B981",status:"active",trend:+12,tasks:8,completed:7},
    {id:2,name:"أحمد علي",role:"مندوب أول",calls:47,confirmed:34,rate:72,av:"AA",color:"#818cf8",status:"active",trend:+8,tasks:10,completed:8},
    {id:3,name:"سارة محمد",role:"مندوبة",calls:38,confirmed:25,rate:66,av:"SM",color:"#3b82f6",status:"active",trend:+3,tasks:7,completed:5},
    {id:4,name:"محمد كامل",role:"مندوب",calls:31,confirmed:19,rate:61,av:"MK",color:"#f59e0b",status:"active",trend:-2,tasks:9,completed:6},
    {id:5,name:"نور الدين",role:"مندوب",calls:29,confirmed:18,rate:62,av:"ND",color:"#06b6d4",status:"active",trend:+1,tasks:6,completed:4},
    {id:6,name:"عمر سالم",role:"مندوب",calls:22,confirmed:12,rate:55,av:"OS",color:"#ef4444",status:"away",trend:-5,tasks:5,completed:2},
  ],
  getProducts: async () => [
    {id:1,name:"Smart Watch Pro",sku:"SWP-001",buy:85,sell:220,stock:45,sold:234,returns:12,profit:31840,store:"Shopify",img:"⌚",status:"active"},
    {id:2,name:"Wireless Earbuds",sku:"WEB-002",buy:28,sell:85,stock:32,sold:189,returns:8,profit:10710,store:"YouCan",img:"🎧",status:"active"},
    {id:3,name:"Phone Stand",sku:"PST-003",buy:8,sell:35,stock:120,sold:312,returns:4,profit:8424,store:"WooCommerce",img:"📱",status:"active"},
    {id:4,name:"Laptop Stand",sku:"LST-004",buy:32,sell:120,stock:18,sold:98,returns:6,profit:8624,store:"Shopify",img:"💻",status:"low"},
    {id:5,name:"USB-C Hub",sku:"UCH-005",buy:22,sell:75,stock:0,sold:67,returns:9,profit:3552,store:"YouCan",img:"🔌",status:"out"},
  ],
  getConfirmations: async () => [
    {orderId:"#4820",product:"Wireless Earbuds",client:"محمد سالم",phone:"0922345678",city:"بنغازي",attempt:2,max:3,next:"14:00",agent:"سارة محمد",day:2},
    {orderId:"#4814",product:"Phone Stand",client:"خالد العمر",phone:"0988901234",city:"بنغازي",attempt:1,max:3,next:"15:30",agent:"أحمد علي",day:1},
    {orderId:"#4816",product:"Wireless Earbuds",client:"أميرة حسن",phone:"0966789012",city:"سبها",attempt:2,max:3,next:"17:00",agent:"سارة محمد",day:2},
    {orderId:"#4811",product:"Laptop Stand",client:"يوسف كامل",phone:"0921111222",city:"طرابلس",attempt:3,max:3,next:"18:00",agent:"محمد كامل",day:3},
  ],
  getShipping: async () => [
    {id:"SH-001",orderId:"#4819",product:"Phone Stand",client:"عمر طالب",city:"مصراتة",company:"Aramex",track:"ARX123456",status:"delivered",date:"16 مارس",cost:12},
    {id:"SH-002",orderId:"#4817",product:"Laptop Stand",client:"ليلى نور",city:"طرابلس",company:"DHL",track:"DHL789012",status:"in_transit",date:"15 مارس",cost:18},
    {id:"SH-003",orderId:"#4815",product:"Smart Watch",client:"كريم أحمد",city:"طبرق",company:"Bosta",track:"BST345678",status:"in_transit",date:"15 مارس",cost:15},
    {id:"SH-004",orderId:"#4813",product:"Laptop Stand",client:"هند سالم",city:"طرابلس",company:"Maystro",track:"MYS901234",status:"pending",date:"14 مارس",cost:10},
  ],
  getReturns: async () => [
    {id:"RET-001",orderId:"#4812",product:"Smart Watch Pro",client:"أحمد الكيلاني",reason:"عيب مصنعي",status:"approved",refund:220,date:"14 مارس",city:"بنغازي"},
    {id:"RET-002",orderId:"#4809",product:"Wireless Earbuds",client:"سلمى حسن",reason:"غير مطابق",status:"pending",refund:85,date:"13 مارس",city:"طرابلس"},
    {id:"RET-003",orderId:"#4805",product:"Phone Stand",client:"ماهر نصر",reason:"تغيير رأي",status:"rejected",refund:0,date:"12 مارس",city:"مصراتة"},
  ],
  getDropsheet: async () => [
    {id:1,supplier:"AliExpress",product:"Smart Watch Pro X2",buy:62,sell:220,minOrder:5,shipping:"12-18d",rating:4.8,available:true,cat:"Electronics"},
    {id:2,supplier:"CJDropshipping",product:"Air Purifier Mini",buy:28,sell:95,minOrder:1,shipping:"8-14d",rating:4.6,available:true,cat:"Home"},
    {id:3,supplier:"Spocket",product:"Wireless Charger Pad",buy:15,sell:65,minOrder:10,shipping:"5-10d",rating:4.9,available:true,cat:"Electronics"},
    {id:4,supplier:"AliExpress",product:"Magnetic Phone Case",buy:4,sell:28,minOrder:20,shipping:"15-25d",rating:4.3,available:false,cat:"Accessories"},
  ],
  getStores: async () => [
    {id:1,name:"متجر الإلكترونيات",platform:"Shopify",orders:543,revenue:48200,icon:"🛍️",api:"shpat_****4821",status:"connected"},
    {id:2,name:"ستايل شوب",platform:"YouCan",orders:389,revenue:28400,icon:"👕",api:"yc_****8920",status:"connected"},
    {id:3,name:"تك ماركت",platform:"WooCommerce",orders:315,revenue:21100,icon:"💻",api:"wc_****3311",status:"connected"},
  ],
  getChart: async () => ({
    weekly:[
      {day:"Sat",orders:142,rev:12400},{day:"Sun",orders:168,rev:15200},
      {day:"Mon",orders:134,rev:11800},{day:"Tue",orders:189,rev:17600},
      {day:"Wed",orders:156,rev:14100},{day:"Thu",orders:201,rev:19300},
      {day:"Fri",orders:178,rev:16200},
    ]
  }),
};

// ─── Design Tokens ───
const G="#10B981",G2="#0d9268",GB="rgba(16,185,129,0.1)",GB2="rgba(16,185,129,0.18)";
const AM="#f59e0b",AMB="rgba(245,158,11,0.1)";
const RD="#ef4444",RDB="rgba(239,68,68,0.1)";
const BL="#3b82f6",BLB="rgba(59,130,246,0.1)";
const PR="#818cf8",PRB="rgba(129,140,248,0.1)";
const CY="#06b6d4",CYB="rgba(6,182,212,0.1)";

const STATUS_MAP={
  confirmed:{label:"Confirmed",color:G,bg:GB},
  pending:{label:"Pending",color:AM,bg:AMB},
  cancelled:{label:"Cancelled",color:RD,bg:RDB},
  no_answer:{label:"No Answer",color:PR,bg:PRB},
  returned:{label:"Returned",color:"#f97316",bg:"rgba(249,115,22,0.1)"},
};
const SHIP_MAP={
  delivered:{label:"Delivered",color:G,bg:GB},
  in_transit:{label:"In Transit",color:AM,bg:AMB},
  pending:{label:"Pending",color:PR,bg:PRB},
};
const RET_MAP={
  approved:{label:"Approved",color:G,bg:GB},
  pending:{label:"Reviewing",color:AM,bg:AMB},
  rejected:{label:"Rejected",color:RD,bg:RDB},
};

function Bdg({s,map=STATUS_MAP}){
  const x=map[s]||{label:s,color:"#64748b",bg:"rgba(100,116,139,0.1)"};
  return <span style={{fontSize:10,fontWeight:500,color:x.color,background:x.bg,padding:"2px 8px",borderRadius:10,whiteSpace:"nowrap"}}>{x.label}</span>;
}
function Pbar({v,color=G,h=3}){
  return(<div style={{height:h,background:"rgba(255,255,255,0.06)",borderRadius:h}}><div style={{width:`${Math.min(v,100)}%`,height:"100%",background:color,borderRadius:h,transition:"width 1s ease"}}/></div>);
}
function AnimN({v,pre="",suf="",dec=0}){
  const[d,setD]=useState(0);
  useEffect(()=>{let s=0;const step=v/60;const t=setInterval(()=>{s+=step;if(s>=v){setD(v);clearInterval(t);}else setD(Math.floor(s));},16);return()=>clearInterval(t);},[v]);
  const f=d>=1000000?(d/1000000).toFixed(1)+"M":d>=1000?(d/1000).toFixed(1)+"K":d.toFixed(dec);
  return <span>{pre}{f}{suf}</span>;
}

// ─── Mini sparkline SVG ───
function Spark({data,color}){
  const max=Math.max(...data),min=Math.min(...data);
  const pts=data.map((v,i)=>{
    const x=i*(48/(data.length-1));
    const y=22-((v-min)/(max-min||1))*18;
    return `${x},${y}`;
  }).join(" ");
  return(
    <svg width="50" height="24" viewBox="0 0 50 24" style={{opacity:.5}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Chart (pure SVG bars) ───
function BarChart({data}){
  const max=Math.max(...data.map(d=>d.rev));
  return(
    <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={G} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={G} stopOpacity="0.04"/>
        </linearGradient>
      </defs>
      {data.map((d,i)=>{
        const bh=(d.rev/max)*75;
        const x=i*40+4;
        return(
          <g key={i}>
            <rect x={x} y={80-bh} width={32} height={bh} fill="url(#bg)" rx="3"/>
            <rect x={x} y={80-bh} width={32} height={2} fill={G} rx="1" opacity="0.8"/>
            <text x={x+16} y={95} textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.6)">{d.day}</text>
          </g>
        );
      })}
      <line x1="0" y1="81" x2="280" y2="81" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Dashboard(){
  const[tab,setTab]=useState("overview");
  const[stats,setS]=useState(null);
  const[orders,setO]=useState([]);
  const[team,setT]=useState([]);
  const[products,setP]=useState([]);
  const[conf,setConf]=useState([]);
  const[ship,setShip]=useState([]);
  const[rets,setRets]=useState([]);
  const[drops,setDrops]=useState([]);
  const[stores,setStores]=useState([]);
  const[chart,setChart]=useState(null);
  const[loading,setLoading]=useState(true);
  const[sb,setSb]=useState(true);
  const[toast,setToast]=useState(null);
  const[oFilter,setOFilter]=useState("all");
  const[oSearch,setOSearch]=useState("");
  const[sim,setSim]=useState({buy:"",sell:"",ad:"",ship:"",ret:"20"});
  const[simR,setSimR]=useState(null);
  const[supMsg,setSupMsg]=useState({sub:"",msg:""});
  const[supSent,setSupSent]=useState(false);
  const[cfg,setCfg]=useState({name:"متجر الإلكترونيات",email:"owner@store.com",phone:"+218911234567",currency:"USD",notif:true,sms:true,email_rep:true});

  useEffect(()=>{
    Promise.all([DS.getStats(),DS.getOrders(),DS.getTeam(),DS.getProducts(),DS.getConfirmations(),DS.getShipping(),DS.getReturns(),DS.getDropsheet(),DS.getStores(),DS.getChart()])
    .then(([s,o,t,p,c,sh,r,d,st,ch])=>{setS(s);setO(o);setT(t);setP(p);setConf(c);setShip(sh);setRets(r);setDrops(d);setStores(st);setChart(ch);setLoading(false);});
  },[]);

  const notify=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),2800);};

  // ─── Colors ───
  const BG="#0B0F19",CARD="#111827",CARD2="#1a2235";
  const BD="rgba(31,45,69,1)",BD2="rgba(37,51,80,1)";
  const T1="#f8fafc",T2="#94a3b8",T3="#475569",T4="#2d3f58";

  const card=(extra={})=>({background:CARD,border:`1px solid ${BD}`,borderRadius:12,...extra});
  const inp={width:"100%",padding:"8px 12px",borderRadius:8,background:CARD2,border:`1px solid ${BD}`,color:T1,fontFamily:"inherit",fontSize:12.5,outline:"none",transition:"border-color .15s",boxSizing:"border-box"};

  const NAV=[
    {id:"overview",icon:"▦",label:"Dashboard"},
    {id:"orders",icon:"≡",label:"Orders",badge:stats?.pending},
    {id:"confirmations",icon:"✓",label:"Confirmations",badge:conf.length},
    {id:"team",icon:"⊙",label:"Team"},
    {id:"products",icon:"◻",label:"Products"},
    {id:"simulation",icon:"∿",label:"Simulation"},
    {id:"shipping",icon:"▷",label:"Shipping"},
    {id:"returns",icon:"↩",label:"Returns",badge:rets.filter(r=>r.status==="pending").length||undefined},
    {id:"dropsheet",icon:"⊞",label:"Drop Sheet"},
    {id:"stores",icon:"⊟",label:"Stores"},
    {id:"subscription",icon:"✦",label:"Subscription"},
    {id:"support",icon:"◎",label:"Support"},
    {id:"settings",icon:"⚙",label:"Settings"},
  ];

  if(loading)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div style={{width:36,height:36,borderRadius:"50%",border:`2px solid rgba(16,185,129,0.15)`,borderTopColor:G,animation:"spin .7s linear infinite"}}/>
      <p style={{color:T3,fontSize:12}}>Loading UMCEM...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  // ─── SIDEBAR ───
  const Sidebar=(
    <div style={{width:sb?218:56,background:"#0d1120",borderRight:`1px solid ${BD}`,display:"flex",flexDirection:"column",transition:"width .22s",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"hidden",zIndex:50}}>
      <div style={{padding:"16px 14px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>setTab("overview")}>
        <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#10B981,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:"#fff",flexShrink:0}}>U</div>
        {sb&&<span style={{fontWeight:600,fontSize:14,letterSpacing:"-.3px",color:T1}}><span style={{color:G}}>UM</span>CEM</span>}
      </div>
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto",display:"flex",flexDirection:"column",gap:1}}>
        {[
          {sec:"Overview",items:NAV.slice(0,3)},
          {sec:"Operations",items:NAV.slice(3,8)},
          {sec:"Commerce",items:NAV.slice(8,11)},
          {sec:"Account",items:NAV.slice(11)},
        ].map(({sec,items})=>(
          <div key={sec}>
            {sb&&<div style={{fontSize:9,color:T4,letterSpacing:"1px",textTransform:"uppercase",padding:"9px 8px 4px",fontWeight:500}}>{sec}</div>}
            {items.map(item=>(
              <button key={item.id} onClick={()=>setTab(item.id)} style={{
                display:"flex",alignItems:"center",gap:8,padding:sb?"7px 8px":"7px",
                borderRadius:7,border:"none",cursor:"pointer",width:"100%",
                background:tab===item.id?GB2:"transparent",
                color:tab===item.id?G:T3,
                fontFamily:"'Inter',system-ui,sans-serif",
                fontSize:12.5,fontWeight:tab===item.id?500:400,
                transition:"all .15s",justifyContent:sb?"flex-start":"center",
                position:"relative",
              }}>
                {tab===item.id&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:16,background:G,borderRadius:"0 3px 3px 0"}}/>}
                <span style={{fontSize:13,flexShrink:0,fontFamily:"monospace"}}>{item.icon}</span>
                {sb&&<span style={{flex:1,textAlign:"left"}}>{item.label}</span>}
                {sb&&item.badge>0&&<span style={{background:item.id==="returns"?RD:AM,color:"#000",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:10,marginLeft:"auto"}}>{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div style={{padding:"10px 8px",borderTop:`1px solid ${BD}`}}>
        <button onClick={()=>setSb(!sb)} style={{width:"100%",padding:"7px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T4,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:sb?"flex-end":"center",transition:"all .15s"}}>
          {sb?"◁":"▷"}
        </button>
        {sb&&(
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 8px 4px"}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#10B981,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:"#fff",flexShrink:0}}>EB</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11.5,fontWeight:500,color:T1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Elban Brahim</div>
              <div style={{fontSize:10,color:G}}>Owner · Pro ✦</div>
            </div>
            <div style={{width:7,height:7,borderRadius:"50%",background:G,boxShadow:`0 0 0 2px ${GB2}`,flexShrink:0}}/>
          </div>
        )}
      </div>
    </div>
  );

  // ─── TOPBAR ───
  const Topbar=(
    <div style={{height:52,background:"#0d1120",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(20px)",flexShrink:0}}>
      <div>
        <div style={{fontSize:13.5,fontWeight:600,color:T1}}>{NAV.find(n=>n.id===tab)?.label||"Dashboard"}</div>
        <div style={{fontSize:10.5,color:T3,marginTop:1}}>Monday, 16 March 2026</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <a href="/" style={{fontSize:11,color:T3,textDecoration:"none",background:CARD,border:`1px solid ${BD}`,padding:"5px 11px",borderRadius:7,transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color=T2} onMouseLeave={e=>e.currentTarget.style.color=T3}>← Home</a>
        <div style={{fontSize:11,color:T2,background:CARD,border:`1px solid ${BD}`,padding:"5px 11px",borderRadius:7}}>🇱🇾 Libya</div>
        <div style={{fontSize:11,color:T2,background:CARD,border:`1px solid ${BD}`,padding:"5px 11px",borderRadius:7}}>USD</div>
        <div style={{fontSize:11,color:G,background:GB2,border:`1px solid ${G2}50`,padding:"5px 11px",borderRadius:7,display:"flex",alignItems:"center",gap:5}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:G,animation:"pulse 2s infinite",display:"inline-block"}}/>Live
        </div>
      </div>
    </div>
  );

  const P={padding:20,display:"flex",flexDirection:"column",gap:14};

  // ══ 1. OVERVIEW ══
  const Overview=(
    <div style={P}>
      {/* Welcome */}
      <div style={{background:`linear-gradient(135deg,rgba(16,185,129,0.08),rgba(99,102,241,0.05))`,border:`1px solid rgba(16,185,129,0.15)`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:T1,marginBottom:3}}>Good morning, Elban 👋</div>
          <div style={{fontSize:11.5,color:T2}}><span style={{color:G,fontWeight:500}}>{stats.pending} pending orders</span> and <span style={{color:AM,fontWeight:500}}>{conf.length} confirmations</span> need attention today.</div>
        </div>
        <div style={{display:"flex",gap:7}}>
          <button onClick={()=>setTab("orders")} style={{padding:"7px 14px",borderRadius:7,background:G,border:"none",color:"#fff",fontSize:11.5,fontWeight:500,cursor:"pointer"}}>View Orders →</button>
          <button onClick={()=>setTab("simulation")} style={{padding:"7px 14px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T2,fontSize:11.5,cursor:"pointer",fontFamily:"inherit"}}>Run Simulation</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
        {[
          {label:"REVENUE",v:stats.revenue,ch:stats.revChange,color:G,pre:"$",data:[52,61,48,72,58,79,66]},
          {label:"NET PROFIT",v:stats.netProfit,ch:stats.profChange,color:PR,pre:"$",data:[21,28,19,33,26,38,31]},
          {label:"ORDERS",v:stats.totalOrders,ch:stats.ordChange,color:BL,data:[98,112,88,134,108,156,134]},
          {label:"CONF. RATE",v:stats.confirmRate,ch:stats.confChange,color:G,suf:"%",dec:1,data:[64,66,63,68,67,71,70]},
          {label:"RETURN RATE",v:stats.returnRate,ch:stats.retChange,color:RD,suf:"%",dec:1,warn:true,data:[10,11,10,12,13,14,14]},
        ].map((k,i)=>(
          <div key={i} style={{...card(),padding:"14px 16px",cursor:"default",position:"relative",overflow:"hidden",transition:"border-color .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=k.color+"60";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=BD;}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:k.color,opacity:.7,borderRadius:"12px 12px 0 0"}}/>
            <div style={{fontSize:9.5,fontWeight:500,color:T4,letterSpacing:".6px",marginBottom:7}}>{k.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:T1,letterSpacing:"-.5px",marginBottom:5}}>{k.pre}<AnimN v={k.v} dec={k.dec||0}/>{k.suf}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10.5,fontWeight:500,color:k.warn?RD:k.ch>0?G:RD}}>{k.ch>0?"↑":"↓"}{Math.abs(k.ch)}%</span>
              <Spark data={k.data} color={k.color}/>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Pipeline */}
      <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr",gap:10}}>
        <div style={card({padding:"16px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:12.5,fontWeight:600,color:T1}}>Revenue — Last 7 days</div>
              <div style={{fontSize:10.5,color:T3,marginTop:2}}>$106.6K total this week</div>
            </div>
            <span style={{fontSize:10.5,color:T3,border:`1px solid ${BD}`,borderRadius:5,padding:"3px 8px",cursor:"pointer"}}>Weekly ↓</span>
          </div>
          <div style={{height:110}}><BarChart data={chart?.weekly||[]}/></div>
        </div>
        <div style={card({padding:"16px"})}>
          <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:12}}>Order pipeline</div>
          <div style={{display:"flex",gap:5,alignItems:"flex-end"}}>
            {[{v:312,label:"New",color:BL},{v:198,label:"Process",color:AM},{v:243,label:"Shipped",color:PR},{v:418,label:"Delivered",color:G},{v:76,label:"Returned",color:RD}].map((s,i)=>{
              const max=418,h=Math.max((s.v/max)*70,6);
              return(
                <div key={i} style={{flex:1,textAlign:"center"}}>
                  <div style={{height:70,display:"flex",alignItems:"flex-end",justifyContent:"center",marginBottom:5}}>
                    <div style={{width:"100%",height:h,background:`${s.color}12`,border:`1px solid ${s.color}25`,borderRadius:"4px 4px 0 0",transition:"height .6s ease"}}/>
                  </div>
                  <div style={{fontSize:12,fontWeight:600,color:s.color}}>{s.v}</div>
                  <div style={{fontSize:9.5,color:T3,marginTop:1}}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alerts + Team + Products */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {/* Alerts */}
        <div style={card({padding:"16px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:12.5,fontWeight:600,color:T1}}>Operational alerts</div>
            <span style={{fontSize:10,color:AM,background:AMB,padding:"2px 8px",borderRadius:10,border:`1px solid ${AM}25`,fontWeight:500}}>3 active</span>
          </div>
          {[
            {icon:"⚠",title:"USB-C Hub — out of stock",sub:"0 units · 67 sold last month",color:RD,tag:"Critical"},
            {icon:"↑",title:"Return rate rising — 14.1%",sub:"Up 4.1pp · Smart Watch Pro",color:AM,tag:"Warning"},
            {icon:"⏱",title:"4 orders pending 48h+",sub:"Confirmation overdue · Day 2–3",color:AM,tag:"Delayed"},
          ].map((al,i)=>(
            <div key={i} onClick={()=>setTab(al.color===RD?"products":"confirmations")} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:8,background:`${al.color}0a`,border:`1px solid ${al.color}18`,marginBottom:6,cursor:"pointer",transition:"filter .15s"}} onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"} onMouseLeave={e=>e.currentTarget.style.filter="none"}>
              <div style={{width:24,height:24,borderRadius:6,background:`${al.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:al.color,flexShrink:0}}>{al.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:11.5,fontWeight:500,color:al.color}}>{al.title}</div>
                <div style={{fontSize:10,color:T3,marginTop:1}}>{al.sub}</div>
              </div>
              <span style={{fontSize:9.5,color:al.color,background:`${al.color}12`,padding:"2px 7px",borderRadius:10,flexShrink:0,fontWeight:500}}>{al.tag}</span>
            </div>
          ))}
        </div>

        {/* Team */}
        <div style={card({padding:"16px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:12.5,fontWeight:600,color:T1}}>Team performance</div>
            <button onClick={()=>setTab("team")} style={{fontSize:10.5,color:T3,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>All →</button>
          </div>
          {team.slice(0,5).map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:10,color:T4,width:12,flexShrink:0}}>{i+1}</span>
              <div style={{width:26,height:26,borderRadius:"50%",background:`${m.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9.5,fontWeight:600,color:m.color,flexShrink:0}}>{m.av}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11.5,fontWeight:500,color:T1,marginBottom:3}}>{m.name}</div>
                <Pbar v={m.rate} color={m.color}/>
              </div>
              <span style={{fontSize:11.5,fontWeight:600,color:m.color,flexShrink:0}}>{m.rate}%</span>
            </div>
          ))}
        </div>

        {/* Products */}
        <div style={card({padding:"16px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:12.5,fontWeight:600,color:T1}}>Product intelligence</div>
            <button onClick={()=>setTab("products")} style={{fontSize:10.5,color:T3,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>Catalog →</button>
          </div>
          {products.map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<products.length-1?`1px solid ${BD}`:"none"}}>
              <span style={{fontSize:10,color:T4,width:12}}>{i+1}</span>
              <div style={{width:26,height:26,borderRadius:6,background:CARD2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{p.img}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11.5,fontWeight:500,color:p.status==="out"?RD:T1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:9.5,color:T3}}>{p.sold} sold</div>
              </div>
              {p.status==="out"?<span style={{fontSize:9.5,color:RD,background:RDB,padding:"1px 6px",borderRadius:10,fontWeight:500}}>Out</span>
              :p.status==="low"?<span style={{fontSize:9.5,color:AM,background:AMB,padding:"1px 6px",borderRadius:10,fontWeight:500}}>Low</span>
              :<span style={{fontSize:11.5,fontWeight:600,color:G}}>${(p.profit/1000).toFixed(1)}K</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ 2. ORDERS ══
  const filtOrd=orders.filter(o=>{const ms=oFilter==="all"||o.status===oFilter;const mq=!oSearch||[o.product,o.agent,o.id,o.city].some(x=>x.toLowerCase().includes(oSearch.toLowerCase()));return ms&&mq;});
  const Orders=(
    <div style={P}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <input value={oSearch} onChange={e=>setOSearch(e.target.value)} placeholder="Search orders..." style={{...inp,flex:1,minWidth:160}} onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor=BD}/>
        <div style={{display:"flex",gap:4}}>
          {[["all","All"],["confirmed","Confirmed"],["pending","Pending"],["cancelled","Cancelled"],["no_answer","No Answer"],["returned","Returned"]].map(([v,l])=>(
            <button key={v} onClick={()=>setOFilter(v)} style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:500,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .15s",background:oFilter===v?G:CARD,color:oFilter===v?"#fff":T2}}>{l}</button>
          ))}
        </div>
        <button onClick={()=>notify("Export ready")} style={{padding:"6px 12px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T2,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Export ↓</button>
      </div>
      <div style={{display:"flex",gap:8}}>
        {[["All",orders.length,T2],["Confirmed",orders.filter(o=>o.status==="confirmed").length,G],["Pending",orders.filter(o=>o.status==="pending").length,AM],["Cancelled",orders.filter(o=>o.status==="cancelled").length,RD],["Returned",orders.filter(o=>o.status==="returned").length,"#f97316"]].map(([l,v,c],i)=>(
          <div key={i} style={{...card({padding:"10px 14px"}),flex:1,textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:600,color:c}}>{v}</div>
            <div style={{fontSize:10,color:T3,marginTop:1}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={card({overflow:"hidden",padding:0})}>
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr 85px 95px 72px 90px 70px",padding:"9px 14px",borderBottom:`1px solid ${BD}`,gap:7}}>
          {["ID","Product","Store","Agent","City","Status","Profit"].map((h,i)=>(<span key={i} style={{fontSize:10,color:T4,fontWeight:500}}>{h}</span>))}
        </div>
        {filtOrd.map((o,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 85px 95px 72px 90px 70px",padding:"10px 14px",gap:7,borderBottom:i<filtOrd.length-1?`1px solid ${BD}`:"none",transition:"background .12s",cursor:"pointer",alignItems:"center"}}
            onMouseEnter={e=>e.currentTarget.style.background=CARD2}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontSize:10.5,color:G,fontFamily:"monospace",fontWeight:500}}>{o.id}</span>
            <div>
              <div style={{fontSize:12,fontWeight:500,color:T1}}>{o.product}</div>
              <div style={{fontSize:10,color:T3}}>{o.date} · {o.time}</div>
            </div>
            <span style={{fontSize:11,color:T2}}>{o.store}</span>
            <span style={{fontSize:11,color:T1}}>{o.agent}</span>
            <span style={{fontSize:11,color:T2}}>{o.city}</span>
            <Bdg s={o.status}/>
            <span style={{fontSize:12,fontWeight:600,color:o.profit>0?G:o.profit<0?RD:T3}}>{o.profit>0?`+$${o.profit}`:o.profit<0?`-$${Math.abs(o.profit)}`:"—"}</span>
          </div>
        ))}
        {filtOrd.length===0&&<div style={{padding:28,textAlign:"center",color:T3,fontSize:12}}>No results found</div>}
      </div>
    </div>
  );

  // ══ 3. CONFIRMATIONS ══
  const Confirmations=(
    <div style={P}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Confirmation System</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>3 days · 3 sessions · 5 attempts — raises confirmation by 35%</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{l:"Morning session",t:"08:00–10:00",s:"completed",i:"☀"},{l:"Midday session",t:"12:00–14:00",s:"active",i:"⚡"},{l:"Evening session",t:"18:00–20:00",s:"upcoming",i:"🌙"}].map((s,i)=>(
          <div key={i} style={{...card({padding:"14px"}),background:s.s==="active"?GB2:CARD,borderColor:s.s==="active"?`${G}40`:BD,textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:7}}>{s.i}</div>
            <div style={{fontSize:12,fontWeight:500,color:s.s==="active"?G:T1}}>{s.l}</div>
            <div style={{fontSize:10.5,color:T3}}>{s.t}</div>
            <div style={{marginTop:8,display:"inline-block",fontSize:10,padding:"2px 9px",borderRadius:10,background:s.s==="active"?GB2:s.s==="completed"?"rgba(71,85,105,0.2)":AMB,color:s.s==="active"?G:s.s==="completed"?T3:AM,fontWeight:500}}>
              {s.s==="active"?"Active now":s.s==="completed"?"Completed":"Upcoming"}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {conf.map((c,i)=>(
          <div key={i} style={card({padding:"14px 16px"})}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:9}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                  <span style={{fontSize:10.5,color:G,fontFamily:"monospace"}}>{c.orderId}</span>
                  <span style={{fontSize:12,fontWeight:500,color:T1}}>{c.product}</span>
                  <span style={{fontSize:10,color:T3}}>Day {c.day}</span>
                </div>
                <div style={{display:"flex",gap:12,fontSize:11,color:T2,flexWrap:"wrap"}}>
                  <span>👤 {c.client}</span><span>📞 {c.phone}</span><span>📍 {c.city}</span><span>👷 {c.agent}</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:10,color:T3,marginBottom:4}}>Attempt {c.attempt}/{c.max}</div>
                <div style={{display:"flex",gap:3}}>{Array.from({length:c.max}).map((_,j)=><div key={j} style={{width:18,height:5,borderRadius:3,background:j<c.attempt?G:`rgba(255,255,255,0.07)`}}/>)}</div>
                <div style={{fontSize:10,color:AM,marginTop:5}}>Next: {c.next}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:7,marginTop:11}}>
              <button onClick={()=>notify(`Order ${c.orderId} confirmed ✓`)} style={{flex:1,padding:"7px",borderRadius:7,background:GB,border:`1px solid ${G}28`,color:G,cursor:"pointer",fontSize:11,fontWeight:500,fontFamily:"inherit"}}>✓ Confirm</button>
              <button onClick={()=>notify(`Order ${c.orderId} cancelled`,"err")} style={{flex:1,padding:"7px",borderRadius:7,background:RDB,border:`1px solid ${RD}28`,color:RD,cursor:"pointer",fontSize:11,fontWeight:500,fontFamily:"inherit"}}>✗ Cancel</button>
              <button onClick={()=>notify(`Rescheduled ${c.orderId}`)} style={{flex:1,padding:"7px",borderRadius:7,background:AMB,border:`1px solid ${AM}28`,color:AM,cursor:"pointer",fontSize:11,fontWeight:500,fontFamily:"inherit"}}>⏱ Delay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ══ 4. TEAM ══
  const Team=(
    <div style={P}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:15,fontWeight:600,color:T1}}>{team.length} Agents</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Avg. confirmation: {Math.round(team.reduce((a,m)=>a+m.rate,0)/team.length)}%</div></div>
        <button onClick={()=>notify("Add agent — coming soon")} style={{padding:"8px 16px",borderRadius:8,background:G,border:"none",color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer"}}>+ Add Agent</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {team.map((m,i)=>(
          <div key={i} style={{...card({padding:"16px"}),transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=m.color+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:13}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:`${m.color}18`,border:`2px solid ${m.rate>=70?m.color:BD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:m.color,flexShrink:0}}>{m.av}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5,fontWeight:600,color:T1}}>{m.name}</div>
                <div style={{fontSize:10.5,color:T3}}>{m.role}</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:m.status==="active"?G:AM,margin:"0 auto 3px",boxShadow:m.status==="active"?`0 0 0 2px ${GB2}`:"none"}}/>
                <span style={{fontSize:9,color:T3}}>{m.status==="active"?"Online":"Away"}</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:11}}>
              {[{l:"Calls",v:m.calls,c:T1},{l:"Confirmed",v:m.confirmed,c:G},{l:"Trend",v:(m.trend>0?"↑":"↓")+Math.abs(m.trend),c:m.trend>0?G:RD}].map((s,j)=>(
                <div key={j} style={{textAlign:"center",padding:"7px",borderRadius:7,background:CARD2}}>
                  <div style={{fontSize:15,fontWeight:600,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:9,color:T3,marginTop:1}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T3,marginBottom:3}}><span>Daily tasks</span><span>{m.completed}/{m.tasks}</span></div>
              <Pbar v={(m.completed/m.tasks)*100} color={m.rate>=70?G:AM} h={4}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Pbar v={m.rate} color={m.rate>=70?G:m.rate>=60?AM:RD} h={5}/>
              <span style={{fontSize:13,fontWeight:600,color:m.rate>=70?G:m.rate>=60?AM:RD,flexShrink:0}}>{m.rate}%</span>
            </div>
          </div>
        ))}
      </div>
      {/* Leaderboard bar */}
      <div style={card({padding:"16px"})}>
        <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:12}}>🏆 Daily Leaderboard</div>
        <div style={{display:"flex",gap:6,alignItems:"flex-end",height:70}}>
          {[...team].sort((a,b)=>b.rate-a.rate).map((m,i)=>(
            <div key={i} style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:9,color:T3,marginBottom:2}}>{m.av}</div>
              <div style={{height:`${m.rate*0.6}px`,background:i===0?`linear-gradient(180deg,${G},${G}40)`:CARD2,borderRadius:"3px 3px 0 0",transition:"height .6s",minHeight:5}}/>
              <div style={{fontSize:9,color:i===0?G:T3,marginTop:2,fontWeight:i===0?600:400}}>{m.rate}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ 5. PRODUCTS ══
  const Products=(
    <div style={P}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:15,fontWeight:600,color:T1}}>{products.length} Products</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Total profit: <span style={{color:G}}>${products.reduce((a,p)=>a+p.profit,0).toLocaleString()}</span></div></div>
        <button onClick={()=>notify("Add product — coming soon")} style={{padding:"8px 16px",borderRadius:8,background:G,border:"none",color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer"}}>+ Add Product</button>
      </div>
      <div style={card({overflow:"hidden",padding:0})}>
        <div style={{display:"grid",gridTemplateColumns:"40px 1fr 75px 70px 65px 65px 60px 65px 85px",padding:"9px 14px",borderBottom:`1px solid ${BD}`,gap:7}}>
          {["","Product","SKU","Store","Buy","Sell","Stock","Sold","Profit"].map((h,i)=>(<span key={i} style={{fontSize:10,color:T4,fontWeight:500}}>{h}</span>))}
        </div>
        {products.map((p,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"40px 1fr 75px 70px 65px 65px 60px 65px 85px",padding:"11px 14px",gap:7,borderBottom:i<products.length-1?`1px solid ${BD}`:"none",transition:"background .12s",cursor:"pointer",alignItems:"center"}}
            onMouseEnter={e=>e.currentTarget.style.background=CARD2}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontSize:20}}>{p.img}</span>
            <div><div style={{fontSize:12,fontWeight:500,color:T1}}>{p.name}</div><div style={{fontSize:10,color:T3}}>{p.returns} returns</div></div>
            <span style={{fontSize:10,color:T3,fontFamily:"monospace"}}>{p.sku}</span>
            <span style={{fontSize:11,color:T2}}>{p.store}</span>
            <span style={{fontSize:12,color:T1}}>${p.buy}</span>
            <span style={{fontSize:12,color:G,fontWeight:500}}>${p.sell}</span>
            <span style={{fontSize:12,color:p.stock===0?RD:p.stock<20?AM:T1,fontWeight:p.stock===0?600:400}}>{p.stock===0?"Out":p.stock}</span>
            <span style={{fontSize:12,color:T1}}>{p.sold}</span>
            <span style={{fontSize:12.5,fontWeight:600,color:G}}>${p.profit.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ══ 6. SIMULATION ══
  const runSim=()=>{
    const b=parseFloat(sim.buy)||0,s=parseFloat(sim.sell)||0,a=parseFloat(sim.ad)||0,sh=parseFloat(sim.ship)||0,r=parseFloat(sim.ret)/100||0;
    if(!b||!s)return;
    const calc=rate=>Math.round((s-b-sh)*rate-a-b*r*rate);
    setSimR({best:calc(.80),exp:calc(.60),worst:calc(.40),margin:Math.round(((s-b-a-sh)/s)*100),roi:Math.round(((s-b-a-sh)/b)*100),be:Math.round(((a+sh)/(s-b))*100)});
  };
  const Simulation=(
    <div style={{...P,maxWidth:800}}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Profit Simulation</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Never launch a campaign without knowing your real numbers.</div></div>
      <div style={card({padding:"18px 20px"})}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          {[{l:"Buy Price ($)",k:"buy",p:"85"},{l:"Sell Price ($)",k:"sell",p:"220"},{l:"Ad Cost / order ($)",k:"ad",p:"42"},{l:"Shipping Cost ($)",k:"ship",p:"25"}].map(f=>(
            <div key={f.k}>
              <div style={{fontSize:10.5,fontWeight:500,color:T3,marginBottom:5}}>{f.l}</div>
              <input type="number" value={sim[f.k]} onChange={e=>setSim(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={inp} onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor=BD}/>
            </div>
          ))}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:T3,marginBottom:5}}><span>Expected Return Rate</span><span style={{color:G,fontWeight:500}}>{sim.ret}%</span></div>
          <input type="range" min="0" max="50" value={sim.ret} onChange={e=>setSim(p=>({...p,ret:e.target.value}))} style={{width:"100%",accentColor:G}}/>
        </div>
        <button onClick={runSim} style={{width:"100%",padding:"11px",borderRadius:9,background:`linear-gradient(135deg,${G},#6366f1)`,border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",boxShadow:`0 4px 14px rgba(16,185,129,0.2)`}}>Calculate Profit Scenarios →</button>
      </div>
      {simR&&(
        <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[{l:"Best Case (80%)",v:simR.best,c:G,i:"✓"},{l:"Expected (60%)",v:simR.exp,c:AM,i:"~"},{l:"Worst Case (40%)",v:simR.worst,c:RD,i:"✗"}].map((s,i)=>(
              <div key={i} style={{...card({padding:"16px"}),background:`${s.c}0a`,borderColor:`${s.c}25`,textAlign:"center"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:`${s.c}18`,border:`1px solid ${s.c}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:s.c,margin:"0 auto 10px",fontWeight:600}}>{s.i}</div>
                <div style={{fontSize:11,color:s.c,fontWeight:500,marginBottom:4}}>{s.l}</div>
                <div style={{fontSize:26,fontWeight:700,color:s.v>0?s.c:RD,letterSpacing:"-.5px"}}>{s.v>0?`+$${s.v}`:`$${s.v}`}</div>
                <div style={{fontSize:10,color:T3,marginTop:3}}>profit / order</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
            {[{l:"Profit Margin",v:`${simR.margin}%`,c:simR.margin>30?G:AM},{l:"ROI",v:`${simR.roi}%`,c:simR.roi>50?G:AM},{l:"Breakeven Rate",v:`${simR.be}% conf.`,c:T1}].map((s,i)=>(
              <div key={i} style={{...card({padding:"12px 16px"}),display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:11,color:T3}}>{s.l}</span>
                <span style={{fontSize:15,fontWeight:600,color:s.c}}>{s.v}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // ══ 7. SHIPPING ══
  const Shipping=(
    <div style={P}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:15,fontWeight:600,color:T1}}>Shipping Management</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>{ship.filter(s=>s.status==="in_transit").length} shipments in transit</div></div><button onClick={()=>notify("Connect courier — coming soon")} style={{padding:"8px 16px",borderRadius:8,background:"transparent",border:`1px solid ${BD}`,color:T2,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>+ Connect Courier</button></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
        {[{l:"Total",v:ship.length,c:T2},{l:"In Transit",v:ship.filter(s=>s.status==="in_transit").length,c:AM},{l:"Delivered",v:ship.filter(s=>s.status==="delivered").length,c:G},{l:"Pending",v:ship.filter(s=>s.status==="pending").length,c:PR}].map((s,i)=>(<div key={i} style={{...card({padding:"12px 14px"}),textAlign:"center"}}><div style={{fontSize:18,fontWeight:600,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:T3,marginTop:1}}>{s.l}</div></div>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {ship.map((s,i)=>(
          <div key={i} style={{...card({padding:"12px 16px"}),display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:9}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><span style={{fontSize:10.5,color:G,fontFamily:"monospace"}}>{s.orderId}</span><span style={{fontSize:12,fontWeight:500,color:T1}}>{s.product}</span></div>
              <div style={{display:"flex",gap:10,fontSize:11,color:T2,flexWrap:"wrap"}}><span>👤 {s.client}</span><span>📍 {s.city}</span><span>📦 {s.company}</span><span style={{fontFamily:"monospace",color:PR,fontSize:10}}>{s.track}</span><span>💰 ${s.cost}</span></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:10.5,color:T3}}>{s.date}</span><Bdg s={s.status} map={SHIP_MAP}/><button onClick={()=>notify(`Tracking ${s.track}`)} style={{padding:"5px 10px",borderRadius:7,background:GB,border:`1px solid ${G}28`,color:G,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500}}>Track</button></div>
          </div>
        ))}
      </div>
      <div style={card({padding:"14px 16px"})}>
        <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:10}}>Connected couriers</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["Aramex","DHL","Bosta","Maystro"].map(c=>(<div key={c} style={{padding:"5px 13px",borderRadius:7,background:GB2,border:`1px solid ${G}25`,fontSize:11.5,fontWeight:500,color:G}}>● {c}</div>))}
          <div style={{padding:"5px 13px",borderRadius:7,background:CARD2,border:`1px solid ${BD}`,fontSize:11.5,color:T3}}>Manual</div>
        </div>
      </div>
    </div>
  );

  // ══ 8. RETURNS ══
  const Returns=(
    <div style={P}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Returns Management</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Current rate: <span style={{color:stats.returnRate>20?RD:G,fontWeight:500}}>{stats.returnRate}%</span></div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
        {[{l:"Approved",v:rets.filter(r=>r.status==="approved").length,c:G},{l:"Reviewing",v:rets.filter(r=>r.status==="pending").length,c:AM},{l:"Rejected",v:rets.filter(r=>r.status==="rejected").length,c:RD}].map((s,i)=>(<div key={i} style={{...card({padding:"12px 14px"}),textAlign:"center"}}><div style={{fontSize:18,fontWeight:600,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:T3,marginTop:1}}>{s.l}</div></div>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {rets.map((r,i)=>(
          <div key={i} style={{...card({padding:"12px 16px"}),display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:9}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><span style={{fontSize:10.5,color:PR,fontFamily:"monospace"}}>{r.id}</span><span style={{fontSize:12,fontWeight:500,color:T1}}>{r.product}</span></div>
              <div style={{display:"flex",gap:10,fontSize:11,color:T2,flexWrap:"wrap"}}><span>👤 {r.client}</span><span>📅 {r.date}</span><span>📍 {r.city}</span><span style={{color:AM}}>Reason: {r.reason}</span></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              {r.status!=="rejected"&&<span style={{fontSize:13,fontWeight:600,color:RD}}>-${r.refund}</span>}
              <Bdg s={r.status} map={RET_MAP}/>
              {r.status==="pending"&&<div style={{display:"flex",gap:5}}>
                <button onClick={()=>notify(`${r.id} approved ✓`)} style={{padding:"5px 10px",borderRadius:7,background:GB,border:`1px solid ${G}28`,color:G,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500}}>Approve</button>
                <button onClick={()=>notify(`${r.id} rejected`,"err")} style={{padding:"5px 10px",borderRadius:7,background:RDB,border:`1px solid ${RD}28`,color:RD,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500}}>Reject</button>
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ══ 9. DROPSHEET ══
  const Dropsheet=(
    <div style={P}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Drop Sheet</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Ready-to-sell products from verified suppliers</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
        {drops.map((d,i)=>(
          <div key={i} style={{...card({padding:"16px"}),opacity:d.available?1:.55,transition:"border-color .2s"}} onMouseEnter={e=>{if(d.available)e.currentTarget.style.borderColor=G+"60";}} onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div><div style={{fontSize:13,fontWeight:600,color:T1,marginBottom:2}}>{d.product}</div><div style={{fontSize:10.5,color:T3}}>{d.supplier} · {d.cat}</div></div>
              <Bdg s={d.available?"confirmed":"cancelled"} map={{confirmed:{label:"Available",color:G,bg:GB},cancelled:{label:"Unavailable",color:RD,bg:RDB}}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:10}}>
              {[{l:"Buy",v:`$${d.buy}`,c:T1},{l:"Sell",v:`$${d.sell}`,c:G},{l:"Shipping",v:d.shipping,c:T3},{l:"Min. order",v:`${d.minOrder} pcs`,c:T3}].map((s,j)=>(
                <div key={j} style={{padding:"7px 10px",borderRadius:7,background:CARD2}}><div style={{fontSize:9,color:T4,marginBottom:1}}>{s.l}</div><div style={{fontSize:12,fontWeight:500,color:s.c}}>{s.v}</div></div>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",gap:1}}>{Array.from({length:5}).map((_,j)=><span key={j} style={{color:j<Math.floor(d.rating)?AM:"rgba(255,255,255,0.1)",fontSize:10}}>★</span>)}</div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>d.available?notify(`"${d.product}" added ✓`):null} disabled={!d.available} style={{padding:"5px 10px",borderRadius:7,background:d.available?GB:"transparent",border:`1px solid ${d.available?G+"28":BD}`,color:d.available?G:T3,cursor:d.available?"pointer":"not-allowed",fontSize:11,fontWeight:500,fontFamily:"inherit"}}>+ Add</button>
                <button onClick={()=>{setTab("simulation");setSim({buy:String(d.buy),sell:String(d.sell),ad:"",ship:"15",ret:"20"});}} style={{padding:"5px 10px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T2,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>Simulate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ══ 10. STORES ══
  const Stores=(
    <div style={P}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:15,fontWeight:600,color:T1}}>{stores.length} Connected Stores</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Orders sync automatically in real-time</div></div><button onClick={()=>notify("Connect store — coming soon")} style={{padding:"8px 16px",borderRadius:8,background:G,border:"none",color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer"}}>+ Connect Store</button></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
        {stores.map((s,i)=>(
          <div key={i} style={{...card({padding:"18px"}),transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=G+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:13}}>
              <span style={{fontSize:26}}>{s.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:13.5,fontWeight:600,color:T1}}>{s.name}</div><div style={{fontSize:10.5,color:T3}}>{s.platform}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:G,background:GB2,padding:"3px 9px",borderRadius:20,border:`1px solid ${G}25`}}><div style={{width:5,height:5,borderRadius:"50%",background:G}}/>Live</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:11}}>
              <div style={{padding:"9px",borderRadius:8,background:CARD2,textAlign:"center"}}><div style={{fontSize:16,fontWeight:600,color:T1}}>{s.orders}</div><div style={{fontSize:9,color:T3}}>Orders</div></div>
              <div style={{padding:"9px",borderRadius:8,background:CARD2,textAlign:"center"}}><div style={{fontSize:16,fontWeight:600,color:G}}>${(s.revenue/1000).toFixed(1)}K</div><div style={{fontSize:9,color:T3}}>Revenue</div></div>
            </div>
            <div style={{fontSize:9.5,color:T3,fontFamily:"monospace",padding:"6px 10px",borderRadius:7,background:"rgba(255,255,255,0.02)",border:`1px solid ${BD}`,marginBottom:10}}>{s.api}</div>
            <div style={{display:"flex",gap:7}}>
              <button style={{flex:1,padding:"7px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T2,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>⚙ Settings</button>
              <button onClick={()=>notify(`${s.name} disconnected`,"err")} style={{flex:1,padding:"7px",borderRadius:7,background:RDB,border:`1px solid ${RD}20`,color:RD,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>Disconnect</button>
            </div>
          </div>
        ))}
        <div style={{background:"transparent",border:`1px dashed ${BD}`,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:9,cursor:"pointer",minHeight:190,transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=G+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
          <div style={{fontSize:24,color:T3}}>+</div>
          <div style={{fontSize:12,fontWeight:500,color:T3}}>Connect New Store</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center"}}>
            {["Shopify","YouCan","WooCommerce","Salla"].map(p=>(<span key={p} style={{fontSize:9,padding:"2px 6px",borderRadius:5,background:CARD2,color:T3}}>{p}</span>))}
          </div>
        </div>
      </div>
    </div>
  );

  // ══ 11. SUBSCRIPTION ══
  const Subscription=(
    <div style={P}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Subscription</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Current plan: <span style={{color:G,fontWeight:500}}>Pro — $59.99/month</span> · Renews April 15, 2025</div></div>
      <div style={{...card({padding:"18px 20px"}),background:GB2,borderColor:`${G}30`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:14,fontWeight:600,color:T1}}>Pro Plan</span>
          <span style={{fontSize:24,fontWeight:700,color:G,letterSpacing:"-.5px"}}>$59.99<span style={{fontSize:11,color:T3,fontWeight:400}}>/mo</span></span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{l:"Orders",v:"4,233 / 5,000",p:85,c:AM},{l:"Team members",v:"6 / 10",p:60,c:G},{l:"Connected stores",v:"3 / 5",p:60,c:G}].map((it,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"10px"}}>
              <div style={{fontSize:10,color:T3,marginBottom:4}}>{it.l}</div>
              <div style={{fontSize:12,fontWeight:500,color:T1,marginBottom:5}}>{it.v}</div>
              <Pbar v={it.p} color={it.c} h={4}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {[{n:"Starter",p:"29.99",c:"#64748b",f:["1,000 orders","3 agents","1 store"],curr:false},{n:"Pro",p:"59.99",c:G,f:["5,000 orders","10 agents","5 stores","Auto SMS","Reports"],curr:true},{n:"Business",p:"99.99",c:PR,f:["Unlimited orders","Unlimited team","Unlimited stores","Full API","White-label"],curr:false}].map((pl,i)=>(
          <div key={i} style={{...card({padding:"16px"}),background:pl.curr?`${pl.c}0a`:CARD,borderColor:pl.curr?`${pl.c}40`:BD,position:"relative"}}>
            {pl.curr&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:pl.c,color:"#fff",borderRadius:20,padding:"2px 12px",fontSize:10,fontWeight:600,whiteSpace:"nowrap"}}>Current ✓</div>}
            <div style={{fontSize:10,color:pl.c,fontWeight:500,letterSpacing:".5px",marginBottom:5}}>{pl.n.toUpperCase()}</div>
            <div style={{fontSize:24,fontWeight:700,color:pl.c,letterSpacing:"-.5px",marginBottom:12}}>${pl.p}<span style={{fontSize:10,color:T3,fontWeight:400}}>/mo</span></div>
            <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
              {pl.f.map((f,j)=>(<li key={j} style={{display:"flex",gap:6,fontSize:11,color:T2}}><span style={{color:pl.c,fontSize:9,fontWeight:600,marginTop:1}}>✓</span>{f}</li>))}
            </ul>
            <button onClick={()=>{if(!pl.curr)notify("Redirecting to payment...");}} style={{width:"100%",padding:"9px",borderRadius:8,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",background:pl.curr?"transparent":pl.c,color:pl.curr?pl.c:"#fff",border:pl.curr?`1px solid ${pl.c}40`:"none"}}>
              {pl.curr?"Current plan":"Upgrade"}
            </button>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={card({padding:"16px"})}>
          <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:12}}>Payment method</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
            <div style={{width:36,height:24,borderRadius:5,background:`linear-gradient(135deg,${G},#6366f1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>VISA</div>
            <div><div style={{fontSize:12,color:T1}}>•••• •••• •••• 4821</div><div style={{fontSize:10,color:T3}}>Expires 09/27</div></div>
          </div>
          <button style={{padding:"6px 13px",borderRadius:7,background:"transparent",border:`1px solid ${BD}`,color:T2,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>Update card</button>
        </div>
        <div style={card({padding:"16px"})}>
          <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:12}}>Recent invoices</div>
          {[{d:"March 2025",a:"$59.99"},{d:"February 2025",a:"$59.99"},{d:"January 2025",a:"$59.99"}].map((inv,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<2?`1px solid ${BD}`:"none"}}>
              <span style={{fontSize:11,color:T2}}>{inv.d}</span>
              <span style={{fontSize:12,fontWeight:500,color:T1}}>{inv.a}</span>
              <span style={{fontSize:10,color:G,background:GB,padding:"2px 7px",borderRadius:10}}>Paid</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ 12. SUPPORT ══
  const Support=(
    <div style={{...P,maxWidth:680}}>
      <div><div style={{fontSize:15,fontWeight:600,color:T1}}>Support</div><div style={{fontSize:11.5,color:T3,marginTop:2}}>Available 24/7</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{i:"💬",l:"WhatsApp",s:"Reply in minutes",c:G},{i:"📧",l:"Email",s:"support@umcem.io",c:PR},{i:"📞",l:"Call",s:"+212 600 000 000",c:AM}].map((c,i)=>(
          <button key={i} onClick={()=>notify(`Opening ${c.l}...`)} style={{...card({padding:"14px"}),cursor:"pointer",textAlign:"center",transition:"border-color .2s",fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.borderColor=c.c+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
            <div style={{fontSize:22,marginBottom:6}}>{c.i}</div>
            <div style={{fontSize:12.5,fontWeight:500,color:T1}}>{c.l}</div>
            <div style={{fontSize:10,color:T3,marginTop:2}}>{c.s}</div>
          </button>
        ))}
      </div>
      {!supSent?(
        <div style={card({padding:"18px 20px"})}>
          <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:14}}>Send a message</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div><div style={{fontSize:10.5,color:T3,marginBottom:5}}>Subject</div><input value={supMsg.sub} onChange={e=>setSupMsg(p=>({...p,sub:e.target.value}))} placeholder="What's your question?" style={inp} onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor=BD}/></div>
            <div><div style={{fontSize:10.5,color:T3,marginBottom:5}}>Message</div><textarea value={supMsg.msg} onChange={e=>setSupMsg(p=>({...p,msg:e.target.value}))} placeholder="Describe your issue..." rows={4} style={{...inp,resize:"vertical",minHeight:90}} onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor=BD}/></div>
            <button onClick={()=>{if(!supMsg.sub||!supMsg.msg)return;setSupSent(true);}} style={{padding:"10px",borderRadius:8,background:`linear-gradient(135deg,${G},#6366f1)`,border:"none",color:"#fff",fontSize:12.5,fontWeight:500,cursor:"pointer"}}>Send Message →</button>
          </div>
        </div>
      ):(
        <div style={{...card({padding:"28px"}),background:GB2,borderColor:`${G}30`,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:10}}>✓</div>
          <div style={{fontSize:14,fontWeight:600,color:T1,marginBottom:6}}>Message sent!</div>
          <div style={{fontSize:12,color:T2,marginBottom:14}}>We'll reply within 24 hours.</div>
          <button onClick={()=>{setSupSent(false);setSupMsg({sub:"",msg:""}); }} style={{padding:"8px 18px",borderRadius:7,background:"transparent",border:`1px solid ${G}50`,color:G,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>New message</button>
        </div>
      )}
    </div>
  );

  // ══ 13. SETTINGS ══
  const Settings=(
    <div style={{...P,maxWidth:680}}>
      <div style={{fontSize:15,fontWeight:600,color:T1}}>Settings</div>
      <div style={card({padding:"18px 20px"})}>
        <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:14}}>Account information</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{l:"Business name",k:"name"},{l:"Email",k:"email"},{l:"Phone",k:"phone"}].map(f=>(
            <div key={f.k}><div style={{fontSize:10.5,color:T3,marginBottom:5}}>{f.l}</div><input value={cfg[f.k]} onChange={e=>setCfg(p=>({...p,[f.k]:e.target.value}))} style={inp} onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor=BD}/></div>
          ))}
          <div><div style={{fontSize:10.5,color:T3,marginBottom:5}}>Currency</div><select value={cfg.currency} onChange={e=>setCfg(p=>({...p,currency:e.target.value}))} style={{...inp,cursor:"pointer"}}>{["USD","EUR","GBP","LYD","MAD","DZD","EGP"].map(c=><option key={c} value={c} style={{background:"#1a2235"}}>{c}</option>)}</select></div>
        </div>
      </div>
      <div style={card({padding:"18px 20px"})}>
        <div style={{fontSize:12.5,fontWeight:600,color:T1,marginBottom:14}}>Preferences</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[{l:"In-app notifications",k:"notif"},{l:"SMS alerts",k:"sms"},{l:"Email reports",k:"email_rep"}].map(s=>(
            <div key={s.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderRadius:8,background:CARD2}}>
              <span style={{fontSize:12.5,color:T1}}>{s.l}</span>
              <button onClick={()=>setCfg(p=>({...p,[s.k]:!p[s.k]}))} style={{width:40,height:22,borderRadius:11,background:cfg[s.k]?G:`rgba(255,255,255,0.08)`,border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}>
                <div style={{position:"absolute",top:3,left:cfg[s.k]?"calc(100% - 19px)":3,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.4)"}}/>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:9}}>
        <button onClick={()=>notify("Settings saved ✓")} style={{flex:1,padding:"10px",borderRadius:8,background:G,border:"none",color:"#fff",fontSize:12.5,fontWeight:500,cursor:"pointer"}}>Save changes</button>
        <button onClick={()=>notify("Signing out...","err")} style={{padding:"10px 18px",borderRadius:8,background:RDB,border:`1px solid ${RD}25`,color:RD,fontSize:12.5,cursor:"pointer",fontFamily:"inherit"}}>Sign out</button>
      </div>
    </div>
  );

  const TABS={overview:Overview,orders:Orders,confirmations:Confirmations,team:Team,products:Products,simulation:Simulation,shipping:Shipping,returns:Returns,dropsheet:Dropsheet,stores:Stores,subscription:Subscription,support:Support,settings:Settings};

  return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:BG,color:T1,minHeight:"100vh",display:"flex"}}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:toast.type==="err"?`rgba(239,68,68,0.95)`:`rgba(16,185,129,0.95)`,color:"#fff",padding:"10px 20px",borderRadius:9,fontSize:12,fontWeight:500,zIndex:9999,boxShadow:"0 8px 20px rgba(0,0,0,.4)",whiteSpace:"nowrap",animation:"sd .25s ease"}}>{toast.msg}</div>}

      {Sidebar}

      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden"}}>
        {Topbar}
        <div style={{flex:1,overflowY:"auto"}}>{TABS[tab]||Overview}</div>
      </div>

      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#1f2d45;border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
        @keyframes sd{from{opacity:0;transform:translate(-50%,-8px);}to{opacity:1;transform:translate(-50%,0);}}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input::placeholder,textarea::placeholder{color:#2d3f58;}
        details summary::-webkit-details-marker{display:none;}
        select option{background:#111827;color:#f8fafc;}
      `}</style>
    </div>
  );
}
