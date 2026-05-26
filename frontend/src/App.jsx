import "./App.css"
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, ComposedChart,
} from "recharts"

const COLORS = ["#0e7490", "#0891b2", "#84cc16", "#7c3aed", "#2563eb", "#f59e0b"]

const rendimentos = [
  ["Salário Principal", "€ 5.000,00", "€ 5.000,00"],
  ["Trabalho Extra / Freelance", "€ -", "€ -"],
  ["Investimentos", "€ -", "€ -"],
  ["Outros Rendimentos", "€ -", "€ -"],
]

const despesas = [
  { name: "Habitação", orcamentado: 950, realizado: 950, percentagem: "19,0%" },
  { name: "Transportes", orcamentado: 400, realizado: 400, percentagem: "8,0%" },
  { name: "Alimentação", orcamentado: 600, realizado: 600, percentagem: "12,0%" },
  { name: "Saúde", orcamentado: 200, realizado: 200, percentagem: "4,0%" },
  { name: "Lazer", orcamentado: 200, realizado: 200, percentagem: "4,0%" },
  { name: "Outros", orcamentado: 350, realizado: 330, percentagem: "6,6%" },
]

const distribuicao = [
  { name: "Habitação", value: 950, percent: "35,8%" },
  { name: "Alimentação", value: 600, percent: "22,6%" },
  { name: "Saúde", value: 420, percent: "15,9%" },
  { name: "Transportes", value: 370, percent: "13,9%" },
  { name: "Lazer", value: 200, percent: "7,5%" },
  { name: "Outros", value: 115, percent: "4,3%" },
]

const renda = [
  { name: "Despesas", value: 53, percent: "53,0%", color: "#f97316" },
  { name: "Dívidas", value: 27, percent: "27,0%", color: "#15803d" },
  { name: "Livre", value: 10, percent: "10,0%", color: "#2563eb" },
  { name: "Reserva", value: 10, percent: "10,0%", color: "#0e7490" },
]

const evolucao = [
  { mes: "Mês 1", divida: 28450, projecao: 26000, sombra: 16000 },
  { mes: "Mês 3", divida: 24500, projecao: 23000, sombra: 12500 },
  { mes: "Mês 5", divida: 21000, projecao: 20000, sombra: 10500 },
  { mes: "Mês 7", divida: 18000, projecao: 17000, sombra: 8500 },
  { mes: "Mês 9", divida: 15000, projecao: 14500, sombra: 7200 },
  { mes: "Mês 11", divida: 12500, projecao: 12000, sombra: 6100 },
  { mes: "Mês 13", divida: 10000, projecao: 9800, sombra: 5200 },
  { mes: "Mês 15", divida: 7500, projecao: 7600, sombra: 4100 },
  { mes: "Mês 17", divida: 5000, projecao: 5400, sombra: 2900 },
  { mes: "Mês 19", divida: 3000, projecao: 3500, sombra: 1800 },
  { mes: "Mês 21", divida: 1500, projecao: 1800, sombra: 800 },
  { mes: "Mês 23", divida: 0, projecao: 0, sombra: 0 },
]

const objetivos = [
  ["💵", "Fundo de Emergência", "Objetivo: € 3.000,00", "€ 2.100,00", 70, "bg-green-500"],
  ["💳", "Quitar Cartão de Crédito", "Objetivo: € 5.000,00", "€ 1.000,00", 20, "bg-orange-500"],
  ["🏠", "Entrada para Casa", "Objetivo: € 15.000,00", "€ 3.750,00", 25, "bg-blue-500"],
  ["🚗", "Nova Viatura", "Objetivo: € 20.000,00", "€ 6.000,00", 30, "bg-purple-500"],
]

const pagamentos = [
  ["01/06", "Habitação", "€ 700,00", "2 dias"],
  ["05/06", "Cartão de Crédito", "€ 500,00", "5 dias"],
  ["07/06", "Luz", "€ 85,00", "7 dias"],
  ["12/06", "Internet", "€ 35,00", "12 dias"],
]

const dividas = [
  ["Cartão de Crédito", "€ 5.000,00", "80%", "8,00%", "Alta"],
  ["Empréstimo Pessoal", "€ 10.000,00", "65%", "3,50%", "Alta"],
  ["Financiamento Auto", "€ 8.000,00", "40%", "1,50%", "Média"],
  ["Crédito Loja", "€ 1.450,00", "15%", "2,90%", "Baixa"],
]

