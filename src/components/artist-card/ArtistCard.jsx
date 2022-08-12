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
  return (
    <article className="bg-secondary col-6 p-3">
      <figure className="max-w-100">
        <img className="w-100 rounded" src={strArtistThumb} />
        <figcaption className="fs-1">{strArtist}</figcaption>
      </figure>
      <p className="artist__bio">{strBiographyEN}</p>
      <p className="artist__country">Country: {strCountry}</p>
      <p className="artist__genre">Genre: {strGenre}</p>
      <div className="artist__gender">
        {strGender === "Male" ? <FaMale /> : <FaFemale />}
      </div>
      <p className="artist__born-date">
        {intBornYear} - {intDiedYear ? intDiedYear : "present"}
      </p>
      {strWebsite ? (
        <p className="artist__web">
          <a className="artist__web__link" href={strWebsite}>
            Web site
          </a>
        </p>
      ) : null}
    </article>
  );
}
