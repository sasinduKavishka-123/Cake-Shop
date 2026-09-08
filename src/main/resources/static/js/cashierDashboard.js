
/* ============================================================
   DATA
   ============================================================ */
let menuItems = [];

let orders = [
    {id:'ORD-1042', customer:'Nadeesha Perera', items:'2x Butter Croissant, 1x Rose Cake', total:4100, status:'Pending', date:'2026-08-11', paid:false},
    {id:'ORD-1041', customer:'Kavindu Silva', items:'1x Berry Tart, 2x Latte', total:2190, status:'Preparing', date:'2026-08-11', paid:false},
    {id:'ORD-1040', customer:'Ishara Fernando', items:'6x Macaron Box', total:1150, status:'Ready', date:'2026-08-10', paid:false},
    {id:'ORD-1039', customer:'Tharindu Jayasuriya', items:'1x Chocolate Torte', total:1350, status:'Delivered', date:'2026-08-10', paid:true, paymentMethod:'Card', amountPaid:1350, change:0},
    {id:'ORD-1038', customer:'Amaya Ranasinghe', items:'3x Croissant, 1x Orange Juice', total:1830, status:'Cancelled', date:'2026-08-09', paid:false},
];

let bookings = [
    {id:'BK-1001', customer:'Nadeesha Perera', date:'2026-08-31', slot:'11 AM – 1 PM', guests:2, tables:[{id:1,name:'Window Booth A'}], total:500, status:'Confirmed', paid:false},
    {id:'BK-1002', customer:'Kavindu Rathnayake', date:'2026-08-31', slot:'6 – 8 PM', guests:6, tables:[{id:2,name:'Communal Table'}], total:800, status:'Pending', paid:false},
    {id:'BK-1003', customer:'Ishara Wickramasinghe', date:'2026-08-30', slot:'1 – 3 PM', guests:3, tables:[{id:3,name:'Quiet Corner B'}], total:650, status:'Completed', paid:true, paymentMethod:'Cash', amountPaid:650, change:0},
    {id:'BK-1004', customer:'Tharindu Jayasuriya', date:'2026-08-29', slot:'9 – 11 AM', guests:2, tables:[{id:4,name:'Window Booth C'}], total:500, status:'Cancelled', paid:false},
];

let nextOrderNum = 1043;

/* ============================================================
   NAVIGATION
   ============================================================ */
const sections = {
    placeorder: {title:'Place Order', sub:'Build an order for a walk-in or phone customer.', showSearch:true},
    orders: {title:'Orders', sub:'View and update order status.', showSearch:true},
    bookings: {title:'Table Bookings', sub:'View and update booking status.', showSearch:true},
    payments: {title:'Payments', sub:'Take payment and complete orders or bookings.', showSearch:true},
    menuitems: {title:'Menu Items', sub:'Browse all items currently on the menu.', showSearch:true},
};
const statusOptionsMap = {
    orders: ['Pending','Preparing','Ready','Cancelled','Done'],
    bookings: ['Pending','Confirmed','Completed','Cancelled'],
};
let currentSection = 'placeorder';
let activeStatuses = new Set();
let paymentsSubView = 'orders'; // 'orders' or 'bookings'

let orderDateFilter = ''; // yyyy-mm-dd, empty means "show all dates"
let bookingDateFilter = '';

const $navItems = $('.nav-item');
const $searchWrap = $('#searchWrap');
const $searchInput = $('#searchInput');

function statusAllowed(label){ return activeStatuses.size === 0 || activeStatuses.has(label); }
function statusClass(status){
    return {Pending:'badge-pending',Preparing:'badge-preparing',Ready:'badge-ready',Done:'badge-delivered',
        Cancelled:'badge-cancelled',Confirmed:'badge-confirmed',Completed:'badge-completed'}[status] || 'badge-pending';
}

/// HELPER FUNCTION *****************************
function money(n){ return 'Rs. ' + n.toLocaleString(); }

function finalPrice(item){
    return item.discountPercentage ? Math.round(item.price * (1 - item.discountPercentage / 100)) : item.price;
}

function showToast(msg){
    $('#toastMsg').text(msg);
    $('#toast').addClass('show');
    setTimeout(()=> $('#toast').removeClass('show'), 2200);
}

// make status name to normal (only first letter is uppercase)
function formatStatus(status) {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}


function goToSection(name){
    currentSection = name;
    $navItems.each(function(){ $(this).toggleClass('active', $(this).data('section') === name); });
    $('.section-panel').removeClass('active');
    $('#panel-'+name).addClass('active');
    $('#topbarTitle').text(sections[name].title);
    $('#topbarSub').text(sections[name].sub);
    $searchWrap.toggleClass('sw-hidden', !sections[name].showSearch);
    $searchInput.val('');
    activeStatuses = new Set();
    renderStatusFilter();
    paymentsSubView = 'orders';
    $('.subnav-btn[data-payview]').removeClass('active');
    $('.subnav-btn[data-payview="orders"]').addClass('active');
    $('#paymentsOrdersView').show();
    $('#paymentsBookingsView').hide();
    orderDateFilter = '';
    $('#orderDateFilter').val('');
    bookingDateFilter = '';
    $('#bookingDateFilter').val('');
    closeSidebar();
    renderAll();
}
$navItems.on('click', function(){ goToSection($(this).data('section')); });

