import axios from "axios";
import { useState } from "react";
import "./App.css";
import { ArtistCard } from "./components/artist-card/ArtistCard";
import { Form } from "./components/form/Form";

const SONG_INPUT_NAME = "song-name";
const ARTIST_INPUT_NAME = "artist-name";
const BASE_URL = "https://theaudiodb.com/api/v1/json";
const API_KEY = 2;

function App() {
  const [artistData, setArtistData] = useState({});
  const [requestError, setRequestError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const inputValue = e.target[ARTIST_INPUT_NAME].value.trim();
    if (!inputValue) return;

    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/search.php?s=${inputValue}`
    );

    if (!response.data.artists) {
      setRequestError(true);
      return;
    }

    console.log(response.data);

    if (response.status === 200) {
      setRequestError(false);
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
      } = response.data.artists[0];

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
  };

  return (
    <>
      {/* <Form handleSubmit={handleSubmit} inputName={SONG_INPUT_NAME} /> */}
      <Form handleSubmit={handleSubmit} inputName={ARTIST_INPUT_NAME} />
      {requestError ? (
        <p>
          The artist you are looking for doesn't exists in our database, please
          try again.
        </p>
      ) : (
        <ArtistCard {...artistData} />
      )}
    </>
  );
}
export default App;
