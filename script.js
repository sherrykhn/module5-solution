(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
  
  // Step 1: Define category short names
  var categories = ["L", "D", "S", "SP"]; // Lunch, Dinner, Sushi, Specials

  function getRandomCategory() {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex]; // Picks a random category
  }

  // Convenience function for inserting innerHTML for 'select'
  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  }

  // Show loading icon inside element identified by 'selector'
  function showLoading(selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  }

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // Load home snippet page
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (responseText) {
        var randomCategoryShortName = getRandomCategory(); // Get random category
        responseText = responseText.replace("{{randomCategoryShortName}}", "'" + randomCategoryShortName + "'");
        insertHtml("#main-content", responseText);
      },
      false
    );
  });

  // Load the menu categories view
  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowCategoriesHTML
    );
  };

  // Load the menu items view
  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      menuItemsUrl + categoryShort,
      buildAndShowMenuItemsHTML
    );
  };

  global.$dc = dc;
})(window);
