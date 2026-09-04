/* ============ PRODUCT DATA ============ */
let pr = [
    {id:'p1', name:'Pistachio &amp; Rose Water Tart', desc:'Crisp shortcrust, pistachio frangipane, rose glaze.', price:980, cat:'tarts', badges:['vegan'], img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80'},
    {id:'p2', name:'Classic Butter Croissant', desc:'72-hour laminated dough, golden and flaky.', price:450, cat:'croissants', badges:[], img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80'},
    {id:'p3', name:'Rose Vanilla Layer Cake', desc:'Vanilla sponge, whipped cream, candied petals.', price:3200, cat:'cakes', badges:['nutfree'], img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'},
    {id:'p4', name:'Salted Caramel Cake Slice', desc:'Dark chocolate sponge, salted caramel drip.', price:650, cat:'cakes', badges:[], img:'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=700&q=80'},
    {id:'p5', name:'Berry Fruit Tart', desc:'Silky custard, glazed seasonal berries.', price:890, cat:'tarts', badges:['nutfree'], img:'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?auto=format&fit=crop&w=700&q=80'},
    {id:'p6', name:'Flourless Chocolate Torte', desc:'Dense dark chocolate torte, cocoa dust.', price:1350, cat:'gf', badges:['gf','nutfree'], img:'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=700&q=80'},
    {id:'p7', name:'Almond Gluten-Free Cake', desc:'Ground almond sponge, orange blossom syrup.', price:1200, cat:'gf', badges:['gf'], img:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=700&q=80'},
    {id:'p8', name:'Iced Vanilla Latte', desc:'Double espresso, vanilla, cold milk over ice.', price:650, cat:'drinks', badges:[], img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80'},
    {id:'p9', name:'Fresh Orange Juice', desc:'Cold-pressed, no added sugar.', price:480, cat:'drinks', badges:['vegan','gf'], img:'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80'},
    {id:'p10', name:'Chocolate Hazelnut Croissant', desc:'Laminated dough, dark chocolate &amp; hazelnut praline.', price:520, cat:'croissants', badges:[], img:'https://images.unsplash.com/photo-1620921575084-1e29a9dab7e3?auto=format&fit=crop&w=700&q=80'},
    {id:'p11', name:'Macaron Box (6)', desc:'Crisp shells, chewy centers, six daily flavors.', price:1150, cat:'gf', badges:['gf'], img:'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=700&q=80'},
    {id:'p12', name:'Lemon Meringue Tart', desc:'Tangy lemon curd, torched Italian meringue.', price:820, cat:'tarts', badges:[], img:'https://images.unsplash.com/photo-1519869491415-1e5f9b2f4b7a?auto=format&fit=crop&w=700&q=80'},
];

let products = [];

/* ============ HELPERS ============ */
function showToast(msg){
    $('#toastMsg').text(msg);
    $('#toast').addClass('show');
    setTimeout(()=> $('#toast').removeClass('show'), 2200);
}

/* ============ STATE ============ */
let cart = {};
let fulfillment = 'pickup';
let selectedSlot = '9-11';
let currentModalProduct = null;
let modalQty = 1;

/* ============ GET DATA FROM DATABASE ============ */
function getFoodItems(){
    const obj = {
        item_name: null,
        item_category: null,
        item_badges: null
    };

    $.ajax({
        url: "http://localhost:8080/v1/foodItems/getAllFoodItems",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (r){
            if(r.status === 200){
                products = r.body;
                renderGrid();
            }
            else if(r.status === 401){
                showToast("Please Login First");
                setTimeout(()=>{
                    window.location.href = "customerLogin.html";
                }, 2000);
            }
            else {
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
            console.log(r);
        }
    });
}

getFoodItems();

/* ============ RENDER GRID ============ */
const $grid = $('#productGrid');

function badgesHTML(badges = []){
    let html = "";
    badges.map(b => {
        let bClass = '';
        if(b === "Gluten-Free"){ bClass = "gf"; }
        else if(b === "Vegan"){ bClass = "vegan"; }
        else if (b === "Nut-Free"){ bClass = "nutfree"; }
        html += `<span class="badge ${bClass}">${b}</span>`;
    });
    return html;
}

function getBadgesList(inputString) {
    if (!inputString) return [];
    return inputString.split(',').map(word => word.trim()).filter(Boolean);
}

function renderGrid(){

    let html = "";

    products.map((p, i) => {

        let stylePrice = "";
        let styleDiscount = "";
        let finalPrice = 0;

        if(p.discount === 0){
            styleDiscount = "style=\"display: none\"";
        }
        else{
            stylePrice = "style=\"text-decoration-line: line-through\"";
            finalPrice = p.price - p.discount;
        }

        html +=`
        <div class="p-card" data-cat="${p.foodItemCategory}" style="animation-delay:${i * 0.05}s">
          <div class="p-media">
            <div class="badge-row">${badgesHTML(getBadgesList(p.badges))}</div>
            <img src="${p.imagePath}" alt="${p.foodItemName}">
            <div class="p-overlay">
              <button class="quick-view-btn" data-id="${p.foodItemId}" aria-label="Quick view">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
              </button>
            </div>
          </div>
          <div class="p-body">
            <h3>${p.foodItemName}</h3>
            <p class="desc">${p.description}</p>
            <div class="p-foot">
              <span class="price" ${stylePrice}>Rs. ${p.price.toLocaleString()}</span>
              <span class="price" ${styleDiscount}>Rs. ${finalPrice.toLocaleString()}</span>
              <button class="add-btn" data-id="${p.foodItemId}"><span class="plus">+</span> Add</button>
            </div>
          </div>
        </div>`;
        }
    );

    $grid.html(html);
}

/* ============ FILTER BAR ============ */

const $filterBar = $('#filterBar');

function getFoodItemCategories(){
    $.ajax({
        url: "http://localhost:8080/v1/foodItems/getAllFoodItemCategories",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        success: function (r){
            if(r.status === 200){
                renderFilterBar(r.body);
            } else {
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
        }
    });
}
getFoodItemCategories();

function renderFilterBar(categoryList){
    let html = `<button class="pill active" data-filter="all">All</button>`;
    html += categoryList.map((c)=> `
        <button class="pill" data-filter="${c.foodItemCatName}">${c.foodItemCatName}</button>
    `).join('');

    $filterBar.html(html);
}

$filterBar.on('click', '.pill', function() {
    $filterBar.find('.pill').removeClass('active');
    $(this).addClass('active');

    const cat = $(this).data('filter');
    $('.p-card').each(function() {
        const match = cat === 'all' || $(this).data('cat') === cat;
        $(this).toggleClass('hidden', !match);
    });
});

/* ============ CART LOGIC ============ */
const $cartCountEl = $('#cartCount');
const $floatOrder = $('#floatOrder');

function addToCart(id, qty = 1){
    cart[id] = (cart[id] || 0) + qty;
    updateCartUI();

    $floatOrder.removeClass('bump');
    // Force browser reflow to re-trigger CSS animation
    void $floatOrder[0].offsetWidth;
    $floatOrder.addClass('bump');
}

function removeFromCart(id){
    delete cart[id];
    updateCartUI();
}

function setQty(id, qty){
    if(qty <= 0){ removeFromCart(id); return; }
    cart[id] = qty;
    updateCartUI();
}

function cartCount(){
    return Object.values(cart).reduce((a, b) => a + b, 0);
}

function subtotal(){
    return Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = products.find(pr => (pr.foodItemId) == id);
        return sum + (p ? p.price * qty : 0);
    }, 0);
}

function calTotalDiscount(){
    return Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = products.find(pr => (pr.foodItemId) == id);
        return sum + (p ? p.discount * qty : 0);
    }, 0);
}

function updateCartUI(){
    $cartCountEl.text(cartCount());
    renderCartItems();
    renderSummary();
}

function renderCartItems(){
    const $wrap = $('#cartItemsWrap');
    const ids = Object.keys(cart);

    if(ids.length === 0){
        $wrap.html(`<div class="cart-empty"><div class="icon">🥐</div><div>Your box is empty.<br>Add something delicious!</div></div>`);
        return;
    }

    const itemsHtml = ids.map(id => {
        const p = products.find(pr => pr.foodItemId == id);
        const qty = cart[id];
        return `
      <div class="cart-item" data-id="${id}">
        <img src="${p.imagePath}" alt="${p.foodItemName}">
        <div class="cart-item-info">
          <h4>${p.foodItemName}</h4>
          <div class="unit-price">Rs. ${(p.price - p.discount).toLocaleString()} each</div>
          <div class="qty-stepper" style="margin-top:8px;">
            <button class="qminus" data-id="${id}">−</button>
            <span>${qty}</span>
            <button class="qplus" data-id="${id}">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <span class="line-total">Rs. ${((p.price - p.discount) * qty).toLocaleString()}</span>
          <span class="cart-item-remove" data-id="${id}">Remove</span>
        </div>
      </div>
    `;
    }).join('');

    $wrap.html(itemsHtml);
}

function renderSummary(){

    const sub = subtotal();
    const totalDiscount = calTotalDiscount();
    const total = sub - totalDiscount ;

    $('#sumSubtotal').text(`Rs. ${sub.toLocaleString()}`);
    $('#sumDiscount').text(`Rs. ${totalDiscount.toLocaleString()}`);
    $('#sumTotal').text(`Rs. ${total.toLocaleString()}`);
    $('#checkoutLabel').text(`Proceed to Checkout • Rs. ${total.toLocaleString()}`);

    $('#checkoutBtn').prop('disabled', cartCount() === 0);
}

// Delegate add to cart / quick view clicks from product grid
$grid.on('click', '.add-btn', function() {
    const $addBtn = $(this);
    const id = $addBtn.data('id');
    addToCart(id, 1);

    $addBtn.addClass('added');
    const originalHtml = $addBtn.html();
    $addBtn.html('<span class="plus">✓</span> Added');

    setTimeout(() => {
        $addBtn.removeClass('added').html(originalHtml);
    }, 1100);
});

$grid.on('click', '.quick-view-btn', function() {
    openQuickView($(this).data('id'));
});

// Delegate stepper and removal actions inside cart
$('#cartItemsWrap').on('click', function(e) {
    const $target = $(e.target);

    if ($target.hasClass('qminus')) {
        const id = $target.data('id');
        setQty(id, cart[id] - 1);
    } else if ($target.hasClass('qplus')) {
        const id = $target.data('id');
        setQty(id, cart[id] + 1);
    } else if ($target.hasClass('cart-item-remove')) {
        const id = $target.data('id');
        removeFromCart(id);
    }
});

/* ============ DRAWER OPEN/CLOSE ============ */
const $drawer = $('#drawer');
const $scrim = $('#scrim');

function openDrawer(){
    $drawer.addClass('open');
    $scrim.addClass('show');
}

function closeDrawer(){
    $drawer.removeClass('open');
    $scrim.removeClass('show');
}

$floatOrder.on('click', openDrawer);
$('#drawerClose').on('click', closeDrawer);
$scrim.on('click', () => { closeDrawer(); closeModal(); });

/* ============ FULFILLMENT ============ */
$('.fulfil-card').on('click', function() {
    $('.fulfil-card').removeClass('active');
    $(this).addClass('active');
    fulfillment = $(this).data('fulfil');
    renderSummary();
});

/* ============ TIME SLOTS ============ */
$('#slotGrid').on('click', '.slot', function() {
    $('.slot').removeClass('active');
    $(this).addClass('active');
    selectedSlot = $(this).data('slot');
});

const $dateInput = $('#orderDate');
$dateInput.val(new Date().toISOString().split('T')[0]);
$dateInput.attr('min', new Date().toISOString().split('T')[0]);

/* ============ CHECKOUT BUTTON ============ */
const $checkoutBtn = $('#checkoutBtn');
$checkoutBtn.on('click', function(e) {
    if ($(this).is(':disabled')) return;

    const rect = this.getBoundingClientRect();
    const $ripple = $('<span>', { class: 'ripple' });
    const size = Math.max(rect.width, rect.height);

    $ripple.css({
        width: size + 'px',
        height: size + 'px',
        left: (e.clientX - rect.left - size/2) + 'px',
        top: (e.clientY - rect.top - size/2) + 'px'
    });

    $(this).append($ripple);
    setTimeout(() => $ripple.remove(), 650);

    const $label = $('#checkoutLabel');
    const originalText = $label.text();

    $(this).addClass('success');
    $label.text('✓ Order Confirmed');

    setTimeout(() => {
        $(this).removeClass('success');
        $label.text(originalText);
    }, 1800);
});

/* ============ QUICK VIEW MODAL ============ */
const $modal = $('#quickViewModal');

function openQuickView(id){
    currentModalProduct = products.find(p => (p.foodItemId || p.id) === id);
    modalQty = 1;

    $('#modalImg').attr({
        src: currentModalProduct.imagePath || currentModalProduct.img,
        alt: currentModalProduct.foodItemName || currentModalProduct.name
    });

    $('#modalTitle').html(currentModalProduct.foodItemName || currentModalProduct.name);
    $('#modalDesc').text(currentModalProduct.description || currentModalProduct.desc);
    $('#modalPrice').text(`Rs. ${currentModalProduct.price.toLocaleString()}`);
    $('#modalBadges').html(badgesHTML(getBadgesList(currentModalProduct.badges)));
    $('#modalQty').text(modalQty);

    $modal.addClass('show');
    $scrim.addClass('show');
}

function closeModal(){
    $modal.removeClass('show');
    if(!$drawer.hasClass('open')) $scrim.removeClass('show');
}

$('#modalClose').on('click', closeModal);

$('#modalMinus').on('click', () => {
    modalQty = Math.max(1, modalQty - 1);
    $('#modalQty').text(modalQty);
});

$('#modalPlus').on('click', () => {
    modalQty += 1;
    $('#modalQty').text(modalQty);
});

$('#modalAdd').on('click', () => {
    addToCart(currentModalProduct.foodItemId || currentModalProduct.id, modalQty);
    closeModal();
    openDrawer();
});

$(document).on('keydown', e => {
    if(e.key === 'Escape'){ closeDrawer(); closeModal(); }
});

updateCartUI();