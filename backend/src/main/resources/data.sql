INSERT INTO tb_usuario (nome, data_nascimento, email, senha) VALUES ('Steve Green', '1972-04-06', 'steve_user@email.com.br', '$2a$12$kvzDMZ9Kt5IDSWv6O8PrZOUbKJaXZC18a5lGmLojjmQ10fszhNuFi');
INSERT INTO tb_usuario (nome, data_nascimento, email, senha) VALUES ('Stephanie Rose', '1980-05-10', 'stephanie_admin@email.com.br', '$2a$12$SpdZsp8Q.0t6Ne3uk.2gJ.JG3Lji6tgj.zUz50NSzZLgDJCrhVCAu');
INSERT INTO tb_usuario (nome, data_nascimento, email, senha) VALUES ('Joe Purple', '1994-04-05', 'joe_admin_user@email.com.br', '$2a$12$YXF60cto0VbkyA3BtGhbqu5XrL6yEVLPjlm/l1eKdahCwlhweZ9HW');

INSERT INTO tb_perfil (tipo) VALUES ('ROLE_USER');
INSERT INTO tb_perfil (tipo) VALUES ('ROLE_ADMIN');

INSERT INTO tb_usuario_perfil (usuario_id, perfil_id) VALUES (1, 1);
INSERT INTO tb_usuario_perfil (usuario_id, perfil_id) VALUES (2, 2);
INSERT INTO tb_usuario_perfil (usuario_id, perfil_id) VALUES (3, 1);
INSERT INTO tb_usuario_perfil (usuario_id, perfil_id) VALUES (3, 2);

-- Tipos de Lançamento
INSERT INTO tb_tipo_lancamento (descricao) VALUES ('Entrada'), ('Saída');

-- Categorias de Entrada
INSERT INTO tb_categoria_lancamento (nome, tipo_id) VALUES
('Renda Principal', 1),
('Rendimentos de Investimentos', 1),
('Rendas Extras e Variáveis', 1),
('Outras Entradas', 1);

-- Categorias de Saída
INSERT INTO tb_categoria_lancamento (nome, tipo_id) VALUES
('Moradia e Contas Fixas', 2),
('Alimentação', 2),
('Transporte', 2),
('Educação', 2),
('Saúde e Bem-Estar', 2),
('Lazer e Entretenimento', 2),
('Vestuário e Cuidados Pessoais', 2),
('Impostos e Taxas', 2),
('Dívidas e Empréstimos', 2),
('Outras Despesas', 2);

-- Subcategorias Renda Principal (Entrada)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Salário/Pró-Labore', 1),
('Freelancer', 1),
('13º Salário e Férias', 1),
('Bônus e Comissões', 1);

-- Subcategorias Rendimentos de Investimentos (Entrada)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Dividendos', 2),
('Juros de Poupança/CDB', 2),
('Rendimentos de Fundos/Ações', 2);

-- Subcategorias Rendas Extras e Variáveis (Entrada)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Venda de Bens', 3),
('Reembolsos', 3),
('Presentes Recebidos', 3),
('Cashback', 3);

-- Subcategorias Outras Entradas (Entrada)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Outras Entradas Não Classificadas', 4); -- Para realmente o que não se encaixa

