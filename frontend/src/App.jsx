import "./App.css"
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts"

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4"]

const despesas = [
  { name: "Habitação", orcamentado: 950, realizado: 950 },
  { name: "Transportes", orcamentado: 400, realizado: 400 },
  { name: "Alimentação", orcamentado: 600, realizado: 600 },
  { name: "Saúde", orcamentado: 200, realizado: 200 },
  { name: "Lazer", orcamentado: 200, realizado: 200 },
  { name: "Outros", orcamentado: 350, realizado: 330 },
]

const distribuicao = [
  { name: "Habitação", value: 950 },
  { name: "Alimentação", value: 600 },
  { name: "Transportes", value: 400 },
  { name: "Saúde", value: 200 },
  { name: "Lazer", value: 200 },
]

const evolucao = [
  { mes: "Mês 1", divida: 28450 },
  { mes: "Mês 3", divida: 25000 },
  { mes: "Mês 5", divida: 22000 },
  { mes: "Mês 7", divida: 19000 },
  { mes: "Mês 9", divida: 16000 },
  { mes: "Mês 11", divida: 13000 },
  { mes: "Mês 13", divida: 10000 },
  { mes: "Mês 15", divida: 7500 },
  { mes: "Mês 17", divida: 5000 },
  { mes: "Mês 19", divida: 3000 },
  { mes: "Mês 21", divida: 1500 },
  { mes: "Mês 23", divida: 0 },
]

const kpis = [
  ["Índice de Saúde Financeira", "85/100", "Excelente", "🟢"],
  ["Salário Líquido", "€ 5.000,00", "Mensal", "💼"],
  ["Total Despesas", "€ 2.650,00", "53% do salário", "🧾"],
  ["Disponível p/ Dívidas", "€ 1.350,00", "27% do salário", "💰"],
  ["Total Dívidas", "€ 28.450,00", "Min. mensal: € 950", "🏦"],
  ["Dias Restantes", "17", "até 31/05/2024", "📅"],
]

const objetivos = [
  ["Fundo de Emergência", "€ 2.100", 70],
  ["Quitar Cartão Crédito", "€ 1.000", 20],
  ["Entrada para Casa", "€ 3.750", 25],
  ["Nova Viatura", "€ 6.000", 30],
]

const pagamentos = [
  ["Habitação", "€ 700", "2 dias"],
  ["Cartão de Crédito", "€ 500", "5 dias"],
  ["Luz", "€ 85", "7 dias"],
  ["Internet", "€ 35", "12 dias"],
]

