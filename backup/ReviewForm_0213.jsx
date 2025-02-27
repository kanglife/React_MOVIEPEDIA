//각각 스테이트 저장하는 코드

import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setrating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    const nextRatng = Number(e.target.value) || 0;
    setrating(nextRatng);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      rating,
      content,
    });
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input value={title} onChange={handleTitleChange}></input>
      <input type="number" value={rating} onChange={handleRatingChange}></input>
      <textarea value={content} onChange={handleContentChange}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}
export default ReviewForm;
