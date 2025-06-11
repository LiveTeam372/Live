package com.live.common.security;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateKey {

    protected static String generateIVKey() {
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);

        return Base64.getEncoder().encodeToString(iv);
    }
    
    protected static String generateEncryptionKey() {
        byte[] key = new byte[32];
        new SecureRandom().nextBytes(key);
		return Base64.getEncoder().encodeToString(key);
    }
}