// 비제어 컴포넌트 파일 컴포넌트
import React, { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preView, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inpuNode = inputRef.current;
    if (!inpuNode) return;

    inpuNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPriview = URL.createObjectURL(value);
    setPreview(nextPriview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPriview);
    };
  }, [value]);

  return (
    <div>
      <img src={preView} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      ;{value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
