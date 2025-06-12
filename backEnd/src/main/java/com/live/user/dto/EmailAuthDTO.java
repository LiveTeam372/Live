package com.live.user.dto;

import lombok.Data;

@Data
public class EmailAuthDTO {
	private String userNo;
	private String email;
	private String authNum;
}
