import Post from "../post/Post";
import "./posts.css";

/* take prop use it with array map */
export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
