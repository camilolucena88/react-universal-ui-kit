import React from 'react';
import { Button as ButtonMui } from '@mui/material'

type ButtonProps = {
  dataName: string;
};

const Button: React.FC<ButtonProps> = ({ dataName }) => (
  <ButtonMui>{dataName}</ButtonMui>
);

export default Button;
