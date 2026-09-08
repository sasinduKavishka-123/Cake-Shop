package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.*;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.TimeSlotFilterDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingFormDTO;
import lk.ijse.CakeShop.dto.printDTOs.BookingPrintDTO;
import lk.ijse.CakeShop.entity.*;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.*;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final UserRepository userRepository;
    private final ReservableTableRepository reservableTableRepository;
    private final TablePaymentRepository tablePaymentRepository;

    @Override
    public long saveBooking(BookingDTO bookingDTO) {
        log.info("Executing Method saveBooking()");

        if(bookingDTO.getBookingDate() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking date");
        }
        if(bookingDTO.getBookingTime() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking time");
        }
        if(bookingDTO.getBookingCreatedDate() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking created time");
        }
        if(bookingDTO.getTableType() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid table type");
        }
        if(bookingDTO.getSeatCount() < 1){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid seat count");
        }
        if(bookingDTO.getTotal().doubleValue() < 0){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid price");
        }
        if(bookingDTO.getUserId() < 1){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid User ID");
        }
        if(bookingDTO.getBookingNote() == null || bookingDTO.getBookingNote().isEmpty()){
            bookingDTO.setBookingNote("None");
        }

        Optional<User> optionalUser = userRepository.findById(bookingDTO.getUserId());
        if(optionalUser.isEmpty()){
            log.error("Error in Method saveBooking()");
            throw new CustomException(404, "User Not Found");
        }
        User user = optionalUser.get();

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setBookingTime(bookingDTO.getBookingTime());
        booking.setBookingCreatedDate(bookingDTO.getBookingCreatedDate());
        booking.setSeatCount(bookingDTO.getSeatCount());
        booking.setTotal(bookingDTO.getTotal());
        booking.setTableType(bookingDTO.getTableType());
        booking.setBookingNote(bookingDTO.getBookingNote());

        // setting booking status to pending when creating it
        booking.setBookingStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);
        return savedBooking.getBookingId();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addBookingDetails(AddBookingDetailDTO bookingDTO) {
        log.info("Executing Method addBookingDetails()");

        if(bookingDTO.getBookingId() < 1){
            log.error("Error in Method addBookingDetails()");
            throw new CustomException(402, "Invalid Booking ID");
        }

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingDTO.getBookingId());
        if(optionalBooking.isEmpty()){
            log.error("Error in Method addBookingDetails()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking booking = optionalBooking.get();

        if( ! bookingDTO.getBookingStatus().equals(BookingStatus.CANCELLED)){

            if(bookingDTO.getBookingDetailDTOS().isEmpty()){
                log.error("Error in Method addBookingDetails()");
                throw new CustomException(402, "Invalid Booking Details");
            }

            // Delete Current booking details
            bookingDetailRepository.deleteCurrentBookingDetails(booking.getBookingId());

            for(BookingDetailFormDTO bd : bookingDTO.getBookingDetailDTOS()){
                BookingDetail b = new BookingDetail();
                b.setBooking(booking);
                b.setQyt(bd.getSeatCount());
                // get table ----------
                Optional<ReservableTable> tableOptional = reservableTableRepository.findById(bd.getTableID());
                if(tableOptional.isEmpty()){
                    log.error("Error in Method addBookingDetails()");
                    throw new CustomException(404, "Table Not Found");
                }
                ReservableTable table = tableOptional.get();
                b.setReservableTable(table);

                bookingDetailRepository.save(b);
            }
        }

        booking.setBookingStatus(bookingDTO.getBookingStatus());
        bookingRepository.save(booking);
    }

    @Override
    public void updateBookingStatus(long bookingId, BookingStatus bookingStatus) {
        log.info("Executing Method updateBookingStatus()");

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if(optionalBooking.isEmpty()){
            log.error("Error in Method updateBookingStatus()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking booking = optionalBooking.get();

        booking.setBookingStatus(bookingStatus);
        bookingRepository.save(booking);

    }

    @Override
    public List<BookingDTO> filterBooking(String bookingId, String userName, String date, Set<String> statuses) {
        log.info("Executing Method filterBooking()");

        String[] statusArr = null;
        if(statuses != null){
            statusArr = statuses.toArray(String[]::new);
        }

        List<Booking> bookingList = bookingRepository.filterBookings(bookingId, userName, date, statusArr);
        List<BookingDTO> bookingDTOList = new ArrayList<>();

        for(Booking b : bookingList){
            BookingDTO bd = new BookingDTO();
            bd.setBookingId(b.getBookingId());
            bd.setBookingStatus(b.getBookingStatus());
            bd.setBookingTime(b.getBookingTime());
            bd.setBookingDate(b.getBookingDate());
            bd.setTotal(b.getTotal());
            bd.setTableType(b.getTableType());
            bd.setSeatCount(b.getSeatCount());
            bd.setUserName(b.getUser().getUserName());
            bookingDTOList.add(bd);
        }
        return bookingDTOList;
    }

    @Override
    public BookingFormDTO getBookingFormData(long bookingId) {
        log.info("Executing Method getBookingFortData()");

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if(optionalBooking.isEmpty()){
            log.error("Error in Method getBookingFortData()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking b = optionalBooking.get();
        BookingFormDTO bookingFormDTO = new BookingFormDTO();

        bookingFormDTO.setBookingId(b.getBookingId());
        bookingFormDTO.setUserName(b.getUser().getUserName());
        bookingFormDTO.setContact(b.getUser().getUserContact());
        bookingFormDTO.setEmail(b.getUser().getUserEmail());
        bookingFormDTO.setBookingCreatedDate(b.getBookingCreatedDate());
        bookingFormDTO.setBookingDate(b.getBookingDate());
        bookingFormDTO.setTime(b.getBookingTime());
        bookingFormDTO.setSeatCount(b.getSeatCount());
        bookingFormDTO.setTableCategory(b.getTableType());
        bookingFormDTO.setStatus(b.getBookingStatus());
        bookingFormDTO.setTotal(b.getTotal());
        bookingFormDTO.setBookingNote(b.getBookingNote());

        // get booking details
        List<BookingDetailFormDTO> bookingDetailsDTOs = bookingDetailRepository.getBookingDetailsByBookingId(bookingId);
        bookingFormDTO.setBookingDetailDTOS(bookingDetailsDTOs);

        // get tables that in same category
        List<ReservableTableDTO> tableDTOList = reservableTableRepository.getTablesByCategory(b.getTableType());
        bookingFormDTO.setTableDTOList(tableDTOList);

        return bookingFormDTO;
    }

    @Override
    public BookingPrintDTO getBookingById(long bookingId) {
        log.info("Executing Method getBookingById()");

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if(optionalBooking.isEmpty()){
            log.error("Error in Method getBookingById()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking b = optionalBooking.get();

        BookingPrintDTO bookingPrintDTO = new BookingPrintDTO();
        bookingPrintDTO.setBookingId(b.getBookingId());
        bookingPrintDTO.setBookingCreatedDate(b.getBookingCreatedDate());
        bookingPrintDTO.setBookingDate(b.getBookingDate());
        bookingPrintDTO.setBookingTime(b.getBookingTime());
        bookingPrintDTO.setTableType(b.getTableType());
        bookingPrintDTO.setSeatCount(b.getSeatCount());
        bookingPrintDTO.setTotal(b.getTotal());
        bookingPrintDTO.setBookingNote(b.getBookingNote());
        bookingPrintDTO.setBookingStatus(b.getBookingStatus());

        // get User details
        UserDTO user = new UserDTO();
        user.setUserRoles(b.getUser().getUserRoles());
        user.setUserName(b.getUser().getUserName());
        user.setUserContact(b.getUser().getUserContact());
        user.setUserEmail(b.getUser().getUserEmail());
        bookingPrintDTO.setUser(user);

        // get Booking Details
        List<BookingDetailFormDTO> bookingDetailList = new ArrayList<>();
        for(BookingDetail bd : b.getBookingDetails()){
            BookingDetailFormDTO dto = new BookingDetailFormDTO();
            dto.setSeatCount(bd.getReservableTable().getSeatCount());
            dto.setTableID(bd.getReservableTable().getTableId());
            dto.setTableCategory(bd.getReservableTable().getTableCategory().getTableCategoryName());
            bookingDetailList.add(dto);
        }
        bookingPrintDTO.setBookingDetailList(bookingDetailList);

        // get booking payments ///////////////
        TablePaymentDTO tablePaymentDTO = new TablePaymentDTO();
        if(b.getTablePayment() == null){
            tablePaymentDTO = null;
        }else{
            tablePaymentDTO.setDueAmount(b.getTablePayment().getDueAmount());
            tablePaymentDTO.setPayAmount(b.getTablePayment().getPayAmount());
            tablePaymentDTO.setPayType(b.getTablePayment().getPayType());
            tablePaymentDTO.setPayDate(b.getTablePayment().getPayDate());
        }
        bookingPrintDTO.setTablePaymentDTO(tablePaymentDTO);

        return bookingPrintDTO;
    }

    @Override
    public int getBookingCount() {
        log.info("Executing getBookingCount()");

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(7); // 7 days from today

        return bookingRepository.getBookingCount(startDate, endDate);
    }

    @Override
    public List<BookingDTO> getThisWeekBookings() {
        log.info("Executing Method getThisWeekBookings()");

        LocalDate today = LocalDate.now();
        LocalDate endDate = today.plusDays(7);
        List<Booking> thisWekBookings = bookingRepository.getThisWekBookings(today, endDate);
        List<BookingDTO> bookingDTOS = new ArrayList<>();

        for(Booking b : thisWekBookings){
            BookingDTO dto = new BookingDTO();
            dto.setBookingId(b.getBookingId());
            dto.setUserName(b.getUser().getUserName());
            dto.setBookingDate(b.getBookingDate());
            dto.setBookingTime(b.getBookingTime());
            dto.setBookingStatus(b.getBookingStatus());

            bookingDTOS.add(dto);
        }

        return bookingDTOS;
    }

    @Override
    public TimeSlotFilterDTO getBookingsByDateAndCat(LocalDate bookingDate, String category) {
        log.info("Executing Method getBookingsByDateAndCat()");

        if(bookingDate == null){
            log.error("Error in Method getBookingsByDateAndCat");
            throw new CustomException(402, "Select a Date");
        }

        // get booking details
        List<BookingDTO> dtos = bookingRepository.findBookingsByDateAndCat(bookingDate, category);

        // get table count
        int tableCount = reservableTableRepository.getTableSeatCountByCatName(category);

        TimeSlotFilterDTO timeSlotFilterDTO = new TimeSlotFilterDTO();
        timeSlotFilterDTO.setBookingDTOList(dtos);
        timeSlotFilterDTO.setSetaCount(tableCount);

        return timeSlotFilterDTO;
    }

    @Override
    public void addPaymentDetails(long id, BookingStatus status, BookingPaymentDTO paymentDTO) {
        log.info("Executing Method addPaymentDetails()");
        if(paymentDTO == null ||
        paymentDTO.getPayAmount().doubleValue() < 0 ||
        paymentDTO.getDueAmount().doubleValue() < 0){
            log.error("Error in Method addPaymentDetails()");
            throw new CustomException(402, "Invalid payment details");
        }

        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if(optionalBooking.isEmpty()){
            log.error("Error in Method addPaymentDetails()");
            throw new CustomException(404, "Booking not Found");
        }
        Booking booking = optionalBooking.get();
        booking.setBookingStatus(status);

        TablePayment payment = new TablePayment();
        payment.setPayType(paymentDTO.getPayType());
        payment.setPayAmount(paymentDTO.getPayAmount());
        payment.setDueAmount(paymentDTO.getDueAmount());
        payment.setPayDate(paymentDTO.getPayDate());
        payment.setBooking(booking);

        booking.setTablePayment(payment);

        tablePaymentRepository.save(payment);
        bookingRepository.save(booking);
    }

}
