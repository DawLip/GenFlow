class TextFileSave:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("Txt2ImgUnified", f"Executing...")
    
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