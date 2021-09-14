import React from 'react'

function TableContent({ response }) {
    let num = 0;
    return (
        <>
        
            <table>
                { 
                    
                    response && response.map((elem) => {
                        return (
                            <tr key={num++}>
                                { elem }
                            </tr>
                        )
                        
                    })
                }
            </table>
        </>
    )
}

export default TableContent
