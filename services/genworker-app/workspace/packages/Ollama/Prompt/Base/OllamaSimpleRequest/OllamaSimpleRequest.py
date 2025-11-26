import requests


class OllamaSimpleRequest:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"OllamaSimpleRequest executing...")

    
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