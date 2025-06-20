package com.live.user.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.live.common.security.Encrypt;
import com.live.user.dto.EmailAuthDTO;
import com.live.user.dto.EmailRequestDTO;
import com.live.user.dto.LoginDTO;
import com.live.user.dto.UserDTO;
import com.live.user.mapper.UserMapper;
import com.live.utils.UserNoGenerator;

import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
@Log4j
public class UserController {

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserMapper mapper;
	
	@PostMapping("/login.do")
	public ResponseEntity<LoginDTO> login(@RequestBody Map<String, String> res, HttpSession session) {
//		dto.setPw(Encrypt.SHA(dto.getPw()));

		log.info("User Controller --------------- login()");
		
		UserDTO userDto = new UserDTO();
		
		String email = res.get("email");
		String encPw = Encrypt.SHA(res.get("pw"));
		
		log.info("UserDTO.email :: " + email);
		log.info("UserDTO.pw :: " + encPw);
		
		userDto.setEmail(email);
		userDto.setPw(encPw);
		
		LoginDTO loginDTO = mapper.login(userDto);
//
		log.info(loginDTO);
//
		if (loginDTO == null || loginDTO.equals("")) {
			// 로그인 정보 없음
			throw new IllegalArgumentException("아이디 또는 비밀번호를 확인해 주세요.");
		} else {
			session.setAttribute("login", loginDTO);
			
			Map<String, String> msg = new HashMap<>();
			msg.put("message", "로그인 되었습니다.");
			
			return ResponseEntity.ok(loginDTO);
		}
	} // end of login()
	
