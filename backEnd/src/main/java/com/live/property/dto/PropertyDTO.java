package com.live.property.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class PropertyDTO {
	// 매물 고유 ID
	private Long propertyId;
	// 매물 제목
	private String title;
	// 매물 종류
	private String propertyType;
	// 거래 유형
	private String transactionType;
	// 매매가
	private int price;
	// 보증금
	private int deposit;
	// 월세
	private int monthlyRent;
	// 전용 면적
	private double exclusiveArea;
	// 공급 면적
	private double supplyArea;
	// 주소
	private String address;
	// 현재 층수
	private int floor;
	// 전체 층수
	private int totalFloors;
	// 방 개수
	private int rooms;
	// 욕실 개수
	private int bathrooms;
	// 입주 가능일
	private String moveInDate;
	// 관리비
	private int maintenanceFee;
	// 매물 설명
	private String description;
	// 등록일
	private String registrationDate;
	// 매물 상태
	private String status;
	// 초회수
	private int viewCount;
	// 좋아요 수
	private int favoriteCount;

	// 옵션 목록
	private List<String> options = new ArrayList<>();
	// 태그 목록
	private List<String> tags = new ArrayList<>();
	// 이미지 목록
	private List<String> images = new ArrayList<>();
}
