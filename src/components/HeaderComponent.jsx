import Logo from './Logo'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaSearch, FaDiscord, FaTelegramPlane, FaRedditAlien, FaTwitter } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import LogOutBtn from './LogOutBtn'

function HeaderComponent() {
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
	const authStatus = useSelector(state=>state.auth.status)
	console.log(authStatus)
	const submit = async (input) => {
		navigate(`/search/${input.name}`)
	}

	return (
		<header className="h-20 flex flex-wrap items-center justify-between bg-gray-900 text-white w-full pl-5 pr-5">
			<Link to='/'>
			<div className="flex items-center gap-4">
				<Logo></Logo>
				<div className="flex items-center gap-1 font-bold text-xl">
					<h1 className="text-white">Mug<span className="text-pink-400">!</span>wara</h1>
				</div>
			</div>
			</Link>

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
				<div className="flex items-center gap-4">
					<span >
						<Link to='userpage'>
							AnimeList
						</Link>
					</span>
				</div>
				{!authStatus ? (<Link to='/login'>
					<Button className="bg-blue-400 text-black px-3 py-1 rounded-md">
						Login
					</Button>
				</Link>)
				:
				(<LogOutBtn></LogOutBtn>)}
			</div>
		</header>
	)
}

export default HeaderComponent
