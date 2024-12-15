import React from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="background-layer"
        style={{
          background: `url(${backgroundImage}) bottom / cover no-repeat`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        data-aos="fade-zoom-in"
        data-aos-duration="2000"
      ></div>
      <div className="v-center" style={{ position: "relative", zIndex: 2 }}>
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <div className="col-md-6">
              <h6 data-aos="fade-up" data-aos-duration="500" data-aos-delay="500">
                <span className="text-uppercase id-color-2">Ultraverse Market</span>
              </h6>
              <div className="spacer-10"></div>
              <h1
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="750"
              >
                Create, sell or collect digital items.
              </h1>
              <p
                className="lead"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1000"
              >
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable.
              </p>
              <div className="spacer-10"></div>
              <Link
                className="btn-main lead"
                to="/explore"
                data-aos="fade-up"
                data-aos-duration="1250"
                data-aos-delay="1250"
              >
                Explore
              </Link>
              <div className="mb-sm-30"></div>
            </div>
            <div
              className="col-md-6 xs-hide"
              data-aos="fade-left"
              data-aos-duration="1500"
              data-aos-delay="1500"
            >
              <img src={NFT} className="lazy img-fluid" alt="NFT" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
