dashboard_data = {
    "salarioLiquido": 5000,
    "totalDespesas": 2650,
    "disponivelDividas": 1350,
    "totalDividas": 28450,
    "diasRestantes": 17,
    "saudeFinanceira": 85,

    "rendimentos": [
        {"id": 1, "fonte": "Salário Principal", "orcamentado": 5000, "recebido": 5000},
        {"id": 2, "fonte": "Trabalho Extra / Freelance", "orcamentado": 0, "recebido": 0},
        {"id": 3, "fonte": "Investimentos", "orcamentado": 0, "recebido": 0},
        {"id": 4, "fonte": "Outros Rendimentos", "orcamentado": 0, "recebido": 0},
    ],

   "despesas": [
    {"id": 1, "categoria": "Habitação", "orcamentado": 950, "realizado": 950, "percentagem": "19%"},
    {"id": 2, "categoria": "Transportes", "orcamentado": 400, "realizado": 400, "percentagem": "8%"},
]

    "dividas": [
        {"id": 1, "credor": "Cartão de Crédito", "saldo": 5000, "progresso": 80, "juros": "8.0%", "prioridade": "Alta"},
        {"id": 2, "credor": "Empréstimo Pessoal", "saldo": 10000, "progresso": 65, "juros": "3.5%", "prioridade": "Alta"},
        {"id": 3, "credor": "Financiamento Auto", "saldo": 8000, "progresso": 40, "juros": "1.5%", "prioridade": "Média"},
        {"id": 4, "credor": "Crédito Loja", "saldo": 1450, "progresso": 15, "juros": "2.9%", "prioridade": "Baixa"},
    ],

    "objetivos": [
        {"id": 1, "nome": "Fundo de Emergência", "objetivo": 3000, "atual": 2100, "percentagem": 70},
        {"id": 2, "nome": "Quitar Cartão de Crédito", "objetivo": 5000, "atual": 1000, "percentagem": 20},
        {"id": 3, "nome": "Entrada para Casa", "objetivo": 15000, "atual": 3750, "percentagem": 25},
        {"id": 4, "nome": "Nova Viatura", "objetivo": 20000, "atual": 6000, "percentagem": 30},
    ],

    "pagamentos": [
        {"id": 1, "data": "01/06", "nome": "Habitação", "valor": 700, "dias": "2 dias"},
        {"id": 2, "data": "05/06", "nome": "Cartão de Crédito", "valor": 500, "dias": "5 dias"},
        {"id": 3, "data": "07/06", "nome": "Luz", "valor": 85, "dias": "7 dias"},
        {"id": 4, "data": "12/06", "nome": "Internet", "valor": 35, "dias": "12 dias"},
    ],
}