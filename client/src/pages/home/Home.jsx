import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sideBar/SideBar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
    /* define posts with state hook */
  const [posts, setPosts] = useState([]);
    /* to use search property */
  const { search } = useLocation();

    /* for data fetch */
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search); /*to use api write proxy in package.json */
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
}     /* past posts as props in <Posts /> 
do it alsa in Posts.jsx export default function Posts({ posts }) */