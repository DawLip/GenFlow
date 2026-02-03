import JSON from 'json5';

class NodesRegistry {
  private _nodeTypes: any = new Map();

  constructor() {
    this.loadNodeTypes();
  }

  async loadNodeTypes() {
    // const path = "config.json";
    // const data = await fs.promises.readFile(path, "utf-8");
    this._nodeTypes = {default: {}};
  }

  get nodeTypes(): any {
    return this._nodeTypes;
  }
}

export const nodesRegistry = new NodesRegistry();
