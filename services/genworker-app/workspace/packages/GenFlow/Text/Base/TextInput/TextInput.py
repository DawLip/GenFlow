class TextInput:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"TextInput executing...")
    output_ports["textOutput"] = input_ports["textInput"]
Node = TextInput