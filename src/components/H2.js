import { styled } from '@mui/system';
import { Typography } from '@mui/material';


const H2 = styled(Typography)(({ theme }) => ({
    fontFamily: "Shadows Into Light, cursive",
    fontWeight: "400",
    color: "primary.dark",
    cursor: "default",
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
        fontSize: '2em' , 
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '2.5em' , 
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3em' , 
    },
}));

export default function StyledTypo({ children }) {
  return (
        <H2>{children}</H2>
  );
}