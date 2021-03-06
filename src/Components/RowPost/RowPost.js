import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/constants";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [movieurl, setMovieurl] = useState("");
  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response);
      setMovies(response.data.results);
    });
  }, [props.url]);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //cleckable poster image function//
  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        console.log(resp);
        if (resp.data.results.legth !== 0) {
          setMovieurl(resp.data.results[0]);
        }
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            alt="poster"
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      {movieurl && <YouTube videoId={movieurl.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
