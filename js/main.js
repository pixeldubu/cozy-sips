// Fetch recipes from recipes.json
$.getJSON("data/recipes.json", function(recipes) {

  // Show recipes on the page 
  function renderRecipes(filtered) {
    const list = $("#recipe-list");
    list.empty();

    // Go through each recipe
    filtered.forEach((r) => {

      // Create credit HTML if one exists
      let creditHtml = "";
      if (r.credit) {
        creditHtml = `<div class="credit">Credit: <a href="${r.credit.url}" target="_blank">${r.credit.name} (${r.credit.platform})</a></div>`;
      }

      // Add recipe blocks containing recipe name, image, ingredients, instructions and credits
      list.append(`
        <div class="recipe-block">
          <h2>${r.name}</h2>
          <img src="images/recipes/${r.image}" alt="${r.name}"/>
          <h3>ingredients:</h3>
          <ul>
            ${r.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
          <h3>instructions:</h3>
          <ol>
            ${r.instructions.map((inst) => `<li>${inst}</li>`).join("")}
          </ol>
          ${creditHtml}
        </div>
      `);
    });
  }

  // Show all recipes on initial load
  renderRecipes(recipes);

  // Category filter (matcha, coffee, syrup, cream)
  $(".buttons button").click(function () {
    const category = $(this).data("category");
    const filtered = recipes.filter(function (recipe) {
      return recipe.category === category;
    });
    renderRecipes(filtered);
  });

  // Search filter (checks for query in recipe name)
  $("#search-bar").on("input", function () {
    const query = $(this).val().toLowerCase();
    const filtered = recipes.filter(function (recipe) {
      return recipe.name.toLowerCase().includes(query);
    });
    renderRecipes(filtered);
  });
});