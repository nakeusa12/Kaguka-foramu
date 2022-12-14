/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Footer } from "../../components/Footer";
import { FormCheckout } from "../../components/FormCheckout";
import { Layout } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";
import { getData } from "../../utils/fetchData";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function Checkout({ detailPage }) {
  const router = useRouter();
  const { ticketId } = router.query;
  return (
    <Layout titlePage={"Checkout"} metaDescription={detailPage.about}>

      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Invest In Yourself</div>

          <div className="row" style={{ marginTop: '100px'}}>
            <div className="col">
              <div className="event-details container d-flex flex-wrap flex-column justify-content-lg-center gap-5">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/${detailPage.image.name}`}
                  className="event-image"
                  alt="kaguka"
                />
                <div className="d-flex flex-column gap-3">
                  <h5>{detailPage.title}</h5>

                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-marker-white.svg" alt="" />
                    <span>{detailPage.venueName}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-time-white.svg" alt="" />
                    <span>{moment(detailPage.date).format("HH.MM A")}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-calendar-white.svg" alt="" />
                    <span>{formatDate(detailPage.date)}</span>
                  </div>
                </div>
                <div className="total-price">
                  {detailPage.tickets.map((ticket) => (
                    <Fragment key={ticket._id}>
                      {ticket._id === ticketId
                        ? ticket.price === 0
                          ? "free"
                          : `${formatCurrency(ticket.price)}`
                        : ""}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-8">
              {/* form */}
              <FormCheckout tickets={detailPage.tickets} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const req = await getData(`/api/v1/events/${context.params.id}`);

  const res = req.data;
  return {
    props: { detailPage: res },
  };
}