/* ============ SIDEBAR (mobile) ============ */
const $sidebar = $('#sidebar');
const $sidebarScrim = $('#sidebarScrim');
$('#hamburgerBtn').on('click', function(){ $sidebar.addClass('open'); $sidebarScrim.css({opacity:1,pointerEvents:'auto'}); });
$('#sidebarClose').on('click', closeSidebar);
$sidebarScrim.on('click', closeSidebar);
function closeSidebar(){ $sidebar.removeClass('open'); $sidebarScrim.css({opacity:0,pointerEvents:'none'}); }

/* ============ STATUS FILTER CHIPS (Orders / Bookings) ============ */
function renderStatusFilter(){
    const options = statusOptionsMap[currentSection];
    const filterId = currentSection === 'orders' ? '#orderStatusFilter' : currentSection === 'bookings' ? '#bookingStatusFilter' : null;
    $('.status-filter').empty().hide();
    if(!options || !filterId) return;
    $(filterId).css('display','flex').html(options.map(s => `
    <label class="status-chip">
      <input type="checkbox" value="${s}">
      ${s}
    </label>
  `).join(''));
}
$(document).on('change', '.status-filter input[type="checkbox"]', function(){
    const val = $(this).val();
    const checked = $(this).is(':checked');
    $(this).closest('.status-chip').toggleClass('active', checked);
    if(checked) activeStatuses.add(val); else activeStatuses.delete(val);
    renderAll();
});


