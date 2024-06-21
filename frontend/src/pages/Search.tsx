import { Search24Regular } from "@fluentui/react-icons";
import { cn } from "../lib/utils";
import AnimatedGridPattern from "../components/magicui/animated-grid-pattern";
import { useNavigate } from "react-router-dom";

const AnimatedGridPatternDemo = () => {
  return (
      <div className="w-screen h-screen overflow-hidden">
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12",
          )}
        />
      </div>
  );
};

function Search() {
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ((event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' || event.type === 'click') {
      navigate("/map");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col">
        <header className="flex justify-between items-center p-5 bg-white">
            <h1 className="text-2xl font-bold">Blueflare</h1>
            <div className="flex space-x-4">
                <button className="text-black">Current Intervention</button>
                <button className="bg-black text-white px-4 py-2 rounded">New Intervention</button>
            </div>
        </header>
        <div className="flex items-center justify-center flex-grow flex-col mt-80">
            <h1 className="text-4xl max-w-lg text-center pb-12">
            Search by name, license plate, VIN, and many more...
            </h1>
            <div className="relative z-10 flex space-x-3 p-3 items-center">
                <div className="flex-[1_0_0%]">
                    <label
                        htmlFor="hs-search-movie-1"
                        className="block text-sm text-base-content font-medium"
                    >
                        <span className="sr-only">Enter your query here...</span>
                    </label>
                    <input
                        type="text"
                        name="hs-search-movie-1"
                        id="hs-search-movie-1"
                        className="py-2.5 px-4 border-2 !border-slate-300 block w-full text-neutral border-transparent rounded-lg focus:border-primary focus:ring-primary"
                        placeholder="Enter your query here..."
                        onKeyDown={handleSearch}
                    />
                </div>
                <button className="flex-[0_0_auto] items-center justify-center rounded-full bg-black text-white h-10 w-10" onClick={handleSearch}>
                    <Search24Regular />
                </button>
            </div>
        </div>
        <AnimatedGridPatternDemo />

    </div>
  )
}

export default Search
