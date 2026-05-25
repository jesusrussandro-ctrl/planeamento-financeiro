import "./App.css"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts"

import {
  kpis,
  despesas,
  evolucaoDivida,
  objetivos,
  alertas,
} from "./data"

const COLORS = [
  "#3b82f6",
  "#f97316",
  "#9333ea",
  "#22c55e",
  "#eab308",
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#06122b] text-white flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#041028] p-6 border-r border-white/10">
        <h1 className="text-3xl font-bold mb-2">
          Planeamento Financeiro
        </h1>

        <p className="text-gray-400 mb-10">
          Controlo Financeiro Familiar
        </p>

        <nav className="space-y-3">
          {[
            "Resumo",
            "Rendimentos",
            "Despesas",
            "Dívidas",
            "Objetivos",
            "Relatórios",
            "Definições",
          ].map((item) => (
            <div
              key={item}
              className="bg-white/5 hover:bg-blue-600 transition p-3 rounded-xl cursor-pointer"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8 overflow-auto">

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-5 mb-8">
          {kpis.map((item) => (
            <div
              key={item.title}
              className="bg-white text-slate-900 rounded-2xl p-5 shadow-xl"
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                {item.title}
              </h3>

              <div className="text-3xl font-bold">
                {item.value}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* PIE */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Distribuição das Despesas
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={despesas}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                >
                  {despesas.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* AREA */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Evolução da Dívida
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={evolucaoDivida}>
                <XAxis dataKey="mes" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="divida"
                  stroke="#4f46e5"
                  fill="#818cf8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* OBJETIVOS + ALERTAS */}
        <div className="grid grid-cols-2 gap-6">

          {/* OBJETIVOS */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Objetivos Financeiros
            </h2>

            <div className="space-y-5">
              {objetivos.map((item) => (
                <div key={item.nome}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      {item.nome}
                    </span>

                    <span className="text-slate-500">
                      {item.valor}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{
                        width: `${item.progresso}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALERTAS */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Alertas e Conselhos
            </h2>

            <div className="space-y-4">
              {alertas.map((alerta, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 text-yellow-900 p-4 rounded-xl"
                >
                  {alerta}
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}