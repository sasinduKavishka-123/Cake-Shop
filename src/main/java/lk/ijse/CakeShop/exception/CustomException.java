package lk.ijse.CakeShop.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomException extends RuntimeException{

    private int status;
    private String message;
    
}