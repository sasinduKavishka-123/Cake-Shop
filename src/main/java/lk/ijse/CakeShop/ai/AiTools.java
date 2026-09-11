package lk.ijse.CakeShop.ai;

import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.dto.TableCategoryDTO;
import lk.ijse.CakeShop.repository.FoodItemRepository;
import lk.ijse.CakeShop.repository.TableCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiTools {

    private final FoodItemRepository foodItemRepository;
    private final TableCategoryRepository tableCategoryRepository;

    @Tool(description = "Search for food items by name or keyword to get details like price, description category or badges.")
    @Transactional(readOnly = true)
    public List<FoodItemDTO> getFoodItems(String query) {
        log.info("Executing method getFooItems");

        return foodItemRepository.findByFoodItemNameContainingIgnoreCase(query)
                .stream()
                .map(item -> new FoodItemDTO(
                        item.getFoodItemName(),
                        item.getPrice(),
                        item.getDescription(),
                        item.getFoodItemCategory().getCategoryName(),
                        item.getBadges()
                ))
                .toList();
    }

    @Tool(description = "Search for tables by table category and price per seat")
    @Transactional(readOnly = true)
    public List<TableCategoryDTO> getTableDetails(String query){
        log.info("Executing method getTableDetails");

        return tableCategoryRepository.findByTableCategoryNameContainingIgnoreCase(query)
                .stream()
                .map(t -> new TableCategoryDTO(
                        t.getTableCategoryId(),
                        t.getTableCategoryName(),
                        t.getPricePerSeat()
                ))
                .toList();
    }
}
