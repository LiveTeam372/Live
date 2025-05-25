import "../styles/FooterStyle.css";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-section">
            <h3>회사 정보</h3>
            <p>최고의 부동산 서비스를 제공하는 LIVE는 고객님의 꿈의 집을 찾아드리기 위해 항상 노력하고 있습니다.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>빠른 링크</h3>
            <ul className="footer-links">
              <li>
                <a href="/">홈</a>
              </li>
              <li>
                <a href="/about">회사 소개</a>
              </li>
              <li>
                <a href="/services">서비스</a>
              </li>
              <li>
                <a href="/products">제품</a>
              </li>
              <li>
                <a href="/contact">문의하기</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>서비스</h3>
            <ul className="footer-links">
              <li>
                <a href="/service1">서비스 1</a>
              </li>
              <li>
                <a href="/service2">서비스 2</a>
              </li>
              <li>
                <a href="/service3">서비스 3</a>
              </li>
              <li>
                <a href="/service4">서비스 4</a>
              </li>
              <li>
                <a href="/service5">서비스 5</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>연락처</h3>
            <ul className="contact-info">
              <li>
                {/* <i className="fas fa-map-marker-alt contact-icon"></i> */}
                <span>서울특별시 강남구 테헤란로 123</span>
              </li>
              <li>
                {/* <i className="fas fa-phone contact-icon"></i> */}
                <span>02-123-4567</span>
              </li>
              <li>
                {/* <i className="fas fa-envelope contact-icon"></i> */}
                <span>info@mycompany.com</span>
              </li>
              <li>
                {/* <i className="fas fa-clock contact-icon"></i> */}
                <span>평일 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} My Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;