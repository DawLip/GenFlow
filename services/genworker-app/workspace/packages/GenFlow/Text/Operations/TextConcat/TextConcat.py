class TextConcat:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    output_ports["textOutput"] = input_ports["textInput1"] + input_ports["textInput2"]
    print(f"TextConcat executing...")

Node = TextConcat