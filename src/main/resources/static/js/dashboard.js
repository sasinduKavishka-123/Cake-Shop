/* ============================================================
   MOCK DATA
   ============================================================ */
let orders = [
    {id:'ORD-1042', customer:'Nadeesha Perera', items:'2x Butter Croissant, 1x Rose Cake', total:4100, status:'Pending', date:'2026-08-11'},
    {id:'ORD-1041', customer:'Kavindu Silva', items:'1x Berry Tart, 2x Latte', total:2190, status:'Preparing', date:'2026-08-11'},
    {id:'ORD-1040', customer:'Ishara Fernando', items:'6x Macaron Box', total:1150, status:'Ready', date:'2026-08-10'},
    {id:'ORD-1039', customer:'Tharindu Jayasuriya', items:'1x Chocolate Torte', total:1350, status:'Delivered', date:'2026-08-10'},
    {id:'ORD-1038', customer:'Amaya Ranasinghe', items:'3x Croissant, 1x Orange Juice', total:1830, status:'Cancelled', date:'2026-08-09'},
    {id:'ORD-1037', customer:'Dilshan Bandara', items:'1x Almond GF Cake', total:1200, status:'Delivered', date:'2026-08-09'},
];

let items = [
    {id:1, name:'Pistachio & Rose Water Tart', category:'Tarts', price:980, stock:14, img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=200&q=80', badges:['Vegan']},
    {id:2, name:'Classic Butter Croissant', category:'Croissants', price:450, stock:6, img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80', badges:[]},
    {id:3, name:'Rose Vanilla Layer Cake', category:'Signature Cakes', price:3200, stock:3, img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80', badges:['Nut-Free']},
    {id:4, name:'Flourless Chocolate Torte', category:'Gluten-Free', price:1350, stock:0, img:'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=200&q=80', badges:['Gluten-Free','Nut-Free']},
    {id:5, name:'Iced Vanilla Latte', category:'Drinks', price:650, stock:40, img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80', badges:[]},
    {id:6, name:'Macaron Box (6)', category:'Gluten-Free', price:1150, stock:5, img:'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=200&q=80', badges:['Gluten-Free']},
];

let suppliers = [
    {id:1, name:'Colombo Flour Mills', category:'Flour & Grains', contact:'Ruwan Perera', phone:'+94 77 210 4455', email:'ruwan@cfm.lk', lastOrder:'2026-08-05', status:'Active'},
    {id:2, name:'Hillside Dairy Co.', category:'Dairy & Eggs', contact:'Sanduni Weerasinghe', phone:'+94 71 664 2201', email:'sanduni@hillsidedairy.lk', lastOrder:'2026-08-08', status:'Active'},
    {id:3, name:'Tropical Fruit Traders', category:'Fruit & Produce', contact:'Mohamed Rizwan', phone:'+94 76 330 9981', email:'rizwan@tft.lk', lastOrder:'2026-07-29', status:'Inactive'},
    {id:4, name:'EcoBox Packaging', category:'Packaging', contact:'Nimali Gunasekara', phone:'+94 70 555 1123', email:'nimali@ecobox.lk', lastOrder:'2026-08-02', status:'Active'},
    {id:5, name:'Ceylon Bean Roasters', category:'Beverages', contact:'Dinuka Wickrama', phone:'+94 77 890 3345', email:'dinuka@ceylonbean.lk', lastOrder:'2026-08-09', status:'Active'},
];

let stockItems = [
    {id:1, name:'All-Purpose Flour', category:'Flour & Grains', unit:'kg', quantity:42, reorderLevel:15},
    {id:2, name:'Unsalted Butter', category:'Dairy & Eggs', unit:'kg', quantity:8, reorderLevel:10},
    {id:3, name:'Fresh Eggs', category:'Dairy & Eggs', unit:'dozen', quantity:0, reorderLevel:5},
    {id:4, name:'Granulated Sugar', category:'Flour & Grains', unit:'kg', quantity:30, reorderLevel:12},
    {id:5, name:'Fresh Strawberries', category:'Fruit & Produce', unit:'kg', quantity:6, reorderLevel:8},
    {id:6, name:'Takeaway Boxes', category:'Packaging', unit:'pcs', quantity:210, reorderLevel:100},
    {id:7, name:'Espresso Beans', category:'Beverages', unit:'kg', quantity:3, reorderLevel:6},
];

let restocks = [
    {id:'RS-1001', supplier:'Colombo Flour Mills', date:'2026-08-05',
        items:[{itemId:1, name:'All-Purpose Flour', unit:'kg', qty:50, price:180},
            {itemId:4, name:'Granulated Sugar', unit:'kg', qty:30, price:210}],
        total: 50*180 + 30*210},
    {id:'RS-1002', supplier:'Hillside Dairy Co.', date:'2026-08-08',
        items:[{itemId:2, name:'Unsalted Butter', unit:'kg', qty:20, price:1450}],
        total: 20*1450},
];

let admins = [
    {id:1, name:'Amaya Ranasinghe', email:'amaya@sugarandflour.lk', role:'Owner', status:'Active', lastActive:'Today'},
    {id:2, name:'Kavindu Silva', email:'kavindu@sugarandflour.lk', role:'Manager', status:'Active', lastActive:'Yesterday'},
    {id:3, name:'Ishara Fernando', email:'ishara@sugarandflour.lk', role:'Staff', status:'Invited', lastActive:'—'},
];

let customers = [
    {id:1, name:'Nadeesha Perera', email:'nadeesha.p@gmail.com', phone:'+94 77 512 3344', orders:14, spent:28400, status:'Active', joined:'2025-11-02'},
    {id:2, name:'Kavindu Rathnayake', email:'kavindu.r@gmail.com', phone:'+94 71 220 9987', orders:6, spent:9800, status:'Active', joined:'2026-01-15'},
    {id:3, name:'Ishara Wickramasinghe', email:'ishara.w@gmail.com', phone:'+94 76 884 1122', orders:22, spent:41200, status:'Active', joined:'2025-08-20'},
    {id:4, name:'Tharindu Jayasuriya', email:'tharindu.j@gmail.com', phone:'+94 70 663 5521', orders:2, spent:2700, status:'Blocked', joined:'2026-03-05'},
];

let tables = [
    {id:1, name:'Window Booth A', type:'Window Seat', capacity:2, status:'Available'},
    {id:2, name:'Communal Table', type:'Communal Table', capacity:8, status:'Reserved'},
    {id:3, name:'Quiet Corner B', type:'Quiet Corner', capacity:4, status:'Available'},
    {id:4, name:'Window Booth C', type:'Window Seat', capacity:2, status:'Maintenance'},
];

let tableCategories = [{id:1,name:'Window Seat'}, {id:2,name:'Communal Table'}, {id:3,name:'Quiet Corner'}];

let nextCategoryId = 4;
let nextOrderNum = 1043;
let nextItemId = 7;
let nextSupplierId = 6;
let nextStockId = 8;
let nextRestockNum = 1003;
let nextAdminId = 4;
let nextCustomerId = 5;
let nextTableId = 5;

/* holds the line items being built inside the open Restock form, before Save */
let restockDraftItems = [];

/* ============================================================
   NAVIGATION
   ============================================================ */
const sections = {
    overview: {title:'Overview', sub:"Welcome back — here's what's happening today.", addLabel:null, showSearch:false},
    orders: {title:'Orders', sub:'Manage customer orders and fulfillment status.', addLabel:null, showSearch:true},
    items: {title:'Menu Items', sub:'Manage your bakery catalog, pricing and stock.', addLabel:'New Item', showSearch:true},
    suppliers: {title:'Suppliers', sub:'Manage ingredient and packaging suppliers.', addLabel:'New Supplier', showSearch:true},
    stock: {title:'Stock', sub:'Track raw ingredient inventory and reorder levels.', addLabel:'New Stock Item', showSearch:true},
    restock: {title:'Restock', sub:'Log supplier restock orders and replenish inventory.', addLabel:'New Restock', showSearch:true},
    admins: {title:'Admins', sub:'Manage staff accounts and permission levels.', addLabel:'New Staff', showSearch:true},
    customers: {title:'Customers', sub:'View and manage customer accounts.', addLabel:null, showSearch:true},
    tables: {title:'Tables', sub:'Manage reservable tables and seating capacity.', addLabel:'New Table', showSearch:true},
};
let currentSection = 'overview';

const statusOptionsMap = {
    orders: ['Pending','Preparing','Ready','Delivered','Cancelled'],
    items: ['Gluten-Free','Nut-Free','Vegan'],
    suppliers: ['Active','Inactive'],
    stock: ['In Stock','Low Stock','Out of Stock'],
    admins: ['Active','Suspended'],
    customers: ['Active','Suspended'],
    tables: ['Available','Unavailable'],
};
let activeStatuses = new Set();
let orderDateFilter = ''; // empty means all dates visible
let tableSubView = 'tables'; // 'tables' or 'categories'

const $navItems = $('.nav-item');
const $topAddBtn = $('#topAddBtn');
const $addBtnLabel = $('#addBtnLabel');
const $searchInput = $('#searchInput');

function goToSection(name){
    currentSection = name;
    $navItems.each(function(){ $(this).toggleClass('active', $(this).data('section') === name); });
    $('.section-panel').removeClass('active');
    $('#panel-'+name).addClass('active');
    $('#topbarTitle').text(sections[name].title);
    $('#topbarSub').text(sections[name].sub);

    const cfg = sections[name];
    $topAddBtn.css('display', cfg.addLabel ? 'flex' : 'none');
    $addBtnLabel.text(cfg.addLabel || '');
    $searchInput.val('');
    $('.search-wrap').toggleClass('sw-hidden', !cfg.showSearch);

    activeStatuses = new Set();
    renderStatusFilter();

    orderDateFilter = '';
    $('#orderDateFilter').val('');

    tableSubView = 'tables';
    $('.subnav-btn').removeClass('active');
    $('.subnav-btn[data-tableview="tables"]').addClass('active');
    $('#tablesView').show();
    $('#categoriesView').hide();

    closeSidebar();
    renderAll();
}

$navItems.on('click', function(){ goToSection($(this).data('section')); });
$('[data-goto]').on('click', function(e){ e.preventDefault(); goToSection($(this).data('goto')); });

/* ============================================================
   SIDEBAR (mobile)
   ============================================================ */
const $sidebar = $('#sidebar');
const $sidebarScrim = $('#sidebarScrim');
$('#hamburgerBtn').on('click', function(){ $sidebar.addClass('open'); $sidebarScrim.addClass('show'); });
$('#sidebarClose').on('click', closeSidebar);
$sidebarScrim.on('click', function(){ closeSidebar(); closeModal(); closeConfirm(); });
function closeSidebar(){ $sidebar.removeClass('open'); $sidebarScrim.removeClass('show'); }

/* ============================================================
   HELPERS
   ============================================================ */
function money(n){ return 'Rs. ' + n.toLocaleString(); }
function statusBadgeClass(status){
    return {Pending:'badge-pending',Preparing:'badge-preparing',Ready:'badge-ready',Delivered:'badge-delivered',
        Cancelled:'badge-cancelled',Active:'badge-active',Inactive:'badge-inactive',Invited:'badge-invited',
        Suspended:'badge-suspended',Blocked:'badge-blocked',Available:'badge-active',Reserved:'badge-pending',
        Maintenance:'badge-suspended'}[status] || 'badge-pending';
}

function roleBadgeClass(role){
    return {Admin:'badge-admin', Manager:'badge-manager', Driver:'badge-staff'}[role] || 'badge-staff';
}

function stockInfo(stock, reorderLevel){
    if(stock === 0) return {label:'Out of Stock', cls:'badge-outofstock'};
    if(stock <= reorderLevel) return {label:'Low Stock', cls:'badge-lowstock'};
    return {label:'In Stock', cls:'badge-instock'};
}

function showToast(msg){
    $('#toastMsg').text(msg);
    $('#toast').addClass('show');
    setTimeout(()=> $('#toast').removeClass('show'), 2200);
}

function spaceToUnderscore(str) {
    return str
        .trim()                 // Removes leading/trailing spaces
        .replace(/\s+/g, '_');  // Replaces single or multiple consecutive spaces with a single underscore
}

// make status name to normal (only first letter is uppercase)
function formatStatus(status) {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

/* ============================================================
   SET USER DETAILS ON SIDEBAR
   ============================================================ */


/* ============================================================
  VALIDATION CHECKERS
  ============================================================ */
function validEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function validateName(name) {
    const val = name.trim();
    if (val === '' || val.length <= 2) {return false;}
    return true;
}

function validatePhoneNumber(phoneNumber) {
    // Remove whitespace, hyphens, and parentheses
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');

    // Strictly enforces length:
    // - Mobile: 07X XXX XXXX (10 digits) OR +947X XXX XXXX (11 digits after +)
    // - Landline: 0XX XXX XXXX (10 digits) OR +94XX XXX XXXX
    const slRegex = /^(?:(?:\+|00)?94|0)?(?:7[0-2,4-8]\d{7}|(?:11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)\d{7})$/;

    return slRegex.test(cleaned);
}

function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');

    if(phoneNumber.length === 9){
        return '+94'+phoneNumber;
    }

    // Standardize local 07XXXXXXXX or 0XX-XXXXXXX to +94...
    if (/^0\d{9}$/.test(cleaned)) {
        return '+94' + cleaned.substring(1);
    }

    // Standardize 947XXXXXXXX
    if (/^94\d{9}$/.test(cleaned)) {
        return '+' + cleaned;
    }

    // Standardize +947XXXXXXXX or 00947XXXXXXXX
    if (/^(?:\+|00)94\d{9}$/.test(cleaned)) {
        return '+' + cleaned.replace(/^(?:\+|00)/, '');
    }

    return null; // Invalid number
}

/* ============================================================
   PASSWORD FUNCTIONS
   ============================================================ */
/* ---- password visibility toggles ---- */
function wireToggle(btnId, inputId) {
    $('#' + btnId).on('click', function() {
        const $input = $('#' + inputId);
        const show = $input.attr('type') === 'password';
        $input.attr('type', show ? 'text' : 'password');
        $(this).text(show ? 'HIDE' : 'SHOW');
    });
}
wireToggle('togglePass1', 'password');
wireToggle('togglePass2', 'confirmPassword');

function passwordScore(v) {
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    return score;
}

const strengthLabels = ['Too short', 'Weak — add numbers or symbols', 'Getting there — add a symbol', 'Good password strength', 'Great, strong password!'];

function validatePasswordStrength() {
    const val = $('#password').val();
    if (val === '') {
        $('#strengthWrap').removeClass('show');
        $('#passwordWrap').removeClass('error success');
        return false;
    }
    $('#strengthWrap').addClass('show');
    const score = passwordScore(val);
    const level = val.length < 6 ? 1 : Math.max(1, score);
    $('#strengthWrap').attr('data-level', level);
    $('#strengthLabel').text(val.length < 6 ? strengthLabels[0] : strengthLabels[level]);
    const ok = val.length >= 6;
    $('#passwordWrap').toggleClass('error', !ok).toggleClass('success', ok && level >= 3);
    return ok;
}

function validateConfirm() {
    const val = $('#confirmPassword').val();
    if (val === '') {
        $('#confirmWrap').removeClass('error success');
        $('#confirmMsg').removeClass('show');
        return false;
    }
    const ok = val === $('#password').val() && val.length > 0;
    $('#confirmWrap').toggleClass('error', !ok).toggleClass('success', ok);
    $('#confirmMsg').toggleClass('show', !ok);
    return ok;
}

/* ============================================================
   RENDER: OVERVIEW
   ============================================================ */
function renderOverview(){
    $('#statOrders').text(orders.length);
    const revenue = orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0);
    $('#statRevenue').text(money(revenue));
    const low = items.filter(i=>i.stock<=8).length;
    $('#statLowStock').text(low);
    const activeSup = suppliers.filter(s=>s.status==='Active').length;
    $('#statSuppliers').text(activeSup);

    $('#recentOrdersBody').html(orders.slice(0,4).map(o => `
    <tr>
      <td class="cell-title">${o.id}</td>
      <td>${o.customer}</td>
      <td>${money(o.total)}</td>
      <td><span class="badge-pill ${statusBadgeClass(o.status)}">${o.status}</span></td>
      <td>${o.date}</td>
    </tr>
  `).join('') || `<tr class="empty-row"><td colspan="5">No orders yet.</td></tr>`);

    const lowItems = items.filter(i=>i.stock<=8);
    $('#lowStockBody').html(lowItems.map(i => {
        const info = stockInfo(i.stock, 8);
        return `
    <tr>
      <td class="cell-main"><img class="cell-thumb" src="${i.img}" alt=""><span class="cell-title">${i.name}</span></td>
      <td>${i.category}</td>
      <td>${i.stock} units</td>
      <td><span class="badge-pill ${info.cls}">${info.label}</span></td>
    </tr>`;
    }).join('') || `<tr class="empty-row"><td colspan="4">All items well stocked 🎉</td></tr>`);
}

/* ============================================================
STATUS FILTER CHECKBOXES
============================================================ */
function renderStatusFilter(){
    const inCategoriesView = currentSection === 'tables' && tableSubView === 'categories';
    const options = inCategoriesView ? null : statusOptionsMap[currentSection];
    const $filter = $('#statusFilter');
    if(!options){ $filter.empty().hide(); return; }
    $filter.css('display','flex').html(options.map(s => `
    <label class="status-chip">
      <input type="checkbox" value="${s}">
      ${s}
    </label>
  `).join(''));
}

$(document).on('change', '#statusFilter input[type="checkbox"]', function(){
    const val = $(this).val();
    const checked = $(this).is(':checked');
    $(this).closest('.status-chip').toggleClass('active', checked);
    if(checked) activeStatuses.add(val); else activeStatuses.delete(val);
    renderAll();
});

/* ---- orders: filter by date ---- */
$('#orderDateFilter').on('change', function(){
    orderDateFilter = $(this).val();
    renderAll();
});
$('#clearDateFilter').on('click', function(){
    orderDateFilter = '';
    $('#orderDateFilter').val('');
    renderAll();
});

/* ---- tables section: toggle between "Manage Tables" and "Manage Categories" ---- */
$('#tableSubnav').on('click', '.subnav-btn', function(){
    tableSubView = $(this).data('tableview');
    $('.subnav-btn').removeClass('active');
    $(this).addClass('active');
    $('#tablesView').toggle(tableSubView === 'tables');
    $('#categoriesView').toggle(tableSubView === 'categories');
    $addBtnLabel.text(tableSubView === 'tables' ? 'New Table' : 'New Category');
    $searchInput.val('');
    activeStatuses = new Set();
    renderStatusFilter();
    renderAll();
});

/* ============================================================
   RENDER: ORDERS
   ============================================================ */
function renderOrders(filter=''){
    const f = filter.toLowerCase();
    const rows = orders.filter(o => !f || o.id.toLowerCase().includes(f) ||
        o.customer.toLowerCase().includes(f) && (!orderDateFilter || o.date === orderDateFilter));

    const obj = {
        order_id: f,
        user_name: f,
        order_date: orderDateFilter,
        status_list: Array.from(activeStatuses)
    }

    $.ajax({
        url:"http://localhost:8080/v1/order/filterOrders",
        type:"GET",
        // contentType: 'application/json',
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const o of response.body){

                    let itemList = '';
                    o.orderItems.forEach( (item, index) =>{
                        if(index === o.orderItems.length-1){
                            itemList += item.qty + "x" + item.foodItemName;
                        }else{
                            itemList += item.qty + "x" + item.foodItemName + ", ";
                        }
                    });

                    let status = formatStatus(o.orderStatus);

                    html +=
                        `<tr>
                          <td class="cell-title">${o.orderId}</td>
                          <td>${o.userName}</td>
                          <td><span class="cell-sub">${itemList}</span></td>
                          <td class="cell-title">${money(o.total)}</td>
                          <td><span class="badge-pill ${statusBadgeClass(status)}">${status}</span></td>
                          <td>${o.orderDate}</td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-edit="order" data-id="${o.orderId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                              <button class="icon-btn" data-print-order="${o.orderId}" aria-label="Print"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No orders match your search.</td></tr>`;
                }
                $('#ordersBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#ordersBody').html(`<tr class="empty-row"><td colspan="5">No orders match your search.</td></tr>`);
            }},
        error: function (e){
            e.message ? alert(e.message) : alert("SERVER DOES NOT RESPONDED");
            $('#ordersBody').html(`<tr class="empty-row"><td colspan="5">No orders match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: ITEMS
   ============================================================ */
function renderItems(filter=''){
    const f = filter.toLowerCase();
    // const rows = items.filter(i => !f || i.name.toLowerCase().includes(f) || i.category.toLowerCase().includes(f));

    const obj = {
        item_name:f,
        item_category:f,
        item_badges: Array.from(activeStatuses)     // badges set
    }

    $.ajax({
        url:"http://localhost:8080/v1/foodItems/filterFoodItems",
        type:"GET",
        // contentType: 'application/json',
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const i of response.body){

                    const finalPrice = i.price * ((100 - i.discount) / 100)

                    html +=
                        `<tr>
                          <td class="cell-main"><img class="cell-thumb" src="${i.imagePath}" alt=""><div><div class="cell-title">${i.foodItemName}</div><div class="cell-sub">${i.badges.split(', ') || 'No badges'}</div></div></td>
                          <td>${i.foodItemCategory}</td>
                          <td class="cell-title">${money(i.price)}</td>
                          <td>${i.discount} %</td>
                          <td>${money(finalPrice)}</td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-edit="item" data-id="${i.foodItemId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No items match your search.</td></tr>`;
                }
                $('#itemsBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#itemsBody').html(`<tr class="empty-row"><td colspan="5">No items match your search.</td></tr>`);
            }},
        error: function (e){
            e.message ? alert(e.message) : alert("SERVER DOES NOT RESPONDED");
            $('#itemsBody').html(`<tr class="empty-row"><td colspan="5">No items match your search.</td></tr>`);
        }
    });

}

