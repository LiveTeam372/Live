import React, { useState, useEffect } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import defaultImg from '../../images/noImage.png';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

import common from '../../resources/common.js';

const JoinAgent = ({ setView }) => {

  const navigate = useNavigate();

  // 로그인 유저 정보
  const userData = JSON.parse(localStorage.getItem("user"));

  // input 값
  const [agNo, setAgNo] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState();
  const [userCell_1, setUserCell_1] = useState();
  const [userCell_2, setUserCell_2] = useState();
  const [userCell_3, setUserCell_3] = useState();
  const [userAdd, setUserAdd] = useState();
  const [userAddDtl, setUserAddDtl] = useState();
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

  // 폼 제출 이벤트
  const userDetailSubmit = async (e) => {
    let jsonData = {};

    if (!submitVaild()) {
      return;
    }

    jsonData = {
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
    };
    
    console.log("[ UserDetailForm / userDetailSubmit() / data ] jsonData :: " + JSON.stringify(jsonData));

    // 폼 제출
    try {
      const res = await axios.post("http://localhost:16543/user/userDetailSubmit.do", jsonData);

      if (res.data.result === "success") {
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
              사업자 정보를 입력해서<br/>
              <strong>다양한 세상을 만나보세요!</strong>
            </span>
          </div>필재네 부동산
        </div>
        <div className="detail-form-container col-8">
          <div className="detail-form-box">
            <div className="profile-img-inform-div">
              <label htmlFor="profile-img-input" style={{ cursor: "pointer" }}>
                <img src={ profileImg } className="rounded-circle profile-img" alt="No Image" style={{width:'80px', height:'80px'}}></img>
              </label>
              <input type="file" accept="image/*" id="profile-img-input" onChange={profileImgChange} style={{ display: "none" }}/>  
              <h6 style={{marginTop: "20px"}}> 사업자 프로필 사진을 등록해 주세요! </h6>
            </div>
            <form onSubmit={userDetailSubmit}>
              <div style={{marginTop: "30px"}}>
                <div className="row">
                  <div className="col-2"><span >등록 번호</span></div>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="ex) 41150-2016-00066" name="agNo" required onChange={(e) => setAgNo(e.target.value)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >사업자명</span></div>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="10자 이내" name="userName" maxLength="10" required onChange={checkName}/>
                    <span className={isValidName ? 'msg-success' : 'msg-error'}>{messageName}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >연락처</span></div>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_1" maxLength="3" required onChange={checkCall_1}/>
                  </div>
                  <span className="col-1" style={{textAlign:'center'}}>-</span>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_2" maxLength="4" required onChange={checkCall_2}/>
                  </div>
                  <span className="col-1" style={{textAlign:'center'}}>-</span>
                  <div className="col-2">
                    <input type="text" className="form-control" placeholder="" name="cell_phone_3" maxLength="4" required onChange={checkCall_3}/>
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
                    <input type="text" className="form-control" placeholder="검색 후 입력" name="addressDtl" onChange={e => setUserAddDtl(e.target.value)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"><span >사업자 소개</span></div>
                  <div className="col-10">
                    <textarea className="form-control" style={{height: "100px"}} placeholder='2000자 이내 입력' onChange={e => setDescription(e.target.value)}></textarea>
                  </div>
                </div>

                <button type="button" className={"login-button" } style={{marginTop: "20px"}} onClick={userDetailSubmit}>사업자 회원 가입</button>
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

export default JoinAgent;