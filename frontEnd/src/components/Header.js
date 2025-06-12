import { Link } from "react-router-dom"
import "../styles/HeaderStyle.css"
import "../resources/common.js"

const Header = ({ user, setUser }) => {
  // const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen)
  // }

  console.log("")

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null); // 상태 업데이트
    window.location.href = '/';
  }

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <i className="fas fa-building logo-icon"></i>
            <span>LIVE</span>
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/product">
            <div className="nav-item">
              방 찾기
            </div>
          </Link>
          <Link to="/like">
            <div className="nav-item">
              관심 목록
            </div>
          </Link>
          <Link to="/reservation">
            <div className="nav-item">
              문의 / 예약
            </div>
          </Link>
          {user ? (
            <>
              <Link to="/my-page"><div className="nav-item">마이페이지</div></Link>
              <div className="nav-item" onClick={logOut}>로그아웃</div>
            </>
          ) : (
            <Link to="/login"><div className="nav-item">로그인 / 회원가입</div></Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header;