import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';
import React from 'react'
import resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux';
export const FileUpload = ({ value, setvalue, setloading }) => {

    const { user } = useSelector(state => ({ ...state }))

    const handleremove = (id) => {
        setloading(true)
        axios.post(`${process.env.REACT_APP_API}/deleteimages`, { public_id: id }, {
            headers: {
                authtoken: user.token
            }
        }).then(res => {
            setloading(false)
            const { images } = value
            const updatedvalues = images.filter(image => {
                return image.public_id !== id
            })
            setvalue({ ...value, images: updatedvalues })
        }).catch(err => {
            setloading(false)
            console.log(err);
        })




    }

    const fileuploadAndResize = (e) => {

        let files = e.target.files;
        let alluploadedimages = value.images

        for (let i = 0; i < files.length; i++) {
            resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (uri) => {
                    setloading(true)
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri },

                        {
                            headers: {
                                authtoken: user.token,
                            }
                        }).then(res => {
                            setloading(false)
                            alluploadedimages.push(res.data)
                            setvalue({ ...value, images: alluploadedimages })

                        }).catch(err => {
                            setloading(false)

                        })

                }, "base64"

            )

        }

    }

    return (
        <>
            <div className='col'>

                {value.images && value.images.map((images) => (
                    <Badge count={"X"} onClick={() => handleremove(images.public_id)} key={images.public_id} style={{ cursor: "pointer" }}>
                        <Avatar src={images.url} size={150} className='m-3' shape="square" />
                    </Badge>
                ))}
            </div>
            <div className='row-4' >
                <label className='btn btn-info'>Choose Image File
                <input type="file" multiple hidden accept='images/*' onChange={fileuploadAndResize} />
            </label>
            </div>
        </>
    )
}
