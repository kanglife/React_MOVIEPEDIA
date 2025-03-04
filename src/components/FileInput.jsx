// 비제어 컴포넌트 파일 컴포넌트
import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./css/FileInput.css";

function FileInput({ className = "", name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
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
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPriview);
    };
  }, [value, initialPreview]);

  return (
    <div className={`FileInput ${className}`}>
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제" />
        </button>
      )}
    </div>
  );
}

export default FileInput;
