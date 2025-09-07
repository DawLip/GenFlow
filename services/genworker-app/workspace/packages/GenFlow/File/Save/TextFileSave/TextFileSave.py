class TextFileSave:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"TextFileSave executing...")
    print(f"Saving text: {input_ports['textInput']}")
    Node.domain.file_repo.save('files/output.txt', input_ports['textInput'])

Node = TextFileSave