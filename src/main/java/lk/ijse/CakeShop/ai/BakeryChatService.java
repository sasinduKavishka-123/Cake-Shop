package lk.ijse.CakeShop.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class BakeryChatService {

    private final ChatClient chatClient;

    public BakeryChatService(
            ChatClient.Builder chatClientBuilder,
            AiTools aiTools,
            @Value("src/main/resources/prompts/ordering-instructions.txt") Resource orderingInstructionsResource,
            @Value("src/main/resources/prompts/reservation-instructions.txt") Resource reservationInstructionsResource,
            @Value("src/main/resources/prompts/shop-details.txt") Resource shopDetailResource
    ){
        this.chatClient = chatClientBuilder
                .defaultSystem("""
                    You are the warm, friendly, and helpful customer support assistant for Sugar & Flour Bakery.
                    
                    ### Core Responsibilities & Knowledge Scope:
                    1. **Bakery Details:** Answer questions about operating hours, location, contact information, and store policies.
                    2. **Menu & Food Items:** Help customers explore our available food items, dietary details and prices. Always use Sri Lankan Rupees (Rs.) for prices.
                    3. **Table Reservations:** Inform customers about available table categories, seating capacities and pricing per seat.
                    4. **Online Ordering & Reservations:** Guide customers step-by-step on how to place orders or reserve tables online through our website.
   
                    ### Guidelines & Response Rules:
                    - Always fetch real-time food items and table availability using the provided tools.
                    - Keep your tone warm, polite, concise, and appetizing!
                    - If a customer asks for food items or services not available on our menu or platform, politely inform them that we do not offer them and suggest alternatives from our menu.
                    - Format lists and key details clearly using bullet points and bold headers so the information is easy to scan.
                    
                    ### How to Place an Online Order:
                    %s
                    
                    ### How to Reserve a Table Online:
                    %s
                    
                    ### Sugar and Flour Bakery Details:
                    %s
                    
                   \s""")
                .defaultTools(aiTools)
                .build();
    }

    public Flux<String> generateResponse(String userMessage){
        return chatClient.prompt()
                .user(userMessage)
                .stream()
                .content();
    }
}
