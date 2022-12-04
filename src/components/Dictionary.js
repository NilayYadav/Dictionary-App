import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  const languages = [
    { id: 0, cod: "en_US", language: "English (US)" },
    { id: 1, cod: "hi", language: "Hindi" },
    { id: 2, cod: "es", language: "Spanish" },
    { id: 3, cod: "fr", language: "French" },
    { id: 4, cod: "ja", language: "Japanese" },
    { id: 5, cod: "ru", language: "Russian" },
    { id: 6, cod: "en_GB", language: "English (UK)" },
    { id: 7, cod: "de", language: "German" },
    { id: 8, cod: "it", language: "Italian" },
    { id: 9, cod: "ko", language: "Korean" },
    { id: 10, cod: "pt-BR", language: "Brazilian Portuguese" },
    { id: 11, cod: "ar", language: "Arabic" },
    { id: 12, cod: "tr", language: "Turkisk" },
  ];
  let [language, setLanguage] = useState({
    cod: languages[0].cod,
    language: languages[0].language,
  });
  let [keyword, setKeyword] = useState(props.keyword);
  let [result, setResult] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState([]);

  function handleKeyword(e) {
    setKeyword(e.target.value.trim());
  }

  function handleResponse(response) {
    setResult(response.data[0]);
  }

  function handleError(error) {
    console.clear(error);

    alert(
      `😮 Sorry, we can't find the definition of "${keyword}" 
Please type the correct word in ${language.language} 🌎`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    search(keyword);
  }

  function load() {
    search(keyword);
    setLoaded(true);
  }

  function search(keyword) {
    setKeyword(keyword);

    //Documentation: https://dictionaryapi.dev/
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/${language.cod}/${keyword}`;

    axios.get(apiUrl).then(handleResponse).catch(handleError);

    // Documentation Photos API: https://www.pexels.com/api/documentation/
    let pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY;
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };

    axios
      .get(pexelsApiUrl, { headers: headers })
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((error) => {
        console.clear(error);
      });
  }

  function quickSelection(e) {
    e.preventDefault();
    search(e.target.innerHTML);
  }

  function selectLanguage(e) {
    e.preventDefault();
    setLanguage({
      cod: languages[e.target.value].cod,
      language: languages[e.target.value].language,
    });
  }

  let lists = ["inspiration", "love", "happy", "traveling", "sunrise"];

  let form = (
    <section>
      <p>What word do you want to look up?</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="search"
            name="search"
            placeholder="Search for a word..."
            defaultValue={keyword}
            onChange={handleKeyword}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        <div>
          <select
            className="form-select"
            id="lang"
            onChange={selectLanguage}
            defaultValue={language}
          >
            {languages.map(function (lan) {
              return (
                <option key={lan.id} value={lan.id} label={lan.language}>
                  {lan.language}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="hint">
        Get definitions, synonyms, translations and more
      </div>
      <div className="list">
        <ul>
          {lists.map(function (list, index) {
            return (
              <li key={index}>
                <a href="/" onClick={quickSelection}>
                  {list}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );

  if (loaded) {
    return (
      <div className="Dictionary">
        {form}
        <Result result={result} search={search} setKeyword={setKeyword} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return (
      <div className="Dictionary">
        {form}
        Loading...
      </div>
    );
  }
}
