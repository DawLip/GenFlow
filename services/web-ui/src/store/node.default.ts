export const defaultNode = {
  id: 'new-node',
  type: 'default',
  position: { x: 0, y: 0 },
  data: {
    name: 'New Node',
    description: 'This is a new node',
    inputs:[
      {
        id: 'input-1',
        label: 'text input',
        name: 'textInput1',
        dataType: 'TEXT',
        widget: 'LineInput',
        canBeDefault: false
      },
      {
        id: 'input-2',
        label: 'text input',
        name: 'textInput2',
        dataType: 'TEXT',
        widget: 'LineInput',
        canBeDefault: true
      },
      {
        id: 'input-3',
        label: 'text input',
        name: 'textInput3',
        dataType: 'TEXT',
        widget: 'LineInput',
        canBeDefault: true
      },
    ],
    outputs: [
      {
        id: 'output-1',
        label: 'text output',
        name: 'textOutput1',
        dataType: 'TEXT',
        widget: 'LineOutput'
      },
      {
        id: 'output-2',
        label: 'text output',
        name: 'textOutput2',
        dataType: 'TEXT',
        widget: 'LineOutput'
      },
      {
        id: 'output-3',
        label: 'text output',
        name: 'textOutput3',
        dataType: 'TEXT',
        widget: 'LineOutput'
      },
    ]
  },
};