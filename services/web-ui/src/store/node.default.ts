import { io } from "socket.io-client";

export const defaultNode = {
  id: 'new-node',
  type: 'default',
  position: { x: 0, y: 0 },
  data: {
    name: 'New Node',
    description: 'This is a new node',
    io: [
      { id: 'input', name: 'internal input', ports: [0], io: 'target' },
      { id: 'output', name: 'internal output', ports: [1], io: 'source' },
      { id: 'input2', name: 'external input', ports: [2], io: 'target' },
      { id: 'output2', name: 'external output', ports: [3], io: 'source' }
    ],
    ports:[
      { id: 0, type: 'input', align: 'bottom', position: 'left' },
      { id: 1, type: 'output', align: 'bottom', position: 'right' },
      { id: 2, type: 'input', align: 'top', position: 'left' },
      { id: 3, type: 'output', align: 'top', position: 'right' }
    ]
  },
};