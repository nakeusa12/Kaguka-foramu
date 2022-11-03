/* eslint-disable @next/next/no-img-element */
import { CardTitle } from "../CardTitle";
import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
import { Fragment } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export const CardEvent = ({ data, title, subTitle }) => {

  return (
    <section className="grow-today">
      <div className="container">
        <CardTitle title={title} subTitle={subTitle} />
        <div className="mt-5 row gap">
          {data.map((data, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="card-grow h-100">
                <span className="badge-pricing">
                  {data.tickets
                    .filter((ticket) => ticket.type === "Normal")
                    .map((ticket, index) => (
                      <Fragment key={index}>
                        {ticket.price === 0
                          ? "Free"
                          : `${formatCurrency(ticket.price)}`}
                      </Fragment>
                    ))}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/${data.image.name}`}
                  alt={data.title}
                />
                <div className="card-content">
                  <div className="card-title">{data.title}</div>
                  <div className="card-subtitle">{data.category.name}</div>
                  <div className="description">
                    {data.venueName}, {formatDate(data.date)}
                  </div>
                  <Link href={`/detail/${data._id}`} legacyBehavior>
                    <a className="stretched-link"></a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
