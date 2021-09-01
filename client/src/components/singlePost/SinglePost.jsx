import { DeleteOutline, Edit } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
    /* 1. to fetch data according to id */
  const location = useLocation();
  const path = location.pathname.split("/")[2];
    /* 2. to use title, desc... */
  const [post, setPost] = useState({});
    /* 3. for public images folder */
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
   /* 4. to edit the post all 3 */
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

    
  useEffect(() => {
    const getPost = async () => {
        /* 1. to fetch the post according to their id */
      const res = await axios.get("/posts/" + path);
        /* 2. to update the data */
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && ( /* 3. */
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? ( /* if you are in update mode you can see this */
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title} 
            {post.username === user?.username && ( /* so you can only see buttons if posts belongs to you */
              <div className="singlePostEdit">
                <Edit onClick={() => setUpdateMode(true)} className="singlePostIcon" />
                <DeleteOutline onClick={handleDelete} className="singlePostIcon" />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
