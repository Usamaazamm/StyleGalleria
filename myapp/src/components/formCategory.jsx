import React from 'react'

const FormCategory = ({ handleSubmit, value, setvalue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <input type="text" placeholder='enter the category'
                        value={value}
                        onChange={(e) => setvalue(e.target.value)} />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </>
    )
}

export default FormCategory;