/* ============================================================
   RENDER: SUPPLIERS
   ============================================================ */
function renderSuppliers(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        company_name : f,
        contact_name : f,
        supplier_statuses : Array.from(activeStatuses)      // SET
    };

    $.ajax({
        url: "http://localhost:8080/v1/supplier/filterSuppliers",
        type: 'GET',
        // contentType: 'application/json',
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const s of response.body){
                    let status = formatStatus(s.supplierStatus);
                    html +=
                        `<tr>
                              <td class="cell-title">${s.companyName}</td>
                              <td><div class="cell-title" style="font-weight:600;">${s.supplierName}</div><div class="cell-sub">${s.contact}</div></td>
                              <td>${s.email}</td>
                              <td><span class="badge-pill ${statusBadgeClass(status)}">${status}</span></td>
                              <td>
                                <div class="row-actions">
                                  <button class="icon-btn" data-edit="supplier" data-id="${s.supplierId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                                </div>
                              </td>
                            </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No suppliers match your search.</td></tr>`;
                }
                $('#suppliersBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#suppliersBody').html(`<tr class="empty-row"><td colspan="5">No suppliers match your search.</td></tr>`);
            }
        },
        error: function (e){
            e.message ? alert(e.message) : alert("SERVER DOES NOT RESPONDED");
            $('#suppliersBody').html(`<tr class="empty-row"><td colspan="5">No suppliers match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: STOCK ITEM
   ============================================================ */
function renderStock(filter=''){
    const f = filter.toLowerCase();

    // convert In Stock -> In_Stock     otherwise sql won't filter status correctly
    let statuses = new Set();
    for(let s of activeStatuses){
        statuses.add(spaceToUnderscore(s));
    }

    const obj = {
        item_name : f,
        category_name : f,
        item_statuses : Array.from(statuses)      // SET
    };

    $.ajax({
        url: "http://localhost:8080/v1/stockItem/filterStockItems",
        type: "GET",
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        data: obj,
        success: function(response){
            if(response.status === 200){
                let html = '';
                for(const s of response.body){
                    const info = stockInfo(s.stockQty, s.reorderLevel);
                    html += `<tr>
                              <td class="cell-title">${s.itemName}</td>
                              <td>${s.stockItemCategoryName}</td>
                              <td>${s.stockQty} ${s.unitOfMeasure}</td>
                              <td>${s.reorderLevel} ${s.unitOfMeasure}</td>
                              <td><span class="badge-pill ${info.cls}">${info.label}</span></td>
                              <td>
                                <div class="row-actions">
                                  <button class="icon-btn" data-edit="stock" data-id="${s.stockItemId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                                </div>
                              </td>
                            </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No Stock Items match your search.</td></tr>`;
                }
                $('#stockBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                });
            }
            else{
                alert(response.message);
                $('#stockBody').html(`<tr class="empty-row"><td colspan="5">No Stock Items match your search.</td></tr>`);
            }
        },
        error: function (response){
            response.message ? alert(response.message) : alert("SERVER DOES NOT RESPONDED");
            $('#stockBody').html(`<tr class="empty-row"><td colspan="5">No Stock Items match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: RESTOCK (main section table)
   ============================================================ */
function renderRestock(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        restock_id: f,
        supplier_name: f
    }

    $.ajax({
        url:"http://localhost:8080/v1/restock/filterRestock",
        type:"GET",
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (response){
            if(response.status === 200){
                let html = '';
                for(const r of response.body){
                    html += `<tr>
                              <td class="cell-title">${r.restockId}</td>
                              <td>${r.supplierName}</td>
                              <td>${r.itemCount} item${r.itemCount !== 1 ? 's' : ''}</td>
                              <td class="cell-title">${money(r.total)}</td>
                              <td>${r.date}</td>
                              <td>
                                <div class="row-actions">
                                  <button class="icon-btn" data-edit="restock" data-id="${r.restockId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                                </div>
                              </td>
                            </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No Restock Data match your search.</td></tr>`;
                }
                $('#restockBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                });
            }
            else{
                alert(response.message);
                $('#restockBody').html(`<tr class="empty-row"><td colspan="5">No Restock Data match your search.</td></tr>`);
            }
        },
        error: function (response){
            if(response.message){
                alert(response.message);
            }
            else{
                alert("UNEXPECTED ERROR");
            }
            $('#restockBody').html(`<tr class="empty-row"><td colspan="5">No Restock Data match your search.</td></tr>`);
        }
    });
}

/* renders the live line-items table INSIDE the open Restock form */
function renderRestockDraftTable(details, isEdit){
    let rows = '';
    if(isEdit){
        rows = details.map((rd) => `
          <tr>
            <td>${rd.stockItemName}</td>
            <td>${rd.qty} ${rd.unitOfMeasure}</td>
            <td>${money(rd.pricePerUnit)}</td>
            <td>${money(rd.qty * rd.pricePerUnit)}</td>
          </tr>
        `).join('') || `<tr class="empty-row"><td colspan="5">No items added yet.</td></tr>`;
    }
    else{
        rows = details.map((rd, idx) => `
          <tr>
            <td>${rd.stockItemName}</td>
            <td>${rd.qty}</td>
            <td>${money(rd.pricePerUnit)}</td>
            <td>${money(rd.qty * rd.pricePerUnit)}</td>
            <td><span class="restock-remove-btn" data-idx="${idx}">Remove</span></td>
          </tr>
        `).join('') || `<tr class="empty-row"><td colspan="5">No items added yet.</td></tr>`;
    }

    $('#restockItemsBody').html(rows);

}

/* ============================================================
   RENDER: ADMINS
   ============================================================ */
function renderAdmins(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        user_name:f,
        user_email:f,
        is_staff: true,
        user_status: Array.from(activeStatuses)
    }

    $.ajax({
        url: "http://localhost:8080/v1/user/getUsers",
        type: 'GET',
        data: obj,
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const r of response.body){

                    let status = formatStatus(r.userStatus);
                    html +=
                        `<tr>
                            <td class="cell-main">
                              <span class="admin-avatar" style="width:36px;height:36px;font-size:0.82rem;">${r.userName.charAt(0)}</span>
                              <div><div class="cell-title">${r.userName}</div><div class="cell-sub">${r.userEmail}</div></div>
                            </td>
                            <td>${r.userId}</td>
                            <td>${r.userContact}</td>
                            <td><span class="badge-pill ${roleBadgeClass(r.userRoles)}">${r.userRoles}</span></td>
                            <td><span class="badge-pill ${statusBadgeClass(status)}">${status}</span></td>
                            <td>
                              <div class="row-actions">
                                <button class="icon-btn" data-edit="admin" data-id="${r.userId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<!--                                <button class="icon-btn danger" data-delete="admin" data-id="${r.userId}" aria-label="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" stroke="currentColor" stroke-width="1.8"/></svg></button>-->
                              </div>
                            </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No admins match your search.</td></tr>`;
                }
                $('#adminsBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#adminsBody').html(`<tr class="empty-row"><td colspan="5">No admins match your search.</td></tr>`);
            }
        },
        error: function (){
            alert("SERVER DOES NOT RESPONDED");
            $('#adminsBody').html(`<tr class="empty-row"><td colspan="5">No admins match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: CUSTOMERS
   ============================================================ */
function renderCustomers(filter=''){
    const f = filter.toLowerCase();
    const obj = {
        user_name:f,
        user_email:f,
        is_staff: false,
        user_status: Array.from(activeStatuses)
    }

    $.ajax({
        url: "http://localhost:8080/v1/user/getUsers",
        type: 'GET',
        data: obj,
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const c of response.body){

                    let status = formatStatus(c.userStatus);

                    html +=
                        `<tr>
                            <td class="cell-main">
                              <span class="admin-avatar" style="width:36px;height:36px;font-size:0.82rem;">${c.userName.charAt(0)}</span>
                              <div><div class="cell-title">${c.userName}</div><div class="cell-sub">${c.userEmail}</div></div>
                            </td>
                            <td>${c.userId}</td>
                            <td>${c.userContact}</td>
                            <td><span class="badge-pill ${statusBadgeClass(status)}">${status}</span></td>
                            <td>
                              <div class="row-actions">
                                <button class="icon-btn" data-edit="customer" data-id="${c.userId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                              </div>
                            </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No customers match your search.</td></tr>`;
                }
                $('#customersBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#customersBody').html(`<tr class="empty-row"><td colspan="5">No customers match your search.</td></tr>`);
            }
        },
        error: function (){
            alert("SERVER DOES NOT RESPONDED");
            $('#customersBody').html(`<tr class="empty-row"><td colspan="5">No customers match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: TABLES
   ============================================================ */
function renderTables(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        table_category: f,
        table_statuses: Array.from(activeStatuses)
    }

    $.ajax({
        url: "http://localhost:8080/v1/table/filterTables",
        type: 'GET',
        data: obj,
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const t of response.body){

                    let status = formatStatus(t.tableStatus);

                    html +=
                        `<tr>
                          <td class="cell-title">${t.tableId}</td>
                          <td class="cell-title">${t.tableCategoryName}</td>
                          <td>${t.seatCount} guests</td>
                          <td>${money(t.price)}</td>
                          <td><span class="badge-pill ${statusBadgeClass(status)}">${status}</span></td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-edit="table" data-id="${t.tableId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No Table match your search.</td></tr>`;
                }
                $('#tablesBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#tablesBody').html(`<tr class="empty-row"><td colspan="5">No Table match your search.</td></tr>`);
            }
        },
        error: function (){
            alert("SERVER DOES NOT RESPONDED");
            $('#tablesBody').html(`<tr class="empty-row"><td colspan="5">No Table match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   RENDER: TABLE CATEGORIES
   ============================================================ */
function renderTableCategories(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        table_category_name : f
    }

    $.ajax({
        url:"http://localhost:8080/v1/tableCategory/filterTableCategories",
        type: "GET",
        data: obj,
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const c of response.body){
                    html +=
                        `<tr>
                          <td class="cell-title">${c.tableCategoryId}</td>
                          <td class="cell-title">${c.tableCategoryName}</td>
                          <td class="cell-title">${money(c.pricePerSeat)}</td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-edit="category" data-id="${c.tableCategoryId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="5">No category match your search.</td></tr>`;
                }
                $('#tableCategoriesBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#tableCategoriesBody').html(`<tr class="empty-row"><td colspan="5">No category match your search.</td></tr>`);
            }
        },
        error: function (){
            alert("SERVER DOES NOT RESPONDED");
            $('#tableCategoriesBody').html(`<tr class="empty-row"><td colspan="5">No category match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   UPDATE COUNTS
   ============================================================ */
function updateNavCounts(){
    $('#navCountOrders').text(orders.length);
    updateFoodItemCount();
    updateSupplierCount();
    updateStockItemCount();
    updateRestockCount();
    updateStaffCount();
    updateCustomerCount();
    updateTableCount();
}

function updateStaffCount(){
    const obj = {user_role:"Customer", is_staff:true}
    $.ajax({
        url:"http://localhost:8080/v1/user/getStaffCount",
        type:'GET',
        data:obj,
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success:function (response){
            if(response.status === 200){
                $('#navCountAdmins').text(response.body);
                // document.getElementById('navCountAdmins').textContent = response.body;
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateCustomerCount(){
    const obj = {user_role:"Customer", is_staff:false}
    $.ajax({
        url:"http://localhost:8080/v1/user/getStaffCount",
        type:'GET',
        data:obj,
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success:function (response){
            if(response.status === 200){
                $('#navCountCustomers').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateSupplierCount(){
    $.ajax({
        url:"http://localhost:8080/v1/supplier/getSupplierCount",
        type:'GET',
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success:function (response){
            if(response.status === 200){
                $('#navCountSuppliers').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateStockItemCount(){
    $.ajax({
        url: "http://localhost:8080/v1/stockItem/getStockItemCount",
        type: "GET",
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                $('#navCountStock').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateRestockCount(){
    $.ajax({
        url: "http://localhost:8080/v1/restock/getRestockCount",
        type: "GET",
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                $('#navCountRestock').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateFoodItemCount(){
    $.ajax({
        url: "http://localhost:8080/v1/foodItems/getFoodItemCount",
        type: "GET",
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                $('#navCountItems').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function updateTableCount(){
    $.ajax({
        url: "http://localhost:8080/v1/table/getTableCount",
        type: "GET",
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                $('#navCountTables').text(response.body);
            }
            else{
                alert(response.message);
            }
        }
    });
}

function renderAll(){
    updateNavCounts();
    const q = $searchInput.val();
    if(currentSection==='overview') renderOverview();
    if(currentSection==='orders') renderOrders(q);
    if(currentSection==='items') renderItems(q);
    if(currentSection==='suppliers') renderSuppliers(q);
    if(currentSection==='stock') renderStock(q);
    if(currentSection==='restock') renderRestock(q);
    if(currentSection==='admins') renderAdmins(q);
    if(currentSection==='customers') renderCustomers(q);
    if(currentSection==='tables'){
        if(tableSubView === 'tables') renderTables(q); else renderTableCategories(q);
    }
}

$searchInput.on('input', function(){
    const q = $(this).val();
    if(currentSection==='orders') renderOrders(q);
    if(currentSection==='items') renderItems(q);
    if(currentSection==='suppliers') renderSuppliers(q);
    if(currentSection==='stock') renderStock(q);
    if(currentSection==='restock') renderRestock(q);
    if(currentSection==='admins') renderAdmins(q);
    if(currentSection==='customers') renderCustomers(q);
    if(currentSection==='tables'){
        if(tableSubView === 'tables') renderTables(q); else renderTableCategories(q);
    }
});

/* ============================================================
   MODAL: FORM (Add / Edit)
   ============================================================ */
const $formModal = $('#formModal');
const $modalScrim = $('#modalScrim');
const $modalTitle = $('#modalTitle');
const $modalBody = $('#modalBody');
const $modalSave = $('#modalSave');
const $modalPrint = $('#modalPrint');
const $saveLabel = $('#saveLabel');

let editContext = null; // {type, id or null}

function openModal(){ $formModal.addClass('show'); $modalScrim.addClass('show'); }
function closeModal(){
    $formModal.removeClass('show');
    if(!$confirmModal.hasClass('show')) $modalScrim.removeClass('show');
    $modalSave.prop('disabled', false);
    restockDraftItems = [];
}
$('#modalClose').on('click', closeModal);
$('#modalCancel').on('click', closeModal);

function orderFormHTML(o){
    o = o || {customer:'', items:'', total:'', status:'Pending', date:new Date().toISOString().split('T')[0]};
    return `
    
    <div class="field-group"><label>Customer Name</label><input disabled type="text" id="f_customer" value="${o.user.userName}" placeholder="Customer name"></div>
    <div class="field-row-2">
        <div class="field-group">
            <label>Contact</label> <input disabled type="text" id="f_customer_contact" value="${o.user.userContact}" placeholder="contact">
        </div>
        <div class="field-group">
            <label>Email</label> <input disabled type="text" id="f_customer_email" value="${o.user.userEmail}" placeholder="email" min="1">
        </div>
    </div>
 
    <div class="field-row-2">
      <div class="field-group"><label>Date</label><input disabled type="date" id="f_date" value="${o.orderDate}"></div>
    </div>
 
    <div class="field-group">
      <label>Order Items</label>
      <div class="restock-table-wrap">
        <table class="restock-table">
          <thead><tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Discount</th><th>Final Price</th></tr></thead>
          <tbody id="orderItemsBody"></tbody>
        </table>
      </div>
    </div>
    <div class="field-row-2">
      <div class="field-group"><label>Sub Total (Rs.)</label><input disabled type="text" id="f_total" value="${money(o.subTotal)}" placeholder="0"></div>
      <div class="field-group"><label>Discount (Rs.)</label><input disabled type="text" id="f_total" value="${money(o.discount)}" placeholder="0"></div>
    </div>
    
    <div class="field-row-2">
      <div class="field-group"><label>Total (Rs.)</label><input disabled type="text" id="f_total" value="${money(o.total)}" placeholder="0"></div>
    </div>
    
    <div class="field-group"><label>Status</label>
      <select id="f_status">
        ${['Pending','Preparing','Ready','Delivered','Cancelled'].map(s=>`<option ${formatStatus(o.orderStatus)===s?'selected':''}>${s}</option>`).join('')}
      </select>
    </div>
  `;
}

/* parses an "items" string (e.g. "2x Butter Croissant, 1x Latte") into {name, qty}
   rows — used to seed the editable items table when opening an existing order */
function parseOrderItems(text){
    return text.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => {
            const match = s.match(/^(\d+)\s*x\s*(.+)$/i);
            return match ? {qty: Number(match[1]), name: match[2].trim()} : {qty: 1, name: s};
        });
}

function renderOrderItemsTable(itemList){
    const rows = itemList.map((it, idx) => `
    <tr>
      <td>${it.foodItemName}</td>
      <td>${it.qty}</td>
      <td>${it.price}</td>
      <td>${it.discount}</td>
      <td>${it.finalPrice}</td>
    </tr>
  `).join('') || `<tr class="empty-row"><td colspan="5">No items added yet.</td></tr>`;
    $('#orderItemsBody').html(rows);
}

function itemFormHTML(i){
    if(i.foodItemName === null){
        i.foodItemName = '';
        i.description = '';
        i.imagePath = '';
    }

    const allBadges = ['Vegan','Nut-Free','Gluten-Free'];

    if(i.badgesList === null){
        i.badgesList = [];
    }

    return `
    <div class="field-group"><label>Item Name</label><input type="text" id="f_name" value="${i.foodItemName}" placeholder="e.g. Berry Fruit Tart"></div>
    <div class="field-row-2">
      <div class="field-group"><label>Category</label>
        <select id="f_category">
          ${i.itemCategorList.map(c=>`<option value="${c.foodItemCatID}" ${i.foodItemCategoryId===c.foodItemCatID?'selected':''}>${c.foodItemCatName}</option>`).join('')}
        </select>
      </div>
      <div class="field-group"><label>Price (Rs.)</label><input type="number" id="f_price" value="${i.price}" placeholder="0"></div>
    </div>
    <div class="field-row-2">
      <div class="field-group"><label>Discount</label>
        <select id="f_discount">
          ${i.discountList.map(d=>`<option value="${d.discountId}" ${i.discountId===d.discountId?'selected':''}>${d.discountRate} %</option>`).join('')}
        </select>
      </div>
      <div class="field-group"><label>Image URL</label><input type="url" id="f_img" value="${i.imagePath}" placeholder="https://..."><a href="#" id="getImagesLink" class="get-images-link">🔍 Get images</a></div>
    </div>
    <div class="field-group"><label>Item Description</label><input type="text" id="f_description" value="${i.description}" placeholder="e.g. Description the about food item"></div>
    <div class="field-group"><label>Dietary Badges</label>
      <div class="check-row" id="badgeChips">
        ${allBadges.map(b=>`<div class="check-chip ${i.badgesList.includes(b)?'active':''}" data-badge="${b}">${b}</div>`).join('')}
      </div>
    </div>
  `;
}

function supplierFormHTML(s){
    if(!s){
        s = {companyName:'', supplierName:'', contact:'', email:'', supplierStatus:'Active',};
    }

    return `
            <div class="field-group"><label>Supplier Name</label><input type="text" id="f_name" value="${s.companyName}" placeholder="e.g. Company Name"></div>
            <div class="field-group"><label>Contact Person</label><input type="text" id="f_contact" value="${s.supplierName}" placeholder="Contact name"></div>
            <div class="field-group"><label>Email</label><input type="email" id="f_email" value="${s.email}" placeholder="name@company.lk"></div>
            <div class="field-row-2">
                <div class="field-group"><label>Phone</label><input type="tel" id="f_phone" value="${s.contact}" placeholder="+94771234567"></div>
                <div class="field-group"><label>Status</label>
                    <select id="f_status">
                        ${['ACTIVE','INACTIVE'].map(v=>`<option ${s.supplierStatus===v?'selected':''}>${v}</option>`).join('')}
                    </select>
                </div>
            </div>
        `;
}

function stockFormHTML(s){

    if(!s.itemName){  s.itemName = ''; }
    if(!s.stockQty){s.stockQty = ''}
    if(!s.reorderLevel){s.reorderLevel = ''}

    return `
    <div class="field-group"><label>Item Name</label><input type="text" id="f_name" value="${s.itemName}" placeholder="e.g. All-Purpose Flour"></div>
    <div class="field-row-2">
      <div class="field-group"><label>Category</label>
        <select id="f_category">
            ${(s.categoryList || []).map(c => `<option value="${c.categoryId}" ${s.stockItemCatDTO?.categoryName === c.categoryName ? 'selected' : ''}>${c.categoryName}</option>`).join('')}
        </select>
      </div>
      <div class="field-group"><label>Unit</label>
        <select id="f_unit">
          ${['Kg','g','L','ml','pcs','dozen'].map(u=>`<option ${s.unitOfMeasure===u?'selected':''}>${u}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="field-row-2">
      <div class="field-group"><label>Quantity in Stock</label><input type="number" id="f_quantity" value="${s.stockQty}" placeholder="0"></div>
      <div class="field-group"><label>Reorder Level</label><input type="number" id="f_reorderLevel" value="${s.reorderLevel}" placeholder="0"></div>
    </div>
  `;
}

function restockFormHTML(r, isEdit){
    // r = r || {supplier:'', date:new Date().toISOString().split('T')[0]};

    let total = r.total === null ? 0:r.total;

    let tableTopics = '';       // change the detai table topics (remove button)
    let disableText = '';       // change disable state

    if(isEdit){ disableText = 'disabled'}

    let html = `<div class="field-row-2">
                          <div class="field-group"><label>Supplier</label>
                            <select id="f_supplier" ${disableText}>
                              <option value="">Select a supplier</option>
                              ${r.suppliers.map(s=>`<option value="${s.supplierId}" ${r.supplierID===s.supplierId?'selected':''}>${s.companyName}</option>`).join('')}
                            </select>
                          </div>
                          <div class="field-group"><label>Restock Date</label><input type="date" id="f_date" value="${r.date}" ${disableText}></div>
                        </div>`;
    if(!isEdit){
        html += `<div class="field-group">
                  <label>Add Item</label>
                  <div class="restock-add-row">
                    <select id="f_itemSelect">
                      <option value="">Select an item</option>
                      ${r.stockItems.map(i=>`<option value="${i.stockItemId}">${i.itemName} (${i.unitOfMeasure})</option>`).join('')}
                    </select>
                    <input type="number" id="f_itemQty" placeholder="Qty" min="1">
                    <input type="number" id="f_itemPrice" placeholder="Price/Unit" min="0" step="0.01">
                    <button type="button" class="add-btn" id="addRestockItemBtn"><span class="plus">+</span> Add</button>
                  </div>
                </div>`;

        tableTopics = `<thead><tr><th>Item Name</th><th>Qty</th><th>Price/Unit</th><th>Subtotal</th><th></th></tr></thead>`;
    }
    else{
        tableTopics = `<thead><tr><th>Item Name</th><th>Qty</th><th>Price/Unit</th><th>Subtotal</th></tr></thead>`;
    }

    html += `<div class="field-group">
              <label>Restock Items</label>
              <div class="restock-table-wrap">
                <table class="restock-table">
                  ${tableTopics}
                  <tbody id="restockItemsBody"></tbody>
                </table>
              </div>
              <div class="restock-total-row">Total: <span id="restockTotalDisplay">${money(total)}</span></div>
            </div>`;

    return html;
}

function adminFormHTML(a, isEdit){
    if(!a){
        a = {userName: '', userEmail: '', userContact:'', userRoles: 'Driver', userStatus: 'Active'};
    }

    let html =
        `<div class="field-group"><label>Full Name</label><input type="text" id="f_name" value="${a.userName}" placeholder="Admin name"></div>
             <div class="field-group"><label>Email Address</label><input type="email" id="f_email" value="${a.userEmail}" placeholder="name@sugarandflour.lk"></div>
             <div class="field-group"><label>Phone</label><input type="tel" id="f_phone" value="${a.userContact}" placeholder="077 123 4567"></div>
             <div class="field-row-2">
               <div class="field-group"><label>Role</label>
                 <select id="f_role">
                   ${['Admin','Driver'].map(r=>`<option ${a.userRoles===r?'selected':''}>${r}</option>`).join('')}
                 </select>
               </div>
               <div class="field-group"><label>Status</label>
                 <select id="f_status">
                   ${['ACTIVE','SUSPENDED'].map(v=>`<option ${a.userStatus===v?'selected':''}>${v}</option>`).join('')}
                 </select>
               </div>
             </div>`;

    if(!isEdit){
        html +=
            `<div class="field-group">
                    <label for="password">Password</label>
                    <div class="input-wrap" id="passwordWrap">
                        <input type="password" id="password" placeholder="Create a password" autocomplete="new-password">
                        <button type="button" class="toggle-pass" id="togglePass1">SHOW</button>
                    </div>
                    <div class="strength-wrap" id="strengthWrap" data-level="0">
                        <div class="strength-bars"><span></span><span></span><span></span><span></span></div>
                        <span class="strength-label" id="strengthLabel">Use 8+ characters with a number &amp; symbol</span>
                    </div>
                </div>

                <div class="field-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <div class="input-wrap" id="confirmWrap">
                        <input type="password" id="confirmPassword" placeholder="Re-enter your password" autocomplete="new-password">
                        <button type="button" class="toggle-pass" id="togglePass2">SHOW</button>
                    </div>
                    <div class="field-msg" id="confirmMsg">Passwords don't match.</div>
                </div>`;
    }
    return html;
}

function customerFormHTML(c){
    if(!c){
        c = {userName: '', userEmail: '', userContact:'', userRoles: 'Customer', userStatus: 'Active'};
    }
    return `
                <div class="field-group"><label>Full Name</label><input type="text" id="f_name" value="${c.userName}" placeholder="Customer name" disabled="disabled"></div>
                <div class="field-group"><label>Email Address</label><input type="email" id="f_email" value="${c.userEmail}" placeholder="name@example.com" disabled="disabled"></div>
                <div class="field-row-2">
                  <div class="field-group"><label>Phone</label><input type="tel" id="f_phone" value="${c.userContact}" placeholder="+94 77 000 0000" disabled="disabled"></div>
                  <div class="field-group"><label>Status</label>
                    <select id="f_status">
                      ${['ACTIVE','SUSPENDED'].map(v=>`<option ${c.userStatus===v?'selected':''}>${v}</option>`).join('')}
                    </select>
                  </div>
                </div>`;
}

function tableFormHTML(t){
    t = t || {name:'', type: tableCategories[0] ? tableCategories[0].name : '', capacity:'', status:'Available'};

    return `
    <div class="field-group"><label>Table ID</label><input type="text" id="f_id" value="${t.tableId}" placeholder="e.g. Window Booth A" disabled></div>
    <div class="field-row-2">
      <div class="field-group"><label>Seating Type</label>
        <select id="f_type">
          ${t.categories.map(c=>`<option value="${c.tableCategoryId}" ${t.tableCategoryId===c.tableCategoryId?'selected':''}>${c.tableCategoryName}</option>`).join('')}
        </select>
      </div>
      <div class="field-group"><label>Capacity (guests)</label><input type="number" id="f_capacity" value="${t.seatCount}" placeholder="0"></div>
    </div>
    <div class="field-group"><label>Status</label>
      <select id="f_status">
        ${['Available','Unavailable'].map(v=>`<option ${formatStatus(t.tableStatus)===v?'selected':''}>${v}</option>`).join('')}
      </select>
    </div>
  `;
}

function categoryFormHTML(c){
    if(c.tableCategoryName === null){
        c = {tableCategoryName:'', pricePerSeat: ''};
    }

    return `
    <div class="field-group"><label>Category Name</label><input type="text" id="f_categoryName" value="${c.tableCategoryName}" placeholder="e.g. Patio Seating"></div>
    <div class="field-group"><label>Price Per Seat</label><input type="number" id="f_seatPrice" value="${c.pricePerSeat}" placeholder="e.g. enter Seat Count"></div>
  `;
}

/* dietary badge chips are rendered fresh each time the item modal opens,
   so bind once via delegation instead of re-wiring per open */
$(document).on('click', '#badgeChips .check-chip', function(){
    $(this).toggleClass('active');
});

/* "get images" link in the item form — opens an Unsplash search for the item name */
$(document).on('click', '#getImagesLink', function(e){
    e.preventDefault();
    const query = $('#f_name').val().trim() || $('#f_category').val() || 'bakery pastry';
    window.open('https://unsplash.com/s/photos/' + encodeURIComponent(query), '_blank');
});

function openForm(type, id){
    editContext = {type, id};
    const isEdit = id !== null && id !== undefined;

    if(type === 'order'){
        $modalTitle.text(isEdit ? 'Edit Order' : 'New Order');

        $.ajax({
            url: "http://localhost:8080/v1/order/getOrderFormDetail/" + id,
            type: "GET",
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(orderFormHTML(response.body));
                    renderOrderItemsTable(response.body.orderItems);
                }
                else{
                    showToast(response.message);
                }
            },
            error: function (response){
                if(response.message){
                    showToast(response.message);
                }
                showToast("UNEXPECTED ERROR");
            }
        });
    }
    if(type === 'item'){
        $modalTitle.text(isEdit ? 'Edit Menu Item' : 'New Menu Item');
        id = (id === null)? 0 : id;

        $.ajax({
            url: "http://localhost:8080/v1/foodItems/getFoodItemFormDate/" + id,
            type: "GET",
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(itemFormHTML(response.body));
                }
                else{
                    showToast(response.message);
                }
            },
            error: function (response){
                if(response.message){
                    showToast(response.message);
                }
                showToast("UNEXPECTED ERROR");
            }
        });
    }
    if(type === 'supplier'){
        $modalTitle.text(isEdit ? 'Edit Supplier' : 'New Supplier');

        if(isEdit){
            $.ajax({
                url:'http://localhost:8080/v1/supplier/findSupplierById/' + id,
                type:'GET',
                // contentType: 'application/json',
                headers:{
                    'Authorization': 'Bearer '+ localStorage.getItem("JWT")
                },
                success: function (response){
                    if(response.status === 200){
                        $modalBody.html(supplierFormHTML(response.body));
                    }
                    else{
                        showToast(response.message);
                    }
                },
                error: function (response){
                    if(response.message){
                        showToast(response.message);
                    }
                    showToast("UNEXPECTED ERROR");
                }
            });
        }
        else{
            $modalBody.html(supplierFormHTML(null, isEdit));
        }

    }
    if(type === 'stock'){
        if(id === null){id = 0;}
        $modalTitle.text(isEdit ? 'Edit Stock Item' : 'New Stock Item');

        $.ajax({
            url: "http://localhost:8080/v1/stockItem/getStockItemFormInfo/" + id,
            type: "GET",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer ' + localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(stockFormHTML(response.body));
                }
                else {
                    showToast(response.message)
                }
            },
            error: function (response){
                if(response.message){
                    showToast(response.message);
                }else {
                    showToast("UNEXPECTED ERROR");
                }
            }
        });


    }
    if(type === 'restock'){
        $modalTitle.text(isEdit ? 'Print Restock' : 'New Restock');

        if(id === null){
            id = 0;
        }

        $.ajax({
            url:"http://localhost:8080/v1/restock/getRestockFormData/" + id,
            type : "GET",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer ' + localStorage.getItem("JWT")
            },
            success: function(response){
                if(response.status === 200){
                    $modalBody.html(restockFormHTML(response.body, isEdit));
                    renderRestockDraftTable(response.body.restockDetails, isEdit);
                }
                else {
                    showToast(response.message)
                }
            },
            error: function (response){
                if(response.message){
                    showToast(response.message);
                }else {
                    showToast("UNEXPECTED ERROR");
                }
            }
        });
    }
    if(type === 'admin'){
        $modalTitle.text(isEdit ? 'Edit Admin' : 'New Admin');
        if(isEdit){
            $.ajax({
                url:'http://localhost:8080/v1/user/findUserById/' + id,
                type:'GET',
                contentType: 'application/json',
                headers:{
                    'Authorization': 'Bearer '+ localStorage.getItem("JWT")
                },
                success: function (response){
                    if(response.status === 200){
                        $modalBody.html(adminFormHTML(response.body, isEdit));
                    }
                    else{
                        showToast(response.message);
                    }
                },
                error: function (){
                    showToast("UNEXPECTED ERROR");
                }
            })
        }else{
            $modalBody.html(adminFormHTML(null, isEdit));
            // for pass word inputs ------------
            wireToggle('togglePass1', 'password');
            wireToggle('togglePass2', 'confirmPassword');

            $('#password').on('input', function() {
                validatePasswordStrength();
                if ($('#confirmPassword').val() !== '') validateConfirm();
            });
            $('#password').on('blur', validatePasswordStrength);

            $('#confirmPassword').on('blur', validateConfirm);
            $('#confirmPassword').on('input', function() {
                if ($('#confirmWrap').hasClass('error') || $('#confirmPassword').val()) validateConfirm();
            });
        }

    }
    if(type === 'customer'){
        $modalTitle.text(isEdit ? 'Edit Customer' : 'New Customer');
        $.ajax({
            url:'http://localhost:8080/v1/user/findUserById/' + id,
            type:'GET',
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(customerFormHTML(response.body));
                }
                else{
                    showToast(response.message);
                }
            },
            error: function (){
                showToast("UNEXPECTED ERROR");
            }
        });
    }
    if(type === 'table'){
        $modalTitle.text(isEdit ? 'Edit Table' : 'New Table');
        if(id === null){id = 0;}
        $.ajax({
            url:'http://localhost:8080/v1/table/getTableFormData/' + id,
            type:'GET',
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(tableFormHTML(response.body));
                }
                else{
                    showToast(response.message);
                }
            },
            error: function (){
                showToast("UNEXPECTED ERROR");
            }
        });
    }
    if(type === 'category'){
        $modalTitle.text(isEdit ? 'Edit Category' : 'New Category');
        if(id === null){id = 0;}

        $.ajax({
            url:'http://localhost:8080/v1/tableCategory/getTableCategoryDataById/' + id,
            type:'GET',
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    $modalBody.html(categoryFormHTML(response.body));
                }
                else{
                    showToast(response.message);
                }
            },
            error: function (){
                showToast("UNEXPECTED ERROR");
            }
        });
    }

    $saveLabel.text(isEdit ? 'Save Changes' : 'Create');
    $formModal.toggleClass('modal-wide', type === 'restock' || type === 'order');

    if(type === 'restock' && isEdit){
        $modalSave.hide();
        $modalPrint.show();
    } else {
        $modalSave.show();
        $modalPrint.hide();
    }

    openModal();
}

