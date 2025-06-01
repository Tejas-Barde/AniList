import React from 'react'
import Button from './Button'
import service from '../appwrite/service'
import { useSelector } from 'react-redux'

function AddAnimeBtn({animeId,...props}) {
  const userData = useSelector(state=>state.auth.userData)
  console.log(userData);
  const addAnime = () =>{
    try {
      const anime = {
        userId : userData.$id,
        rating : 10,
        status : "ongoing",
        animeId : animeId
      }
      service.addAnime(anime)
        .then(response=>{
          console.log(`Add Anime Btn :: Response :: ${response}`)
        })
    } catch (error) {
      console.log(`Add Anime Btn :: ${error}`)
    }
  }
  return (
    <Button onClick={addAnime}>
      
    </Button>
  )
}

export default AddAnimeBtn
