import { useParams } from "react-router-dom";

export default function Play() {
    const { id } = useParams();
    return (
        <div className="text-xl text-white w-screen h-screen mt-16 max-w-screen-xl mx-auto sm:px-4 px-2 mb-20">
            <iframe name="iframe1" id="iframe1" src={`https://autoembed.to/movie/tmdb/${id}`} width="100%" height="100%" sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" />
        </div>
    )
}
