import { useQuery } from "@apollo/client";
import { getPublication } from "../../constants/lensConstants";
import PostContent from "../../components/PostContent";

export async function getStaticPaths() {
  const paths = [{ params: { posts: "posts", publicationId: "0x869c-0x11" } }];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { publicationId } = params;
  return {
    props: {
      publicationId,
    },
  };
}

export default function ReadPost(props) {
  const { publicationId } = props;
  const {
    loading,
    data: publication,
    error,
  } = useQuery(getPublication, {
    variables: { request: { publicationId: publicationId } },
  });

  return (
    <div>
      {publication && publicationId && !loading ? (
        <PostContent post={publication.publication} />
      ) : loading ? (
        <div>Loading... </div>
      ) : (
        <div> Post Not Found </div>
      )}
    </div>
  );
}
