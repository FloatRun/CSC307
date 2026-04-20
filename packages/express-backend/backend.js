import express from 'express'; // ES module (async), uses CommonJS by default (sync)
import cors from "cors";
// CommonJS would be more like require('express');

const app = express();
const port = 8000;

app.use(cors()); // adds 'Access-Control-Allow-Origin' header to any response at all
app.use(express.json()); // set up express to parse incoming data in JSON

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (job != undefined && name != undefined) {
        let result = users.users_list.filter((user) => user.job === job && user.name === name)
        result = { users_list: result}
        res.send(result)
    }
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result}
        res.send(result)
    }
    else {
        res.send(users)
    }
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    let result = findUserById(id)
    if (result === undefined) {
        res.status(404).send("Resource not found.")
    }
    else {
        res.send(result)
    }
})

app.post("/users", (req, res) => {
    const user = req.body
    let addedUser = addUser(user)
    res.status(201).send(addedUser)
})

const removeUserById = ((id) => {
    users.users_list = users.users_list.filter((user) => user.id != id)
    return id
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id
    let result = findUserById(id)
    if (result === undefined) {
        res.status(404).send("Bad Id")
    }
    else {
        removeUserById(id)
        res.status(204).send(id)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})

const findUserById = (id) => {
    return users.users_list.find((user) => user.id === id);
}

const findUserByName = (name) => {
    return users.users_list.filter((user) => user.name === name);
}

const addUser = (user) => {
    let rand_id = Math.random()
    user["id"] = rand_id.toString()
    users.users_list.push(user)
    return user
}

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Setting debugger: export DEBUG='express:router'