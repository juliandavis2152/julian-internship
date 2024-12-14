import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams(); 
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); 

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthorData(); 
    }
  }, [id]);

  const handleFollowToggle = () => {
    setAuthorData((prev) => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
    }));
    setIsFollowing(!isFollowing); 
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
          >
            <Skeleton height={300} />
          </section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle height={120} width={120} />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={200} />
                            <span className="profile_username">
                              <Skeleton width={100} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={250} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={80} />
                        </div>
                        <Skeleton width={100} height={40} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="row">
                      {[...Array(8)].map((_, index) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          key={index}
                        >
                          <Skeleton height={300} />
                          <Skeleton width={150} style={{ marginTop: 10 }} />
                          <Skeleton width={100} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt={authorData.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Address"
                            onClick={() =>
                              navigator.clipboard.writeText(authorData.address)
                            }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers} followers
                      </div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
