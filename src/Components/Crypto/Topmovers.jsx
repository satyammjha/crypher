import React from 'react'
import { Customcard } from '../Customcard/Customcard'

const Topmovers = () => {
    return (
        <Customcard

            height={'73vh'}
            marginTop={'10px'}
            width={'30vw'}
            css={{
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                    width: '12px',
                },
                '::-webkit-scrollbar-button': {
                    width: '1',
                },
            }}
        >



            <h1>Satyam Jha</h1>



        </Customcard>
    )
}

export default Topmovers