/* ============ Get Food items ============ */
function getAllFoodItems(){
    $.ajax({
        url:"http://localhost:8080/v1/foodItems/getAllFoodItems",
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        success: function (r){
            if(r.status === 200){
                menuItems = r.body;
                renderPosGrid("");
            }
            else if(r.status === 401){
                showToast("Please Login First");
                setTimeout(()=>{
                    window.location.href = "staffLogin.html";
                }, 2000);
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
        }
    });
}

/* ---- orders: filter by date ---- */
$('#orderDateFilter').on('change', function(){
    orderDateFilter = $(this).val();
    renderAll();
});
$('#clearOrderDateFilter').on('click', function(){
    orderDateFilter = '';
    $('#orderDateFilter').val('');
    renderAll();
});

/* ---- bookings: filter by date ---- */
$('#bookingDateFilter').on('change', function(){
    bookingDateFilter = $(this).val();
    renderAll();
});
$('#clearBookingDateFilter').on('click', function(){
    bookingDateFilter = '';
    $('#bookingDateFilter').val('');
    renderAll();
});

/* ============================================================
   ORDERS — view + inline status update
   ============================================================ */
function renderOrders(filter=''){
    const f = filter.toLowerCase();

    const obj = {
        order_id: f,
        user_name : f,
        order_date : orderDateFilter,
        status_list : Array.from(activeStatuses)
    }

    $.ajax({
        url:"http://localhost:8080/v1/order/filterOrders",
        type: "GET",
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (r){
            if(r.status === 200){
                let html = "";
                for(const o of r.body){

                    let itemList = '';
                    o.orderItems.forEach( (item, index) =>{
                        if(index === o.orderItems.length-1){
                            itemList += item.qty + "x" + item.foodItemName;
                        }else{
                            itemList += item.qty + "x" + item.foodItemName + ", ";
                        }
                    });

                    html +=
                        `<tr>
                          <td class="cell-title">${o.orderId}</td>
                          <td>${o.userName}</td>
                          <td><span class="cell-sub">${itemList}</span></td>
                          <td class="cell-title">${money(o.total)}</td>
                          <td>${o.orderDate}</td>
                          <td>${o.timeSlot}</td>
                          <td><span class="badge-pill ${statusClass(formatStatus(o.orderStatus))}">${formatStatus(o.orderStatus)}</span></td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-update-order="${o.orderId}" aria-label="Update status"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                              <button class="icon-btn print-icon" data-print-order="${o.orderId}" aria-label="Print"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(r.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="7">No orders match your search.</td></tr>`;
                }
                $('#ordersBody').html(html);

            }
            else if(r.status === 401){
                showToast("Please Login First");
                setTimeout(()=>{
                    window.location.href = "staffLogin.html";
                }, 2000);
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
        }
    });
}

/* ============================================================
   BOOKINGS — view + status update via modal
   ============================================================ */
function renderBookings(filter=''){
    const f = filter.toLowerCase();
    let obj = {
        booking_id : f,
        user_name : f,
        booking_date : bookingDateFilter,
        booking_statuses: Array.from(activeStatuses)
    }

    $.ajax({
        url: "http://localhost:8080/v1/booking/filterBooking",
        type: 'GET',
        data: obj,
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("JWT")
        },
        success: function (response){
            if(response.status === 200){
                let html = "";
                for(const b of response.body){

                    let status = formatStatus(b.bookingStatus);

                    html +=
                        `<tr>
                          <td class="cell-title">${b.bookingId}</td>
                          <td>${b.userName}</td>
                          <td>${b.bookingDate}</td>
                          <td>${b.bookingTime}</td>
                          <td>${b.seatCount}</td>
                          <td>${b.tableType}</td>
                          <td><span class="badge-pill ${statusClass(status)}">${status}</span></td>
                          <td>
                            <div class="row-actions">
                              <button class="icon-btn" data-update-booking="${b.bookingId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                              <button class="icon-btn" data-print-booking="${b.bookingId}" aria-label="Print"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            </div>
                          </td>
                        </tr>`;
                }
                if(response.body.length === 0){
                    html += `<tr class="empty-row"><td colspan="8">No Booking match your search.</td></tr>`;
                }
                $('#bookingsBody').html(html);
                $(window).on('load', function (){
                    alert(response.message);
                })
            }
            else{
                alert(response.message);
                $('#bookingsBody').html(`<tr class="empty-row"><td colspan="5">No Booking match your search.</td></tr>`);
            }
        },
        error: function (){
            alert("SERVER DOES NOT RESPONDED");
            $('#bookingsBody').html(`<tr class="empty-row"><td colspan="5">No Booking match your search.</td></tr>`);
        }
    });
}

/* ============================================================
   PAYMENTS — switch between Orders/Bookings, take payment
   ============================================================ */
$('#paymentsSubnav').on('click', '.subnav-btn', function(){
    paymentsSubView = $(this).data('payview');
    $('#paymentsSubnav .subnav-btn').removeClass('active');
    $(this).addClass('active');
    $('#paymentsOrdersView').toggle(paymentsSubView === 'orders');
    $('#paymentsBookingsView').toggle(paymentsSubView === 'bookings');
    renderAll();
});

function renderPaymentsOrders(){

    const f = $searchInput.val().toLowerCase();

    const obj = {
        order_id : f,
        user_name : f,
        order_date : '',
        status_list : ['READY']
    }

    $.ajax({
        url: "http://localhost:8080/v1/order/filterOrders",
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (r){
            if(r.status === 200){
                $('#paymentsOrdersBody').html(r.body.map(o => `
                  <tr>
                    <td class="cell-title">${o.orderId}</td>
                    <td>${o.userName}</td>
                    <td>${o.orderDate}</td>
                    <td>${o.timeSlot}</td>
                    <td class="cell-title">${money(o.total)}</td>
                    <td><span class="badge-pill ${statusClass(formatStatus(o.orderStatus))}">${formatStatus(o.orderStatus)}</span></td>
                    <td>
                      <button class="pay-btn" data-pay-order="${o.orderId}">Take Payment</button>
                    </td>
                  </tr>
                `).join('') || `<tr class="empty-row"><td colspan="6">No orders to pay.</td></tr>`);
            }
            else{ showToast(r.message); }
        },
        error: function (r){ r.message ? alert(r.message) : alert("UNEXPECTED ERROR"); }
    });
}

function renderPaymentsBookings(){
    const f = $searchInput.val().toLowerCase();

    const obj = {
        booking_id : f,
        user_name : f,
        booking_date : '',
        booking_statuses : ['CONFIRMED']
    }

    $.ajax({
        url: "http://localhost:8080/v1/booking/filterBooking",
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (r){
            if(r.status === 200){
                $('#paymentsBookingsBody').html(r.body.map(b => `
                  <tr>
                    <td class="cell-title">${b.bookingId}</td>
                    <td>${b.userName}</td>
                    <td>${b.bookingDate}</td>
                    <td>${b.bookingTime}</td>
                    <td class="cell-title">${money(b.total || 0)}</td>
                    <td><span class="badge-pill ${statusClass(formatStatus(b.bookingStatus))}">${formatStatus(b.bookingStatus)}</span></td>
                    <td>
                      <button class="pay-btn" data-pay-booking="${b.bookingId}">Take Payment</button>
                    </td>
                  </tr>
                `).join('') || `<tr class="empty-row"><td colspan="7">No bookings to pay.</td></tr>`);
            }
            else{ showToast(r.message); }
        },
        error: function (r){ r.message ? alert(r.message) : alert("UNEXPECTED ERROR"); }
    });
}

/* ============================================================
   PAYMENT MODAL — take payment, mark complete, then auto-print
   ============================================================ */
const $paymentModal = $('#paymentModal');
let activePayment = null; // {type: 'order'|'booking', id}
let paymentMethod = 'Cash';

function openPaymentModal(type, id){
    activePayment = {type, id};
    paymentMethod = 'Cash';
    const record = type === 'order' ? orders.find(x => x.id === id) : bookings.find(x => x.id === id);
    if(!record) return;
    const total = type === 'order' ? record.total : (record.total || 0);

    $('#paymentModalTitle').text('Take Payment — ' + record.id);
    $('#paymentModalBody').html(`
    <div class="detail-row"><span>Customer</span><strong>${record.customer}</strong></div>
    <div class="detail-row"><span>Amount Due</span><strong>${money(total)}</strong></div>
    <div class="field-group">
      <label>Payment Method</label>
      <div class="pm-toggle" id="pmMethodToggle">
        <button type="button" class="active" data-method="Cash">Cash</button>
        <button type="button" data-method="Card">Card</button>
        <button type="button" data-method="Online">Online</button>
      </div>
    </div>
    <div class="field-group" id="cashFieldWrap">
      <label>Amount Received</label>
      <input type="number" id="f_amountReceived" placeholder="${total}" value="${total}">
      <div class="change-display ok" id="changeDisplay"><span>Change</span><span>Rs. 0</span></div>
    </div>
  `);

    updateChangeDisplay(total);
    $paymentModal.addClass('show');
    $modalScrim.addClass('show');
}
function closePaymentModal(){
    $paymentModal.removeClass('show');
    if(!$updateModal.hasClass('show') && !$printModal.hasClass('show')) $modalScrim.removeClass('show');
}

function updateChangeDisplay(total){
    const received = Number($('#f_amountReceived').val()) || 0;
    const diff = received - total;
    const $display = $('#changeDisplay');
    if(diff < 0){
        $display.attr('class', 'change-display short').html(`<span>Amount Short</span><span>${money(Math.abs(diff))}</span>`);
    } else {
        $display.attr('class', 'change-display ok').html(`<span>Change</span><span>${money(diff)}</span>`);
    }
}

$(document).on('click', '[data-pay-order]', function(){ openPaymentModal('order', $(this).data('pay-order')); });
$(document).on('click', '[data-pay-booking]', function(){ openPaymentModal('booking', $(this).data('pay-booking')); });
$('#paymentModalClose').on('click', closePaymentModal);
$('#paymentModalCancel').on('click', closePaymentModal);

$(document).on('click', '#pmMethodToggle button', function(){
    paymentMethod = $(this).data('method');
    $('#pmMethodToggle button').removeClass('active');
    $(this).addClass('active');
    $('#cashFieldWrap').toggle(paymentMethod === 'Cash');
});

$(document).on('input', '#f_amountReceived', function(){
    if(!activePayment) return;
    const record = activePayment.type === 'order' ? orders.find(x => x.id === activePayment.id) : bookings.find(x => x.id === activePayment.id);
    if(record) updateChangeDisplay(activePayment.type === 'order' ? record.total : (record.total || 0));
});

$('#paymentModalConfirm').on('click', function(){
    if(!activePayment) return;
    const isOrder = activePayment.type === 'order';
    const record = isOrder ? orders.find(x => x.id === activePayment.id) : bookings.find(x => x.id === activePayment.id);
    if(!record) return;
    const total = isOrder ? record.total : (record.total || 0);

    let amountPaid = total;
    let change = 0;
    if(paymentMethod === 'Cash'){
        const received = Number($('#f_amountReceived').val()) || 0;
        if(received < total){
            showToast('Amount received is less than the total due');
            return;
        }
        amountPaid = received;
        change = received - total;
    }

    record.paid = true;
    record.paymentMethod = paymentMethod;
    record.amountPaid = amountPaid;
    record.change = change;
    record.status = isOrder ? 'Delivered' : 'Completed';

    const $btn = $(this);
    const $label = $('#paymentConfirmLabel');
    const original = $label.text();
    $btn.addClass('success');
    $label.text('✓ Payment Complete');

    setTimeout(() => {
        $btn.removeClass('success');
        $label.text(original);
        closePaymentModal();
        renderAll();
        showToast(`${record.id} marked as paid`);
        // automatically open the print preview for the receipt
        if(isOrder){
            buildOrderReceiptHtml(record);
        } else {
            openPrintPreview(buildBookingReceiptHtml(record));
        }
    }, 700);
});

/* ============================================================
   UPDATE STATUS MODAL — cashier can only change status;
   every other field is shown read-only for reference.
   ============================================================ */
const $modalScrim = $('#modalScrim');
const $updateModal = $('#updateModal');
const $printModal = $('#printModal');
let activeUpdate = null; // {type: 'order'|'booking', id}

function openUpdateModal(type, id){
    activeUpdate = {type, id};
    const orderStatuses = ['Pending','Preparing','Ready','Cancelled'];
    const bookingStatuses = ['Pending','Confirmed','Completed','Cancelled'];

    if(type === 'order'){
        $.ajax({
            url:"http://localhost:8080/v1/order/getOrderFormDetail/" + id,
            type: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("JWT")
            },
            success: function (r){
                if(r.status === 200){
                    const o = r.body;
                    const user = r.body.user;
                    let display = o.timeSlot ? "" : "style=\"display: none\" ";

                    const rows = o.orderItems.map((i) =>
                        `<tr><td>${i.foodItemName}</td><td>${i.qty}</td><td>${i.price}</td><td>${i.discount}</td><td>${i.finalPrice}</td></tr>`
                    ).join("")

                    // pay details
                    let payDetail = '';
                    if(o.paymentDTO){
                        const p = o.paymentDTO;
                        payDetail = `
                            <div class="field-row-2">
                              <div class="field-group"><label>Payment</label><input disabled type="text" value="${money(p.payAmount)}" placeholder="0"></div>
                              <div class="field-group"><label>Change</label><input disabled type="text" value="${money(p.dueAmount)}" placeholder="0"></div>
                            </div>
                            <div class="field-row-2">
                              <div class="field-group"><label>Payment Date</label><input disabled type="text" value="${money(p.payDate)}" placeholder="0"></div>
                              <div class="field-group"><label>Payment Type</label><input disabled type="text" value="${money(p.payType)}" placeholder="0"></div>
                            </div>
                            `;
                    }

                    $('#updateModalTitle').text('Update Order ' + o.orderId);
                    $('#updateModalBody').html(`
                    <div class="field-group"><label>${user.userRoles} Name</label><input disabled type="text" value="${user.userName}" placeholder="Customer name"></div>
                    <div class="field-row-2">
                        <div class="field-group">
                            <label>Contact</label> <input disabled type="text" value="${user.userContact}" placeholder="contact">
                        </div>
                        <div class="field-group">
                            <label>Email</label> <input disabled type="text" value="${user.userEmail}" placeholder="email" min="1">
                        </div>
                    </div>
                
                    <div class="field-row-2">
                      <div class="field-group"><label>Date</label><input disabled type="date" value="${o.orderDate}"></div>
                      <div class="field-group" ${display}><label>Pick Up Time</label><input disabled type="text" value="${o.timeSlot}"></div>
                    </div>
                
                    <div class="field-group">
                      <label>Order Items</label>
                      <div>
                        <table>
                          <thead><tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Discount</th><th>Final Price</th></tr></thead>
                          <tbody id="orderItemsBody"> ${rows} </tbody>
                        </table>
                      </div>
                    </div>
                   
                    <div class="field-group"><lable>Order Note</lable><input disabled type="text" value="${o.orderNote}" placeholder="Order Note"> </div>
                    
                    <div class="field-row-2">
                      <div class="field-group"><label>Sub Total</label><input disabled type="text" value="${money(o.subTotal)}" placeholder="0"></div>
                      <div class="field-group"><label>Discount</label><input disabled type="text" value="${money(o.discount)}" placeholder="0"></div>
                    </div>
                    
                    <div class="field-row-2">
                      <div class="field-group"><label>Total</label><input disabled type="text" value="${money(o.total)}" placeholder="0"></div>
                    </div>
                    
                    ${payDetail}
                    
                    <div class="field-group"><label>Status</label>
                      <select id="f_status">
                        ${orderStatuses.map(s=>`<option ${formatStatus(o.orderStatus)===s?'selected':''}>${s}</option>`).join('')}
                      </select>
                    </div>
                    `);
                }
                else{
                    showToast(r.message);
                }
            },
            error: function (r){
                r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
            }
        });
    }
    else {
        $.ajax({
            url: "http://localhost:8080/v1/booking/getBookingById/" + id,
            type: "GET",
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("JWT")
            },
            success: function (r){
                if(r.status === 200){

                    const b = r.body;
                    const user = r.body.user;

                    const rows = b.bookingDetailList.map((t) =>
                        `<tr><td>${t.tableID}</td><td>${t.tableCategory}</td><td>${t.seatCount}</td></tr>`
                    ).join('');

                    $('#updateModalTitle').text('Update Booking ' + b.bookingId);
                    $('#updateModalBody').html(`
                        <div class="field-row-2">
                        <div class="field-group"><label>${user.userRoles} Name</label><input disabled type="text" value="${user.userName}" placeholder="Customer name"></div>
                        <div class="field-group"><label>Phone</label><input disabled type="tel" value="${user.userContact}" placeholder="+94 77 000 0000"></div>
                        </div>
                        <div class="field-group"><label>Email</label><input disabled type="text" value="${user.userEmail}" placeholder="0" min="1"></div>
                        <div class="field-group"><label>Booking Created Date</label><input disabled type="text" value="${b.bookingCreatedDate}" placeholder="0" min="1"></div>
                        <div class="field-row-2">
                          <div class="field-group"><label>Date</label><input disabled type="date" value="${b.bookingDate}"></div>
                          <div class="field-group"><label>Time Slot</label><input disabled type="text" value="${b.bookingTime}"></div>
                        </div>
                        <div class="field-row-2">
                            <div class="field-group"><label>Table Category</label><input disabled type="text" value="${b.tableType}" placeholder="0" min="1"></div>
                            <div class="field-group"><label>Guests</label><input disabled type="number" value="${b.seatCount}" placeholder="0" min="1"></div>
                        </div>
                    
                        <div class="field-group">
                          <label>Tables for This Booking</label>
                          <div>
                            <table>
                              <thead><tr><th>Table ID</th><th>Table Name</th><th>Seat Count</th></tr></thead>
                              <tbody id="bookingTablesBody"> ${rows} </tbody>
                            </table>
                          </div>
                          <div class="field-group" style="font-weight: bold">Total: <span>${money(b.total)}</span></div>
                        </div>
                    
                        <div class="field-group"><label>Special Requests</label>
                            <input disabled type="text" value="${b.bookingNote}" placeholder="note">
                        </div>
                    
                        <div class="field-group"><label>Status</label>
                          <select id="f_status">
                            ${bookingStatuses.map(v=>`<option ${formatStatus(b.bookingStatus)===v?'selected':''}>${v}</option>`).join('')}
                          </select>
                        </div>
                    `);

                }
                else{
                    showToast(r.message);
                }
            },
            error: function (r){
                r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
            }
        });
    }

    $updateModal.addClass('show');
    $modalScrim.addClass('show');
}

