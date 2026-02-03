class TextConcat:
  def execute(self, Node, node, input_ports,  output_ports):
    output_ports["textOutput"] = input_ports["textInput1"] + input_ports["textInput2"]
    Node.domain.app.console.log("TextConcat", f"Executing...")

Node = TextConcat