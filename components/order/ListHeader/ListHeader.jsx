import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
function ListHeader({ value, color }) {
  return (
    <div className="flex flex-row justify-items-center items-center py-3 ">
      <CheckCircleOutlinedIcon className={`text-gray-300 me-1 ${color}`} />
      <h3 className="uppercase text-gray-400 text-xs font-bold ">{value}</h3>
    </div>
  );
}

export default ListHeader;
