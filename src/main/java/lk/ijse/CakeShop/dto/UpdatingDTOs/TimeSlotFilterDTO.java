package lk.ijse.CakeShop.dto.UpdatingDTOs;

import lk.ijse.CakeShop.dto.BookingDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TimeSlotFilterDTO {

    private int setaCount;
    private List<BookingDTO> bookingDTOList;

}
