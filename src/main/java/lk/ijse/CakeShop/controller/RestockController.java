package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.RestockDTO;
import lk.ijse.CakeShop.dto.formDTOs.RestockFormDTO;
import lk.ijse.CakeShop.service.RestockService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(value = "/getRestockFormData/{restock_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getRestockFormData(@PathVariable long restock_id){
        RestockFormDTO formDTO =  restockService.getRestockFormData(restock_id);
        return new CommonResponse(200, formDTO, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/filterRestock", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterRestock(
            @RequestParam(value = "restock_id") String restockId,
            @RequestParam(value = "supplier_name") String supplierName
    ){
        List<RestockDTO> responseList = restockService.filterRestock(restockId, supplierName);
        return new CommonResponse(200, responseList, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getRestockCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getRestockCount(){
        return new CommonResponse(200, restockService.getRestockCountForThisMonth(), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getRestockById/{restock_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getRestockById(@PathVariable long restock_id){
        return new CommonResponse(200, restockService.getRestockById(restock_id), SUCCESS_MESSAGE);
    }
}
