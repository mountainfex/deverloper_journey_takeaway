let meals = [
  {
    mealName: "Dürüm Kebap",
    ingredients: "mit Krautsalat, Mischsalat, Zwiebeln, Tzaziki und Gurken",
    mealPrice: "7.50",
  },
  {
    mealName: "Dürüm Kebap-Spezial",
    ingredients:
      "mit Krautsalat, Mischsalat, Zwiebeln, Tzaziki, Gurken und mit Käse überbacken",
    mealPrice: "8.00",
  },
  {
    mealName: "Dürüm Kebap-Sucuk",
    ingredients:
      "mit Krautsalat, Mischsalat, Zwiebeln, Tzaziki, Gurken, türkischer Knoblauchwurst",
    mealPrice: "8.00",
  },
  {
    mealName: "Pizza Margerita",
    ingredients: "mit Tomatensoße, Käse",
    mealPrice: "6.00",
  },
  {
    mealName: "Pizza Salami",
    ingredients: "mit Tomatensoße, Salami, Käse",
    mealPrice: "6.50",
  },
  {
    mealName: "Pizza Kebap",
    ingredients: "mit Tomatensoße, Kebapfleisch, Zwiebeln, Käse",
    mealPrice: "8.50",
  },
  {
    mealName: "Pizza Twister",
    ingredients:
      "mit Tomatensoße, Kebapfleisch, Zwiebeln, Brokkoli, Sauce-Hollandaise, Käse",
    mealPrice: "8.50",
  },
  {
    mealName: "Pizza Karam",
    ingredients:
      "mit Tomatensoße, Hähnchenfleisch, Mais, frischen Champignons, Sauce-Hollandaise, Käse",
    mealPrice: "8.50",
  },
  {
    mealName: "Pizza Schinken",
    ingredients: "mit Tomatensoße, Schinken, Käse",
    mealPrice: "6.50",
  },
  {
    mealName: "Pizza Venezia",
    ingredients: "mit Tomatensoße, Salami, Schinken, Zwiebeln, Käse",
    mealPrice: "7.50",
  },
  {
    mealName: "Pizza Peperoni",
    ingredients: "mit Tomatensoße, Peperoni Käse",
    mealPrice: "6.50",
  },
  {
    mealName: "Pizza Sucuk",
    ingredients: "mit Tomatensoße, türkischer Knoblauchwurst, Käse",
    mealPrice: "7.50",
  },
  {
    mealName: "Pizza Veggie",
    ingredients: "mit Tomatensoße, Pilze, Paprika, Zwiebeln, Mais, Käse",
    mealPrice: "8.50",
  },
];

let cart = [];

function render() {
  let content = document.getElementById("menucontent");
  content.innerHTML = "";

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    content.innerHTML += generateContent(meal, i);
  }
}

function generateContent(meal, i) {
  return `
  <div class="menu">
  <div class="contentdish">
    <div class="dish" onclick="addtocart(${i})">
      <h3>${meal["mealName"]}</h3>
      <span>${meal["ingredients"]}</span>
      <span class="price">${meal["mealPrice"]} €</span>
      <img class="adddish" src="img/plus-8-48.png" alt="" />
    </div>
  </div>
</div>
    `;
}

function getIndex(word, array) {
  var index = array.findIndex((obj) => obj.mealName == word);
  console.log(index);
  return index;
}

function addtocart(i) {
  let meal = meals[i];
  let index = getIndex(meal["mealName"], cart);
  if (index == -1) {
    cart.push(meal);
    newIndex = getIndex(meal["mealName"], cart);
    cart[newIndex]["amount"] = 1;
  } else {
    cart[index]["amount"]++;
  }

  console.log(index);

  renderCart();
}

// function getCartIndex(menu) {
//   let index = cart.indexOf(menu);
//   return index;
// }

