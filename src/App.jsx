import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Sun, Moon, Wallet, CreditCard,
  ArrowDownRight, AlertTriangle, Target, LineChart,
  LayoutDashboard, Receipt, Calendar, Settings,
  CheckCircle2, Euro, BarChart3, PieChart as PieIcon
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
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 font-bold">
      Carregando Dashboard Premium...
    </div>
  );

  const formatMoney = (val) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: data?.moeda?.codigo || 'EUR' }).format(val);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#6366f1'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6 hidden xl:flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-blue-600 p-2 rounded-xl"><TrendingUp size={24} /></div>
          <span className="font-black text-xl tracking-tighter text-white uppercase">Financeiro</span>
        </div>
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Despesas', 'Dívidas', 'Objetivos', 'Configurações'].map(item => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === item ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {item}
            </button>
          ))}
        </nav>
        <div className="mt-auto bg-white/5 p-5 rounded-[1.5rem] border border-white/10">
          <div className="flex justify-between text-xs font-bold mb-3">
            <span className="text-slate-400 uppercase tracking-wider text-[9px]">Saúde Financeira</span>
            <span className="text-emerald-400">{data.resumo.indice}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${data.resumo.indice}%` }} className="h-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      <main className="xl:ml-64 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black tracking-tight tracking-tighter">Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5">
            {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-blue-600"/>}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {l: 'Disponível', v: data.resumo.disponivelDividas, c: 'bg-emerald-500/10 text-emerald-500'},
            {l: 'Despesas', v: data.resumo.totalDespesas, c: 'bg-rose-500/10 text-rose-500'},
            {l: 'Dívidas', v: data.resumo.totalDividas, c: 'bg-amber-500/10 text-amber-500'},
            {l: 'Salário', v: data.salarioLiquido, c: 'bg-blue-500/10 text-blue-500'}
          ].map((k, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-white/5">
              <div className={`w-10 h-10 ${k.c.split(' ')[0]} rounded-2xl mb-4 flex items-center justify-center ${k.c.split(' ')[1]}`}> <Wallet size={20}/> </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{k.l}</p>
              <h2 className="text-2xl font-black">{formatMoney(k.v)}</h2>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5">
             <h3 className="text-lg font-bold mb-8">Evolução da Dívida</h3>
             <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data.resumo.evolucaoDivida.slice(0, 15)}>
                 <defs><linearGradient id="colorD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                 <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                 <XAxis dataKey="mes" hide /> <YAxis hide /> <Tooltip cursor={{stroke: '#3b82f6', strokeWidth: 2}} />
                 <Area type="monotone" dataKey="divida" stroke="#3b82f6" fill="url(#colorD)" strokeWidth={4} />
               </AreaChart>
             </ResponsiveContainer></div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5">
             <h3 className="text-lg font-bold mb-8">Orçamentado vs Realizado</h3>
             <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%">
               <BarChart data={data.despesas.slice(0, 5)}>
                 <XAxis dataKey="categoria" axisLine={false} tickLine={false} tick={{fontSize: 10}} /> <YAxis hide /> <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="orcamentado" fill="#94a3b8" radius={[6, 6, 0, 0]} opacity={0.2} />
                 <Bar dataKey="realizado" fill="#3b82f6" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><PieIcon size={18} className="text-rose-500"/> Despesas</h3>
              <div className="h-48"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.despesas.slice(0,5)} innerRadius={60} outerRadius={80} dataKey="realizado" nameKey="categoria">{data.despesas.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Target size={18} className="text-emerald-500"/> Objetivos</h3>
              <div className="space-y-4">
                 {data.objetivos.slice(0,3).map(o => (
                    <div key={o.nome}><div className="flex justify-between text-[10px] font-bold mb-1"><span>{o.nome}</span><span>{(o.atual/o.objetivo*100).toFixed(0)}%</span></div>
                    <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{width: `${o.atual/o.objetivo*100}%`}}></div></div></div>
                 ))}
              </div>
           </div>
           <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-600/30 text-white flex flex-col justify-between">
              <h3 className="text-lg font-bold">Simulador</h3>
              <div className="text-center py-4"><span className="text-6xl font-black">{data.resumo.mesesSemDivida}</span><span className="text-xl font-bold ml-2 opacity-80 text-blue-100 uppercase">Meses</span></div>
              <button onClick={fetchData} className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black text-xs hover:bg-blue-50 transition-colors">RECALCULAR</button>
           </div>
        </div>
      </main>
    </div>
  );
};
export default App;
