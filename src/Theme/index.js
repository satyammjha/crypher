import { extendTheme } from '@chakra-ui/react';

export const Theme = extendTheme({

    font: {
        heading: 'Ubuntu',
        body: 'Ubuntu',
    }
    ,
    styles: {
        global: {
            'body': {
                bg: "#C5C6D0"
            }
        },
    },
    colors: {
        purple: {
            500: '#5F00D9'
        },
        p: {

            purple: '#5F00D9',
            black: '#171717'
        },
        black: {
            5: '#F3F3F7',
            10: '#EEEEF4',
            20: '#D8DDE2',
            40: '#BABAC4',
            60: '#797E82',
            80: '#535D66',

        }
    },
    textStyles: {
        h1: {

            base: '30px',
            md: '32px',
        },
        color: 'p.black',
        lineHeight: {
            base: '34px',
            md: '36px'
        },
    },

    components: {
        button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: '100px',
                color: 'red'
            }

        }

    }

})