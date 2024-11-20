import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
interface ImageUploadProps {
  disable: boolean;
  onChange: (value: string) => void; // Change this to accept an array of strings
  onDelete: (value: string) => void;
  value: string[];
}
const ImageUpload: FC<ImageUploadProps> = ({
  disable,
  onChange,
  onDelete,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      typeof result?.info === "object" &&
      result.info?.secure_url
    ) {
      onChange(result.info.secure_url);
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, idx) => (
          <div
            key={idx}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onDelete(url)}
                size={"icon"}
                variant={"destructive"}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
              alt="image product"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        key={value.length}
        onSuccess={onUpload}
        uploadPreset="nm-demo"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              variant={"secondary"}
              disabled={disable}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-1" />
              Upload image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
