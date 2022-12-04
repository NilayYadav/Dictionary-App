import React from "react";
import Definition from "./Definition";
import "./Meaning.css";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      <h3>{props.meaning.partOfSpeech}</h3>
      {props.meaning.definitions.map(function (definition, index) {
        return (
          <div key={index}>
            <Definition
              definition={definition}
              search={props.search}
              setKeyword={props.setKeyword}
            />
          </div>
        );
      })}
    </div>
  );
}
