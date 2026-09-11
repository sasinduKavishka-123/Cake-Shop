package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.ai.BakeryChatService;
import lk.ijse.CakeShop.dto.AiDTOs.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/v1/bakeryChat")
@RequiredArgsConstructor
public class ChatController {

    private final BakeryChatService bakeryChatService;

    @PostMapping(value = "/chat", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> chat(@RequestBody ChatRequest request){
        if(request.getMessage() == null || request.getMessage().isEmpty()){
            return Flux.just("Message cannot be empty.");
        }
        return bakeryChatService.generateResponse(request.getMessage());
    }

}
