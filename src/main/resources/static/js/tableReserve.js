/* ============ STATE ============ */
let today = new Date();
today.setHours(0, 0, 0, 0);
let viewMonth = today.getMonth();
let viewYear = today.getFullYear();
let selectedDate = null; // Date object
let selectedSlot = null;
let partyCount = 1;
let selectedSeat = 1;
let selectedSeatPrice = 1;
let categorySeatCount = 0;
let maxSeatCount = 1;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dowNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const allSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
let unavailableSlots = [];
let slotsWithSeatCount = [];



/* ============ HELPERS ============ */
function showToast(msg){
    $('#toastMsg').text(msg);
    $('#toast').addClass('show');
    setTimeout(()=> $('#toast').removeClass('show'), 2200);
}

/* ============ CALENDAR ============ */
const $calGrid = $('#calGrid');
const $calMonthLabel = $('#calMonthLabel');
const $calPrev = $('#calPrev');
const $calNext = $('#calNext');
const $calSelectedLabel = $('#calSelectedLabel');

function renderCalendar() {
    $calMonthLabel.text(`${monthNames[viewMonth]} ${viewYear}`);
    $calGrid.empty();

    dowNames.forEach(d => {
        $('<div>', { class: 'cal-dow', text: d }).appendTo($calGrid);
    });

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        $('<div>', { class: 'cal-day empty' }).appendTo($calGrid);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const thisDate = new Date(viewYear, viewMonth, d);
        thisDate.setHours(0, 0, 0, 0);

        const $day = $('<div>', { class: 'cal-day', text: d });

        if (thisDate <= today) {
            $day.addClass('disabled');
            if (thisDate.getTime() === today.getTime()) $day.addClass('today');
        }
        else {
            if (selectedDate && thisDate.getTime() === selectedDate.getTime()) $day.addClass('selected');

            $day.on('click', () => {
                selectedDate = thisDate;
                renderCalendar();

                // filter time slots
                filterTimeSlots();
            });
        }
        $calGrid.append($day);
    }

    const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();
    $calPrev.prop('disabled', isCurrentMonth);

    $calSelectedLabel.text(
        selectedDate
            ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            : 'No date selected'
    );
}

$calPrev.on('click', () => {
    viewMonth--;
    if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
    }
    renderCalendar();
});

$calNext.on('click', () => {
    viewMonth++;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
    }
    renderCalendar();
});

/* ============ SEATING ============ */
const $seatGrid = $('#seatGrid');
let seatCategories = [];

