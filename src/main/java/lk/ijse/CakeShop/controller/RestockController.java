package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.RestockDTO;
import lk.ijse.CakeShop.service.RestockService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/restock")
@AllArgsConstructor
public class RestockController {

    private final RestockService restockService;

    @PostMapping(value = "/saveRestock", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveRestock(@RequestBody RestockDTO restockDTO){
        restockService.saveRestock(restockDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

}
