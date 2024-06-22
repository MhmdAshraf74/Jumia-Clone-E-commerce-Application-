import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function FavCard() {
  return (
    <div>
      <div className="p-4  ">
        <div className="flex flex-col sm:flex-row bg-base-100 p-2 border">
          <figure className="flex justify-center items-center">
            <img
              className="w-[150px] h-[150px] me-2"
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            />
          </figure>
          <div className=" p-2  flex-1">
            <h2 className="font-bold ">
              LC Waikiki Men's Hoodie Long Sleeve Sweatshirt
            </h2>
            <div>
              <p className="text-sm"> 36,000 EGP</p>
            </div>
          </div>
          <div className=" justify-between  items-center flex sm:flex-col p-4 ">
            <button className="rounded py-3 px-4 text-white bg-amber-400 hover:bg-amber-500">
              BUY NOW
            </button>
            <button className="flex rounded py-3 mt-2  text-center px-4 text-yellow-500 bg-none  hover:bg-yellow-200">
              <DeleteForeverIcon size={20} className="mr-1" />
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavCard;
