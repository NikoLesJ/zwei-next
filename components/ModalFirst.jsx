"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useModalFormStore from '@/store/modalFormStore';
import useStore from '@/store/store';

export default function ModalFirst({ icon, data, template }) {
  const { sendFormData } = useModalFormStore();
  const { category, subCategory} = useStore();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button color='success' size='small' variant="outlined" onClick={handleClickOpen}>
        {icon}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            
            try {
              await sendFormData(formJson, category, subCategory);
              handleClose();
            } catch (error) {
              console.error('Failed to submit form:', error);
            }
          },
        }}
      >
        <DialogTitle>Create: <span className='font-bold text-green-600 uppercase'>{data}</span> Attribute</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {icon.props.color === "success" ? "Добавить новый атрибут:" : " Добавить новую опцию:"}
          </DialogContentText>
            {template.map((item, index) => (
              <TextField
                key={index}
                required
                margin="dense"
                id={item}
                name={item}
                label={item}
                type="text"
                fullWidth
                variant="standard"
              />
            ))}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color='success' variant='outlined'>Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