const dividas = [
  ["Cartão de Crédito", "€ 5.000", "80%", "Alta"],
  ["Empréstimo Pessoal", "€ 10.000", "65%", "Alta"],
  ["Financiamento Auto", "€ 8.000", "40%", "Média"],
  ["Crédito Loja", "€ 1.450", "15%", "Baixa"],
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#0f172a]">
      <aside className="fixed left-0 top-0 z-20 w-[240px] min-h-screen bg-gradient-to-b from-[#041c43] to-[#03142f] text-white p-6 shadow-2xl border-r border-blue-900/30 rounded-r-[32px]">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📈€</div>
          <h1 className="text-2xl font-black leading-tight">Planeamento Financeiro</h1>
          <p className="text-xs text-blue-200 mt-2">Controlo Financeiro Familiar</p>
        </div>

        <button className="w-full bg-[#0d3268] border border-blue-400/30 rounded-xl py-3 mb-5 font-bold">
          📅 Maio 2024
        </button>

        <nav className="space-y-2">
          {["Resumo", "Rendimentos", "Despesas", "Dívidas", "Objetivos", "Calendário", "Pagamentos", "Simulador", "Relatórios", "Definições"].map((item, index) => (
            <div
              key={item}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                index === 0 ? "bg-blue-600 shadow-lg" : "bg-[#0b255f] hover:bg-[#2563eb]"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-blue-200 mb-3">Saúde Financeira</p>
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#061b3a] flex items-center justify-center text-3xl font-black">
              85
            </div>
          </div>
          <p className="text-center mt-3 bg-green-500 rounded-full py-1 text-sm font-bold">Excelente</p>
        </div>
      </aside>

      <div className="ml-[260px] p-5 grid grid-cols-[1fr_300px] gap-5">
        <main className="space-y-5">
          <section className="grid grid-cols-6 gap-4">
            {kpis.map(([title, value, subtitle, icon]) => (
              <div
                key={title}
                className="rounded-[24px] bg-white p-5 shadow-xl border border-slate-100 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-[11px] font-black uppercase text-slate-500">{title}</p>
                <h2 className="text-xl font-black mt-2 text-slate-900">{value}</h2>
                <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-3 gap-5">
            <Card title="Orçamentado vs Realizado">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={despesas} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={95} />
                  <Tooltip />
                  <Bar dataKey="orcamentado" fill="#2563eb" radius={6} />
                  <Bar dataKey="realizado" fill="#22c55e" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Distribuição das Despesas">
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie data={distribuicao} dataKey="value" innerRadius={58} outerRadius={88}>
                    {distribuicao.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Distribuição da Renda">
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Despesas", value: 53 },
                      { name: "Dívidas", value: 27 },
                      { name: "Livre", value: 10 },
                      { name: "Reserva", value: 10 },
                    ]}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={88}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="grid grid-cols-3 gap-5">
            <TableCard title="Despesas Mensais" color="bg-blue-700">
              {despesas.map((item) => (
                <tr key={item.name} className="border-b border-slate-100">
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td className="p-3">€ {item.realizado}</td>
                  <td className="p-3 text-green-600 font-bold">OK</td>
                </tr>
              ))}
            </TableCard>

            <TableCard title="Dívidas" color="bg-purple-700">
              {dividas.map(([nome, valor, progresso, prioridade]) => (
                <tr key={nome} className="border-b border-slate-100">
                  <td className="p-3 font-semibold">{nome}</td>
                  <td className="p-3">{valor}</td>
                  <td className="p-3">{progresso}</td>
                  <td className="p-3 text-red-500 font-bold">{prioridade}</td>
                </tr>
              ))}
            </TableCard>

            <TableCard title="Pagamento Ideal" color="bg-green-700">
              {dividas.map(([nome], index) => (
                <tr key={nome} className="border-b border-slate-100">
                  <td className="p-3 font-semibold">{nome}</td>
                  <td className="p-3">€ {[500, 450, 300, 20][index]}</td>
                  <td className="p-3">{[12, 24, 25, 11][index]} meses</td>
                </tr>
              ))}
            </TableCard>
          </section>

          <section className="grid grid-cols-[340px_1fr] gap-5">
            <div className="rounded-[28px] bg-white p-6 shadow-xl border border-slate-100">
              <h3 className="font-black text-blue-900 mb-4">Simulador</h3>
              <p className="text-sm text-slate-500">Tempo estimado para ficar sem dívidas</p>
              <div className="text-6xl font-black text-blue-700 mt-4">23</div>
              <p className="font-bold">meses</p>
              <div className="mt-5 bg-green-100 text-green-800 rounded-xl p-3 text-sm font-bold">
                Estratégia recomendada: Avalanche
              </div>
            </div>

            <Card title="Evolução da Dívida ao Longo dos Meses">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={evolucao}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="divida"
                    stroke="#5b21b6"
                    fill="#c4b5fd"
                    fillOpacity={0.7}
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </section>
        </main>

        <aside className="space-y-5">
          <Panel title="Objetivos Financeiros">
            {objetivos.map(([nome, valor, progresso]) => (
              <div key={nome} className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{nome}</span>
                  <span>{valor}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${progresso}%` }} />
                </div>
                <p className="text-right text-xs text-green-600 font-bold">{progresso}%</p>
              </div>
            ))}
          </Panel>

          <Panel title="Próximos Pagamentos">
            {pagamentos.map(([nome, valor, dias]) => (
              <div key={nome} className="flex justify-between items-center text-sm border-b border-slate-100 py-2">
                <span>{nome}</span>
                <span className="font-bold">{valor}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">{dias}</span>
              </div>
            ))}
          </Panel>

          <Panel title="Alertas e Conselhos">
            {["Muito bem! Mantém a disciplina.", "Lazer está 10% acima do recomendado.", "Aumentar €150/mês reduz 9 meses."].map((item) => (
              <div key={item} className="bg-orange-50 text-orange-800 rounded-xl p-3 text-sm mb-3">
                {item}
              </div>
            ))}
          </Panel>
        </aside>
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-xl border border-slate-100">
      <h3 className="font-extrabold text-[15px] mb-5 text-slate-800">{title}</h3>
      {children}
    </div>
  )
}

function TableCard({ title, color, children }) {
  return (
    <div className="rounded-[28px] bg-white shadow-xl overflow-hidden border border-slate-100">
      <div className={`${color} text-white text-center py-3 font-black text-sm`}>{title}</div>
      <table className="w-full text-xs">
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-xl border border-slate-100">
      <h3 className="font-black text-orange-700 mb-4">{title}</h3>
      {children}
    </div>
  )
}