$topAddBtn.on('click', function(){
    if(currentSection==='orders') openForm('order', null);
    if(currentSection==='items') openForm('item', null);
    if(currentSection==='suppliers') openForm('supplier', null);
    if(currentSection==='stock') openForm('stock', null);
    if(currentSection==='restock') openForm('restock', null);
    if(currentSection==='admins') openForm('admin', null);
    if(currentSection==='customers') openForm('customer', null);
    if(currentSection==='tables') openForm(tableSubView === 'tables' ? 'table' : 'category', null);
});


/* ============================================================
   INPUT VALIDATIONS
   ============================================================ */

// item: restrict price/unit to at most 2 decimal digits while typing
$(document).on('input', '#f_price', function(){
    validatePriceInput($(this));
});

// restock: restrict price/unit to at most 2 decimal digits while typing
$(document).on('input', '#f_itemPrice', function(){
    validatePriceInput($(this));
});

// table category: restrict price per seat to at most 2 decimal digits while typing
$(document).on('input', '#f_seatPrice', function(){
    validatePriceInput($(this));
});

// prevent input from typing mor than 2 decimal digits
const validatePriceInput = function(element){
    const val = element.val();
    const parts = val.split('.');
    if(parts.length > 1 && parts[1].length > 2){
        element.val(parts[0] + '.' + parts[1].slice(0, 2));
    }
}

