class NumberInput:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("NumberInput", f"Rxecuting...")
    output_ports["numberOutput"] = input_ports["numberInput"]
Node = NumberInput