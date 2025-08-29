from domain.Auth import Auth

def handle_login(payload):
  Auth.login(payload)

dispatch = {
  "LOGIN": handle_login,
}