// prevent input from typing decimal digits
$(document).on('keydown', '#f_capacity', function (e) {
    // Block '.', ',', 'e', 'E', and '-'
    if (['.', ',', 'e', 'E', '-'].includes(e.key)) {
        e.preventDefault();
    }
});

// restock: add item to the in-form line-items table
$(document).on('click', '#addRestockItemBtn', function(){
    const itemId = Number($('#f_itemSelect').val());
    const qty = Number($('#f_itemQty').val());
    const price = Math.round(Number($('#f_itemPrice').val()) * 100) / 100;
    if(!itemId || !qty || !price){ showToast('Select an item, quantity and price'); return; }

    const item = {
        stockItemId: Number($('#f_itemSelect').val()),
        stockItemName: $('#f_itemSelect option:selected').text(),
        pricePerUnit: price,
        qty: qty
    }

    restockDraftItems.push(item);

    // update total value
    let total = 0;
    for (let i of restockDraftItems) {
        total += (i.pricePerUnit * i.qty);
    }
    $('#restockTotalDisplay').text(money(total));

    renderRestockDraftTable(restockDraftItems, false);
    $('#f_itemSelect').val('');
    $('#f_itemQty').val('');
    $('#f_itemPrice').val('');
});

// restock: remove a line item from the in-form table
$(document).on('click', '.restock-remove-btn', function(){
    const idx = Number($(this).data('idx'));
    restockDraftItems.splice(idx, 1);

    // update total value
    let total = 0;
    for (let i of restockDraftItems) {
        total += (i.pricePerUnit * i.qty);
    }
    $('#restockTotalDisplay').text(money(total));

    renderRestockDraftTable(restockDraftItems, false);
});

