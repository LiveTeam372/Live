package com.live.common.security;

public class Decrypt {

	public static String AES(String str) {
		return AES256.decrypt(GenerateKey.generateEncryptionKey(), GenerateKey.generateIVKey(), str);
	}
}
