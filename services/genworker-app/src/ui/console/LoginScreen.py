import getpass

class LoginScreen:
  def __init__(self, consoleUI):
    self.consoleUI = consoleUI
    
  def render(self):
    email = input("Email: ")
    password = getpass.getpass("Password: ")
    print(email, password)