function renderCart() {
  cartcontent = document.getElementById("shoppingcart");
  cartcontent.innerHTML = "";
  for (let c = 0; c < cart.length; c++) {
    const cartItem = cart[c];

    cartcontent.innerHTML += generateShoppingCart(c, cartItem);
  }
  generateCartButton();
  renderPayment();
}

function generatePrice(cartItem) {
  let singleprice = cartItem["mealPrice"];
  let newsingleprice = parseFloat(singleprice);
  let totalitemprice = newsingleprice * cartItem["amount"];
  let price = totalitemprice.toFixed(2);
  return price;
}

function generateShoppingCart(c, cartItem) {
  price = generatePrice(cartItem);
  return `
  <div class="cartamount">
  <div><b>${cartItem["amount"]}</b></div>
  <div class="basketMeal">
      <div class="cartmealname">
          <div><b>${cartItem["mealName"]}</b></div>
          <div>${price} €</div>
      </div>
      <div class="cartmealname">
          <a href="#" class="subheadDescription">Anmerkung hinzufügen</a>
          <div class="carticons">
              <img src="img/remove_FILL0_wght400_GRAD0_opsz48.svg" alt="" onclick="decreaseBasket(${c})" class="iconbtn">
              <img src="img/add_FILL0_wght400_GRAD0_opsz48.svg" alt="" onclick="increaseBasket(${c})" class="iconbtn">
          </div>
      </div>
  </div>
</div>`;
}

function generateSubTotal() {
  let subA = 0;
  for (let i = 0; i < cart.length; i++) {
    let subPriceA = cart[i]["mealPrice"];
    let subPriceB = parseFloat(subPriceA);
    subA += subPriceB * cart[i]["amount"];
  }
  subB = subA.toFixed(2);
  return subB;
}

function renderPayment() {
  let subtotal = generateSubTotal();
  let subtotalB = +subtotal + 5;
  let incldelivery = subtotalB.toFixed(2);
  shoppingcart = document.getElementById("shoppingcart");
  shoppingcart.innerHTML += generatePaymentSec(subtotal, incldelivery);

  mediashoppingcart = document.getElementById("mediacart");
  mediashoppingcart.innerHTML = generateCartButton(incldelivery);
}

function generateCartButton(incldelivery) {
  return `<div class="mediatotalCost" onclick="showcart()">
Warenkorb (${incldelivery} €)
</div>`;
}

function generatePaymentSec(subtotal, incldelivery) {
  return `<div class="subPrice">
  <div>Zwischensumme</div>
  <div>${subtotal} €</div>
</div>
<div class="supplierCost">
  <div>Lieferkosten</div>
  <div>5.00 €</div>
</div>
<div class="subPrice">
  <div>Gesamtsumme</div>
  <div>${incldelivery} €</div>
</div>
<div class="totalCost" id="totalCost">
  Bezahlen (${incldelivery} €)
</div>`;
}

function increaseBasket(i) {
  cart[i]["amount"]++;
  renderCart();
}

function decreaseBasket(i) {
  cart[i]["amount"]--;
  if (cart[i]["amount"] == 0) {
    cart.splice(i, 1);
    renderCart();
  }
  if (cart.length == 0) {
    renderEmptyBasket();
  } else {
    renderCart();
  }
}

function renderEmptyBasket() {
  document.getElementById("shoppingcart").innerHTML = `
  <img src="img/cart-12-128.png" alt="" />
  <span class="subline">Fülle deinen Warenkorb</span>
  <span class="subsubline">Bestelle leckere Gerichte von unserer Speisekarte</span>`;

  mediashoppingcart = document.getElementById("mediacart");
  mediashoppingcart.innerHTML = `<div class="mediatotalCost" onclick="showcart()">
  Warenkorb
</div>`;
}

function showcart() {
  let element = document.getElementById("showcart").classList;
  let contenthead = document.getElementById("contenthead").classList;
  if (element.contains("displayon")) {
    element.remove("displayon");
    contenthead.remove("dnone");
  } else {
    element.add("displayon");
    contenthead.add("dnone");
  }
}
