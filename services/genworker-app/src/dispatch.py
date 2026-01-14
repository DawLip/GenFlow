from domain.Auth import Auth

def handle_login(payload):
  Auth.login(payload)

def try_default_login(payload):
  Auth.try_default_login(payload)

dispatch = {
  "LOGIN": handle_login,
  "TRY_DEFAULT_LOGIN": try_default_login
}