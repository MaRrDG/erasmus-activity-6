import React from "react";
import { useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";
import { useTranslation } from "react-i18next";
import Box from "./components/box";
import DropBox from "./components/dropBox";
import LangModal from "./components/langModal";
import ResultModal from "./components/modal";
import "./i18n";

type Data = {
    dragged: boolean;
    name: string;
    box?: string;
    linkedBox: string;
    description1: string;
    description2: string;
};

const App = () => {
    const { t, i18n } = useTranslation();

    const [open, setOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [langSelector, setLangSelector] = useState(true);
    const startDate = React.useRef(Date.now());
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
            description1: t("nominalDesc1"),
            description2: t("nominalDesc2"),
        },
        discreteData: {
            dragged: false,
            name: "DISCRETE DATA",
            linkedBox: "QUANTITATIVE",
            description1: t("discreteDesc1"),
            description2: t("discreteDesc2"),
        },
        ordinalData: {
            dragged: false,
            name: "ORDINAL DATA",
            linkedBox: "QUALITATIVE",
            description1: t("ordinalDesc1"),
            description2: t("ordinalDesc2"),
        },
        continousData: {
            dragged: false,
            name: "CONTINUOUS DATA",
            linkedBox: "QUANTITATIVE",
            description1: t("continousDesc1"),
            description2: t("continousDesc2"),
        },
    });
    const [result, setResult] = useState({
        result: true,
        resultNumber: 4,
    });
    let countdownApi: CountdownApi | null = null;

    const setRef = (countdown: Countdown | null): void => {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    };

    useEffect(() => {
        setDroppedBox({
            nominalData: {
                dragged: false,
                name: "NOMINAL DATA",
                linkedBox: "QUALITATIVE",
                description1: t("nominalDesc1"),
                description2: t("nominalDesc2"),
            },
            discreteData: {
                dragged: false,
                name: "DISCRETE DATA",
                linkedBox: "QUANTITATIVE",
                description1: t("discreteDesc1"),
                description2: t("discreteDesc2"),
            },
            ordinalData: {
                dragged: false,
                name: "ORDINAL DATA",
                linkedBox: "QUALITATIVE",
                description1: t("ordinalDesc1"),
                description2: t("ordinalDesc2"),
            },
            continousData: {
                dragged: false,
                name: "CONTINUOUS DATA",
                linkedBox: "QUANTITATIVE",
                description1: t("continousDesc1"),
                description2: t("continousDesc2"),
            },
        });
    }, [i18n.language]);

    useEffect(() => {
        countdownApi!.pause();
    }, []);

    useEffect(() => {
        if (Object.values(droppedBox).filter((elem) => elem.dragged && elem.box).length > 3) {
            countdownApi!.pause();
            setModalMessage(
                result.resultNumber === 4
                    ? (t("congrats") as string)
                    : `${t("wrong")} ${result.resultNumber}/4 ${t("typeOfData")}!`
            );
            setOpen(true);
        }
    }, [droppedBox]);

    const renderer = ({ seconds, completed }: any) => {
        if (window.innerWidth >= 1024) {
            if (completed) {
                setModalMessage(t("timeIsUp") as string);
                setOpen(true);
            } else {
                return (
                    <p className="font-teko mt-12 lg:mt-0 text-[85px] uppercase">
                        {t("timeLeft")}: <span className="text-[#0A8DAA]">{seconds} S</span>
                    </p>
                );
            }
        }
    };

    return (
        <div>
            <div className="flex lg:hidden w-full h-screen p-12 pb-0 font-teko overflow-hidden relative items-center justify-center text-4xl">
                Din pacate aplicatia nu este disponibila pe rezolutii mai mici de 1024px
            </div>
            <div className="hidden w-full h-screen p-12 pb-0 lg:flex flex-col font-teko overflow-hidden relative">
                <LangModal
                    open={langSelector}
                    onClose={(lang: string) => {
                        i18n.changeLanguage(lang);
                        setLangSelector(false);

                        if (window.innerWidth >= 1024) {
                            countdownApi!.start();
                        }
                    }}
                />
                <ResultModal open={open} message={modalMessage} />
                <header className="w-full h-[90px] font-teko flex">
                    <div className="w-[9px] h-full bg-[#0A8DAA]"></div>
                    <div className="flex justify-center flex-col gap-y-6 mt-1 ml-[4px]">
                        <p className="text-[48px] lg:text-[62px] m-0 p-0 h-[32px]">{t("dragItems")}</p>
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
        </div>
    );
};

export default App;
