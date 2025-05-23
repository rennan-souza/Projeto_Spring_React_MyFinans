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