import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [nftDetails, setNftDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      )
      .then((response) => {
        setNftDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NFT details:", error);
      });
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton
                    height={300}
                    width={300}
                    className="img-fluid img-rounded mb-sm-30"
                  />
                ) : (
                  <img
                    src={nftDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nftDetails.title}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width={200} /> : nftDetails.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>{" "}
                      {loading ? <Skeleton width={50} /> : nftDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>{" "}
                      {loading ? <Skeleton width={50} /> : nftDetails.likes}
                    </div>
                  </div>
                  <p>
                    {loading ? (
                      <Skeleton count={3} />
                    ) : (
                      nftDetails.description
                    )}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              circle
                              height={50}
                              width={50}
                              className="lazy"
                            />
                          ) : (
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.ownerImage}
                                alt={nftDetails.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              {nftDetails.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              circle
                              height={50}
                              width={50}
                              className="lazy"
                            />
                          ) : (
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.creatorImage}
                                alt={nftDetails.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              {nftDetails.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={80} />
                      ) : (
                        <>
                          <img src={EthImage} alt="Ethereum" />
                          <span>{nftDetails.price} ETH</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;