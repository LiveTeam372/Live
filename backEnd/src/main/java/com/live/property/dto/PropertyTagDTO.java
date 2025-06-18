package com.live.property.dto;

import lombok.Data;

@Data
public class PropertyTagDTO {
	// 매물 고유 id
	private long propertyId;
	// 태그 이름
	private String tagName;
}
