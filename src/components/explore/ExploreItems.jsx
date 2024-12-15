import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ExploreItems.css";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [itemsToShow, setItemsToShow] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchData = async (filterOption) => {
    setLoading(true); 
    let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filterOption) {
      apiUrl += `?filter=${filterOption}`;
    }

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        const updatedTimeLeft = data.reduce((acc, item) => {
          const remainingTime = item.expiryDate - new Date().getTime();
          acc[item.id] = remainingTime > 0 ? calculateTimeLeft(remainingTime) : "Expired";
          return acc;
        }, {});
        setTimeLeft(updatedTimeLeft);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data, loading]);

  const calculateTimeLeft = (time) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const loadMoreItems = () => {
    setItemsToShow((prev) => prev + 4);
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter); 
    setItemsToShow(8); 
  };

  const SkeletonLoader = () => (
    <div className="nft__item skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-subtitle"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="row">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <SkeletonLoader />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {data.slice(0, itemsToShow).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={`Author ${item.authorId}`}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              {timeLeft[item.id] || "Calculating..."}
            </div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {itemsToShow < data.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreItems}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;