import os

class FilesRepo:
  root_dir = "./services/genworker-app/workspace/"

  def save(self, full_path: str, content: str):
    with open(f"{self.root_dir}{full_path}", "w", encoding="utf-8") as f:
      f.write(content)

  def get(self, full_path: str):
    with open(f"{self.root_dir}{full_path}", "r", encoding="utf-8") as f:
      return f.read()
    
  def ls(self, full_path: str):
    return os.listdir(f"{self.root_dir}{full_path}")
