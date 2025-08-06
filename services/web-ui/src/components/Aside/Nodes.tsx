'use client';

import { useDnD } from '../../utils/DnDContext'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';

export function Nodes({ }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [type, setType] = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log(nodeType);
    //@ts-ignore
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </>
  );
}