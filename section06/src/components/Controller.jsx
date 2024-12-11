const Controller = () => {
  const number = [-1, -10, -100, +100, +10, +1];

  return (
    <div>
      {number.map((num, idx) => (
        <button key={idx}>{num}</button>
      ))}
    </div>
  );
};

export default Controller;
