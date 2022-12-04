import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "./Phonetic.css";

export default function Phonetic(props) {
  let audio = new Audio(props.phonetic.audio);

  function start() {
    audio.play();
  }

  return (
    <div className="Phonetic">
      {props.phonetic.audio && (
        <FontAwesomeIcon
          icon={faPlayCircle}
          className="playIcon"
          onClick={start}
        />
      )}{" "}
      {props.phonetic.text !== undefined && (
        <div className="text">{props.phonetic.text}</div>
      )}
    </div>
  );
}
