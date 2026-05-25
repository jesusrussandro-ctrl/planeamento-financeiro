import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", divida: 5000 },
  { name: "Fev", divida: 4200 },
  { name: "Mar", divida: 3600 },
  { name: "Abr", divida: 2900 },
  { name: "Mai", divida: 2100 },
];

const pieData = [
  { name: "Renda", value: 1200 },
  { name: "Comida", value: 500 },
  { name: "Transporte", value: 300 },
];

const COLORS = ["#3b82f6", "#f97316", "#9333ea"];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold">
            Planeamento Financeiro
          </h1>

          <p className="text-slate-400 mt-2">
            Dashboard Premium
          </p>
        </div>

        <button className="bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition">
          🌙
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-slate-400 mb-2">
            Saldo Atual
          </h2>

          <p className="text-4xl font-bold text-green-400">
            € 2.350
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-slate-400 mb-2">
            Despesas
          </h2>

          <p className="text-4xl font-bold text-red-400">
            € 1.800
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-slate-400 mb-2">
            Poupança
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            € 550
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Distribuição de Despesas
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Evolução da Dívida
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="divida"
                stroke="#2563eb"
                fill="#60a5fa"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}