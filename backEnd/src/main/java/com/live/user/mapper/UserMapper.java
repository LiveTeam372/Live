package com.live.user.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.live.user.dto.UserDTO;

@Repository
@Mapper
public interface UserMapper {

    public UserDTO login(UserDTO userDto);
    
    public int join(@Param("dto") UserDTO dto);
    
    public int joinAuth(@Param("userNo")String userNo);
    
    public String isAvailableEmail(@Param("email")String email);
    
    public String isAvailableUserNo(@Param("userNo")String strNo);
    
    public int countByEmail(@Param("email")String email);
    
    public int updateAuthNum(@Param("email")String email, @Param("authNum")String authNum);
    
    public int insertAuthNum(@Param("email")String email, @Param("authNum")String authNum);
    
    public String findAuthNumByEmail(@Param("email")String email);
    
    public int authEmail(@Param("userNo")String userNo);
    
    public String isAvailableNickName(@Param("nickName")String nickName);

	public int userDetalSubmit(@Param("dto")UserDTO userDto);

	public int agentDetalSubmit(@Param("dto")UserDTO userDto);

	public void addInterestAdd(Map<String, String> tempList);

	public int addProfileImg(@Param("userNo")String userNo);

	public int updateUserProfileImg(@Param("userNo") String userNo, @Param("profileImg") String profileImgPath);

	public String getProfileImgPath(@Param("userNo") String userNo);

	public UserDTO userInfo(@Param("userNo")String userNo, @Param("gbCd")String gbCd);

	public List<Map<String, String>> getUserInstList(@Param("userNo")String userNo);

	public int userDetailUpdate(@Param("dto")UserDTO userDto);

	public int agentDetailUpdate(@Param("dto")UserDTO userDto);

	public int deleteInstAdr(@Param("userNo")String userNo);

	public int userDelete(@Param("userNo")String userNo, @Param("useFlagYN")String useFlagYN);
    
}
