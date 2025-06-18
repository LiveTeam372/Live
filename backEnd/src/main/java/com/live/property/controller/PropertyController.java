package com.live.property.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.live.property.dto.PropertyDTO;
import com.live.property.service.PropertyService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/property")
public class PropertyController {	
	
	@Autowired
	@Qualifier("PropertyServiceImpl")
	private PropertyService service;	
	
	
	@GetMapping("/selectProperties")
	public ResponseEntity<List<PropertyDTO>> selectProperties() {			
		
		return new ResponseEntity<>(service.selectProperties(), HttpStatus.OK);
	}
	
}
