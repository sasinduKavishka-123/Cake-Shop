package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.UserStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void saveUser(UserDTO userDTO) {
        log.info("Execute method saveUser()");

        if(userDTO.getUserId() == 0){
            Optional<UserDTO> optionalUserDTO = userRepository.getUserByDetails(userDTO.getUserName(), userDTO.getUserEmail());

            if(optionalUserDTO.isPresent()){
                log.error("Error in method saveUser()");
                UserDTO responseDTO = optionalUserDTO.get();

                if (userDTO.getUserName().equals(responseDTO.getUserName())) {
                    throw new CustomException(401, "USERNAME_ALREADY_EXIST");
                }
                if (userDTO.getUserEmail().equals(responseDTO.getUserEmail())) {
                    throw new CustomException(402, "EMAIL_ALREADY_EXIST");
                }
            }
        }

        User user = new User();
        if(userDTO.getUserId() != 0){
            Optional<User> optionalUser = userRepository.findById(userDTO.getUserId());
            if(optionalUser.isEmpty()){
                throw new CustomException(404, "USER_NO_FOUND");
            }
            user = optionalUser.get();
        }
        user.setUserName(userDTO.getUserName());
        user.setUserEmail(userDTO.getUserEmail());
        user.setUserContact(userDTO.getUserContact());
        user.setUserRoles(userDTO.getUserRoles());
        user.setUserStatus(userDTO.getUserStatus());
        if(userDTO.getUserId() == 0){
            String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt(12));
            user.setPassword(hashedPassword);
        }
        System.out.println(user.getUserStatus());
        userRepository.save(user);
    }

    @Override
    public UserDTO findUser(String email, String password, String userRole) {
        log.info("Execute method findUser()");

        Optional<User> optionalUser = userRepository.findUser(email, userRole);
        if (optionalUser.isEmpty()) {
            log.error("Error in method findUser()");
            throw new CustomException(404, "USER NOT FOUND");
        }

        User u = optionalUser.get();

        if(!BCrypt.checkpw(password, u.getPassword())){
            log.error("Error in method findUser()");
            throw new CustomException(404, "PASSWORD MISMATCH");
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(u.getUserId());
        userDTO.setUserName(u.getUserName());
        userDTO.setUserRoles(u.getUserRoles());

        return userDTO;
    }

    @Override
    public List<UserDTO> getUsers(String name, String email, boolean isStaff) {
        log.info("Execute method getUsers()");

        List<User> users = new ArrayList<>();

        if(isStaff){
            users = userRepository.getStaff(name, email);
        }else{
            users = userRepository.getCustomers(name, email);
        }

        List<UserDTO> userDTOS = new ArrayList<>();
        for(User u : users){
            UserDTO dto = new UserDTO();
            dto.setUserId(u.getUserId());
            dto.setUserName(u.getUserName());
            dto.setUserEmail(u.getUserEmail());
            dto.setUserContact(u.getUserContact());
            dto.setUserRoles(u.getUserRoles());
            dto.setUserStatus(u.getUserStatus());

            userDTOS.add(dto);
        }
        return userDTOS;
    }

    @Override
    public int getUserCountByRole(String userRole, boolean isStaff) {
        log.info("Execute method getUserCountByRole()");

        if(userRole.isEmpty()){
            log.error("Error in method getUserCountByRole()");
            throw new CustomException(404, "USER ROLE NOT FOUND");
        }
        if(isStaff){
            return userRepository.getStaffCount(userRole);
        }else{
            return userRepository.getCustomerCount(userRole);
        }
    }

    @Override
    public UserDTO findUserById(long id) {
        log.info("Execute method findUserById()");
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()){
            log.error("Error in method findUserById()");
            throw new CustomException(404, "USER NOT FOUND");
        }

        User u = optionalUser.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(u.getUserId());
        userDTO.setUserName(u.getUserName());
        userDTO.setUserEmail(u.getUserEmail());
        userDTO.setUserContact(u.getUserContact());
        userDTO.setUserStatus(u.getUserStatus());
        userDTO.setUserRoles(u.getUserRoles());

        return userDTO;
    }

}
