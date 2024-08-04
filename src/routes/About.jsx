import { LazyLoadImage } from "react-lazy-load-image-component";
import flyerurl from "../assets/Lets watch movie.webp";
import Menu from "../components/Menu";
export default function About() {
  return (
    <>
      <div className="flex max-w-screen-xl mx-auto">
        <Menu />
        <div className="w-full md:pl-9 text-white mt-10 py-4 md:mt-0 flex justify-center items-start flex-col gap-4 md:gap-8 lg:gap-12">
          <div className="sm:w-11/12 md:w-4/5 lg:w-2/3">
            <LazyLoadImage
              alt="lets watch movie flyer"
              src={flyerurl}
              className="object-cover w-full h-auto object-center "
            />
          </div>

          <p className="md:text-lg lg:text-xl">
            Whether you&apos;re searching for a specific title or simply
            browsing for inspiration, Let&apos;sWatchMovie offers a seamless and
            intuitive experience that enhances your entertainment journey. Join
            us as we embark on a cinematic adventure, where every click brings
            you closer to captivating stories, unforgettable characters, and
            unforgettable moments.
            <br />
            <br />
            Powered by the TMDB API, we bring you an extensive collection of
            movies and TV shows, carefully handpicked to ensure an immersive and
            entertaining experience. From the latest blockbusters to timeless
            classics, our platform is your one-stop destination to explore,
            discover, and indulge in the world of cinema.
            <br />
            <br />
            Grab your popcorn, settle into your favorite spot, Join us on a
            cinematic adventure and let the magic of movies unfold.{" "}
            <p className="inline font-light text-sm md:text-base lg:text-lg text-pahelo/90">
              We are here to serve you, all of the available movies & TV-shows
              with the most smooth & easy to navigate UI.
            </p>
            <br />
            <br />
            <br />
            <br />
            This site is designed, developed and maintained by{" "}
            <a
              href="https://nirajanmalla.com.np"
              target="_blank"
              rel="noreferrer"
              className="text-[#85144b] italic"
            >
              Nirajan Malla.
            </a>
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
}
