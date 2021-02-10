import { useState, useEffect, useRef } from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import styles from './App.module.css'

import myImgSrc from './logo.svg'

const VoteableMessage = props => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const myRef = useRef(null)

  console.log('componentWillMount AND componentWillUpdate')
  console.log(myRef)

  useEffect(() => {
    console.log('componentDidMount')
    console.log(myRef)

    return () => {
      console.log('componentDidUnmout')
    }
  }, [])

  useEffect(() => {
    console.log('componentDidUpdate')
    console.log(myRef)
  })

  useEffect(() => {
    console.log('new like.')
  }, [likes])

  const upvote = () => {
    setLikes(likes + 1)
  }
  const downvote = () => {
    setDislikes(dislikes + 1)
  }

  return (
    <div ref={myRef}>
      {props.username && (
        <div>
          <h6 id={styles.myClassName}>{props.username}</h6>
          <p>{props.message}</p>
          <button onClick={downvote}>Dislike</button>
          <span>{likes - dislikes}</span>
          <button onClick={upvote}>Like</button>
        </div>
      )}
    </div>
  )
}

const CreateMessage = props => {
  const [currMsg, setCurrMsg] = useState('')
  console.log(currMsg)
  const handleChange = event => {
    setCurrMsg(event.target.value)
  }

  const createNewMessage = () => {
    props.onCreate(currMsg)
  }

  return (
    <div>
      <input placeholder='message...' onChange={handleChange}></input>
      <button onClick={createNewMessage}>Create Message</button>
    </div>
  )
}

function App() {
  const [messages, setMessages] = useState([])

  const handleCreate = newMessage => {
    messages.push(newMessage)
    setMessages([...messages])
  }

  const [k, setK] = useState(0)

  // cycle dep nuke: ENABLE AT OWN RISK
  // useEffect(() => setK(k + 1), [k])

  return (
    <div>
      <img alt='react logo' />
      <p>{k}</p>
      <CreateMessage onCreate={handleCreate} />
      {/* <VoteableMessage username='pilot' message='hello' /> */}

      {messages.map(msg => (
        <VoteableMessage message={msg} username='pilot' />
      ))}
    </div>
  )
}
export default App
