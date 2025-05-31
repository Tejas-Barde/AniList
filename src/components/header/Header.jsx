import Logo from '../Logo'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaSearch, FaDiscord, FaTelegramPlane, FaRedditAlien, FaTwitter } from 'react-icons/fa'

function Header() {
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
	
	const submit = async (input) => {
		navigate(`/search/${input.name}`)
	}

	return (
		<header className="h-20 flex flex-wrap items-center justify-between bg-gray-900 text-white w-full pl-5 pr-5">
			<div className="flex items-center gap-4">
				<Logo></Logo>
				<div className="flex items-center gap-1 font-bold text-xl">
					<h1 className="text-white">Mug<span className="text-pink-400">!</span>wara</h1>
				</div>
			</div>

			<form onSubmit={handleSubmit(submit)} className=" flex bg-white rounded w-[300px] overflow-hidden ">
				<input
					type="text"
					placeholder="Search anime..."
					{...register("name", { required: true })}
					className="flex-1 px-2 py-1 text-black text-sm focus:outline-none rounded-b-md"
				/>
				<button 
					type="submit" 
					className="px-2 flex items-center justify-center text-black rounded-full border w-10 h-10">
					<FaSearch />
				</button>
			</form>

			<div className="flex items-center gap-4 text-sm">
				{/* <div className="flex items-center gap-2">
					<FaDiscord className="w-6 h-6 text-indigo-300 bg-gray-800 p-1 rounded-full" />
					<FaTelegramPlane className="w-6 h-6 text-sky-400 bg-gray-800 p-1 rounded-full" />
					<FaRedditAlien className="w-6 h-6 text-red-500 bg-gray-800 p-1 rounded-full" />
					<FaTwitter className="w-6 h-6 text-sky-500 bg-gray-800 p-1 rounded-full" />
				</div> */}

				<div className="flex items-center gap-4">
					{/* <span className="flex items-center gap-1">
						📡 Watch2gether
					</span> */}
					<span className="flex items-center gap-1">
						🔀 Random
					</span>
					{/* <span className="flex items-center gap-1">
						<code className="bg-pink-400 text-black px-1 rounded">EN</code>
						<code className="bg-gray-700 text-white px-1 rounded">JP</code>
					</span>
					<span>📰 News</span>
					<span>💬 Community</span> */}
				</div>

				<Button className="bg-pink-400 text-black px-3 py-1 rounded-md">
					Login
				</Button>
			</div>
		</header>
	)
}

export default Header
