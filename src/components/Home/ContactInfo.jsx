import React, { useState } from 'react';
import KontaktForma from './KontaktForma';
import APslika from '../../assets/profilna.png';
import githubIcon from '../../assets/github_icon.png';
import linkedinIcon from '../../assets/linkedin_icon.png';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

const ContactInfo = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="contact-info">
      <div className="left-section">
        <div className="author-section">
          <img src={APslika} alt="Profile" className="profile-image" />
          <div className="author-text">  
            <p>Antonia Pešo</p>
            
            </div>
          <div className="links">
              <a href="https://github.com/apeso" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" width="30px" />
              </a>
              <a href="https://www.linkedin.com/in/antonia-pešo-9a163222a" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" width="30px" />
              </a>
            </div>

        </div>
      </div>
      <div className="right-section">
        <div className="contact-form">
          <Button variant="outlined" onClick={handleOpen}>Contact me</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Contact me</DialogTitle>
            <DialogContent>
              <KontaktForma handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      <p>All credit for creating this web application goes to Antonia Pešo.</p>
      </div>
    </div>
  );
};

export default ContactInfo;
