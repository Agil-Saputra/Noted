import React, { useState, useEffect } from "react";
import Card from "../components/card";
import Loading from "../components/loading";
import Masonry from "react-masonry-css";
import { db } from "../api/client"
import { onSnapshot, collection } from "firebase/firestore";

export default function home() {
const [notes, setNotes] = useState([])
  const colRef = collection(db, "Notes");

  // get data and view it to UI
  useEffect(() => {
    function getData() {
      onSnapshot(colRef, (snapshot) =>
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    }

    getData();
  }, []);

  return (
    <>
{ notes[0] ? 
    <Masonry
      breakpointCols={
        notes.length <= 2
        ? {default:  2, 800: 1}
        : {default: 3, 800 : 1, 1100: 2 }
      }
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >

   
  {notes.map(item => (
  <Card key={item.id} title={item.title} details={item.details} category={item.category} id={item.id}/>
  )) }

    </Masonry>
    : <Loading/>
}
    </>
  );
}
