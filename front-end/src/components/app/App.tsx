import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import ContactPage from '../pages/contactPage/contactPage';
import UserLoginPage from '../student/studentLoginPage/studentLoginPage';
import Menu from '../menu/menu';
import SubjectsList from '../student/SubjectsList/SubjectsList';
import SubjectPage from '../student/SubjectPage/SubjectPage';
import ProfessorStudentList from '../professor/ProfessorStudentsList/ProfessorStudentsList';

function App() {
  return (
    <Container className='mt-4'>
      <Menu/>
        <Routes>
          <Route path='/' element={ <div></div> } />
          <Route path='/contact' element={ <ContactPage /> } />
          
          <Route path='/auth/student/login' element={ <UserLoginPage /> } />
          <Route path='/subjects' element={ <SubjectsList/> } />
          <Route path='/subject/:id' element={ <SubjectPage/> } />
          <Route path='/profesor/dashboard' element={ <ProfessorStudentList/> } />
          
        </Routes>
    </Container>
  );
}

export default App;
