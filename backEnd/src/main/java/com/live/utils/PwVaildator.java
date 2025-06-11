package com.live.utils;

import java.util.regex.Pattern;

public class PwVaildator {
	// 대마왕 패턴
	//private static String pwDaevil = "/^(?=(.*[a-z]))(?=(.*[A-Z].*[A-Z]))(?=(.*\\d))(?=(.*[!@#$%^&*].*[!@#$%^&*]))(?!.*(\\d)\\1{2,})(?!.*(.)\\1{2,})(?=(.*[!@#$%^&*].*[!@#$%^&*].*[!@#$%^&*]))[a-zA-Z\\d!@#$%^&*]{12,}$/";
	private static String pwDaevil = "^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*].*[!@#$%^&*])(?!.*(\\d)\\1{2,})(?!.*(.)\\2{2,})[a-zA-Z\\d!@#$%^&*]{12,}$";
	
	// 대마왕 패턴과 일치하는지 확인
	public static boolean isPwVaild(String pw) {
		
		return Pattern.matches(pwDaevil, pw);
	}

}
