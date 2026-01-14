import os

class FilesRepo:
  root_dir = "/ws/Studies/GenFlow/services/genworker-app/workspace/"

  def save(self, full_path: str, content: str):
    path = f"{self.root_dir}{full_path}"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
      f.write(content)

  def get(self, full_path: str):
    with open(f"{self.root_dir}{full_path}", "r", encoding="utf-8") as f:
      return f.read()
    
  def get_absolute_path(self, full_path: str):
    return f"{self.root_dir}{full_path}"
    
  def ls(self, full_path: str):
    return os.listdir(f"{self.root_dir}{full_path}")
