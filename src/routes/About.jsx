import flyerurl from "../assets/Lets watch movie.webp";
import Menu from "../components/Menu";
import useSeo from "@/hooks/useSeo";

export default function About() {
  useSeo({
    title: "About",
    description: "What LetsWatchMovie is, how it works and who builds it.",
  });

  return (
    <div className="mx-auto flex max-w-screen-xl px-4 lg:px-6">
      <Menu />
      <div className="mt-10 flex w-full min-w-0 flex-col items-start justify-center gap-4 py-4 text-white md:mt-0 md:gap-8 lg:gap-12 lg:pl-8">
        <div className="aspect-auto sm:w-11/12 md:w-4/5 lg:w-2/3">
          <img
            alt="lets watch movie flyer"
            src={flyerurl}
            width="100%"
            height="100%"
          />
        </div>

        <div className="flex max-w-[70ch] flex-col gap-6 md:text-lg lg:text-xl">
          <p>
            Whether you&apos;re searching for a specific title or simply
            browsing for inspiration, Let&apos;sWatchMovie offers a seamless and
            intuitive experience that enhances your entertainment journey. Join
            us as we embark on a cinematic adventure, where every click brings
            you closer to captivating stories, unforgettable characters, and
            unforgettable moments.
          </p>
          <p>
            Powered by the TMDB API, we bring you an extensive collection of
            movies and TV shows, carefully handpicked to ensure an immersive and
            entertaining experience. From the latest blockbusters to timeless
            classics, our platform is your one-stop destination to explore,
            discover, and indulge in the world of cinema.
          </p>
          <p>
            Grab your popcorn, settle into your favorite spot, Join us on a
            cinematic adventure and let the magic of movies unfold.
          </p>
          <p className="text-small font-light text-pahelo/90 md:text-base lg:text-lg">
            We are here to serve you, all of the available movies & TV-shows
            with the most smooth & easy to navigate UI.
          </p>
          <p>
            This site is designed, developed and maintained by{" "}
            <a
              href="https://nirajanmalla.com.np"
              target="_blank"
              rel="noreferrer"
              className="italic text-[#85144b]"
            >
              Nirajan Malla.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
