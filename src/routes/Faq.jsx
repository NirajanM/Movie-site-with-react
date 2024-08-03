import Menu from "../components/Menu";
import Faq from "react-faq-component";

const data = {
  rows: [
    {
      title: "Does the site collect user data?",
      content:
        "No, we don't collect any of your data. Even the watchlist is saved locally on your browser and fetched again when you visit our site.",
    },
    {
      title: "What tools are used to build this site?",
      content:
        "Mainly: ReactJS, React Query, Redux, etc. along with the TMDB API for movie data!",
    },
    {
      title: "Why was this site built?",
      content:
        "Our mission is to make the joy of movie-watching accessible to all, providing a user-friendly interface that makes navigation effortless and enjoyable.",
    },
    {
      title: "Is there any Google Ads enabled?",
      content:
        "No. Our site is ad-free. If you saw any Google ads or redirection, it is probably from a third-party iframe which I can't control. Please prefer using the Brave browser that blocks these ads very effectively.",
    },
    {
      title: "Where are the media files hosted?",
      content:
        "We don't host any of the media files on our server, we just stream the media from servers that hosts the media which are fetched based on your selection.",
    },
    {
      title: "Who created this site?",
      content:
        "This site was created by <a href='https://nirajanmalla.com.np' style='color:#85144b;'>Nirajan Malla</a>, solely as a side project to help people watch their favorite movies free of cost and ads, straight from any device with a browser and internet connection.",
    },
    {
      title: "Can I contribute to the website?",
      content:
        "Yes, the project is open source at <a href='https://github.com/NirajanM/Movie-site-with-react' style='color:#85144b;'>github</a>, don't forget to ping me <a href='https://discordapp.com/users/461510337678540822' style='color:#7FDBFF;'>here</a> with your contribution.",
    },
  ],
};

const styles = {
  bgColor: "transparent",
  rowTitleColor: "white",
  rowContentColor: "#AAAAAA",
  arrowColor: "#FFDC00",
};

export default function FaqPage() {
  return (
    <>
      <div className="flex max-w-screen-xl mx-auto">
        <Menu />
        <div className="w-full text-white mt-10 py-4 md:mt-0 flex justify-start items-start flex-col gap-4 md:gap-8 lg:gap-12">
          <h2 className="text-xl lg:text-4xl text-pahelo">
            Some general FAQs :
          </h2>
          <Faq data={data} styles={styles} />
        </div>
      </div>
    </>
  );
}
