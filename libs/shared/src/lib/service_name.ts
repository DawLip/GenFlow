export const service_name = (name:string):string => {
  return name.startsWith('@gen-flow/') ? name.replace('@genflow-', '') : name;
}