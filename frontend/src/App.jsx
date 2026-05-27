import React from "react"
import "./App.css"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  ComposedChart,
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
  { name: "Outros1", orcamentado: 350, realizado: 330, percentagem: "6,6%" },
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
  const [rendimentosApi, setRendimentosApi] = React.useState([])
  const [rendimentoEditando, setRendimentoEditando] = React.useState(null)

  const [despesasApi, setDespesasApi] = React.useState([])
  const [despesaEditando, setDespesaEditando] = React.useState(null)

  const [dividasApi, setDividasApi] = React.useState([])
  const [dividaEditando, setDividaEditando] = React.useState(null)

  React.useEffect(() => {
    fetch("/api/rendimentos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Rendimentos backend:", data)

        setRendimentosApi(
          data.data.map((item) => ({
            id: item.id,
            fonte: item.fonte,
            orcamentado: Number(item.orcamentado || 0),
            recebido: Number(item.recebido || 0),
          }))
        )
      })
      .catch((err) => {
        console.error("Erro rendimentos:", err)
      })
  }, [])

  React.useEffect(() => {
    fetch("/api/despesas")
      .then((res) => res.json())
      .then((data) => {
        console.log("Despesas backend:", data)

        setDespesasApi(
          data.data.map((item) => ({
            id: item.id,
            categoria: item.categoria,
            orcamentado: Number(item.orcamentado || 0),
            realizado: Number(item.realizado || 0),
            percentagem: item.percentagem || "0%",
          }))
        )
      })
      .catch((err) => {
        console.error("Erro despesas:", err)
      })
  }, [])

  React.useEffect(() => {
    fetch("/api/dividas")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dívidas backend:", data)

        setDividasApi(
          data.data.map((item) => ({
            id: item.id,
            credor: item.credor,
            saldo: Number(item.saldo || 0),
            progresso: Number(item.progresso || 0),
            juros: item.juros || "0%",
            prioridade: item.prioridade || "Baixa",
          }))
        )
      })
      .catch((err) => {
        console.error("Erro dívidas:", err)
      })
  }, [])

  function formatarEuro(valor) {
    return `€ ${Number(valor || 0).toLocaleString("pt-PT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  function formatarPercentagem(valor) {
    return `${Number(valor || 0).toLocaleString("pt-PT", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`
  }

  const totalOrcamentado = rendimentosApi.reduce(
    (total, item) => total + Number(item.orcamentado || 0),
    0
  )

  const totalRecebido = rendimentosApi.reduce(
    (total, item) => total + Number(item.recebido || 0),
    0
  )

  const totalDespesasOrcamentado = despesasApi.reduce(
    (total, item) => total + Number(item.orcamentado || 0),
    0
  )

  const totalDespesasRealizado = despesasApi.reduce(
    (total, item) => total + Number(item.realizado || 0),
    0
  )

  const percentagemDespesasSalario = totalRecebido > 0
    ? (totalDespesasRealizado / totalRecebido) * 100
    : 0

  const disponivelParaDividas = totalRecebido - totalDespesasRealizado

  const totalDividas = dividasApi.reduce(
    (total, item) => total + Number(item.saldo || 0),
    0
  )

  const pagamentoIdealDividas = dividasApi.map((item) => {
    const peso = totalDividas > 0 ? Number(item.saldo || 0) / totalDividas : 0
    const pagamento = Math.max(0, disponivelParaDividas) * peso
    const percentagemDisponivel = Math.max(0, disponivelParaDividas) > 0
      ? (pagamento / Math.max(0, disponivelParaDividas)) * 100
      : 0
    const tempoMeses = pagamento > 0
      ? Math.ceil(Number(item.saldo || 0) / pagamento)
      : 0

    return {
      id: item.id,
      credor: item.credor,
      pagamento,
      percentagemDisponivel,
      tempoMeses,
    }
  })

  const totalPagamentoIdeal = pagamentoIdealDividas.reduce(
    (total, item) => total + Number(item.pagamento || 0),
    0
  )

  const sobraPagamentoIdeal = Math.max(0, disponivelParaDividas) - totalPagamentoIdeal

  const despesasGrafico = despesasApi.map((item) => ({
    id: item.id,
    name: item.categoria,
    orcamentado: Number(item.orcamentado || 0),
    realizado: Number(item.realizado || 0),
    percentagem: item.percentagem,
  }))

  const distribuicaoDespesas = despesasApi.map((item) => ({
    name: item.categoria,
    value: Number(item.realizado || 0),
    percent: totalDespesasRealizado > 0
      ? formatarPercentagem((Number(item.realizado || 0) / totalDespesasRealizado) * 100)
      : "0,0%",
  }))

  function adicionarRendimentoNaTabela(novo) {
    setRendimentosApi((listaAtual) => [
      ...listaAtual,
      {
        id: novo.id,
        fonte: novo.fonte,
        orcamentado: Number(novo.orcamentado || 0),
        recebido: Number(novo.recebido || 0),
      },
    ])
  }

  function iniciarEdicaoRendimento(item) {
    setRendimentoEditando(item)
  }

  function cancelarEdicaoRendimento() {
    setRendimentoEditando(null)
  }

  function atualizarRendimentoNaTabela(atualizado) {
    setRendimentosApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizado.id
          ? {
              id: atualizado.id,
              fonte: atualizado.fonte,
              orcamentado: Number(atualizado.orcamentado || 0),
              recebido: Number(atualizado.recebido || 0),
            }
          : item
      )
    )

    setRendimentoEditando(null)
  }

  function apagarRendimento(id) {
    fetch(`/api/rendimentos?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Rendimento apagado:", data)

        if (data.status === "ok") {
          setRendimentosApi((listaAtual) =>
            listaAtual.filter((item) => item.id !== id)
          )

          if (rendimentoEditando?.id === id) {
            setRendimentoEditando(null)
          }
        }
      })
      .catch((err) => {
        console.error("Erro ao apagar rendimento:", err)
      })
  }

  function adicionarDespesaNaTabela(nova) {
    setDespesasApi((listaAtual) => [
      ...listaAtual,
      {
        id: nova.id,
        categoria: nova.categoria,
        orcamentado: Number(nova.orcamentado || 0),
        realizado: Number(nova.realizado || 0),
        percentagem: nova.percentagem || "0%",
      },
    ])
  }

  function iniciarEdicaoDespesa(item) {
    setDespesaEditando(item)
  }

  function cancelarEdicaoDespesa() {
    setDespesaEditando(null)
  }

  function atualizarDespesaNaTabela(atualizada) {
    setDespesasApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizada.id
          ? {
              id: atualizada.id,
              categoria: atualizada.categoria,
              orcamentado: Number(atualizada.orcamentado || 0),
              realizado: Number(atualizada.realizado || 0),
              percentagem: atualizada.percentagem || "0%",
            }
          : item
      )
    )

    setDespesaEditando(null)
  }

  function apagarDespesa(id) {
    fetch(`/api/despesas?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Despesa apagada:", data)

        if (data.status === "ok") {
          setDespesasApi((listaAtual) =>
            listaAtual.filter((item) => item.id !== id)
          )

          if (despesaEditando?.id === id) {
            setDespesaEditando(null)
          }
        }
      })
      .catch((err) => {
        console.error("Erro ao apagar despesa:", err)
      })
  }

  function adicionarDividaNaTabela(nova) {
    setDividasApi((listaAtual) => [
      ...listaAtual,
      {
        id: nova.id,
        credor: nova.credor,
        saldo: Number(nova.saldo || 0),
        progresso: Number(nova.progresso || 0),
        juros: nova.juros || "0%",
        prioridade: nova.prioridade || "Baixa",
      },
    ])
  }

  function iniciarEdicaoDivida(item) {
    setDividaEditando(item)
  }

  function cancelarEdicaoDivida() {
    setDividaEditando(null)
  }

  function atualizarDividaNaTabela(atualizada) {
    setDividasApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizada.id
          ? {
              id: atualizada.id,
              credor: atualizada.credor,
              saldo: Number(atualizada.saldo || 0),
              progresso: Number(atualizada.progresso || 0),
              juros: atualizada.juros || "0%",
              prioridade: atualizada.prioridade || "Baixa",
            }
          : item
      )
    )

    setDividaEditando(null)
  }

  function apagarDivida(id) {
    fetch(`/api/dividas?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dívida apagada:", data)

        if (data.status === "ok") {
          setDividasApi((listaAtual) =>
            listaAtual.filter((item) => item.id !== id)
          )

          if (dividaEditando?.id === id) {
            setDividaEditando(null)
          }
        }
      })
      .catch((err) => {
        console.error("Erro ao apagar dívida:", err)
      })
  }

  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#0f172a]">
      <Sidebar />

      <div className="ml-[242px] p-4 grid grid-cols-[1fr_286px] gap-4">
        <main className="space-y-4">
          <section className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr_1fr] gap-3">
            <HealthCard />
            <KpiCard icon="💼" title="Salário Líquido" value={formatarEuro(totalRecebido)} accent="blue" showBar />
            <KpiCard icon="🧾" title="Total Despesas" value={formatarEuro(totalDespesasRealizado)} subtitle={`${formatarPercentagem(percentagemDespesasSalario)} do salário`} accent="red" />
            <KpiCard icon="💸" title="Disponível p/ Dívidas" value={formatarEuro(disponivelParaDividas)} subtitle={`${formatarPercentagem(totalRecebido > 0 ? (disponivelParaDividas / totalRecebido) * 100 : 0)} do salário`} accent="green" green />
            <KpiCard icon="🏦" title="Total Dívidas" value={formatarEuro(totalDividas)} subtitle={`Pagamento ideal: ${formatarEuro(totalPagamentoIdeal)}`} accent="purple" />
            <KpiCard icon="🗓️" title="Dias Restantes" value="17" subtitle="até 31/05/2024" accent="orange" />
          </section>

          <section className="grid grid-cols-[1.2fr_1fr_1fr] gap-4">
            <ChartBox title="Orçamentado vs Realizado (Despesas)">
              <div className="flex justify-center gap-5 text-[10px] font-bold mb-1">
                <span className="text-blue-700">■ Orçamentado</span>
                <span className="text-green-600">■ Realizado</span>
              </div>
              <ResponsiveContainer width="100%" height={205}>
                <BarChart data={despesasGrafico} layout="vertical" barGap={2}>
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
                      <Pie data={distribuicaoDespesas} dataKey="value" innerRadius={56} outerRadius={86}>
                        {distribuicaoDespesas.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                    <div className="font-black text-blue-950">
                      {formatarEuro(totalDespesasRealizado)}
                      <div className="text-[10px]">Total</div>
                    </div>
                  </div>
                </div>
                <LegendList items={distribuicaoDespesas} colors={COLORS} />
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
                <LegendList items={renda} colors={renda.map((i) => i.color)} />
              </div>
            </ChartBox>
          </section>

          <section className="grid grid-cols-4 gap-4">
            <div>
              <TableCard title="Rendimentos" color="bg-emerald-700">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-1.5 text-left">Fonte</th>
                    <th className="p-1.5">Orçamentado</th>
                    <th className="p-1.5">Recebido</th>
                    <th className="p-1.5">Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {rendimentosApi.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="p-1.5 font-semibold">{item.fonte}</td>
                      <td className="p-1.5 text-center">{formatarEuro(item.orcamentado)}</td>
                      <td className="p-1.5 text-center">{formatarEuro(item.recebido)}</td>
                      <td className="p-1.5 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => iniciarEdicaoRendimento(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => apagarRendimento(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Apagar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-emerald-50 font-black">
                    <td className="p-1.5">TOTAL</td>
                    <td className="p-1.5 text-center">{formatarEuro(totalOrcamentado)}</td>
                    <td className="p-1.5 text-center">{formatarEuro(totalRecebido)}</td>
                    <td className="p-1.5"></td>
                  </tr>
                </tbody>
              </TableCard>

              <AddRendimentoForm
                onAdicionar={adicionarRendimentoNaTabela}
                rendimentoEditando={rendimentoEditando}
                onAtualizar={atualizarRendimentoNaTabela}
                onCancelarEdicao={cancelarEdicaoRendimento}
              />
            </div>

            <div>
              <TableCard title="Despesas Mensais" color="bg-blue-700">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-1.5 text-left">Categoria</th>
                    <th className="p-1.5">Orçamentado</th>
                    <th className="p-1.5">Realizado</th>
                    <th className="p-1.5">%</th>
                    <th className="p-1.5">Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {despesasApi.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="p-1.5 font-semibold">{item.categoria}</td>
                      <td className="p-1.5 text-center">{formatarEuro(item.orcamentado)}</td>
                      <td className="p-1.5 text-center">{formatarEuro(item.realizado)}</td>
                      <td className="p-1.5 text-center text-blue-700 font-bold">
                        {totalRecebido > 0
                          ? formatarPercentagem((Number(item.realizado || 0) / totalRecebido) * 100)
                          : item.percentagem}
                      </td>
                      <td className="p-1.5 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => iniciarEdicaoDespesa(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => apagarDespesa(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Apagar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-blue-50 font-black">
                    <td className="p-1.5">TOTAL</td>
                    <td className="p-1.5 text-center">{formatarEuro(totalDespesasOrcamentado)}</td>
                    <td className="p-1.5 text-center">{formatarEuro(totalDespesasRealizado)}</td>
                    <td className="p-1.5 text-center">
                      {formatarPercentagem(percentagemDespesasSalario)}
                    </td>
                    <td className="p-1.5"></td>
                  </tr>
                </tbody>
              </TableCard>

              <AddDespesaForm
                onAdicionar={adicionarDespesaNaTabela}
                despesaEditando={despesaEditando}
                onAtualizar={atualizarDespesaNaTabela}
                onCancelarEdicao={cancelarEdicaoDespesa}
              />
            </div>

            <div>
              <TableCard title="Dívidas" color="bg-purple-700">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-1 text-left">Credor</th>
                    <th className="p-1">Saldo</th>
                    <th className="p-1">Prog.</th>
                    <th className="p-1">Juros</th>
                    <th className="p-1">Prior.</th>
                    <th className="p-1">Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {dividasApi.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 text-[10px]">
                      <td className="p-1 font-semibold">{item.credor}</td>
                      <td className="p-1 text-center">{formatarEuro(item.saldo)}</td>
                      <td className="p-1 text-center">{Number(item.progresso || 0)}%</td>
                      <td className="p-1 text-center">{item.juros}</td>
                      <td className="p-1 text-center text-red-500 font-bold">{item.prioridade}</td>
                      <td className="p-1 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => iniciarEdicaoDivida(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => apagarDivida(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Apagar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-purple-100 font-black text-[10px]">
                    <td className="p-1.5">TOTAL DAS DÍVIDAS</td>
                    <td className="p-1.5 text-center" colSpan="5">{formatarEuro(totalDividas)}</td>
                  </tr>
                </tbody>
              </TableCard>

              <AddDividaForm
                onAdicionar={adicionarDividaNaTabela}
                dividaEditando={dividaEditando}
                onAtualizar={atualizarDividaNaTabela}
                onCancelarEdicao={cancelarEdicaoDivida}
              />
            </div>

            <TableCard title="Pagamento Ideal das Dívidas" color="bg-green-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-1 text-left">Credor</th>
                  <th className="p-1">Pagamento</th>
                  <th className="p-1">% Disp.</th>
                  <th className="p-1">Tempo</th>
                </tr>
              </thead>
              <tbody>
                {pagamentoIdealDividas.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 text-[10px]">
                    <td className="p-1 font-semibold">{item.credor}</td>
                    <td className="p-1 text-center">{formatarEuro(item.pagamento)}</td>
                    <td className="p-1 text-center">{formatarPercentagem(item.percentagemDisponivel)}</td>
                    <td className="p-1 text-center">{item.tempoMeses} meses</td>
                  </tr>
                ))}

                <tr className="bg-green-100 font-black text-[10px]">
                  <td className="p-1.5">TOTAL DISTRIBUÍDO</td>
                  <td className="p-1.5 text-center">{formatarEuro(totalPagamentoIdeal)}</td>
                  <td className="p-1.5 text-center">100%</td>
                  <td className="p-1.5"></td>
                </tr>
                <tr className="bg-green-50 font-black text-[10px]">
                  <td className="p-1.5">SOBRA / FOLGA</td>
                  <td className="p-1.5 text-center">{formatarEuro(sobraPagamentoIdeal)}</td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                </tr>
              </tbody>
            </TableCard>
          </section>

          <section className="grid grid-cols-[330px_1fr] gap-3">
            <SimulatorCard />
            <DebtEvolutionCard />
          </section>
        </main>

        <aside className="space-y-4">
          <GoalsPanel />

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
function AddRendimentoForm({
  onAdicionar,
  rendimentoEditando,
  onAtualizar,
  onCancelarEdicao,
}) {
  const [fonte, setFonte] = React.useState("")
  const [orcamentado, setOrcamentado] = React.useState("")
  const [recebido, setRecebido] = React.useState("")

  const modoEdicao = Boolean(rendimentoEditando)

  React.useEffect(() => {
    if (rendimentoEditando) {
      setFonte(rendimentoEditando.fonte || "")
      setOrcamentado(String(rendimentoEditando.orcamentado || 0))
      setRecebido(String(rendimentoEditando.recebido || 0))
    }
  }, [rendimentoEditando])

  function limparFormulario() {
    setFonte("")
    setOrcamentado("")
    setRecebido("")
  }

  function guardarRendimento(e) {
    e.preventDefault()

    const dadosRendimento = {
      fonte,
      orcamentado: Number(orcamentado),
      recebido: Number(recebido),
    }

    const url = modoEdicao
      ? `/api/rendimentos?id=${rendimentoEditando.id}`
      : "/api/rendimentos"

    const method = modoEdicao ? "PUT" : "POST"

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosRendimento),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          modoEdicao ? "Rendimento atualizado:" : "Rendimento adicionado:",
          data
        )

        if (data.status === "ok") {
          if (modoEdicao && typeof onAtualizar === "function") {
            onAtualizar(data.data)
          }

          if (!modoEdicao && typeof onAdicionar === "function") {
            onAdicionar(data.data)
          }

          limparFormulario()
        }
      })
      .catch((err) => {
        console.error("Erro ao guardar rendimento:", err)
      })
  }

  function cancelarEdicao() {
    limparFormulario()

    if (typeof onCancelarEdicao === "function") {
      onCancelarEdicao()
    }
  }

  return (
    <form onSubmit={guardarRendimento} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-emerald-700 mb-3">
        {modoEdicao ? "Editar Rendimento" : "Adicionar Rendimento"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Fonte"
        value={fonte}
        onChange={(e) => setFonte(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Orçamentado"
        type="number"
        value={orcamentado}
        onChange={(e) => setOrcamentado(e.target.value)}
      />

      <input
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        placeholder="Recebido"
        type="number"
        value={recebido}
        onChange={(e) => setRecebido(e.target.value)}
      />

      <button className="w-full rounded-lg bg-emerald-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={cancelarEdicao}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
  )
}


function AddDespesaForm({
  onAdicionar,
  despesaEditando,
  onAtualizar,
  onCancelarEdicao,
}) {
  const [categoria, setCategoria] = React.useState("")
  const [orcamentado, setOrcamentado] = React.useState("")
  const [realizado, setRealizado] = React.useState("")

  const modoEdicao = Boolean(despesaEditando)

  React.useEffect(() => {
    if (despesaEditando) {
      setCategoria(despesaEditando.categoria || "")
      setOrcamentado(String(despesaEditando.orcamentado || 0))
      setRealizado(String(despesaEditando.realizado || 0))
    }
  }, [despesaEditando])

  function limparFormulario() {
    setCategoria("")
    setOrcamentado("")
    setRealizado("")
  }

  function guardarDespesa(e) {
    e.preventDefault()

    const dadosDespesa = {
      categoria,
      orcamentado: Number(orcamentado),
      realizado: Number(realizado),
      percentagem: "0%",
    }

    const url = modoEdicao
      ? `/api/despesas?id=${despesaEditando.id}`
      : "/api/despesas"

    const method = modoEdicao ? "PUT" : "POST"

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosDespesa),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          modoEdicao ? "Despesa atualizada:" : "Despesa adicionada:",
          data
        )

        if (data.status === "ok") {
          if (modoEdicao && typeof onAtualizar === "function") {
            onAtualizar(data.data)
          }

          if (!modoEdicao && typeof onAdicionar === "function") {
            onAdicionar(data.data)
          }

          limparFormulario()
        }
      })
      .catch((err) => {
        console.error("Erro ao guardar despesa:", err)
      })
  }

  function cancelarEdicao() {
    limparFormulario()

    if (typeof onCancelarEdicao === "function") {
      onCancelarEdicao()
    }
  }

  return (
    <form onSubmit={guardarDespesa} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-blue-700 mb-3">
        {modoEdicao ? "Editar Despesa" : "Adicionar Despesa"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Orçamentado"
        type="number"
        value={orcamentado}
        onChange={(e) => setOrcamentado(e.target.value)}
      />

      <input
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        placeholder="Realizado"
        type="number"
        value={realizado}
        onChange={(e) => setRealizado(e.target.value)}
      />

      <button className="w-full rounded-lg bg-blue-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={cancelarEdicao}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
  )
}