function closeUpdateModal(){
    $updateModal.removeClass('show');
    if(!$printModal.hasClass('show') && !$paymentModal.hasClass('show')) $modalScrim.removeClass('show');
}

$(document).on('click', '[data-update-order]', function(){ openUpdateModal('order', $(this).data('update-order')); });
$(document).on('click', '[data-update-booking]', function(){ openUpdateModal('booking', $(this).data('update-booking')); });
$('#updateModalClose').on('click', closeUpdateModal);
$('#updateModalCancel').on('click', closeUpdateModal);

$('#updateModalSave').on('click', function(){
    if(!activeUpdate) return;
    const newStatus = $('#f_updateStatus').val();

    if(activeUpdate.type === 'order'){
        const o = orders.find(x => x.id === activeUpdate.id);
        if(o) o.status = newStatus;
    } else {
        const b = bookings.find(x => x.id === activeUpdate.id);
        if(b) b.status = newStatus;
    }

    const $btn = $(this);
    const $label = $('#updateSaveLabel');
    const original = $label.text();
    $label.text('✓ Saved');
    $btn.addClass('success');
    setTimeout(() => {
        $btn.removeClass('success');
        $label.text(original);
        closeUpdateModal();
        showToast(`${activeUpdate.id} marked as ${newStatus}`);
        renderAll();
    }, 700);
});