function getTableCategories(){
    $.ajax({
        url:"http://localhost:8080/v1/tableCategory/getAllTableCategories",
        type: "GET",
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("JWT"),
        },
        success: function (r){
            if(r.status === 200){
                seatCategories = r.body;
                renderTableCategories();

            }else if(r.status === 401){
                showToast("Please Login to reserve a table");
                setTimeout(()=>{
                    window.location.href = "customerLogin.html";
                }, 1500);
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

function renderTableCategories(){
    let html = '';
    let activeState = '';

    seatCategories.map((tc, index)=>{
        if(index === 0){
            activeState = "active";
            selectedSeat = tc.tableCategoryId;
        }else{activeState = ""}
        html += `<div class="seat-card ${activeState}" data-seat=${tc.tableCategoryId}>
                    <span class="seat-title">${tc.tableCategoryName}</span>
                 </div>`;
    });
    $seatGrid.html(html);
    updateSummary();
}

$seatGrid.on('click', '.seat-card', function () {
    const $card = $(this);
    $seatGrid.find('.seat-card').removeClass('active');
    $card.addClass('active');
    selectedSeat = $card.data('seat');

    // filter time slots
    filterTimeSlots();

});


/* ============ Filter Time Slots ============ */
function filterTimeSlots(){

    let selectedCategory = '';
    seatCategories.map((tc) =>{
        if(tc.tableCategoryId === selectedSeat){
            selectedCategory = tc.tableCategoryName;
        }
    });

    let date = selectedDate ? selectedDate.toLocaleDateString('sv-SE') : "";

    const obj = { date : date, category : selectedCategory }

    $.ajax({
        url: "http://localhost:8080/v1/booking/getBookingsByDateAndCat",
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        data: obj,
        success: function (r){
            if(r.status === 200){
                renderTimeSlots(r.body);
            }
            else{
                showToast(r.message);
            }
        },
        error: function (r){
            r.message ? showToast(r.message) : showToast("UNEXPECTED ERROR");
        }
    });
}

function renderTimeSlots(details){
    // reset values
    partyCount = 1;
    $partyCount.text(partyCount);
    categorySeatCount = details.setaCount;
    selectedSlot = '';
    $slotSelectedLabel.text("No time selected");
    updateSummary();

    slotsWithSeatCount = allSlots.map(slot => {
        // Find all bookings matching this time slot and sum their seats
        const totalSeats = details.bookingDTOList
            .filter(booking => booking.bookingTime === slot)
            .reduce((sum, booking) => sum + booking.seatCount, 0);

        return {
            time: slot,
            seatCount: totalSeats
        };
    });

    // rerender slots --------------------
    unavailableSlots = [];

    slotsWithSeatCount.map((t)=>{
        if(t.seatCount >= categorySeatCount){
            unavailableSlots.push(t.time);
        }
    });

    renderSlots();
}

/* ============ TIME SLOTS ============ */
const $slotGrid = $('#slotGrid');
const $slotSelectedLabel = $('#slotSelectedLabel');

function renderSlots() {
    const slotsHtml = allSlots.map(s => {
        const unavailable = unavailableSlots.includes(s) ? 'unavailable' : '';
        const active = selectedSlot === s ? 'active' : '';
        return `<div class="slot ${unavailable} ${active}" data-slot="${s}">${s}</div>`;
    }).join('');

    $slotGrid.html(slotsHtml);
}

$slotGrid.on('click', '.slot', function () {
    const $slot = $(this);
    if ($slot.hasClass('unavailable')) return;

    selectedSlot = $slot.data('slot');
    renderSlots();
    $slotSelectedLabel.text(selectedSlot);

    slotsWithSeatCount.map(t=>{
        if(t.time === selectedSlot){
            maxSeatCount = categorySeatCount - t.seatCount;
        }
    });

    partyCount = 1;
    $partyCount.text(partyCount);
    updateSummary();
});

/* ============ PARTY STEPPER ============ */
const $partyCount = $('#partyCount');

$('#partyMinus').on('click', () => {
    partyCount = Math.max(1, partyCount - 1);
    $partyCount.text(partyCount);
    updateSummary();
});

$('#partyPlus').on('click', () => {
    partyCount = Math.min(maxSeatCount, partyCount + 1);
    $partyCount.text(partyCount);
    updateSummary();
});

/* ============ SUMMARY ============ */
function updateSummary() {
    const $sumDate = $('#sumDate');
    $sumDate
        .text(selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Not selected')
        .toggleClass('muted', !selectedDate);

    const $sumTime = $('#sumTime');
    $sumTime
        .text(selectedSlot || 'Not selected')
        .toggleClass('muted', !selectedSlot);

    $('#sumParty').text(`${partyCount} Guest${partyCount > 1 ? 's' : ''}`);

    let seatCategory = "";
    seatCategories.map((cat)=>{
        if(cat.tableCategoryId === selectedSeat){
            seatCategory = cat.tableCategoryName;
            selectedSeatPrice = cat.pricePerSeat;
        }
    })
    $('#sumSeat').text(seatCategory);

    const $sumTotal = $('#sumTotal');
    $sumTotal.text("Rs. " + (selectedSeatPrice * partyCount));
}


/* ============ CONFIRM RESERVATION ============ */
const $confirmBtn = $('#confirmBtn');

$confirmBtn.on('click', function (e) {
    const offset = $confirmBtn.offset();
    const width = $confirmBtn.outerWidth();
    const height = $confirmBtn.outerHeight();

    const $ripple = $('<span>', { class: 'ripple' });
    const size = Math.max(width, height);

    const clickX = e.clientX ? e.clientX - offset.left : width / 2;
    const clickY = e.clientY ? e.clientY - offset.top : height / 2;

    $ripple.css({
        width: size + 'px',
        height: size + 'px',
        left: (clickX - size / 2) + 'px',
        top: (clickY - size / 2) + 'px'
    });

    $confirmBtn.append($ripple);
    setTimeout(() => $ripple.remove(), 650);

    let valid = true;
    if (!selectedDate) { $calSelectedLabel.css('color', 'var(--error)'); valid = false; }
    if (!selectedSlot) { $slotSelectedLabel.css('color', 'var(--error)'); valid = false; }

    if (!valid) {
        if (!selectedDate || !selectedSlot) {
            $('html, body').animate({ scrollTop: $('#formCard').offset().top }, 'smooth');
        }
        return;
    }

    saveBooking();
});

function saveBooking(){
    let date = selectedDate.toLocaleDateString('sv-SE');
    let time = selectedSlot;
    let createdDate = new Date().toLocaleDateString('sv-SE');
    let userId = localStorage.getItem("UserID");
    let seatCount = partyCount;
    let category = '';
    seatCategories.map((tc)=>{
       if(tc.tableCategoryId === selectedSeat){
           category = tc.tableCategoryName;
       }
    });
    let total = selectedSeatPrice * partyCount;
    let note = $('#notes').val();

    const obj = {
        bookingId : 0,
        userId : userId,
        bookingCreatedDate : createdDate,
        bookingDate : date,
        bookingTime : time,
        seatCount : seatCount,
        tableType : category,
        total : total,
        bookingNote : note
    }

    $.ajax({
        url: "http://localhost:8080/v1/booking/saveBooking",
        type: "POST",
        contentType: 'application/json',
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("JWT"),
        },
        data: JSON.stringify(obj),
        success: function (r){

            if(r.status === 200){
                $confirmBtn.addClass('loading').prop('disabled', true);

                setTimeout(() => {
                    $confirmBtn.removeClass('loading').prop('disabled', false);
                    $('#summaryBody').hide();
                    const code = 'RT-' + r.body;
                    $('#confCode').text(code);
                    $('#successWrap').addClass('show');
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


/* ---- clear error highlight on interaction ---- */
$calGrid.on('click', () => { $calSelectedLabel.css('color', ''); });
$slotGrid.on('click', () => { $slotSelectedLabel.css('color', ''); });


/* ============ GET USER DETAILS ============ */
function getUserDetails(){
    $.ajax({
        url:"http://localhost:8080/v1/user/findUserById/" + Number(localStorage.getItem("UserID")),
        type: "GET",
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("JWT")
        },
        success: function (r){
            if(r.status === 200){
                let user = r.body;
                $('#fullname').val(user.userName);
                $('#email').val(user.userEmail);
                $('#phone').val(user.userContact);
            }
            else if(r.status === 401){
                showToast("Please Login to reserve a table");
                setTimeout(()=>{
                    window.location.href = "customerLogin.html";
                }, 1500);
            }
        },
        error: function (r){
            r.message ? alert(r.message) : alert("UNEXPECTED ERROR");
        }
    });
}
getUserDetails();


/* ============ INIT ============ */
$(function () {
    renderCalendar();
    renderSlots();
    getTableCategories();
    updateSummary();
});