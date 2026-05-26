import React from "react"
import "./App.css"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const API_TOKEN = import.meta.env.VITE_API_TOKEN
const colors = ["#0f766e", "#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]

const fallbackRendimentos = [
  { id: 1, fonte: "Salario Principal", orcamentado: 5000, recebido: 5000 },
  { id: 2, fonte: "Trabalho Extra / Freelance", orcamentado: 0, recebido: 0 },
  { id: 3, fonte: "Investimentos", orcamentado: 0, recebido: 0 },
  { id: 4, fonte: "Outros Rendimentos", orcamentado: 0, recebido: 0 },
]

const despesas = [
  { categoria: "Habitacao", orcamentado: 950, realizado: 950, limite: 1000 },
  { categoria: "Transportes", orcamentado: 400, realizado: 400, limite: 450 },
  { categoria: "Alimentacao", orcamentado: 600, realizado: 600, limite: 650 },
  { categoria: "Saude", orcamentado: 200, realizado: 200, limite: 250 },
  { categoria: "Lazer", orcamentado: 200, realizado: 200, limite: 250 },
  { categoria: "Outros", orcamentado: 300, realizado: 300, limite: 350 },
]

const dividas = [
  { credor: "Cartao de Credito", saldo: 5000, minimo: 200, juros: 8.0, prioridade: "Alta" },
  { credor: "Emprestimo Pessoal", saldo: 10000, minimo: 350, juros: 3.5, prioridade: "Alta" },
  { credor: "Financiamento Auto", saldo: 8000, minimo: 300, juros: 1.5, prioridade: "Media" },
  { credor: "Credito Loja", saldo: 1450, minimo: 100, juros: 2.9, prioridade: "Baixa" },
]

const goals = [
  { nome: "Fundo de emergencia", atual: 3200, objetivo: 8000, prazo: "Dezembro" },
  { nome: "Liquidar cartao", atual: 1800, objetivo: 5000, prazo: "Agosto" },
  { nome: "Poupanca ferias", atual: 900, objetivo: 2500, prazo: "Julho" },
]

const pagamentos = [
  { mes: "Jun", avalanche: 1350, minimo: 950, saldo: 27100 },
  { mes: "Jul", avalanche: 1350, minimo: 950, saldo: 25750 },
  { mes: "Ago", avalanche: 1350, minimo: 950, saldo: 24400 },
  { mes: "Set", avalanche: 1350, minimo: 950, saldo: 23050 },
  { mes: "Out", avalanche: 1350, minimo: 950, saldo: 21700 },
  { mes: "Nov", avalanche: 1350, minimo: 950, saldo: 20350 },
]

function apiFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`
  return fetch(url, { ...options, headers })
}

async function readJson(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || fallbackMessage)
  return data
}

function money(value) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(Number(value || 0))
}

function percent(value) {
  return `${Math.round(value)}%`
}

export default function App() {
  const [rendimentos, setRendimentos] = React.useState(fallbackRendimentos)
  const [erro, setErro] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    apiFetch("/api/rendimentos")
      .then((res) => readJson(res, "Erro ao carregar rendimentos"))
      .then((data) => {
        setRendimentos(Array.isArray(data.data) ? data.data : fallbackRendimentos)
        setErro("")
      })
      .catch((error) => {
        setErro(error.message)
        setRendimentos(fallbackRendimentos)
      })
      .finally(() => setLoading(false))
  }, [])

  function adicionarRendimento(novo) {
    setRendimentos((atuais) => [...atuais, novo])
  }

  function apagarRendimento(id) {
    setErro("")
    apiFetch(`/api/rendimentos?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      .then((res) => readJson(res, "Erro ao apagar rendimento"))
      .then((data) => {
        setRendimentos((atuais) => atuais.filter((item) => item.id !== data.data.id))
      })
      .catch((error) => setErro(error.message))
  }

  const totalOrcamentado = rendimentos.reduce((sum, item) => sum + Number(item.orcamentado || 0), 0)
  const totalRecebido = rendimentos.reduce((sum, item) => sum + Number(item.recebido || 0), 0)
  const totalDespesas = despesas.reduce((sum, item) => sum + item.realizado, 0)
  const totalDividas = dividas.reduce((sum, item) => sum + item.saldo, 0)
  const minimoDividas = dividas.reduce((sum, item) => sum + item.minimo, 0)
  const disponivelDividas = Math.max(totalRecebido - totalDespesas - 1000, 0)
  const saudeFinanceira = Math.min(100, Math.round(((totalRecebido - totalDespesas) / Math.max(totalRecebido, 1)) * 100 + 45))
  const despesaChart = despesas.map((item) => ({ name: item.categoria, ...item }))

  return (
    <div className="min-h-screen bg-[#eef4fb] text-slate-950">
      <div className="mx-auto grid max-w-[1500px] grid-cols-[230px_1fr_320px] gap-4 p-4 max-xl:grid-cols-[210px_1fr] max-lg:block">
        <Sidebar />

        <main className="space-y-4 max-lg:mt-4">
          <Header totalRecebido={totalRecebido} saudeFinanceira={saudeFinanceira} />

          <section className="grid grid-cols-4 gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
            <KpiCard label="Salario liquido" value={money(totalRecebido)} detail={`Orcamentado: ${money(totalOrcamentado)}`} tone="teal" />
            <KpiCard label="Total despesas" value={money(totalDespesas)} detail={`${percent((totalDespesas / Math.max(totalRecebido, 1)) * 100)} do rendimento`} tone="blue" />
            <KpiCard label="Disponivel dividas" value={money(disponivelDividas)} detail={`Minimos: ${money(minimoDividas)}`} tone="green" />
            <KpiCard label="Total dividas" value={money(totalDividas)} detail="Plano avalanche preparado" tone="orange" />
          </section>

          <section className="grid grid-cols-[1.1fr_0.9fr] gap-4 max-xl:grid-cols-1">
            <Panel title="Orcamentado vs realizado">
              <ResponsiveContainer width="100%" height={270}>
                <BarChart data={despesaChart} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e4f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={98} tick={{ fontSize: 11, fontWeight: 700 }} />
                  <Tooltip formatter={(value) => money(value)} />
                  <Bar dataKey="orcamentado" fill="#2563eb" radius={5} />
                  <Bar dataKey="realizado" fill="#16a34a" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="Distribuicao das despesas">
              <ResponsiveContainer width="100%" height={270}>
                <PieChart>
                  <Pie data={despesaChart} dataKey="realizado" nameKey="name" innerRadius={66} outerRadius={98}>
                    {despesaChart.map((item, index) => (
                      <Cell key={item.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => money(value)} />
                </PieChart>
              </ResponsiveContainer>
            </Panel>
          </section>

          <section className="grid grid-cols-[1.15fr_0.85fr] gap-4 max-xl:grid-cols-1">
            <Panel title="Rendimentos">
              {loading && <p className="mb-2 text-xs font-bold text-slate-500">A carregar rendimentos...</p>}
              {erro && <p className="mb-3 rounded bg-red-50 p-2 text-xs font-bold text-red-700">{erro}</p>}
              <DataTable
                columns={["Fonte", "Orcamentado", "Recebido", "Acoes"]}
                rows={rendimentos.map((item) => [
                  item.fonte,
                  money(item.orcamentado),
                  money(item.recebido),
                  <button
                    className="rounded bg-red-50 px-2 py-1 text-xs font-black text-red-700 hover:bg-red-100"
                    key={`delete-${item.id}`}
                    onClick={() => apagarRendimento(item.id)}
                    type="button"
                  >
                    Apagar
                  </button>,
                ])}
                total={["Total", money(totalOrcamentado), money(totalRecebido), ""]}
              />
              <AddRendimentoForm onAdicionar={adicionarRendimento} onErro={setErro} />
            </Panel>

            <Panel title="Dividas e prioridades">
              <DataTable
                columns={["Credor", "Saldo", "Minimo", "Prioridade"]}
                rows={dividas.map((item) => [
                  item.credor,
                  money(item.saldo),
                  money(item.minimo),
                  <Priority key={item.credor} value={item.prioridade} />,
                ])}
              />
            </Panel>
          </section>

          <section className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
            <Panel title="Evolucao prevista das dividas">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={pagamentos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e4f0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => money(value)} />
                  <Area type="monotone" dataKey="saldo" stroke="#0f766e" fill="#99f6e4" />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="Plano de pagamento ideal">
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={pagamentos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e4f0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => money(value)} />
                  <Bar dataKey="minimo" fill="#94a3b8" radius={4} />
                  <Line type="monotone" dataKey="avalanche" stroke="#f97316" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </Panel>
          </section>
        </main>

        <aside className="space-y-4 max-xl:col-span-2 max-xl:grid max-xl:grid-cols-2 max-xl:gap-4 max-xl:space-y-0 max-lg:mt-4 max-lg:block max-lg:space-y-4">
          <GoalsPanel />
          <SimulatorCard totalDividas={totalDividas} disponivelDividas={disponivelDividas} />
          <AlertsPanel disponivelDividas={disponivelDividas} minimoDividas={minimoDividas} />
        </aside>
      </div>
    </div>
  )
}

function Header({ totalRecebido, saudeFinanceira }) {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4 max-sm:block">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-teal-700">Resumo mensal</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950">Planeamento financeiro familiar</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">Estrutura pronta para ligar mais tabelas ao backend quando for a altura certa.</p>
        </div>
        <div className="grid min-w-[250px] grid-cols-2 gap-2 max-sm:mt-4">
          <MiniStat label="Rendimento" value={money(totalRecebido)} />
          <MiniStat label="Saude" value={`${saudeFinanceira}/100`} />
        </div>
      </div>
    </section>
  )
}

function Sidebar() {
  const items = ["Resumo", "Rendimentos", "Despesas", "Dividas", "Objetivos", "Simulador", "Pagamentos"]
  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] rounded-lg bg-[#061b3f] p-4 text-white shadow-lg max-lg:static max-lg:h-auto">
      <h2 className="text-2xl font-black leading-tight">Planeamento Financeiro</h2>
      <p className="mt-2 text-xs font-semibold text-white/70">Controlo, prioridades e preparacao para backend.</p>
      <nav className="mt-6 space-y-1 max-lg:grid max-lg:grid-cols-4 max-sm:grid-cols-2">
        {items.map((item, index) => (
          <button className={`w-full rounded px-3 py-2 text-left text-sm font-black ${index === 0 ? "bg-blue-600" : "hover:bg-white/10"}`} key={item} type="button">
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function KpiCard({ label, value, detail, tone }) {
  const tones = {
    teal: "border-teal-200 bg-teal-50 text-teal-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    orange: "border-orange-200 bg-orange-50 text-orange-800",
  }
  return (
    <section className={`rounded-lg border p-4 shadow-sm ${tones[tone]}`}>
      <p className="text-[11px] font-black uppercase text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-600">{detail}</p>
    </section>
  )
}

function Panel({ title, children }) {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-black uppercase text-blue-950">{title}</h2>
      {children}
    </section>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-[11px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
    </div>
  )
}

function DataTable({ columns, rows, total }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-xs">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((column, index) => (
              <th className={`p-2 ${index === 0 ? "text-left" : "text-right"}`} key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className="border-b border-slate-100" key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td className={`p-2 ${cellIndex === 0 ? "font-semibold" : "text-right"}`} key={`${row[0]}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {total && (
            <tr className="bg-emerald-50 font-black">
              {total.map((cell, index) => (
                <td className={`p-2 ${index === 0 ? "text-left" : "text-right"}`} key={`total-${index}`}>
                  {cell}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function Priority({ value }) {
  const className = value === "Alta" ? "text-red-700" : value === "Media" ? "text-orange-700" : "text-slate-600"
  return <span className={`font-black ${className}`}>{value}</span>
}

function AddRendimentoForm({ onAdicionar, onErro }) {
  const [fonte, setFonte] = React.useState("")
  const [orcamentado, setOrcamentado] = React.useState("")
  const [recebido, setRecebido] = React.useState("")
  const [enviando, setEnviando] = React.useState(false)

  function submit(event) {
    event.preventDefault()
    onErro("")

    if (!fonte.trim()) {
      onErro("Fonte e obrigatoria")
      return
    }

    if (Number(orcamentado) < 0 || Number(recebido) < 0) {
      onErro("Valores nao podem ser negativos")
      return
    }

    setEnviando(true)
    apiFetch("/api/rendimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fonte, orcamentado: Number(orcamentado || 0), recebido: Number(recebido || 0) }),
    })
      .then((res) => readJson(res, "Erro ao adicionar rendimento"))
      .then((data) => {
        onAdicionar(data.data)
        setFonte("")
        setOrcamentado("")
        setRecebido("")
      })
      .catch((error) => onErro(error.message))
      .finally(() => setEnviando(false))
  }

  return (
    <form className="mt-4 grid grid-cols-[1.4fr_0.8fr_0.8fr_auto] gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1" onSubmit={submit}>
      <input className="rounded border border-slate-200 p-2 text-sm" maxLength={100} onChange={(event) => setFonte(event.target.value)} placeholder="Fonte" required value={fonte} />
      <input className="rounded border border-slate-200 p-2 text-sm" min="0" onChange={(event) => setOrcamentado(event.target.value)} placeholder="Orcamentado" step="0.01" type="number" value={orcamentado} />
      <input className="rounded border border-slate-200 p-2 text-sm" min="0" onChange={(event) => setRecebido(event.target.value)} placeholder="Recebido" step="0.01" type="number" value={recebido} />
      <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700 disabled:bg-slate-400" disabled={enviando} type="submit">
        {enviando ? "A adicionar..." : "Adicionar"}
      </button>
    </form>
  )
}

function GoalsPanel() {
  return (
    <Panel title="Objetivos">
      <div className="space-y-3">
        {goals.map((goal) => {
          const progresso = Math.min(100, (goal.atual / goal.objetivo) * 100)
          return (
            <div key={goal.nome}>
              <div className="flex items-center justify-between gap-2 text-xs">
                <strong>{goal.nome}</strong>
                <span className="font-bold text-slate-500">{goal.prazo}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded bg-slate-100">
                <div className="h-full rounded bg-teal-600" style={{ width: `${progresso}%` }} />
              </div>
              <p className="mt-1 text-xs font-bold text-slate-500">
                {money(goal.atual)} de {money(goal.objetivo)}
              </p>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function SimulatorCard({ totalDividas, disponivelDividas }) {
  const [extra, setExtra] = React.useState(400)
  const pagamentoMensal = Math.max(disponivelDividas + Number(extra || 0), 1)
  const meses = Math.ceil(totalDividas / pagamentoMensal)

  return (
    <Panel title="Simulador">
      <label className="text-xs font-black uppercase text-slate-500" htmlFor="extra-payment">
        Reforco mensal
      </label>
      <input
        className="mt-2 w-full accent-teal-700"
        id="extra-payment"
        max="1500"
        min="0"
        onChange={(event) => setExtra(Number(event.target.value))}
        step="50"
        type="range"
        value={extra}
      />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniStat label="Extra" value={money(extra)} />
        <MiniStat label="Prazo" value={`${meses} meses`} />
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">Este bloco fica pronto para receber regras reais de juros e amortizacao no backend.</p>
    </Panel>
  )
}

function AlertsPanel({ disponivelDividas, minimoDividas }) {
  const alerts = [
    disponivelDividas >= minimoDividas ? "Disponivel cobre os pagamentos minimos." : "Disponivel abaixo dos pagamentos minimos.",
    "Validar juros reais antes de automatizar o plano avalanche.",
    "Separar dados persistentes por utilizador quando houver autenticacao.",
  ]

  return (
    <Panel title="Alertas">
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <p className="rounded border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-700" key={alert}>
            {index + 1}. {alert}
          </p>
        ))}
      </div>
    </Panel>
  )
}
