import { styled } from '@mui/system';
import { Typography } from '@mui/material';


const H1 = styled(Typography)(({ theme }) => ({
    fontFamily: "Shadows Into Light, cursive",
    fontWeight: "600",
    color: "primary.dark",
    cursor: "default",
    [theme.breakpoints.up('xs')]: {
        fontSize: '3em' , 
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '4em' , 
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '5em' , 
    },
}));

export default function StyledTypo({ children }) {
  return (
        <H1>{children}</H1>
  );
}