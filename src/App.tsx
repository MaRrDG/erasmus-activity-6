import React from "react";
import { useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";
import Box from "./components/box";
import DropBox from "./components/dropBox";
import ResultModal from "./components/modal";
import { typeOfData } from "./data/typeOfData";
import Image from "/box.png"

type Data = {
    dragged: boolean;
    name: string;
    box?: string;
    linkedBox: string;
    description1: string;
    description2: string;
};

const App = () => {
    const [droppedBox, setDroppedBox] = useState<{
        nominalData: Data;
        ordinalData: Data;
        discreteData: Data;
        continousData: Data;
    }>(typeOfData);

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
    
    const [da, setDa] = useState<string>();

       useEffect(() => {
        void (async () => {
            const blob = await fetch("http://localhost:3030/files/6405e6e551c28551c8a24c58?raw=true&fileType=pdf", {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFZM1NaUk5vYVlzb3cxdGxKV094ZSJ9.eyJocm06ZW1haWwiOiJtYXJpby5kcmFndXRAaXZmdXR1cmUudWsiLCJocm06cm9sZXMiOlsiaHJtOmFkbWluIl0sImhybTpsb2dpbkNvdW50Ijo1LCJocm06YWxsVGltZUxvZ2luc0NvdW50Ijo3MzksImlzcyI6Imh0dHBzOi8vZGV2LTd4ZWUydjN3LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTc3MDM4MTEyMDM2NDYzMDM2MCIsImF1ZCI6WyJodHRwczovL2hybS1pdmYtZGV2LmNvbSIsImh0dHBzOi8vZGV2LTd4ZWUydjN3LmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NzgyMDQwMjcsImV4cCI6MTY3ODIwNTgyNywiYXpwIjoiZ2FCV2VhcmpUUXdadllFN3E1RnVScnFoSjlwclVZcXgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiZGVsZXRlOmNhbmRpZGF0ZSIsImRlbGV0ZTpjbXMtZGF0YSIsImRlbGV0ZTpjb2xsYWJvcmF0b3IiLCJkZWxldGU6Y29sbGFib3JhdG9yLWNvbXBhbnkiLCJkZWxldGU6Y29tcGFueSIsImRlbGV0ZTpkZXBhcnRtZW50IiwiZGVsZXRlOmVtcGxveWVlIiwiZGVsZXRlOmVtcGxveWVlLWZlZWRiYWNrIiwiZGVsZXRlOmVtcGxveWVlLWZlZWRiYWNrX293biIsImRlbGV0ZTpza2lsbC1sZXZlbCIsImVkaXQ6ZW1wbG95ZWUtZmVlZGJhY2tfb3duIiwiZ2VuZXJhdGU6ZG9jdW1lbnQiLCJwYXRjaDpjb2xsYWJvcmF0b3IiLCJwYXRjaDpjb2xsYWJvcmF0b3Jfb3duIiwicGF0Y2g6ZW1wbG95ZWUiLCJwYXRjaDplbXBsb3llZV9vd24iLCJwb3N0OmNhbmRpZGF0ZSIsInBvc3Q6Y29sbGFib3JhdG9yIiwicG9zdDpjb2xsYWJvcmF0b3ItY29tcGFueSIsInBvc3Q6Y29tcGFueSIsInBvc3Q6ZGVwYXJ0bWVudCIsInBvc3Q6ZW1wbG95ZWUiLCJwb3N0OmVtcGxveWVlLWZlZWRiYWNrIiwicG9zdDpza2lsbC1sZXZlbCIsInB1dDpjYW5kaWRhdGUiLCJwdXQ6Y29sbGFib3JhdG9yIiwicHV0OmNvbGxhYm9yYXRvci1jb21wYW55IiwicHV0OmNvbXBhbnkiLCJwdXQ6ZGVwYXJ0bWVudCIsInB1dDplbXBsb3llZSIsInB1dDpza2lsbC1sZXZlbCIsInJlYWQ6Y2FuZGlkYXRlIiwicmVhZDpjbXMtZGF0YSIsInJlYWQ6Y29sbGFib3JhdG9yLWNvbXBhbnkiLCJyZWFkOmNvbGxhYm9yYXRvci1wcml2YXRlLWRhdGEiLCJyZWFkOmNvbGxhYm9yYXRvci1wcml2YXRlLWRhdGFfb3duIiwicmVhZDpjb2xsYWJvcmF0b3ItcHVibGljLWRhdGEiLCJyZWFkOmNvbXBhbnkiLCJyZWFkOmNvcmNvZGVzIiwicmVhZDpkZXBhcnRtZW50IiwicmVhZDpkb2N1bWVudC1tZXRhZGF0YSIsInJlYWQ6ZG9tYWluLWV2ZW50cyIsInJlYWQ6ZW1wbG95ZWUtZmVlZGJhY2siLCJyZWFkOmVtcGxveWVlLWZlZWRiYWNrX293biIsInJlYWQ6ZW1wbG95ZWUtZmlsZXNfb3duIiwicmVhZDplbXBsb3llZS1wcml2YXRlLWRhdGEiLCJyZWFkOmVtcGxveWVlLXByaXZhdGUtZGF0YV9vd24iLCJyZWFkOmVtcGxveWVlLXB1YmxpYy1kYXRhIiwicmVhZDplLXNpZ24iLCJyZWFkOmV2ZW50IiwicmVhZDpmaWxlcyIsInJlYWQ6aW50ZXJuYWwtcG9zaXRpb25zIiwicmVhZDpsZWF2ZS1yZXF1ZXN0IiwicmVhZDpsZWF2ZS1yZXF1ZXN0X293biIsInJlYWQ6bWV0cmljczplbXBsb3llZS1jb250cmFjdC1hZGRpdGlvbmFsLWRvY3VtZW50LWhpc3RvcnkiLCJyZWFkOm1ldHJpY3M6ZW1wbG95ZWUtdmFjYXRpb24iLCJyZWFkOnByb2plY3RzIiwicmVhZDpwcm9qZWN0c19vd24iLCJyZWFkOnNraWxsLWxldmVsIiwicmVhZDp0ZWFtcyIsInJlYWQ6dGVhbXNfb3duIiwicmVhZDp0cmlhbC1wZXJpb2QtdHlwZXMiLCJyZWFkOnZhbGlkYXRlLWVudGl0eS11bmlxdWVuZXNzIiwid3JpdGU6Y21zLWRhdGEiLCJ3cml0ZTpjb3Jjb2RlcyIsIndyaXRlOmVtcGxveWVlLWZpbGVzX293biIsIndyaXRlOmV2ZW50Iiwid3JpdGU6ZmlsZXMiLCJ3cml0ZTppbnRlcm5hbC1wb3NpdGlvbnMiLCJ3cml0ZTpsZWF2ZS1yZXF1ZXN0Iiwid3JpdGU6bGVhdmUtcmVxdWVzdF9vd24iLCJ3cml0ZTpwcm9qZWN0cyIsIndyaXRlOnRlYW1zIiwid3JpdGU6dHJpYWwtcGVyaW9kLXR5cGVzIl19.KP59J-upOTIFfW9lOTwvQEmR0_p-GBpOuroEAVcBgD_5YjQQGSNI3AeqegZMzmTKwtA7Av_UkEip5pq89C5_Yzc_-oJzm5eHMAKLt2uP4V2Eh4X2X04J6b5k7zhc-HCo7WSbxoYrmftPNxQs0esyujmJtdGryi2nzONUqZMBRFjvActsJhaZlkgoh6AOIQbnnnmijnjW1NRd5_VXL5XEF_z3t4D8_HJnD_rnujeuljuqMYx6iHTOOcYPCkA8Mk_HgI-6_JqP1xXr30Z5mr1bugA5OcFm05mKZbzddc59PizD6yLrsLLyXl1LoGS_PN76nsstTRhWnuxgkDcOYvdyMA`,
                },
            }).then((r) => r.blob());
            const fileBlob = blob.slice(0, blob.size, "application/pdf");
          console.log(URL.createObjectURL(fileBlob));

            setDa(URL.createObjectURL(fileBlob));
        })();
    }, []);

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
    if(!da) return null;
    return (
        <div className="w-full h-screen p-12 pb-0 flex flex-col font-teko overflow-hidden relative">
             <iframe
              title="Office Document Viewer"
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                da!
              )}&embedded=true`}
              width="100%"
              height="500px"
              frameBorder="0"
            ></iframe>
            <ResultModal open={open} message={modalMessage} />
            <header className="w-full h-[90px] font-teko flex">
                <div className="w-[9px] h-full bg-[#0A8DAA]"></div>
                <div className="flex justify-center flex-col gap-y-6 mt-1 ml-[4px]">
                    <p className="text-[48px] lg:text-[62px] m-0 p-0 h-[32px]">
                        Drag each type of data to the correct box
                    </p>
                    <p className="text-[38px] lg:text-[53px] m-0 p-0 text-[#595959]">ACTIVITY 6</p>
                </div>
            </header>
            <main className="w-full h-[38rem] flex flex-col items-center justify-between mt-6 p-12">
                <div className="flex flex-col lg:flex-row">
                    {Object.entries(droppedBox).map(([key, value], idx) => {
                        if (value.dragged) return;

                        return (
                            <Box
                                name={value.name}
                                key={idx}
                                text1={value.description1}
                                text2={value.description2}
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
            <footer className="flex mt-auto justify-center items-center">
                <Countdown ref={setRef} date={startDate.current + 30000} renderer={renderer} />
            </footer>
        </div>
    );
};

export default App;
