const normalize = (value) => value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const themeToggle = document.querySelector("#theme-toggle");
if (themeToggle) {
  themeToggle.checked = document.documentElement.dataset.theme === "dark";
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("estoque-theme", theme);
  });
}

function renderProducts() {
  const search = document.querySelector("#product-search");
  const categoryFilter = document.querySelector("#category-filter");
  const tableBody = document.querySelector("#product-rows");
  if (!search || !categoryFilter || !tableBody) return;

  const query = normalize(search.value);
  const selectedCategory = categoryFilter.options[categoryFilter.selectedIndex].textContent.trim();
  let visibleCount = 0;

  tableBody.querySelectorAll("tr").forEach((row) => {
    const matchesSearch = normalize(row.cells[0]?.textContent ?? "").includes(query);
    const matchesCategory = selectedCategory === "Todas"
      || normalize(row.cells[1]?.textContent ?? "") === normalize(selectedCategory);
    row.hidden = !(matchesSearch && matchesCategory);
    if (!row.hidden) visibleCount++;
  });

  const count = document.querySelector("#product-count");
  const emptyState = document.querySelector("#product-empty");
  const tableWrap = document.querySelector(".product-table-wrap");
  if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "produto encontrado" : "produtos encontrados"}`;
  if (emptyState) emptyState.hidden = visibleCount > 0;
  if (tableWrap) tableWrap.hidden = visibleCount === 0;
}

function renderMovements() {
  const search = document.querySelector("#movement-search");
  if (!search) return;
  const query = normalize(search.value);
  const rows = document.querySelectorAll("#movement-list .movement-row");
  let visibleCount = 0;

  rows.forEach((row) => {
    row.hidden = !normalize(row.textContent).includes(query);
    if (!row.hidden) visibleCount++;
  });

  const emptyState = document.querySelector("#movement-empty");
  if (emptyState) emptyState.hidden = visibleCount > 0;
}

function closeMenu() {
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#menu-overlay").classList.remove("open");
}

let fontScale = 1;
document.querySelector("#font-down")?.addEventListener("click", () => {
  fontScale = Math.max(.9, +(fontScale - .1).toFixed(1));
  document.documentElement.style.setProperty("--font-scale", fontScale);
});
document.querySelector("#font-up")?.addEventListener("click", () => {
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
  document.querySelector("#movement-type").value = button.dataset.type;
  document.querySelector(".form-submit span").textContent = `Registrar ${button.dataset.type.toLowerCase()}`;
}));
renderProducts();
renderMovements();