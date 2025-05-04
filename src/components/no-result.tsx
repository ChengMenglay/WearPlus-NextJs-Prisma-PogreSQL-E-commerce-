import { SearchSlash, SearchX } from "lucide-react";
import React from "react";

export default function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <SearchSlash className="w-10 h-10 text-muted-foreground mb-4" />
      <h1 className="text-md font-bold flex items-center">
        <SearchX className="w-5 h-5 mr-2" />
        No Result Found.
      </h1>
    </div>
  );
}
