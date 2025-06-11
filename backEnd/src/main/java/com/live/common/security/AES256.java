package com.live.common.security;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AES256 {
	
	 // Encryption
    protected static String encrypt(String key, String iv, String plainText) {
        // AES-256 Encryption
        try {
            byte[] decodedKey = Base64.getDecoder().decode(key);
            byte[] decodedIV = Base64.getDecoder().decode(iv);

            SecretKeySpec secretKeySpec = new SecretKeySpec(decodedKey, "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(decodedIV);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);

            byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());

            return Base64.getEncoder().encodeToString(encryptedBytes);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // Decryption
    protected static String decrypt(String key, String iv, String encryptedText) {
        // AES-256 Decryption
        try {
            byte[] decodedKey = Base64.getDecoder().decode(key);
            byte[] decodedIV = Base64.getDecoder().decode(iv);
            byte[] decodedEncryptedText = Base64.getDecoder().decode(encryptedText);

            SecretKeySpec secretKeySpec = new SecretKeySpec(decodedKey, "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(decodedIV);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);

            byte[] decryptedBytes = cipher.doFinal(decodedEncryptedText);

            return new String(decryptedBytes);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}

