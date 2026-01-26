class TextAreaInput:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("TextAreaInput", f"Executing...")
    output_ports["textOutput"] = input_ports["textInput"]
Node = TextAreaInput