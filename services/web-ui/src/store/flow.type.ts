import { PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node, Connection, EdgeChange, NodeChange } from '@xyflow/react';


export type FlowData = {
  flowID: string;
  flowName: string;
  path: string;
  selectedNodes: any[];
  selectedEdges: any[];
  nodes: Node[];
  edges: Edge[];
};

export type FlowState = Record<string, FlowData>;

export type ActionFlowData = PayloadAction<{ flowID: string; data: FlowData }>