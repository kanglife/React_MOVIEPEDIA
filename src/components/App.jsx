import { useCallback, useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import useAsync from "./hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import "./css/App.css";
import { LocaleProvider } from "../contexts/LocaleContext";
import logoImg from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";
import useTranslate from "../hooks/useTranslate";

const LIMIT = 6;

function AppSortButton({ selected, children, onClick }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  const t = useTranslate();
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const [items, setItems] = useState([]);
  const sortedItems = items.sort((a, b) => b[order] - a[order]); //내림차순 정렬

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { paging, reviews } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]); //비동기 함수에서 콜백을 사용해서 이전값 전달
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  //리뷰 수정후 반영
  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  //컴포넌트가 처음 렌더링 될때 한번만 하고 싶으면
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="MOVIDE PEDIA" />
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div
          className="App-ReviewForm"
          style={{
            backgroundImage: `url("${ticketImg}")`,
          }}
        >
          <ReviewForm
            onSubmit={createReview}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            {t("newest")}
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            {t("best")}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReview}
            onUpdateSuccess={handleUpdateSuccess}
          />
          {hasNext ? (
            <button
              className="App-load-more-button"
              disabled={isLoading}
              onClick={handleLoadMore}
            >
              {t("load more")}
            </button>
          ) : (
            <div className="App-load-more-button" />
          )}
          {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">
          {t("terms of service")} | {t("privacy policy")}
        </div>
      </footer>
    </div>
  );
}

export default App;
