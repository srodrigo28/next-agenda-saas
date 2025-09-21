#### 6 Principais Melhorias Aplicadas:
> ##### 1. Centralização dos Dados (DRY - Don't Repeat Yourself): Os links da sidebar foram definidos em um único array (navItems) em vez de serem repetidos três vezes no código. Agora, para adicionar ou remover um link, você só precisa mexer em um lugar.


> ##### 2. Reutilização de Componentes: Criei um novo componente (NavLinks) para renderizar a lista de links. Ele é usado tanto na sidebar do desktop quanto no menu móvel (Sheet), eliminando a duplicação de lógica.

> ##### 3. Simplificação da Lógica: A lógica para exibir a sidebar expandida/recolhida foi simplificada, removendo o uso desnecessário do componente Collapsible e de um bloco condicional isCollapsed && ..., já que um único map resolve ambos os casos.

> ##### 4. Acessibilidade (A11y): Adicionei aria-label aos botões que contêm apenas ícones, o que é crucial para leitores de tela.

> ##### 5. Estilização e Consistência: O componente SidebarLink foi melhorado para ter uma área de clique maior e um espaçamento mais flexível. O botão de recolher/expandir foi estilizado para ser mais sutil e consistente com a UI.

> ##### 6. Legibilidade: O código está mais organizado e fácil de ler, com a lógica de navegação separada do layout principal.