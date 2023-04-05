import Head from 'next/head';
import Layout from '../../components/layout'
import { getAllPostIds, getPostData  } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}


// paths는 pages/posts/[id].js에 의해 정의된 매개변수를 포함하는 getAllPostIds()에 의해 반환된 알려진 경로의 배열을 포함합니다.
// fallback이 false이면 getStaticPaths에서 반환되지 않은 모든 경로는 404가 됩니다.
// fallback이 true이면 getStaticProps의 동작이 변경됩니다.
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}


// 주어진 id로 게시물을 렌더링하기 위해 필요한 데이터를 가져와야 합니다.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


