import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Sun, Moon, Wallet, CreditCard,
  ArrowDownRight, AlertTriangle, Target, LineChart,
  LayoutDashboard, Receipt, Calendar, Settings,
  CheckCircle2, ChevronRight, Euro, BarChart3, PieChart as PieIcon
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

const API_URL = "/api/backend";

const App = () => {
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const fetchData = () => {
    fetch(API_URL).then(r => r.json()).then(setData).catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  if (!data) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  );

  const formatMoney = (val) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: data?.moeda?.codigo || 'EUR' }).format(val);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#6366f1'];

  const SidebarItem = ({ name, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === name ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={20} />
      <span className="font-semibold text-sm">{name}</span>
    </button>
  );

  const Card = ({ children, title, icon: Icon, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-white/5 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">{title}</h3>
          {Icon && <Icon size={20} className="text-slate-400" />}
        </div>
      )}
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6 hidden xl:flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-blue-600 p-2 rounded-xl"><TrendingUp size={24} /></div>
          <span className="font-black text-xl tracking-tighter text-white">FINANCE.</span>
        </div>
        <nav className="flex flex-col gap-2">
          <SidebarItem name="Dashboard" icon={LayoutDashboard} />
          <SidebarItem name="Despesas" icon={Receipt} />
          <SidebarItem name="Dívidas" icon={CreditCard} />
          <SidebarItem name="Objetivos" icon={Target} />
          <SidebarItem name="Calendário" icon={Calendar} />
          <SidebarItem name="Definições" icon={Settings} />
        </nav>
        <div className="mt-auto bg-white/5 p-5 rounded-[1.5rem] border border-white/10">
          <div className="flex justify-between text-xs font-bold mb-3">
            <span className="text-slate-400 uppercase tracking-wider">Saúde Financeira</span>
            <span className="text-emerald-400">{data.resumo.indice}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${data.resumo.indice}%` }} className="h-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="xl:ml-64 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">Visão Geral</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Bem-vindo ao seu Planeamento de Maio 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 transition-transform hover:scale-105">
              {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-blue-600"/>}
            </button>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 pl-4 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
              <span className="text-sm font-bold">{data.moeda.codigo}</span>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600"><Euro size={16}/></div>
            </div>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {l: 'Salário Líquido', v: data.salarioLiquido, i: Wallet, c: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
            {l: 'Total Despesas', v: data.resumo.totalDespesas, i: ArrowDownRight, c: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
            {l: 'Dívida Total', v: data.resumo.totalDividas, i: CreditCard, c: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
            {l: 'Disponível', v: data.resumo.disponivelDividas, i: CheckCircle2, c: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' }
          ].map((k, idx) => (
            <Card key={idx}>
              <div className={`w-12 h-12 ${k.bg} ${k.c} rounded-2xl mb-5 flex items-center justify-center`}> <k.i size={24}/> </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{k.l}</p>
              <h2 className="text-3xl font-black tracking-tight">{formatMoney(k.v)}</h2>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card title="Evolução da Dívida" icon={LineChart}>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.resumo.evolucaoDivida.slice(0, 15)}>
                  <defs>
                    <linearGradient id="colorD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12, fill:'#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill:'#94a3b8'}} />
                  <Tooltip contentStyle={{ borderRadius:'16px', border:'none', boxShadow:'0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="divida" stroke="#3b82f6" fill="url(#colorD)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Orçamentado vs Realizado" icon={BarChart3}>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.despesas.filter(d => d.categoria !== 'Reserva').slice(0, 5)}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                  <XAxis dataKey="categoria" axisLine={false} tickLine={false} tick={{fontSize: 11, fill:'#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill:'#94a3b8'}} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius:'16px', border:'none' }} />
                  <Legend verticalAlign="top" align="right" iconType="circle" />
                  <Bar dataKey="orcamentado" name="Orçamento" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.3} />
                  <Bar dataKey="realizado" name="Realizado" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card title="Distribuição de Despesas" icon={PieIcon}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.despesas.slice(0, 5)} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="realizado" nameKey="categoria">
                    {data.despesas.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Distribuição de Renda" className="lg:col-span-1">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {n: 'Despesas', v: data.resumo.totalDespesas},
                      {n: 'Dívidas', v: data.resumo.disponivelDividas},
                      {n: 'Reserva', v: data.resumo.reserva}
                    ]}
                    innerRadius={0} outerRadius={80} dataKey="v" nameKey="n"
                  >
                    <Cell fill="#f43f5e" /><Cell fill="#10b981" /><Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Simulador de Tempo" className="bg-blue-600 dark:bg-blue-600 text-white border-none shadow-blue-600/30">
            <div className="flex flex-col h-full justify-between py-2">
              <p className="text-blue-100 font-medium">Tempo estimado para ficar livre de dívidas com base no seu plano atual.</p>
              <div className="text-center">
                <span className="text-7xl font-black tracking-tighter">{data.resumo.mesesSemDivida}</span>
                <span className="text-2xl font-bold ml-2 opacity-80">MESES</span>
              </div>
              <button onClick={fetchData} className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-sm transition-transform hover:scale-[1.02] active:scale-95">RECALCULAR</button>
            </div>
          </Card>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <Card title="Despesas Mensais">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase tracking-widest font-black border-b border-slate-100 dark:border-white/5">
                    <th className="py-4">Categoria</th>
                    <th className="py-4">Orçamento</th>
                    <th className="py-4">Gasto</th>
                    <th className="py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {data.despesas.slice(0, 6).map((d) => (
                    <tr key={d.categoria} className="text-sm font-bold">
                      <td className="py-4">{d.categoria}</td>
                      <td className="py-4 text-slate-400">{formatMoney(d.orcamentado)}</td>
                      <td className="py-4 ${d.realizado > d.orcamentado ? 'text-rose-500' : ''}">{formatMoney(d.realizado)}</td>
                      <td className="py-4 text-right">
                        <div className={`w-2 h-2 rounded-full ml-auto ${d.realizado > d.orcamentado ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Estratégia de Pagamento">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase tracking-widest font-black border-b border-slate-100 dark:border-white/5">
                    <th className="py-4">Credor</th>
                    <th className="py-4">Sugestão</th>
                    <th className="py-4">Tempo</th>
                    <th className="py-4 text-right">% Disponível</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {data.resumo.pagamentoIdeal.map((p) => (
                    <tr key={p.credor} className="text-sm font-bold">
                      <td className="py-4">{p.credor}</td>
                      <td className="py-4 text-blue-600">{formatMoney(p.pagamentoIdeal)}</td>
                      <td className="py-4 text-slate-400">{p.tempoEstimado} m</td>
                      <td className="py-4 text-right">{p.percentagemDisponivel}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* BottomRow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Objetivos" icon={Target}>
            <div className="space-y-6">
              {data.objetivos.map(o => (
                <div key={o.nome}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{o.nome}</span>
                    <span className="text-blue-600">{(o.atual/o.objetivo*100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{width:0}} animate={{width: `${(o.atual/o.objetivo*100)}%` }} className="h-full bg-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Alertas" icon={AlertTriangle}>
            <div className="space-y-4">
              {data.resumo.alertas.map((a, i) => (
                <div key={i} className={`p-4 rounded-2xl flex gap-3 ${a.tipo === 'Ótimo' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700'}`}>
                  <CheckCircle2 size={18} className="shrink-0" />
                  <div className="text-xs font-bold leading-relaxed">{a.texto}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Próximos Pagamentos" icon={Calendar}>
             <div className="space-y-4">
                {data.pagamentos.slice(0, 4).map(p => (
                  <div key={p.nome} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                    <div>
                      <div className="text-sm font-bold">{p.nome}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{p.data} • Em {p.dias} dias</div>
                    </div>
                    <div className="font-black text-rose-500">{formatMoney(p.valor)}</div>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;
