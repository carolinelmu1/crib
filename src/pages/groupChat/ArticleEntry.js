import { useState } from 'react'
import { useAuthentication } from '../../services/authService'
import { auth } from '../../firebaseConfig'

const ArticleEntry = props => {
  const { addArticle } = props
  const user = useAuthentication()
  console.log('USER: ', user)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  const submit = e => {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError('Both the title and body must be supplied')
    } else {
      const { displayName } = auth.currentUser
      console.log('DISPLAY NAME: ', displayName)
      addArticle({ displayName, title, body })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} />
        Body
        <textarea rows="8" value={body} onChange={e => setBody(e.target.value)}></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default ArticleEntry
