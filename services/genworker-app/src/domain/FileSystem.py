import json

class FileSystem:
  def __init__(self, domain):
    self.domain = domain
    self.files_repo = None

  def build(self):
    self.files_repo = self.domain.files_repo

  def save_file(self, full_path, content):
    self.files_repo.save(full_path, content)

  def get_file(self, full_path):
    return self.files_repo.get(full_path)
  
  def ls(self, full_path):
    return self.files_repo.ls(full_path)

  def get_absolute_path(self, full_path):
    return self.files_repo.get_absolute_path(full_path)
