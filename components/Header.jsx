import InfoApi from "./InfoApi"
import NavSide from "./NavSide"

const Header = ({ activeMenuName }) => {
  return (
    <header className="bg-green-700 shadow-md sticky top-0 flex flex-row justify-between items-center text-white z-10">
      <NavSide />
      <div className="font-bold italic text-2xl flex-1">
        ZWEI.
      </div>
      <h1 className="ml-4 my-3 font-bold uppercase text-2xl">{activeMenuName}</h1>
      <div className="mr-2">
        <InfoApi />
      </div>
    </header>
  )
}

export default Header