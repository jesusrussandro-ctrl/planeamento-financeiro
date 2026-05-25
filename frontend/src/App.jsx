import "./App.css"
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts"

const COLORS = ["#0e7490", "#0891b2", "#84cc16", "#7c3aed", "#2563eb", "#f59e0b"]

const despesas = [
  { name: "Habitação", orcamentado: 950, realizado: 950 },
  { name: "Transportes", orcamentado: 400, realizado: 400 },
  { name: "Alimentação", orcamentado: 600, realizado: 600 },
  { name: "Saúde", orcamentado: 200, realizado: 200 },
  { name: "Lazer", orcamentado: 200, realizado: 200 },
  { name: "Outros", orcamentado: 350, realizado: 330 },
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
  { name: "Despesas", value: 53, color: "#f97316" },
  { name: "Dívidas", value: 27, color: "#15803d" },
  { name: "Livre", value: 10, color: "#2563eb" },
  { name: "Reserva", value: 10, color: "#0e7490" },
]

const objetivos = [
  ["💵", "Fundo de Emergência", "Objetivo: € 3.000,00", "€ 2.100,00", 70, "bg-green-500"],
  ["💳", "Quitar Cartão de Crédito", "Objetivo: € 5.000,00", "€ 1.000,00", 20, "bg-orange-500"],
  ["🏠", "Entrada para Casa", "Objetivo: € 15.000,00", "€ 3.750,00", 25, "bg-blue-500"],
  ["🚗", "Nova Viatura", "Objetivo: € 20.000,00", "€ 6.000,00", 30, "bg-purple-500"],
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#061633]">
      <aside className="fixed left-0 top-0 z-20 w-[226px] min-h-screen bg-gradient-to-b from-[#041c43] to-[#03142f] text-white p-5 shadow-2xl rounded-r-[30px]">
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">📈€</div>
          <h1 className="text-[25px] font-black leading-tight">Planeamento Financeiro</h1>
          <p className="text-xs text-blue-200 mt-2">Controlo Financeiro Familiar</p>
        </div>

        <button className="w-full bg-[#0d3268] border border-blue-400/30 rounded-xl py-2.5 mb-4 font-bold text-sm">
          📅 Maio 2024
        </button>

        <nav className="space-y-2">
          {["Resumo", "Rendimentos", "Despesas", "Dívidas", "Objetivos", "Calendário", "Pagamentos", "Simulador", "Relatórios", "Definições"].map((item, index) => (
            <div
              key={item}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                index === 0 ? "bg-blue-600 shadow-lg" : "bg-[#0b255f] hover:bg-[#2563eb]"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      <div className="ml-[242px] p-3 grid grid-cols-[1fr_290px] gap-3">
        <main className="space-y-3">
          <section className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr_1fr] gap-3">
            <HealthCard />
            <KpiCard icon="💼" title="Salário Líquido" value="€ 5.000,00" accent="blue" showBar />
            <KpiCard icon="🧾" title="Total Despesas" value="€ 2.650,00" subtitle="53,0% do salário" accent="red" />
            <KpiCard icon="💸" title="Disponível p/ Dívidas" value="€ 1.350,00" subtitle="27,0% do salário" accent="green" green />
            <KpiCard icon="🏦" title="Total Dívidas" value="€ 28.450,00" subtitle="Min. mensal: € 950,00" accent="purple" />
            <KpiCard icon="🗓️" title="Dias Restantes" value="17" subtitle="até 31/05/2024" accent="orange" />
          </section>

          <section className="grid grid-cols-[1.2fr_1fr_1fr] gap-3">
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
                <LegendList items={renda.map(i => ({ ...i, percent: `${i.value},0%` }))} colors={renda.map(i => i.color)} />
              </div>
            </ChartBox>
          </section>
        </main>

        <aside>
          <GoalsPanel />
        </aside>
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
          style={{ background: "conic-gradient(#29c443 0 85%, #e5eef8 85% 100%)" }}
        >
          <div className="w-[66px] h-[66px] bg-white rounded-full flex flex-col items-center justify-center font-black">
            <span className="text-[28px] leading-none">85</span>
            <span className="text-[10px]">/100</span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="text-green-600 text-xl">↗</div>
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