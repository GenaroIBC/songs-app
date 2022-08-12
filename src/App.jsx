import axios from "axios";
import { useState } from "react";
import "./App.css";
import { ArtistCard } from "./components/artist-card/ArtistCard";
import { Loader } from "./components/generics/Loader";
import { SearchForm } from "./components/search-form/SearchForm";
import { SongCard } from "./components/song-card/SongCard";

const SONG_INPUT_NAME = "song-name";
const ARTIST_INPUT_NAME = "artist-name";
const ARTIST_URL = "https://theaudiodb.com/api/v1/json";
const SONG_URL = `https://api.lyrics.ovh/v1`;
const API_KEY = 2;
const inputsConfig = [
  {
    name: ARTIST_INPUT_NAME,
    label: "Artist",
    required: true,
  },
  {
    name: SONG_INPUT_NAME,
    label: "Song",
    required: false,
  },
];

function App() {
  const [artistData, setArtistData] = useState(null);
  const [songData, setSongData] = useState(null);
  const [artistReqError, setArtistReqError] = useState(null);
  const [songReqError, setSongReqError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const song = e.target[SONG_INPUT_NAME].value.trim();
    const artist = e.target[ARTIST_INPUT_NAME].value.trim();

    setLoading(true);
    setArtistData(null);
    setSongData(null);
    setArtistReqError(null);
    setSongReqError(null);
    try {
      const [{ value: artistResponse }, { value: songResponse }] =
        await Promise.allSettled([
          axios.get(`${ARTIST_URL}/${API_KEY}/search.php?s=${artist}`),
          song && axios.get(`${SONG_URL}/${artist}/${song}/?key=${API_KEY}`),
        ]);

      console.log({ artistResponse });
      console.log({ songResponse });

      if (!artistResponse.data.artists) {
        throw { code: 404, message: "not found", target: "artist" };
      }

      if (artistResponse.data.artists) {
        setArtistReqError(null);
        const {
          intBornYear,
          intDiedYear,
          strArtist,
          strArtistThumb,
          strBiographyEN,
          strCountry,
          strGender,
          strGenre,
          strWebsite,
        } = artistResponse.data.artists[0];

        setArtistData({
          intBornYear,
          intDiedYear,
          strArtist,
          strArtistThumb,
          strBiographyEN,
          strCountry,
          strGender,
          strGenre,
          strWebsite,
        });
      }

      if (song && !songResponse) {
        throw { code: 404, message: "not found", target: "song" };
      } else if (song && songResponse.status === 200) {
        setSongReqError(null);
        setSongData(songResponse.data.lyrics);
      }
    } catch (error) {
      if (error.target === "artist") setArtistReqError(error);
      else if (error.target === "song") setSongReqError(error);

      console.log("catch");
      setLoading(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showError = ({ code, message }) => {
    return (
      <p>
        Error {code}: {message}. The song/artist you are looking for doesn't
        exists in our database, please try again.
      </p>
    );
  };

  console.log(artistReqError);
  console.log(songReqError);
  // setInterval(() => console.log(songReqError), 2000);
  return (
    <main className="container-fluid ">
      <div className="row py-3 mb-3 bg-dark border p-4  ">
        <div className="col-12">
          <SearchForm handleSubmit={handleSubmit} inputsConfig={inputsConfig} />
        </div>
      </div>
      {loading ? (
        <Loader color="#0f7" />
      ) : (
        <div className="row fs-4 text-white">
          <div className="col-6 text-center">
            {artistReqError ? (
              showError(artistReqError)
            ) : artistData ? (
              <ArtistCard {...artistData} />
            ) : (
              "Enter an artist..."
            )}
          </div>
          <div className="col-6 text-center">
            {songReqError ? (
              showError(songReqError)
            ) : songData ? (
              <SongCard lyrics={songData} />
            ) : (
              "Enter a song..."
            )}
          </div>
        </div>
      )}
    </main>
  );
}
export default App;
