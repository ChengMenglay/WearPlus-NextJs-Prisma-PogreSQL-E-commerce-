import React from "react";
type HeadingProps = {
  title: string;
  description: string;
};
export default function Heading({ title, description }: HeadingProps) {
  return (
    <div className=" space-y-1">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
