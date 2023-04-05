import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Next.js를 배우기 위해 위의 코드가 무엇을 하는지 이해할 필요는 없습니다. 기능은 블로그 예제를 기능적으로 만드는 것입니다. 그러나 더 자세히 알고 싶다면:
// fs는 파일 시스템에서 파일을 읽을 수 있는 Node.js 모듈입니다.
// path는 파일 경로를 조작할 수 있는 Node.js 모듈입니다. 
// matter는 각 마크다운 파일의 메타데이터를 파싱할 수 있는 라이브러리입니다. 
// Next.js에서 lib 폴더에는 pages 폴더와 같은 할당된 이름이 없으므로 아무 이름이나 지정할 수 있습니다. 
// 일반적으로 lib 또는 utils를 사용하는 것이 관례입니다.




export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}


export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // 주석을 사용하여 마크다운을 HTML 문자열로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 데이터를 id 및 contentHtml과 결합
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}