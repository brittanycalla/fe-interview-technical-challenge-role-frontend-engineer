import { useEffect } from 'react';
import axios from 'axios'

function PolicyholdersView() {
  const getPolicyholders = () => {
    axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPolicyholders()
  }, [])

  return (
    null
  );
}

export default PolicyholdersView;
