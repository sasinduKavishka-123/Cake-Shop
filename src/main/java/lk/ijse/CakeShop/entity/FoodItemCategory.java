package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class FoodItemCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;
    private String categoryName;

    @OneToMany(mappedBy = "foodItemCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FoodItem> foodItem = new ArrayList<>();

}
