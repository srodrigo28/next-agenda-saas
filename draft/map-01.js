/**
 * Exemplo 1 — Imprimir nome e categoria
 */

const usuarios = [
  { usuario: "Ana", categoria: "admin" },
  { usuario: "Bruno", categoria: "editor" },
  { usuario: "Carla", categoria: "viewer" }
];

usuarios.map(item => {
  console.log(`${item.usuario} é da categoria ${item.categoria}`);
});

/**
 * Exemplo 2 — Criar um novo array com mensagens formatadas
 */

const usuarios2 = [
  { usuario: "Lucas", categoria: "premium" },
  { usuario: "Marina", categoria: "free" },
  { usuario: "Rafa", categoria: "premium" }
];

const mensagens = usuarios2.map(u => {
  return `Usuário: ${u.usuario} | Categoria: ${u.categoria}`;
});

console.log(mensagens);

/**
 * Exemplo 3 — Selecionar só usuários de uma categoria e transformar
 */
const usuarios3 = [
  { usuario: "João", categoria: "gold" },
  { usuario: "Pedro", categoria: "silver" },
  { usuario: "Sara", categoria: "gold" }
];

const goldUsers = usuarios3
  .filter(u => u.categoria === "gold")
  .map(u => ({
    nome: u.usuario.toUpperCase(),
    tipo: u.categoria
  }));

console.log(goldUsers);
