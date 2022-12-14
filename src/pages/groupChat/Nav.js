export default function Nav({ articles, setArticle }) {
  return (
    <nav>
      {!articles
        ? 'No chat'
        : articles.map(a => (
            <p key={a.id} onClick={() => setArticle(a)}>
              {a.title}
            </p>
          ))}
    </nav>
  )
}
