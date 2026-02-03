import json

def webrtc_dispatch(webrtc, channel, data):
  if data["event"] in dispatch:
    webrtc.console.trace("WebRTC","Dispatch event:", f"{data['event']}")
    dispatch[data["event"]](webrtc, channel, data["payload"])
  else:
    webrtc.console.log("WebRTC", f"Wrong event '[red]{data["event"]}[/red]' accured, data:", data["payload"])

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

  room_name = f"{payload["projectName"]}/{payload["flowName"]}"
  if room_name not in webrtc.rooms: webrtc.rooms[room_name] = []
  webrtc.rooms[room_name].append(channel)

def create_flow(webrtc, channel, payload):
    flow = webrtc.domain.projects.create_flow(payload)
    channel.send(json.dumps({"event": "NEW_FLOW_CREATED", "payload": {
      "flow": flow, 
      "projectName": payload["projectName"], 
      "flowName": payload["name"]
    }}))

    
def get_package_nodes(webrtc, channel, payload):
  nodes = webrtc.domain.packages.get_nodes()
  channel.send(json.dumps({"event": "PACKAGE_NODES", "payload": nodes}))
  
def flow_update(webrtc, channel, payload):
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
    webrtc.console.error("WebRTC", f"FLOW_UPDATE error:", e)
    
def execute_flow(webrtc, channel, payload):
  try:
    webrtc.task_repo.new_task({
      "project_name": payload["projectName"],
      "flow_name": payload["flowName"],
      "node_id": payload["nodeId"],
    })
  except Exception as e:
    webrtc.domain.app.processes.print_fatal_error(e)

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