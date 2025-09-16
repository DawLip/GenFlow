import json

def webrtc_dispatch(webrtc, channel, data):
  dispatch[data["event"]](webrtc, channel, data["payload"])

# --------------------------------

def helloHandler(webrtc, channel, payload):
  print("[WebRTC] HELLO", payload)
  
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
  print("[WebRTC] GET_FLOW_CONFIG", payload)
  flow_config = webrtc.domain.projects.get_flow_config(payload["projectName"], payload["flowName"], payload.get("flowData", False))
  channel.send(json.dumps({"event": "FLOW_CONFIG", "payload": {
    "flowConfig": flow_config, 
    "projectName": payload["projectName"], 
    "flowName": payload["flowName"]
  }}))
  
def create_flow(webrtc, channel, payload):
  try:
    print("[WebRTC] CREATE_FLOW", payload)
    flow = webrtc.domain.projects.create_flow(payload)
    channel.send(json.dumps({"event": "NEW_FLOW_CREATED", "payload": {
      "flow": flow, 
      "projectName": payload["projectName"], 
      "flowName": payload["name"]
    }}))
    
  except Exception as e:
    print("[WebRTC] CREATE_FLOW error:", e)

# --------------------------------

dispatch={
  "HELLO": helloHandler,
  "GET_PROJECT_CONFIG": get_project_config,
  "GET_FLOW_CONFIG": get_flow_config,
  "CREATE_FLOW": create_flow
}