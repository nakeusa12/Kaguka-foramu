import Head from "next/head";
import { Header } from "../components/Header";
import { Brand } from "../components/Brand";
import { Stories } from "../components/Stories";
import { Statistics } from "../components/Statistics";
import { CardEvent } from "../components/CardEvent";
import { getData } from '../utils/fetchData';
import { Layout } from "../components/Layout";

export default function Home({ data }) {
  let meta= "Kaguka-foramu adalah tempat di mana anda dapat mencari event sesuai dengan minat & terdekat."

  return (
    <Layout titlePage="Home" metaDescription={meta}>
        <Header />
        <Brand />
        <CardEvent data={data} title='Featured Events' subTitle='Grow Today' />
        <Stories />
        <Statistics />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = await getData('api/v1/events');
  const res = req.data;

  return {
    props: { data: res },
  };
}
