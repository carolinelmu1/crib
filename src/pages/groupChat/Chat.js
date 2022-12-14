import { useEffect, useState } from 'react'
import Nav from './Nav'
import Article from './Article'
import ArticleEntry from './ArticleEntry'
import { SignIn, SignOut, useAuthentication } from '../../components/services/authService'
import { fetchArticles, createArticle } from '../../components/services/articleService'
import './Chat.css'
import logo from '../../logo.png'

export default function Chat() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
    }
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  // function addArticle({ title, body, displayName }) {
  const addArticle = obj => {
    console.log('ADD ARTICLE > obj: ', obj)

    createArticle(obj).then(article => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  return (
    <div className="Chat">
      <header>
        <div class="title">
          <img src={logo} class="image_logo" alt="Crib Logo" />
          Group Chat
        </div>
        {user && (
          <button class="articleButton" onClick={() => setWriting(true)}>
            New Article
          </button>
        )}
        <div class="user">{!user ? <SignIn /> : <SignOut />}</div>
      </header>

      {!user ? '' : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        ''
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
    </div>
  )
}
