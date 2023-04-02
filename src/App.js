import './App.css';
import React, { useState } from "react";
import { Button, List, message } from "antd";
import StudentForm from './components/StudentForm';
import PairList from './components/PairList';
import { shuffle } from "lodash";
import emailjs from "emailjs-com";

const StudentList = ({ students }) => (
  <List
    dataSource={students}
    renderItem={(student) => (
      <List.Item>
        {student.firstName} {student.lastName} ({student.email})
      </List.Item>
    )}
  />
);
const App = () => {
  const [students, setStudents] = useState([]);
  const [pairs, setPairs] = useState([]);

  const handleStudentSubmit = (student) => {
    setStudents([...students, student]);
  };

  const handlePairGenerate = () => {
    if (students.length < 2) {
      message.error("Veuillez ajouter au moins deux étudiants !");
      return;
    }

    const shuffledStudents = shuffle(students);
    const newPairs = [];
    for (let i = 0; i < shuffledStudents.length; i += 2) {
      const pair = { students: [shuffledStudents[i], shuffledStudents[i + 1]], task: "" };
      newPairs.push(pair);
    }
    setPairs(newPairs);
  };

  const handlePairChange = (newPairs) => {
    setPairs(newPairs);
  };

  const handleEmailSend = () => {
    if (pairs.length === 0) {
      message.error("Veuillez générer des binômes avant d'envoyer les e-mails !");
      return;
    }

    const serviceId = "service_j9awh0r";
    const templateId = "template_4py3k8v";
    const userId = "YOUR_EMAILJS_USER_ID";

const emailData = {
  pairs: pairs.map((pair) => ({
    students: `${pair.students[0].firstName} ${pair.students[0].lastName} et ${pair.students[1].firstName} ${pair.students[1].lastName}`,
    task: pair.task,
  })),
};

emailjs.send(serviceId, templateId, emailData, userId)
.then((response) => {
    message.success("E-mails envoyés avec succès !");
  },
  (error) => {
    console.error(error);
    message.error("Erreur lors de l'envoi des e-mails.");
  }
);
};

return (
<>
  <h1>Enregistrer des étudiants</h1>
  <StudentForm onSubmit={handleStudentSubmit} />
  <StudentList students={students} />
   <div className='data'>
     <h2>Générer des binômes</h2>
     <Button type="primary" onClick={handlePairGenerate}>
       Générer des binômes
     </Button>
     <PairList pairs={pairs} onChange={handlePairChange} />
   
     <h3>Envoyer des e-mails</h3>
     <Button type="primary" onClick={handleEmailSend}>
       Envoyer des e-mails
     </Button>
    </div> 
</>
);
};

export default App;