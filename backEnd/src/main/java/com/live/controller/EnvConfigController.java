package com.live.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.live.DTO.EnvConfig;
import com.live.mapper.CheckDBMapper;

@RestController
public class EnvConfigController {
	
	private final EnvConfig envConfig;
	
	@Autowired
    public EnvConfigController(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }

	@Autowired
	private CheckDBMapper mapper;
	
    @GetMapping("/env")
    public String checkEnvironmentVariables() {
        return "<h2>Environment Variables:</h2>" +
               "<ul>" +
               "<li><strong>DATABASE_URL:</strong> " + envConfig.getDatabaseUrl() + "</li>" +
               "<li><strong>DATABASE_USERNAME:</strong> " + envConfig.getDatabaseUsername() + "</li>" +
               "<li><strong>DATABASE_PASSWORD:</strong> " + envConfig.getDatabasePassword() + "</li>" +
               "<li><strong>CHECK_CONNECTION_DB_TEST:</strong> " + mapper.checkDB() + "</li>" +
               "</ul>";
    }
}