/* ---- restock: print the current restock order ---- */
$modalPrint.on('click', function(){
    const restockId = (editContext && editContext.id) || '';
    const supplier = $('#f_supplier').val() || '—';
    const date = $('#f_date').val() || '—';
    const total = restockDraftItems.reduce((sum, it) => sum + it.qty * it.price, 0);

    const rowsHtml = restockDraftItems.map(it => `
    <tr>
      <td>${it.name}</td>
      <td>${it.qty} ${it.unit}</td>
      <td>${money(it.price)}</td>
      <td>${money(it.qty * it.price)}</td>
    </tr>
  `).join('') || `<tr><td colspan="4">No items on this restock order.</td></tr>`;

    const printWin = window.open('', '_blank', 'width=800,height=900');
    printWin.document.write(`
    <html>
    <head>
      <title>Restock ${restockId}</title>
      <style>
        body{font-family: Arial, Helvetica, sans-serif; padding:36px; color:#3A2822;}
        h1{font-size:1.4rem; margin-bottom:4px;}
        p{margin:2px 0 20px; color:#6B5248;}
        table{width:100%; border-collapse:collapse; margin-top:10px;}
        th, td{padding:9px 12px; border:1px solid #ddd; text-align:left; font-size:0.9rem;}
        th{background:#F5EFE4;}
        tfoot td{font-weight:bold;}
      </style>
    </head>
    <body>
      <h1>Restock Order ${restockId}</h1>
      <p>Supplier: ${supplier}<br>Date: ${date}</p>
      <table>
        <thead><tr><th>Item Name</th><th>Qty</th><th>Price/Unit</th><th>Subtotal</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot><tr><td colspan="3">Total</td><td>${money(total)}</td></tr></tfoot>
      </table>
    </body>
    </html>
  `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => printWin.print(), 300);
});

