import "./App.css"
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts"

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4", "#facc15"]

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
  { name: "Habitação", value: 950 },
  { name: "Alimentação", value: 600 },
  { name: "Transportes", value: 400 },
  { name: "Saúde", value: 200 },
  { name: "Lazer", value: 200 },
  { name: "Outros", value: 300 },
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
  ["Índice de Saúde Financeira", "85", "/100", "Excelente", "🟢"],
  ["Salário Líquido", "€ 5.000,00", "", "Mensal", "💼"],
  ["Total Despesas", "€ 2.650,00", "", "53,0% do salário", "🧾"],
  ["Disponível p/ Dívidas", "€ 1.350,00", "", "27,0% do salário", "💰"],
  ["Total Dívidas", "€ 28.450,00", "", "Min. mensal: € 950,00", "🏦"],
  ["Dias Restantes", "17", "", "até 31/05/2024", "📅"],
]

const objetivos = [
  ["Fundo de Emergência", "Objetivo: € 3.000,00", "€ 2.100,00", 70],
  ["Quitar Cartão de Crédito", "Objetivo: € 5.000,00", "€ 1.000,00", 20],
  ["Entrada para Casa", "Objetivo: € 15.000,00", "€ 3.750,00", 25],
  ["Nova Viatura", "Objetivo: € 20.000,00", "€ 6.000,00", 30],
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
  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#0f172a]">
      <aside className="fixed left-0 top-0 z-20 w-[226px] min-h-screen bg-gradient-to-b from-[#041c43] to-[#03142f] text-white p-5 shadow-2xl border-r border-blue-900/30 rounded-r-[30px]">
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
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                index === 0 ? "bg-blue-600 shadow-lg" : "bg-[#0b255f] hover:bg-[#2563eb]"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-blue-200 mb-3">Saúde Financeira</p>
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#061b3a] flex items-center justify-center text-3xl font-black">85</div>
          </div>
          <p className="text-center mt-3 bg-green-500 rounded-full py-1 text-sm font-bold">Excelente</p>
        </div>
      </aside>

      <div className="ml-[242px] p-4 grid grid-cols-[1fr_286px] gap-4">
        <main className="space-y-4">
          <section className="grid grid-cols-6 gap-3">
            {kpis.map(([title, value, small, subtitle, icon]) => (
              <div key={title} className="rounded-[22px] bg-white p-4 shadow-lg border border-slate-100 min-h-[116px]">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-[10px] font-black uppercase text-slate-500 leading-tight">{title}</p>
                <h2 className="text-[22px] font-black mt-1 text-slate-900">
                  {value} <span className="text-xs">{small}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-3 gap-4">
            <Card title="Orçamentado vs Realizado">
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={despesas} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={86} />
                  <Tooltip />
                  <Bar dataKey="orcamentado" fill="#2563eb" radius={6} />
                  <Bar dataKey="realizado" fill="#22c55e" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Distribuição das Despesas">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={distribuicao} dataKey="value" innerRadius={50} outerRadius={75}>
                    {distribuicao.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Distribuição da Renda">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Despesas", value: 53 },
                      { name: "Dívidas", value: 27 },
                      { name: "Livre", value: 10 },
                      { name: "Reserva", value: 10 },
                    ]}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={75}
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

          <section className="grid grid-cols-4 gap-4">
            <TableCard title="Rendimentos" color="bg-emerald-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-2 text-left">Fonte</th>
                  <th className="p-2">Orçamentado</th>
                  <th className="p-2">Recebido</th>
                </tr>
              </thead>
              <tbody>
                {rendimentos.map(([fonte, orc, rec]) => (
                  <tr key={fonte} className="border-b border-slate-100">
                    <td className="p-2 font-semibold">{fonte}</td>
                    <td className="p-2 text-center">{orc}</td>
                    <td className="p-2 text-center">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </TableCard>

            <TableCard title="Despesas Mensais" color="bg-blue-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-2 text-left">Categoria</th>
                  <th className="p-2">Orçamentado</th>
                  <th className="p-2">Realizado</th>
                  <th className="p-2">%</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((item) => (
                  <tr key={item.name} className="border-b border-slate-100">
                    <td className="p-2 font-semibold">{item.name}</td>
                    <td className="p-2 text-center">€ {item.orcamentado}</td>
                    <td className="p-2 text-center">€ {item.realizado}</td>
                    <td className="p-2 text-center text-blue-700 font-bold">{item.percentagem}</td>
                  </tr>
                ))}
              </tbody>
            </TableCard>

            <TableCard title="Dívidas" color="bg-purple-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-2 text-left">Credor</th>
                  <th className="p-2">Saldo Total</th>
                  <th className="p-2">Progresso</th>
                  <th className="p-2">Juros</th>
                  <th className="p-2">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {dividas.map(([nome, valor, progresso, juros, prioridade]) => (
                  <tr key={nome} className="border-b border-slate-100">
                    <td className="p-2 font-semibold">{nome}</td>
                    <td className="p-2 text-center">{valor}</td>
                    <td className="p-2 text-center">{progresso}</td>
                    <td className="p-2 text-center">{juros}</td>
                    <td className="p-2 text-center text-red-500 font-bold">{prioridade}</td>
                  </tr>
                ))}
              </tbody>
            </TableCard>

            <TableCard title="Pagamento Ideal das Dívidas" color="bg-green-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-2 text-left">Credor</th>
                  <th className="p-2">Pagamento Ideal</th>
                  <th className="p-2">Tempo Estimado</th>
                </tr>
              </thead>
              <tbody>
                {dividas.map(([nome], index) => (
                  <tr key={nome} className="border-b border-slate-100">
                    <td className="p-2 font-semibold">{nome}</td>
                    <td className="p-2 text-center">€ {[500, 450, 300, 20][index]}</td>
                    <td className="p-2 text-center">{[12, 24, 25, 11][index]} meses</td>
                  </tr>
                ))}
              </tbody>
            </TableCard>
          </section>

          <section className="grid grid-cols-[300px_1fr] gap-4">
            <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
              <h3 className="font-black text-blue-900 mb-3">Simulador: quanto tempo para ficar sem dívidas?</h3>
              <p className="text-sm text-slate-500">Valor disponível mensal para dívidas</p>
              <div className="text-5xl font-black text-blue-700 mt-3">23</div>
              <p className="font-bold">meses</p>
              <div className="mt-4 bg-green-100 text-green-800 rounded-xl p-3 text-xs font-bold">
                Estratégia recomendada: Avalanche
              </div>
            </div>

            <Card title="Evolução da Dívida ao Longo dos Meses">
              <ResponsiveContainer width="100%" height={230}>
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

        <aside className="space-y-4">
          <Panel title="Objetivos Financeiros">
            {objetivos.map(([nome, objetivo, valor, progresso]) => (
              <div key={nome} className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{nome}</span>
                  <span>{valor}</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-1">{objetivo}</p>
                <div className="h-2 bg-slate-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${progresso}%` }} />
                </div>
                <p className="text-right text-xs text-green-600 font-bold">{progresso}%</p>
              </div>
            ))}
          </Panel>

          <Panel title="Próximos Pagamentos">
            {pagamentos.map(([data, nome, valor, dias]) => (
              <div key={nome} className="grid grid-cols-[44px_1fr_64px_54px] items-center text-xs border-b border-slate-100 py-2 gap-1">
                <span className="font-bold">{data}</span>
                <span>{nome}</span>
                <span className="font-bold">{valor}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-[10px] text-center">{dias}</span>
              </div>
            ))}
          </Panel>

          <Panel title="Alertas e Conselhos">
            {[
              "Muito bem! Está a manter a disciplina nos pagamentos das dívidas.",
              "As despesas de lazer estão 10% acima do recomendado.",
              "Se aumentar €150/mês na dívida, termina 9 meses mais cedo.",
            ].map((item) => (
              <div key={item} className="bg-orange-50 text-orange-800 rounded-xl p-3 text-xs mb-3">
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
    <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
      <h3 className="font-extrabold text-[14px] mb-4 text-slate-800">{title}</h3>
      {children}
    </div>
  )
}

function TableCard({ title, color, children }) {
  return (
    <div className="rounded-[24px] bg-white shadow-lg overflow-hidden border border-slate-100">
      <div className={`${color} text-white text-center py-2.5 font-black text-xs uppercase`}>{title}</div>
      <table className="w-full text-[11px]">{children}</table>
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