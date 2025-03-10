import Image from "next/image";
import LoaderSVG from "../../assets/icons/loading-circle.svg";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-transparent">
      <Image src={LoaderSVG} alt="Loading..." width={50} height={50} />
    </div>
  );
};

export default Loader;
