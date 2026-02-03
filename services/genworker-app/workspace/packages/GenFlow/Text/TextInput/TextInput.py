class TextInput:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("TextInput", f"Executing...")
    output_ports["textOutput"] = input_ports["textInput"]
Node = TextInput