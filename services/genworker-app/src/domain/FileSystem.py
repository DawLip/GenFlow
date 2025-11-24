import json

class FileSystem:
  def __init__(self, domain, files_repo):
    self.domain = domain
    self.files_repo = files_repo

  def save_file(self, full_path, content):
    self.files_repo.save(full_path, content)

  def get_file(self, full_path):
    return self.files_repo.get(full_path)
  
  def ls(self, full_path):
    return self.files_repo.ls(full_path)
