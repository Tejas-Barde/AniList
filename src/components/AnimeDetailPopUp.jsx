import React from 'react'

function AnimeDetailPopUp(){  

  const addAnime = async () => {
    try {
      setShowPopup(false)
      const compactAnime = {
        anime_id: anime.mal_id,
        image_url: anime.images.jpg.image_url,
        episodes: anime.episodes,
        title: anime.title,
        genres: anime.genres.map(genre => genre.name),
        rating: rating,
        status: status
      }
      setIsAdded(true)
      const res = await service.addAnime({anime:compactAnime,userId:userData.$id})
      console.log(`AddAnime Btn :: response :: ${res}`)
      dispatch(addToUserList(compactAnime))
    } catch (error) {
      console.error("AddAnimeBtn :: Error", error)
    }
  }

  return (
    <form className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="text-black bg-amber-50 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Add to List</h2>
        <label className="block mb-2 font-semibold">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option>Completed</option>
          <option>Watching</option>
          <option>Plan to Watch</option>
          <option>On Hold</option>
          <option>Dropped</option>
        </select>

        <label className="block mb-2 font-semibold">Rating </label>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
          min="1"
          max="10"
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-between">
          <Button onClick={addAnime} disabled={rating === ""}>
            Save
          </Button>
          <Button onClick={() => setShowPopup(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}

export default AnimeDetailPopUp
