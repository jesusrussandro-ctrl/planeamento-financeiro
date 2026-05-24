from http.server import BaseHTTPRequestHandler

HTML = r"""
<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Planeamento Financeiro</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root{
      --navy:#061b3a; --navy2:#092653; --blue:#1f66ff; --green:#2ca02c;
      --purple:#6d28d9; --orange:#f97316; --red:#ef4444; --bg:#eef5ff;
      --card:#fff; --line:#dbe4f0; --text:#0f172a; --muted:#64748b;
    }
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter,Segoe UI,Aptos,Arial,sans-serif;background:linear-gradient(135deg,#dceeff,#f8fbff);color:var(--text)}
    .app{min-height:100vh;display:grid;grid-template-columns:230px 1fr}
    aside{background:linear-gradient(180deg,#061b3a,#031125);color:white;padding:18px 14px;display:flex;flex-direction:column;gap:16px}
    .brand{text-align:center}.brand .logo{font-size:46px}.brand h1{font-size:27px;line-height:1.03;margin:8px 0 4px}.brand p{font-size:12px;text-transform:uppercase;opacity:.85}
    .month{border:1px solid rgba(255,255,255,.2);background:#082d5b;color:white;border-radius:14px;padding:11px;font-weight:800}
    nav{display:grid;gap:7px}nav button{border:0;background:transparent;color:white;text-align:left;padding:11px 14px;border-radius:12px;font-weight:700}nav button.active{background:linear-gradient(90deg,#1484ff,#0958e8)}
    .health,.tip{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.05);border-radius:18px;padding:16px}.health h3{margin:0 0 12px;color:#9ef01a;text-align:center}
    .score{width:112px;height:112px;border-radius:50%;margin:auto;display:grid;place-items:center;background:conic-gradient(#55d645 0 85%,rgba(255,255,255,.14) 85% 100%)}.score div{background:#061b3a;width:76px;height:76px;border-radius:50%;display:grid;place-items:center;font-size:30px;font-weight:900}.health strong{display:block;text-align:center;margin:10px 0;background:#1c9b4a;padding:6px;border-radius:999px}.health p,.tip p{font-size:13px}.tip b{color:#ffb703}
    main{padding:10px;display:grid;gap:10px}.top{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.kpi,.card{background:rgba(255,255,255,.96);border-radius:15px;box-shadow:0 6px 20px rgba(15,23,42,.09);border:1px solid rgba(15,23,42,.08);overflow:hidden}
    .kpi{padding:17px;display:flex;gap:14px;align-items:center}.kpi .icon{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;font-size:28px}.kpi p{margin:0;font-size:12px;text-transform:uppercase;font-weight:900}.kpi h2{margin:7px 0 2px;font-size:24px}.kpi span{font-size:12px;font-weight:700;color:var(--muted)}
    .green .icon{background:#dcfce7}.blue .icon{background:#dbeafe}.red .icon{background:#fee2e2}.purple .icon{background:#ede9fe}.orange .icon{background:#ffedd5}
    .title{padding:10px 13px;font-weight:900;text-transform:uppercase;font-size:14px;border-bottom:1px solid var(--line);background:linear-gradient(90deg,#e0edff,#fff);color:#063a91}.card.green .title{background:linear-gradient(90deg,#e3f8dc,#fff);color:#166534}.card.purple .title{background:linear-gradient(90deg,#ede9fe,#fff);color:#4c1d95}.card.orange .title{background:linear-gradient(90deg,#ffedd5,#fff);color:#c2410c}.card.red .title{background:linear-gradient(90deg,#fee2e2,#fff);color:#b91c1c}
    .settings{display:grid;grid-template-columns:270px 1fr;gap:10px}.settings label{display:block;margin:12px 13px 7px;font-size:12px;color:var(--muted);font-weight:800}select{margin:0 13px 12px;width:calc(100% - 26px);padding:10px;border:1px solid var(--line);border-radius:10px;font-weight:800;background:white}
    .row{display:flex;justify-content:space-between;padding:8px 13px;border-bottom:1px solid #eef2f7}.highlight{background:#effbea;font-weight:900}
    .charts{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:10px}.tables{display:grid;grid-template-columns:1.05fr 1.45fr 1.45fr 1.45fr;gap:10px}.bottom{display:grid;grid-template-columns:1fr 2fr 1fr 1fr 1fr;gap:10px}.wide{grid-column:span 2}
    table{width:100%;border-collapse:collapse;font-size:12px}th,td{padding:9px 10px;border-bottom:1px solid #edf2f7;text-align:left}th{background:#f8fafc;font-size:11px;color:#334155}
    .progress{height:9px;background:#e5e7eb;border-radius:999px;overflow:hidden;min-width:70px}.fill{height:100%;border-radius:999px;background:var(--green)}.fill.red{background:var(--red)}.fill.orange{background:var(--orange)}.fill.purple{background:var(--purple)}
    .pill{padding:4px 8px;border-radius:999px;font-weight:900;font-size:11px}.Alta{background:#fee2e2;color:#dc2626}.Média{background:#ffedd5;color:#ea580c}.Baixa{background:#dcfce7;color:#16a34a}
    canvas{padding:12px}.sim{padding:14px}.sim .box{display:flex;justify-content:space-between;background:#f0fdf4;padding:11px;border-radius:10px}.big{margin-top:15px;background:#f5f3ff;border-radius:15px;text-align:center;padding:18px;font-size:48px;font-weight:900;color:var(--purple)}.big span{font-size:16px;margin-left:8px;text-transform:uppercase}
    .goal,.payment,.alert{margin:10px 12px;padding-bottom:9px;border-bottom:1px solid #f1f5f9}.goal{display:grid;grid-template-columns:1fr 120px 40px;gap:8px;align-items:center}.goal span{display:block;color:var(--muted);font-size:12px}.payment{display:grid;grid-template-columns:1fr auto auto;gap:10px}.payment em{font-style:normal;background:#fee2e2;color:#dc2626;padding:4px 7px;border-radius:999px;font-size:11px;font-weight:900}.alert{display:flex;gap:8px;border-radius:12px;padding:11px;background:#fff7ed}.alert.ok{background:#f0fdf4}.alert strong{display:block}.alert span{font-size:12px;color:#334155}
    @media(max-width:1300px){.app{grid-template-columns:1fr}aside{display:none}.top{grid-template-columns:repeat(2,1fr)}.charts,.tables,.bottom,.settings{grid-template-columns:1fr}.wide{grid-column:span 1}}
  </style>
</head>
<body>
<div class="app">
  <aside>
    <div class="brand"><div class="logo">📈€</div><h1>Planeamento Financeiro</h1><p>Controlo Financeiro Familiar</p></div>
    <button class="month">📅 Maio 2024</button>
    <nav><button class="active">🏠 Resumo</button><button>💶 Rendimentos</button><button>🧾 Despesas</button><button>💳 Dívidas</button><button>🎯 Objetivos</button><button>📆 Calendário</button><button>📊 Simulador</button><button>⚙️ Definições</button></nav>
    <div class="health"><h3>Saúde Financeira</h3><div class="score"><div id="score">85</div></div><strong id="scoreLabel">Excelente</strong><p>Orçamento 80/100</p><p>Poupança 90/100</p><p>Dívidas 70/100</p></div>
    <div class="tip"><b>Dica do mês</b><p>Revê as despesas variáveis e mantém uma reserva antes de acelerar o pagamento das dívidas.</p></div>
  </aside>
  <main>
    <section class="top" id="kpis"></section>
    <section class="settings">
      <div class="card"><div class="title">Definições</div><label>Moeda</label><select id="moeda"></select></div>
      <div class="card green"><div class="title">Resumo Financeiro</div><div id="resumo"></div></div>
    </section>
    <section class="charts">
      <div class="card"><div class="title">Orçamentado vs Realizado (Despesas)</div><canvas id="bar"></canvas></div>
      <div class="card purple"><div class="title">Distribuição das Despesas</div><canvas id="pie1"></canvas></div>
      <div class="card orange"><div class="title">Distribuição da Renda</div><canvas id="pie2"></canvas></div>
    </section>
    <section class="tables">
      <div class="card green"><div class="title">Rendimentos</div><table id="rendimentos"></table></div>
      <div class="card"><div class="title">Despesas Mensais</div><table id="despesas"></table></div>
      <div class="card purple"><div class="title">Dívidas</div><table id="dividas"></table></div>
      <div class="card green"><div class="title">Pagamento Ideal das Dívidas</div><table id="pagamentoIdeal"></table></div>
    </section>
    <section class="bottom">
      <div class="card purple"><div class="title">Simulador: quanto tempo para ficar sem dívidas?</div><div id="sim" class="sim"></div></div>
      <div class="card wide"><div class="title">Evolução da Dívida ao Longo dos Meses</div><canvas id="line"></canvas></div>
      <div class="card orange"><div class="title">Objetivos Financeiros</div><div id="objetivos"></div></div>
      <div class="card orange"><div class="title">Próximos Pagamentos</div><div id="pagamentos"></div></div>
      <div class="card red"><div class="title">Alertas e Conselhos</div><div id="alertas"></div></div>
    </section>
  </main>
</div>
<script>
const API="/api/backend";
let charts=[];
const moedas=[
  ["EUR","Euro","€"],["USD","Dólar","$"],["BRL","Real","R$"],["GBP","Libra","£"],["AOA","Kwanza","Kz"],["AED","Dirham","د.إ"]
];
function dinheiro(v,s){return `${s} ${Number(v||0).toLocaleString("pt-PT",{minimumFractionDigits:2,maximumFractionDigits:2})}`}
function progress(v,c=""){return `<div class="progress"><div class="fill ${c}" style="width:${Math.min(v,100)}%"></div></div>`}
function table(id,heads,rows){document.getElementById(id).innerHTML=`<thead><tr>${heads.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`}
async function carregar(){
 const r=await fetch(API); const d=await r.json(); const s=d.moeda.simbolo;
 document.getElementById("moeda").innerHTML=moedas.map(m=>`<option value="${m[0]}" ${m[0]===d.moeda.codigo?"selected":""}>${m[0]} - ${m[1]} (${m[2]})</option>`).join("");
 document.getElementById("moeda").onchange=async e=>{await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({moedaCodigo:e.target.value})});carregar();}
 document.getElementById("score").innerHTML=`${d.resumo.indice}<small>/100</small>`;
 document.getElementById("scoreLabel").textContent=d.resumo.indice>=80?"Excelente":d.resumo.indice>=60?"Estável":"Crítico";
 document.getElementById("kpis").innerHTML=[
  ["Índice de Saúde Financeira",`${d.resumo.indice}/100`,"Excelente","✅","green"],
  ["Salário Líquido",dinheiro(d.salarioLiquido,s),"100% do rendimento","💼","blue"],
  ["Total Despesas",dinheiro(d.resumo.totalDespesas,s),`${d.resumo.salarioComprometido}% comprometido`,"🧾","red"],
  ["Disponível p/ Dívidas",dinheiro(d.resumo.disponivelDividas,s),"Após despesas e reserva","💰","green"],
  ["Total Dívidas",dinheiro(d.resumo.totalDividas,s),`Mínimo mensal: ${dinheiro(d.resumo.totalMinimoDividas,s)}`,"🏦","purple"],
  ["Dias Restantes","17","até 31/05/2024","📅","orange"]
 ].map(k=>`<div class="kpi ${k[4]}"><div class="icon">${k[3]}</div><div><p>${k[0]}</p><h2>${k[1]}</h2><span>${k[2]}</span></div></div>`).join("");
 document.getElementById("resumo").innerHTML=[
  ["Salário líquido",d.salarioLiquido],["Total despesas",d.resumo.totalDespesas],["Total dívidas",d.resumo.totalDividas],["Disponível para dívidas",d.resumo.disponivelDividas]
 ].map((x,i)=>`<div class="row ${i===3?"highlight":""}"><span>${x[0]}</span><b>${dinheiro(x[1],s)}</b></div>`).join("");
 table("rendimentos",["Fonte","Orçamentado","Recebido"],[
  ["Salário Principal",dinheiro(d.salarioLiquido,s),dinheiro(d.salarioLiquido,s)],
  ["Trabalho Extra / Freelance",dinheiro(0,s),dinheiro(0,s)],
  ["Investimentos",dinheiro(0,s),dinheiro(0,s)],
  ["Outros Rendimentos",dinheiro(0,s),dinheiro(0,s)]
 ]);
 table("despesas",["Categoria","Orçamentado","Realizado","%"],d.despesas.map(x=>[x.categoria,dinheiro(x.orcamentado,s),dinheiro(x.realizado,s),`${((x.realizado/d.salarioLiquido)*100).toFixed(1)}%`]));
 table("dividas",["Credor","Saldo","Progresso","Juros","Prioridade"],d.dividas.map(x=>[x.credor,dinheiro(x.saldo,s),progress(x.progresso,x.prioridade==="Alta"?"red":x.prioridade==="Média"?"orange":"green"),`${x.juros}%`,`<span class="pill ${x.prioridade}">${x.prioridade}</span>`]));
 table("pagamentoIdeal",["Credor","Pagamento ideal","%","Tempo"],d.resumo.pagamentoIdeal.map(x=>[x.credor,dinheiro(x.pagamentoIdeal,s),`${x.percentagemDisponivel}%`,`${x.tempoEstimado} meses`]));
 document.getElementById("sim").innerHTML=`<div class="box"><span>Valor disponível mensal</span><b>${dinheiro(d.resumo.disponivelDividas,s)}</b></div><div class="big">${d.resumo.mesesSemDivida}<span>meses</span></div><p>Estratégia recomendada: <b>Avalanche</b></p>`;
 document.getElementById("objetivos").innerHTML=d.objetivos.map(o=>{const p=Math.round(o.atual/o.objetivo*100);return `<div class="goal"><div><b>${o.nome}</b><span>${dinheiro(o.atual,s)} / ${dinheiro(o.objetivo,s)}</span></div>${progress(p,p>=70?"green":p>=30?"orange":"purple")}<strong>${p}%</strong></div>`}).join("");
 document.getElementById("pagamentos").innerHTML=d.pagamentos.map(p=>`<div class="payment"><span>${p.nome}</span><b>${dinheiro(p.valor,s)}</b><em>${p.dias} dias</em></div>`).join("");
 document.getElementById("alertas").innerHTML=d.resumo.alertas.map(a=>`<div class="alert ${a.tipo==="Ótimo"?"ok":""}"><b>${a.tipo}</b><span>${a.texto}</span></div>`).join("");
 charts.forEach(c=>c.destroy()); charts=[];
 const cores=["#1f77b4","#2ca02c","#93c45b","#7a4de8","#0077c8","#f5a300"];
 const desp=d.despesas.filter(x=>x.categoria!=="Reserva");
 charts.push(new Chart(document.getElementById("bar"),{type:"bar",data:{labels:desp.map(x=>x.categoria),datasets:[{label:"Orçamentado",data:desp.map(x=>x.orcamentado),backgroundColor:"#1f66ff"},{label:"Realizado",data:desp.map(x=>x.realizado),backgroundColor:"#55a630"}]},options:{indexAxis:"y",responsive:true}}));
 charts.push(new Chart(document.getElementById("pie1"),{type:"doughnut",data:{labels:desp.map(x=>x.categoria),datasets:[{data:desp.map(x=>x.realizado),backgroundColor:cores}]}}));
 charts.push(new Chart(document.getElementById("pie2"),{type:"doughnut",data:{labels:["Despesas","Dívidas","Reserva","Livre"],datasets:[{data:[d.resumo.totalDespesas,d.resumo.disponivelDividas,d.resumo.reserva,0],backgroundColor:["#f97316","#2ca02c","#1f77b4","#93c45b"]}]}}));
 charts.push(new Chart(document.getElementById("line"),{type:"line",data:{labels:d.resumo.evolucaoDivida.slice(0,24).map(x=>`Mês ${x.mes}`),datasets:[{label:"Dívida",data:d.resumo.evolucaoDivida.slice(0,24).map(x=>x.divida),borderColor:"#6d28d9",backgroundColor:"rgba(109,40,217,.14)",fill:true,tension:.35}]},options:{responsive:true}}));
}
carregar();
</script>
</body>
</html>
"""

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(HTML.encode("utf-8"))
