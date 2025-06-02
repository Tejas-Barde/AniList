import { useSelector } from "react-redux";
import CardList from "../components/CardList";
import { Heart } from "lucide-react"; 

function UserPage() {
  const userList = useSelector(state => state.anime.userList);
  const userData = useSelector(state => state.auth.userData);

  return (
    <div className="min-h-screen bg-[#1b1836] text-white py-8">
      <div className="flex justify-center text-4xl w-full">
        <h1 className="font-bold">Hi, {userData?.name}</h1>
      </div>
      <div className="bg-[url('/path/to/your/blurred-header.jpg')] bg-cover bg-center backdrop-blur-md px-8 py-6 flex items-center justify-between">
        <nav className="flex space-x-6 text-sm font-medium">
          <span className="flex items-center space-x-1"><i className="fas fa-user"></i> <span>Profile</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-undo"></i> <span>Continue Watching</span></span>
          <span className="flex items-center space-x-1 text-pink-400 border-b-2 border-pink-400"><Heart className="w-4 h-4" /> <span>Watch List</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-bell"></i> <span>Notification</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-cog"></i> <span>Settings</span></span>
          <span className="flex items-center space-x-1"><i className="fas fa-sign-out-alt"></i> <span>MAL</span></span>
        </nav>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="text-pink-400 w-6 h-6" /> Watch List
          </h2>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Public</span>
            <button className="bg-gray-600 text-white rounded-full px-3 py-1 text-xs">OFF</button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {["All", "Watching", "On-Hold", "Plan to Watch", "Dropped", "Completed"].map((status, idx) => (
            <button key={idx} className={`px-4 py-1 rounded bg-gray-700 text-white text-sm ${status === "All" ? "bg-pink-400 text-black" : ""}`}>
              {status}
            </button>
          ))}
        </div>

        <CardList animeList={userList} userCard={true} />
      </div>
    </div>
  );
}

export default UserPage;
