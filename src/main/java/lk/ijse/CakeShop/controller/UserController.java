package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.dto.UserDetailDTO;
import lk.ijse.CakeShop.enumerations.UserStatus;
import lk.ijse.CakeShop.security.JwtUtil;
import lk.ijse.CakeShop.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping(value = "/saveCustomer", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveCustomer(@RequestBody UserDTO userDTO) {
        userService.saveUser(userDTO);
        return new CommonResponse(200, "UserSaved!");
    }

    @PatchMapping(value = "/updateUserStatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateUserStatus(
            @RequestParam (value = "user_id") Long userId,
            @RequestParam (value = "user_status") UserStatus userStatus
    ){
        userService.updateUserStatus(userId, userStatus);
        return new CommonResponse(200, "USER UPDATED!");
    }

    @PostMapping(value = "/saveStaff", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveStaff(@RequestBody UserDTO userDTO) {
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

    @GetMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getUsers(
            @RequestParam (value = "user_name") String userName,
            @RequestParam (value = "user_email") String userEmail,
            @RequestParam (value = "is_staff") boolean isStaff
    ){
        List<UserDTO> userDTOList = userService.getUsers(userName, userEmail, isStaff);
        return new CommonResponse(200, userDTOList, "SUCCESSFUL");
    }

    @GetMapping(value = "/getStaffCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getUserCount(
            @RequestParam (value = "user_role") String userRole,
            @RequestParam (value = "is_staff") boolean isStaff
    ){
        int userCount = userService.getUserCountByRole(userRole, isStaff);
        return new CommonResponse(200, userCount, "SUCCESSFUL");
    }

    @GetMapping(value = "/findUserById/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getUserById(@PathVariable long userId){
        UserDTO responseDTO = userService.findUserById(userId);
        return new CommonResponse(200, responseDTO, "SUCCESSFUL");
    }
}
