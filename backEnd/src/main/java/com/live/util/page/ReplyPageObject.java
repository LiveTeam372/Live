package com.live.util.page;

import jakarta.servlet.http.HttpServletRequest;

/**
 * package com.webjjang.util.page
 * public class ReplyPageObject
 * @객체설명 페이지 처리를 위한 객체
 * - 데이터를 가져올 때 페이지 단위로 처리를 위한 객체 / 해당 페이지 가져올 데이터 계산
 * - 화면에 보여 줄 페이지 처리 / 전체 페이지 등
 * - 댓글 페이지 처리를 위한 데이터
 * 
 * @과정명 : 클라우드(AWS) 기반 백엔드 개발(웹프로그래머)
 * @작성자 : 이영환
 * @작성일 : 2023-08-09
 * @버전 : 1.0
 */

public class ReplyPageObject {

	/** 게시판 리스트 페이지 처리를 위한 데이터 변수 선언 **/
	PageObject pageObject = null;
	// 일반 게시판 글보기 글번호
	private long no;
	/** 게시판 글보기 댓글 페이지 처리를 위한 데이터 변수 선언 **/
	PageObject replyPageObject = null;
	
	public static ReplyPageObject getInstance(HttpServletRequest request)
			throws Exception {
		ReplyPageObject replyPageObject = new ReplyPageObject();
		System.out.println("<<<<-- ReplyPageObject.pageObject instace -->>>>");
		replyPageObject.pageObject = PageObject.getInstance(request);
		
		// 글번호 세팅
		replyPageObject.no = Long.parseLong(request.getParameter("no"));
		System.out.println("<<ReplyPageObject.no = " + replyPageObject.no + ">>");
		
		System.out.println("<<<<-- ReplyPageObject.replyPageObject instace -->>>>");
		replyPageObject.replyPageObject 
		= PageObject.getInstance(request, "replyPage", "replyPerPageNum");
		return replyPageObject;
	}

	public PageObject getPageObject() {
		return pageObject;
	}

	public long getNo() {
		return no;
	}

	public PageObject getReplyPageObject() {
		return replyPageObject;
	}

	public void setTotalRow(Long totalRow) {
		replyPageObject.setTotalRow(totalRow);
	}
	
	public Long getStartRow() {
		return replyPageObject.getStartRow();
	}
	
	public Long getEndRow() {
		return replyPageObject.getEndRow();
	}
	
	public String getNotPageQuery() {
		return ""
		+ "replyPerPageNum=" + replyPageObject.getPerPageNum()
		;
	}
	
	public String getPageQuery() {
		return "replyPage=" + replyPageObject.getPage()
		+ "&" + getNotPageQuery()
		;
	}
	
	@Override
	public String toString() {
		return "ReplyPageObject [pageObject=" + pageObject + ", no=" + no + ", replyPageObject=" + replyPageObject
				+ "]";
	}
	
}
