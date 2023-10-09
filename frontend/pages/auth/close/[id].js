import { useRouter } from 'next/router'
import axios from 'axios'
import { backend } from '../../../config.ts'
import { useEffect , useState } from 'react'
export default function AuthClose() {
  const router = useRouter()
  const {id} = router.query
  const [error, setError] = useState()
  useEffect(() => {
    (async () => {
      if (id) {
        let data = await axios.get(`${backend}/api/users/@me`, {headers: {"Authorization": `Basic ${id}`}}).catch(err => setError("Network Error"));
        if (data.data.status === 401) {setError("Unknown Access Token")}
        if (data.data.user) {
          window.localStorage.setItem("pogget-auth", JSON.stringify({type: 4, token: id, createdTimeStamp: Date.now()}))
           router.push("/");
        }
      }
    })()
  })
  return (
      <>
        <div>
          {error && <h1 className="text-center pt-24 text-red-600 font-bold">{error}</h1>}
        </div>
      </>
  );
}