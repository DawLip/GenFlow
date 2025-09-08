class TextFileSave:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"TextFileSave executing...")
    print(f"Saving text: {input_ports['textInput']}")
    
    Node.domain.file_repo.save('files/output.txt', input_ports['textInput'])
    Node.domain.task_scheduler.new_artifact({
      'type': 'file',
      'subtype': 'text',
      'location': 'files/output.txt',
      'name': 'output.txt',
      'nodeId': node['id'],
      'content': input_ports['textInput'],
    })

Node = TextFileSave