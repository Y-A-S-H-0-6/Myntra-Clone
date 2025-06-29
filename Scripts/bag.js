const Convsenience_FEES = 99;
let bagItemObject;
onLoad()

function onLoad() {
  loadBagItemObjects()
  displayBagElement();
  displayBagSummary()
}

function displayBagSummary() {
  let ElementBagSummary = document.querySelector('.bag-summary');
  let totalItem = bagItemObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalAmount = 0;

  bagItemObject.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
    finalAmount = totalMRP - totalDiscount + Convsenience_FEES;
  })

  ElementBagSummary.innerHTML = ` 
           <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">Rs ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convsenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
            </button>
  `
}


function loadBagItemObjects() {
  console.log(bagItem)
  bagItemObject = bagItem.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  })
  console.log(bagItemObject)
}

function removeBagItem(itemId) {
  localStorage.setItem('bagItem', JSON.stringify(bagItem));
  bagItem = bagItem.filter(bagItemId => bagItemId != itemId)
  loadBagItemObjects();
  displayBagIcon();
  displayBagElement();
  displayBagSummary();
}


function displayBagElement() {
  let containerElement = document.querySelector('.bag-items-container')
  let innerHTML = '';
  bagItemObject.forEach(bagItem => {
    innerHTML = innerHTML+generateItemHTML(bagItem)
  });
  containerElement.innerHTML = innerHTML;
          
              
}

function generateItemHTML(item) {
      return `
           <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeBagItem(${item.id})">X</div>
            </div>
          `
}