import React, { useState } from 'react';
import './LoginForm.css'; // 스타일 파일 임포트

const LoginForm = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    // 여기서는 간단히 콘솔에 사용자 정보를 출력하지만, 실제 프로젝트에서는 이 부분을 실제 로그인 기능으로 대체해야 합니다.
  };

  return (
    <div className="container">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8-20자 영문 대소문자, 숫자, 특수문자 조합"
          />
        </div>
        <br />
        <br />
        <br />
        <div className="button-container">
          <button onClick={handleLogin}>Login</button>
        </div>
        <br />
        <div className="link-container">
          <p>비밀번호 재설정</p>
          <p>|</p>
          <p>회원가입</p>
        </div>
      </div>
  );
};

export default LoginForm;