/* ============================================================
   PRINT PREVIEW — order / booking details
   ============================================================ */
function openPrintPreview(html){
    $('#printArea').html(html);
    $printModal.addClass('show');
    $modalScrim.addClass('show');
}
function closePrintPreview(){
    $printModal.removeClass('show');
    if(!$updateModal.hasClass('show') && !$paymentModal.hasClass('show')) $modalScrim.removeClass('show');
}
$('#printModalClose').on('click', closePrintPreview);
$('#printModalCancel').on('click', closePrintPreview);
$('#printModalConfirm').on('click', function(){ window.print(); });
$modalScrim.on('click', function(){ closeUpdateModal(); closePrintPreview(); closePaymentModal(); });
$(document).on('keydown', function(e){ if(e.key === 'Escape'){ closeUpdateModal(); closePrintPreview(); closePaymentModal(); } });

function buildOrderReceiptHtml(id){

    $.ajax({
        url: "http://localhost:8080/v1/order/getOrderById/" + id,
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        success: function (r){
            if(r.status === 200){
                const o = r.body;

                const rowsHtml = o.orderItems.map(i =>
                    `<tr><td>${i.foodItemName}</td><td>${i.qty}</td><td>${i.price}</td><td>${i.discount}</td><td>${i.finalPrice}</td></tr>`
                ).join('') || `<tr><td colspan="5">No items.</td></tr>`;

                const p = o.paymentDTO;
                const paymentInfo = p
                    ? `<p>Payment Method: ${p.payType}<br>Payment Done Date: ${p.payDate}<br>Amount Paid: ${money(p.payAmount)}${p.dueAmount > 0 ? `<br>Change Given: ${money(o.dueAmount)}` : ''}</p>`
                    : `<p style="color:var(--error);">Payment: Not yet paid</p>`;

                const u = o.user;  // user

                const html = `
                  <h1>Order ${o.orderId}</h1>
                  <p>${u.userRoles}: ${u.userName}<br>Status: ${o.orderStatus}<br>Date: ${o.orderDate} <br>Pick Up Time: ${o.timeSlot}</p>
                  <div class="print-table-wrap">
                    <table>
                      <thead><tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Discount</th><th>Final Price</th></tr></thead>
                      <tbody>${rowsHtml}</tbody>
                      <tfoot><tr><td colspan="4">Sub Total</td><td>${money(o.subTotal)}</td></tr></tfoot>
                    </table>
                  </div>
                  
                  <p> <br>
                  Discount: ${money(o.discount)} <br> 
                  <span style="font-weight: bold; font-size: 16px">Total: ${money(o.total)}</span>
                  </p>
                  
                  ${paymentInfo}
                `;

                openPrintPreview(html);
            }
            else{ showToast(r.message) }
        },
        error: function (r){ r.message ? alert(r.message) : alert("UNEXPECTED ERROR"); }
    });
}

