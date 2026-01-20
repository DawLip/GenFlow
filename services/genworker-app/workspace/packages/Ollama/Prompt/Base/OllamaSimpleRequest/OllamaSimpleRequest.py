import requests


class OllamaSimpleRequest:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("OllamaSimpleRequest", f"Executing...")

    
    url = "http://localhost:11434/api/chat"

    data = {
        "model": "llama3",  
        "messages": [
            {"role": "user", "content": input_ports['prompt']}
        ],
        "stream": False
    }

    response = requests.post(url, json=data)

    output_ports['text'] = response.json()["message"]["content"]

Node = OllamaSimpleRequest