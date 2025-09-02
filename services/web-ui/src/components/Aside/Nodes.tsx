'use client';

import { useDnD } from '../../utils/DnDContext'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import React from 'react';

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
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <Node nodeType="default" onDragStart={onDragStart} />
      <Node nodeType="output" onDragStart={onDragStart} />
    </>
  );
}

const Node = React.memo(function Node({ nodeType, onDragStart }: { nodeType: string, onDragStart: (event: React.DragEvent, nodeType: string) => void }) {
  return (
    <div className={`dndnode ${nodeType}`} onDragStart={(event) => onDragStart(event, nodeType)} draggable>
      {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node
    </div>
  );
});
