package com.live.user.dto;

import lombok.Data;

@Data
public class LoginDTO {

	// 회원 기본정보
	String userNo;
	String email;
	String pw;
	String gbCd;
	String socialYN;
	String socialCh;
	String updateDate;
	String useFlagYN;
	
	// 회원 권한
	String emailAuthYN;
	String cellAuthYN;
	String adrAuthYN;
	
	// 회원 상세 정보
	String name;
	String nickName;
	String gendeMF;
	String birth;
	String cellPhone_1;
	String cellPhone_2;
	String cellPhone_3;
	String address;
	String addressDtl;
	String marriedYN;
	String profileImg;

	// 사업자 정보
	String agNo;
	String decscription;
}
