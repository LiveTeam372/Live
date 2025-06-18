package com.live.property.dto;

import lombok.Data;

@Data
public class PropertyOptionDTO {
	// 매물 고유 id
	private long propertyId;
	// 옵션 이름
	private String optionName;
}
