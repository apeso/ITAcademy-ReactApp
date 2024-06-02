import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, DialogActions, TextField } from '@mui/material';

function KontaktForma(props) {
  const db = collection(firestore, 'poruke');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(db, formData);
      toast.success('Poruka uspješno poslana!', {
        onClose: props.handleClose 
      });
      setFormData({
        fullName: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error('Došlo je do pogreške prilikom slanja poruke. Molimo pokušajte ponovno.');
    }
  };

  return (
    <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="text"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={{ marginBottom: '15px' }}
              required
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ marginBottom: '15px' }}
              required
            />
            <TextField
              multiline
              rows={4}
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              style={{ marginBottom: '15px' }}
              required
            />
            <DialogActions>
              <Button type="submit">Send Message</Button>
              <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
          </form>
      <ToastContainer />
    </div>
  );
}

export default KontaktForma;
