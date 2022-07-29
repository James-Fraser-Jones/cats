var modal = document.getElementById("modal");
var items = document.getElementById("items");
var cart = document.getElementById("cart");
var total = document.getElementById("total");

function buy(thing) {
  modal.children[0].children[0].textContent = "Buying: " + thing;
  modal.children[0].children[3].value = 1;

  modal.style.visibility = "visible";
}

function cancel() {
  modal.style.visibility = "hidden";
}

function buy_quantity() {
  let thing = modal.children[0].children[0].textContent.slice(8);
  let quantity = modal.children[0].children[3].value;

  for (let i = 0; i < items.children[1].childElementCount; i++) {
    let item_row = items.children[1].children[i];
    let name = item_row.children[0].textContent;
    if (name == thing) {
      
      let available = parseInt(item_row.children[2].textContent);
      let bought = Math.min(quantity, available);
      let price = parseFloat(item_row.children[1].textContent.slice(1));
      
      let new_row = true;
      for (let j = 1; j < cart.children[1].childElementCount; j++) {
        let cart_row = cart.children[1].children[j];
        if (cart_row.children[0].textContent == thing) {
          new_row = false;
          let current_quantity = parseInt(cart_row.children[2].textContent);
          let new_quantity = current_quantity + bought;
          cart_row.children[2].textContent = new_quantity;
        }
      }
      if (new_row) {
        let clone = cart.children[1].children[0].cloneNode(true);
        clone.style.display = null;
        clone.children[0].textContent = name;
        clone.children[1].textContent = "£" + price.toFixed(2);
        clone.children[2].textContent = bought;
        cart.children[1].appendChild(clone);
      }

      let total_val = parseFloat(total.textContent.slice(1));
      total_val += price * bought;
      total.textContent = "£" + total_val.toFixed(2);

      let remaining = available - bought;
      if (remaining > 0) {
        item_row.children[2].textContent = remaining;
      }
      else {
        item_row.parentNode.removeChild(item_row);
      }

      break;
    }
  };

  modal.style.visibility = "hidden";
}