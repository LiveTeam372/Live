import { Link } from "react-router-dom"
import "../styles/HeaderStyle.css"

const Header = () => {
  // const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen)
  // }

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
          <Link to="/login">
            <div className="nav-item">
              로그인 / 회원가입
            </div>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;