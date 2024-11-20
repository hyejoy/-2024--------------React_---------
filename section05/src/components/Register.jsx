import {useState} from "react";
// 
/**
 * 간단한 회원가인폼
 * 1. 이름
 * 2. 생년월일
 * 3. 국적
 * 4. 자기소개
 */

const Register = () => {
    const [name, setName] = useState("이름초기값");
    const [date, setDate] = useState("");
    const[country, setCountry] = useState("")
    const[bio, setBio] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeBirth = (e) => {
        setDate(e.target.value);
    }

    const onChangeCountry = (E) => {
        setCountry(E.target.value);
    }

    const onChangeBio = (e) => {
        setBio(e.target.value);
    }
    return (
        <>
        <div>
            {name}
            <input 
            value={name}
            onChange={onChangeName}
            type="text" placeholder="이름" />
        </div>
        <div>
            <input type="date" onChange={onChangeBirth}/>
            {date}
        </div>
        <div>
            {country}
            <select 
            onChange={onChangeCountry}
            name="" id="">
                <option value=""></option>
                <option value={"kr"}>한국</option>
                <option value={"us"}>미국</option>
            </select>
        </div>
        <div>
            {bio}
            <textarea 
            onChange={onChangeBio}
            name="" id=""></textarea>
        </div>
        </>
    )
};

export default Register;