import { ReactComponent as UploadZone } from "@/assets/icons/ic_upload.svg";
import { styled } from "@mui/material";
import { InputHTMLAttributes, useRef } from "react";

const Upload = styled(
  ({
    name,
    uploadImg,
    className,
    onChangeHandler,
  }: {
    name: string;
    uploadImg?: JSX.Element;
    className?: string;
    onChangeHandler?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  }) => {
    const inputRef = useRef(null);
    return (
      <div
        onClick={() =>
          (inputRef.current as unknown as HTMLInputElement)?.click()
        }
        className={className}
      >
        <input
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          hidden
          onChange={onChangeHandler}
          name={name}
        />
        {uploadImg ? uploadImg : <UploadZone />}
      </div>
    );
  },
)({});

export default Upload;
