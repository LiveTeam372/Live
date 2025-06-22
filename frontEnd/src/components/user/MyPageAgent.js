import React, { useState, useEffect } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import DeleteUserModal from './DeleteUserModal';

import common from '../../resources/common.js';

const MyPageAgent = ({ setView }) => {

  const navigate = useNavigate();

  // 로그인 유저 정보
  const userData = JSON.parse(localStorage.getItem("user"));
  const userType = userData.gbCd;

  // input 값
  const [agNo, setAgNo] = useState(userData.agNo);
  const [description, setDescription] = useState(userData.description);
  const [userName, setUserName] = useState(userData.name);
  const [userCell_1, setUserCell_1] = useState("0" + userData.cellPhone_1);
  const [userCell_2, setUserCell_2] = useState(userData.cellPhone_2);
  const [userCell_3, setUserCell_3] = useState(userData.cellPhone_3);
  const [userAdd, setUserAdd] = useState(userData.address);
  const [userAddDtl, setUserAddDtl] = useState(userData.addressDtl);
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  // 등록번호 상태값
  const [isValidAgNo, setIsValidAgNo] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageAgNo, setMessageAgNo] = useState('');

  // 이름 상태값
  const [isValidName, setIsValidName] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageName, setMessageName] = useState('');
  
  // 연락처 상태값
  const [isValidCall, setIsValidCall] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageCall, setMessageCall] = useState('');

  // 폼 제출 유효성 플래그
  const [vaildFlag, setVaildFlag] = useState(false);

  // 회원 탈퇴 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const checkName = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (!common.isValidKorean(value, 2, 10)) {
      setMessageName("2~10자 이내 한글만 입력 가능합니다.");
      setIsValidName(false);
    } else {
      setMessageName("");
      setIsValidName(true);
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

  // 주소 검색 버튼
  const schAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 및 우편번호 저장
        setUserAdd(data.address);
      },
    }).open();
  }

  // 폼 제출 유효성 검증
  const submitVaild = () => {
    let alertMsg = "";
    
    if(agNo == "" || agNo == undefined) {
      alertMsg = "등록 번호를 입력해 주세요.";
    } else if(userName == "" || userName == undefined ) {
      alertMsg = "사업자명을 입력해 주세요.";
    } else if ((userCell_1 == "" || userCell_1 == undefined) &&
              (userCell_2 == "" || userCell_2 == undefined) &&
              (userCell_3 == "" || userCell_3 == undefined) ) {
      alertMsg = "연락처를 입력해 주세요.";
    } else if (userAdd == "" || userAdd == undefined) {
      alertMsg = "주소를 입력해 주세요.";
    } 
    
    if (alertMsg) {
      alert(alertMsg);
      return false;
    } else {
      return true;
    }
  }

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
        navigate('/'); // 리다이렉트
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  // 폼 제출 이벤트
  const userDetailSubmit = async (e) => {

    if (!submitVaild()) {
      return;
    }

    let jsonData = {
      gbCd: "2",
      userNo: userData.userNo,
      agNo : agNo,
      description: description,
      name: userName,
      cellPhone_1 : userCell_1,
      cellPhone_2 : userCell_2,
      cellPhone_3 : userCell_3,
      address : userAdd,
      addressDtl : userAddDtl,
      joinYN : "N"
    };

    console.log("[ UserDetailForm / userDetailSubmit() / data ] jsonData :: " + JSON.stringify(jsonData));

    // 폼 제출
    try {
      const res = await axios.post("http://localhost:16543/user/userDetailSubmit.do", jsonData);

      if (res.data.result === "success") {
        const loginData = await axios.post('http://localhost:16543/user/getLoginUser.do');
        
        // console.log("userInfo :: " + JSON.stringify(res.data));

        // 로그인 정보 재반환, 로컬 스토리지에 저장장
        localStorage.setItem('user', JSON.stringify(loginData.data));

        alert("정보가 변경 되었습니다!");
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
              <h6 style={{marginTop: "20px"}}> {userName}님 반갑습니다! </h6>
            </div>
            <form onSubmit={userDetailSubmit}>
              <div style={{marginTop: "30px"}}>
                <div className="row">
                  <div className="col-2"><span >등록 번호</span></div>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="ex) 41150-2016-00066" name="agNo" readOnly disabled value={agNo} onChange={(e) => setAgNo(e.target.value)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >사업자명</span></div>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="10자 이내" name="userName" maxLength="10" value={userName} required onChange={checkName}/>
                    <span className={isValidName ? 'msg-success' : 'msg-error'}>{messageName}</span>
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
                  <div className="col-2"><span >사업자 주소</span></div>
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
                    <input type="text" className="form-control" placeholder="검색 후 입력" name="addressDtl" value={userAddDtl} onChange={e => setUserAddDtl(e.target.value)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >사업자 소개</span></div>
                  <div className="col-10">
                    <textarea className="form-control" style={{height: "100px"}} placeholder='2000자 이내 입력' onChange={e => setDescription(e.target.value)}>
                      {description}
                    </textarea>
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

export default MyPageAgent;