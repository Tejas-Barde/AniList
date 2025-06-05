import React, { useState } from 'react'
import Button from './Button'
import service from '../appwrite/service'
import { useSelector, useDispatch } from 'react-redux'
import { addToUserList } from '../store/animeSlice'
import AnimeDetailPopUp from './AnimeDetailPopUp'
import { set } from 'react-hook-form'

function AddAnimeBtn({ children, anime,added ,...props }) {
  const [isAdded, setIsAdded] = useState(added)
  const [showPopup, setShowPopup] = useState(false)
  const userData = useSelector(state=>state.auth.userData)
  const dispatch = useDispatch()
  const addAnime = async ({rating,status}) => {
    try {
      setShowPopup(false)
      setIsAdded(true)
      const compactAnime = {
        anime_id: anime.mal_id,
        image_url: anime.images.jpg.image_url,
        episodes: anime.episodes,
        title: anime.title,
        genres: anime.genres.map(genre => genre.name),
        rating: rating,
        status: status
      }
      const res = await service.addAnime({anime:compactAnime,userId:userData.$id})
      console.log(`AddAnime Btn :: response :: ${res}`)
      dispatch(addToUserList(compactAnime))
    } catch (error) {
      console.error("AddAnimeBtn :: Error", error)
    }
  }

  return (
    <>
      <Button onClick={() => setShowPopup(true)} disabled={isAdded} {...props}>
        {isAdded ? "Added" : children}
      </Button>

      {showPopup && (
        <AnimeDetailPopUp
          setShowPopup={setShowPopup}
          onTrigger={addAnime}
        >
          Add To List
        </AnimeDetailPopUp>
      )}
    </>
  )
}

export default AddAnimeBtn
