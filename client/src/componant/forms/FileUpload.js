import React from 'react'

export const FileUpload = () => {
    const fileuploadAndResize = (e) => {
        console.log(e.target.files);
    }

    return (
        <div className='row-3'>
            <label className='btn btn-primary'>Choose File
                <input type="file" multiple hidden accept='images/*' onChange={fileuploadAndResize} />
            </label>
        </div>
    )
}
