import React, { useEffect, useState } from "react";

type IProps = {
    text1: React.ReactNode;
    text2: React.ReactNode;
};

const InfoBox = ({ text1, text2 }: IProps) => {
    const [textNo, setTextNo] = useState(0);

    useEffect(() => {
        setInterval(() => {}, 500);
    }, []);

    useEffect(() => {
        setInterval(() => {
            setTextNo(textNo === 0 ? 1 : 0);
        }, 5000);
    });

    return (
        <div className="z-50 absolute top-[6rem] w-[26px] flex-1">
            <div className="speech-bubble  text-black w-96 text-[18px] mr-5 whitespace-pre-line truncate">
                <div className="p-2">{textNo === 0 ? text1 : text2}</div>
                <div className="w-full bg-gray-200">
                    <div id="progress" className={`bg-blue-600 text-xs font-medium text-blue-100 text-center`}>
                        {" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBox;
