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

/* *****************************************************
                    UPDATE PROFILE
 ***************************************************** */

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

function validatePhoneNumber(phoneNumber) {
    // Remove whitespace, hyphens, and parentheses
    const cleaned = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');

    if(cleaned === ''){ return false; }
    // Strictly enforces length:
    // - Mobile: 07X XXX XXXX (10 digits) OR +947X XXX XXXX (11 digits after +)
    // - Landline: 0XX XXX XXXX (10 digits) OR +94XX XXX XXXX
    const slRegex = /^(?:(?:\+|00)?94|0)?(?:7[0-2,4-8]\d{7}|(?:11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)\d{7})$/;

    let ok = slRegex.test(cleaned);
    return ok;
}

function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

$('#profileModalSave').on('click', function(){
    const name = $('#f_profileName').val().trim();
    const email = $('#f_profileEmail').val().trim();
    let phone = $('#f_profilePhone').val().trim();

    let phoneOk = validatePhoneNumber(phone);
    let emailOk = validEmail(email);

    let nameOk = true;
    if(!name || name.length < 2){ nameOk = false; }

    if(!nameOk || !emailOk || !phoneOk){
        $('#f_profileName').css('border-color', nameOk ? '' : '#B3452E');
        $('#f_profileEmail').css('border-color', emailOk ? '' : '#B3452E');
        $('#f_profilePhone').css('border-color', phoneOk ? '' : '#B3452E');
        return;
    }
    $('#f_profileName, #f_profileEmail, #f_profilePhone').css('border-color', '');

    phone = formatPhoneNumber(phone);

    const obj = {
        userId : localStorage.getItem("UserID"),
        userName : name,
        userEmail : email,
        userContact : phone
    }

    $.ajax({
        url : "http://localhost:8080/v1/user/updateCustomerDetails",
        type : "PATCH",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        contentType : "application/json",
        data: JSON.stringify(obj),
        success: function (r){
            if(r.status === 200){
                showToast("Profile Updated Successfully");
                const u = r.body[0];

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

                    $('#profileName').text(u.userName);
                    $('#profileEmail').text(u.userEmail);
                    $('#profilePhone').text(u.userContact);
                    $('#userNameTitle').text(u.userName.split(' ')[0]);
                    $('#profileAvatar').text(
                        u.userName.split(' ').map(w => w.charAt(0)).join('').slice(0,2).toUpperCase()
                    );
                }, 500);

                setLocalStorageDetails(u.userId, u.userName, r.body[1]);
            }
            else if(r.status === 401){
                showToast("Please Login First");
                setTimeout(()=>{
                    window.location.href = "customerLogin.html";
                }, 1000);
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("Unexpected Error");
        }
    });
});

function setLocalStorageDetails(id, name, token){
    localStorage.removeItem("JWT");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");

    localStorage.setItem("JWT", token);
    localStorage.setItem("UserID", id);
    localStorage.setItem("UserName", name);
}


/* ============================================================
     MY TABLE BOOKINGS — view only
     ============================================================ */
function renderMyBookings(){

    $.ajax({
        url: "http://localhost:8080/v1/booking/getAllBookingsByUserId/" + localStorage.getItem("UserID"),
        type:"GET",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("JWT")},
        success: function (r){
            if(r.status === 200){

                $('#myBookingsBody').html((r.body).map(b => `
                  <tr>
                    <td class="cell-title">${b.bookingId}</td>
                    <td>${b.bookingDate}</td>
                    <td>${b.bookingTime}</td>
                    <td>${b.seatCount}</td>
                    <td>${b.tableType}</td>
                    <td><span class="badge-pill ${orderStatusClass(formatStatus(b.bookingStatus))}">${formatStatus(b.bookingStatus)}</span></td>
                  </tr>
                `).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--espresso-soft);">No table bookings yet.</td></tr>`);
            }
            else{
                showToast(r.message);
            }
        }
    });
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
                $('#userNameTitle').text(user.userName.split(' ')[0]);
                $('#profileAvatar').text(
                    user.userName.split(' ').map(w => w.charAt(0)).join('').slice(0,2).toUpperCase()
                );
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


/* ============================================================
   ALL ORDERS — view full history, update notes, cancel orders
   ============================================================ */
let totalSpent = 0;
let orderCount = 0;
const $orderCount = $("#orderCount");
const $totalSpent = $("#totalSpent");
const $favoriteItem = $("#favoriteItem");

function orderStatusClass(status){
    return {
        Pending:'badge-pending', Preparing:'badge-preparing',
        Ready:'badge-ready', Done:'badge-delivered', Cancelled:'badge-cancelled',
        Confirmed:'badge-confirmed', Completed:'badge-completed'
    }[status] || 'badge-pending';
}
/* only orders that haven't shipped yet can be updated or cancelled by the customer */
function isOrderEditable(status){
    return status === 'Pending' || status === 'Preparing';
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
                totalSpent = 0;
                orderCount = 0;
                const map = {};

                // set all orders ----------------
                $('#allOrdersBody').html(orders.map(o => {

                    const status = formatStatus(o.orderStatus);

                    if(status === 'Done'){
                        totalSpent += o.total;
                    }
                    orderCount++;

                    (o.orderItems).forEach(it => {
                        map[it.foodItemName] = (map[it.foodItemName] || 0) + it.qty;
                    });

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

                // set profile statuses
                $orderCount.text(orderCount);
                $totalSpent.text(money(totalSpent));
                const [maxItem] = Object.entries(map).reduce((max, current) =>
                    current[1] > max[1] ? current : max
                );
                $favoriteItem.text(maxItem);

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

/* ********************************************
            GET ORDER DETAIL FORM
 ******************************************** */
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



/* ********************************************
                CANCEL ORDER
 ******************************************** */
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
renderMyBookings();

// fill user data
getUserDetails();