function buildBookingReceiptHtml(id){

    $.ajax({
        url: "http://localhost:8080/v1/booking/getBookingById/" + id,
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        success: function (r){
            if(r.status === 200) {
                const b = r.body;

                const tableRows = (b.bookingDetailList)
                    ? b.bookingDetailList.map(t => `<tr><td>${t.tableID}</td><td>${t.tableCategory}</td></tr>`).join('')
                    : `<tr><td>No tables assigned.</td></tr>`;

                const p = b.tablePaymentDTO;
                const paymentInfo = p
                    ? `<p>Payment Method: ${p.payType}<br>Amount Paid: ${money(p.payAmount)}${p.dueAmount > 0 ? `<br>Change Given: ${money(p.dueAmount)}` : ''}</p>`
                    : `<p style="color:var(--error);">Payment: Not yet paid</p>`;

                const html =  `
                  <h1>Booking ${b.bookingId}</h1>
                  <p>
                    Customer: ${b.user.userName}<br>
                    Date: ${b.bookingDate}<br>
                    Time: ${b.bookingTime}<br>
                    Guests: ${b.seatCount}<br>
                    Status: ${b.bookingStatus} <br>
                    Created Date: ${b.bookingCreatedDate}
                  </p>
                  <div class="print-table-wrap">
                    <table>
                      <thead><tr><th>Table ID</th><th>Table</th></tr></thead>
                      <tbody>${tableRows}</tbody>
                      <tfoot><tr><td>Total</td><td>${money(b.total || 0)}</td></tr></tfoot>
                    </table>
                  </div>
                  ${paymentInfo}
                `;

                openPrintPreview(html);
            }
            else{ showToast(r.message) }
        },
        error: function (r){ r.message ? alert(r.message) : alert("UNEXPECTED ERROR"); }
    });
}

