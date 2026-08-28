package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.ReservableTableDTO;
import lk.ijse.CakeShop.service.TableService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.beans.MethodDescriptor;
import java.util.List;
import java.util.Set;

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

    @GetMapping(value = "filterTables", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterTables(
            @RequestParam(value = "table_category", required = false) String tableCategory,
            @RequestParam(value = "table_statuses", required = false) Set<String> statuses
    ){
        List<ReservableTableDTO> tableDTOList = tableService.filterTables(tableCategory, statuses);
        return new CommonResponse(200, tableDTOList, SUCCESS_MESSAGE);
    }

}
