// https://nextjs.org/learn/basics/api-routes/api-routes-details

import Head from 'next/head'
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

// getStaticProps를 사용하여 props에 넣어주면 Home에서 props로 사용가능
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <p>립톤(LIPTON), No.1 차 브랜드</p>
        <p>
          설립자인 토마스 립톤은 비싼 가격 때문에 상류층의 전유물이었던 홍차를 1890년 합리적인 가격으로 시장에 출시해 홍차의 대중화를 이끌었다.<br/>
          중간 중개인이 있는 유통망 대신 중개인을 거치지 않고 직접 원료를 공수해 공급 단가를 낮춘 것이다.<br/>
          홍차를 저렴하게 공급할 목적으로 실론 지역의 대규모 차 농장 5개를 사들였고, 직접 원료를 들여와 유통 단가를 대폭 낮춘 것이다.<br/>
          또한 해상운송 기술을 정비해 복잡한 유통단계에서 바생하는 중간마진을 없앴다.<br/>
          실제로 립톤은 1890년 '농장에서 찻주전자까지(direct fron to the tea gardens to the tea pot)'이라는 슬로건을 내새운 광고를 게재해 립톤이 차 농장에서 원료를 직접 수확해 제공하고 있음을 현명하게 알렸다.
        </p>

        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
