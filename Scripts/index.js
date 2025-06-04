let bagItem;
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem('bagItem');
  bagItem = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemsOnHomepage();
  displayBagIcon();
}


function addTobag(itemId) {
  bagItem.push(itemId);
  localStorage.setItem('bagItem', JSON.stringify(bagItem));
  displayBagIcon();
}

function displayBagIcon() {
  let bagElement = document.querySelector('.bag-item-count')
  if (bagItem.length > 0) {
    bagElement.style.visibility = 'visible';
    bagElement.innerText = bagItem.length;
  } else {
    bagElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomepage() {
  let ItemElementContainer = document.querySelector('.items-container');
  if (!ItemElementContainer) {
    return;
  }
  
let innerHtml = '';
items.forEach(item => {
  innerHtml += `
  <div class="item-container">
 <img class="item-image" src="${item.image}" alt="item image">
 <div class="rating">
  ⭐${item.rating.stars} | ${item.rating.count}
  </div>
  <div class="company-name">${item.company}</div>
  <div class="item-name">${item.item_name}</div>
  <div class="price">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="original-price">Rs ${item.original_price}</span>
      <span class="discount">(${item.discount_percentage}% OFF)</span>
  </div>
  <button class="btn-add-bag" onclick="addTobag(${item.id})">  Add to Bag</button>
</div>`
});
ItemElementContainer.innerHTML = innerHtml;
}
