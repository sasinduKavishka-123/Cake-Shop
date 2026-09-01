package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.BookingDetailDTO;
import lk.ijse.CakeShop.dto.ReservableTableDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingFormDTO;
import lk.ijse.CakeShop.dto.printDTOs.BookingPrintDTO;
import lk.ijse.CakeShop.entity.Booking;
import lk.ijse.CakeShop.entity.BookingDetail;
import lk.ijse.CakeShop.entity.ReservableTable;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.BookingDetailRepository;
import lk.ijse.CakeShop.repository.BookingRepository;
import lk.ijse.CakeShop.repository.ReservableTableRepository;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final UserRepository userRepository;
    private final ReservableTableRepository reservableTableRepository;

    @Override
    public void saveBooking(BookingDTO bookingDTO) {
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

        // setting booking status to pending when creating it
        booking.setBookingStatus(BookingStatus.PENDING);

        bookingRepository.save(booking);
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

        return bookingPrintDTO;
    }
}
