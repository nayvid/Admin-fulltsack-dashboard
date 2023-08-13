import {createTheme} from '@mui/icons-material/styles';

export const shades = {
black: {
    100: "#ffffffcc",
    200: "#ffffff99",
    300: "#ffffff66",
    400: "#ffffff33",
    500: "#00000000",
    600: "#00000033",
    700: "#00000066",
    800: "#00000099",
    900: "#000000cc"
},
secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006"
},
neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
    700: "#7c7b7b",
    800: "#535252",
    900: "#292929"
},
}

export const theme = createTheme({
    palette : {
        primary : {
            main: shades.primary[500]
        },
        secondary : {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            ligt: shades.neutral[100]
        }

    },

    typography : {
        fontFamily: ["Fauna One","sans-serif"].join(","),
        fontSize:11,
        h1: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize:48,
        },
        h2: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize:36,
        },
        h3: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize:20,
        },
        h4: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize:14,
        },

    }
})



