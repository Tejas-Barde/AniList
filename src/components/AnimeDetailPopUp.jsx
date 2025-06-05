import { useState } from 'react'
import Button from './Button'
import service from '../appwrite/service'
import { useSelector, useDispatch } from 'react-redux'
import { addToUserList } from '../store/animeSlice'

function AnimeDetailPopUp({data={rating:7.7,status:'Watching'},onTrigger,setShowPopup,children}){  
  const [rating, setRating] = useState(data.rating);
  const [status, setStatus] = useState(data.status);
  
  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="text-black bg-amber-50 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">{children}</h2>
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
          <Button onClick={()=>onTrigger({rating,status})} disabled={rating === ""}>
            Save
          </Button>
          <Button onClick={() => setShowPopup(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetailPopUp
