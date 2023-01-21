import React from "react";
import { useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";
import Box from "./components/box";
import DropBox from "./components/dropBox";
import ResultModal from "./components/modal";

type Data = {
  dragged: boolean;
  name: string;
  box?: string;
  linkedBox: string;
};

const App = () => {
  const [droppedBox, setDroppedBox] = useState<{
    nominalData: Data;
    ordinalData: Data;
    discreteData: Data;
    continousData: Data;
  }>({
    nominalData: {
      dragged: false,
      name: "NOMINAL DATA",
      linkedBox: "QUALITATIVE",
    },
    discreteData: {
      dragged: false,
      name: "DISCRETE DATA",
      linkedBox: "QUANTITATIVE",
    },
    ordinalData: {
      dragged: false,
      name: "ORDINAL DATA",
      linkedBox: "QUALITATIVE",
    },
    continousData: {
      dragged: false,
      name: "CONTINUOUS DATA",
      linkedBox: "QUANTITATIVE",
    },
  });

  const [result, setResult] = useState({
    result: true,
    resultNumber: 4,
  });

  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const startDate = React.useRef(Date.now());
  let countdownApi: CountdownApi | null = null;

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  useEffect(() => {
    if (Object.values(droppedBox).filter((elem) => elem.dragged && elem.box).length > 3) {
      countdownApi!.pause();
      setModalMessage(
        result.resultNumber === 4
          ? "Congratulations you put all type of data in the correct box!"
          : `You put in the boxes correctly ${result.resultNumber}/4 type of data!`
      );
      setOpen(true);
    }
  }, [droppedBox]);

  const renderer = ({ seconds, completed }: any) => {
    if (completed) {
      setModalMessage("Time is up!");
      setOpen(true);
    } else {
      return (
        <p className="font-teko mt-12 lg:mt-0 text-[85px]">
          TIME LEFT: <span className="text-[#0A8DAA]">{seconds} S</span>
        </p>
      );
    }
  };

  const CountdownContainer = React.memo(() => {
    return <Countdown ref={setRef} date={startDate.current + 15000} renderer={renderer} />;
  });

  return (
    <div className="w-full h-full p-12 pb-0 flex flex-col justify-between font-teko overflow-hidden">
      <ResultModal open={open} message={modalMessage} />
      <header className="w-full h-[90px] font-teko flex">
        <div className="w-[9px] h-full bg-[#0A8DAA]"></div>
        <div className="flex justify-center flex-col gap-y-6 mt-1 ml-[4px]">
          <p className="text-[48px] lg:text-[62px] m-0 p-0 h-[32px]">Drag each type of data to the correct box</p>
          <p className="text-[38px] lg:text-[53px] m-0 p-0 text-[#595959]">ACTIVITY 6</p>
        </div>
      </header>
      <main className="w-full h-[38rem] flex flex-col items-center justify-between p-12">
        <div className="flex flex-col lg:flex-row">
          {Object.entries(droppedBox).map(([key, value], idx) => {
            if (value.dragged) return;

            return (
              <Box
                name={value.name}
                key={idx}
                setDroppedBox={(name: string, dropbox: string) => {
                  if (value.linkedBox !== dropbox.split(" ")[1]) {
                    setResult((prev) => {
                      return {
                        ...prev,
                        result: false,
                        resultNumber: prev.resultNumber - 1,
                      };
                    });
                  }

                  setDroppedBox((prev) => {
                    return {
                      ...prev,
                      [key]: {
                        dragged: true,
                        name: name,
                        box: dropbox.split(" ")[1],
                      },
                    };
                  });
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          {["QUALITATIVE", "QUANTITATIVE"].map((elem, idx) => (
            <DropBox name={elem} key={idx} allowedDropEffect="move" />
          ))}
        </div>
      </main>
      <footer className="mt-12 w-full flex justify-center items-end">
        <CountdownContainer />
      </footer>
    </div>
  );
};

export default App;
