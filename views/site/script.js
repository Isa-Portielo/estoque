const products = [
  { name: "Cadeira Nórdica",
    sku: "CAD-001",
    category: "Móveis",
    supplier: "Casa & Design",
    stock: 24,
    price: "R$ 589,90",
    color: "lilac" },

  { name: "Luminária Aura",
    sku: "LUM-024",
    category: "Iluminação",
    supplier: "Luz & Cia",
    stock: 8,
    price: "R$ 219,50",
    color: "peach" },

  { name: "Mesa Lateral Lina",
    sku: "MES-018",
    category: "Móveis",
    supplier: "Casa & Design",
    stock: 16,
    price: "R$ 439,00",
    color: "blue" },

  { name: "Vaso Orgânico",
    sku: "VAS-032",
    category: "Decoração",
    supplier: "Essência",
    stock: 32,
    price: "R$ 129,90",
    color: "pink" },

  { name: "Poltrona Serena",
    sku: "POL-009",
    category: "Móveis",
    supplier: "Forma Viva",
    stock: 4,
    price: "R$ 1.199,00",
    color: "purple" },

  { name: "Tapete Horizonte",
    sku: "TAP-015",
    category: "Têxteis",
    supplier: "Trama Brasil",
    stock: 11,
    price: "R$ 349,90",
    color: "mint" },

];

const movements = [
  { product: "Cadeira Nórdica",
    meta: "CAD-001 · Casa & Design",
    type: "Entrada",
    qty: 12,
    date: "Hoje, 09:42",
    user: "Marina Costa" },

  { product: "Luminária Aura",
    meta: "LUM-024 · Luz & Cia",
    type: "Saída",
    qty: 3,
    date: "Hoje, 08:16",
    user: "Rafael Lima" },

  { product: "Vaso Orgânico",
    meta: "VAS-032 · Essência",
    type: "Entrada",
    qty: 20,
    date: "Ontem, 16:24",
    user: "Marina Costa" },

  { product: "Poltrona Serena",
    meta: "POL-009 · Forma Viva",
    type: "Saída",
    qty: 2,
    date: "Ontem, 14:08",
    user: "João Alves" },

  { product: "Mesa Lateral Lina",
    meta: "MES-018 · Casa & Design",
    type: "Entrada",
    qty: 8,
    date: "22 mai, 11:40",
    user: "Marina Costa" },

];

const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function renderProducts() {
  const search = document.querySelector("#product-search");
  if (!search) return;
  const query = normalize(search.value);
  const category = document.querySelector("#category-filter").value;
  const filtered = products.filter((product) => normalize(`${product.name} ${product.sku}`).includes(query) && (category === "Todas" || product.category === category));
  document.querySelector("#product-rows").innerHTML = filtered.map((product) => `
    <tr>
      <td>
        <div class="product-cell">
          <span class="product-thumb ${product.color}">${icon("package")}</span>
        <div>
          <strong>${product.name}</strong>
          <span>${product.sku}</span>
        </div>
        </div>
      </td>
      <td>${product.category}</td>
      <td>${product.supplier}</td>
      <td><strong>${product.stock}</strong> un.</td>
      <td>${product.price}</td>
      <td>
        <span class="status-pill ${product.stock < 10 ? "low" : "ok"}">${product.stock < 10 ? "Estoque baixo" : "Em estoque"}</span>
      </td>
    </tr>`).join("");
  document.querySelector("#product-count").textContent = `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
  document.querySelector("#product-empty").hidden = filtered.length > 0;
  document.querySelector(".product-table-wrap").hidden = filtered.length === 0;
}

function renderMovements() {
  const search = document.querySelector("#movement-search");
  if (!search) return;
  const query = normalize(search.value);
  const filtered = movements.filter((item) => normalize(item.product).includes(query));
  document.querySelector("#movement-list").innerHTML = filtered.map((item) => {
    const incoming = item.type === "Entrada";
    return `<div class="movement-row">
      <span class="movement-icon ${incoming ? "in" : "out"}">${icon(incoming ? "down" : "up")}</span>
      <div class="movement-product">
        <strong>${item.product}</strong>
        <span>${item.meta}</span>
      </div>
      <span class="movement-type ${incoming ? "in" : "out"}">${item.type}</span>
      <strong class="movement-qty">${incoming ? "+" : "−"}${item.qty} un.</strong>
      <div class="movement-date">
        <strong>${item.date}</strong>
        <span>${item.user}</span>
      </div>
    </div>`;
  }).join("");
  document.querySelector("#movement-empty").hidden = filtered.length > 0;
}

function closeMenu() {
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#menu-overlay").classList.remove("open");
}

let fontScale = 1;
document.querySelector("#font-down").addEventListener("click", () => {
  fontScale = Math.max(.9, +(fontScale - .1).toFixed(1));
  document.documentElement.style.setProperty("--font-scale", fontScale);
});
document.querySelector("#font-up").addEventListener("click", () => {
  fontScale = Math.min(1.2, +(fontScale + .1).toFixed(1));
  document.documentElement.style.setProperty("--font-scale", fontScale);
});
document.querySelector("#open-menu").addEventListener("click", () => {
  document.querySelector("#sidebar").classList.add("open");
  document.querySelector("#menu-overlay").classList.add("open");
});
document.querySelector("#close-menu").addEventListener("click", closeMenu);
document.querySelector("#menu-overlay").addEventListener("click", closeMenu);
document.querySelector("#product-search")?.addEventListener("input", renderProducts);
document.querySelector("#category-filter")?.addEventListener("change", renderProducts);
document.querySelector("#movement-search")?.addEventListener("input", renderMovements);
document.querySelectorAll("[data-type]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-type]").forEach((item) => item.classList.remove("active", "exit"));
  button.classList.add("active");
  if (button.dataset.type === "Saída") button.classList.add("exit");
  document.querySelector(".form-submit span").textContent = `Registrar ${button.dataset.type.toLowerCase()}`;
}));
document.querySelector("#movement-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  const toast = document.querySelector("#toast");
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 3000);
});
renderProducts();
renderMovements();
