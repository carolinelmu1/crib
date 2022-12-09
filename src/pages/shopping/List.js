import { useEffect, useState } from "react";
import Nav from "../groupChat/Nav";
import Article from "../groupChat//Article";
import ArticleEntry from "../groupChat/ArticleEntry";
import {
  SignIn,
  SignOut,
  useAuthentication,
} from "../../components/services/authService";
import {
  fetchArticles,
  createArticle,
} from "../../components/services/articleService";
import "./List.css";

export default function List() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const user = useAuthentication();

  const handleChange = (event) => {
    const { value } = event.target;
    console.log("VALUE: ", value);
    setImageUrl(createImageUrl(value));
    setContent(value);
  };

  const createImageUrl = (value) => {
    const url = `https://spoonacular.com/cdn/ingredients_100x100/${value}.jpg`;
    console.log("URL: ", url);
    return url;
  };

  return (
    <div className="List">
      <header>
        Shopping List
        {!user ? <SignIn /> : <SignOut />}
      </header>

      <input value={content} onChange={(e) => handleChange(e)} />

      <div>
        <img src={imageUrl} alt="item" />
      </div>
      {/* <Entry action={setFruitName} /> */}
      {/* <img src=`https://spoonacular.com/cdn/ingredients_100x100/{fruitName}.jpg` alt="fritttsfsf" /> */}
    </div>
  );
}