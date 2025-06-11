package com.live.utils;

import java.util.Random;

public class UserNoGenerator {
	public static String generateMemberNumber() {
        Random random = new Random();
        int number = 10000000 + random.nextInt(90000000); // 10000000 ~ 99999999
        return String.valueOf(number);
    }
}
