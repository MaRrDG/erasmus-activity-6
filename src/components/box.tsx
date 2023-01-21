import { DragSourceMonitor, useDrag } from "react-dnd";

export interface BoxProps {
  name: string;
  setDroppedBox: Function;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

const Box = ({ name, setDroppedBox }: BoxProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "box",
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          const isDropAllowed = dropResult.allowedDropEffect === "any" || dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            setDroppedBox(item.name, dropResult.name);
          }
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  );
  return (
    <div
      ref={drag}
      className="w-[234px] h-[82px] bg-[#0A8DAA] flex items-center justify-center text-white text-[37px] rounded-[33px] mt-[12px] lg:mt-0 lg:ml-[66px] cursor-pointer"
    >
      {name}
    </div>
  );
};

export default Box;
