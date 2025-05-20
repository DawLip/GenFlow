(node: any) => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      style={{ width: node.style?.width, height: node.style?.height }}
      className={`grow flex-col overflow-hidden p-2 border rounded ${
        node.selected ? 'border-primary/40' : ''
      }`}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={node.selected}
        minWidth={64}
        minHeight={64}
      />
      <Handle type="target" position={Position.Top} />
      <div className="flex-1 w-full">
        <label htmlFor={`${node.id}-text`}>Text:</label>
        
        <input
          id={`${node.id}-text`}
          name="text"
          defaultValue={node.data.label}
          onChange={onChange}
          className="nodrag w-full"
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={{ left: 10 }} />
    </div>
  );
}