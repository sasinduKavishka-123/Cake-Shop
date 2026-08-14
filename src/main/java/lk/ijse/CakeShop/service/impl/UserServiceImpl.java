package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void saveUser(UserDTO userDTO) {
            log.info("Execute method saveUser()");
            try{
                User user = new User();
                user.setUserName(userDTO.getUserName());
                user.setUserRoles(userDTO.getUserRoles());
                user.setPassword(userDTO.getPassword());
                user.setUserStatus(userDTO.getUserStatus());

                userRepository.save(user);
            }
            catch (Exception e){
                log.error("Error in method saveUser()");
                throw new RuntimeException(e);
            }
    }

}
