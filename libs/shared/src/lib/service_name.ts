export const service_name = (name:string):string => {
  return name.startsWith('@gen-flow/') ? name.replace('@gen-flow/', '') : name;
}