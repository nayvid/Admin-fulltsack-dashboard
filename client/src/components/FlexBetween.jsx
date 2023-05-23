//We use it for creating a styled component
//We can reuse the styles of the component
//this is basically html but for React we are writting the html in jsx

const {Box} = require("@mui/material");
const {styled} = require("@mui/system");

const FlexBetween = styled(Box)
(
    {
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
    }
)

export default FlexBetween;