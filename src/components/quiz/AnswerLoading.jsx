import { dummyAnswerOrOptionArr } from "../../lib/data/dummyData";

function AnswerLoading() {
    return (
        <div className="dark:bg-blue-950 container mt-16 mb-5 bg-stone-200 rounded-xl drop-shadow-xl shadow-xl px-6  py-4 max-w-[600px] mx-auto">
            <h2 className="w-2/6 h-10 bg-slate-400 rounded-lg mt-6 mb-4"></h2>
            <h3 className="w-1/6 h-6  ms-2 mb-12 bg-gray-400 rounded-md"></h3>
            <div className="mb-12">
                {dummyAnswerOrOptionArr.map((item, index) => {
                    return (
                        <div key={index} className="mt-12">
                            <div className="w-5/6 h-6 bg-stone-400 rounded-lg mb-8"></div>
                            <div>
                                {dummyAnswerOrOptionArr.map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="w-5/12 h-6 mb-3 ms-8 bg-zinc-300 rounded-md"
                                        ></div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <br />
            <div className="w-[4.2rem] h-7 bg-neutral-500 ms-2 rounded-md"></div>
            <br />
        </div>
    );
}

export default AnswerLoading;