$(document).on('click', '[data-print-order]', function(){
    const id = $(this).data('print-order');
    buildOrderReceiptHtml(id);
});

$(document).on('click', '[data-print-booking]', function(){
    const id = $(this).data('print-booking');
    buildBookingReceiptHtml(id);
});

/* ============================================================
   MENU ITEMS — view only
   ============================================================ */
function renderMenuItems(filter=''){
    const f = filter.toLowerCase();
    const rows = menuItems.filter(i => !f || i.foodItemName.toLowerCase().includes(f) || i.foodItemCategory.toLowerCase().includes(f));

    $('#menuItemsGrid').html(rows.map(i => `
      <div class="menu-card">
        <div class="menu-card-img">
            ${i.discountPercentage ? `<span class="discount-tag">-${i.discountPercentage}%</span>` : ''}
            <img src="${i.imagePath}" alt="${i.foodItemName}">
        </div>
        <div class="menu-card-body">
          <h4>${i.foodItemName}</h4>
          <div class="cat">${i.foodItemCategory}</div>
          <div class="menu-card-foot">
            ${i.discountPercentage ? `<span class="price-original">${money(i.price)}</span>` : ''}
            <span class="menu-price">${money(finalPrice(i))}</span>
          </div>
        </div>
      </div>
    `).join('') || `<p style="text-align:center;color:var(--espresso-soft);padding:40px;">No items match your search.</p>`);$('#navCountMenuItems').text(menuItems.length);
}

/* ============================================================
   PLACE ORDER (POS)
   ============================================================ */
let posCart = {}; // itemId -> qty
let posFulfillment = 'Dine-in';

function renderPosGrid(filter=''){
    const f = filter.toLowerCase();
    const rows = menuItems.filter(i => !f || i.foodItemName.toLowerCase().includes(f) || i.foodItemCategory.toLowerCase().includes(f));

    $('#posGrid').html(rows.map(i => `
      <div class="pos-card" data-item-id="${i.foodItemId}">
        <div class="pos-card-img">
            ${i.discountPercentage ? `<span class="discount-tag">-${i.discountPercentage}%</span>` : ''}
            <img src="${i.imagePath}" alt="${i.foodItemName}">
        </div>
        <div class="pos-card-body">
          <h4>${i.foodItemName}</h4>
          <div class="cat" style="font-size: 12px">${i.foodItemCategory}</div>
          <div class="pos-card-foot">
             ${i.discountPercentage ? `<span class="price-original">${money(i.price)}</span>` : ''}
             <span class="pos-price">${money(finalPrice(i))}</span>
          <span class="pos-add-icon">+</span></div>
        </div>
      </div>
    `).join('') || `<p style="text-align:center;color:var(--espresso-soft);padding:40px;">No items match your search.</p>`);
}

