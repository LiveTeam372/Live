package com.live.property.dto;

import lombok.Data;

@Data
public class PropertyImageDTO {
	// 매물 고유 id
	private long propertyId;
	// 이미지 주소
	private String imageUrl;
}
