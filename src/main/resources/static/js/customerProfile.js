const $profileScrim = $('#profileScrim');
const $editProfileModal = $('#editProfileModal');

//  HELPER FUNCTIONS ////////////////////////////

// make status name to normal (only first letter is uppercase)
function formatStatus(status) {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

// make order items list as a string
function parseOrderItems(list){
    let itemList = '';
    list.forEach((item, index) => {
        if (index === list.length - 1) {
            itemList += item.qty + " x " + item.foodItemName;
        } else {
            itemList += item.qty + " x " + item.foodItemName + ", ";
        }
    });
    return itemList;
}

// return value as money string
function money(n){ return 'Rs. ' + n.toLocaleString(); }

function showToast(msg){
    $('#toastMsg').text(msg);
    $('#toast').addClass('show');
    setTimeout(()=> $('#toast').removeClass('show'), 2200);
}

function openProfileModal(){
    $('#f_profileName').val($('#profileName').text().trim());
    $('#f_profileEmail').val($('#profileEmail').text().trim());
    $('#f_profilePhone').val($('#profilePhone').text().trim());
    $editProfileModal.addClass('show');
    $profileScrim.addClass('show');
}
function closeProfileModal(){
    $editProfileModal.removeClass('show');
    if(!$updateOrderModal.hasClass('show') && !$confirmCancelModal.hasClass('show')) $profileScrim.removeClass('show');
}

$('#editProfileBtn').on('click', openProfileModal);
$('#profileModalClose').on('click', closeProfileModal);
$('#profileModalCancel').on('click', closeProfileModal);
$profileScrim.on('click', closeProfileModal);
$(document).on('keydown', function(e){ if(e.key === 'Escape') closeProfileModal(); });

$('#profileModalSave').on('click', function(){
    const name = $('#f_profileName').val().trim();
    const email = $('#f_profileEmail').val().trim();
    const phone = $('#f_profilePhone').val().trim();

    if(!name || !email || !phone){
        $('#f_profileName').css('border-color', name ? '' : '#B3452E');
        $('#f_profileEmail').css('border-color', email ? '' : '#B3452E');
        $('#f_profilePhone').css('border-color', phone ? '' : '#B3452E');
        return;
    }
    $('#f_profileName, #f_profileEmail').css('border-color', '');

    $('#profileName').text(name);
    $('#profileEmail').text(email);
    $('#profilePhone').text(phone || '—');
    $('#profileAddress').text(address || '—');
    $('#profileAvatar').text(
        name.split(' ').map(w => w.charAt(0)).join('').slice(0,2).toUpperCase() || 'AR'
    );

    const $btn = $(this);
    const $label = $('#profileSaveLabel');
    const originalText = $label.text();
    $label.text('Saving...');
    setTimeout(() => {
        $btn.addClass('success');
        $label.text('✓ Saved');
        setTimeout(() => {
            $btn.removeClass('success');
            $label.text(originalText);
            closeProfileModal();
        }, 1000);
    }, 500);
});

/* ============================================================
   ALL ORDERS — view full history, update notes, cancel orders
   ============================================================ */
let customerOrders = [
    {id:'ORD-2041', date:'2026-08-11', items:'2x Butter Croissant, 1x Rose Cake', total:4100, status:'Pending', note:''},
    {id:'ORD-2038', date:'2026-08-05', items:'1x Berry Tart, 2x Latte', total:2190, status:'Preparing', note:''},
    {id:'ORD-2030', date:'2026-07-29', items:'6x Macaron Box', total:1150, status:'Ready', note:'Please add a candle'},
    {id:'ORD-2021', date:'2026-07-18', items:'1x Rose Vanilla Cake', total:3200, status:'Delivered', note:''},
    {id:'ORD-2015', date:'2026-07-02', items:'3x Croissant, 1x Orange Juice', total:1830, status:'Delivered', note:''},
    {id:'ORD-2002', date:'2026-06-20', items:'1x Chocolate Torte', total:1350, status:'Cancelled', note:''},
];

function orderStatusClass(status){
    return {Pending:'badge-pending', Preparing:'badge-preparing', Ready:'badge-ready', Done:'badge-delivered', Cancelled:'badge-cancelled'}[status] || 'badge-pending';
}
/* only orders that haven't shipped yet can be updated or cancelled by the customer */
function isOrderEditable(status){
    return status === 'Pending' || status === 'Preparing';
}

/* ============================================================
                            LOG OUT
   ============================================================ */
$('#signOutBtn').on('click', function (){
    localStorage.removeItem("JWT");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    setTimeout(()=>{
        window.location.href = "customerLogin.html";
    }, 500);
});


/* ============================================================
                        FILL USER DATA
   ============================================================ */
function getUserDetails(){
    const userId = localStorage.getItem("UserID");

    $.ajax({
        url: "http://localhost:8080/v1/user/findUserById/" + userId,
        type: "GET",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        success: function (r){
            if(r.status === 200){
                const user = r.body;
                $('#profileName').text(user.userName);
                $('#userNameTitle').text(user.userName);
                $('#profileAvatar').text(user.userName.charAt(0).toUpperCase());
                $('#profileEmail').text(user.userEmail);
                $('#profilePhone').text(user.userContact);
                $('#profileStatus').text(user.userStatus);
                $('#editProfileBtn').val(userId);
            }
            else{
                showToast(r.message());
            }
        }
    });
}


function renderAllOrders(){
    const userId = localStorage.getItem("UserID");

    if(!userId){
        showToast("Please Login First");
        setTimeout(()=>{
            window.location.href = 'customerLogin.html';
        }, 1000);
        return;
    }

    $.ajax({
        url: "http://localhost:8080/v1/order/getAllOrdersByUserId/" + userId,
        type: "GET",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        success: function (r){
            if(r.status === 200) {
                const orders = r.body;
                // set all orders ----------------
                $('#allOrdersBody').html(orders.map(o => {
                    const status = formatStatus(o.orderStatus);
                    const items = parseOrderItems(o.orderItems);
                    return `
                    <tr>
                      <td class="cell-title">${o.orderId}</td>
                      <td>${o.orderDate}</td>
                      <td>${o.timeSlot}</td>
                      <td><span class="cell-sub">${items}</span></td>
                      <td class="cell-title">Rs. ${o.total.toLocaleString()}</td>
                      <td><span class="badge-pill ${orderStatusClass(status)}">${status}</span></td>
                      <td>
                        <button class="icon-btn" data-order-id="${o.orderId}" aria-label="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                      </td>
                    </tr>
                    `
                }).join(''));

                // set latest orders ----------------
                const latestList = r.body.slice(0, 3);
                $('#recentOrderList').html(latestList.map(o => {
                    const items = parseOrderItems(o.orderItems);
                    const date = new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(o.orderDate + 'T00:00:00'));

                    return `<li><span>${items}</span><span class="ro-date">${date}</span></li>`;
                }).join(''));

            } else if (r.status === 401) {
                showToast("Please Login First");
                setTimeout(()=>{
                    window.location.href = 'customerLogin.html';
                }, 1000);
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

let activeOrderId = null;
const $orderScrim = $('#profileScrim'); // reuse the same scrim as the Edit Profile modal
const $updateOrderModal = $('#updateOrderModal');
const $confirmCancelModal = $('#confirmCancelModal');

function openUpdateModal(order){

    const items = order.orderItems.map(it =>
        `<tr>
               <td>${it.foodItemName}</td>
               <td>${it.qty}</td>
               <td>${it.price}</td>
               <td>${it.discount}</td>
               <td>${it.finalPrice}</td>
           </tr>`
    ).join('');

    const html = `<div class="field-group"><label>${order.user.userRoles} Name</label><input disabled type="text" id="f_customer" value="${order.user.userName}" placeholder="Customer name"></div>
       <div class="field-row-2">
           <div class="field-group">
               <label>Contact</label> <input disabled type="text" id="f_customer_contact" value="${order.user.userContact}" placeholder="contact">
           </div>
           <div class="field-group">
               <label>Email</label> <input disabled type="text" id="f_customer_email" value="${order.user.userEmail}" placeholder="email" min="1">
           </div>
       </div>

       <div class="field-row-2">
           <div class="field-group"><label>Date</label><input disabled type="date" id="f_date" value="${order.orderDate}"></div>
           <div class="field-group"><label>Pick Up Time</label><input disabled type="text" id="f_date" value="${order.timeSlot}"></div>
       </div>

       <div class="field-group">
           <label>Order Items</label>
           <div class="restock-table-wrap">
               <table class="restock-table">
                   <thead><tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Discount</th><th>Final Price</th></tr></thead>
                   <tbody id="orderItemsBody"> ${items} </tbody>
               </table>
           </div>
       </div>

       <div class="field-group"> <lable>Order Note</lable> <input disabled type="text" id="f_note" value="${order.orderNote}" placeholder="Order Note"> </div>

       <div class="field-row-2">
           <div class="field-group"><label>Sub Total (Rs.)</label><input disabled type="text" value="${money(order.subTotal)}"></div>
           <div class="field-group"><label>Discount (Rs.)</label><input disabled type="text"  value="${money(order.discount)}"></div>
       </div>

       <div class="field-row-2">
           <div class="field-group"><label>Total (Rs.)</label><input disabled type="text"  value="${money(order.total)}" ></div>
           <div class="field-group"><label>Status</label><input disabled type="text" value="${formatStatus(order.orderStatus)}" ></div>
       </div>
        `;

    $('#updateModalBody').html(html);
    $updateOrderModal.addClass('show');
    $orderScrim.addClass('show');

    $('#cancelOrderBtn').toggle(isOrderEditable(formatStatus(order.orderStatus)));
}

function closeUpdateModal(){
    $updateOrderModal.removeClass('show');
    if(!$confirmCancelModal.hasClass('show') && !$editProfileModal.hasClass('show')) $orderScrim.removeClass('show');
}
function closeConfirmCancel(){
    $confirmCancelModal.removeClass('show');
    if(!$updateOrderModal.hasClass('show') && !$editProfileModal.hasClass('show')) $orderScrim.removeClass('show');
}

$(document).on('click', '.icon-btn', function(){

    activeOrderId = $(this).data('order-id');

    $.ajax({
        url: "http://localhost:8080/v1/order/getOrderFormDetail/" +  activeOrderId,
        type: "GET",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        success: function (r){
            if(r.status === 200){
                openUpdateModal(r.body);
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) :alert("UNEXPECTED ERROR");
        }
    });
});

$('#orderModalClose').on('click', closeUpdateModal);
$orderScrim.on('click', function(){ closeUpdateModal(); closeConfirmCancel(); });
$(document).on('keydown', function(e){ if(e.key === 'Escape'){ closeUpdateModal(); closeConfirmCancel(); } });

$('#saveOrderUpdateBtn').on('click', function(){
    const order = customerOrders.find(o => o.id === activeOrderId);
    if(!order) return;
    order.note = $('#f_orderNote').val().trim();
    renderAllOrders();

    const $btn = $(this);
    const original = $btn.text();
    $btn.text('✓ Saved');
    setTimeout(() => {
        $btn.text(original);
        closeUpdateModal();
    }, 900);
});

$('#cancelOrderBtn').on('click', function(){
    $('#confirmCancelOrderId').text(activeOrderId);
    $confirmCancelModal.addClass('show');
});
$('#confirmCancelBack').on('click', closeConfirmCancel);
$('#confirmCancelYes').on('click', function(){

    const obj = {
        order_id : activeOrderId,
        order_status : 'CANCELLED'
    };

    $.ajax({
        url: "http://localhost:8080/v1/order/updateOrderStatus",
        type: "PATCH",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        data: obj,
        success: function (r){
            if(r.status === 200){
                showToast("Order Canceled 😭");
                renderAllOrders();
                closeConfirmCancel();
                closeUpdateModal();
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
        }
    });

});

renderAllOrders();

// fill user data
getUserDetails();