-- Subcategorias de Moradia e Contas Fixas (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Aluguel/Financiamento Imobiliário', 5),
('Condomínio', 5),
('Luz', 5),
('Água', 5),
('Gás', 5),
('Internet e TV', 5),
('Telefone', 5),
('Manutenção Residencial', 5);

-- Subcategorias de Alimentação (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Supermercado', 6),
('Restaurantes e Bares', 6),
('Delivery e Fastfood', 6),
('Padaria e Lanches', 6);

-- Subcategorias de Transporte (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Combustível', 7),
('Transporte Público (Ônibus/Metrô)', 7),
('Aplicativos (Uber/99)', 7),
('Financiamento Veicular', 7),
('Manutenção Veicular', 7),
('Estacionamento e Pedágio', 7);

-- Subcategorias de Educação (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Mensalidade Escolar/Universitária', 8),
('Cursos e Workshops', 8),
('Livros e Materiais Didáticos', 8);

-- Subcategorias de Saúde e Bem-Estar (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Plano de Saúde', 9),
('Medicamentos', 9),
('Consultas e Exames', 9),
('Academia e Esportes', 9),
('Terapias e Tratamentos', 9);

-- Subcategorias de Lazer e Entretenimento (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Viagens e Turismo', 10),
('Assinaturas (Streaming/Apps)', 10),
('Cinema, Shows e Eventos', 10),
('Bares e Baladas', 10),
('Hobbies e Atividades Recreativas', 10);

-- Subcategorias de Vestuário e Cuidados Pessoais (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Roupas e Calçados', 11),
('Acessórios', 11),
('Salão de Beleza/Barbearia', 11),
('Cosméticos e Perfumes', 11);

-- Subcategorias de Impostos e Taxas (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('IPTU', 12),
('IPVA', 12),
('Imposto de Renda', 12),
('Taxas Bancárias', 12);

-- Subcategorias de Dívidas e Empréstimos (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Parcela de Empréstimo', 13),
('Fatura de Cartão de Crédito', 13),
('Juros de Dívidas', 13);

-- Subcategorias Outras Despesas (Saída)
INSERT INTO tb_subcategoria_lancamento (nome, categoria_id) VALUES
('Doações', 14),
('Gastos Diversos Não Classificados', 14); -- Para o que realmente não se encaixa






-- Seed de lançamentos para o usuário ID 1
INSERT INTO tb_lancamento (titulo, descricao, valor, data, subcategoria_id, usuario_id) VALUES
('Salário Mensal', 'Salário referente ao mês de maio', 3500.00, '2025-06-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de junho', 1200.00, '2025-06-05', 19, 1),
('Supermercado', 'Compras do mês', 450.00, '2025-06-03', 27, 1),
('Conta de Luz', 'Conta de energia elétrica de maio', 150.00, '2025-06-02', 21, 1),
('Internet', 'Mensalidade do plano de internet', 90.00, '2025-06-01', 23, 1),
('Freelancer Projeto X', 'Pagamento por projeto freelancer', 800.00, '2025-05-30', 2, 1),
('Restaurante', 'Almoço com amigos', 85.00, '2025-05-29', 28, 1),
('Uber', 'Viagem de transporte', 25.00, '2025-05-28', 32, 1),
('Academia', 'Mensalidade da academia', 100.00, '2025-05-27', 41, 1),
('Rendimento Poupança', 'Juros da poupança', 15.75, '2025-05-25', 6, 1),
('Combustível', 'Abastecimento do carro', 200.00, '2025-05-24', 31, 1),
('Cinema', 'Ingresso e pipoca', 50.00, '2025-05-23', 44, 1),
('Farmácia', 'Compra de medicamentos', 75.00, '2025-05-22', 39, 1),
('Venda de Roupa Usada', 'Venda em brechó online', 120.00, '2025-05-20', 11, 1),
('Mensalidade Curso', 'Mensalidade de curso de inglês', 250.00, '2025-05-19', 36, 1),
('Mercado Semanal', 'Compras para a semana', 200.00, '2025-05-18', 27, 1),
('Plano de Saúde', 'Mensalidade do plano de saúde', 300.00, '2025-05-15', 38, 1),
('Presente Recebido', 'Dinheiro de presente de aniversário', 100.00, '2025-05-10', 13, 1),
('Manutenção Carro', 'Troca de óleo e filtros', 350.00, '2025-05-08', 34, 1),
('Salário Mensal', 'Salário referente ao mês de abril', 3500.00, '2025-05-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de maio', 1200.00, '2025-05-05', 19, 1),
('Supermercado', 'Compras do mês', 400.00, '2025-05-03', 27, 1),
('Conta de Água', 'Conta de água de abril', 80.00, '2025-05-02', 22, 1),
('Netflix', 'Assinatura Netflix', 40.00, '2025-05-01', 43, 1),
('Reembolso Despesa', 'Reembolso de despesa de trabalho', 50.00, '2025-04-30', 12, 1),
('Pizza Delivery', 'Jantar de pizza', 70.00, '2025-04-28', 29, 1),
('Passagem Ônibus', 'Passagem de ônibus', 8.00, '2025-04-27', 32, 1),
('Cabeleireiro', 'Corte de cabelo', 60.00, '2025-04-25', 49, 1),
('Dividendos Ações', 'Recebimento de dividendos de ações', 25.00, '2025-04-20', 7, 1),
('Roupa Nova', 'Compra de camisa', 120.00, '2025-04-18', 47, 1),
('Livro', 'Compra de livro para estudo', 70.00, '2025-04-15', 37, 1),
('Mercado Semanal', 'Compras para a semana', 180.00, '2025-04-12', 27, 1),
('Consulta Médica', 'Consulta de rotina', 150.00, '2025-04-10', 40, 1),
('Salário Mensal', 'Salário referente ao mês de março', 3500.00, '2025-04-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de abril', 1200.00, '2025-04-05', 19, 1),
('Supermercado', 'Compras do mês', 420.00, '2025-04-03', 27, 1),
('Conta de Gás', 'Conta de gás de março', 60.00, '2025-04-02', 23, 1),
('Spotify Premium', 'Assinatura Spotify', 25.00, '2025-04-01', 43, 1),
('Bônus de Desempenho', 'Bônus do trabalho', 300.00, '2025-03-28', 4, 1),
('Bar com Amigos', 'Saída para bar', 95.00, '2025-03-25', 45, 1),
('Transporte Público', 'Recarga cartão', 50.00, '2025-03-20', 32, 1),
('Doação', 'Doação para instituição de caridade', 30.00, '2025-03-15', 55, 1),
('IPVA', 'Pagamento da primeira parcela IPVA', 250.00, '2025-03-10', 52, 1),
('Salário Mensal', 'Salário referente ao mês de fevereiro', 3500.00, '2025-03-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de março', 1200.00, '2025-03-05', 19, 1),
('Supermercado', 'Compras do mês', 470.00, '2025-03-03', 27, 1),
('Conta de Telefone', 'Conta de telefone de fevereiro', 70.00, '2025-03-02', 24, 1),
('Rendimentos Fundos', 'Lucro de investimento em fundos', 50.00, '2025-02-28', 8, 1),
('Comida Japonesa', 'Jantar em restaurante japonês', 110.00, '2025-02-25', 28, 1),
('Estacionamento', 'Estacionamento no shopping', 15.00, '2025-02-20', 35, 1),
('Perfume', 'Compra de perfume', 180.00, '2025-02-15', 50, 1),
('Fatura Cartão de Crédito', 'Pagamento fatura', 800.00, '2025-02-10', 54, 1),
('Salário Mensal', 'Salário referente ao mês de janeiro', 3500.00, '2025-02-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de fevereiro', 1200.00, '2025-02-05', 19, 1),
('Supermercado', 'Compras do mês', 380.00, '2025-02-03', 27, 1),
('Conta de Luz', 'Conta de energia elétrica de janeiro', 160.00, '2025-02-02', 21, 1),
('Cashback Cartão', 'Cashback de compras no cartão', 20.00, '2025-01-30', 14, 1),
('Viagem Curta', 'Passeio de fim de semana', 250.00, '2025-01-25', 42, 1),
('Mecânico', 'Pequeno reparo no carro', 100.00, '2025-01-20', 34, 1),
('Barbearia', 'Corte de cabelo e barba', 50.00, '2025-01-15', 49, 1),
('IPTU', 'Pagamento da primeira parcela IPTU', 180.00, '2025-01-10', 51, 1),
('Salário Mensal', 'Salário referente ao mês de dezembro', 3500.00, '2025-01-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de janeiro', 1200.00, '2025-01-05', 19, 1),
('Supermercado', 'Compras do mês', 410.00, '2025-01-03', 27, 1),
('Água e Esgoto', 'Conta de água e esgoto de dezembro', 70.00, '2025-01-02', 22, 1),
('13º Salário', 'Recebimento 13º salário', 1750.00, '2024-12-20', 3, 1),
('Presentes Natal', 'Compra de presentes de Natal', 500.00, '2024-12-15', 56, 1),
('Ceia Natalina', 'Compras para a ceia de Natal', 250.00, '2024-12-24', 27, 1),
('Jantar de Confraternização', 'Jantar de fim de ano da empresa', 100.00, '2024-12-22', 28, 1),
('Passagens Aéreas', 'Passagens para visitar família', 600.00, '2024-12-10', 42, 1),
('Salário Mensal', 'Salário referente ao mês de novembro', 3500.00, '2024-12-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de dezembro', 1200.00, '2024-12-05', 19, 1),
('Supermercado', 'Compras do mês', 390.00, '2024-12-03', 27, 1),
('TV a Cabo', 'Mensalidade TV a cabo', 80.00, '2024-12-01', 23, 1),
('Freelancer Projeto Y', 'Pagamento por projeto web', 700.00, '2024-11-28', 2, 1),
('Compras Black Friday', 'Eletrônico em promoção', 300.00, '2024-11-25', 47, 1),
('Almoço de Negócios', 'Almoço com cliente', 90.00, '2024-11-20', 28, 1),
('Conserto Celular', 'Troca de tela do celular', 150.00, '2024-11-15', 56, 1),
('Salário Mensal', 'Salário referente ao mês de outubro', 3500.00, '2024-11-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de novembro', 1200.00, '2024-11-05', 19, 1),
('Supermercado', 'Compras do mês', 430.00, '2024-11-03', 27, 1),
('Manutenção Predial', 'Taxa extra de manutenção do condomínio', 50.00, '2024-11-02', 26, 1),
('Reembolso Farmácia', 'Reembolso de despesa médica', 30.00, '2024-10-30', 12, 1),
('Passeio no Parque', 'Ingresso para evento cultural', 40.00, '2024-10-25', 44, 1),
('Financiamento Carro', 'Parcela do financiamento do carro', 450.00, '2024-10-20', 33, 1),
('Presente Aniversário', 'Presente para amigo', 80.00, '2024-10-15', 56, 1),
('Juros CDB', 'Rendimento de investimento CDB', 20.00, '2024-10-10', 7, 1),
('Salário Mensal', 'Salário referente ao mês de setembro', 3500.00, '2024-10-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de outubro', 1200.00, '2024-10-05', 19, 1),
('Supermercado', 'Compras do mês', 400.00, '2024-10-03', 27, 1),
('Conta de Telefone', 'Conta de telefone de setembro', 75.00, '2024-10-02', 24, 1),
('Bônus Trimestral', 'Bônus por metas alcançadas', 400.00, '2024-09-28', 4, 1),
('Jantar Fora', 'Jantar em restaurante sofisticado', 150.00, '2024-09-25', 28, 1),
('Cursos Online', 'Assinatura plataforma de cursos', 60.00, '2024-09-20', 36, 1),
('Imposto de Renda', 'Pagamento parcela imposto de renda', 100.00, '2024-09-15', 53, 1),
('Salário Mensal', 'Salário referente ao mês de agosto', 3500.00, '2024-09-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de setembro', 1200.00, '2024-09-05', 19, 1),
('Supermercado', 'Compras do mês', 460.00, '2024-09-03', 27, 1),
('Gás Encanado', 'Conta de gás de agosto', 55.00, '2024-09-02', 23, 1),
('Venda de Objeto', 'Venda de item antigo no OLX', 90.00, '2024-08-30', 11, 1),
('Academia Nova', 'Matrícula em nova academia', 150.00, '2024-08-28', 41, 1),
('Táxi', 'Corrida de táxi', 30.00, '2024-08-25', 32, 1),
('Pneu Novo', 'Compra de pneu para o carro', 280.00, '2024-08-20', 34, 1),
('Salário Mensal', 'Salário referente ao mês de julho', 3500.00, '2024-08-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de agosto', 1200.00, '2024-08-05', 19, 1),
('Supermercado', 'Compras do mês', 440.00, '2024-08-03', 27, 1),
('Conta de Luz', 'Conta de energia elétrica de julho', 140.00, '2024-08-02', 21, 1),
('Reembolso Médico', 'Reembolso de consulta médica', 100.00, '2024-07-30', 12, 1),
('Assinatura Jornal', 'Assinatura digital de jornal', 30.00, '2024-07-28', 43, 1),
('Lanches', 'Lanches rápidos durante o dia', 45.00, '2024-07-25', 30, 1),
('Dentista', 'Limpeza e consulta no dentista', 200.00, '2024-07-20', 40, 1),
('Salário Mensal', 'Salário referente ao mês de junho', 3500.00, '2024-07-05', 1, 1),
('Aluguel', 'Pagamento do aluguel de julho', 1200.00, '2024-07-05', 19, 1),
('Supermercado', 'Compras do mês', 480.00, '2024-07-03', 27, 1),
('Conta de Água', 'Conta de água de junho', 85.00, '2024-07-02', 22, 1);
