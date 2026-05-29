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

const MOEDAS = {
  EUR: { label: "EUR - Euro (€)", locale: "pt-PT", currency: "EUR", flag: "🇪🇺" },
  USD: { label: "USD - Dólar ($)", locale: "en-US", currency: "USD", flag: "🇺🇸" },
  GBP: { label: "GBP - Libra (£)", locale: "en-GB", currency: "GBP", flag: "🇬🇧" },
  BRL: { label: "BRL - Real (R$)", locale: "pt-BR", currency: "BRL", flag: "🇧🇷" },
  AOA: { label: "AOA - Kwanza (Kz)", locale: "pt-AO", currency: "AOA", flag: "🇦🇴" },
  CVE: { label: "CVE - Escudo cabo-verdiano ($)", locale: "pt-CV", currency: "CVE", flag: "🇨🇻" },
  MZN: { label: "MZN - Metical (MT)", locale: "pt-MZ", currency: "MZN", flag: "🇲🇿" },
  AED: { label: "AED - Dirham dos Emirados Árabes Unidos (د.إ)", locale: "ar-AE", currency: "AED", flag: "🇦🇪" },
}


const IDIOMAS = {
  pt: { label: "Português", flag: "🇵🇹", direction: "ltr" },
  en: { label: "English", flag: "🇬🇧", direction: "ltr" },
  fr: { label: "Français", flag: "🇫🇷", direction: "ltr" },
  es: { label: "Español", flag: "🇪🇸", direction: "ltr" },
  ar: { label: "العربية", flag: "🇦🇪", direction: "rtl" },
}


const TRADUCOES = {
  pt: {
    "menu.Resumo": "Resumo", "menu.Rendimentos": "Rendimentos", "menu.Poupança": "Poupança", "menu.Benefícios": "Benefícios", "menu.Despesas": "Despesas", "menu.Despesas Extras": "Despesas Extras", "menu.Dívidas": "Dívidas", "menu.Objetivos": "Objetivos", "menu.Calendário": "Calendário", "menu.Pagamentos": "Pagamentos", "menu.Simulador": "Simulador", "menu.Alertas": "Alertas", "menu.Relatórios": "Relatórios", "menu.Definições": "Definições",
    "app.title1": "Planeamento", "app.title2": "Financeiro", "app.subtitle": "Controlo Financeiro Familiar", "active.section": "Secção ativa", "month.active": "Mês ativo", "viewing": "A visualizar", "currency": "Moeda", "no.conversion": "Sem conversão cambial. Apenas formato visual.", "updated.at": "Atualizado em", "financial.health": "Saúde Financeira", "excellent": "Excelente",
    "kpi.health": "Índice de Saúde Financeira", "kpi.health.text": "A sua situação financeira está muito saudável!", "kpi.salary": "Salário Líquido", "kpi.salary.sub": "Total recebido no mês", "kpi.expenses": "Total Despesas", "kpi.savings": "Total Poupado", "kpi.savings.sub": "Guardado no mês", "kpi.availableDebts": "Disponível p/ Dívidas", "kpi.totalDebts": "Total Dívidas", "kpi.idealPayment": "Pagamento ideal", "kpi.daysLeft": "Dias Restantes", "until": "até", "of.salary": "do salário",
    "chart.expectedVsActual": "Previsto vs Realizado (Despesas)", "chart.distributionExpenses": "Distribuição das Despesas", "chart.distributionIncome": "Distribuição da Renda", "expected": "Previsto", "actual": "Realizado", "total": "Total",
    "table.income": "Rendimentos", "table.savings": "Poupança / Reserva", "table.benefits": "Benefícios / Cartões", "table.extraExpenses": "Despesas Extras", "extra.description": "Descrição", "extra.deductedIn": "Abatido em", "extra.date": "Data", "extra.state": "Estado", "extra.total": "TOTAL EXTRAS", "benefit.target": "Abate em", "benefit.value": "Valor", "benefit.used": "Usado", "benefit.available": "Disponível", "benefit.totalUsed": "TOTAL USADO", "benefit.totalAvailable": "TOTAL DISPONÍVEL", "table.expenses": "Despesas Mensais", "table.debts": "Dívidas", "table.idealDebts": "Pagamento Ideal das Dívidas", "add": "+ Adicionar", "close": "Fechar", "edit": "Editar", "delete": "Apagar", "action": "Ação", "source": "Fonte", "received": "Recebido", "type": "Tipo", "linkedGoal": "Objetivo ligado", "noLinkedGoal": "Sem ligação", "saved": "Guardado", "category": "Categoria", "percent": "%", "creditor": "Credor", "balance": "Saldo", "installment": "Prest.", "interest": "Juros", "priority": "Prior.", "status": "Estado", "pay": "Pagar", "paid": "Pago", "pending": "Pendente", "payment": "Pagamento", "time": "Tempo", "months": "meses", "distributed.total": "TOTAL DISTRIBUÍDO", "remaining": "SOBRA / FOLGA", "total.income": "TOTAL", "total.debts": "TOTAL DAS DÍVIDAS",
    "goals.title": "🎯 Objetivos Financeiros", "goals.new": "+ Novo", "goals.seeAll": "Ver todos os objetivos →", "goal.label": "Objetivo", "upcoming.payments": "Próximos Pagamentos", "alerts.title": "Alertas e Conselhos", "alerts.none": "Ainda não existem alertas para este mês.", "automatic": "Automático", "reports.title": "Relatórios", "reports.text": "Em seguida vamos adicionar resumo mensal, comparação entre meses e exportação.",
    "settings.general": "Definições Gerais", "settings.config": "Configuração", "settings.currencyDefault": "Moeda padrão", "settings.languageDefault": "Idioma padrão", "settings.monthActive": "Mês ativo", "settings.visualOnly": "Apenas muda o formato visual. Não faz conversão cambial.", "settings.languageHelp": "Altera o idioma visual da aplicação.", "settings.current": "Atual", "settings.rules": "Regras Financeiras", "settings.expenseLimit": "Limite despesas (%)", "settings.savingsGoal": "Meta poupança (%)", "settings.debtLimit": "Limite dívidas (%)", "settings.emergencyFund": "Fundo emergência (meses)", "settings.rulesHelp": "Estas regras alimentam os alertas automáticos e serão usadas para calcular a saúde financeira.", "settings.localData": "Dados Locais", "settings.export": "Exportar backup", "settings.import": "Importar backup", "settings.clear": "Limpar dados locais", "settings.localHelp": "Estes botões atuam apenas nos dados guardados neste navegador, como poupanças, objetivos, pagamentos, alertas e definições.", "settings.localSummary": "Resumo Local", "settings.totalReceived": "Total recebido", "settings.totalExpenses": "Total despesas", "settings.savingsSaved": "Poupança guardada", "settings.benefitsUsed": "Benefícios usados", "settings.extraExpenses": "Despesas extras", "settings.cashExpenses": "Despesas em dinheiro", "settings.manualAlerts": "Alertas manuais",
  },
  en: {
    "menu.Resumo": "Summary", "menu.Rendimentos": "Income", "menu.Poupança": "Savings", "menu.Benefícios": "Benefits", "menu.Despesas": "Expenses", "menu.Despesas Extras": "Extra Expenses", "menu.Dívidas": "Debts", "menu.Objetivos": "Goals", "menu.Calendário": "Calendar", "menu.Pagamentos": "Payments", "menu.Simulador": "Simulator", "menu.Alertas": "Alerts", "menu.Relatórios": "Reports", "menu.Definições": "Settings",
    "app.title1": "Financial", "app.title2": "Planning", "app.subtitle": "Family Financial Control", "active.section": "Active section", "month.active": "Active month", "viewing": "Viewing", "currency": "Currency", "no.conversion": "No exchange conversion. Visual format only.", "updated.at": "Updated at", "financial.health": "Financial Health", "excellent": "Excellent",
    "kpi.health": "Financial Health Index", "kpi.health.text": "Your financial situation is very healthy!", "kpi.salary": "Net Salary", "kpi.salary.sub": "Total received this month", "kpi.expenses": "Total Expenses", "kpi.savings": "Total Saved", "kpi.savings.sub": "Saved this month", "kpi.availableDebts": "Available for Debts", "kpi.totalDebts": "Total Debts", "kpi.idealPayment": "Ideal payment", "kpi.daysLeft": "Days Left", "until": "until", "of.salary": "of salary",
    "chart.expectedVsActual": "Expected vs Actual (Expenses)", "chart.distributionExpenses": "Expense Distribution", "chart.distributionIncome": "Income Distribution", "expected": "Expected", "actual": "Actual", "total": "Total",
    "table.income": "Income", "table.savings": "Savings / Reserve", "table.benefits": "Benefits / Cards", "table.extraExpenses": "Extra Expenses", "extra.description": "Description", "extra.date": "Date", "extra.state": "Status", "extra.total": "TOTAL EXTRA", "benefit.target": "Used for", "benefit.value": "Value", "benefit.used": "Used", "benefit.available": "Available", "benefit.totalUsed": "TOTAL USED", "benefit.totalAvailable": "TOTAL AVAILABLE", "table.expenses": "Monthly Expenses", "table.debts": "Debts", "table.idealDebts": "Ideal Debt Payment", "add": "+ Add", "close": "Close", "edit": "Edit", "delete": "Delete", "action": "Action", "source": "Source", "received": "Received", "type": "Type", "linkedGoal": "Linked goal", "noLinkedGoal": "No link", "saved": "Saved", "category": "Category", "percent": "%", "creditor": "Creditor", "balance": "Balance", "installment": "Inst.", "interest": "Interest", "priority": "Prior.", "status": "Status", "pay": "Pay", "paid": "Paid", "pending": "Pending", "payment": "Payment", "time": "Time", "months": "months", "distributed.total": "TOTAL DISTRIBUTED", "remaining": "REMAINING", "total.income": "TOTAL", "total.debts": "TOTAL DEBTS",
    "goals.title": "🎯 Financial Goals", "goals.new": "+ New", "goals.seeAll": "See all goals →", "goal.label": "Goal", "upcoming.payments": "Upcoming Payments", "alerts.title": "Alerts and Advice", "alerts.none": "There are no alerts for this month yet.", "automatic": "Automatic", "reports.title": "Reports", "reports.text": "Next we will add monthly summaries, month comparison and export.",
    "settings.general": "General Settings", "settings.config": "Configuration", "settings.currencyDefault": "Default currency", "settings.languageDefault": "Default language", "settings.monthActive": "Active month", "settings.visualOnly": "Only changes the visual format. No exchange conversion.", "settings.languageHelp": "Changes the application display language.", "settings.current": "Current", "settings.rules": "Financial Rules", "settings.expenseLimit": "Expense limit (%)", "settings.savingsGoal": "Savings goal (%)", "settings.debtLimit": "Debt limit (%)", "settings.emergencyFund": "Emergency fund (months)", "settings.rulesHelp": "These rules feed automatic alerts and will be used to calculate financial health.", "settings.localData": "Local Data", "settings.export": "Export backup", "settings.import": "Import backup", "settings.clear": "Clear local data", "settings.localHelp": "These buttons only affect data saved in this browser, such as savings, goals, payments, alerts and settings.", "settings.localSummary": "Local Summary", "settings.totalReceived": "Total received", "settings.totalExpenses": "Total expenses", "settings.savingsSaved": "Savings saved", "settings.benefitsUsed": "Benefits used", "settings.extraExpenses": "Extra expenses", "settings.cashExpenses": "Cash expenses", "settings.manualAlerts": "Manual alerts",
  },
  fr: { "menu.Resumo": "Résumé", "menu.Rendimentos": "Revenus", "menu.Poupança": "Épargne", "menu.Benefícios": "Avantages", "menu.Despesas": "Dépenses", "menu.Despesas Extras": "Dépenses extra", "menu.Dívidas": "Dettes", "menu.Objetivos": "Objectifs", "menu.Calendário": "Calendrier", "menu.Pagamentos": "Paiements", "menu.Simulador": "Simulateur", "menu.Alertas": "Alertes", "menu.Relatórios": "Rapports", "menu.Definições": "Paramètres", "settings.languageHelp": "Change la langue visuelle de l'application." },
  es: { "menu.Resumo": "Resumen", "menu.Rendimentos": "Ingresos", "menu.Poupança": "Ahorro", "menu.Benefícios": "Beneficios", "menu.Despesas": "Gastos", "menu.Despesas Extras": "Gastos extra", "menu.Dívidas": "Deudas", "menu.Objetivos": "Objetivos", "menu.Calendário": "Calendario", "menu.Pagamentos": "Pagos", "menu.Simulador": "Simulador", "menu.Alertas": "Alertas", "menu.Relatórios": "Informes", "menu.Definições": "Configuración", "settings.languageHelp": "Cambia el idioma visual de la aplicación." },
  ar: { "menu.Resumo": "الملخص", "menu.Rendimentos": "الدخل", "menu.Poupança": "الادخار", "menu.Benefícios": "المزايا", "menu.Despesas": "المصاريف", "menu.Despesas Extras": "مصاريف إضافية", "menu.Dívidas": "الديون", "menu.Objetivos": "الأهداف", "menu.Calendário": "التقويم", "menu.Pagamentos": "المدفوعات", "menu.Simulador": "المحاكي", "menu.Alertas": "التنبيهات", "menu.Relatórios": "التقارير", "menu.Definições": "الإعدادات", "settings.languageHelp": "يغير لغة عرض التطبيق." },
}

function traduzirTexto(idioma, chave) {
  return TRADUCOES[idioma]?.[chave] || TRADUCOES.pt[chave] || chave
}

const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

function obterMesAtual() {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, "0")
  return `${ano}-${mes}`
}

function gerarMesesFuturos(anosAFuturo = 5) {
  const hoje = new Date()
  const anoAtual = hoje.getFullYear()
  const mesAtualIndex = hoje.getMonth()
  const anos = []

  for (let ano = anoAtual; ano <= anoAtual + anosAFuturo; ano += 1) {
    const primeiroMes = ano === anoAtual ? mesAtualIndex : 0
    const meses = []

    for (let mesIndex = primeiroMes; mesIndex < 12; mesIndex += 1) {
      const valor = `${ano}-${String(mesIndex + 1).padStart(2, "0")}`
      meses.push({
        valor,
        label: `${NOMES_MESES[mesIndex]} ${ano}`,
      })
    }

    anos.push({ ano, meses })
  }

  return anos
}

function formatarMesAtivo(mes) {
  const [ano, mesNumero] = mes.split("-").map(Number)
  return `${NOMES_MESES[mesNumero - 1]} ${ano}`
}