/* orders table: print an order receipt directly from the row, no modal needed */
$(document).on('click', '[data-print-order]', function(){
    const orderId = $(this).data('print-order');
    const order = orders.find(o => o.id === orderId);
    if(!order) return;

    const parsedItems = parseOrderItems(order.items);
    const rowsHtml = parsedItems.map(it => `
    <tr><td>${it.name}</td><td>${it.qty}</td></tr>
  `).join('') || `<tr><td colspan="2">No items on this order.</td></tr>`;

    const printWin = window.open('', '_blank', 'width=800,height=900');
    printWin.document.write(`
    <html>
    <head>
      <title>Order ${order.id}</title>
      <style>
        body{font-family: Arial, Helvetica, sans-serif; padding:36px; color:#3A2822;}
        h1{font-size:1.4rem; margin-bottom:4px;}
        p{margin:2px 0 20px; color:#6B5248;}
        table{width:100%; border-collapse:collapse; margin-top:10px;}
        th, td{padding:9px 12px; border:1px solid #ddd; text-align:left; font-size:0.9rem;}
        th{background:#F5EFE4;}
        tfoot td{font-weight:bold;}
      </style>
    </head>
    <body>
      <h1>Order ${order.id}</h1>
      <p>Customer: ${order.customer}<br>Status: ${order.status}<br>Date: ${order.date}</p>
      <table>
        <thead><tr><th>Item Name</th><th>Qty</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot><tr><td>Total</td><td>${money(order.total)}</td></tr></tfoot>
      </table>
    </body>
    </html>
  `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => printWin.print(), 300);
});