$('#posGrid').on('click', '.pos-card', function(){
    const id = Number($(this).data('item-id'));
    const item = menuItems.find(i => i.foodItemId === id);
    if(!item) return;
    posCart[id] = (posCart[id] || 0) + 1;
    console.log(posCart);
    renderPosCart();
});

$('#posFulfillToggle').on('click', 'button', function(){
    posFulfillment = $(this).data('fulfil');
    $('#posFulfillToggle button').removeClass('active');
    $(this).addClass('active');
});

function posSubtotal(){
    return Object.entries(posCart).reduce((sum,[id,qty]) => {
        const item = menuItems.find(i => i.foodItemId === Number(id));
        return sum + (item ? finalPrice(item) * qty : 0);
    }, 0);
}

function renderPosCart(){
    const ids = Object.keys(posCart);
    if(ids.length === 0){
        $('#posCartBody').html(`<div class="op-cart-empty">🥐 No items added yet.<br>Tap a menu item to add it.</div>`);
    } else {
        $('#posCartBody').html(ids.map(id => {
            const item = menuItems.find(i => i.foodItemId === Number(id));
            const qty = posCart[id];
            return `
        <div class="op-item" data-item-id="${id}">
          <div class="op-item-info">
            <h5>${item.foodItemName}</h5>
            <span>${money(item.price)} each</span>
          </div>
          <div class="op-qty">
            <button class="op-qminus" data-item-id="${id}">−</button>
            <span>${qty}</span>
            <button class="op-qplus" data-item-id="${id}">+</button>
          </div>
          <span class="op-remove" data-item-id="${id}">✕</span>
        </div>
      `;
        }).join(''));
    }
    const total = posSubtotal();
    $('#posTotal').text(money(total));
    $('#placeOrderBtn').prop('disabled', ids.length === 0);
}

$('#posCartBody').on('click', '.op-qplus', function(){
    const id = $(this).data('item-id');
    posCart[id] = (posCart[id] || 0) + 1;
    renderPosCart();
});
$('#posCartBody').on('click', '.op-qminus', function(){
    const id = $(this).data('item-id');
    posCart[id] = (posCart[id] || 0) - 1;
    if(posCart[id] <= 0) delete posCart[id];
    renderPosCart();
});
$('#posCartBody').on('click', '.op-remove', function(){
    const id = $(this).data('item-id');
    delete posCart[id];
    renderPosCart();
});

$('#placeOrderBtn').on('click', function(){
    const ids = Object.keys(posCart);
    if(ids.length === 0) return;

    const customerName = $('#posCustomerName').val().trim() || 'Walk-in Customer';
    const itemsSummary = ids.map(id => {
        const item = menuItems.find(i => i.id === Number(id));
        return `${posCart[id]}x ${item.name}`;
    }).join(', ');
    const total = posSubtotal();
    const newId = 'ORD-' + (nextOrderNum++);

    orders.unshift({
        id:newId,
        customer: customerName + ` (${posFulfillment})`,
        items: itemsSummary,
        total,
        status:'Pending',
        date:new Date().toISOString().split('T')[0],
    });

    const $btn = $(this);
    const $label = $('#placeOrderLabel');
    $label.text('Placing order...');
    setTimeout(() => {
        $btn.addClass('success');
        $label.text(`✓ Order ${newId} placed`);
        setTimeout(() => {
            $btn.removeClass('success');
            $label.text('Place Order');
            posCart = {};
            $('#posCustomerName').val('');
            renderPosCart();
            renderAll();
        }, 1400);
    }, 500);
});

/* ============================================================
   SEARCH + INIT
   ============================================================ */
function renderAll(){
    if(currentSection === 'orders') renderOrders($searchInput.val());
    else if(currentSection === 'bookings') renderBookings($searchInput.val());
    else if(currentSection === 'menuitems') renderMenuItems($searchInput.val());
    else if(currentSection === 'payments'){
        if(paymentsSubView === 'orders') renderPaymentsOrders(); else renderPaymentsBookings();
    }else if(currentSection === "placeorder"){
        renderPosGrid($searchInput.val());
        renderPosCart();
    }
    $('#navCountOrders').text(orders.length);
    $('#navCountBookings').text(bookings.length);
    $('#navCountMenuItems').text(menuItems.length);
    const unpaidCount = orders.filter(o => !o.paid && o.status !== 'Cancelled').length
        + bookings.filter(b => !b.paid && b.status !== 'Cancelled').length;
    $('#navCountPayments').text(unpaidCount);
}
$searchInput.on('input', function(){ renderAll(); });


// get all food items from backend
getAllFoodItems();

goToSection('placeorder');