function obterMesAnterior(mes) {
  const [ano, mesNumero] = mes.split("-").map(Number)
  const data = new Date(ano, mesNumero - 2, 1)
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`
}

const MESES_FUTUROS = gerarMesesFuturos(5)


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

const OBJETIVOS_INICIAIS = [
  { id: 1, icone: "💵", nome: "Fundo de Emergência", objetivo: 3000, atual: 2100, cor: "bg-green-500" },
  { id: 2, icone: "💳", nome: "Quitar Cartão de Crédito", objetivo: 5000, atual: 1000, cor: "bg-orange-500" },
  { id: 3, icone: "🏠", nome: "Entrada para Casa", objetivo: 15000, atual: 3750, cor: "bg-blue-500" },
  { id: 4, icone: "🚗", nome: "Nova Viatura", objetivo: 20000, atual: 6000, cor: "bg-purple-500" },
]

const PAGAMENTOS_INICIAIS = [
  { id: 1, dia: 1, nome: "Habitação", valor: 700, categoria: "Despesa fixa", pago: false },
  { id: 2, dia: 5, nome: "Cartão de Crédito", valor: 500, categoria: "Dívida", pago: false },
  { id: 3, dia: 7, nome: "Luz", valor: 85, categoria: "Despesa fixa", pago: false },
  { id: 4, dia: 12, nome: "Internet", valor: 35, categoria: "Despesa fixa", pago: false },
]

const POUPANCAS_INICIAIS = [
  { id: 1, tipo: "Fundo de Emergência", objetivoId: 1, previsto: 300, guardado: 200 },
  { id: 2, tipo: "Reserva Mensal", objetivoId: "", previsto: 150, guardado: 150 },
]

const BENEFICIOS_INICIAIS = [
  { id: 1, tipo: "Cartão Refeição", categoriaAlvo: "Alimentação", valor: 180 },
]

const DESPESAS_EXTRAS_INICIAIS = []

const ALERTAS_INICIAIS = []

const CONFIGURACOES_INICIAIS = {
  moedaPadrao: "EUR",
  idiomaPadrao: "pt",
  limiteDespesas: 60,
  metaPoupanca: 10,
  limiteDividas: 30,
  fundoEmergenciaMeses: 6,
  formatoVisual: "arredondado",
}

function lerLocalStorage(chave, valorPadrao) {
  if (typeof window === "undefined") return valorPadrao

  try {
    const valorGuardado = window.localStorage.getItem(chave)
    return valorGuardado ? JSON.parse(valorGuardado) : valorPadrao
  } catch (erro) {
    console.error(`Erro ao ler ${chave}:`, erro)
    return valorPadrao
  }
}

function guardarLocalStorage(chave, valor) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(chave, JSON.stringify(valor))
  } catch (erro) {
    console.error(`Erro ao guardar ${chave}:`, erro)
  }
}


export default function App() {
  const [rendimentosApi, setRendimentosApi] = React.useState([])
  const [rendimentoEditando, setRendimentoEditando] = React.useState(null)

  const [despesasApi, setDespesasApi] = React.useState([])
  const [despesaEditando, setDespesaEditando] = React.useState(null)

  const [dividasApi, setDividasApi] = React.useState([])
  const [dividaEditando, setDividaEditando] = React.useState(null)
  const [dividaPagamentoSelecionada, setDividaPagamentoSelecionada] = React.useState(null)
  const [pagamentosDividasApi, setPagamentosDividasApi] = React.useState([])

  const [mesAtivo, setMesAtivo] = React.useState(obterMesAtual())
  const [secaoAtiva, setSecaoAtiva] = React.useState("Resumo")
  const [moedaAtiva, setMoedaAtiva] = React.useState("EUR")
  const [considerarJurosSimulador, setConsiderarJurosSimulador] = React.useState(true)

  const [mostrarFormularioRendimento, setMostrarFormularioRendimento] = React.useState(false)
  const [mostrarFormularioDespesa, setMostrarFormularioDespesa] = React.useState(false)
  const [mostrarFormularioDivida, setMostrarFormularioDivida] = React.useState(false)
  const [mostrarFormularioPoupanca, setMostrarFormularioPoupanca] = React.useState(false)

  const [poupancasUsuario, setPoupancasUsuario] = React.useState(() =>
    lerLocalStorage("poupancasUsuario", POUPANCAS_INICIAIS)
  )
  const [poupancaEditando, setPoupancaEditando] = React.useState(null)

  const [beneficiosUsuario, setBeneficiosUsuario] = React.useState(() =>
    lerLocalStorage("beneficiosUsuario", BENEFICIOS_INICIAIS)
  )
  const [beneficioEditando, setBeneficioEditando] = React.useState(null)
  const [mostrarFormularioBeneficio, setMostrarFormularioBeneficio] = React.useState(false)

  const [despesasExtrasUsuario, setDespesasExtrasUsuario] = React.useState(() =>
    lerLocalStorage("despesasExtrasUsuario", DESPESAS_EXTRAS_INICIAIS)
  )
  const [despesaExtraEditando, setDespesaExtraEditando] = React.useState(null)
  const [mostrarFormularioDespesaExtra, setMostrarFormularioDespesaExtra] = React.useState(false)


  const [objetivosUsuario, setObjetivosUsuario] = React.useState(() =>
    lerLocalStorage("objetivosUsuario", OBJETIVOS_INICIAIS)
  )
  const [objetivoEditando, setObjetivoEditando] = React.useState(null)

  const [pagamentosUsuario, setPagamentosUsuario] = React.useState(() =>
    lerLocalStorage("pagamentosUsuario", PAGAMENTOS_INICIAIS)
  )
  const [pagamentoEditando, setPagamentoEditando] = React.useState(null)

  const [alertasUsuario, setAlertasUsuario] = React.useState(() =>
    lerLocalStorage("alertasUsuario", ALERTAS_INICIAIS)
  )
  const [alertaEditando, setAlertaEditando] = React.useState(null)

  const [configuracoesUsuario, setConfiguracoesUsuario] = React.useState(() =>
    lerLocalStorage("configuracoesUsuario", CONFIGURACOES_INICIAIS)
  )
  const [mensagemDefinicoes, setMensagemDefinicoes] = React.useState("")
  const [mesComparacaoRelatorio, setMesComparacaoRelatorio] = React.useState(() => obterMesAtual())

  const idiomaAtivo = configuracoesUsuario.idiomaPadrao || "pt"
  const t = React.useCallback((chave) => traduzirTexto(idiomaAtivo, chave), [idiomaAtivo])

  React.useEffect(() => {
    guardarLocalStorage("objetivosUsuario", objetivosUsuario)
  }, [objetivosUsuario])

  React.useEffect(() => {
    guardarLocalStorage("pagamentosUsuario", pagamentosUsuario)
  }, [pagamentosUsuario])

  React.useEffect(() => {
    guardarLocalStorage("alertasUsuario", alertasUsuario)
  }, [alertasUsuario])

  React.useEffect(() => {
    guardarLocalStorage("poupancasUsuario", poupancasUsuario)
  }, [poupancasUsuario])

  React.useEffect(() => {
    guardarLocalStorage("beneficiosUsuario", beneficiosUsuario)
  }, [beneficiosUsuario])

  React.useEffect(() => {
    guardarLocalStorage("despesasExtrasUsuario", despesasExtrasUsuario)
  }, [despesasExtrasUsuario])

  React.useEffect(() => {
    guardarLocalStorage("configuracoesUsuario", configuracoesUsuario)
  }, [configuracoesUsuario])

  React.useEffect(() => {
    if (typeof document === "undefined") return

    const codigoIdioma = configuracoesUsuario.idiomaPadrao || "pt"
    const idioma = IDIOMAS[codigoIdioma] || IDIOMAS.pt

    document.documentElement.lang = codigoIdioma
    document.documentElement.dir = idioma.direction || "ltr"
  }, [configuracoesUsuario.idiomaPadrao])

  React.useEffect(() => {
    fetch(`/api/rendimentos?mes=${mesAtivo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Rendimentos backend:", data)

        setRendimentosApi(
          data.data.map((item) => ({
            id: item.id,
            mes: item.mes || mesAtivo,
            fonte: item.fonte,
            orcamentado: Number(item.orcamentado || 0),
            recebido: Number(item.recebido || 0),
          }))
        )
      })
      .catch((err) => {
        console.error("Erro rendimentos:", err)
      })
  }, [mesAtivo])

  React.useEffect(() => {
    fetch(`/api/despesas?mes=${mesAtivo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Despesas backend:", data)

        setDespesasApi(
          data.data.map((item) => ({
            id: item.id,
            mes: item.mes || mesAtivo,
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
  }, [mesAtivo])

  function normalizarDivida(item) {
    const taxaBruta = item.taxaJuros ?? String(item.juros || "0").replace("%", "")

    return {
      id: item.id,
      mes: item.mes || mesAtivo,
      mesInicio: item.mesInicio || item.mes || mesAtivo,
      credor: item.credor,
      saldoInicial: Number(item.saldoInicial ?? item.saldo ?? 0),
      saldo: Number(item.saldo || 0),
      prestacaoMensal: Number(item.prestacaoMensal || 0),
      tipoJuros: item.tipoJuros || "mensal",
      taxaJuros: Number(taxaBruta || 0),
      progresso: Number(item.progresso || 0),
      juros: item.juros || `${Number(taxaBruta || 0)}%`,
      prioridade: item.prioridade || "Baixa",
      status: item.status || "ativa",
    }
  }

  function carregarDividasDoMes() {
    return fetch(`/api/dividas?mes=${mesAtivo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dívidas backend:", data)
        setDividasApi(data.data.map(normalizarDivida))
      })
      .catch((err) => {
        console.error("Erro dívidas:", err)
      })
  }

  function carregarPagamentosDividasDoMes() {
    return fetch(`/api/pagamentos-dividas?mes=${mesAtivo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Pagamentos de dívidas backend:", data)

        setPagamentosDividasApi(
          data.data.map((item) => ({
            id: item.id,
            dividaId: item.dividaId,
            mes: item.mes || mesAtivo,
            valorPago: Number(item.valorPago || 0),
            jurosPago: Number(item.jurosPago || 0),
            amortizacao: Number(item.amortizacao || 0),
            saldoAntes: Number(item.saldoAntes || 0),
            saldoDepois: Number(item.saldoDepois || 0),
          }))
        )
      })
      .catch((err) => {
        console.error("Erro pagamentos dívidas:", err)
      })
  }

  React.useEffect(() => {
    carregarDividasDoMes()
    carregarPagamentosDividasDoMes()
  }, [mesAtivo])

  function formatarEuro(valor) {
    const moeda = MOEDAS[moedaAtiva] || MOEDAS.EUR

    return new Intl.NumberFormat(moeda.locale, {
      style: "currency",
      currency: moeda.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(valor || 0))
  }

  function formatarPercentagem(valor) {
    return `${Number(valor || 0).toLocaleString("pt-PT", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`
  }

  function limitarPercentagem(valor) {
    return Math.max(0, Math.min(100, Number(valor || 0)))
  }

  function calcularTaxaMensalDivida(divida) {
    const taxa = Number(divida?.taxaJuros || 0) / 100
    const tipo = String(divida?.tipoJuros || "mensal").toLowerCase()

    if (tipo === "anual") {
      return Math.pow(1 + taxa, 1 / 12) - 1
    }

    return taxa
  }

  function simularQuitacaoDividas(dividasBase, valorMensalDisponivel, considerarJuros) {
    const valorMensal = Math.max(0, Number(valorMensalDisponivel || 0))

    const dividasSimuladas = dividasBase
      .filter((divida) => Number(divida.saldo || 0) > 0)
      .map((divida) => ({
        id: divida.id,
        credor: divida.credor,
        saldo: Number(divida.saldo || 0),
        taxaMensal: calcularTaxaMensalDivida(divida),
      }))

    const totalInicial = dividasSimuladas.reduce((total, divida) => total + divida.saldo, 0)

    if (totalInicial <= 0) {
      return {
        meses: 0,
        estrategia: considerarJuros ? "Avalanche" : "Bola de Neve",
        jurosEstimados: 0,
        dadosGrafico: [{ mes: "Mês 0", divida: 0, projecao: 0, sombra: 0 }],
      }
    }

    if (valorMensal <= 0) {
      return {
        meses: 0,
        estrategia: considerarJuros ? "Avalanche" : "Bola de Neve",
        jurosEstimados: 0,
        dadosGrafico: [{ mes: "Mês 0", divida: totalInicial, projecao: totalInicial, sombra: totalInicial * 0.55 }],
      }
    }

    let mesAtual = 0
    let jurosEstimados = 0
    const dadosGrafico = [
      {
        mes: "Mês 0",
        divida: Math.round(totalInicial),
        projecao: Math.round(totalInicial),
        sombra: Math.round(totalInicial * 0.55),
      },
    ]

    while (
      dividasSimuladas.some((divida) => divida.saldo > 0.01) &&
      mesAtual < 360
    ) {
      mesAtual += 1

      if (considerarJuros) {
        dividasSimuladas.forEach((divida) => {
          if (divida.saldo > 0) {
            const jurosMes = divida.saldo * divida.taxaMensal
            divida.saldo += jurosMes
            jurosEstimados += jurosMes
          }
        })
      }

      let valorRestante = valorMensal

      const dividasOrdenadas = [...dividasSimuladas]
        .filter((divida) => divida.saldo > 0.01)
        .sort((a, b) => {
          if (considerarJuros) {
            return b.taxaMensal - a.taxaMensal || a.saldo - b.saldo
          }

          return a.saldo - b.saldo
        })

      for (const divida of dividasOrdenadas) {
        if (valorRestante <= 0) {
          break
        }

        const pagamento = Math.min(valorRestante, divida.saldo)
        divida.saldo -= pagamento
        valorRestante -= pagamento
      }

      const totalMes = dividasSimuladas.reduce((total, divida) => total + Math.max(0, divida.saldo), 0)

      dadosGrafico.push({
        mes: `Mês ${mesAtual}`,
        divida: Math.round(totalMes),
        projecao: Math.round(totalMes),
        sombra: Math.round(totalMes * 0.55),
      })

      if (totalMes <= 0.01) {
        break
      }
    }

    const intervalo = Math.max(1, Math.ceil(dadosGrafico.length / 12))
    const dadosCompactos = dadosGrafico.filter((item, index) => (
      index === 0 ||
      index === dadosGrafico.length - 1 ||
      index % intervalo === 0
    ))

    return {
      meses: mesAtual >= 360 ? 360 : mesAtual,
      estrategia: considerarJuros ? "Avalanche" : "Bola de Neve",
      jurosEstimados,
      dadosGrafico: dadosCompactos,
    }
  }


  function formatarTipoJuros(tipo) {
    return tipo === "anual" ? "Anual" : "Mensal"
  }

  function obterPagamentoDividaDoMes(dividaId) {
    return pagamentosDividasApi.find(
      (pagamento) => Number(pagamento.dividaId) === Number(dividaId)
    )
  }

  function ultimoDiaDoMes(mes) {
    const [ano, mesNumero] = mes.split("-").map(Number)
    return new Date(ano, mesNumero, 0).getDate()
  }

  function calcularDiasRestantes(mes) {
    const [ano, mesNumero] = mes.split("-").map(Number)
    const hoje = new Date()
    const ultimoDia = ultimoDiaDoMes(mes)

    if (ano === hoje.getFullYear() && mesNumero === hoje.getMonth() + 1) {
      return Math.max(0, ultimoDia - hoje.getDate() + 1)
    }

    if (ano > hoje.getFullYear() || (ano === hoje.getFullYear() && mesNumero > hoje.getMonth() + 1)) {
      return ultimoDia
    }

    return 0
  }

  const diasRestantesMesAtivo = calcularDiasRestantes(mesAtivo)
  const dataFimMesAtivo = `${ultimoDiaDoMes(mesAtivo)}/${mesAtivo.slice(5, 7)}/${mesAtivo.slice(0, 4)}`

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

  const despesasExtrasFinanceiras = despesasExtrasUsuario.map((item) => ({
    ...item,
    descricao: item.descricao || "",
    poupancaId: item.poupancaId || "",
    valor: Number(item.valor || 0),
    dia: Number(item.dia || 1),
    estado: item.estado || "realizada",
  }))

  const totalDespesasExtras = despesasExtrasFinanceiras.reduce(
    (total, item) => total + Number(item.valor || 0),
    0
  )

  const totalDespesasExtrasRealizadas = despesasExtrasFinanceiras.reduce(
    (total, item) => item.estado === "pendente" ? total : total + Number(item.valor || 0),
    0
  )

  const extrasAbatidasPorPoupanca = despesasExtrasFinanceiras.reduce((mapa, item) => {
    if (item.estado !== "pendente" && item.poupancaId) {
      const chave = String(item.poupancaId)
      mapa[chave] = (mapa[chave] || 0) + Number(item.valor || 0)
    }
    return mapa
  }, {})

  const totalDespesasExtrasAbatidasPoupanca = Object.values(extrasAbatidasPorPoupanca).reduce(
    (total, valor) => total + Number(valor || 0),
    0
  )

  const totalDespesasExtrasPagasComRendimento = Math.max(
    0,
    totalDespesasExtrasRealizadas - totalDespesasExtrasAbatidasPoupanca
  )

  const totalDespesasComExtras = totalDespesasRealizado + totalDespesasExtrasPagasComRendimento

  const beneficiosFinanceiros = (() => {
    const despesaDisponivelPorCategoria = despesasApi.reduce((mapa, despesa) => {
      const chave = String(despesa.categoria || "").trim().toLowerCase()
      mapa[chave] = (mapa[chave] || 0) + Number(despesa.realizado || 0)
      return mapa
    }, {})

    return beneficiosUsuario.map((item) => {
      const categoriaAlvo = item.categoriaAlvo || ""
      const chave = String(categoriaAlvo || "").trim().toLowerCase()
      const valor = Number(item.valor || 0)
      const valorUsado = Math.min(valor, Math.max(0, despesaDisponivelPorCategoria[chave] || 0))

      despesaDisponivelPorCategoria[chave] = Math.max(0, (despesaDisponivelPorCategoria[chave] || 0) - valorUsado)

      return {
        ...item,
        categoriaAlvo,
        valor,
        usado: valorUsado,
        disponivel: Math.max(0, valor - valorUsado),
      }
    })
  })()

  const totalBeneficios = beneficiosFinanceiros.reduce(
    (total, item) => total + Number(item.valor || 0),
    0
  )

  const totalBeneficiosUsados = beneficiosFinanceiros.reduce(
    (total, item) => total + Number(item.usado || 0),
    0
  )

  const totalBeneficiosDisponivel = beneficiosFinanceiros.reduce(
    (total, item) => total + Number(item.disponivel || 0),
    0
  )

  const totalDespesasEmDinheiro = Math.max(0, totalDespesasComExtras - totalBeneficiosUsados)

  const percentagemDespesasSalario = totalRecebido > 0
    ? (totalDespesasEmDinheiro / totalRecebido) * 100
    : 0

  const poupancasFinanceiras = poupancasUsuario.map((item) => {
    const guardadoBruto = Number(item.guardado || 0)
    const abatidoExtras = Number(extrasAbatidasPorPoupanca[String(item.id)] || 0)
    return {
      ...item,
      objetivoId: item.objetivoId || "",
      previsto: Number(item.previsto || 0),
      guardadoBruto,
      abatidoExtras,
      guardado: Math.max(0, guardadoBruto - abatidoExtras),
    }
  })

  const totalPoupancaPrevisto = poupancasFinanceiras.reduce(
    (total, item) => total + Number(item.previsto || 0),
    0
  )

  const totalPoupancaGuardado = poupancasFinanceiras.reduce(
    (total, item) => total + Number(item.guardado || 0),
    0
  )

  const percentagemPoupancaSalario = totalRecebido > 0
    ? (totalPoupancaGuardado / totalRecebido) * 100
    : 0

  const disponivelParaDividas = totalRecebido - totalDespesasEmDinheiro - totalPoupancaGuardado

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

  const objetivosFinanceiros = objetivosUsuario.map((objetivo) => {
    const objetivoValor = Number(objetivo.objetivo || 0)
    const valorBase = Number(objetivo.atual || 0)
    const poupancaLigada = poupancasFinanceiras
      .filter((poupanca) => String(poupanca.objetivoId || "") === String(objetivo.id))
      .reduce((total, poupanca) => total + Number(poupanca.guardado || 0), 0)
    const atualCalculado = valorBase + poupancaLigada

    return {
      ...objetivo,
      objetivo: objetivoValor,
      atualBase: valorBase,
      poupancaLigada,
      atual: atualCalculado,
      percentagem: objetivoValor > 0
        ? limitarPercentagem((atualCalculado / objetivoValor) * 100)
        : 0,
    }
  })

  const pagamentosFinanceiros = pagamentosUsuario.map((pagamento) => {
    const [ano, mesNumero] = mesAtivo.split("-").map(Number)
    const ultimoDia = new Date(ano, mesNumero, 0).getDate()
    const diaPagamento = Math.min(Number(pagamento.dia || 1), ultimoDia)
    const dataPagamento = new Date(ano, mesNumero - 1, diaPagamento)
    const hoje = new Date()
    const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    const dataSemHora = new Date(dataPagamento.getFullYear(), dataPagamento.getMonth(), dataPagamento.getDate())
    const diferencaDias = Math.ceil((dataSemHora - hojeSemHora) / (1000 * 60 * 60 * 24))

    let estado = "normal"
    let textoDias = `${diferencaDias} dias`

    if (pagamento.pago) {
      estado = "pago"
      textoDias = "Pago"
    } else if (diferencaDias < 0) {
      estado = "vencido"
      textoDias = "Vencido"
    } else if (diferencaDias === 0) {
      estado = "vence-hoje"
      textoDias = "Hoje"
    } else if (diferencaDias <= 5) {
      estado = "urgente"
      textoDias = `${diferencaDias} dias`
    }

    return {
      ...pagamento,
      valor: Number(pagamento.valor || 0),
      dia: diaPagamento,
      data: `${String(diaPagamento).padStart(2, "0")}/${String(mesNumero).padStart(2, "0")}`,
      diasRestantes: diferencaDias,
      textoDias,
      estado,
    }
  })

  const alertasAutomaticos = (() => {
    const alertas = []

    if (totalRecebido <= 0) {
      alertas.push({
        id: "auto-rendimentos",
        origem: "automatico",
        tipo: "aviso",
        titulo: "Rendimentos em falta",
        mensagem: "Adicione os rendimentos deste mês para calcular melhor a sua situação financeira.",
      })
    }

    if (percentagemDespesasSalario > Number(configuracoesUsuario.limiteDespesas || 60)) {
      alertas.push({
        id: "auto-despesas-altas",
        origem: "automatico",
        tipo: "urgente",
        titulo: "Despesas elevadas",
        mensagem: `As despesas estão acima de ${Number(configuracoesUsuario.limiteDespesas || 60)}% do salário. Reveja as categorias com maior peso.`,
      })
    } else if (totalDespesasRealizado > 0) {
      alertas.push({
        id: "auto-despesas-ok",
        origem: "automatico",
        tipo: "positivo",
        titulo: "Despesas controladas",
        mensagem: "As despesas estão controladas em relação ao salário deste mês.",
      })
    }

    const metaPoupancaPercentual = Number(configuracoesUsuario.metaPoupanca || 10)
    const poupancaRecomendada = totalRecebido * (metaPoupancaPercentual / 100)

    if (totalBeneficiosUsados > 0) {
      alertas.push({
        id: "auto-beneficios-usados",
        origem: "automatico",
        tipo: "positivo",
        titulo: "Benefícios aplicados",
        mensagem: `Foram usados ${formatarEuro(totalBeneficiosUsados)} em benefícios para reduzir despesas em dinheiro.`,
      })
    }

    if (totalDespesasExtrasRealizadas > 0) {
      alertas.push({
        id: "auto-despesas-extras",
        origem: "automatico",
        tipo: "aviso",
        titulo: "Despesas extras registadas",
        mensagem: `Existem ${formatarEuro(totalDespesasExtrasRealizadas)} em despesas extras realizadas neste mês.`,
      })
    }

    if (totalRecebido > 0 && totalPoupancaGuardado > totalRecebido) {
      alertas.push({
        id: "auto-poupanca-maior-rendimento",
        origem: "automatico",
        tipo: "urgente",
        titulo: "Poupança maior que o rendimento",
        mensagem: "A poupança guardada é maior do que o rendimento recebido neste mês. Verifique os lançamentos.",
      })
    } else if (totalRecebido > 0 && totalPoupancaGuardado < poupancaRecomendada) {
      alertas.push({
        id: "auto-poupanca-abaixo-meta",
        origem: "automatico",
        tipo: "aviso",
        titulo: "Poupança abaixo da meta",
        mensagem: `A meta de poupança é ${formatarEuro(poupancaRecomendada)} neste mês. Até agora guardou ${formatarEuro(totalPoupancaGuardado)}.`,
      })
    }

    if (Math.max(0, disponivelParaDividas) > 0 && totalDividas > 0) {
      alertas.push({
        id: "auto-dividas-disponivel",
        origem: "automatico",
        tipo: "conselho",
        titulo: "Redução de dívidas",
        mensagem: `Pode direcionar ${formatarEuro(Math.max(0, disponivelParaDividas))} para reduzir dívidas neste mês.`,
      })
    }

    const pagamentosUrgentes = pagamentosFinanceiros.filter((pagamento) =>
      !pagamento.pago && pagamento.diasRestantes >= 0 && pagamento.diasRestantes <= 5
    )

    if (pagamentosUrgentes.length > 0) {
      alertas.push({
        id: "auto-pagamentos-urgentes",
        origem: "automatico",
        tipo: "aviso",
        titulo: "Pagamentos próximos",
        mensagem: `Existem ${pagamentosUrgentes.length} pagamento(s) a vencer nos próximos 5 dias.`,
      })
    }

    const dividaJurosAlto = dividasApi.find((divida) => {
      const taxaMensal = calcularTaxaMensalDivida(divida) * 100
      return taxaMensal >= 3
    })

    if (dividaJurosAlto) {
      alertas.push({
        id: "auto-juros-altos",
        origem: "automatico",
        tipo: "urgente",
        titulo: "Juros elevados",
        mensagem: `Priorize "${dividaJurosAlto.credor}", pois tem juros elevados.`,
      })
    }

    const objetivoQuaseConcluido = objetivosFinanceiros.find((objetivo) => objetivo.percentagem >= 70)

    if (objetivoQuaseConcluido) {
      alertas.push({
        id: "auto-objetivo-quase",
        origem: "automatico",
        tipo: "positivo",
        titulo: "Objetivo quase concluído",
        mensagem: `Está perto de concluir o objetivo "${objetivoQuaseConcluido.nome}".`,
      })
    }

    return alertas.slice(0, 4)
  })()

  const alertasManuais = alertasUsuario.map((alerta) => ({
    ...alerta,
    origem: "manual",
  }))

  const alertasFinanceiros = [
    ...alertasAutomaticos,
    ...alertasManuais,
  ]

  function guardarObjetivo(dadosObjetivo) {
    const objetivoId = objetivoEditando?.id || Date.now()
    const valorAtualDesejado = Math.max(0, Number(dadosObjetivo.atual || 0))

    const objetivoNormalizado = {
      id: objetivoId,
      icone: dadosObjetivo.icone || "🎯",
      nome: dadosObjetivo.nome,
      objetivo: Number(dadosObjetivo.objetivo || 0),
      atual: 0,
      cor: dadosObjetivo.cor || "bg-green-500",
    }

    setObjetivosUsuario((listaAtual) => {
      if (objetivoEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(objetivoId) ? objetivoNormalizado : item
        )
      }

      return [...listaAtual, objetivoNormalizado]
    })

    setPoupancasUsuario((listaAtual) => {
      const objetivoIdTexto = String(objetivoId)
      const poupancasLigadas = listaAtual.filter(
        (item) => String(item.objetivoId || "") === objetivoIdTexto
      )

      if (poupancasLigadas.length === 0) {
        if (valorAtualDesejado <= 0) {
          return listaAtual
        }

        return [
          ...listaAtual,
          {
            id: Date.now() + 1,
            tipo: dadosObjetivo.nome || "Poupança ligada ao objetivo",
            objetivoId,
            previsto: 0,
            guardado: valorAtualDesejado,
          },
        ]
      }

      const totalGuardadoAtual = poupancasLigadas.reduce(
        (total, item) => total + Number(item.guardado || 0),
        0
      )
      const diferenca = valorAtualDesejado - totalGuardadoAtual

      if (diferenca >= 0) {
        let diferencaAplicada = false

        return listaAtual.map((item) => {
          if (String(item.objetivoId || "") !== objetivoIdTexto) {
            return item
          }

          if (!diferencaAplicada) {
            diferencaAplicada = true
            return {
              ...item,
              tipo: item.tipo || dadosObjetivo.nome || "Poupança ligada ao objetivo",
              guardado: Number(item.guardado || 0) + diferenca,
            }
          }

          return item
        })
      }

      let valorParaReduzir = Math.abs(diferenca)

      return listaAtual.map((item) => {
        if (String(item.objetivoId || "") !== objetivoIdTexto) {
          return item
        }

        if (valorParaReduzir <= 0) {
          return item
        }

        const guardadoAtual = Number(item.guardado || 0)
        const reducao = Math.min(guardadoAtual, valorParaReduzir)
        valorParaReduzir -= reducao

        return {
          ...item,
          guardado: Math.max(0, guardadoAtual - reducao),
        }
      })
    })

    setObjetivoEditando(null)
  }

  function apagarObjetivo(id) {
    setObjetivosUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(objetivoEditando?.id) === Number(id)) {
      setObjetivoEditando(null)
    }
  }

  function guardarPagamentoFinanceiro(dadosPagamento) {
    const pagamentoNormalizado = {
      id: pagamentoEditando?.id || Date.now(),
      dia: Number(dadosPagamento.dia || 1),
      nome: dadosPagamento.nome,
      valor: Number(dadosPagamento.valor || 0),
      categoria: dadosPagamento.categoria || "Geral",
      pago: Boolean(dadosPagamento.pago),
    }

    setPagamentosUsuario((listaAtual) => {
      if (pagamentoEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(pagamentoEditando.id) ? pagamentoNormalizado : item
        )
      }

      return [...listaAtual, pagamentoNormalizado]
    })

    setPagamentoEditando(null)
  }

  function apagarPagamentoFinanceiro(id) {
    setPagamentosUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(pagamentoEditando?.id) === Number(id)) {
      setPagamentoEditando(null)
    }
  }

  function alternarPagamentoPago(id) {
    setPagamentosUsuario((listaAtual) =>
      listaAtual.map((item) =>
        Number(item.id) === Number(id)
          ? { ...item, pago: !item.pago }
          : item
      )
    )
  }

  function guardarAlertaManual(dadosAlerta) {
    const alertaNormalizado = {
      id: alertaEditando?.id || Date.now(),
      titulo: dadosAlerta.titulo,
      mensagem: dadosAlerta.mensagem,
      tipo: dadosAlerta.tipo || "conselho",
    }

    setAlertasUsuario((listaAtual) => {
      if (alertaEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(alertaEditando.id) ? alertaNormalizado : item
        )
      }

      return [...listaAtual, alertaNormalizado]
    })

    setAlertaEditando(null)
  }

  function apagarAlertaManual(id) {
    setAlertasUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(alertaEditando?.id) === Number(id)) {
      setAlertaEditando(null)
    }
  }

  function guardarPoupanca(dadosPoupanca) {
    const poupancaNormalizada = {
      id: poupancaEditando?.id || Date.now(),
      tipo: dadosPoupanca.tipo,
      objetivoId: dadosPoupanca.objetivoId || "",
      previsto: Number(dadosPoupanca.previsto || 0),
      guardado: Number(dadosPoupanca.guardado || 0),
    }

    setPoupancasUsuario((listaAtual) => {
      if (poupancaEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(poupancaEditando.id) ? poupancaNormalizada : item
        )
      }

      return [...listaAtual, poupancaNormalizada]
    })

    setPoupancaEditando(null)
    setMostrarFormularioPoupanca(false)
  }

  function iniciarEdicaoPoupanca(item) {
    setPoupancaEditando(item)
    setMostrarFormularioPoupanca(true)
  }

  function cancelarEdicaoPoupanca() {
    setPoupancaEditando(null)
    setMostrarFormularioPoupanca(false)
  }

  function apagarPoupanca(id) {
    setPoupancasUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(poupancaEditando?.id) === Number(id)) {
      setPoupancaEditando(null)
      setMostrarFormularioPoupanca(false)
    }
  }

  function guardarBeneficio(dadosBeneficio) {
    const beneficioNormalizado = {
      id: beneficioEditando?.id || Date.now(),
      tipo: dadosBeneficio.tipo,
      categoriaAlvo: dadosBeneficio.categoriaAlvo || "",
      valor: Number(dadosBeneficio.valor || 0),
    }

    setBeneficiosUsuario((listaAtual) => {
      if (beneficioEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(beneficioEditando.id) ? beneficioNormalizado : item
        )
      }

      return [...listaAtual, beneficioNormalizado]
    })

    setBeneficioEditando(null)
    setMostrarFormularioBeneficio(false)
  }

  function iniciarEdicaoBeneficio(item) {
    setBeneficioEditando(item)
    setMostrarFormularioBeneficio(true)
  }

  function cancelarEdicaoBeneficio() {
    setBeneficioEditando(null)
    setMostrarFormularioBeneficio(false)
  }

  function apagarBeneficio(id) {
    setBeneficiosUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(beneficioEditando?.id) === Number(id)) {
      setBeneficioEditando(null)
      setMostrarFormularioBeneficio(false)
    }
  }

  function guardarDespesaExtra(dadosDespesaExtra) {
    const despesaExtraNormalizada = {
      id: despesaExtraEditando?.id || Date.now(),
      descricao: dadosDespesaExtra.descricao,
      poupancaId: dadosDespesaExtra.poupancaId || "",
      valor: Number(dadosDespesaExtra.valor || 0),
      dia: Number(dadosDespesaExtra.dia || 1),
      estado: dadosDespesaExtra.estado || "realizada",
    }

    setDespesasExtrasUsuario((listaAtual) => {
      if (despesaExtraEditando) {
        return listaAtual.map((item) =>
          Number(item.id) === Number(despesaExtraEditando.id) ? despesaExtraNormalizada : item
        )
      }

      return [...listaAtual, despesaExtraNormalizada]
    })

    setDespesaExtraEditando(null)
    setMostrarFormularioDespesaExtra(false)
  }

  function iniciarEdicaoDespesaExtra(item) {
    setDespesaExtraEditando(item)
    setMostrarFormularioDespesaExtra(true)
  }

  function cancelarEdicaoDespesaExtra() {
    setDespesaExtraEditando(null)
    setMostrarFormularioDespesaExtra(false)
  }

  function apagarDespesaExtra(id) {
    setDespesasExtrasUsuario((listaAtual) =>
      listaAtual.filter((item) => Number(item.id) !== Number(id))
    )

    if (Number(despesaExtraEditando?.id) === Number(id)) {
      setDespesaExtraEditando(null)
      setMostrarFormularioDespesaExtra(false)
    }
  }


  function atualizarConfiguracoes(campo, valor) {
    setConfiguracoesUsuario((configAtual) => ({
      ...configAtual,
      [campo]: valor,
    }))

    if (campo === "moedaPadrao") {
      setMoedaAtiva(valor)
    }

    if (campo === "idiomaPadrao" && typeof document !== "undefined") {
      const idioma = IDIOMAS[valor] || IDIOMAS.pt
      document.documentElement.lang = valor
      document.documentElement.dir = idioma.direction || "ltr"
    }
  }

  function exportarBackupLocal() {
    const backup = {
      versao: "1.0",
      exportadoEm: new Date().toISOString(),
      configuracoesUsuario,
      poupancasUsuario,
      beneficiosUsuario,
      despesasExtrasUsuario,
      objetivosUsuario,
      pagamentosUsuario,
      alertasUsuario,
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `backup-planeamento-financeiro-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    setMensagemDefinicoes("Backup exportado com sucesso.")
  }

  function importarBackupLocal(evento) {
    const ficheiro = evento.target.files?.[0]
    if (!ficheiro) return

    const leitor = new FileReader()

    leitor.onload = () => {
      try {
        const backup = JSON.parse(String(leitor.result || "{}"))

        if (backup.configuracoesUsuario) {
          setConfiguracoesUsuario({
            ...CONFIGURACOES_INICIAIS,
            ...backup.configuracoesUsuario,
          })

          if (backup.configuracoesUsuario.moedaPadrao) {
            setMoedaAtiva(backup.configuracoesUsuario.moedaPadrao)
          }
        }

        if (Array.isArray(backup.poupancasUsuario)) setPoupancasUsuario(backup.poupancasUsuario)
        if (Array.isArray(backup.beneficiosUsuario)) setBeneficiosUsuario(backup.beneficiosUsuario)
        if (Array.isArray(backup.despesasExtrasUsuario)) setDespesasExtrasUsuario(backup.despesasExtrasUsuario)
        if (Array.isArray(backup.objetivosUsuario)) setObjetivosUsuario(backup.objetivosUsuario)
        if (Array.isArray(backup.pagamentosUsuario)) setPagamentosUsuario(backup.pagamentosUsuario)
        if (Array.isArray(backup.alertasUsuario)) setAlertasUsuario(backup.alertasUsuario)

        setMensagemDefinicoes("Backup importado com sucesso.")
      } catch (erro) {
        console.error("Erro ao importar backup:", erro)
        setMensagemDefinicoes("Não foi possível importar o backup. Verifica se o ficheiro é válido.")
      }
    }

    leitor.readAsText(ficheiro)
    evento.target.value = ""
  }

  function limparDadosLocais() {
    const confirmar = window.confirm(
      "Tem a certeza que quer limpar os dados locais? Esta ação remove poupanças, objetivos, pagamentos, alertas e definições guardadas neste navegador."
    )

    if (!confirmar) return

    window.localStorage.removeItem("poupancasUsuario")
    window.localStorage.removeItem("beneficiosUsuario")
    window.localStorage.removeItem("despesasExtrasUsuario")
    window.localStorage.removeItem("objetivosUsuario")
    window.localStorage.removeItem("pagamentosUsuario")
    window.localStorage.removeItem("alertasUsuario")
    window.localStorage.removeItem("configuracoesUsuario")

    setPoupancasUsuario(POUPANCAS_INICIAIS)
    setBeneficiosUsuario(BENEFICIOS_INICIAIS)
    setDespesasExtrasUsuario(DESPESAS_EXTRAS_INICIAIS)
    setObjetivosUsuario(OBJETIVOS_INICIAIS)
    setPagamentosUsuario(PAGAMENTOS_INICIAIS)
    setAlertasUsuario(ALERTAS_INICIAIS)
    setConfiguracoesUsuario(CONFIGURACOES_INICIAIS)
    setMoedaAtiva(CONFIGURACOES_INICIAIS.moedaPadrao)
    setMensagemDefinicoes("Dados locais limpos e valores padrão repostos.")
  }

  function renderGoalsPanel(mostrarAcoes = false) {
    return (
      <GoalsPanel
        objetivosLista={objetivosFinanceiros}
        formatarEuro={formatarEuro}
        onNovo={() => {
          setObjetivoEditando(null)
          setSecaoAtiva("Objetivos")
        }}
        onEditar={(objetivo) => {
          setObjetivoEditando(objetivo)
          setSecaoAtiva("Objetivos")
        }}
        onApagar={apagarObjetivo}
        mostrarAcoes={mostrarAcoes}
      />
    )
  }

  function renderObjetivosCompleto() {
    return (
      <section className="grid grid-cols-[1fr_360px] gap-4 items-start">
        {renderGoalsPanel(true)}
        <ObjetivoForm
          objetivoEditando={objetivoEditando}
          onGuardar={guardarObjetivo}
          onCancelar={() => setObjetivoEditando(null)}
        />
      </section>
    )
  }

  function renderPagamentosCompleto() {
    return (
      <section className="grid grid-cols-[1fr_360px] gap-4 items-start">
        {renderProximosPagamentos(true)}
        <PagamentoFinanceiroForm
          pagamentoEditando={pagamentoEditando}
          onGuardar={guardarPagamentoFinanceiro}
          onCancelar={() => setPagamentoEditando(null)}
        />
      </section>
    )
  }

  function renderAlertasCompleto() {
    return (
      <section className="grid grid-cols-[1fr_360px] gap-4 items-start">
        {renderAlertas(true)}
        <AlertaManualForm
          alertaEditando={alertaEditando}
          onGuardar={guardarAlertaManual}
          onCancelar={() => setAlertaEditando(null)}
        />
      </section>
    )
  }

  const simulacaoDividas = simularQuitacaoDividas(
    dividasApi,
    Math.max(0, disponivelParaDividas),
    considerarJurosSimulador
  )

  function renderSimuladorDividas() {
    return (
      <section className="grid grid-cols-[330px_1fr] gap-3">
        <SimulatorCard
          valorDisponivel={Math.max(0, disponivelParaDividas)}
          considerarJuros={considerarJurosSimulador}
          setConsiderarJuros={setConsiderarJurosSimulador}
          simulacao={simulacaoDividas}
          formatarEuro={formatarEuro}
        />
        <DebtEvolutionCard
          dados={simulacaoDividas.dadosGrafico}
          meses={simulacaoDividas.meses}
          formatarEuro={formatarEuro}
        />
      </section>
    )
  }

  const extrasPorCategoria = despesasExtrasFinanceiras
    .filter((item) => item.estado !== "pendente")
    .reduce((mapa, item) => {
      const chave = String(item.categoria || "Sem categoria").trim() || "Sem categoria"
      mapa[chave] = (mapa[chave] || 0) + Number(item.valor || 0)
      return mapa
    }, {})

  const despesasGrafico = (() => {
    const categoriasMensais = new Set(despesasApi.map((item) => item.categoria))
    const linhasMensais = despesasApi.map((item) => ({
      id: item.id,
      name: item.categoria,
      orcamentado: Number(item.orcamentado || 0),
      realizado: Number(item.realizado || 0) + Number(extrasPorCategoria[item.categoria] || 0),
      percentagem: item.percentagem,
    }))

    const linhasExtras = Object.entries(extrasPorCategoria)
      .filter(([categoria]) => !categoriasMensais.has(categoria))
      .map(([categoria, valor]) => ({
        id: `extra-${categoria}`,
        name: categoria,
        orcamentado: 0,
        realizado: Number(valor || 0),
        percentagem: "0%",
      }))

    return [...linhasMensais, ...linhasExtras]
  })()

  const distribuicaoDespesas = despesasGrafico
    .filter((item) => Number(item.realizado || 0) > 0)
    .map((item) => ({
      name: item.name,
      value: Number(item.realizado || 0),
      percent: totalDespesasComExtras > 0
        ? formatarPercentagem((Number(item.realizado || 0) / totalDespesasComExtras) * 100)
        : "0,0%",
    }))

  function adicionarRendimentoNaTabela(novo) {
    setRendimentosApi((listaAtual) => [
      ...listaAtual,
      {
        id: novo.id,
        mes: novo.mes || mesAtivo,
        fonte: novo.fonte,
        orcamentado: Number(novo.orcamentado || 0),
        recebido: Number(novo.recebido || 0),
      },
    ])
    setMostrarFormularioRendimento(false)
  }

  function iniciarEdicaoRendimento(item) {
    setRendimentoEditando(item)
    setMostrarFormularioRendimento(true)
  }

  function cancelarEdicaoRendimento() {
    setRendimentoEditando(null)
    setMostrarFormularioRendimento(false)
  }

  function atualizarRendimentoNaTabela(atualizado) {
    setRendimentosApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizado.id
          ? {
              id: atualizado.id,
              mes: atualizado.mes || mesAtivo,
              fonte: atualizado.fonte,
              orcamentado: Number(atualizado.orcamentado || 0),
              recebido: Number(atualizado.recebido || 0),
            }
          : item
      )
    )

    setRendimentoEditando(null)
    setMostrarFormularioRendimento(false)
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
            setMostrarFormularioRendimento(false)
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
        mes: nova.mes || mesAtivo,
        categoria: nova.categoria,
        orcamentado: Number(nova.orcamentado || 0),
        realizado: Number(nova.realizado || 0),
        percentagem: nova.percentagem || "0%",
      },
    ])
    setMostrarFormularioDespesa(false)
  }

  function iniciarEdicaoDespesa(item) {
    setDespesaEditando(item)
    setMostrarFormularioDespesa(true)
  }

  function cancelarEdicaoDespesa() {
    setDespesaEditando(null)
    setMostrarFormularioDespesa(false)
  }

  function atualizarDespesaNaTabela(atualizada) {
    setDespesasApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizada.id
          ? {
              id: atualizada.id,
              mes: atualizada.mes || mesAtivo,
              categoria: atualizada.categoria,
              orcamentado: Number(atualizada.orcamentado || 0),
              realizado: Number(atualizada.realizado || 0),
              percentagem: atualizada.percentagem || "0%",
            }
          : item
      )
    )

    setDespesaEditando(null)
    setMostrarFormularioDespesa(false)
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
            setMostrarFormularioDespesa(false)
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
      normalizarDivida(nova),
    ])
    setMostrarFormularioDivida(false)
  }

  function iniciarEdicaoDivida(item) {
    setDividaEditando(item)
    setMostrarFormularioDivida(true)
  }

  function cancelarEdicaoDivida() {
    setDividaEditando(null)
    setMostrarFormularioDivida(false)
  }

  function atualizarDividaNaTabela(atualizada) {
    setDividasApi((listaAtual) =>
      listaAtual.map((item) =>
        item.id === atualizada.id ? normalizarDivida(atualizada) : item
      )
    )

    setDividaEditando(null)
    setMostrarFormularioDivida(false)
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
            setMostrarFormularioDivida(false)
          }

          if (dividaPagamentoSelecionada?.id === id) {
            setDividaPagamentoSelecionada(null)
          }
        }
      })
      .catch((err) => {
        console.error("Erro ao apagar dívida:", err)
      })
  }

  function iniciarPagamentoDivida(item) {
    setDividaPagamentoSelecionada(item)
  }

  function cancelarPagamentoDivida() {
    setDividaPagamentoSelecionada(null)
  }

  function registrarPagamentoDivida(valorPago) {
    if (!dividaPagamentoSelecionada) {
      return
    }

    fetch("/api/pagamentos-dividas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dividaId: dividaPagamentoSelecionada.id,
        mes: mesAtivo,
        valorPago: Number(valorPago || 0),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Pagamento de dívida registado:", data)

        if (data.status === "ok") {
          setPagamentosDividasApi((listaAtual) => {
            const semDuplicado = listaAtual.filter(
              (item) => Number(item.dividaId) !== Number(data.data.dividaId)
            )

            return [
              ...semDuplicado,
              {
                id: data.data.id,
                dividaId: data.data.dividaId,
                mes: data.data.mes || mesAtivo,
                valorPago: Number(data.data.valorPago || 0),
                jurosPago: Number(data.data.jurosPago || 0),
                amortizacao: Number(data.data.amortizacao || 0),
                saldoAntes: Number(data.data.saldoAntes || 0),
                saldoDepois: Number(data.data.saldoDepois || 0),
              },
            ]
          })

          carregarDividasDoMes()
          setDividaPagamentoSelecionada(null)
        }
      })
      .catch((err) => {
        console.error("Erro ao registar pagamento da dívida:", err)
      })
  }

  function fecharFormulariosOperacionais() {
    setMostrarFormularioRendimento(false)
    setMostrarFormularioDespesa(false)
    setMostrarFormularioDespesaExtra(false)
    setMostrarFormularioPoupanca(false)
    setMostrarFormularioDivida(false)

    setRendimentoEditando(null)
    setDespesaEditando(null)
    setDespesaExtraEditando(null)
    setPoupancaEditando(null)
    setDividaEditando(null)
  }

  function scrollParaCard(id) {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 150)
  }

  function abrirAtalho(tipo) {
    if (tipo === "relatorios") {
      fecharFormulariosOperacionais()
      setSecaoAtiva("Relatórios")
      return
    }

    if (tipo === "calendario") {
      fecharFormulariosOperacionais()
      setSecaoAtiva("Calendário")
      return
    }

    setSecaoAtiva("Resumo")
    fecharFormulariosOperacionais()

    if (tipo === "rendimento") {
      setMostrarFormularioRendimento(true)
      scrollParaCard("card-rendimentos")
      return
    }

    if (tipo === "despesa") {
      setMostrarFormularioDespesa(true)
      scrollParaCard("card-despesas")
      return
    }

    if (tipo === "despesaExtra") {
      setMostrarFormularioDespesaExtra(true)
      scrollParaCard("card-despesas-extras")
      return
    }

    if (tipo === "poupanca") {
      setMostrarFormularioPoupanca(true)
      scrollParaCard("card-poupanca")
      return
    }

    if (tipo === "divida") {
      setMostrarFormularioDivida(true)
      scrollParaCard("card-dividas")
    }
  }

  function renderKpis() {
    const percentagemDisponivelSalario = totalRecebido > 0
      ? (disponivelParaDividas / totalRecebido) * 100
      : 0

    const percentagemPagamentoIdeal = disponivelParaDividas > 0
      ? (totalPagamentoIdeal / disponivelParaDividas) * 100
      : 0

    const percentagemDiasRestantes = ultimoDiaDoMes(mesAtivo) > 0
      ? (diasRestantesMesAtivo / ultimoDiaDoMes(mesAtivo)) * 100
      : 0

    return (
      <section className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3">
        <HealthCard t={t} />
        <KpiCard
          icon="💼"
          title={t("kpi.salary")}
          value={formatarEuro(totalRecebido)}
          subtitle={t("kpi.salary.sub")}
          accent="blue"
          showBar
          barPercent={totalRecebido > 0 ? 100 : 0}
        />
        <KpiCard
          icon="🧾"
          title={t("kpi.expenses")}
          value={formatarEuro(totalDespesasComExtras)}
          subtitle={`${formatarPercentagem(percentagemDespesasSalario)} ${t("of.salary")} • ${formatarEuro(totalDespesasEmDinheiro)} em dinheiro`}
          accent="red"
          showBar
          barPercent={limitarPercentagem(percentagemDespesasSalario)}
        />
        <KpiCard
          icon="💰"
          title={t("kpi.savings")}
          value={formatarEuro(totalPoupancaGuardado)}
          subtitle={`${formatarPercentagem(percentagemPoupancaSalario)} ${t("of.salary")}`}
          accent="green"
          green
          showBar
          barPercent={limitarPercentagem(percentagemPoupancaSalario)}
        />
        <KpiCard
          icon="💸"
          title={t("kpi.availableDebts")}
          value={formatarEuro(disponivelParaDividas)}
          subtitle={`${formatarPercentagem(percentagemDisponivelSalario)} ${t("of.salary")}`}
          accent="green"
          green
          showBar
          barPercent={limitarPercentagem(percentagemDisponivelSalario)}
        />
        <KpiCard
          icon="🏦"
          title={t("kpi.totalDebts")}
          value={formatarEuro(totalDividas)}
          subtitle={`${t("kpi.idealPayment")}: ${formatarEuro(totalPagamentoIdeal)}`}
          accent="purple"
          showBar
          barPercent={limitarPercentagem(percentagemPagamentoIdeal)}
        />
        <KpiCard
          icon="🗓️"
          title={t("kpi.daysLeft")}
          value={String(diasRestantesMesAtivo)}
          subtitle={`${t("until")} ${dataFimMesAtivo}`}
          accent="orange"
          showBar
          barPercent={limitarPercentagem(percentagemDiasRestantes)}
        />
      </section>
    )
  }

  function renderGraficos() {
    return (
      <section className="grid grid-cols-[1.2fr_1fr_1fr] gap-4">
        <ChartBox title={t("chart.expectedVsActual")}>
          <div className="flex justify-center gap-5 text-[10px] font-bold mb-1">
            <span className="text-blue-700">■ {t("expected")}</span>
            <span className="text-green-600">■ {t("actual")}</span>
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

        <ChartBox title={t("chart.distributionExpenses")}>
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
                  {formatarEuro(totalDespesasComExtras)}
                  <div className="text-[10px]">{t("total")}</div>
                </div>
              </div>
            </div>
            <LegendList items={distribuicaoDespesas} colors={COLORS} />
          </div>
        </ChartBox>

        <ChartBox title={t("chart.distributionIncome")}>
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
    )
  }

  function obterNomeObjetivoLigado(objetivoId) {
    if (!objetivoId) return t("noLinkedGoal")

    const objetivo = objetivosFinanceiros.find((item) => String(item.id) === String(objetivoId))
    return objetivo?.nome || t("noLinkedGoal")
  }

  function renderPoupancas() {
    return (
      <div id="card-poupanca">
        <TableCard
          title={t("table.savings")}
          color="bg-teal-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioPoupanca && !poupancaEditando) {
                  setMostrarFormularioPoupanca(false)
                } else {
                  setPoupancaEditando(null)
                  setMostrarFormularioPoupanca(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioPoupanca || poupancaEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1.5 text-left">{t("type")}</th>
              <th className="p-1.5">{t("linkedGoal")}</th>
              <th className="p-1.5">{t("expected")}</th>
              <th className="p-1.5">{t("saved")}</th>
              <th className="p-1.5">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {poupancasFinanceiras.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="p-1.5 font-semibold">{item.tipo}</td>
                <td className="p-1.5 text-center text-[9px] font-bold text-slate-600">{obterNomeObjetivoLigado(item.objetivoId)}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.previsto)}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.guardado)}</td>
                <td className="p-1.5 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => iniciarEdicaoPoupanca(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                    <button onClick={() => apagarPoupanca(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {poupancasFinanceiras.length < 6 && (
              <tr className="h-full">
                <td colSpan="5"></td>
              </tr>
            )}
            <tr className="sticky bottom-0 z-20 bg-teal-50 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("total.income")}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5 text-center">{formatarEuro(totalPoupancaPrevisto)}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalPoupancaGuardado)}</td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioPoupanca || poupancaEditando) && (
          <AddPoupancaForm
            poupancaEditando={poupancaEditando}
            objetivosLista={objetivosFinanceiros}
            t={t}
            onGuardar={guardarPoupanca}
            onCancelar={cancelarEdicaoPoupanca}
          />
        )}
      </div>
    )
  }

  function renderRendimentos() {
    return (
      <div id="card-rendimentos">
        <TableCard
          title={t("table.income")}
          color="bg-emerald-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioRendimento && !rendimentoEditando) {
                  setMostrarFormularioRendimento(false)
                } else {
                  setRendimentoEditando(null)
                  setMostrarFormularioRendimento(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioRendimento || rendimentoEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1.5 text-left">{t("source")}</th>
              <th className="p-1.5">{t("expected")}</th>
              <th className="p-1.5">{t("received")}</th>
              <th className="p-1.5">{t("action")}</th>
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
                    <button onClick={() => iniciarEdicaoRendimento(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                    <button onClick={() => apagarRendimento(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {rendimentosApi.length < 6 && (
              <tr className="h-full">
                <td colSpan="4"></td>
              </tr>
            )}
            <tr className="sticky bottom-0 z-20 bg-emerald-50 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("total.income")}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalOrcamentado)}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalRecebido)}</td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioRendimento || rendimentoEditando) && (
          <AddRendimentoForm onAdicionar={adicionarRendimentoNaTabela} rendimentoEditando={rendimentoEditando} onAtualizar={atualizarRendimentoNaTabela} onCancelarEdicao={cancelarEdicaoRendimento} mesAtivo={mesAtivo} />
        )}
      </div>
    )
  }

  function renderBeneficios() {
    return (
      <div id="card-beneficios">
        <TableCard
          title={t("table.benefits")}
          color="bg-cyan-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioBeneficio && !beneficioEditando) {
                  setMostrarFormularioBeneficio(false)
                } else {
                  setBeneficioEditando(null)
                  setMostrarFormularioBeneficio(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioBeneficio || beneficioEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1.5 text-left">{t("type")}</th>
              <th className="p-1.5">{t("benefit.target")}</th>
              <th className="p-1.5">{t("benefit.value")}</th>
              <th className="p-1.5">{t("benefit.used")}</th>
              <th className="p-1.5">{t("benefit.available")}</th>
              <th className="p-1.5">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {beneficiosFinanceiros.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="p-1.5 font-semibold">{item.tipo}</td>
                <td className="p-1.5 text-center">{item.categoriaAlvo || "—"}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.valor)}</td>
                <td className="p-1.5 text-center text-green-700 font-bold">{formatarEuro(item.usado)}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.disponivel)}</td>
                <td className="p-1.5 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => iniciarEdicaoBeneficio(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                    <button onClick={() => apagarBeneficio(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {beneficiosFinanceiros.length < 6 && (
              <tr className="h-full">
                <td colSpan="6"></td>
              </tr>
            )}
            <tr className="sticky bottom-[26px] z-20 bg-cyan-100 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("benefit.totalUsed")}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5 text-center">{formatarEuro(totalBeneficios)}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalBeneficiosUsados)}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5"></td>
            </tr>
            <tr className="sticky bottom-0 z-30 bg-cyan-50 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("benefit.totalAvailable")}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5"></td>
              <td className="p-1.5"></td>
              <td className="p-1.5 text-center">{formatarEuro(totalBeneficiosDisponivel)}</td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioBeneficio || beneficioEditando) && (
          <AddBeneficioForm
            beneficioEditando={beneficioEditando}
            despesasLista={despesasApi}
            t={t}
            onGuardar={guardarBeneficio}
            onCancelar={cancelarEdicaoBeneficio}
          />
        )}
      </div>
    )
  }

  function renderDespesasExtras() {
    function obterNomePoupanca(id) {
      const poupanca = poupancasFinanceiras.find((item) => String(item.id) === String(id))
      return poupanca?.tipo || "Sem abate"
    }

    return (
      <div id="card-despesas-extras">
        <TableCard
          title={t("table.extraExpenses")}
          color="bg-orange-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioDespesaExtra && !despesaExtraEditando) {
                  setMostrarFormularioDespesaExtra(false)
                } else {
                  setDespesaExtraEditando(null)
                  setMostrarFormularioDespesaExtra(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioDespesaExtra || despesaExtraEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1.5 text-left">{t("extra.description")}</th>
              <th className="p-1.5">{t("extra.deductedIn")}</th>
              <th className="p-1.5">{t("benefit.value")}</th>
              <th className="p-1.5">{t("extra.date")}</th>
              <th className="p-1.5">{t("extra.state")}</th>
              <th className="p-1.5">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {despesasExtrasFinanceiras.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="p-1.5 font-semibold">{item.descricao}</td>
                <td className="p-1.5 text-center">{item.poupancaId ? obterNomePoupanca(item.poupancaId) : "Sem abate"}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.valor)}</td>
                <td className="p-1.5 text-center">{String(item.dia || 1).padStart(2, "0")}/{mesAtivo.slice(5, 7)}</td>
                <td className="p-1.5 text-center">
                  <span className={`${item.estado === "pendente" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"} rounded px-2 py-1 text-[10px] font-black`}>
                    {item.estado === "pendente" ? "Pendente" : "Realizada"}
                  </span>
                </td>
                <td className="p-1.5 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => iniciarEdicaoDespesaExtra(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                    <button onClick={() => apagarDespesaExtra(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {despesasExtrasFinanceiras.length < 6 && (
              <tr className="h-full">
                <td colSpan="6"></td>
              </tr>
            )}
            <tr className="sticky bottom-0 z-20 bg-orange-50 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("extra.total")}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5 text-center">{formatarEuro(totalDespesasExtrasRealizadas)}</td>
              <td className="p-1.5"></td>
              <td className="p-1.5"></td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioDespesaExtra || despesaExtraEditando) && (
          <AddDespesaExtraForm
            despesaExtraEditando={despesaExtraEditando}
            poupancas={poupancasFinanceiras}
            onGuardar={guardarDespesaExtra}
            onCancelar={cancelarEdicaoDespesaExtra}
          />
        )}
      </div>
    )
  }

  function renderDespesas() {
    return (
      <div id="card-despesas">
        <TableCard
          title={t("table.expenses")}
          color="bg-blue-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioDespesa && !despesaEditando) {
                  setMostrarFormularioDespesa(false)
                } else {
                  setDespesaEditando(null)
                  setMostrarFormularioDespesa(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioDespesa || despesaEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1.5 text-left">{t("category")}</th>
              <th className="p-1.5">{t("expected")}</th>
              <th className="p-1.5">{t("actual")}</th>
              <th className="p-1.5">%</th>
              <th className="p-1.5">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {despesasApi.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="p-1.5 font-semibold">{item.categoria}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.orcamentado)}</td>
                <td className="p-1.5 text-center">{formatarEuro(item.realizado)}</td>
                <td className="p-1.5 text-center text-blue-700 font-bold">
                  {totalRecebido > 0 ? formatarPercentagem((Number(item.realizado || 0) / totalRecebido) * 100) : item.percentagem}
                </td>
                <td className="p-1.5 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => iniciarEdicaoDespesa(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                    <button onClick={() => apagarDespesa(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {despesasApi.length < 6 && (
              <tr className="h-full">
                <td colSpan="5"></td>
              </tr>
            )}
            <tr className="sticky bottom-0 z-20 bg-blue-50 font-black shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("total.income")}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalDespesasOrcamentado)}</td>
              <td className="p-1.5 text-center">{formatarEuro(totalDespesasRealizado)}</td>
              <td className="p-1.5 text-center">{formatarPercentagem(percentagemDespesasSalario)}</td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioDespesa || despesaEditando) && (
          <AddDespesaForm onAdicionar={adicionarDespesaNaTabela} despesaEditando={despesaEditando} onAtualizar={atualizarDespesaNaTabela} onCancelarEdicao={cancelarEdicaoDespesa} mesAtivo={mesAtivo} />
        )}
      </div>
    )
  }

  function renderDividas() {
    return (
      <div id="card-dividas">
        <TableCard
          title={t("table.debts")}
          color="bg-purple-700"
          action={
            <button
              type="button"
              onClick={() => {
                if (mostrarFormularioDivida && !dividaEditando) {
                  setMostrarFormularioDivida(false)
                } else {
                  setDividaEditando(null)
                  setMostrarFormularioDivida(true)
                }
              }}
              className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black text-white hover:bg-white/30"
            >
              {mostrarFormularioDivida || dividaEditando ? t("close") : t("add")}
            </button>
          }
        >
          <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
            <tr>
              <th className="p-1 text-left">{t("creditor")}</th>
              <th className="p-1">{t("balance")}</th>
              <th className="p-1">{t("installment")}</th>
              <th className="p-1">{t("interest")}</th>
              <th className="p-1">{t("type")}</th>
              <th className="p-1">{t("priority")}</th>
              <th className="p-1">{t("status")}</th>
              <th className="p-1">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {dividasApi.map((item) => {
              const pagamentoMes = obterPagamentoDividaDoMes(item.id)
              return (
                <tr key={item.id} className="border-b border-slate-100 text-[10px]">
                  <td className="p-1 font-semibold">{item.credor}</td>
                  <td className="p-1 text-center">{formatarEuro(item.saldo)}</td>
                  <td className="p-1 text-center">{formatarEuro(item.prestacaoMensal)}</td>
                  <td className="p-1 text-center">{formatarPercentagem(item.taxaJuros)}</td>
                  <td className="p-1 text-center">{formatarTipoJuros(item.tipoJuros)}</td>
                  <td className="p-1 text-center text-red-500 font-bold">{item.prioridade}</td>
                  <td className="p-1 text-center">
                    {pagamentoMes ? <span className="rounded bg-green-100 px-2 py-1 text-green-700 font-black">{t("paid")}</span> : <span className="rounded bg-orange-100 px-2 py-1 text-orange-700 font-black">{t("pending")}</span>}
                  </td>
                  <td className="p-1 text-center">
                    <div className="flex flex-col justify-center gap-1">
                      <button onClick={() => iniciarPagamentoDivida(item)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-[10px] font-bold">{t("pay")}</button>
                      <button onClick={() => iniciarEdicaoDivida(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("edit")}</button>
                      <button onClick={() => apagarDivida(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">{t("delete")}</button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {dividasApi.length < 4 && (
              <tr className="h-full">
                <td colSpan="8"></td>
              </tr>
            )}
            <tr className="sticky bottom-0 z-20 bg-purple-100 font-black text-[10px] shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
              <td className="p-1.5">{t("total.debts")}</td>
              <td className="p-1.5 text-center" colSpan="7">{formatarEuro(totalDividas)}</td>
            </tr>
          </tbody>
        </TableCard>
        {(mostrarFormularioDivida || dividaEditando) && (
          <AddDividaForm onAdicionar={adicionarDividaNaTabela} dividaEditando={dividaEditando} onAtualizar={atualizarDividaNaTabela} onCancelarEdicao={cancelarEdicaoDivida} mesAtivo={mesAtivo} />
        )}
        <PagamentoDividaForm dividaSelecionada={dividaPagamentoSelecionada} pagamentoAtual={dividaPagamentoSelecionada ? obterPagamentoDividaDoMes(dividaPagamentoSelecionada.id) : null} onRegistrar={registrarPagamentoDivida} onCancelar={cancelarPagamentoDivida} formatarEuro={formatarEuro} />
      </div>
    )
  }

  function renderPagamentoIdeal() {
    return (
      <TableCard title={t("table.idealDebts")} color="bg-green-700">
        <thead className="sticky top-0 z-20 bg-slate-50 text-slate-500 shadow-sm">
          <tr>
            <th className="p-1 text-left">{t("creditor")}</th>
            <th className="p-1">{t("payment")}</th>
            <th className="p-1">% Disp.</th>
            <th className="p-1">{t("time")}</th>
          </tr>
        </thead>
        <tbody>
          {pagamentoIdealDividas.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 text-[10px]">
              <td className="p-1 font-semibold">{item.credor}</td>
              <td className="p-1 text-center">{formatarEuro(item.pagamento)}</td>
              <td className="p-1 text-center">{formatarPercentagem(item.percentagemDisponivel)}</td>
              <td className="p-1 text-center">{item.tempoMeses} {t("months")}</td>
            </tr>
          ))}
          {pagamentoIdealDividas.length < 4 && (
            <tr className="h-full">
              <td colSpan="4"></td>
            </tr>
          )}
          <tr className="sticky bottom-[26px] z-20 bg-green-100 font-black text-[10px] shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
            <td className="p-1.5">{t("distributed.total")}</td>
            <td className="p-1.5 text-center">{formatarEuro(totalPagamentoIdeal)}</td>
            <td className="p-1.5 text-center">100%</td>
            <td className="p-1.5"></td>
          </tr>
          <tr className="sticky bottom-0 z-30 bg-green-50 font-black text-[10px] shadow-[0_-1px_0_rgba(15,23,42,0.08)]">
            <td className="p-1.5">{t("remaining")}</td>
            <td className="p-1.5 text-center">{formatarEuro(sobraPagamentoIdeal)}</td>
            <td className="p-1.5"></td>
            <td className="p-1.5"></td>
          </tr>
        </tbody>
      </TableCard>
    )
  }

  function renderAcessosRapidos() {
    const atalhos = [
      { id: "rendimento", label: "Adicionar Rendimento", icon: "➕", bg: "bg-green-100", text: "text-green-700" },
      { id: "despesa", label: "Adicionar Despesa", icon: "📉", bg: "bg-red-100", text: "text-red-700" },
      { id: "despesaExtra", label: "Adicionar Despesa Extra", icon: "📊", bg: "bg-blue-100", text: "text-blue-700" },
      { id: "poupanca", label: "Adicionar Poupança", icon: "🐷", bg: "bg-green-100", text: "text-green-700" },
      { id: "divida", label: "Adicionar Dívida", icon: "🏦", bg: "bg-purple-100", text: "text-purple-700" },
      { id: "relatorios", label: "Ver Relatórios", icon: "📈", bg: "bg-blue-100", text: "text-blue-700" },
    ]

    return (
      <div className="rounded-[24px] bg-white shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-blue-50 px-4 py-3 text-center border-b border-blue-100">
          <h3 className="text-[15px] font-black uppercase text-blue-900">
            Acessos Rápidos
          </h3>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-3 gap-2">
            {atalhos.map((atalho) => (
              <button
                key={atalho.id}
                type="button"
                onClick={() => abrirAtalho(atalho.id)}
                className="min-h-[78px] rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl ${atalho.bg} ${atalho.text} text-xl`}>
                  {atalho.icon}
                </div>
                <div className="text-[10px] font-black leading-tight text-blue-950">
                  {atalho.label}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => abrirAtalho("calendario")}
            className="mt-3 w-full rounded-2xl border-2 border-blue-100 bg-blue-50 py-3 text-[13px] font-black text-blue-700 transition hover:bg-blue-100"
          >
            Ir para Calendário
          </button>
        </div>
      </div>
    )
  }

  function renderProximosPagamentos(mostrarAcoes = false) {
    return (
      <Panel title={t("upcoming.payments")} className="h-full min-h-[320px]" bodyClassName="min-h-0 overflow-y-auto overflow-x-hidden pr-1 overscroll-contain">
        {pagamentosFinanceiros.map((pagamento) => {
          const badgeClass = pagamento.estado === "pago"
            ? "bg-green-100 text-green-700"
            : pagamento.estado === "vencido" || pagamento.estado === "vence-hoje"
              ? "bg-red-100 text-red-700"
              : pagamento.estado === "urgente"
                ? "bg-orange-100 text-orange-700"
                : "bg-blue-50 text-blue-700"

          return (
            <div key={pagamento.id} className={`grid ${mostrarAcoes ? "grid-cols-[44px_1fr_74px_64px_104px]" : "grid-cols-[44px_1fr_74px_64px]"} items-center text-xs border-b border-slate-100 py-2 gap-1`}>
              <span className="font-bold">{pagamento.data}</span>
              <span>{pagamento.nome}</span>
              <span className="font-bold">{formatarEuro(pagamento.valor)}</span>
              <span className={`${badgeClass} px-2 py-1 rounded-full text-[10px] text-center font-bold`}>
                {pagamento.textoDias}
              </span>

              {mostrarAcoes && (
                <span className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => alternarPagamentoPago(pagamento.id)}
                    className="rounded bg-green-100 px-2 py-1 text-[9px] font-black text-green-700"
                  >
                    {pagamento.pago ? "Reabrir" : "Pago"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPagamentoEditando(pagamento)}
                    className="rounded bg-blue-100 px-2 py-1 text-[9px] font-black text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => apagarPagamentoFinanceiro(pagamento.id)}
                    className="rounded bg-red-100 px-2 py-1 text-[9px] font-black text-red-700"
                  >
                    X
                  </button>
                </span>
              )}
            </div>
          )
        })}
      </Panel>
    )
  }

  function renderAlertas(mostrarAcoes = false) {
    const estiloPorTipo = {
      positivo: "bg-green-50 text-green-800",
      conselho: "bg-orange-50 text-orange-800",
      aviso: "bg-yellow-50 text-yellow-800",
      urgente: "bg-red-50 text-red-800",
    }

    return (
      <Panel
        title={t("alerts.title")}
        className={mostrarAcoes ? "min-h-[420px]" : "h-full min-h-[205px]"}
        bodyClassName="min-h-0 overflow-y-auto overflow-x-hidden pr-1 overscroll-contain"
      >
        {alertasFinanceiros.length === 0 && (
          <div className="bg-slate-50 text-slate-600 rounded-xl p-3 text-xs mb-3">
            {t("alerts.none")}
          </div>
        )}

        {alertasFinanceiros.map((item) => {
          const texto = typeof item === "string" ? item : item.mensagem
          const titulo = typeof item === "string" ? "" : item.titulo
          const tipo = typeof item === "string" ? "conselho" : item.tipo
          const origem = typeof item === "string" ? "automatico" : item.origem

          return (
            <div key={item.id || texto} className={`${estiloPorTipo[tipo] || estiloPorTipo.conselho} rounded-xl p-3 text-xs mb-3`}>
              {titulo && <div className="mb-1 font-black">{titulo}</div>}
              <div>{texto}</div>

              {mostrarAcoes && origem === "manual" && (
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAlertaEditando(item)}
                    className="rounded bg-white/70 px-2 py-1 text-[10px] font-black"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => apagarAlertaManual(item.id)}
                    className="rounded bg-white/70 px-2 py-1 text-[10px] font-black text-red-700"
                  >
                    Apagar
                  </button>
                </div>
              )}

              {mostrarAcoes && origem === "automatico" && (
                <div className="mt-2 text-[9px] font-black opacity-70">
                  {t("automatic")}
                </div>
              )}
            </div>
          )
        })}
      </Panel>
    )
  }


  function renderRelatorios() {
    const saldoLivreEstimado = disponivelParaDividas - totalPagamentoIdeal
    const taxaPoupanca = totalRecebido > 0 ? (totalPoupancaGuardado / totalRecebido) * 100 : 0
    const taxaDividas = totalRecebido > 0 ? (totalPagamentoIdeal / totalRecebido) * 100 : 0

    const linhasResumo = [
      ["Mês", formatarMesAtivo(mesAtivo)],
      ["Rendimentos recebidos", formatarEuro(totalRecebido)],
      ["Despesas mensais", formatarEuro(totalDespesasRealizado)],
      ["Despesas extras realizadas", formatarEuro(totalDespesasExtrasRealizadas)],
      ["Despesas extras abatidas na poupança", formatarEuro(totalDespesasExtrasAbatidasPoupanca)],
      ["Benefícios usados", formatarEuro(totalBeneficiosUsados)],
      ["Despesas em dinheiro", formatarEuro(totalDespesasEmDinheiro)],
      ["Poupança guardada", formatarEuro(totalPoupancaGuardado)],
      ["Pagamento ideal de dívidas", formatarEuro(totalPagamentoIdeal)],
      ["Saldo livre estimado", formatarEuro(saldoLivreEstimado)],
      ["Total de dívidas", formatarEuro(totalDividas)],
    ]

    const categoriasRelatorio = despesasGrafico
      .filter((item) => Number(item.realizado || 0) > 0)
      .map((item) => ({
        categoria: item.name,
        previsto: Number(item.orcamentado || 0),
        realizado: Number(item.realizado || 0),
        peso: totalRecebido > 0 ? (Number(item.realizado || 0) / totalRecebido) * 100 : 0,
      }))
      .sort((a, b) => b.realizado - a.realizado)

    const conclusoes = []

    if (totalRecebido <= 0) {
      conclusoes.push("Adicione os rendimentos do mês para o relatório ficar completo.")
    }

    if (percentagemDespesasSalario > Number(configuracoesUsuario.limiteDespesas || 60)) {
      conclusoes.push(`As despesas em dinheiro estão acima do limite recomendado de ${Number(configuracoesUsuario.limiteDespesas || 60)}% do rendimento.`)
    } else if (totalDespesasEmDinheiro > 0) {
      conclusoes.push("As despesas em dinheiro estão dentro do limite recomendado.")
    }

    if (taxaPoupanca < Number(configuracoesUsuario.metaPoupanca || 10) && totalRecebido > 0) {
      conclusoes.push(`A poupança está abaixo da meta de ${Number(configuracoesUsuario.metaPoupanca || 10)}% definida nas regras financeiras.`)
    } else if (totalPoupancaGuardado > 0) {
      conclusoes.push("A poupança do mês está alinhada com a meta definida.")
    }

    if (taxaDividas > Number(configuracoesUsuario.limiteDividas || 30)) {
      conclusoes.push(`O peso das dívidas está acima do limite recomendado de ${Number(configuracoesUsuario.limiteDividas || 30)}% do rendimento.`)
    }

    if (conclusoes.length === 0) {
      conclusoes.push("Ainda não existem dados suficientes para uma conclusão automática.")
    }

    function descarregarFicheiro(nome, conteudo, tipo) {
      const blob = new Blob([conteudo], { type: tipo })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = nome
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    }

    function exportarRelatorioJSON() {
      const relatorio = {
        mes: mesAtivo,
        mesLabel: formatarMesAtivo(mesAtivo),
        geradoEm: new Date().toISOString(),
        resumo: {
          totalRecebido,
          totalDespesasRealizado,
          totalDespesasExtrasRealizadas,
          totalDespesasExtrasAbatidasPoupanca,
          totalBeneficiosUsados,
          totalDespesasEmDinheiro,
          totalPoupancaGuardado,
          totalPagamentoIdeal,
          saldoLivreEstimado,
          totalDividas,
        },
        categorias: categoriasRelatorio,
        conclusoes,
      }

      descarregarFicheiro(
        `relatorio-financeiro-${mesAtivo}.json`,
        JSON.stringify(relatorio, null, 2),
        "application/json"
      )
    }

    function exportarRelatorioCSV() {
      const linhas = [
        ["Relatório financeiro", formatarMesAtivo(mesAtivo)],
        [],
        ["Resumo", "Valor"],
        ...linhasResumo,
        [],
        ["Categoria", "Previsto", "Realizado", "% do rendimento"],
        ...categoriasRelatorio.map((item) => [
          item.categoria,
          item.previsto.toFixed(2),
          item.realizado.toFixed(2),
          item.peso.toFixed(1),
        ]),
        [],
        ["Conclusões"],
        ...conclusoes.map((texto) => [texto]),
      ]

      const csv = linhas
        .map((linha) => linha.map((campo) => `"${String(campo ?? "").replaceAll('"', '""')}"`).join(";"))
        .join("\n")

      descarregarFicheiro(
        `relatorio-financeiro-${mesAtivo}.csv`,
        csv,
        "text/csv;charset=utf-8"
      )
    }

    return (
      <section className="space-y-4">
        <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">📊</div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Relatório mensal</p>
                <h3 className="text-xl font-black text-blue-950">{formatarMesAtivo(mesAtivo)}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={exportarRelatorioCSV} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700">
                Exportar CSV
              </button>
              <button type="button" onClick={exportarRelatorioJSON} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white hover:bg-blue-700">
                Exportar JSON
              </button>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-5 gap-3">
          <ReportMetricCard title="Recebido" value={formatarEuro(totalRecebido)} subtitle="Rendimentos do mês" />
          <ReportMetricCard title="Despesas em dinheiro" value={formatarEuro(totalDespesasEmDinheiro)} subtitle={`${formatarPercentagem(percentagemDespesasSalario)} do rendimento`} />
          <ReportMetricCard title="Poupança" value={formatarEuro(totalPoupancaGuardado)} subtitle={`${formatarPercentagem(taxaPoupanca)} do rendimento`} />
          <ReportMetricCard title="Dívidas" value={formatarEuro(totalPagamentoIdeal)} subtitle={`${formatarPercentagem(taxaDividas)} do rendimento`} />
          <ReportMetricCard title="Saldo livre" value={formatarEuro(saldoLivreEstimado)} subtitle="Após despesas, poupança e dívidas" />
        </section>

        <section className="grid grid-cols-[1.1fr_0.9fr] gap-4 items-start">
          <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
            <h3 className="mb-4 text-lg font-black text-blue-950">Resumo do mês</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-bold">
              {linhasResumo.slice(1).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
            <h3 className="mb-4 text-lg font-black text-blue-950">Comparação entre meses</h3>
            <label className="mb-1 block text-[11px] font-black uppercase text-slate-500">Comparar com</label>
            <select
              value={mesComparacaoRelatorio}
              onChange={(e) => setMesComparacaoRelatorio(e.target.value)}
              className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-blue-400"
            >
              {MESES_FUTUROS.map((grupo) => (
                <optgroup key={grupo.ano} label={String(grupo.ano)}>
                  {grupo.meses.map((mes) => (
                    <option key={mes.valor} value={mes.valor}>{mes.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-yellow-800">
              A comparação detalhada com {formatarMesAtivo(mesComparacaoRelatorio)} fica preparada aqui. Quando os dados históricos forem guardados na base de dados, este bloco vai mostrar aumentos e reduções reais entre meses.
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[1fr_360px] gap-4 items-start">
          <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
            <h3 className="mb-4 text-lg font-black text-blue-950">Análise por categoria</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-2 text-left">Categoria</th>
                    <th className="p-2 text-center">Previsto</th>
                    <th className="p-2 text-center">Realizado</th>
                    <th className="p-2 text-center">% rendimento</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasRelatorio.map((item) => (
                    <tr key={item.categoria} className="border-b border-slate-100">
                      <td className="p-2 font-bold">{item.categoria}</td>
                      <td className="p-2 text-center">{formatarEuro(item.previsto)}</td>
                      <td className="p-2 text-center">{formatarEuro(item.realizado)}</td>
                      <td className="p-2 text-center font-black text-blue-700">{formatarPercentagem(item.peso)}</td>
                    </tr>
                  ))}
                  {categoriasRelatorio.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-slate-500 font-bold">Sem despesas para analisar neste mês.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
            <h3 className="mb-4 text-lg font-black text-blue-950">Conclusão automática</h3>
            <div className="space-y-3">
              {conclusoes.map((texto) => (
                <div key={texto} className="rounded-2xl bg-blue-50 p-3 text-sm font-bold text-blue-900">
                  {texto}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    )
  }

  function renderConteudoPrincipal() {
    if (secaoAtiva === "Rendimentos") {
      return (
        <section className="grid grid-cols-[430px_1fr] gap-4 items-start">
          <div className="space-y-4">
            {renderRendimentos()}
            {renderPoupancas()}
          </div>
          <PlaceholderSection icon="⚖️" title="Resumo de Rendimentos">
            <p>Total previsto: <strong>{formatarEuro(totalOrcamentado)}</strong></p>
            <p>Total recebido: <strong>{formatarEuro(totalRecebido)}</strong></p>
            <p>Total poupança prevista: <strong>{formatarEuro(totalPoupancaPrevisto)}</strong></p>
            <p>Total guardado: <strong>{formatarEuro(totalPoupancaGuardado)}</strong></p>
          </PlaceholderSection>
        </section>
      )
    }

    if (secaoAtiva === "Poupança") {
      return (
        <section className="grid grid-cols-[430px_1fr] gap-4 items-start">
          {renderPoupancas()}
          <PlaceholderSection icon="💰" title="Resumo de Poupança / Reserva">
            <p>Total previsto: <strong>{formatarEuro(totalPoupancaPrevisto)}</strong></p>
            <p>Total guardado: <strong>{formatarEuro(totalPoupancaGuardado)}</strong></p>
            <p>Diferença: <strong>{formatarEuro(totalPoupancaGuardado - totalPoupancaPrevisto)}</strong></p>
          </PlaceholderSection>
        </section>
      )
    }

    if (secaoAtiva === "Benefícios") {
      return (
        <section className="grid grid-cols-[520px_1fr] gap-4 items-start">
          {renderBeneficios()}
          <PlaceholderSection icon="🎟️" title="Resumo de Benefícios / Cartões">
            <p>Total em benefícios: <strong>{formatarEuro(totalBeneficios)}</strong></p>
            <p>Usado para abater despesas: <strong>{formatarEuro(totalBeneficiosUsados)}</strong></p>
            <p>Ainda disponível: <strong>{formatarEuro(totalBeneficiosDisponivel)}</strong></p>
            <p>Despesas em dinheiro: <strong>{formatarEuro(totalDespesasEmDinheiro)}</strong></p>
          </PlaceholderSection>
        </section>
      )
    }

    if (secaoAtiva === "Despesas Extras") {
      return (
        <section className="grid grid-cols-[520px_1fr] gap-4 items-start">
          {renderDespesasExtras()}
          <PlaceholderSection icon="🧾" title="Resumo de Despesas Extras">
            <p>Total extra registado: <strong>{formatarEuro(totalDespesasExtras)}</strong></p>
            <p>Total extra realizado: <strong>{formatarEuro(totalDespesasExtrasRealizadas)}</strong></p>
            <p>Total despesas com extras: <strong>{formatarEuro(totalDespesasComExtras)}</strong></p>
            <p>Despesas em dinheiro: <strong>{formatarEuro(totalDespesasEmDinheiro)}</strong></p>
          </PlaceholderSection>
        </section>
      )
    }

    if (secaoAtiva === "Despesas") {
      return (
        <>
          {renderGraficos()}
          <section className="grid grid-cols-[430px_1fr] gap-4 items-start">
            <div className="space-y-4">
              {renderDespesas()}
              {renderDespesasExtras()}
            </div>
            <PlaceholderSection icon="💸" title="Resumo de Despesas">
              <p>Total mensal realizado: <strong>{formatarEuro(totalDespesasRealizado)}</strong></p>
              <p>Despesas extras realizadas: <strong>{formatarEuro(totalDespesasExtrasRealizadas)}</strong></p>
              <p>Total com extras: <strong>{formatarEuro(totalDespesasComExtras)}</strong></p>
              <p>Benefícios usados: <strong>{formatarEuro(totalBeneficiosUsados)}</strong></p>
              <p>Despesas em dinheiro: <strong>{formatarEuro(totalDespesasEmDinheiro)}</strong></p>
              <p>Peso no salário: <strong>{formatarPercentagem(percentagemDespesasSalario)}</strong></p>
            </PlaceholderSection>
          </section>
        </>
      )
    }

    if (secaoAtiva === "Dívidas") {
      return (
        <>
          <section className="grid grid-cols-[1.4fr_0.9fr] gap-4 items-start">
            <div className="space-y-4">
              {renderDividas()}
              {renderBeneficios()}
            </div>
            {renderPagamentoIdeal()}
          </section>
          {renderSimuladorDividas()}
        </>
      )
    }

    if (secaoAtiva === "Objetivos") {
      return renderObjetivosCompleto()
    }

    if (secaoAtiva === "Calendário") {
      return (
        <PlaceholderSection icon="🗓️" title="Calendário Financeiro">
          <p>Esta área vai mostrar os compromissos organizados por dia do mês.</p>
          <div className="mt-4">{renderProximosPagamentos()}</div>
        </PlaceholderSection>
      )
    }

    if (secaoAtiva === "Pagamentos") {
      return renderPagamentosCompleto()
    }

    if (secaoAtiva === "Simulador") {
      return renderSimuladorDividas()
    }

    if (secaoAtiva === "Alertas") {
      return renderAlertasCompleto()
    }

    if (secaoAtiva === "Relatórios") {
      return renderRelatorios()
    }

    if (secaoAtiva === "Definições") {
      return (
        <DefinicoesPanel
          configuracoes={configuracoesUsuario}
          onAtualizar={atualizarConfiguracoes}
          moedas={MOEDAS}
          idiomas={IDIOMAS}
          mesAtivo={mesAtivo}
          setMesAtivo={setMesAtivo}
          mesesFuturos={MESES_FUTUROS}
          formatarMesAtivo={formatarMesAtivo}
          formatarEuro={formatarEuro}
          mensagem={mensagemDefinicoes}
          exportarBackup={exportarBackupLocal}
          importarBackup={importarBackupLocal}
          limparDadosLocais={limparDadosLocais}
          t={t}
          resumo={{
            totalRecebido,
            totalDespesasRealizado: totalDespesasComExtras,
            totalDespesasExtrasRealizadas,
            totalBeneficiosUsados,
            totalDespesasEmDinheiro,
            totalPoupancaGuardado,
            totalDividas,
            poupancasCount: poupancasUsuario.length,
            beneficiosCount: beneficiosUsuario.length,
            despesasExtrasCount: despesasExtrasUsuario.length,
            objetivosCount: objetivosUsuario.length,
            pagamentosCount: pagamentosUsuario.length,
            alertasCount: alertasUsuario.length,
          }}
        />
      )
    }

    return (
      <>
        {renderKpis()}

        <section className="grid grid-cols-[1fr_286px] gap-4 items-stretch">
          {renderGraficos()}
          {renderGoalsPanel()}
        </section>

        <section className="grid grid-cols-[1fr_286px] gap-4 items-stretch">
          <section className="grid grid-cols-4 gap-4 items-stretch">
            <div className="space-y-4">
              {renderRendimentos()}
              {renderPoupancas()}
            </div>
            <div className="space-y-4">
              {renderDespesas()}
              {renderDespesasExtras()}
            </div>
            <div className="space-y-4">
              {renderDividas()}
              {renderBeneficios()}
            </div>
            <div className="space-y-4">
              {renderPagamentoIdeal()}
              {renderAcessosRapidos()}
            </div>
          </section>
          {renderProximosPagamentos()}
        </section>

        <section className="grid grid-cols-[1fr_286px] gap-4 items-stretch">
          {renderSimuladorDividas()}
          {renderAlertas()}
        </section>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#edf4ff] text-[#0f172a]">
      <Sidebar
        mesAtivo={mesAtivo}
        setMesAtivo={setMesAtivo}
        secaoAtiva={secaoAtiva}
        setSecaoAtiva={setSecaoAtiva}
        moedaAtiva={moedaAtiva}
        setMoedaAtiva={setMoedaAtiva}
        t={t}
      />

      <div className="ml-[242px] p-4 grid grid-cols-1 gap-4">
        <main className="space-y-4">
          <section className="rounded-[14px] bg-white px-4 py-3 shadow-lg border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">{t("active.section")}</p>
              <h2 className="text-[18px] font-black text-blue-950">{t(`menu.${secaoAtiva}`)}</h2>
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
              {formatarMesAtivo(mesAtivo)}
            </div>
          </section>

          {secaoAtiva !== "Resumo" && renderKpis()}
          {renderConteudoPrincipal()}
        </main>
      </div>
    </div>
  )
}
function SimulatorCard({
  valorDisponivel,
  considerarJuros,
  setConsiderarJuros,
  simulacao,
  formatarEuro,
}) {
  const meses = Number(simulacao?.meses || 0)
  const estrategia = simulacao?.estrategia || "Avalanche"
  const jurosEstimados = Number(simulacao?.jurosEstimados || 0)

  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 overflow-hidden min-h-[205px]">
      <div className="p-4">
        <h3 className="font-black text-[12px] uppercase text-blue-900 mb-3">
          Simulador: quanto tempo para ficar sem dívidas?
        </h3>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-slate-700">
              Valor disponível mensal para dívidas
            </span>
            <div className="w-[110px] h-8 bg-green-50 rounded-lg flex items-center justify-center text-[11px] font-black text-green-900">
              {formatarEuro(valorDisponivel)}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-slate-700">
              Considerar juros na simulação?
            </span>

            <select
              value={considerarJuros ? "sim" : "nao"}
              onChange={(e) => setConsiderarJuros(e.target.value === "sim")}
              className="w-[110px] h-8 bg-green-50 rounded-lg text-center text-[11px] font-black text-green-900 outline-none"
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
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
                <div className="text-[38px] leading-none font-black text-blue-800">
                  {meses}
                </div>
                <div className="text-[12px] font-black text-blue-900 uppercase">
                  {meses === 1 ? "Mês" : "Meses"}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="text-[10px] font-black uppercase text-blue-900 mb-1">
                Estratégia recomendada
              </div>
              <div className="flex items-center gap-2 text-[12px] font-black">
                🏆 {estrategia}
              </div>
              <p className="text-[9px] text-slate-500 font-bold mt-1">
                {considerarJuros ? "Juros estimados na simulação" : "Simulação sem juros"}
              </p>
              <div className="flex justify-between items-end">
                <span className="text-[12px] font-black">
                  {considerarJuros ? formatarEuro(jurosEstimados) : formatarEuro(0)}
                </span>
                <span className="text-3xl text-green-600">↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DebtEvolutionCard({ dados, meses, formatarEuro }) {
  const dadosGrafico = Array.isArray(dados) && dados.length > 0
    ? dados
    : [{ mes: "Mês 0", divida: 0, projecao: 0, sombra: 0 }]

  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 min-h-[205px] p-4 grid grid-cols-[1fr_105px] gap-3">
      <div>
        <h3 className="text-center font-black text-[13px] uppercase text-blue-950 mb-2">
          Evolução da Dívida ao Longo dos Meses
        </h3>

        <ResponsiveContainer width="100%" height={170}>
          <ComposedChart data={dadosGrafico} margin={{ top: 6, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fontWeight: 700 }} />
            <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
            <Tooltip formatter={(value) => formatarEuro(value)} />

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
          <span className="text-green-600">✦ Meta: {formatarEuro(0)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full rounded-[14px] bg-[#f3efff] border border-purple-200 p-3 text-center shadow-sm">
          <div className="text-[12px] font-black text-purple-700">Faltam</div>
          <div className="text-[42px] leading-none font-black text-purple-700">
            {Number(meses || 0)}
          </div>
          <div className="text-[12px] font-black text-purple-700">
            {Number(meses || 0) === 1 ? "mês" : "meses"}
          </div>
          <div className="text-[11px] font-black text-purple-700 mt-2 leading-tight">
            para ficar sem dívidas
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthCard({ t = (chave) => chave }) {
  return (
    <div className="rounded-[14px] bg-white shadow-lg border border-slate-100 min-h-[120px] p-3 flex gap-3 items-center">
      <div>
        <h3 className="text-[12px] uppercase font-black text-blue-950 mb-2">Índice de {t("financial.health")}</h3>
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
        <p className="font-black text-[15px]">{t("excellent")}</p>
        <p className="text-[10px] font-bold text-slate-700 mt-2 leading-snug">
          A sua situação financeira está muito saudável!
        </p>
      </div>
    </div>
  )
}

function KpiCard({ icon, title, value, subtitle, accent, showBar, green, barPercent = 0 }) {
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
          <div className="w-[90px] h-2 rounded-full bg-blue-100 mt-3 overflow-hidden">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${Math.max(0, Math.min(100, Number(barPercent || 0)))}%` }}
            />
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

function GoalsPanel({ objetivosLista = [], formatarEuro = (valor) => `€ ${Number(valor || 0).toFixed(2)}`, onNovo, onEditar, onApagar, mostrarAcoes = false }) {
  const objetivosParaMostrar = objetivosLista.length > 0
    ? objetivosLista
    : objetivos.map(([icone, nome, objetivoTexto, valorTexto, percentagem, cor], index) => ({
        id: index + 1,
        icone,
        nome,
        objetivo: objetivoTexto,
        atual: valorTexto,
        percentagem,
        cor,
      }))

  return (
    <div className="h-full min-h-[245px] rounded-[14px] bg-white shadow-lg border border-slate-100 overflow-hidden flex flex-col">
      <div className="shrink-0 p-3 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-[14px] uppercase">🎯 Objetivos Financeiros</h3>
          <button
            type="button"
            onClick={onNovo}
            className="bg-green-100 text-green-800 text-[10px] font-black px-3 py-1 rounded-full"
          >
            + Novo
          </button>
        </div>

      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 pr-2">
        {objetivosParaMostrar.map((objetivo) => {
          const valorObjetivo = typeof objetivo.objetivo === "number"
            ? formatarEuro(objetivo.objetivo)
            : objetivo.objetivo

          const valorAtual = typeof objetivo.atual === "number"
            ? formatarEuro(objetivo.atual)
            : objetivo.atual

          return (
            <div key={objetivo.id || objetivo.nome} className="grid grid-cols-[38px_1fr] gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                {objetivo.icone}
              </div>
              <div>
                <div className="flex justify-between gap-2 text-[11px] font-black">
                  <span>{objetivo.nome}</span>
                  <span>{valorAtual}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-bold mb-1">
                  Objetivo: {valorObjetivo}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${objetivo.cor}`}
                      style={{ width: `${Math.max(0, Math.min(100, Number(objetivo.percentagem || 0)))}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-green-600">
                    {Number(objetivo.percentagem || 0).toFixed(0)}%
                  </span>
                </div>

                {mostrarAcoes && (
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEditar?.(objetivo)}
                      className="rounded bg-blue-100 px-2 py-1 text-[10px] font-black text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onApagar?.(objetivo.id)}
                      className="rounded bg-red-100 px-2 py-1 text-[10px] font-black text-red-700"
                    >
                      Apagar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onNovo}
        className="shrink-0 w-full bg-orange-50 text-center py-2.5 text-[12px] font-black"
      >
        Ver todos os objetivos →
      </button>
    </div>
  )
}

function TableCard({ title, color, action, children }) {
  return (
    <div className="h-[320px] w-full rounded-[24px] bg-white shadow-lg overflow-hidden border border-slate-100 flex flex-col">
      <div className={`${color} relative shrink-0 text-white text-center py-2.5 px-4 font-black text-xs uppercase`}>
        <span>{title}</span>
        {action && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {action}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-auto overscroll-contain">
        <table className="min-w-full h-full text-[10px] leading-tight">{children}</table>
      </div>
    </div>
  )
}

function Panel({ title, children, className = "", bodyClassName = "" }) {
  return (
    <div className={`rounded-[24px] bg-white p-5 shadow-lg border border-slate-100 flex flex-col ${className}`}>
      <h3 className="shrink-0 font-black text-orange-700 mb-4">{title}</h3>
      <div className={`flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  )
}
function PlaceholderSection({ icon, title, children }) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-lg border border-slate-100 min-h-[260px]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400">Módulo</p>
          <h3 className="text-xl font-black text-blue-950">{title}</h3>
        </div>
      </div>
      <div className="space-y-2 text-sm font-semibold text-slate-700">
        {children}
      </div>
    </div>
  )
}
function AddRendimentoForm({
  onAdicionar,
  rendimentoEditando,
  onAtualizar,
  onCancelarEdicao,
  mesAtivo,
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
      mes: mesAtivo,
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
        placeholder="Previsto"
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
  mesAtivo,
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
      mes: mesAtivo,
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
        placeholder="Previsto"
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
  mesAtivo,
}) {
  const [credor, setCredor] = React.useState("")
  const [saldoInicial, setSaldoInicial] = React.useState("")
  const [saldo, setSaldo] = React.useState("")
  const [prestacaoMensal, setPrestacaoMensal] = React.useState("")
  const [tipoJuros, setTipoJuros] = React.useState("mensal")
  const [taxaJuros, setTaxaJuros] = React.useState("")
  const [progresso, setProgresso] = React.useState("")
  const [prioridade, setPrioridade] = React.useState("Baixa")

  const modoEdicao = Boolean(dividaEditando)

  React.useEffect(() => {
    if (dividaEditando) {
      setCredor(dividaEditando.credor || "")
      setSaldoInicial(String(dividaEditando.saldoInicial || dividaEditando.saldo || 0))
      setSaldo(String(dividaEditando.saldo || 0))
      setPrestacaoMensal(String(dividaEditando.prestacaoMensal || 0))
      setTipoJuros(dividaEditando.tipoJuros || "mensal")
      setTaxaJuros(String(dividaEditando.taxaJuros || 0))
      setProgresso(String(dividaEditando.progresso || 0))
      setPrioridade(dividaEditando.prioridade || "Baixa")
    }
  }, [dividaEditando])

  function limparFormulario() {
    setCredor("")
    setSaldoInicial("")
    setSaldo("")
    setPrestacaoMensal("")
    setTipoJuros("mensal")
    setTaxaJuros("")
    setProgresso("")
    setPrioridade("Baixa")
  }

  function guardarDivida(e) {
    e.preventDefault()

    const saldoInicialNumerico = Number(saldoInicial || saldo || 0)
    const saldoNumerico = Number(saldo || saldoInicial || 0)

    const dadosDivida = {
      mes: mesAtivo,
      mesInicio: dividaEditando?.mesInicio || mesAtivo,
      credor,
      saldoInicial: saldoInicialNumerico,
      saldo: saldoNumerico,
      prestacaoMensal: Number(prestacaoMensal || 0),
      tipoJuros,
      taxaJuros: Number(taxaJuros || 0),
      progresso: Number(progresso || 0),
      prioridade,
      status: "ativa",
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
        placeholder="Saldo inicial"
        type="number"
        value={saldoInicial}
        onChange={(e) => {
          setSaldoInicial(e.target.value)

          if (!modoEdicao && !saldo) {
            setSaldo(e.target.value)
          }
        }}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Saldo atual"
        type="number"
        value={saldo}
        onChange={(e) => setSaldo(e.target.value)}
      />

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Prestação mensal"
        type="number"
        value={prestacaoMensal}
        onChange={(e) => setPrestacaoMensal(e.target.value)}
      />

      <div className="grid grid-cols-[1fr_1fr] gap-2">
        <input
          className="w-full mb-2 rounded-lg border p-2 text-sm"
          placeholder="Taxa de juros (%)"
          type="number"
          value={taxaJuros}
          onChange={(e) => setTaxaJuros(e.target.value)}
        />

        <select
          className="w-full mb-2 rounded-lg border p-2 text-sm"
          value={tipoJuros}
          onChange={(e) => setTipoJuros(e.target.value)}
        >
          <option value="mensal">Juros mensal</option>
          <option value="anual">Juros anual</option>
        </select>
      </div>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Progresso (%)"
        type="number"
        value={progresso}
        onChange={(e) => setProgresso(e.target.value)}
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


function PagamentoDividaForm({
  dividaSelecionada,
  pagamentoAtual,
  onRegistrar,
  onCancelar,
  formatarEuro,
}) {
  const [valorPago, setValorPago] = React.useState("")

  React.useEffect(() => {
    if (dividaSelecionada) {
      setValorPago(String(dividaSelecionada.prestacaoMensal || ""))
    }
  }, [dividaSelecionada])

  if (!dividaSelecionada) {
    return null
  }

  function guardarPagamento(e) {
    e.preventDefault()

    if (typeof onRegistrar === "function") {
      onRegistrar(Number(valorPago || 0))
    }
  }

  return (
    <form onSubmit={guardarPagamento} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-purple-100">
      <h3 className="font-black text-purple-700 mb-3">
        Registar Pagamento
      </h3>

      <div className="mb-3 rounded-xl bg-purple-50 p-3 text-xs font-bold text-purple-900">
        <div>{dividaSelecionada.credor}</div>
        <div>Saldo atual: {formatarEuro(dividaSelecionada.saldo)}</div>
        <div>Prestação prevista: {formatarEuro(dividaSelecionada.prestacaoMensal)}</div>
      </div>

      {pagamentoAtual && (
        <div className="mb-3 rounded-xl bg-green-50 p-3 text-[11px] font-bold text-green-900">
          <div>Pagamento já registado neste mês.</div>
          <div>Valor pago: {formatarEuro(pagamentoAtual.valorPago)}</div>
          <div>Juros pagos: {formatarEuro(pagamentoAtual.jurosPago)}</div>
          <div>Amortização: {formatarEuro(pagamentoAtual.amortizacao)}</div>
          <div>Saldo antes: {formatarEuro(pagamentoAtual.saldoAntes)}</div>
          <div>Saldo depois: {formatarEuro(pagamentoAtual.saldoDepois)}</div>
        </div>
      )}

      <input
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        placeholder="Valor pago neste mês"
        type="number"
        value={valorPago}
        onChange={(e) => setValorPago(e.target.value)}
      />

      <button className="w-full rounded-lg bg-emerald-600 py-2 text-white font-bold">
        Confirmar pagamento
      </button>

      <button
        type="button"
        onClick={onCancelar}
        className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
      >
        Cancelar
      </button>
    </form>
  )
}

function AddDespesaExtraForm({ despesaExtraEditando, poupancas = [], onGuardar, onCancelar }) {
  const [descricao, setDescricao] = React.useState("")
  const [poupancaId, setPoupancaId] = React.useState("")
  const [valor, setValor] = React.useState("")
  const [dia, setDia] = React.useState("")
  const [estado, setEstado] = React.useState("realizada")

  const modoEdicao = Boolean(despesaExtraEditando)

  React.useEffect(() => {
    if (despesaExtraEditando) {
      setDescricao(despesaExtraEditando.descricao || "")
      setPoupancaId(despesaExtraEditando.poupancaId || "")
      setValor(String(despesaExtraEditando.valor || 0))
      setDia(String(despesaExtraEditando.dia || 1))
      setEstado(despesaExtraEditando.estado || "realizada")
    } else {
      setDescricao("")
      setPoupancaId("")
      setValor("")
      setDia("")
      setEstado("realizada")
    }
  }, [despesaExtraEditando])

  function guardar(e) {
    e.preventDefault()

    if (!descricao.trim()) {
      return
    }

    onGuardar({
      descricao,
      poupancaId,
      valor,
      dia,
      estado,
    })

    if (!modoEdicao) {
      setDescricao("")
      setPoupancaId("")
      setValor("")
      setDia("")
      setEstado("realizada")
    }
  }

  return (
    <form onSubmit={guardar} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-orange-700 mb-3">
        {modoEdicao ? "Editar Despesa Extra" : "Adicionar Despesa Extra"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        value={poupancaId}
        onChange={(e) => setPoupancaId(e.target.value)}
      >
        <option value="">Sem abate na poupança</option>
        {poupancas.map((item) => (
          <option key={item.id} value={item.id}>{item.tipo}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-2">
        <input
          className="w-full mb-2 rounded-lg border p-2 text-sm"
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          className="w-full mb-2 rounded-lg border p-2 text-sm"
          placeholder="Dia do mês"
          type="number"
          min="1"
          max="31"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
      </div>

      <select
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="realizada">Realizada</option>
        <option value="pendente">Pendente</option>
      </select>

      <button className="w-full rounded-lg bg-orange-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={onCancelar}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
  )
}

function AddBeneficioForm({ beneficioEditando, despesasLista = [], t = (chave) => chave, onGuardar, onCancelar }) {
  const [tipo, setTipo] = React.useState("")
  const [categoriaAlvo, setCategoriaAlvo] = React.useState("")
  const [valor, setValor] = React.useState("")

  const modoEdicao = Boolean(beneficioEditando)
  const categorias = Array.from(new Set(
    despesasLista
      .map((item) => String(item.categoria || "").trim())
      .filter(Boolean)
  ))

  React.useEffect(() => {
    if (beneficioEditando) {
      setTipo(beneficioEditando.tipo || "")
      setCategoriaAlvo(beneficioEditando.categoriaAlvo || "")
      setValor(String(beneficioEditando.valor || 0))
    } else {
      setTipo("")
      setCategoriaAlvo("")
      setValor("")
    }
  }, [beneficioEditando])

  function guardar(e) {
    e.preventDefault()

    if (!tipo.trim() || !categoriaAlvo) {
      return
    }

    onGuardar({
      tipo,
      categoriaAlvo,
      valor,
    })

    if (!modoEdicao) {
      setTipo("")
      setCategoriaAlvo("")
      setValor("")
    }
  }

  return (
    <form onSubmit={guardar} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-cyan-700 mb-3">
        {modoEdicao ? "Editar Benefício / Cartão" : "Adicionar Benefício / Cartão"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Tipo, ex: Cartão Refeição"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <select
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        value={categoriaAlvo}
        onChange={(e) => setCategoriaAlvo(e.target.value)}
      >
        <option value="">Selecionar categoria das despesas</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>

      <input
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        placeholder="Valor disponível"
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <button className="w-full rounded-lg bg-cyan-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={onCancelar}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
  )
}

function AddPoupancaForm({ poupancaEditando, objetivosLista = [], t = (chave) => chave, onGuardar, onCancelar }) {
  const [tipo, setTipo] = React.useState("")
  const [objetivoId, setObjetivoId] = React.useState("")
  const [previsto, setPrevisto] = React.useState("")
  const [guardado, setGuardado] = React.useState("")

  const modoEdicao = Boolean(poupancaEditando)

  React.useEffect(() => {
    if (poupancaEditando) {
      setTipo(poupancaEditando.tipo || "")
      setObjetivoId(poupancaEditando.objetivoId ? String(poupancaEditando.objetivoId) : "")
      setPrevisto(String(poupancaEditando.previsto || 0))
      setGuardado(String(poupancaEditando.guardado || 0))
    } else {
      setTipo("")
      setObjetivoId("")
      setPrevisto("")
      setGuardado("")
    }
  }, [poupancaEditando])

  function guardar(e) {
    e.preventDefault()

    if (!tipo.trim()) {
      return
    }

    onGuardar({
      tipo,
      objetivoId,
      previsto,
      guardado,
    })

    if (!modoEdicao) {
      setTipo("")
      setObjetivoId("")
      setPrevisto("")
      setGuardado("")
    }
  }

  return (
    <form onSubmit={guardar} className="mt-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
      <h3 className="font-black text-teal-700 mb-3">
        {modoEdicao ? "Editar Poupança / Reserva" : "Adicionar Poupança / Reserva"}
      </h3>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <select
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        value={objetivoId}
        onChange={(e) => setObjetivoId(e.target.value)}
      >
        <option value="">{t("noLinkedGoal")}</option>
        {objetivosLista.map((objetivo) => (
          <option key={objetivo.id} value={objetivo.id}>
            {objetivo.nome}
          </option>
        ))}
      </select>

      <input
        className="w-full mb-2 rounded-lg border p-2 text-sm"
        placeholder="Previsto"
        type="number"
        value={previsto}
        onChange={(e) => setPrevisto(e.target.value)}
      />

      <input
        className="w-full mb-3 rounded-lg border p-2 text-sm"
        placeholder="Guardado"
        type="number"
        value={guardado}
        onChange={(e) => setGuardado(e.target.value)}
      />

      <button className="w-full rounded-lg bg-teal-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button
          type="button"
          onClick={onCancelar}
          className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold"
        >
          Cancelar edição
        </button>
      )}
    </form>
  )
}

function ObjetivoForm({ objetivoEditando, onGuardar, onCancelar }) {
  const [icone, setIcone] = React.useState("🎯")
  const [nome, setNome] = React.useState("")
  const [objetivo, setObjetivo] = React.useState("")
  const [atual, setAtual] = React.useState("")
  const [cor, setCor] = React.useState("bg-green-500")

  const modoEdicao = Boolean(objetivoEditando)

  React.useEffect(() => {
    if (objetivoEditando) {
      setIcone(objetivoEditando.icone || "🎯")
      setNome(objetivoEditando.nome || "")
      setObjetivo(String(objetivoEditando.objetivo || 0))
      setAtual(String(objetivoEditando.atual || 0))
      setCor(objetivoEditando.cor || "bg-green-500")
    } else {
      setIcone("🎯")
      setNome("")
      setObjetivo("")
      setAtual("")
      setCor("bg-green-500")
    }
  }, [objetivoEditando])

  function guardar(e) {
    e.preventDefault()

    if (!nome.trim()) {
      return
    }

    onGuardar({ icone, nome, objetivo, atual, cor })

    if (!modoEdicao) {
      setIcone("🎯")
      setNome("")
      setObjetivo("")
      setAtual("")
      setCor("bg-green-500")
    }
  }

  return (
    <form onSubmit={guardar} className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
      <h3 className="mb-4 font-black text-blue-950">
        {modoEdicao ? "Editar Objetivo" : "Adicionar Objetivo"}
      </h3>

      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Ícone" value={icone} onChange={(e) => setIcone(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Nome do objetivo" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Valor objetivo" type="number" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Valor atual" type="number" value={atual} onChange={(e) => setAtual(e.target.value)} />

      <select className="w-full mb-3 rounded-lg border p-2 text-sm" value={cor} onChange={(e) => setCor(e.target.value)}>
        <option value="bg-green-500">Verde</option>
        <option value="bg-orange-500">Laranja</option>
        <option value="bg-blue-500">Azul</option>
        <option value="bg-purple-500">Roxo</option>
        <option value="bg-red-500">Vermelho</option>
      </select>

      <button className="w-full rounded-lg bg-blue-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button type="button" onClick={onCancelar} className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold">
          Cancelar edição
        </button>
      )}
    </form>
  )
}

function PagamentoFinanceiroForm({ pagamentoEditando, onGuardar, onCancelar }) {
  const [dia, setDia] = React.useState("")
  const [nome, setNome] = React.useState("")
  const [valor, setValor] = React.useState("")
  const [categoria, setCategoria] = React.useState("")
  const [pago, setPago] = React.useState(false)

  const modoEdicao = Boolean(pagamentoEditando)

  React.useEffect(() => {
    if (pagamentoEditando) {
      setDia(String(pagamentoEditando.dia || 1))
      setNome(pagamentoEditando.nome || "")
      setValor(String(pagamentoEditando.valor || 0))
      setCategoria(pagamentoEditando.categoria || "")
      setPago(Boolean(pagamentoEditando.pago))
    } else {
      setDia("")
      setNome("")
      setValor("")
      setCategoria("")
      setPago(false)
    }
  }, [pagamentoEditando])

  function guardar(e) {
    e.preventDefault()

    if (!nome.trim()) {
      return
    }

    onGuardar({ dia, nome, valor, categoria, pago })

    if (!modoEdicao) {
      setDia("")
      setNome("")
      setValor("")
      setCategoria("")
      setPago(false)
    }
  }

  return (
    <form onSubmit={guardar} className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
      <h3 className="mb-4 font-black text-orange-700">
        {modoEdicao ? "Editar Pagamento" : "Adicionar Pagamento"}
      </h3>

      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Dia do mês" type="number" min="1" max="31" value={dia} onChange={(e) => setDia(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

      <label className="mb-3 flex items-center gap-2 text-sm font-bold">
        <input type="checkbox" checked={pago} onChange={(e) => setPago(e.target.checked)} />
        Marcar como pago
      </label>

      <button className="w-full rounded-lg bg-orange-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button type="button" onClick={onCancelar} className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold">
          Cancelar edição
        </button>
      )}
    </form>
  )
}

function AlertaManualForm({ alertaEditando, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = React.useState("")
  const [mensagem, setMensagem] = React.useState("")
  const [tipo, setTipo] = React.useState("conselho")

  const modoEdicao = Boolean(alertaEditando)

  React.useEffect(() => {
    if (alertaEditando) {
      setTitulo(alertaEditando.titulo || "")
      setMensagem(alertaEditando.mensagem || "")
      setTipo(alertaEditando.tipo || "conselho")
    } else {
      setTitulo("")
      setMensagem("")
      setTipo("conselho")
    }
  }, [alertaEditando])

  function guardar(e) {
    e.preventDefault()

    if (!mensagem.trim()) {
      return
    }

    onGuardar({
      titulo: titulo || "Alerta personalizado",
      mensagem,
      tipo,
    })

    if (!modoEdicao) {
      setTitulo("")
      setMensagem("")
      setTipo("conselho")
    }
  }

  return (
    <form onSubmit={guardar} className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
      <h3 className="mb-4 font-black text-orange-700">
        {modoEdicao ? "Editar Alerta Manual" : "Adicionar Alerta Manual"}
      </h3>

      <input className="w-full mb-2 rounded-lg border p-2 text-sm" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <textarea className="w-full mb-2 min-h-[100px] rounded-lg border p-2 text-sm" placeholder="Mensagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />

      <select className="w-full mb-3 rounded-lg border p-2 text-sm" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="conselho">Conselho</option>
        <option value="aviso">Aviso</option>
        <option value="urgente">Urgente</option>
        <option value="positivo">Positivo</option>
      </select>

      <button className="w-full rounded-lg bg-orange-600 py-2 text-white font-bold">
        {modoEdicao ? "Guardar Alterações" : "Adicionar"}
      </button>

      {modoEdicao && (
        <button type="button" onClick={onCancelar} className="mt-2 w-full rounded-lg bg-slate-200 py-2 text-slate-700 font-bold">
          Cancelar edição
        </button>
      )}
    </form>
  )
}


function DefinicoesPanel({
  configuracoes,
  onAtualizar,
  moedas,
  idiomas,
  mesAtivo,
  setMesAtivo,
  mesesFuturos,
  formatarMesAtivo,
  formatarEuro,
  mensagem,
  exportarBackup,
  importarBackup,
  limparDadosLocais,
  resumo,
  t = (chave) => chave,
}) {
  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-blue-400"
  const labelClass = "mb-1 block text-[11px] font-black uppercase text-slate-500"

  return (
    <section className="grid grid-cols-[1fr_360px] gap-4 items-start">
      <div className="space-y-4">
        <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">⚙️</div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">{t("settings.config")}</p>
              <h3 className="text-xl font-black text-blue-950">{t("settings.general")}</h3>
            </div>
          </div>

          {mensagem && (
            <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
              {mensagem}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{t("settings.currencyDefault")}</label>
              <select
                className={inputClass}
                value={configuracoes.moedaPadrao || "EUR"}
                onChange={(e) => onAtualizar("moedaPadrao", e.target.value)}
              >
                {Object.entries(moedas).map(([codigo, moeda]) => (
                  <option key={codigo} value={codigo}>{moeda.flag} {moeda.label}</option>
                ))}
              </select>
              <p className="mt-2 text-[11px] font-semibold text-slate-500">
                {t("settings.visualOnly")}
              </p>
            </div>

            <div>
              <label className={labelClass}>{t("settings.languageDefault")}</label>
              <select
                className={inputClass}
                value={configuracoes.idiomaPadrao || "pt"}
                onChange={(e) => onAtualizar("idiomaPadrao", e.target.value)}
              >
                {Object.entries(idiomas).map(([codigo, idioma]) => (
                  <option key={codigo} value={codigo}>{idioma.flag} {idioma.label}</option>
                ))}
              </select>
              <p className="mt-2 text-[11px] font-semibold text-slate-500">
                {t("settings.languageHelp")}
              </p>
            </div>

            <div>
              <label className={labelClass}>{t("settings.monthActive")}</label>
              <select
                className={inputClass}
                value={mesAtivo}
                onChange={(e) => setMesAtivo(e.target.value)}
              >
                {mesesFuturos.map((grupo) => (
                  <optgroup key={grupo.ano} label={String(grupo.ano)}>
                    {grupo.meses.map((mes) => (
                      <option key={mes.valor} value={mes.valor}>{mes.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="mt-2 text-[11px] font-semibold text-slate-500">
                {t("settings.current")}: {formatarMesAtivo(mesAtivo)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
          <h3 className="mb-4 text-lg font-black text-blue-950">{t("settings.rules")}</h3>
          <div className="grid grid-cols-4 gap-3">
            <NumberSetting label={t("settings.expenseLimit")} value={configuracoes.limiteDespesas} onChange={(valor) => onAtualizar("limiteDespesas", Number(valor))} />
            <NumberSetting label={t("settings.savingsGoal")} value={configuracoes.metaPoupanca} onChange={(valor) => onAtualizar("metaPoupanca", Number(valor))} />
            <NumberSetting label={t("settings.debtLimit")} value={configuracoes.limiteDividas} onChange={(valor) => onAtualizar("limiteDividas", Number(valor))} />
            <NumberSetting label={t("settings.emergencyFund")} value={configuracoes.fundoEmergenciaMeses} onChange={(valor) => onAtualizar("fundoEmergenciaMeses", Number(valor))} />
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-500">
            {t("settings.rulesHelp")}
          </p>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
          <h3 className="mb-4 text-lg font-black text-blue-950">{t("settings.localData")}</h3>
          <div className="grid grid-cols-3 gap-3">
            <button type="button" onClick={exportarBackup} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">
              {t("settings.export")}
            </button>

            <label className="cursor-pointer rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-black text-white hover:bg-emerald-700">
              {t("settings.import")}
              <input type="file" accept="application/json" onChange={importarBackup} className="hidden" />
            </label>

            <button type="button" onClick={limparDadosLocais} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white hover:bg-red-700">
              {t("settings.clear")}
            </button>
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-500">
            {t("settings.localHelp")}
          </p>
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-5 shadow-lg border border-slate-100">
        <h3 className="mb-4 text-lg font-black text-blue-950">{t("settings.localSummary")}</h3>
        <div className="mb-5 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-950">
          <div className="mb-2 flex justify-between">
            <span>Moeda</span>
            <strong>{configuracoes.moedaPadrao || "EUR"}</strong>
          </div>
          <div className="flex justify-between">
            <span>Idioma</span>
            <strong>{idiomas[configuracoes.idiomaPadrao || "pt"]?.label || "Português"}</strong>
          </div>
        </div>
        <div className="space-y-3 text-sm font-bold">
          <ResumoLinha label={t("settings.totalReceived")} value={formatarEuro(resumo.totalRecebido)} />
          <ResumoLinha label={t("settings.totalExpenses")} value={formatarEuro(resumo.totalDespesasRealizado)} />
          <ResumoLinha label={t("settings.extraExpenses")} value={formatarEuro(resumo.totalDespesasExtrasRealizadas || 0)} />
          <ResumoLinha label={t("settings.benefitsUsed")} value={formatarEuro(resumo.totalBeneficiosUsados)} />
          <ResumoLinha label={t("settings.cashExpenses")} value={formatarEuro(resumo.totalDespesasEmDinheiro)} />
          <ResumoLinha label={t("settings.savingsSaved")} value={formatarEuro(resumo.totalPoupancaGuardado)} />
          <ResumoLinha label={t("kpi.totalDebts")} value={formatarEuro(resumo.totalDividas)} />
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
          <div className="mb-2 flex justify-between"><span>{t("menu.Poupança")}</span><strong>{resumo.poupancasCount}</strong></div>
          <div className="mb-2 flex justify-between"><span>{t("menu.Benefícios")}</span><strong>{resumo.beneficiosCount}</strong></div>
          <div className="mb-2 flex justify-between"><span>{t("menu.Despesas Extras")}</span><strong>{resumo.despesasExtrasCount || 0}</strong></div>
          <div className="mb-2 flex justify-between"><span>{t("menu.Objetivos")}</span><strong>{resumo.objetivosCount}</strong></div>
          <div className="mb-2 flex justify-between"><span>{t("menu.Pagamentos")}</span><strong>{resumo.pagamentosCount}</strong></div>
          <div className="flex justify-between"><span>{t("settings.manualAlerts")}</span><strong>{resumo.alertasCount}</strong></div>
        </div>
      </div>
    </section>
  )
}

function NumberSetting({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-black uppercase text-slate-500">{label}</label>
      <input
        type="number"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-blue-400"
        value={value ?? 0}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function ResumoLinha({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ReportMetricCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-lg border border-slate-100">
      <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
      <div className="mt-2 text-[20px] font-black text-blue-950">{value}</div>
      <p className="mt-2 text-[11px] font-bold text-slate-500">{subtitle}</p>
    </div>
  )
}

function Sidebar({ mesAtivo, setMesAtivo, secaoAtiva, setSecaoAtiva, moedaAtiva, setMoedaAtiva, t = (chave) => chave }) {
  const menuItems = [
    ["🏠", "Resumo"],
    ["⚖️", "Rendimentos"],
    ["💰", "Poupança"],
    ["🎟️", "Benefícios"],
    ["💸", "Despesas"],
    ["🧾", "Despesas Extras"],
    ["🪙", "Dívidas"],
    ["🎯", "Objetivos"],
    ["🗓️", "Calendário"],
    ["💳", "Pagamentos"],
    ["📋", "Simulador"],
    ["🚨", "Alertas"],
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
            {t("app.title1")}
            <br />
            {t("app.title2")}
          </h1>

          <p className="mt-2 text-[12px] font-semibold text-white/90">
            {t("app.subtitle")}
          </p>
        </div>

        <div className="mx-3 mb-3 rounded-[12px] border border-cyan-400/40 bg-[#062a57] shadow-inner p-2">
          <label className="mb-1 block text-center text-[9px] font-black uppercase text-white/70">
            {t("month.active")}
          </label>

          <select
            value={mesAtivo}
            onChange={(e) => setMesAtivo(e.target.value)}
            className="w-full rounded-[9px] border border-cyan-400/30 bg-[#061b3f] px-2 py-2 text-center text-[12px] font-black text-yellow-300 outline-none"
          >
            {MESES_FUTUROS.map((grupo) => (
              <optgroup key={grupo.ano} label={String(grupo.ano)}>
                {grupo.meses.map((mes) => (
                  <option key={mes.valor} value={mes.valor}>
                    🗓️ {mes.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <div className="mt-2 rounded-lg bg-cyan-400/10 px-2 py-1 text-center text-[10px] font-bold text-cyan-100">
            {t("viewing")}: {formatarMesAtivo(mesAtivo)}
          </div>
        </div>

        <nav className="px-3 space-y-[5px]">
          {menuItems.map(([icon, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => setSecaoAtiva(label)}
              className={`w-full flex items-center gap-3 rounded-[11px] px-3 py-[7px] text-[13px] font-black transition-all text-left ${secaoAtiva === label
                  ? "bg-gradient-to-r from-[#0b7cff] to-[#1d4ed8] shadow-[0_0_18px_rgba(59,130,246,0.65)]"
                  : "hover:bg-white/10"
                }`}
            >
              <span className="w-4 text-center text-[15px]">{icon}</span>
              <span>{t(`menu.${label}`)}</span>
            </button>
          ))}
        </nav>

        <div className="mx-3 mt-4 rounded-[13px] border border-cyan-400/35 bg-[#061b3f]/80 p-3 shadow-inner">
          <div className="mb-2 text-center text-[9px] font-black uppercase text-white/80">
            {t("currency")}
          </div>

          <select
            value={moedaAtiva}
            onChange={(e) => setMoedaAtiva(e.target.value)}
            className="w-full rounded-[9px] border border-cyan-400/30 bg-[#062a57] px-2 py-2 text-center text-[11px] font-black text-white outline-none"
          >
            {Object.entries(MOEDAS).map(([codigo, moeda]) => (
              <option key={codigo} value={codigo}>
                {moeda.flag} {moeda.label}
              </option>
            ))}
          </select>

          <div className="mt-2 rounded-lg bg-cyan-400/10 px-2 py-1 text-center text-[9px] font-bold text-cyan-100">
            {t("no.conversion")}
          </div>

          <div className="mt-3 text-center">
            <p className="text-[8px] font-black uppercase text-white/70">{t("updated.at")}</p>
            <p className="text-[11px] font-black">{new Date().toLocaleString("pt-PT")}</p>
          </div>
        </div>

        <div className="mx-3 mt-3 rounded-[13px] border border-cyan-400/35 bg-[#061b3f]/80 p-3 shadow-inner">
          <h3 className="mb-2 text-center text-[12px] font-black uppercase">{t("financial.health")}</h3>

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
            {t("excellent")}
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