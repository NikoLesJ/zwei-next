import InfoApi from "./InfoApi"

const Header = ({ activeMenuName }) => {
  return (
    <header className="bg-green-700 shadow-md sticky flex flex-row justify-between items-center text-white ">
      <h1 className="ml-4 my-3 font-bold uppercase text-2xl">{activeMenuName}</h1>
      <div className="mr-2">
        <InfoApi />
      </div>
    </header>
  )
}

export default Header