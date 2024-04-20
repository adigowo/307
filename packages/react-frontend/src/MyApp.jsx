// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';




  
  function MyApp() {
    const [characters, setCharacters] = useState([
      
    ]);

    
    function updateList(person) {
        postUser(person)
            .then((response) => response.json())  
            .then((addedPerson) => {
                if (response.status === 201) {
                    setCharacters((prevCharacters) => [...prevCharacters, addedPerson]);
                } else {
                    throw new Error('Failed to create user');
                }
            })
            .catch((error) => console.log("Error posting user:", error));
    }
}

function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE'
    });
}

function removeOneCharacter(index) {
    const user = characters[index];
    if (!user) return;

    deleteUser(user.id)
        .then((response) => {
            if (response.status === 204) {
                const updated = characters.filter((_, i) => i !== index);
                setCharacters(updated);
            } else if (response.status === 404) {
                console.error("Resource not found, no object was deleted.");
            } else {
                throw new Error('Failed to delete the user');
            }
        })
        .catch((error) => console.log("Error deleting user:", error));
}


      function fetchUsers() {
        fetch("http://localhost:8000/users")
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log("Error fetching users:", error));
    }

    function postUser(person) {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        });
    }
    

    useEffect(() => {
        fetchUsers();
    }, []);
  
  
    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );


export default MyApp;