import React, { useState } from 'react';
import './Change.css'; // 스타일 파일 임포트

const ChangeNickname = () => {
  const [phone, setPhone] = useState('');
    return (
      <div className="container">
        <h2>새로운 연락처를</h2>
        <h2>입력해주세요</h2>
        <br />
        <br />
        <br />
        <br />
        <div className="form-group">
          <label htmlFor="phone">연락처</label>
          <br />
          <input
          type="number"
          id="phone"
          maxlength={11}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <br />
        <div className="button-container">
          <button >변경하기</button>
        </div>
      </div>
    );
};

export default ChangeNickname;