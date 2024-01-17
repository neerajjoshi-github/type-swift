import { RiArrowRightSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const tests = [
  {
    testTitle: "Timed Test",
    items: [
      { title: "1:00 Test", link: "1-minute" },
      { title: "3:00 Test", link: "3-minute" },
      { title: "5:00 Test", link: "5-minute" },
    ],
  },
  {
    testTitle: "Page Test",
    items: [
      { title: "1 Page Test", link: "1-page" },
      { title: "2 Page Test", link: "2-page" },
      { title: "3 Page Test", link: "3-page" },
    ],
  },
];

const HomePage = () => {
  return (
    <div className="w-full h-screen p-12 flex items-center justify-center home-bg">
      <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg  shadow-[0_0_60px_-15px_rgba(0,0,0,0.4)]">
        <h1 className="p-8 text-4xl sm:text-6xl md:text-7xl font-pacifico text-center gradient-text">
          Typing Test
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-center">
          {tests.map((test) => (
            <div key={test.testTitle}>
              <h3 className="text-4xl font-extrabold mb-3 font-pacifico underline">
                {test.testTitle}
              </h3>
              <div className="bg-white rounded-lg w-[280px] shadow-xl">
                {test.items.map((item) => (
                  <div
                    key={item.link}
                    className="py-3 px-5 flex items-center justify-between border-b-2 border-gray-300 last-of-type:border-none"
                  >
                    <span className="text-xl font-semibold">{item.title}</span>{" "}
                    <Link to={`/typing-test/${item.link}`}>
                      <button className="text-xs font-bold bg-yellow-400 hover:bg-orange-400 transition duration-300 flex items-center rounded-md py-1 px-2">
                        <RiArrowRightSFill className="text-2xl" /> Start Test
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
