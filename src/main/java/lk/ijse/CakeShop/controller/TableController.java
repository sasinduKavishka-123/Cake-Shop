package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.ReservableTableDTO;
import lk.ijse.CakeShop.service.TableService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/table")
@AllArgsConstructor
public class TableController {

    private final TableService tableService;

    @PostMapping(value = "saveTable", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveTable(@RequestBody ReservableTableDTO reservableTableDTO){
        tableService.saveTable(reservableTableDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

}
