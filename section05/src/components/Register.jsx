import { useState, useRef } from "react";
//
/**
 * 간단한 회원가인폼
 * 1. 이름
 * 2. 생년월일
 * 3. 국적
 * 4. 자기소개
 */

const Register = () => {
  // 여러개 비슷한 state가 있을때는 하나의 객체로 묶어 하나의 state로
  // 통합관리 하면 편하다.
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  const countRef = useRef(0);
  const inputRef = useRef();

  // 비슷하게 생긴 이벤트 핸들러들을 통합 이벤트 핸들러로 묶을 수 있다.
  const onChange = (e) => {
    countRef.current++;
    console.log(countRef.current);
    console.log(e.target.name, e.target.value);
    setInput({
      ...input,
      //✨프로퍼티 키를 자리에 대괄호를 쓰고 그안에 어떤 변수의 값을 쓰면
      // 그값이 프로퍼티의 키값으로 설정된다
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (input.name === "") {
      console.log(inputRef.current); // input dom 요소 출력됨
      //<input name="name" type="text" placeholder="이름" value="">
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          type="text"
          placeholder="이름"
        />
      </div>
      <div>
        <input name="date" type="date" onChange={onChange} />
        {input.date}
      </div>
      <div>
        {input.country}
        <select onChange={onChange} name="country" id="">
          <option value=""></option>
          <option value={"kr"}>한국</option>
          <option value={"us"}>미국</option>
        </select>
      </div>
      <div>
        {input.bio}
        <textarea onChange={onChange} name="bio" id=""></textarea>
      </div>

      <button onClick={onSubmit}>제출</button>
    </>
  );
};

export default Register;
