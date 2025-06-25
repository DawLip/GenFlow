export const defaultNode = ({id, inputs, outputs, style, position}:any) => ({
  id: id || 'node-2',
  type: 'dafault',
  data: { 
    name: 'Default node',
    desctription: 'desc...',
    io: inputs || [
      {
        id:'input-1',
        name: 'in1',
        dataType: '',
        io:'target',
        ports: [2],
        internalComponent:{
          type: ''
        },
        maxConnectionsNum: 1,
      },
      {
        id:'output-1',
        name: 'out1',
        dataType: '',
        io:'source',
        ports: [3],
        internalComponent:{
          type: ''
        },
        maxConnectionsNum: 1,
      },
      {
        id:'input-2',
        name: 'in2',
        dataType: '',
        io:'target',
        ports: [2],
        internalComponent:{
          type: ''
        },
        maxConnectionsNum: 1,
      },
      {
        id:'output-2',
        name: 'out2',
        dataType: '',
        io:'source',
        ports: [3],
        internalComponent:{
          type: ''
        },
        maxConnectionsNum: 1,
      }
    ],
    ports:[
      {
        id: 0,
        name: 'Internal Input'
      },
      {
        id: 1,
        name: 'Internal Output'
      },
      {
        id: 2,
        name: 'External Input',
        position: 'left',
        align: 'top'
      },
      {
        id: 3,
        name: 'External Output',
        position: 'right',
        align: 'top'
      }
    ]
  },
  position: { x: 0, y: 0, ...position },
  style: { width: 64*4, height: 64*2, ...style },
})