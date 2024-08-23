import React from "react";

interface ModuleContentProps {
  title: string;
  content: string[];
}

const ModuleContent: React.FC<ModuleContentProps> = ({ title, content }) => {
  return (
    <div className="module-content">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <div className="text-lg space-y-4">{content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}</div>
    </div>
  )
}

export default ModuleContent;
