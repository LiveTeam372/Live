package com.live.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.live.user.dto.LoginDTO;
import com.live.user.dto.UserDTO;

@Repository
@Mapper
public interface UserMapper {

    LoginDTO login(UserDTO dto);
    
    int join(@Param("dto") UserDTO dto);
    
    int joinAuth(String userNo);
    
    String isAvailableEmail(String email);
    
    String isAvailableUserNo(String strNo);
}
