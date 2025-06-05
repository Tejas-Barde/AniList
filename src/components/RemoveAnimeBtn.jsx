import { useState } from "react";
import service from "../appwrite/service"
import Button from "./Button"
import { useDispatch, useSelector } from "react-redux"
import { removeFromUserList } from "../store/animeSlice"

function RemoveAnimeBtn({ children, anime, setIsAdded,...props }) {
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()

  const remove = () => {
    console.log(`RemoveAnimeBtn :: remove :: anime id ::${anime.mal_id}`)
    service.removeAnime({ anime_id : anime.mal_id, userId: userData.$id })
      .then(res => {
        console.log(`RemoveAnimeBtn :: response :: ${res}`)
        setIsAdded(false)
        dispatch(removeFromUserList(anime.mal_id))
      })
      .catch(err => {
        console.error("RemoveAnimeBtn :: Error", err)
      })
  }
  return (
    <Button {...props} onClick={remove}>
      {children}
    </Button>
  )
}

export default RemoveAnimeBtn
