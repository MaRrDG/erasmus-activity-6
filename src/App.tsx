const App = () => {
  return (
    <div className="w-full h-full p-12 pb-0 flex flex-col justify-between font-teko">
      <header className="w-full h-[90px] font-teko flex">
        <div className="w-[9px] h-full bg-[#0A8DAA]"></div>
        <div className="flex justify-center flex-col gap-y-6 mt-1 ml-[4px]">
          <p className="text-[62px] m-0 p-0 h-[32px]">Drag each type of data to the correct box</p>
          <p className="text-[53px] m-0 p-0 text-[#595959]">ACTIVITY 6</p>
        </div>
      </header>
      <main className="w-full h-[38rem] flex flex-col items-center justify-between p-12">
        <div className="flex">
          {["NOMINAL DATA", "ORDINAL DATA", "DISCRETE DATA", "CONTINUOUS DATA"].map((elem, idx) => (
            <div
              key={idx}
              className="w-[234px] h-[82px] bg-[#0A8DAA] flex items-center justify-center text-white text-[37px] rounded-[33px] ml-[66px] cursor-pointer"
            >
              {elem}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          {["QUALITATIVE", "QUANTITATIVE"].map((elem, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center mr-[256px]  ml-[256px]">
              <img src="/box.png" alt="BOX" />
              <p className="text-[64px] m-0 p-0">{elem}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="mt-12 w-full flex justify-center items-end">
        <p className="font-teko text-[85px]">
          TIME LEFT: <span className="text-[#0A8DAA]">60 S</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
