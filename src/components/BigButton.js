import { styled } from '@mui/system';
import { Button } from '@mui/material';


const BigButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor:  theme.palette.primary.dark,
      },
    marginTop: "1em",
    color: theme.palette.primary.contrastText,
    fontFamily: "Shadows Into Light, cursive",
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.3em' , 
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '2em' , 
    }, 
    [theme.breakpoints.up('md')]: {
        fontSize: '3em' ,
    },
    fontWeight: "500",
    padding: "0 2em 0 2em",
    borderRadius: "20px",
}));

export default function StyledButton({ children, page, onClickFunction }) {
  return (
        <BigButton onClick={onClickFunction} href={page}>{children}</BigButton>
  );
}