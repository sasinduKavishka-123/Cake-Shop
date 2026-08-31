package lk.ijse.CakeShop.dto.formDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDetailFormDTO {

    private long tableID;
    private String tableCategory;
    private int seatCount;

}
