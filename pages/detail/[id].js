/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Stories } from "../../components/Stories";
import { Statistics } from "../../components/Statistics";
import { Navbar } from "../../components/Navbar";
import { getData } from "../../utils/fetchData";
import moment from "moment/moment";
import { formatDate } from "../../utils/formatDate";
import { CardEvent } from "../../components/CardEvent";
import { formatCurrency } from "../../utils/formatCurrency";

export default function DetailId({ detailPage, id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("api/v1/events");

        setData(res.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const router = useRouter();

  const handleSubmit = (ticketId, organizer) => {
    const token = Cookies.get("token");
    if (!token) {
      return router.push("/signin");
    } else {
      router.push(
        `/checkout/${id}?ticketId=${ticketId}&organizer=${organizer}`
      );
    }
  };

  return (
    <Layout titlePage={"Detail Page"} metaDescription={detailPage.about}>

      <section className="bg-navy">
        <Navbar />
      </section>

      <div className="preview-image bg-navy text-center">
        <img
          src={`${process.env.NEXT_PUBLIC_API}/${detailPage.image.name}`}
          className="img-content"
          alt="kaguka-detail"
        />
      </div>
      <div className="details-content container">
        <div className="d-flex flex-wrap justify-content-lg-center gap">
          <div className="d-flex flex-column description">
            <div className="headline">{detailPage.title}</div>
            <br />
            <div className="event-details">
              <h6>Event Details</h6>
              <p className="details-paragraph">{detailPage.about}</p>
            </div>
            <div className="keypoints">
              {detailPage.keyPoint.map((key, i) => {
                return (
                  <div className="d-flex align-items-start gap-3" key={i}>
                    <img src="/icons/ic-check.svg" alt="semina" />
                    <span>{key}</span>
                  </div>
                );
              })}
            </div>
            <div className="map-location">
              <h6>Event Location</h6>
              <div className="map-placeholder">
                <div className="maps">
                  <iframe
                    src={detailPage.mapsCity}
                    width="550"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div
                    className="absolute d-flex justify-content-center align-items-center"
                    id="hoverMe"
                  >
                    <a href="#" className="btn-navy" id="btn-maps">
                      View in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column card-event">
            <div>

            </div>
            <h6>Your Speaker</h6>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src={`${process.env.NEXT_PUBLIC_API}/${detailPage?.talent?.image?.name}`}
                alt="speaker"
                width="60"
                style={{ borderRadius: "50%" }}
              />
              <div>
                <div className="speaker-name">{detailPage?.talent?.name}</div>
                <span className="occupation">{detailPage?.talent?.role}</span>
              </div>
            </div>
            <hr />

            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-marker.svg" alt="semina" />{" "}
              {detailPage.venueName}
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-time.svg" alt="semina" />{" "}
              {moment(detailPage.date).format("HH.MM A")}
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-calendar.svg" alt="semina" />{" "}
              {formatDate(detailPage.date)}
            </div>
            <hr />
            <h5 className="mb-3">Ticket Type</h5>

            {detailPage.tickets.map((ticket, index) => (
              <Fragment key={index}>
                {ticket.statusTicketCategories ? (
                  <div className="typeEvent">
                    <h6 className="type-name">{ticket.type}</h6>
                    <div className="typeEvent-detail">
                      <div className="price">
                        {ticket.price === 0
                          ? "free"
                          : `${formatCurrency(ticket.price)}`}
                        <span>/person</span>
                      </div>
                      {detailPage.stock !== 0 && (
                        <Button
                          action={() =>
                            handleSubmit(ticket._id, detailPage.organizer)
                          }
                          className="btn-event"
                        >
                          JOIN NOW
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <CardEvent data={data} title="Similiar Events" subTitle="Next One" />
      <Stories />
      <Statistics />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = await getData(`api/v1/events/${context.params.id}`);

  const res = req.data;

  return {
    props: { detailPage: res, id: context.params.id },
  };
}
