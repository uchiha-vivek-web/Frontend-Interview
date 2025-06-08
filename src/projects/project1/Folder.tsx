// Folder.tsx
import React, { useState } from 'react';

type Node = {
  name: string;
  isFolder: boolean;
  children?: Node[];
};

const Folder: React.FC<{ node: Node }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!node.isFolder) {
    return <div className="ml-4">📄 {node.name}</div>;
  }

  return (
    <div className="ml-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer select-none"
      >
        📁 {node.name}
      </div>
      {isOpen && node.children?.map((child, index) => (
        <Folder key={index} node={child} />
      ))}
    </div>
  );
};

export default Folder;
