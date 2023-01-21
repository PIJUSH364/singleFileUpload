import React, { useEffect, useState } from 'react'
import axios from 'axios';

const SingleFileUpload = () => {
    const [message, setMessage] = useState("");
    const [srcString, setSrcString] = useState("")
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const base = "base64";

    const handleData = () => {
        if (userName && image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', userName);
            setLoading(true);

            axios.post('http://localhost:5000/api/upload-image', formData)
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data.image.img);
                        setMessage(response.data.message);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setMessage(error.response.data.message);
                    setLoading(false);
                });
        } else {
            alert("something went wrong")
        }

    }

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
        setMessage("");
    }

    useEffect(() => {
        if (data) {
            const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data.data)));
            setSrcString(base64String);
        }
    }, [data, srcString])
    return (
        <>
            <h1>single image upload</h1>
            <h3>file size less than 5mb</h3>
            <h2 style={{ color: "red" }}>{message}</h2>
            <label>
                image:
                <input type="file" onChange={handleImageUpload} />
            </label>

            <label>
                Name:
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
            </label>
            <button onClick={handleData} >{loading ? "loading..." : "submit"}</button>
            {
                data ? <img src={`data:${data.contentType};${base},${srcString}`} alt="image" style={{ width: "150px" }} /> : null
            }
        </>
    )
}

export default SingleFileUpload