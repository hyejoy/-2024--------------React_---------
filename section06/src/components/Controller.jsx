
const Controller = ({onClickButton}) => {
  const number = ['-1', '-10', '-100', '+100', '+10', '+1'];

  return (
    <div>
      {number.map((num, idx) => (
        <button key={idx}
        onClick={ () => onClickButton(num)}
        >{num}</button>
      ))}
    </div>
  );
};

export default Controller;
