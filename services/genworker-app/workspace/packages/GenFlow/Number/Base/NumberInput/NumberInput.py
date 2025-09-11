class NumberInput:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"NumberInput executing...")
    output_ports["numberOutput"] = input_ports["numberInput"]
Node = NumberInput