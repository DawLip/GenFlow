class TextAreaInput:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"TextAreaInput executing...")
    output_ports["textOutput"] = input_ports["textInput"]
Node = TextAreaInput