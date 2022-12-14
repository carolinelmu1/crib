export default function Nav({ articles, setArticle }) {
  return (
    <nav>
      {!articles
        ? 'No chat'
        : articles.map(a => (
            <div key={a.id} onClick={() => setArticle(a)}>
              <h3>{a.displayName}</h3>
              <p>{a.body}</p>
              <hr />
            </div>
          ))}
    </nav>
  )
}
