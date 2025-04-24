package com.live.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.live.DTO.EnvConfig;

@RestController
public class EnvConfigController {
	
	private final EnvConfig envConfig;
	
	@Autowired
    public EnvConfigController(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }

    @GetMapping("/env")
    public String checkEnvironmentVariables() {
        return "<h2>Environment Variables:</h2>" +
               "<ul>" +
               "<li><strong>DATABASE_URL:</strong> " + envConfig.getDatabaseUrl() + "</li>" +
               "<li><strong>DATABASE_USERNAME:</strong> " + envConfig.getDatabaseUsername() + "</li>" +
               "<li><strong>DATABASE_PASSWORD:</strong> " + envConfig.getDatabasePassword() + "</li>" +
               "</ul>";
    }
}
