package com.live.property.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.live.property.dto.PropertyDTO;
import com.live.property.dto.PropertyImageDTO;
import com.live.property.dto.PropertyOptionDTO;
import com.live.property.dto.PropertyTagDTO;
import com.live.property.mapper.PropertyMapper;
import com.live.property.service.PropertyService;

import lombok.extern.slf4j.Slf4j;

@Service
@Qualifier("PropertyServiceImpl")
@Slf4j
public class PropertyServiceImpl implements PropertyService {
	
	@Autowired
	private PropertyMapper mapper;
	
	@Override
	public List<PropertyDTO> selectProperties() {
		
		// 매핑을 위한 map 객체 선언
		Map<Long, PropertyDTO> map = new HashMap<>();
		
		// 매물 기본 정보 가져오기
		List<PropertyDTO> list = mapper.selectBasicProperties();
		
		// 매물 기본 정보 맵핑
		for (PropertyDTO property : list) {
		    map.put(property.getPropertyId(), property);
		}
		// 조회된 매물 고유 id로 해당 매물의 옵션 정보 조회후 맵핑
		for (PropertyOptionDTO o : mapper.selectOptions(list)) {
		    map.get(o.getPropertyId()).getOptions().add(o.getOptionName());
		}
		// 조회된 매물 고유 id로 해당 매물의 태그 정보 조회후 맵핑
		for (PropertyTagDTO t : mapper.selectTags(list)) {
		    map.get(t.getPropertyId()).getTags().add(t.getTagName());
		}
		// 조회된 매물 고유 id로 해당 매물의 이미지 정보 조회후 맵핑
		for (PropertyImageDTO img : mapper.selectImages(list)) {
		    map.get(img.getPropertyId()).getImages().add(img.getImageUrl());
		}
		
		// 맵핑된 데이터를 ArrayList 형태로 변환
		List<PropertyDTO> result = new ArrayList<>(map.values());
		
		return result;
	}

}
