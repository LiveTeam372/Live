package com.live.user.dto;

import lombok.Data;

@Data
public class LoginDTO {

	// 회원 기본정보
	private String userNo;
	private String email;
	private String pw;
	private String gbCd;
	private String socialYN;
	private String socialCh;
	private String updateDate;
	private String useFlagYN;
	
	// 회원 권한
	private String emailAuthYN;
	private String cellAuthYN;
	private String adrAuthYN;
	
	// 회원 상세 정보
	private String name;
	private String nickName;
	private String gendeMF;
	private String birth;
	private String cellPhone_1;
	private String cellPhone_2;
	private String cellPhone_3;
	private String address;
	private String addressDtl;
	private String marriedYN;
	private String profileImg;

	// 사업자 정보
	private String agNo;
	private String decscription;
}
