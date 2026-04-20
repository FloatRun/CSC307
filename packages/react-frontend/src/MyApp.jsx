import React, { useState, useEffect } from "react"
import Table from "./Table"
import Form from "./Form"

const charsArr = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users")
  return promise
}


function MyApp(){
    const [chars, setChars] = useState(charsArr);

    function removeOneChar(index) {
      const updated = chars.filter((character, i) => {
          return i !== index;
          });
          setChars(updated);
    }
    function appendChar(person) {
      postUser(person)
        .then(() => {
          setChars([...chars, person]) // sort of manual change based on state
        })
        .catch((error) => {
          console.log(error)
        })
    }

    function postUser(person) {
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })

      return promise
    }

    useEffect(() => {
      fetchUsers()
      .then((res) => res.json())
      .then((json) => setChars(json["users_list"]))
      .catch((error) => {
        console.log(error)
      }),
      []
    })

    return (
    <div className="container">
      <Table charData={chars} removeChar={removeOneChar}/>
      <Form handleSubmit={appendChar}/>
    </div>
    )
}

export default MyApp;