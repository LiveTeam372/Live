package com.live.common.security;

public class Encrypt {
		// 3. RSA
	
	public static String AES(String str) {
		return AES256.encrypt(GenerateKey.generateEncryptionKey(), GenerateKey.generateIVKey(), str);
	}
	
	public static String SHA(String str) {
		return SHA256.encrypt(str);
	}
}
