import { useSelector } from "react-redux";
import CardList from "../components/CardList";
import { Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function UserPage() {
  const userList = useSelector(state => state.anime.userList);
  const userData = useSelector(state => state.auth.userData);
  const {slug} = useParams()
  const navigate = useNavigate()
  const navStatus = [
    {
      name: "All",
      to: "/userpage/all"
    },
    {
      name: "Watching",
      to: "/userpage/watching",
    },
    {
      name: "On-Hold",
      to: "/userpage/on-hold",
    },
    {
      name: "Plan to Watch",
      to: "/userpage/plan to watch"
    },
    {
      name: "Dropped",
      to: "/userpage/dropped"
    },
    {
      name: "Completed",
      to: "/userpage/completed"
    }
  ]
  return (
    <div className="min-h-screen bg-[#1b1836] text-white py-8">
      <div className="flex justify-center text-4xl w-full">
        <h1 className="font-bold">Hi, {userData?.name}</h1>
      </div>
      {/* <div className="bg-[url('/path/to/your/blurred-header.jpg')] bg-cover bg-center backdrop-blur-md px-8 py-6 flex items-center justify-between">
        <nav className="flex space-x-6 text-sm font-medium">
          <span className="flex items-center space-x-1"><i className="fas fa-user"></i> <span>Profile</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-undo"></i> <span>Continue Watching</span></span>
          <span className="flex items-center space-x-1 text-pink-400 border-b-2 border-pink-400"><Heart className="w-4 h-4" /> <span>Anime List</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-bell"></i> <span>Notification</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-cog"></i> <span>Settings</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-sign-out-alt"></i> <span>MAL</span></span>
        </nav>
      </div> */}

      <div className="px-8 py-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="text-pink-400 w-6 h-6" /> Anime List
          </h2>
          {/* <div className="flex items-center space-x-2">
            <span className="font-medium">Public</span>
            <button className="bg-gray-600 text-white rounded-full px-3 py-1 text-xs">OFF</button>
            </div> */}
        </div>
        <div className="flex gap-2 flex-wrap mb-6 w-full justify-center">
          {navStatus.map((status, idx) => (
            <button
              onClick={() => navigate(status.to)}
              key={idx}
              className={`px-4 py-1 cursor-pointer rounded bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors 
              ${slug === status.name.toLowerCase() ? 'bg-pink-500' : ''}`}
            >
              {status.name}
            </button>
          ))}
        </div>
        <CardList animeList={userList} userCard={true} status={slug}/>
      </div>
    </div>
  );
}

export default UserPage;
