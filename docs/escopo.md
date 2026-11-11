# Escopo: Landing Page da Padaria Bella Vista

## 1. Objetivo principal
> Permitir que o cliente conheça os produtos e preços da Bella Vista e faça sua encomenda pelo WhatsApp, sem precisar perguntar o que a padaria oferece.

## 2. Seções da página (em ordem)
1. **Topo (header):** logo, menu e botão do WhatsApp
2. **Hero:** título, frase curta, botão "Fazer encomenda" e foto
3. **Destaques da casa:** pastel folheado, brownie recheado e salgados
4. **Cardápio com preços:** pães, confeitaria, salgados e cafeteria ("sob encomenda" quando não tiver preço fixo)
5. **Coffee break e cestas:** opções para empresas e eventos, sob orçamento
6. **Como encomendar:** passo a passo + entregas (Belém e Ananindeua, com taxa)
7. **Sobre nós:** 7 anos, padaria de bairro, produção própria
8. **Localização e horário:** endereço, "perto do aeroporto", horário e status "Aberto agora"
9. **Rodapé:** Instagram, WhatsApp, formas de pagamento

Depoimentos ficaram para depois: dependem de pedir autorização aos clientes.

## 3. Fora do escopo desta versão
- Depoimentos de clientes (falta autorização dos clientes)
- Carrinho de compras e pagamento online (as encomendas são pelo WhatsApp)
- Painel para a equipe atualizar preços e produtos (Supabase, fase 2, depois da entrega)
- Versão em inglês

**Fica no escopo:** mapa do Google embutido na seção de localização, com um link "Abrir no Google Maps" de reserva caso o mapa não carregue.

## 4. Estilo visual
Inspirado na referência enviada: visual limpo e elegante, fonte serifada nos títulos, cores marrom, laranja terroso e bege (identidade da Bella Vista), muito espaço em branco e fotos valorizadas.

## 5. Funcionalidades de JavaScript
1. **"Aberto agora / Fechado":** lê o dia e a hora do computador do visitante e mostra o status na seção de localização.
   - Segunda a sexta: 6h–11h e 15h–19h
   - Sábado: 7h–11h
   - Domingo: fechado (confirmar com a dona; feriados não entram nesta versão)
2. **Encomenda pelo WhatsApp:** formulário na seção "Como encomendar" em que o cliente escolhe produto e quantidade e informa o nome. O JS monta a mensagem e abre o WhatsApp da padaria com o texto pronto.