	// 로그인 정보 반환
	@PostMapping("/getLoginUser.do")
	public ResponseEntity<LoginDTO> getLoginUser(HttpSession session) {
		log.info("User Controller --------------- getLoginUser()");
	    LoginDTO loginUser = (LoginDTO) session.getAttribute("loginUser");

	    if (loginUser != null) {
	        return ResponseEntity.ok(loginUser);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}
	
	@PostMapping("/join.do")
	@Transactional
	public ResponseEntity<Map<String, String>> join(@RequestBody Map<String, String> res, HttpSession session) {
		
		log.info("User Controller --------------- join()");
		
		UserDTO userDto = new UserDTO();
		
		String email = res.get("email");
		String encPw = Encrypt.SHA(res.get("pw"));
		String userNo;
//		String encPw = Encrypt.SHA("1234");
		
		log.info("UserDTO.email :: " + email);
		log.info("UserDTO.pw :: " + encPw);
		
		userDto.setEmail(email);
		userDto.setPw(encPw);
		userDto.setGbCd(res.get("gbCd")); // 사업자 구분 1:일반회원 2: 사업자
		
		Map<String, String> msg = new HashMap<>();
		
		
		if (isAvailableEmail(email)) {
			throw new IllegalArgumentException("이미 가입된 이메일입니다.");
		} else {
			// 중복체크 후 회원 번호 채번
			userNo = genUserNo();
			log.info("UserDTO.userNo :: " + userNo);
			userDto.setUserNo(userNo);
			
			
			// 회원 가입 실행
			int result = mapper.join(userDto);
			
			if (result >= 1) {
				mapper.joinAuth(userNo); // auth 테이블 데이터 생성
				mapper.addProfileImg(userNo); // 프로필 이미지 생성
				
				msg.put("message", "회원 가입이 정상적으로 완료 되었습니다.");
				return ResponseEntity.ok(msg);
			} else {
				throw new IllegalArgumentException("회원 가입에 실패 하였습니다.");
			}
		}
	}
	
	// 이메일 중복 체크
	@PostMapping("/chekedEmail.do")
	public ResponseEntity<Map<String, Object>> checkedEmail(@RequestBody Map<String, String> res) {
		log.info("User Controller --------------- checkedEmail()");
		String email = res.get("email");
		
		boolean isAvailable = !isAvailableEmail(email);
		
		Map<String, Object> result = new HashMap<>();
	    result.put("available", isAvailable);
	    return ResponseEntity.ok(result);
	}
	
	// 이메일 전송
	@PostMapping("/sendAuthNum.do")
	public ResponseEntity<?> sendAuthNum(@RequestBody EmailRequestDTO dto) {
		log.info("User Controller --------------- sendAuthNum()");
		boolean result = sendEmailAuth(dto.getEmail());

	    if (result) {
	        return ResponseEntity.ok().body(Map.of("message", "인증번호가 전송되었습니다."));
	    } else {
	    	throw new IllegalArgumentException("메일 전송 실패");
	    }
	}
	
	// 메일 인증
    @PostMapping("/authEmail.do")
    public ResponseEntity<?> authEmail(@RequestBody EmailAuthDTO dto) {
    	log.info("User Controller --------------- authEmail()");
    	
    	boolean isValid = checkEmailAuth(dto.getEmail(), dto.getAuthNum());
    	
    	log.info("isValid " + isValid);
    	log.info("userNo " + dto.getUserNo());

        if (isValid) {
        	// 이메일 인증 업데이트
        	int result = mapper.authEmail(dto.getUserNo());
        	
        	if (result == 0) {
        		throw new IllegalArgumentException("인증정보가 업데이트 되지 않았습니다.");
        	}
        	
        	return ResponseEntity.ok().body(Map.of("result", "success"));
        } else {
        	throw new IllegalArgumentException("인증번호가 일치하지 않습니다.");
        }
    }
    
    // 닉네임 중복 체크
 	@PostMapping("/chekedNickName.do")
 	public ResponseEntity<Map<String, Object>> checkedNickName(@RequestBody Map<String, String> res) {
 		log.info("User Controller --------------- checkedNickName()");
 		String nickName = res.get("nickName");
 		
 		boolean isAvailable = !isAvailableEmail(nickName);
 		
 		Map<String, Object> result = new HashMap<>();
 	    result.put("available", isAvailable);
 	    return ResponseEntity.ok(result);
 	}
 	
 	// 회원 추가 정보 입력
 	@PostMapping("/userDetailSubmit.do")
 	@Transactional
 	public ResponseEntity<Map<String, String>> userDetailSubmit(@RequestBody UserDTO userDto) {
 		log.info("User Controller --------------- userDetailSubmit()");
 		
 		String gbCd = userDto.getGbCd();
 		int result = 0;
 		
 		log.info("입력 정보 gbCd [ " + gbCd + " ] :: " + userDto.toString() );
 		
 		if("1".equals(gbCd)) {
 			result = mapper.userDetalSubmit(userDto);
 			
 			log.info("관심지역 [ " + gbCd + " ] :: " + userDto.getInst_address() );
 			log.info(userDto.getInst_address().isEmpty() );
 			
 			// 관심 지역 추가
 			if (result > 0 && !userDto.getInst_address().isEmpty()) { 
 				for (int i = 0; i < userDto.getInst_address().size(); i++){
					Map<String, String> tempList = userDto.getInst_address().get(i);
					tempList.put("userNo", userDto.getUserNo());
					
					log.info("관심지역 [ " + i + " ] :: " + tempList.toString() );
					
					mapper.addInterestAdd(tempList);
				}
 			}
 		} else {
 			result = mapper.agentDetalSubmit(userDto);
 		}
 		
 		if (result > 0) {
 			return ResponseEntity.ok().body(Map.of("result", "success"));
 		} else {
 			Map<String, String> returnMsg = new HashMap<>();
 			returnMsg.put("result", "falied");
 			returnMsg.put("message", "회원정보가 추가되지 않았습니다."); 			
 			return ResponseEntity.ok(returnMsg);
 		}
 	}
 	
 	// 프로필 이미지 변경
 	@PostMapping("/updateProfileImg.do")
 	public ResponseEntity<?> updateProfileImg(
 	    @RequestParam("profileImg") MultipartFile file,
 	    @RequestParam("userNo") String userNo
 	) {
 		
 		log.info("User Controller --------------- updateProfileImg()");
 		
 	    try {
 	    	// 1. 기존 이미지 경로 조회
 	        String oldImgPath = mapper.getProfileImgPath(userNo); // 예: /images/uploaded/oldFile.jpg

 	        // 2. 실제 파일 경로로 변환
 	        String baseDir = "D:/Feeljae/workspace/Live/frontEnd/public";
 	        File oldFile = new File(baseDir + oldImgPath);
 	        if (oldFile.exists()) {
 	            oldFile.delete(); // 삭제
 	        }

 	        // 3. 새 이미지 저장
 	        String uploadDir = baseDir + "/images/uploaded";
 	        File dir = new File(uploadDir);
 	        if (!dir.exists()) dir.mkdirs();

 	        String newFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
 	        File dest = new File(uploadDir, newFileName);
 	        file.transferTo(dest);

 	        // 4. DB에 새 이미지 경로 저장
 	        String savePath = "/images/uploaded/" + newFileName;
 	        mapper.updateUserProfileImg(userNo, savePath);
 	        
 	       return ResponseEntity.ok(Map.of("success", true, "profileImg", savePath));
 	    } catch (Exception e) {
 	        e.printStackTrace();
 	        return ResponseEntity.status(500).body(Map.of("success", false));
 	    }
 	}
 	
		
	
	//--------------------- utils ----------------------------
	
	/**
	 * 
	 * @param email
	 * @return boolean
	 */
	// 이메일 중복 체크
	public boolean isAvailableEmail(String email) {
		String result = mapper.isAvailableEmail(email);
		return (result != null && !result.isEmpty()); // 중복되면 true
	}
	
	/**
	 * 
	 * @param nickName
	 * @return boolean
	 */
	// 이메일 중복 체크
	public boolean isAvailableNickName(String nickName) {
		String result = mapper.isAvailableNickName(nickName);
		return (result != null && !result.isEmpty()); // 중복되면 true
	}
	
	// 회원번호 채번
	public String genUserNo() {
		String strNo;
		do {
			// 난수 생성
			strNo = UserNoGenerator.generateMemberNumber();
		} while (isAvailableUserNo(strNo));
		return strNo;
	}
	
	// 회원번호 중복 확인
	public boolean isAvailableUserNo(String strNo) {
		String result = mapper.isAvailableUserNo(strNo);
	    return (result != null && !result.isEmpty()); // 중복되면 true
	}
	
	// 인증 이메일 발송
	public boolean sendEmailAuth(String email) {
        String authNum = generateAuthNumber();

        // 이메일 전송
        try {
            sendEmail(email, authNum);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        // DB 저장 (기존 있으면 업데이트, 없으면 삽입)
        int count = mapper.countByEmail(email);
        if (count > 0) {
            mapper.updateAuthNum(email, authNum);
        } else {
            mapper.insertAuthNum(email, authNum);
        }

        return true;
    }

	// 인증번호 생성
    private String generateAuthNumber() {
        Random random = new Random();
        int num = 100000 + random.nextInt(900000); // 6자리
        return String.valueOf(num);
    }

    // 이메일 발송
    private void sendEmail(String to, String authNum) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("[인증번호] 이메일 인증 요청");
        message.setText("인증번호는 " + authNum + " 입니다. 입력란에 정확히 입력해주세요.");
        mailSender.send(message);
    }
	
	// 이메일 인증
	public boolean checkEmailAuth(String email, String authNum) {
        String storedAuth = mapper.findAuthNumByEmail(email);

        return authNum != null && authNum.equals(storedAuth);
    }
}
