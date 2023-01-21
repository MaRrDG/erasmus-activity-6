import { useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";
import Box from "./components/box";
import DropBox from "./components/dropBox";
import ResultModal from "./components/ResultModal";
import TimesUp from "./components/TimesUpModal";

type Data = {
  dragged: boolean;
  name: string;
  box?: string;
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
    },
    discreteData: {
      dragged: false,
      name: "DISCRETE DATA",
    },
    ordinalData: {
      dragged: false,
      name: "ORDINAL DATA",
    },
    continousData: {
      dragged: false,
      name: "CONTINUOUS DATA",
    },
  });
  const [result, setResult] = useState({
    result: true,
    boxCorrected: 4,
  });
  const [open, setOpen] = useState(false);
  const [timesUp, setTimesUp] = useState(false);
  let countdownApi: CountdownApi | null = null;

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  useEffect(() => {
    if (Object.values(droppedBox).filter((elem) => elem.dragged && elem.box).length > 3) {
      let resultNumber = 4;

      if (droppedBox.nominalData.dragged && droppedBox.nominalData.box !== "QUALITATIVE") {
        resultNumber = resultNumber - 1;
      }
      if (droppedBox.ordinalData.dragged && droppedBox.ordinalData.box !== "QUALITATIVE") {
        resultNumber = resultNumber - 1;
      }
      if (droppedBox.discreteData.dragged && droppedBox.discreteData.box !== "QUANTITATIVE") {
        resultNumber = resultNumber - 1;
      }
      if (droppedBox.continousData.dragged && droppedBox.continousData.box !== "QUANTITATIVE") {
        resultNumber = resultNumber - 1;
      }

      if (resultNumber < 4) {
        setResult({
          result: false,
          boxCorrected: resultNumber,
        });
      }
      countdownApi!.pause();
      setOpen(true);
    }
  }, [droppedBox]);

  const renderer = ({ seconds, completed }: any) => {
    if (completed) {
      setTimesUp(true);
    } else {
      return (
        <p className="font-teko mt-12 lg:mt-0 text-[85px]">
          TIME LEFT: <span className="text-[#0A8DAA]">{seconds} S</span>
        </p>
      );
    }
  };

  return (
    <div className="w-full h-full p-12 pb-0 flex flex-col justify-between font-teko overflow-hidden">
      <ResultModal open={open} result={result.boxCorrected} />
      <TimesUp open={timesUp} />
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
        <Countdown ref={setRef} date={Date.now() + 15000} renderer={renderer} />
      </footer>
    </div>
  );
};

export default App;
