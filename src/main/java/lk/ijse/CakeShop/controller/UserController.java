package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.dto.UserDetailDTO;
import lk.ijse.CakeShop.security.JwtUtil;
import lk.ijse.CakeShop.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "v1/test")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping(value = "/saveUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveUser(@RequestBody UserDTO userDTO) {
        userService.saveUser(userDTO);
        return new CommonResponse(200, "UserSaved!");
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse login(@RequestBody UserDTO userDTO){
        UserDTO userDetails = userService.findUser(userDTO.getUserEmail(), userDTO.getPassword(), userDTO.getUserRoles());
        String token = jwtUtil.generateToken(userDetails);

        UserDetailDTO userDetailDTO = new UserDetailDTO(
                userDetails.getUserId(),
                userDetails.getUserName(),
                token
        );

        return new CommonResponse(200, userDetailDTO, "LOGIN_SUCCESSFUL");
    }

}
