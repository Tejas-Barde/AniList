
import { useDispatch, useSelector } from "react-redux"
import Button from "./Button"
import { useEffect, useState } from "react"
import service from "../appwrite/service"
import { updateUserList } from "../store/animeSlice"
import AnimeDetailPopUp from "./AnimeDetailPopUp"

function EditDetails({ anime, onClose }) {
  const [showPopup, setShowPopup] = useState(true)
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  console.log(`EditDetails :: anime :: ${anime}`)
  const update = async ({ rating, status }) => {
    console.log(`EditDetails :: update :: anime id :: ${anime.anime_id}, rating :: ${rating}, status :: ${status}`)
    setShowPopup(false)
    try {
      dispatch(updateUserList({
        anime_id: anime.anime_id,
        rating: rating,
        status: status
      }))
      const res = await service.update({
        anime_id: anime.anime_id,
        userId: userData.$id,
        rating: rating,
        status: status
      })
      console.log(`EditDetails :: response :: ${res}`)
      console.log(res)
    } catch (error) {
      console.error("EditDetails :: Error", error);
    }
  }
  useEffect(() => {
    if (!showPopup && typeof onClose === "function") {
      onClose();
    }
  }, [showPopup, onClose]);

  return (
    <>
      {showPopup && (
        <AnimeDetailPopUp
          setShowPopup={setShowPopup}
          onTrigger={update}
        >
          Edit
        </AnimeDetailPopUp>
      )}
    </>
  )
}

export default EditDetails