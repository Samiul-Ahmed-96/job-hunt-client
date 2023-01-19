import { gsap } from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import hero1 from "../../assets/hero-1.jpg";
import hero2 from "../../assets/hero-2.jpg";
import hero3 from "../../assets/hero-3.jpg";
import Badge from "../../components/reusable/Badge";

const Landing = () => {

  const navigate = useNavigate();
  const keywords = [
    "Web Developer",
    "Web Designer",
    "Writer",
    "Fullstack",
    "Senior",
    "Team Lead",
    "Administration",
    "SQA",
    "Tester",
  ];

  const el = useRef();
  const tl = useRef();
  const tl2 = useRef();

  useLayoutEffect(() => {
    let cards = gsap.utils.toArray(".statCard");

    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ repeat: -1 })
        .to("#hero1", { opacity: 1, duration: 2 })
        .to("#hero1", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero2", { opacity: 1, duration: 2 })
        .to("#hero2", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero3", { opacity: 1, duration: 2 })
        .to("#hero3", { opacity: 0, display: "none", duration: 2, delay: 1 });

      tl2.current = gsap
        .timeline()
        .from("#hero-title", { delay: 0.2, y: 50, opacity: 0, duration: 0.3 })
        .from("#hero-subtitle", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-container", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-button", {
          x: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2",
        })
        .from(".badge-container", { opacity: 0 })
        .from(".badge", { opacity: 0, y: 50, stagger: 0.1 });
    }, el);

    const movement = (e) => {
      cards.forEach((card, index) => {
        const depth = 90;
        const moveX = (e.pageX - window.innerWidth / 2) / depth;
        const moveY = (e.pageY - window.innerHeight / 2) / depth;
        index++;
        gsap.to(card, {
          x: moveX * index,
          y: moveY * index,
        });
      });
    };

    document.addEventListener("mousemove", movement);

    return () => {
      ctx.revert();

      document.removeEventListener("mousemove", movement);
    };
  }, []);

  const handleNavigate =() =>{
    navigate('/jobs')
  }


  return (
    <div ref={el} className="h-screen">
      <div className="max-w-3xl h-[80vh] rounded-b-full absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden z-0 md:w-full md:right-5 sm:w-full">
        <img
          id="hero1"
          src={hero1}
          alt=""
          className="object-cover h-full w-full opacity-0"
        />
        <img
          id="hero2"
          src={hero2}
          alt=""
          className="object-cover h-full w-full opacity-0"
        />
        <img
          id="hero3"
          src={hero3}
          alt=""
          className="object-cover h-full w-full opacity-0"
        />
      </div>
      <div className="lg:h-full sm:h-4/5 flex items-center z-10 relative">
        <div className="flex w-full lg:mt-0 md:px-4 md:mt-4 sm:mt-0 sm:flex-row">
          <div className="w-1/2 sm:w-full flex flex-col items-start">
            <h1
              id="hero-title"
              className="heroElement lg:text-black font-bold text-7xl sm:text-5xl sm:text-primary"
            >
              Find the perfect <br /> job for you
            </h1>
            <p id="hero-subtitle" className="mt-5 text-lg">
              Search your career opportunity through 12,800 jobs
            </p>
            <div
              id="search-container"
              className="bg-white rounded-full p-3 flex w-full max-w-xl overflow-hidden mt-5  shadow-lg"
            >
              <input
                className="flex-auto text-lg p-2 border-none outline-none focus:ring-0"
                type="text"
                name="search"
                id="search"
                placeholder="Job title or Keyword"
              />
              <button
                id="search-button"
                onClick={()=>handleNavigate()}
                className="p-2 rounded-full bg-primary  h-14 w-14 grid place-items-center"
              >
                <BiSearchAlt size="23" color="white" />
              </button>
            </div>
            <div className="mt-16">
              <h2 className="badge-container">Popular Search</h2>
              <div className="mt-3 max-w-xl flex flex-wrap  gap-3">
                {keywords.map((item) => (
                  <Badge key={item} className="badge">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:block lg:hidden  md:hidden sm:hidden">
            <div className="statCard rounded-3xl shadow-2xl p-7 my-4 bg-white relative left-[80%]">
              <div>
                <span className="text-2xl text-purple-600 font-bold">319 </span>
                <span>Job offers</span>
              </div>
              <p className="font-light text-gray-500">
                In Business Development
              </p>
            </div>
            <div className="statCard rounded-3xl shadow-2xl p-7 my-4 bg-white relative left-[60%]">
              <div>
                <span className="text-2xl text-lime-600 font-bold">265 </span>
                <span>Job offers</span>
              </div>
              <p className="font-light text-gray-500">
                In Marketing & Communication
              </p>
            </div>
            <div className="statCard rounded-3xl shadow-2xl p-7 bg-white relative left-[40%]">
              <div>
                <span className="text-2xl text-rose-500 font-bold">324 </span>
                <span>Job offers</span>
              </div>
              <p className="font-light text-gray-500">In Project Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
