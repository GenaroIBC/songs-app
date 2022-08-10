import React from "react";

import { FaFemale, FaMale } from "react-icons/fa";

export function ArtistCard({
  intBornYear,
  intDiedYear,
  strArtist,
  strArtistThumb,
  strBiographyEN,
  strCountry,
  strGender,
  strGenre,
  strWebsite,
}) {
  console.log(strWebsite);
  return (
    <>
      <figure>
        <img src={strArtistThumb} />
        <figcaption>{strArtist}</figcaption>
      </figure>
      <p>{strBiographyEN}</p>
      <p>Country: {strCountry}</p>
      <p>Genre: {strGenre}</p>
      <div>{strGender === "Male" ? <FaMale /> : <FaFemale />}</div>
      <p>
        {intBornYear} - {intDiedYear ? intDiedYear : "present"}
      </p>
      {strWebsite ? (
        <p>
          <a href={strWebsite}>Web site</a>
        </p>
      ) : null}
    </>
  );
}
