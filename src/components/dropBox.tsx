import { useDrop } from "react-dnd";

export interface DropBoxProps {
    name: string;
    allowedDropEffect: string;
}

const DropBox = ({ name, allowedDropEffect }: DropBoxProps) => {
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: "box",
            drop: () => ({
                name: `${allowedDropEffect} ${name}`,
                allowedDropEffect,
            }),
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [allowedDropEffect]
    );

    return (
        <div
            ref={drop}
            className="flex flex-col items-center justify-center mr-[100px] ml-[100px] lg:mb-0 lg:mr-[256px] lg:ml-[256px]"
        >
            <img src="/box.png" alt="BOX" />
            <p className="text-[64px] m-0 p-0">{name}</p>
        </div>
    );
};

export default DropBox;