/* delegated edit buttons — bound once on document since rows are re-rendered */
$(document).on('click', '[data-edit]', function(){
    const type = $(this).data('edit');
    let id = $(this).attr('data-id');
    if(type !== 'order') id = Number(id);
    openForm(type, id);
});

/* save handler */
$modalSave.on('click', function(){
    $modalSave.prop('disabled', true);

    const {type, id} = editContext;
    const isEdit = id !== null && id !== undefined;

    if(type === 'order'){

        const obj = {
            order_id: id,
            order_status: $('#f_status').val().toUpperCase()
        };

        $.ajax({
            url : "http://localhost:8080/v1/order/updateOrderStatus",
            type : "PATCH",
            // contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data : obj,
            success: function (response){
                if(response.status === 200){
                    showToast('Order updated');

                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'item'){
        // badges
        const badgesList = $('#badgeChips .check-chip.active').map(function(){ return $(this).data('badge'); }).get();
        let badges = '';
        badgesList.forEach((b, index) => {
            if(index === badgesList.length-1){
                badges += b;
            }else{
                badges += b + ",";
            }
        });

        let itemName = $('#f_name').val();
        let price = Number($('#f_price').val());
        let img = $('#f_img').val().trim() || 'https://images.unsplash.com/vector-1750272213032-5f8f1cf5080f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        let description = $('#f_description').val();
        let categoryId = $('#f_category').val();
        let discountId = $('#f_discount').val();

        if(!validateName(itemName)){ showToast("INVALID ITEM NAME"); $modalSave.prop('disabled', false); return; }

        // adding auto crop syntaxes so the image will align correctly (according to unsplash website)
        if(img.includes("?auto=format") === false){
            img = img + "?auto=format&fit=crop&w=200&q=80";
        }

        const obj = {
            foodItemId : 0,
            foodItemName : itemName,
            price : price,
            imagePath : img,
            description : description,
            foodItemCategoryId : categoryId,
            discountId : discountId,
            badges: badges
        };

        if(isEdit){ obj.foodItemId = id; }

        $.ajax({
            url : "http://localhost:8080/v1/foodItems/saveFoodItem",
            type : "POST",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data : JSON.stringify(obj),
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Item Updated');
                    }else{
                        showToast('Item Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'supplier'){

        let companyName = $('#f_name').val().trim();
        let contactPersonName = $('#f_contact').val().trim();
        let phone = $('#f_phone').val().trim();
        let email = $('#f_email').val().trim();
        let status = $('#f_status').val().toUpperCase();

        if(!validateName(companyName)){ showToast("INVALID COMPANY NAME"); $modalSave.prop('disabled', false); return; }
        if(!validateName(contactPersonName)){ showToast("INVALID PERSON NAME"); $modalSave.prop('disabled', false); return; }
        if(!validEmail(email)){ showToast("INVALID EMAIL"); $modalSave.prop('disabled', false); return; }
        if(!validatePhoneNumber(phone)){ showToast("INVALID CONTACT"); $modalSave.prop('disabled', false); return;}

        phone = formatPhoneNumber(phone);
        if(!phone){showToast("INVALID CONTACT"); $modalSave.prop('disabled', false); return;}

        const obj = {
            supplierId : 0,
            companyName : companyName,
            supplierName :contactPersonName,
            contact : phone,
            email : email,
            supplierStatus : status
        };

        if (isEdit){
            obj.supplierId = id;
        }

        $.ajax({
            url: "http://localhost:8080/v1/supplier/saveSupplier",
            type: "POST",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data: JSON.stringify(obj),
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Supplier Updated');
                    }else{
                        showToast('Supplier Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'stock'){

        let itemName = $('#f_name').val().trim();
        let categoryId = $('#f_category').val();
        let unit = $('#f_unit').val();
        let qty = Number($('#f_quantity').val()) || 0;
        let reorderLevel =  Number($('#f_reorderLevel').val()) || 0;

        if(!validateName(itemName)){ showToast("INVALID COMPANY NAME"); $modalSave.prop('disabled', false); return; }
        if(qty < 0){showToast("INVALID STOCK QUANTITY"); $modalSave.prop('disabled', false); return;}
        if(reorderLevel < 0){showToast("INVALID STOCK QUANTITY"); $modalSave.prop('disabled', false); return;}

        const obj = {
            stockItemId : 0,
            itemName : itemName,
            stockItemCategoryId : categoryId,
            stockQty : qty,
            unitOfMeasure : unit,
            reorderLevel : reorderLevel
        }

        if(isEdit){
            obj.stockItemId = id;
        }

        $.ajax({
            url: "http://localhost:8080/v1/stockItem/saveStockItem",
            type: "POST",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data: JSON.stringify(obj),
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Stock Item Updated');
                    }else{
                        showToast('Stock Item Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'restock'){
        const supplier = $('#f_supplier').val();
        const date = $('#f_date').val(); // || new Date().toISOString().split('T')[0];

        if(!supplier){ showToast('Please select a supplier'); $modalSave.prop('disabled', false); return; }
        if(!date){ showToast('Please select a date'); $modalSave.prop('disabled', false); return; }
        if(restockDraftItems.length === 0){ showToast('Add at least one item'); $modalSave.prop('disabled', false); return; }

        const obj ={
            restockId : 0,
            supplierId : supplier,
            date : date,
            total :0,
            restockDetailDTOList : restockDraftItems
        }

        $.ajax({
            url: "http://localhost:8080/v1/restock/saveRestock",
            type: "POST",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data: JSON.stringify(obj),
            success: function(response){
                if(response.status === 200){
                    showToast('Restock Data Created');
                    restockDraftItems = [];
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (response){
                if(response.message){
                    alert(response.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'admin'){
        let name = $('#f_name').val().trim();
        let email = $('#f_email').val().trim();
        let contact = $('#f_phone').val().trim();

        if(!validateName(name)){ showToast("INVALID NAME"); $modalSave.prop('disabled', false); return; }
        if(!validEmail(email)){ showToast("INVALID EMAIL"); $modalSave.prop('disabled', false); return; }
        if(!validatePhoneNumber(contact)){ showToast("INVALID CONTACT"); $modalSave.prop('disabled', false); return;}

        contact = formatPhoneNumber(contact);
        if(!contact){showToast("INVALID CONTACT"); $modalSave.prop('disabled', false); return;}

        if(!isEdit){
            const passOk = validatePasswordStrength();
            const confirmOk = validateConfirm();
            if(!passOk){alert("INVALID PASSWORD"); $modalSave.prop('disabled', false); return;}
            if(!confirmOk){ alert("PASSWORD CONFIRMATION ERROR"); $modalSave.prop('disabled', false); return;}
        }

        const obj = {
            userId: 0,
            userName: name,
            userEmail: email,
            userContact: contact,
            password: '',
            userRoles: $('#f_role').val(),
            userStatus: $('#f_status').val().toUpperCase(),
        };

        if(isEdit){ obj.userId = id; }
        else{ obj.password = $('#password').val()}

        $.ajax({
            url:'http://localhost:8080/v1/user/saveStaff',
            type: 'POST',
            contentType:'application/json',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data: JSON.stringify(obj),
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Staff Updated');
                    }else{
                        showToast('Staff Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                alert("UNEXPECTED ERROR");
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'customer'){

        const obj = {
            user_id: id,
            user_status: $('#f_status').val()
        };

        $.ajax({
            url:'http://localhost:8080/v1/user/updateUserStatus',
            type: 'PATCH',
            // contentType:'application/json',
            data: obj,
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Customer Updated');
                    }else{
                        showToast('Customer Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                alert("UNEXPECTED ERROR");
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'table'){

        let tableType = $('#f_type').val();
        let capacity = Number($('#f_capacity').val());
        let status = $('#f_status').val().toUpperCase();

        if(capacity < 1){ showToast("INVALID SEAT COUNT"); $modalSave.prop('disabled', false); return; }

        const obj = {
            tableId: 0,
            tableCategoryId: tableType,
            seatCount: capacity,
            tableStatus: status,
        };

        if(isEdit){
            obj.tableId = id;
        }

        $.ajax({
            url: "http://localhost:8080/v1/table/saveTable",
            type: "POST",
            contentType: "application/json",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            data: JSON.stringify(obj),
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Table Updated');
                    }else{
                        showToast('Table Added');
                    }
                    closeModal();
                    renderAll();
                }else{
                    alert(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message);
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }

    if(type === 'category'){
        let categoryName = $('#f_categoryName').val();
        let pricePerSeat = $('#f_seatPrice').val();

        const obj = {
            tableCategoryId:0,
            tableCategoryName: categoryName,
            pricePerSeat: pricePerSeat
        };

        if(isEdit){
            obj.tableCategoryId = id
        }

        $.ajax({
            url:'http://localhost:8080/v1/tableCategory/saveTableCategory',
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(obj),
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("JWT")
            },
            success: function (response){
                if(response.status === 200){
                    if(isEdit){
                        showToast('Category Updated');
                    }else{
                        showToast('Category Saved');
                    }
                    closeModal();
                    renderAll();
                }else{
                    showToast(response.message);
                    $modalSave.prop('disabled', false);
                }
            },
            error: function (e){
                if(e.message){
                    alert(e.message)
                }else{
                    alert("UNEXPECTED ERROR");
                }
                $modalSave.prop('disabled', false);
            }
        });
    }
    // closeModal();
    // renderAll();
});

/* ============================================================
   MODAL: CONFIRM DELETE
   ============================================================ */
const $confirmModal = $('#confirmModal');
const $confirmText = $('#confirmText');
let deleteContext = null;

function openConfirm(){ $confirmModal.addClass('show'); $modalScrim.addClass('show'); }
function closeConfirm(){ $confirmModal.removeClass('show'); if(!$formModal.hasClass('show')) $modalScrim.removeClass('show'); }
$('#confirmCancel').on('click', closeConfirm);

$(document).on('click', '[data-delete]', function(){
    const type = $(this).data('delete');
    let id = $(this).attr('data-id');
    if(type !== 'order') id = Number(id);
    deleteContext = {type, id};

    let name = '';
    if(type==='order') name = orders.find(o=>o.id===id)?.id;
    if(type==='item') name = items.find(i=>i.id===id)?.name;
    if(type==='supplier') name = suppliers.find(s=>s.id===id)?.name;
    if(type==='admin') name = admins.find(a=>a.id===id)?.name;
    if(type==='customer') name = customers.find(c=>c.id===id)?.name;
    $confirmText.html(`This will permanently delete <strong>${name}</strong>. This action can't be undone.`);
    openConfirm();
});

$('#confirmDelete').on('click', function(){
    const {type, id} = deleteContext;
    if(type==='order'){ orders = orders.filter(o=>o.id!==id); showToast('Order deleted'); }
    if(type==='item'){ items = items.filter(i=>i.id!==id); showToast('Item deleted'); }
    if(type==='supplier'){ suppliers = suppliers.filter(s=>s.id!==id); showToast('Supplier deleted'); }
    if(type==='admin'){ admins = admins.filter(a=>a.id!==id); showToast('Admin removed'); }
    if(type==='customer'){ customers = customers.filter(c=>c.id!==id); showToast('Customer removed'); }
    closeConfirm();
    renderAll();
});

$modalScrim.on('click', function(){ closeModal(); closeConfirm(); });
$(document).on('keydown', function(e){ if(e.key==='Escape'){ closeModal(); closeConfirm(); closeSidebar(); } });

/* ============================================================
   INIT
   ============================================================ */
goToSection('overview');