export default function App() {

  React.useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend ligado:", data)
      })
      .catch((err) => {
        console.error("Erro backend:", err)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#0f172a]">
      <Sidebar />

      <div className="ml-[242px] p-4 grid grid-cols-[1fr_286px] gap-4">
        <main className="space-y-4">
          <section className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr_1fr] gap-3">
            <HealthCard />
            <KpiCard icon="💼" title="Salário Líquido" value="€ 5.000,00" accent="blue" showBar />
            <KpiCard icon="🧾" title="Total Despesas" value="€ 2.650,00" subtitle="53,0% do salário" accent="red" />
            <KpiCard icon="💸" title="Disponível p/ Dívidas" value="€ 1.350,00" subtitle="27,0% do salário" accent="green" green />
            <KpiCard icon="🏦" title="Total Dívidas" value="€ 28.450,00" subtitle="Min. mensal: € 950,00" accent="purple" />
            <KpiCard icon="🗓️" title="Dias Restantes" value="17" subtitle="até 31/05/2024" accent="orange" />
          </section>

          <section className="grid grid-cols-[1.2fr_1fr_1fr] gap-4">
            <ChartBox title="Orçamentado vs Realizado (Despesas)">
              <div className="flex justify-center gap-5 text-[10px] font-bold mb-1">
                <span className="text-blue-700">■ Orçamentado</span>
                <span className="text-green-600">■ Realizado</span>
              </div>

              <ResponsiveContainer width="100%" height={205}>
                <BarChart data={despesas} layout="vertical" barGap={2}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" width={86} tick={{ fontSize: 11, fontWeight: 700 }} />
                  <Tooltip />
                  <Bar dataKey="orcamentado" fill="#2563eb" radius={5} barSize={9} />
                  <Bar dataKey="realizado" fill="#22c55e" radius={5} barSize={9} />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Distribuição das Despesas">
              <div className="grid grid-cols-[1fr_120px] items-center">
                <div className="relative h-[210px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={distribuicao} dataKey="value" innerRadius={56} outerRadius={86}>
                        {distribuicao.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                    <div className="font-black text-blue-950">
                      € 2.650
                      <div className="text-[10px]">Total</div>
                    </div>
                  </div>
                </div>

                <LegendList items={distribuicao} colors={COLORS} />
              </div>
            </ChartBox>

            <ChartBox title="Distribuição da Renda">
              <div className="grid grid-cols-[1fr_120px] items-center">
                <div className="relative h-[210px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={renda} dataKey="value" innerRadius={56} outerRadius={86}>
                        {renda.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex items-center justify-center text-4xl pointer-events-none">
                    💼
                  </div>
                </div>

                <LegendList items={renda} colors={renda.map(i => i.color)} />
              </div>
            </ChartBox>
          </section>
        </main>
      </div>
    </div>
  )
}

function SimulatorCard() {
  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 overflow-hidden min-h-[205px]">
      <div className="p-4">
        <h3 className="font-black text-[12px] uppercase text-blue-900 mb-3">
          Saúlador: quanto tempo para ficar sem dívidas?
        </h3>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-slate-700">
              Valor disponível mensal para dívidas
            </span>
            <div className="w-[110px] h-8 bg-green-50 rounded-lg flex items-center justify-center text-[11px] font-black text-green-900">
              € 1.350,00
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-slate-700">
              Considerar juros na simulação?
            </span>
            <div className="w-[110px] h-8 bg-green-50 rounded-lg flex items-center justify-center gap-2 text-[11px] font-black text-green-900">
              Sim <span className="text-green-700">⌄</span>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] bg-gradient-to-br from-[#eef2ff] to-white p-3">
          <h4 className="text-[11px] font-black uppercase text-blue-800 mb-2">
            Tempo estimado para ficar sem dívidas
          </h4>

          <div className="grid grid-cols-[1fr_1fr] gap-3 items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📅</div>
              <div>
                <div className="text-[38px] leading-none font-black text-blue-800">23</div>
                <div className="text-[12px] font-black text-blue-900 uppercase">Meses</div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="text-[10px] font-black uppercase text-blue-900 mb-1">
                Estratégia recomendada
              </div>
              <div className="flex items-center gap-2 text-[12px] font-black">
                🏆 Avalanche
              </div>
              <p className="text-[9px] text-slate-500 font-bold mt-1">
                Poupança estimada em juros
              </p>
              <div className="flex justify-between items-end">
                <span className="text-[12px] font-black">€ 3.420,00</span>
                <span className="text-3xl text-green-600">↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DebtEvolutionCard() {
  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 min-h-[205px] p-4 grid grid-cols-[1fr_105px] gap-3">
      <div>
        <h3 className="text-center font-black text-[13px] uppercase text-blue-950 mb-2">
          Evolução da Dívida ao Longo dos Meses
        </h3>

        <ResponsiveContainer width="100%" height={170}>
          <ComposedChart data={evolucao} margin={{ top: 6, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fontWeight: 700 }} />
            <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="sombra"
              stroke="none"
              fill="#ddd6fe"
              fillOpacity={0.9}
            />

            <Line
              type="monotone"
              dataKey="divida"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            />

            <Line
              type="monotone"
              dataKey="projecao"
              stroke="#6d28d9"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, strokeWidth: 1, fill: "white" }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-7 text-[10px] font-black mt-1">
          <span className="text-[#4f46e5]">━ Dívida Real</span>
          <span className="text-[#6d28d9]">-- Projeção</span>
          <span className="text-green-600">✦ Meta: € 0</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full rounded-[14px] bg-[#f3efff] border border-purple-200 p-3 text-center shadow-sm">
          <div className="text-[12px] font-black text-purple-700">Faltam</div>
          <div className="text-[42px] leading-none font-black text-purple-700">23</div>
          <div className="text-[12px] font-black text-purple-700">meses</div>
          <div className="text-[11px] font-black text-purple-700 mt-2 leading-tight">
            para ficar sem dívidas
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthCard() {
  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 min-h-[120px] p-3 flex gap-3 items-center">
      <div>
        <h3 className="text-[12px] uppercase font-black text-blue-950 mb-2">Índice de Saúde Financeira</h3>
        <div
          className="relative w-[92px] h-[92px] rounded-full flex items-center justify-center"
          style={{ background: "conic-gradient(#0d9488 0 20%, #22c55e 20% 85%, #e5eef8 85% 100%)" }}
        >
          <div className="w-[66px] h-[66px] bg-white rounded-full flex flex-col items-center justify-center font-black shadow-inner">
            <span className="text-[28px] leading-none">85</span>
            <span className="text-[10px]">/100</span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="text-green-600 text-xl font-black">↗</div>
        <p className="font-black text-[15px]">Excelente</p>
        <p className="text-[10px] font-bold text-slate-700 mt-2 leading-snug">
          A sua situação financeira está muito saudável!
        </p>
      </div>
    </div>
  )
}

function KpiCard({ icon, title, value, subtitle, accent, showBar, green }) {
  const colors = {
    blue: "bg-blue-100",
    red: "bg-red-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
  }

  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 min-h-[120px] p-4 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-full ${colors[accent]} flex items-center justify-center text-3xl`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-[12px] uppercase font-black text-blue-950">{title}</h3>
        <p className={`text-[24px] font-black mt-2 ${green ? "text-green-800" : "text-black"}`}>
          {value}
        </p>
        {showBar && (
          <div className="w-[90px] h-2 rounded-full bg-blue-100 mt-3">
            <div className="w-[55px] h-2 rounded-full bg-blue-500" />
          </div>
        )}
        {subtitle && <p className="text-[11px] font-bold text-blue-950 mt-2">{subtitle}</p>}
      </div>
    </div>
  )
}

function ChartBox({ title, children }) {
  return (
    <div className="rounded-[14px] bg-white p-4 shadow-lg border border-slate-100 min-h-[245px]">
      <h3 className="text-center font-black text-[13px] uppercase text-blue-950 mb-2">{title}</h3>
      {children}
    </div>
  )
}

function LegendList({ items, colors }) {
  return (
    <div className="space-y-3 text-[11px] font-bold">
      {items.map((item, index) => (
        <div key={item.name} className="grid grid-cols-[14px_1fr_40px] gap-2 items-center">
          <span className="w-3 h-3 rounded-full" style={{ background: colors[index] }} />
          <span>{item.name}</span>
          <span>{item.percent}</span>
        </div>
      ))}
    </div>
  )
}

function GoalsPanel() {
  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-[14px] uppercase">🎯 Objetivos Financeiros</h3>
          <button className="bg-green-100 text-green-800 text-[10px] font-black px-3 py-1 rounded-full">+ Novo</button>
        </div>

        {objetivos.map(([icon, nome, objetivo, valor, progresso, color]) => (
          <div key={nome} className="grid grid-cols-[38px_1fr] gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-xl">{icon}</div>
            <div>
              <div className="flex justify-between text-[11px] font-black">
                <span>{nome}</span>
                <span>{valor}</span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold mb-1">{objetivo}</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-slate-200 rounded-full">
                  <div className={`h-2 rounded-full ${color}`} style={{ width: `${progresso}%` }} />
                </div>
                <span className="text-[11px] font-black text-green-600">{progresso}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 text-center py-3 text-[12px] font-black">
        Ver todos os objetivos →
      </div>
    </div>
  )
}

function TableCard({ title, color, children }) {
  return (
    <div className="rounded-[24px] bg-white shadow-lg overflow-hidden border border-slate-100">
      <div className={`${color} text-white text-center py-2.5 font-black text-xs uppercase`}>{title}</div>
      <table className="w-full text-[10px] leading-tight">{children}</table>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
      <h3 className="font-black text-orange-700 mb-4">{title}</h3>
      {children}
    </div>
  )
}

function Sidebar() {
  const menuItems = [
    ["🏠", "Resumo"],
    ["⚖️", "Rendimentos"],
    ["💸", "Despesas"],
    ["🪙", "Dívidas"],
    ["🎯", "Objetivos"],
    ["🗓️", "Calendário"],
    ["💳", "Pagamentos"],
    ["📋", "Simulador"],
    ["📊", "Relatórios"],
    ["⚙️", "Definições"],
  ]

  const scores = [
    ["💵", "Orçamento", "80/100"],
    ["💰", "Poupança", "90/100"],
    ["🪙", "Dívidas", "70/100"],
    ["✅", "Fundo Emergência", "100/100"],
    ["🛡️", "Compromisso Renda", "85/100"],
  ]

  return (
    <aside className="fixed left-0 top-0 z-20 w-[226px] min-h-screen p-[6px]">
      <div className="min-h-[calc(100vh-12px)] rounded-[22px] bg-gradient-to-b from-[#061b3f] via-[#03152f] to-[#020d22] text-white shadow-2xl border border-white/20 overflow-hidden">
        <div className="px-4 pt-4 pb-3 text-center">
          <div className="mx-auto mb-2 flex h-[70px] w-[92px] items-center justify-center text-[56px] leading-none text-[#ffb000]">
            📊€
          </div>

          <h1 className="text-[25px] font-black leading-[1.05] tracking-tight">
            Planeamento
            <br />
            Financeiro
          </h1>

          <p className="mt-2 text-[12px] font-semibold text-white/90">
            Controlo Financeiro Familiar
          </p>
        </div>

        <div className="mx-3 mb-3 grid grid-cols-[1fr_36px] overflow-hidden rounded-[12px] border border-cyan-400/40 bg-[#062a57] shadow-inner">
          <button className="flex items-center justify-center gap-2 py-2 text-[12px] font-black text-yellow-300">
            <span>🗓️</span>
            Maio 2024
          </button>
          <button className="border-l border-cyan-400/30 text-yellow-300">⌄</button>
        </div>

        <nav className="px-3 space-y-[5px]">
          {menuItems.map(([icon, label], index) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-[11px] px-3 py-[7px] text-[13px] font-black transition-all ${
                index === 0
                  ? "bg-gradient-to-r from-[#0b7cff] to-[#1d4ed8] shadow-[0_0_18px_rgba(59,130,246,0.65)]"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="w-4 text-center text-[15px]">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </nav>

        <div className="mx-3 mt-4 rounded-[13px] border border-cyan-400/35 bg-[#061b3f]/80 p-3 shadow-inner">
          <div className="mb-2 text-center text-[9px] font-black uppercase text-white/80">
            Moeda
          </div>

          <div className="grid grid-cols-[1fr_32px] overflow-hidden rounded-[9px] border border-cyan-400/30 bg-[#062a57]">
            <div className="flex items-center justify-center gap-2 py-2 text-[11px] font-black">
              <span className="rounded bg-blue-700 px-1">🇪🇺</span>
              EUR - Euro (€)
            </div>
            <div className="flex items-center justify-center border-l border-cyan-400/30 text-cyan-300">
              ⌄
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[8px] font-black uppercase text-white/70">Atualizado em</p>
            <p className="text-[11px] font-black">01/05/2024 12:30</p>
          </div>
        </div>

        <div className="mx-3 mt-3 rounded-[13px] border border-cyan-400/35 bg-[#061b3f]/80 p-3 shadow-inner">
          <h3 className="mb-2 text-center text-[12px] font-black uppercase">Saúde Financeira</h3>

          <div
            className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#84cc16 0 18%, #22c55e 18% 44%, #14b8a6 44% 76%, #0ea5e9 76% 85%, rgba(255,255,255,0.12) 85% 100%)",
            }}
          >
            <div className="flex h-[64px] w-[64px] flex-col items-center justify-center rounded-full bg-[#071b3a] font-black shadow-inner">
              <span className="text-[30px] leading-none">85</span>
              <span className="text-[10px]">/100</span>
            </div>
          </div>

          <div className="mx-auto mt-2 w-[112px] rounded-full bg-gradient-to-r from-[#16a34a] to-[#059669] py-1 text-center text-[11px] font-black shadow-lg">
            Excelente
          </div>

          <div className="mt-3 space-y-[6px]">
            {scores.map(([icon, label, value]) => (
              <div key={label} className="flex items-center justify-between text-[10px] font-bold">
                <span className="flex items-center gap-2">
                  <span>{icon}</span>
                  {label}
                </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}