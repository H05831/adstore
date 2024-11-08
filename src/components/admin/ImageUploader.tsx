"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { BiPlusCircle } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import { toast } from "sonner";

interface ImageUploaderProps {
  openFullView?: boolean;
  productId?: string | undefined;
  images?: string[];
  action?: string;
}

const ImageUploader = ({
  openFullView,
  productId,
  images,
  action,
}: ImageUploaderProps) => {
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const { productId } = data.serverData;

      router.push(`/admin/adminProducts?productId=${productId}`);
      toast.success("Image uploaded successfully!");
    },
    onUploadProgress: (p) => {
      setProgress(p);
    },
  });

  const mutation = useMutation({
    mutationFn: (acceptedFiles: File[]) =>
      startUpload(acceptedFiles, { productId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productId"] });
    },
  });

  const handleDropAccepted = (acceptedFiles: File[]) => {
    mutation.mutate(acceptedFiles);
  };

  const handleDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    toast.error(`${file.file.type} not supported!`);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md ${
        openFullView
          ? "h-[550px] w-[40%] flex items-center justify-center"
          : images
          ? "w-24 h-24 flex items-center justify-center bg-zinc-100 border-zinc-400 rounded-lg cursor-pointer"
          : "w-full h-[290px]"
      }`}
    >
      <Dropzone
        accept={{
          "image/jpg": [".jpg"],
          "image/jpeg": [".jpeg"],
          "image/png": [".png"],
        }}
        onDropAccepted={handleDropAccepted}
        onDropRejected={handleDropRejected}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-y-1.5">
                <RiLoader4Fill className="w-6 h-6 text-gray-400 animate-spin" />
                <div
                  className={`bg-gray-300 rounded-full ${
                    action ? "w-20 h-1" : "w-40 h-1.5"
                  }`}
                >
                  <div
                    className="bg-black h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className={`ml-2 ${action ? "text-sm" : "text-md"}`}>
                  Uploading...
                </p>
              </div>
            ) : images ? (
              <BiPlusCircle size={24} />
            ) : (
              <MdOutlineFileUpload size={35} />
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
