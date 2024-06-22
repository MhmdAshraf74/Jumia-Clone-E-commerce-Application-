import Leftside from "./leftside";
import Middle from "./middle";
import Rightside from "./rightside";

export default function Header() {
  return (
    <div className="flex w-full pt-2 ">
      <Leftside />
      <Middle />
      <Rightside />
    </div>
  );
}
