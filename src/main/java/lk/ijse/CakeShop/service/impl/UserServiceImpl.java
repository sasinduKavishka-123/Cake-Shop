package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.UserStatus;
import lk.ijse.CakeShop.exception.CustomException;
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
                int count = getUserCountByEmail(userDTO.getUserEmail());
                if(count > 0){
                    throw new CustomException(403,"Sorry Email Already Exist");
                }

                User user = new User();
                user.setUserName(userDTO.getUserName());
                user.setUserEmail(userDTO.getUserEmail());
                user.setUserRoles(userDTO.getUserRoles());
                user.setPassword(userDTO.getPassword());
                user.setUserStatus(UserStatus.ACTIVE);

                userRepository.save(user);
            }
            catch (Exception e){
                log.error("Error in method saveUser()");
                throw new RuntimeException(e);
            }

    }

    @Override
    public int getUserCountByEmail(String email) {
        log.info("Execute method getUserByEmail()");
        try{
            return userRepository.getUserCountByEmail(email);
        }
        catch (Exception e){
            log.error("Error in method getUserByEmail()");
            throw new RuntimeException(e);
        }
    }

}
