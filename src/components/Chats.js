import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {
  const didMountRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    await auth.signOut()
    history.push('/')
  }

  async function getFile(url) {
    let response = await fetch(url)
    let data = await response.blob()
    return new File([data], 'test.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!user) {
      history.push('/')

      return
    }

    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': '9b1d8f18-f6f8-4775-9a67-64bfec0ca6da',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name)

          axios
            .post('https://api.chatengine.io/users/', formdata, {
              headers: {
                'private-key': '85d97eeb-f5f0-4cbe-ba25-697c4576b0ff',
              },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log('e', e.response))
        })
      })
  }, [user, history])

  if (!user || loading) return 'Loading...'

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Alishers messenger</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="9b1d8f18-f6f8-4775-9a67-64bfec0ca6da"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats
