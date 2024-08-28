import React from "react";

interface ModuleContentProps {
      title: string;
      content: string; // Change content to string to handle HTML
}

const ModuleContent: React.FC<ModuleContentProps> = ({ title, content }) => {
      return (
            <div className="module-content m-10 p-4">
                  <h2 className="text-2xl font-bold mb-4 text-blue-800">{title}</h2>
                  <div
                        className="text-lg space-y-4"
                        style={{
                              color: "rgb(57 56 56 / 85%)",
                              lineHeight: "1.6",
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                  />
            </div>
      );
};

export default ModuleContent;
