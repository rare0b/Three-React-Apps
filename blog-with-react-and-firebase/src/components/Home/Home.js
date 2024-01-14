import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      // postsを降順取得
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h1>{post.title}</h1>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <div className="iconAndDeleteButton">
              <img src={post.author.photoUrl} alt="Author icon" />
              {post.author.id === auth.currentUser?.uid && (
                <button onClick={() => handleDelete(post.id)}>削除</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
