import { useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import InfoBox from "./infoBox";

export interface BoxProps {
    name: string;
    setDroppedBox: Function;
    text1: string;
    text2: string;
}

interface DropResult {
    allowedDropEffect: string;
    dropEffect: string;
    name: string;
}

const Box = ({ name, setDroppedBox, text1, text2 }: BoxProps) => {
    const [showInfoBox, setShowInfoBox] = useState(false);

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: "box",
            item: { name },
            end(item, monitor) {
                const dropResult = monitor.getDropResult() as DropResult;
                if (item && dropResult) {
                    const isDropAllowed =
                        dropResult.allowedDropEffect === "any" ||
                        dropResult.allowedDropEffect === dropResult.dropEffect;
                    if (isDropAllowed) {
                        setDroppedBox(item.name, dropResult.name);
                    }
                }
            },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [name]
    );

    const visibility = isDragging ? "hidden" : "visible";

    return (
        <>
            <div
                style={{ visibility }}
                ref={drag}
                onMouseEnter={() => {
                    setShowInfoBox(true);
                }}
                onMouseLeave={() => {
                    setShowInfoBox(false);
                }}
                onDrag={() => {
                    setShowInfoBox(false);
                }}
                className={`relative w-[234px] h-[82px] bg-[#0A8DAA] flex items-center justify-center text-white text-[37px] rounded-[33px] mt-[12px] lg:mt-0 lg:ml-[66px] cursor-pointer`}
            >
                {showInfoBox ? <InfoBox text1={text1} text2={text2} /> : null}
                {name}
            </div>
        </>
    );
};

export default Box;
