import React, { useState } from 'react';
import { Button, Input, message } from "antd";
const StudentForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      message.error("Veuillez remplir tous les champs !");
      return;
    }

    onSubmit({ firstName, lastName, email });

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className='form'>
      <Input placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='input' />
      <Input placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} className='input' />
      <Input placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className='input'/>
      <Button type="primary" onClick={handleSubmit}>
        Ajouter
      </Button>
    </div>
  );
};
export default StudentForm ;