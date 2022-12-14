import { useEffect, useState } from 'react'
import { useAuthentication } from '../../components/services/authService'
import { createItem, fetchItems, deleteItem } from '../../components/services/itemService'
import './List.css'

import urlExist from 'url-exist'

export default function List() {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageValid, setImageValid] = useState(false)

  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)

  const user = useAuthentication()

  useEffect(() => {
    if (user) {
      fetchItems().then(setItems)
    }
  }, [user])

  useEffect(() => {
    const checkImage = async () => {
      const response = await urlExist(imageUrl)
      setImageValid(response)
    }
    checkImage()
  }, [imageUrl])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  const addItem = async ({ title, body }) => {
    await createItem({ title, body }).then(item => {
      setItem(item)
      setItems([item, ...items])
    })
  }

  const removeItem = async id => {
    await deleteItem(id).then(() => {
      setItem(null)
      setItems(items.filter(item => item.id !== id))
    })
  }

  const handleChange = event => {
    const { value } = event.target
    console.log('VALUE: ', value)
    setImageUrl(createImageUrl(value))
    setContent(value)
  }

  const createImageUrl = value => {
    const url = `https://spoonacular.com/cdn/ingredients_100x100/${value}.jpg`
    console.log('URL: ', url)
    return url
  }

  const handleItemClick = async (content, imageUrl) => {
    await addItem({ title: content, body: imageUrl })
  }

  const handleItemClickDelete = async id => {
    await removeItem(id)
  }

  console.log('ITEMS: ', items)
  console.log('ITEM: ', item)

  return (
    <div class="overall_background">
      <div class="container">
        <div className="topheader">
          <h3 class="header__username">The Crib</h3>
          <div className="List">
            <h1 class="header__title"> Shopping List</h1>
          </div>
        </div>
        <div class="items">
          <div class="itembar">
            <div class="prompts">
              <h3>Add an Item</h3>
              <p>
                Search for your item in the search bar and click the image to add it to the list.
              </p>
              <div className="Input">
                <input value={content} onChange={e => handleChange(e)} />
                {imageValid && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="item"
                      onClick={() => handleItemClick(content, imageUrl)}
                    />
                  </div>
                )}
                <hr />
              </div>
            </div>
            <h3>Current Shopping List:</h3>

            <div class="itemOutput">
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <figure onClick={() => handleItemClickDelete(item.id)}>
                      <div class="itemRow">
                        <div class="itemImage">
                          <img src={item.body} alt={item.title} />
                        </div>
                        <figcaption>{item.title}</figcaption>{' '}
                      </div>
                    </figure>
                  </div>
                )
              })}
            </div>
            <h>To delete the item, click on it!</h>
          </div>
        </div>
      </div>
    </div>
  )
}
