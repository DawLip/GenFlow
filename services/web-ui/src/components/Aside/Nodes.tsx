'use client';

import { useDnD } from '../../utils/DnDContext'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import React from 'react';
import path from 'path';

export function Nodes({ }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const packages = useSelector((state: any) => state.packages.packages);

  const [type, setType] = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log(nodeType);
    //@ts-ignore
    setType(nodeType.slice(1, nodeType.length));
    event.dataTransfer.effectAllowed = 'move';
  };
  const packageItemTree = createPackageItemTree(packages);

  return (
    <>
      <Node 
        nodeType={''} 
        onDragStart={onDragStart} 
        packageItemTree={packageItemTree}
      />
    </>
  );
}

const Node = React.memo(function Node({ nodeType, onDragStart, packageItemTree }: { nodeType: string, onDragStart: (event: React.DragEvent, nodeType: string) => void, packageItemTree: PackageItemNode }) {
  if (packageItemTree.children.length === 0) {
    return (
      <div className={`dndnode ${`${packageItemTree.path}/${packageItemTree.name}`} text-white`} onDragStart={(event) => onDragStart(event, `${packageItemTree.path}/${packageItemTree.name}`)} draggable>
        {`${packageItemTree.name}`}
      </div>
    );
  } 
  return (
    <div className="flex-col text-gray-400">
      {packageItemTree.name}
      {
        <div className="flex-col pl-2">
          {packageItemTree.children.map((child) => (
            <Node key={`NODE:${child.path}/${child.name}`} nodeType={nodeType} onDragStart={onDragStart} packageItemTree={child} />
          ))}
        </div>
      }
    </div>
  )
});

class PackageItemNode {
  constructor(
    public name: string,
    public path: string,
    public children: PackageItemNode[] = []
  ) {}

  addChild(child: PackageItemNode) {
    this.children.push(child);
  }
}

const createPackageItemTree = (packages:any[]) => {
  const root = new PackageItemNode('', '/');
  let currentNode = root;

  console.log("Creating package tree from:", packages)
  packages.forEach((_package:any) => {
    root.addChild(new PackageItemNode(_package.name, "/"+_package.name));
    currentNode = root.children[root.children.length - 1];
    
    const nodes = _package.nodes.map((pkg:any) => ({...pkg, path: pkg.path.split('/')}))
    nodes.forEach((node:any) => {
      currentNode = root.children[root.children.length - 1];
      node.path.forEach((segment:string) => {
        const existingChild = currentNode.children.find(child => child.name === segment);
        if (existingChild) {
          currentNode = existingChild;
        } else if (segment!== '') {
          const newChild = new PackageItemNode(segment, path.join(currentNode.path, segment));
          currentNode.addChild(newChild);
          currentNode = newChild;
        }
      });
      currentNode.addChild(new PackageItemNode(node.name || node.data.name, currentNode.path));
    });
  })
  console.log(root)
  return root
}