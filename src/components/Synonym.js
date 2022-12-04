import React from "react";
import "./Synonym.css";

export default function Synonym(props) {
  let search = props.search;
  let setKeyword = props.setKeyword;

  function handleClick(e) {
    e.preventDefault();
    setKeyword(e.target.innerHTML);
    search(e.target.innerHTML);
  }

  if (props.synonym && props.synonym.length > 0) {
    return (
      <div className="Synonym">
        <span>Synonyms:</span>
        <ul>
          {props.synonym.map(function (synonym, index) {
            return (
              <li key={index}>
                <a href="/" onClick={handleClick}>
                  {synonym}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
