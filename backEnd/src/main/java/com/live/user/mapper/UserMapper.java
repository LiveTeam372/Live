package com.live.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.live.user.dto.LoginDTO;
import com.live.user.dto.UserDTO;

@Repository
@Mapper
public interface UserMapper {

    public LoginDTO login(UserDTO dto);
    
    public int join(@Param("dto") UserDTO dto);
    
    public int joinAuth(String userNo);
    
    public String isAvailableEmail(String email);
    
    public String isAvailableUserNo(String strNo);
    
    public int countByEmail(@Param("email")String email);
    
    public int updateAuthNum(@Param("email")String email, @Param("authNum")String authNum);
    
    public int insertAuthNum(@Param("email")String email, @Param("authNum")String authNum);
    
    public String findAuthNumByEmail(@Param("email")String email);
    
    public int authEmail(@Param("userNo")String userNo);
    
}