function AddDividaForm({
  onAdicionar,
  dividaEditando,
  onAtualizar,
  onCancelarEdicao,
}) {
  const [credor, setCredor] = React.useState("")
  const [saldo, setSaldo] = React.useState("")
  const [progresso, setProgresso] = React.useState("")
  const [juros, setJuros] = React.useState("")
  const [prioridade, setPrioridade] = React.useState("Baixa")

  const modoEdicao = Boolean(dividaEditando)

  React.useEffect(() => {
    if (dividaEditando) {
      setCredor(dividaEditando.credor || "")
      setSaldo(String(dividaEditando.saldo || 0))
      setProgresso(String(dividaEditando.progresso || 0))
      setJuros(dividaEditando.juros || "0%")
      setPrioridade(dividaEditando.prioridade || "Baixa")
    }
  }, [dividaEditando])

  function limparFormulario() {
    setCredor("")
    setSaldo("")
    setProgresso("")
    setJuros("")
    setPrioridade("Baixa")
  }

  function guardarDivida(e) {
    e.preventDefault()

    const dadosDivida = {
      credor,
      saldo: Number(saldo),
      progresso: Number(progresso),
      juros,
      prioridade,
    }

    const url = modoEdicao
      ? `/api/dividas?id=${dividaEditando.id}`
      : "/api/dividas"

    const method = modoEdicao ? "PUT" : "POST"

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosDivida),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          modoEdicao ? "Dívida atualizada:" : "Dívida adicionada:",
          data
        )

        if (data.status === "ok") {
          if (modoEdicao && typeof onAtualizar === "function") {
            onAtualizar(data.data)
          }

          if (!modoEdicao && typeof onAdicionar === "function") {
            onAdicionar(data.data)
          }

          limparFormulario()
        }
      })
      .catch((err) => {
        console.error("Erro ao guardar dívida:", err)
      })
  }

  function cancelarEdicao() {
    limparFormulario()

    if (typeof onCancelarEdicao === "function") {
      onCancelarEdicao()
    }
  }

  return (
    <form onSubmit={guardarDivida} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-purple-700 mb-3">
        {modoEdicao ? "Editar Dívida" : "Adicionar Dívida"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Credor"
        value={credor}
        onChange={(e) => setCredor(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Saldo"
        type="number"
        value={saldo}
        onChange={(e) => setSaldo(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Progresso (%)"
        type="number"
        value={progresso}
        onChange={(e) => setProgresso(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Juros"
        value={juros}
        onChange={(e) => setJuros(e.target.value)}
      />

      <select
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value)}
      >
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>

      <button className="w-full rounded-lg bg-purple-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={cancelarEdicao}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
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
              className={`flex items-center gap-3 rounded-[11px] px-3 py-[7px] text-[13px] font-black transition-all ${index === 0
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