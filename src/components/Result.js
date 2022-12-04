import React from "react";
import Phonetic from "./Phonetic";
import Meaning from "./Meaning";
import "./Result.css";

export default function Result(props) {
  if (props.result) {
    return (
      <div className="Result">
        <section>
          <h2>{props.result.word}</h2>

          {props.result.phonetics.map(function (phonetic, index) {
            return (
              <div key={index}>
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
        </section>

        {/* Looping Meaning component
        <Meaning meaning={props.result.meanings[0]} />
        <Meaning meaning={props.result.meanings[1]} />
        <Meaning meaning={props.result.meanings[2]} /> */}

        {props.result.meanings.map(function (meaning, index) {
          return (
            <section key={index}>
              <Meaning
                meaning={meaning}
                search={props.search}
                setKeyword={props.setKeyword}
              />
            </section>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
