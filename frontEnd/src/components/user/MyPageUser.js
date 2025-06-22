import React, { useState, useEffect } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from '../../api/axiosInstance.js';
import { useNavigate } from 'react-router-dom';
import DeleteUserModal from './DeleteUserModal';

import common from '../../resources/common.js';

const MyPageUser = ({ setView }) => {

  const navigate = useNavigate();

  // 로그인 유저 정보
  const userData = JSON.parse(localStorage.getItem("user"));

  const userName = userData.name;
  const userType = userData.gbCd;

  // input 값
  const [userNickName, setUserNickName] = useState(userData.nickName);
  const [userCell_1, setUserCell_1] = useState("0" + userData.cellPhone_1);
  const [userCell_2, setUserCell_2] = useState(userData.cellPhone_2);
  const [userCell_3, setUserCell_3] = useState(userData.cellPhone_3);
  const [userGender, setUserGender] = useState(userData.genderMF);
  const [userAdd, setUserAdd] = useState(userData.address);
  const [userAddDtl, setUserAddDtl] = useState(userData.addressDtl);
  const [userMarried, setUserMarried] = useState(userData.marriedYN);
  const [interestAddrs, setInterestAddrs] = useState(userData.inst_address || []);
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  let userBirth = String(userData.birth);
  

  // 생년월일 입력
  const currentYear = new Date().getFullYear();
  
  const [years, setYears] = useState([]);
  const [months] = useState(common.getMonths());
  const [days, setDays] = useState([]);

  const [selectedYear, setSelectedYear] = useState(userBirth.substring(0,4));
  const [selectedMonth, setSelectedMonth] = useState(userBirth.substring(4,6));
  const [selectedDay, setSelectedDay] = useState(userBirth.substring(6,8));

  // 이름 상태값
  const [isValidName, setIsValidName] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageName, setMessageName] = useState('');
  
  // 닉네임 상태값
  const [isValidNickName, setIsValidNickName] = useState(false); // ✅ 메시지가 정상인지 여부
  const [isCheckedNickName, setIsCheckedNickName] = useState(true); // 닉네임 조회 여부
  const [messageNickName, setMessageNickName] = useState('');

  // 연락처 상태값
  const [isValidCall, setIsValidCall] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageCall, setMessageCall] = useState('');

  // 폼 제출 유효성 플래그
  const [vaildFlag, setVaildFlag] = useState(false);

  // 회원 탈퇴 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // 연도 리스트 생성
    setYears(common.getYears(currentYear));
  }, [currentYear]);

  useEffect(() => {
    // 연도와 월이 선택되면 해당 달의 일 수 계산
    setDays(common.getDaysInMonth(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  const checkNickName = (e) => {
    const value = e.target.value;
    setUserNickName(value);
    setIsValidNickName(false);

    if (!common.isValidKoEnNum(value, 2, 10)) {
      setMessageNickName("2~10자 이내 한글, 영문, 숫자만 입력 가능합니다.");
      setIsValidNickName(false);
    } else {
      setMessageNickName("");
      setIsValidNickName(true);
    }
  }

  const checkCall_1 = (e) => {
    const value = e.target.value;
    setUserCell_1(value);

    if (!common.isValidNum(value, 2, 3)) {
      setMessageCall("숫자만 입력 가능합니다.");
      setIsValidCall(false);
    } else {
      setMessageCall("");
      setIsValidCall(true);
    }
  }

  const checkCall_2 = (e) => {
    const value = e.target.value;
    setUserCell_2(value);

    if (!common.isValidNum(value, 3, 4)) {
      setMessageCall("숫자만 입력 가능합니다.");
      setIsValidCall(false);
    } else {
      setMessageCall("");
      setIsValidCall(true);
    }
  }

  const checkCall_3 = (e) => {
    const value = e.target.value;
    setUserCell_3(value);

    if (!common.isValidNum(value, 4, 4)) {
      setMessageCall("숫자만 입력 가능합니다.");
      setIsValidCall(false);
    } else {
      setMessageCall("");
      setIsValidCall(true);
    }
  }

  // 초기값 처리
  useEffect(() => {
    setProfileImg(`${process.env.PUBLIC_URL}${userData.profileImg}`);  // 서버 저장된 이미지 URL
  }, []);

  // 프로필 이미지 변경
  const profileImgChange = async (e) => {
    const file = e.target.files[0];
    console.log("file :: " + URL.createObjectURL(file));

    if (!file) return;

    // 미리보기용 URL 생성
    const imgPreviewUrl = URL.createObjectURL(file);
    setProfileImg(imgPreviewUrl);

    // 서버로 보낼 FormData 생성
    const formData = new FormData();
    formData.append("profileImg", file);
    formData.append("userNo", userData.userNo); // 필요한 경우 사용자 ID 추가

    try {
      const res = await axios.post(
        "http://localhost:16543/user/updateProfileImg.do",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("프로필 이미지가 성공적으로 변경되었습니다.");
        userData.profileImg = res.data.profileImg;
        localStorage.setItem("user", JSON.stringify(userData));
        setUserProfileImg(file); // 파일 저장
      } else {
        alert("프로필 이미지 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // 닉네임 조회
  const checkDuplicateNickName = async () => {
    console.log(userNickName);
    const value = userNickName;
    setUserNickName(value);

    if (!isValidNickName) {
      setMessageNickName("2~10자 이내 한글, 영문, 숫자만 입력 가능합니다.");
      setIsValidNickName(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:16543/user/chekedNickName.do', {
        userNickName: value  // value를 보내야 함!
      });

      // 서버에서 중복이면 false, 사용 가능하면 true 반환했다고 가정
      if (res.data.available) {
        setMessageNickName("사용 가능한 닉네임입니다.");
        setIsValidNickName(true);
        setIsCheckedNickName(true);
      } else {
        setMessageNickName("이미 사용 중인 닉네임입니다.");
        setIsValidNickName(false);
        setIsCheckedNickName(false);
      }
    } catch (err) {
      setMessageNickName("서버 오류 발생");
      setIsValidNickName(false);
      setIsCheckedNickName(false);
    }
  };

  // 주소 검색 버튼
  const schAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 및 우편번호 저장
        setUserAdd(data.address);
      },
    }).open();
  }

  // 관심지역 추가
  const addInterestAdr = (e) => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 법정동 이름
        const name = data.bname !== '' ? data.bname : data.jibunAddress;

        // 법정동 코드 (bcode는 10자리, 읍면동까지)
        const code = data.bcode;

        if (!code || code.length !== 10) {
          alert("법정동 코드가 유효하지 않습니다.");
          return;
        }

        // 중복 체크
        const isDuplicate = interestAddrs.some(addr => addr.code === code);
        if (isDuplicate) {
          alert("이미 추가된 지역입니다.");
          return;
        }

        // 5개 제한
        if (interestAddrs.length >= 5) {
          alert("최대 5개까지 등록할 수 있습니다.");
          return;
        }

        // 주소 추가
        const newItem = { name: `${name}`, code };
        setInterestAddrs([...interestAddrs, newItem]);
      }
    }).open();
  }

  // 관심지역 삭제
  const removeAdr = (code) => {
    setInterestAddrs(interestAddrs.filter(item => item.code !== code));
  };

  // 회원 탈퇴 처리
  const handleDeleteAccount = async (e) => {
    e.preventDefault(); // submit 이벤트 차단

    let jsonData = {
      userNo: userData.userNo,
      useFlagYN: "N"
    }
    try {
      const res = await axios.post("http://localhost:16543/user/userDelete.do", jsonData);

      if (res.data.result === "success") {
        alert('탈퇴 처리 되었습니다.');
        localStorage.removeItem('user');
        setShowDeleteModal(false); // 닫기
        window.location.href = '/';
        return false;
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  // 폼 제출 유효성 검증
  const submitVaild = () => {
    let alertMsg = "";
    let birthData = selectedYear + selectedMonth + selectedDay;
    
    // 일반 회원
    if (userType === "1") {
      if(userName == "" || userName == undefined ) {
        alertMsg = "이름을 입력해 주세요.";
      } else if (userNickName == "" || userNickName == undefined) {
        alertMsg = "닉네임을 입력해 주세요.";
      } else if (birthData == "" || birthData == undefined) {
        alertMsg = "생년월일을 입력해 주세요.";
      } else if ((userCell_1 == "" || userCell_1 == undefined) &&
                (userCell_2 == "" || userCell_2 == undefined) &&
                (userCell_3 == "" || userCell_3 == undefined) ) {
        alertMsg = "연락처를 입력해 주세요.";
      } else if (userAdd == "" || userAdd == undefined) {
        alertMsg = "주소를 입력해 주세요.";
      } else {
        if(!isCheckedNickName) alertMsg = "닉네임 중복 조회해 주세요.";
      }
    } else {
      // 사업자 회원
    }
    
    if (alertMsg) {
      alert(alertMsg);
      return false;
    } else {
      return true;
    }
  }

  // 폼 제출 이벤트
  const userDetailSubmit = async (e) => {
    let birthData = selectedYear + selectedMonth + selectedDay;
    let jsonData = {};

    if (!submitVaild()) {
      return;
    }

    if (userType === "1") { // 일반 회원
      jsonData = {
        userNo: userData.userNo,
        gbCd: userType,
        name: userName,
        nickName : userNickName,
        birth : birthData,
        genderMF : userGender,
        cellPhone_1 : userCell_1,
        cellPhone_2 : userCell_2,
        cellPhone_3 : userCell_3,
        address : userAdd,
        addressDtl : userAddDtl,
        marriedYN : userMarried,
        inst_address: interestAddrs,
        joinYN : "N"
      };
    } else { // 사업자 회원
      jsonData = {
        gbCd: userType,

      };
    }
    console.log("[ UserDetailForm / userDetailSubmit() / data ] jsonData :: " + JSON.stringify(jsonData));

    // 폼 제출
    try {
      const res = await axios.post("http://localhost:16543/user/userDetailSubmit.do", jsonData);

      if (res.data.result === "success") {
        const loginData = await axios.post('http://localhost:16543/user/getLoginUser.do');
        
        // console.log("userInfo :: " + JSON.stringify(res.data));

        // 로그인 정보 재반환, 로컬 스토리지에 저장장
        localStorage.setItem('user', JSON.stringify(loginData.data));

        alert("추가 정보가 등록되었습니다!");
        navigate('/'); // 리다이렉트
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      return false;
    }
    
  }

  return (
    <div className='container'>
      <div className='row' style={{paddingTop:'50px'}}>
        <div className='col-2' style={{width:'300px', cursor: 'pointer', marginTop: '1rem', marginBottom: '3rem', fontSize: "20px" }}>
          <div className='' style={{margin: '0px'}}>
            <img src={ logo } style={{width:'130px', height:'130px'}}></img>
          </div>
          <div style={{marginLeft: '20px'}}>
            <span>
              회원 정보 수정 후<br/>
              <strong>저장을 꼭 눌러주세요!</strong>
            </span>
          </div>
        </div>
        <div className="detail-form-container col-8">
          <div className="detail-form-box">
            <div className="profile-img-inform-div">
              <label htmlFor="profile-img-input" style={{ cursor: "pointer" }}>
                <img src={ profileImg } className="rounded-circle profile-img" alt="No Image" style={{width:'80px', height:'80px'}}></img>
              </label>
              <input type="file" accept="image/*" id="profile-img-input" onChange={profileImgChange} style={{ display: "none" }}/>  
              <h6 style={{marginTop: "20px"}}>{ userNickName } 님 </h6>
            </div>
            <form onSubmit={userDetailSubmit}>
              <div style={{marginTop: "30px"}}>
                <div className="row">
                  <div className="col-2"><span >이름</span></div>
                  <div className="col-10">
                    <input type="text" className="form-control" placeholder="10자 이내" name="userName" maxLength="10" value={userName} readOnly disabled/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >닉네임</span></div>
                  <div className="col-8">
                    <input type="text" className="form-control" placeholder="10자 이내" name="nickName" maxLength="10" value={userNickName} required onChange={checkNickName}/>
                  </div>
                  <div className="col-2">
                    <button className="btn login-btn-inform" type="button" style={{backgroundColor: '#FFC000'}} onClick={checkDuplicateNickName}>조회</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <span className={isValidNickName ? 'msg-success' : 'msg-error'}>{messageNickName}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >연락처</span></div>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_1" maxLength="3" value={userCell_1} required onChange={checkCall_1}/>
                  </div>
                  <span className="col-1" style={{textAlign:'center'}}>-</span>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_2" maxLength="4" value={userCell_2} required onChange={checkCall_2}/>
                  </div>
                  <span className="col-1" style={{textAlign:'center'}}>-</span>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_3" maxLength="4" value={userCell_3} required onChange={checkCall_3}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <span className={isValidCall ? 'msg-success' : 'msg-error'}>{messageCall}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >생년월일</span></div>
                  {/* 연 선택 */}
                  <div className="col-3">
                    <select
                      id="birthYear"
                      className="form-select"
                      value={selectedYear}
                      required
                      onChange={e => setSelectedYear(e.target.value)}
                    >
                      <option value="">연</option>
                      {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  {/* 월 선택 */}
                  <div className="col-2">
                    <select
                      id="birthMonth"
                      className="form-select"
                      value={selectedMonth}
                      required
                      onChange={e => setSelectedMonth(e.target.value)}
                    >
                      <option value="">월</option>
                      {months.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* 일 선택 */}
                  <div className="col-2">
                    <select
                      id="birthDay"
                      className="form-select"
                      value={selectedDay}
                      required
                      onChange={e => setSelectedDay(e.target.value)}
                      disabled={!days.length}
                    >
                      <option value="">일</option>
                      {days.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >성별</span></div>
                  <div className="col-3">
                    <input type="radio" id="gender-m" className="custom-radio" name="gender" value="M"  checked={userGender === "M"} onChange={e => setUserGender(e.target.value)}/>
                    <label htmlFor="gender-m" className="custom-radio-btn">남자</label>
                  </div>
                  <div className="col-3">
                    <input type="radio" id="gender-f" className="custom-radio" name="gender" value="F" checked={userGender === "F"} onChange={e => setUserGender(e.target.value)}/>
                    <label htmlFor="gender-f" className="custom-radio-btn">여자</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >거주지역</span></div>
                  <div className="col-8">
                    <input type="text" className="form-control" placeholder="검색" name="address" readOnly required value={ userAdd }  onClick={schAddress}/>
                  </div>
                  <div className="col-2">
                    <button className="btn login-btn-inform" type="button" style={{backgroundColor: '#FFC000'}} onClick={schAddress}>검색</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >상세주소</span></div>
                  <div className="col-10">
                    <input type="text" className="form-control" placeholder="검색 후 입력" name="addressDtl" value={ userAddDtl } onChange={e => setUserAddDtl(e.target.value)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >기혼 여부</span></div>
                  <div className="col-3">
                    <input type="radio" id="married-y" className="custom-radio" name="married" value="Y" checked={userMarried === "Y"} onChange={e => setUserMarried(e.target.value)}/>
                    <label htmlFor="married-y" className="custom-radio-btn">기혼</label>
                  </div>
                  <div className="col-3">
                    <input type="radio" id="married-n" className="custom-radio" name="married" value="N" checked={userMarried === "N"} onChange={e => setUserMarried(e.target.value)}/>
                    <label htmlFor="married-n" className="custom-radio-btn">미혼</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >관심지역</span></div>
                  <div className="col-10">
                    <span style={{marginRight: '10px', justifyItems: 'center', alignItems: 'center'}}>최대 5개까지 등록 가능합니다.</span>
                    <button type="button" className='btn btn-outline-dark interestAdr' onClick={e => addInterestAdr()}>+</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-10">
                      {interestAddrs.map((addr) => (
                        <div key={addr.code} className="d-inline-block m-1">
                          <span className="btn btn-outline-dark position-relative pe-4" style={{marginRight: "15px"}}>
                            {addr.name}
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute end-0 top-0"
                              style={{ transform: 'translate(50%, -50%)', fontSize: "10px", borderRadius: "20px" }}
                              onClick={() => removeAdr(addr.code)}
                            >
                              ×
                            </button>
                          </span>
                        </div>
                      ))}
                      <input type="hidden" name="interestAddrs" value={JSON.stringify(interestAddrs)} />
                  </div>
                </div>

                <span className='float-end' style={{cursor: 'pointer'}} onClick={() => setShowDeleteModal(true)}>→ 회원 탈퇴</span>
                <DeleteUserModal
                  open={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onDelete={handleDeleteAccount}
                />          
                <button type="button" className={"login-button" } style={{marginTop: "20px"}} onClick={userDetailSubmit}>추가 정보 입력 저장</button>
                <span className='msg-error'></span>
                
              </div>
            </form>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  );
}

export default MyPageUser;