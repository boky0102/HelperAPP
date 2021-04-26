import digital from "../static/categoryIcons/furniture.svg";
import furniture from "../static/categoryIcons/furniture2.svg";
import gardening from "../static/categoryIcons/gardening.svg";
import hardLabour from "../static/categoryIcons/wood.svg";
import driving from "../static/categoryIcons/taxi.svg";
import teaching from "../static/categoryIcons/teacher.svg";
import cleaning from "../static/categoryIcons/floor-cleaning.svg";
import plumbing from "../static/categoryIcons/tap.svg";
import machineFix from "../static/categoryIcons/spanner.svg";
import { Box, Typography } from "@material-ui/core";

function Category(props){
    console.log(props.category);
    switch(props.category){
        case "Digital":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Digital</Typography>
                    <img src={digital}  width="25px"/>
                </Box>
            );
            break;

        case "Furniture moving":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Furniture Moving</Typography>
                    <img src={furniture}  width="25px"/>
                </Box>
            )
            break;

        case "Hard Labour":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Hard labour</Typography>
                    <img src={hardLabour}  width="25px"/>
                </Box>
            )
            break;

        case "Cleaning":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Cleaning</Typography>
                    <img src={cleaning}  width="25px"/>
                </Box>
            )
            break;

        case "Gardening":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Gardening</Typography>
                    <img src={gardening}  width="25px"/>
                </Box>
            )
            break;

        case "Driving":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Driving</Typography>
                    <img src={driving}  width="25px"/>
                </Box>
            )
            break;

        case "Teaching":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Teaching</Typography>
                    <img src={teaching}  width="25px"/>
                </Box>
            )
            break;

        case "Furniture Building":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Furniture Building</Typography>
                    <img src={furniture}  width="25px"/>
                </Box>
            )
            break;

        case "Machine fixing":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Machine fixing</Typography>
                    <img src={machineFix}  width="25px"/>
                </Box>
            )
            break;

        case "Plumbing":
            return (
                <Box display="flex" flexDirection="row">
                    <Typography>Plumbing</Typography>
                    <img src={plumbing}  width="25px"/>
                </Box>
            )

        default:
            return(
                <Box></Box>
            )

        
    }


}





export default Category;