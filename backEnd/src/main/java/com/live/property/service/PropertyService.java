package com.live.property.service;

import java.util.List;

import com.live.property.dto.PropertyDTO;

public interface PropertyService {
	
	// 매물 기본 정보들 가져오기
	List<PropertyDTO> selectProperties();
	
}
