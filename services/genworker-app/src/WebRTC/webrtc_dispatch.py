import json

def webrtc_dispatch(webrtc, channel, data):
  try:
    print(f"[WebRTC] {data['event'].upper()}")
    dispatch[data["event"]](webrtc, channel, data["payload"])
    
  except Exception as e:
    print(f"[WebRTC] {data['event'].upper()} error:", e)

# --------------------------------

def helloHandler(webrtc, channel, payload):
  if payload["clientType"] == "USER":
    projects_list = webrtc.domain.projects.projects_list()
    channel.send(json.dumps({"event": "PROJECTS_LIST", "payload": {"projects": projects_list, }}))

def get_project_config(webrtc, channel, payload):
  project_config = webrtc.domain.projects.get_project_config(payload["projectName"])
  channel.send(json.dumps({"event": "PROJECT_CONFIG", "payload": {
    "projectConfig": project_config, 
    "projectName": payload["projectName"]
  }}))

def get_flow_config(webrtc, channel, payload):
  flow_config = webrtc.domain.projects.get_flow_config(payload["projectName"], payload["flowName"], payload.get("flowData", False))
  channel.send(json.dumps({"event": "FLOW_CONFIG", "payload": {
    "flowConfig": flow_config, 
    "projectName": payload["projectName"], 
    "flowName": payload["flowName"]
  }}))
  
def create_flow(webrtc, channel, payload):
    flow = webrtc.domain.projects.create_flow(payload)
    channel.send(json.dumps({"event": "NEW_FLOW_CREATED", "payload": {
      "flow": flow, 
      "projectName": payload["projectName"], 
      "flowName": payload["name"]
    }}))

    
def get_package_nodes(webrtc, channel, payload):
  nodes = webrtc.domain.packages.get_nodes()
  print(f"[WebRTC] PACKAGE_NODES", nodes)
  channel.send(json.dumps({"event": "PACKAGE_NODES", "payload": nodes}))
  
def flow_update(webrtc, channel, payload):
  # print(f">>>>>>>>>>[WebRTC] FLOW_UPDATE", payload)
  try:
    if payload["context"] == "addNode":
      webrtc.domain.projects.add_node(payload)
    elif payload["context"] == "onNodesChange":
      webrtc.domain.projects.on_nodes_change(payload)
    elif payload["context"] == "onEdgesChange":
      webrtc.domain.projects.on_edges_change(payload)
    elif payload["context"] == "onConnect":
      webrtc.domain.projects.on_connect(payload)
    elif payload["context"] == "onValueChange":
      webrtc.domain.projects.on_value_change(payload)
  except Exception as e:
    print(f"[WebRTC] FLOW_UPDATE error:", e)
    
def execute_flow(webrtc, channel, payload):
  print(f">>>>>>>>>>[WebRTC] EXECUTE_FLOW", payload)
  try:
    print(">>> Executing flow...")
    print("payload:", payload)
    webrtc.domain.task_scheduler.execute_flow(payload["projectName"], payload["flowName"])
  except Exception as e:
    print(f"[WebRTC] EXECUTE_FLOW error:", e)
# --------------------------------

dispatch={
  "HELLO": helloHandler,
  "GET_PROJECT_CONFIG": get_project_config,
  "GET_FLOW_CONFIG": get_flow_config,
  "CREATE_FLOW": create_flow,
  "GET_PACKAGE_NODES": get_package_nodes,
  "FLOW_UPDATE": flow_update,
  "EXECUTE_FLOW": execute_flow,
}