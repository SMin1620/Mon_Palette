import React, { useState } from 'react';
import './Change.css'; // 스타일 파일 임포트

const ChangeNickname = () => {
  const [nickname, setNickname] = useState('');
    return (
      <div className="container">
        <h2>새로운 닉네임을</h2>
        <h2>입력해주세요</h2>
        <br />
        <br />
        <br />
        <br />
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <br />
          <div className="input-with-button">
            <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            />  <button class="duplication-button" >중복확인</button>
          </div>      
        </div>
        <br />
        <div className="button-container">
          <button >변경하기</button>
        </div>
        
      </div>
    );
};

export default ChangeNickname;