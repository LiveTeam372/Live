package com.live.property.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.live.property.dto.PropertyDTO;
import com.live.property.dto.PropertyImageDTO;
import com.live.property.dto.PropertyOptionDTO;
import com.live.property.dto.PropertyTagDTO;

@Repository
@Mapper
public interface PropertyMapper {
	// 매물 기본 정보들 가져오기
	List<PropertyDTO> selectBasicProperties();
	// 매물 옵션들 가져오기
	List<PropertyOptionDTO> selectOptions(List<PropertyDTO> list);
	// 매물 태그들 가져오기
	List<PropertyTagDTO> selectTags(List<PropertyDTO> list);
	// 매물 이미지 주소들 가져오기
	List<PropertyImageDTO> selectImages(List<PropertyDTO> list);
}
