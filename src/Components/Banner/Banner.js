import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import YouTube from "react-youtube";
import { API_KEY, imageUrl } from "../../constants/constants";
function Banner() {
  const [movie, setMovie] = useState("");
  const [movieurl, setMovieurl] = useState("");

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        const random = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[random]);
      });
  }, []);

  //Banner Play button function//
  const play = () => {
    axios
      .get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        console.log(resp);
        if (resp.data.results.legth !== 0) {
          setMovieurl(resp.data.results[0]);
        }
      });
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl + movie.backdrop_path})` }}
      className="banner"
    >
      {movieurl && <YouTube videoId={movieurl.key} opts={opts} />}
      <div className="content">
        <h1 className="title">{movie.title} </h1>
        <div className="banner_buttons">
          <button className="button" onClick={play}>
            Play
          </button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie.overview}</h1>
      </div>

      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
