import React from "react"
import "./App.css"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const API_TOKEN = import.meta.env.VITE_API_TOKEN
const colors = ["#0e7490", "#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]

const kpis = [
  ["Saude financeira", "85/100", "Excelente"],
  ["Salario liquido", 5000, "Mensal"],
  ["Total despesas", 2650, "53% do salario"],
  ["Disponivel dividas", 1350, "27% do salario"],
  ["Total dividas", 28450, "Minimo mensal: 950 EUR"],
]

const fallbackRendimentos = [
  { id: 1, fonte: "Salario Principal", orcamentado: 5000, recebido: 5000 },
  { id: 2, fonte: "Trabalho Extra / Freelance", orcamentado: 0, recebido: 0 },
  { id: 3, fonte: "Investimentos", orcamentado: 0, recebido: 0 },
  { id: 4, fonte: "Outros Rendimentos", orcamentado: 0, recebido: 0 },
]

const despesas = [
  { name: "Habitacao", orcamentado: 950, realizado: 950 },
  { name: "Transportes", orcamentado: 400, realizado: 400 },
  { name: "Alimentacao", orcamentado: 600, realizado: 600 },
  { name: "Saude", orcamentado: 200, realizado: 200 },
  { name: "Lazer", orcamentado: 200, realizado: 200 },
  { name: "Outros", orcamentado: 300, realizado: 300 },
]

const dividas = [
  ["Cartao de Credito", 5000, "8.0%", "Alta"],
  ["Emprestimo Pessoal", 10000, "3.5%", "Alta"],
  ["Financiamento Auto", 8000, "1.5%", "Media"],
  ["Credito Loja", 1450, "2.9%", "Baixa"],
]

function apiFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`
  return fetch(url, { ...options, headers })
}

function money(value) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value || 0)
}

async function readJson(response, fallbackMessage) {
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || fallbackMessage)
  return data
}

export default function App() {
  const [rendimentos, setRendimentos] = React.useState(fallbackRendimentos)
  const [erro, setErro] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    apiFetch("/api/rendimentos")
      .then((res) => readJson(res, "Erro ao carregar rendimentos"))
      .then((data) => {
        setRendimentos(data.data)
        setErro("")
      })
      .catch((error) => setErro(error.message))
      .finally(() => setLoading(false))
  }, [])

  function apagarRendimento(id) {
    apiFetch(`/api/rendimentos?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      .then((res) => readJson(res, "Erro ao apagar rendimento"))
      .then((data) => {
        setRendimentos((atuais) => atuais.filter((item) => item.id !== data.data.id))
        setErro("")
      })
      .catch((error) => setErro(error.message))
  }

  function adicionarRendimento(novo) {
    setRendimentos((atuais) => [...atuais, novo])
  }

  const totalOrcamentado = rendimentos.reduce((sum, item) => sum + Number(item.orcamentado || 0), 0)
  const totalRecebido = rendimentos.reduce((sum, item) => sum + Number(item.recebido || 0), 0)

  return (
    <div className="min-h-screen bg-[#edf4ff] p-4 text-slate-950">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[220px_1fr] gap-4">
        <Sidebar />
        <main className="space-y-4">
          <section className="grid grid-cols-5 gap-3">
            {kpis.map(([title, value, detail]) => (
              <Card key={title}>
                <h2 className="text-[11px] font-black uppercase text-slate-500">{title}</h2>
                <p className="mt-2 text-xl font-black">{typeof value === "number" ? money(value) : value}</p>
                <p className="text-xs font-bold text-slate-500">{detail}</p>
              </Card>
            ))}
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Card title="Orcamentado vs realizado">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={despesas} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbe7f5" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={95} tick={{ fontSize: 11, fontWeight: 700 }} />
                  <Tooltip formatter={(value) => money(value)} />
                  <Bar dataKey="orcamentado" fill="#2563eb" radius={5} />
                  <Bar dataKey="realizado" fill="#16a34a" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Distribuicao das despesas">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={despesas} dataKey="realizado" nameKey="name" innerRadius={65} outerRadius={95}>
                    {despesas.map((item, index) => <Cell key={item.name} fill={colors[index]} />)}
                  </Pie>
                  <Tooltip formatter={(value) => money(value)} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="grid grid-cols-[1.2fr_0.8fr] gap-4">
            <Card title="Rendimentos">
              {loading && <p className="mb-2 text-xs font-bold text-slate-500">A carregar rendimentos...</p>}
              {erro && <p className="mb-2 rounded bg-red-50 p-2 text-xs font-bold text-red-700">{erro}</p>}
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-2 text-left">Fonte</th>
                    <th className="p-2 text-right">Orcamentado</th>
                    <th className="p-2 text-right">Recebido</th>
                    <th className="p-2 text-right">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {rendimentos.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="p-2 font-semibold">{item.fonte}</td>
                      <td className="p-2 text-right">{money(item.orcamentado)}</td>
                      <td className="p-2 text-right">{money(item.recebido)}</td>
                      <td className="p-2 text-right">
                        <button className="rounded bg-red-50 px-2 py-1 font-bold text-red-700" onClick={() => apagarRendimento(item.id)} type="button">
                          Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50 font-black">
                    <td className="p-2">Total</td>
                    <td className="p-2 text-right">{money(totalOrcamentado)}</td>
                    <td className="p-2 text-right">{money(totalRecebido)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              <AddRendimentoForm onAdicionar={adicionarRendimento} onErro={setErro} />
            </Card>

            <Card title="Dividas">
              <div className="space-y-2 text-xs">
                {dividas.map(([credor, saldo, juros, prioridade]) => (
                  <div className="grid grid-cols-[1fr_86px_46px_58px] gap-2 border-b border-slate-100 py-2" key={credor}>
                    <strong>{credor}</strong>
                    <span className="text-right">{money(saldo)}</span>
                    <span className="text-right">{juros}</span>
                    <span className="text-right font-black text-red-600">{prioridade}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

function AddRendimentoForm({ onAdicionar, onErro }) {
  const [fonte, setFonte] = React.useState("")
  const [orcamentado, setOrcamentado] = React.useState("")
  const [recebido, setRecebido] = React.useState("")
  const [enviando, setEnviando] = React.useState(false)

  function submit(event) {
    event.preventDefault()
    onErro("")
    if (!fonte.trim()) return onErro("Fonte e obrigatoria")
    if (Number(orcamentado) < 0 || Number(recebido) < 0) return onErro("Valores nao podem ser negativos")

    setEnviando(true)
    apiFetch("/api/rendimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fonte, orcamentado: Number(orcamentado), recebido: Number(recebido) }),
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
    <form className="mt-4 grid grid-cols-[1.4fr_0.8fr_0.8fr_auto] gap-2" onSubmit={submit}>
      <input className="rounded border p-2 text-sm" maxLength={100} onChange={(event) => setFonte(event.target.value)} placeholder="Fonte" required value={fonte} />
      <input className="rounded border p-2 text-sm" min="0" onChange={(event) => setOrcamentado(event.target.value)} placeholder="Orcamentado" step="0.01" type="number" value={orcamentado} />
      <input className="rounded border p-2 text-sm" min="0" onChange={(event) => setRecebido(event.target.value)} placeholder="Recebido" step="0.01" type="number" value={recebido} />
      <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:bg-slate-400" disabled={enviando} type="submit">
        {enviando ? "A adicionar..." : "Adicionar"}
      </button>
    </form>
  )
}

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
      {title && <h2 className="mb-3 text-sm font-black uppercase text-blue-950">{title}</h2>}
      {children}
    </section>
  )
}

function Sidebar() {
  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] rounded-lg bg-[#061b3f] p-4 text-white shadow-lg">
      <h1 className="text-2xl font-black leading-tight">Planeamento Financeiro</h1>
      <p className="mt-2 text-xs font-semibold text-white/75">Controlo financeiro familiar</p>
      <nav className="mt-6 space-y-1">
        {["Resumo", "Rendimentos", "Despesas", "Dividas", "Objetivos", "Pagamentos"].map((item, index) => (
          <button className={`w-full rounded px-3 py-2 text-left text-sm font-black ${index === 0 ? "bg-blue-600" : "hover:bg-white/10"}`} key={item} type="button">
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}
