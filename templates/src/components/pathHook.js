import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Controller } from './controller';
import axios from 'axios';
import { editUser } from '../model/userProfile'

export const PathHook = () => {
  const controller = new Controller()
  const apiPath = controller.viewApiPath()

  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.userProfile.value)

  const token = userProfile["token"] || localStorage.getItem("token")

  const [config, setConfig] = useState({
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    setConfig({
      headers: { Authorization: `Bearer ${token}` }
    })
  }, [token])

  const route = useLocation()

  useEffect(() => {
    if (userProfile["account"] === "" && (route.pathname !== '/login' && route.pathname !== '/register')) {
      axios.get(apiPath + '/api/user', config)
        .then((res) => {
          let userProfile = res["data"]["result"]
          userProfile["token"] = res["data"]["token"]
          userProfile["userId"] = res["data"]["result"].id
          userProfile["groupName"] = String(res["data"]["result"].groupName)
          dispatch(editUser(userProfile))
        })
        .catch((error) => {
          localStorage.setItem('token', '')
          window.location.href = '/login'
        })
    }
  }, [route]);

  return route.pathname;
}

export default PathHook;
