// src/Table.jsx
import React from 'react';

function TableHeader() {
    return (
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job</th>
                <th>Actions</th>  // Column header for actions like delete
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map((character, index) => {
        return (
            <tr key={character.id}>  // Changed the key to character.id for better uniqueness handling
                <td>{character.id}</td>
                <td>{character.name}</td>
                <td>{character.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}

export default Table;
