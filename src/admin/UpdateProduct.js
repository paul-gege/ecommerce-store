import React, {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index.js";
import {Link} from "react-router-dom";
import {getProduct, createProduct, getCategories, updateProduct} from "./apiAdmin.js";
import {AuthSuccessDiv, AuthErrorDiv} from "../styled-components/AuthStyles.js";
import styled from "styled-components";
import HeaderContainer from "../styled-components/HeaderDiv.js"

const UpdateProduct = ({match}) => {
	const {user, token} = isAuthenticated();
    const [oldCategory, setOldCategory] = useState("");
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        error: "",
        photos: [],
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const [categories, setCategories] = useState([]);
    const [displayUploads, setUploads] = useState([]);
	
	const {
        name,
        description,
        price,
        category,
        quantity,
        error,
        photo,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const initCategories = () => {
    	getCategories().then((data) => {
    		if(data.error){
    			setValues({...values, error: data.error});
    		} else {
    			setCategories(data);
    		}
    	})
    }

    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            } else {
                console.log(data.name)
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                setOldCategory(data.category._id);
                initCategories();
            }
        })
    }

    useEffect(() => {
    	init(match.params.productId);
    }, []);


    //Article on rendering images on upload
    //https://www.raymondcamden.com/2013/09/10/Adding-a-file-display-list-to-a-multifile-upload-HTML-control
    const handleUpload = (e) => {
        if(!e.target.files || !window.FileReader) return;

        let files = e.target.files;
        let filesArr = Array.prototype.slice.call(files);

        filesArr.forEach((f) => {
            if(!f.type.match("image.*")) {
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                setUploads([...displayUploads, e.target.result]);
                // var html = "<img src=\"" + e.target.result + "\">" + f.name + "<br clear=\"left\"/>";
                // selDiv.innerHTML += html;               
            }
            reader.readAsDataURL(f); 
        });    
    }

    //rendering images as user selects them
    const renderUploads = () => {
        return (
        <UploadDiv>
            {
                displayUploads.map((result) => {
                    return <img key={result} src={result} />;
                })
            }
        </UploadDiv>
        )
    }

    const handleChange = (name) => {
    	return (event) => {
    		let value = ""

    		if(name === "photo"){
                //To set images of uploads;
                handleUpload(event);
                setUploads([]);
				value = event.target.files;
				for(const file of event.target.files){
                    //Appending multiple images to our photos form "name"
					formData.append("photos", file, file.name);
				}
    		} else {
				value = event.target.value;
    			formData.set(name, value);
    		}
    		// const value = (name === "photo") ? event.target.files : event.target.value;
    	
    		setValues({...values, [name]: value});
    	}
    }

    const clickSubmit = (event) => {
		//Submit to our post route
		event.preventDefault();
		setValues({...values, error: ""});
		updateProduct(match.params.productId, user._id, token, formData)
		.then((data) => {
			if(data.error){
				setValues({...values, error: data.error});
			} else {
				setValues({
					...values,
					name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    createdProduct: data.name
				})
			}
		})
    };

    const newProductForm = () => {
		return (
        <ProductFormDiv>
        <form onSubmit={clickSubmit}>
			<AuthErrorDiv displayMe={error}><p>{error}</p></AuthErrorDiv>
			<AuthSuccessDiv displayMe={createdProduct}><p>{createdProduct} is updated</p></AuthSuccessDiv>
            <input
                className="textInputs"
                onChange={handleChange("name")}
                type="text"
                className="form-control"
                value={name}
                placeholder="Product Name"
            />

            <textarea
                onChange={handleChange("description")}
                className="form-control"
                value={description}
                placeholder="Product Description"
            />

            <input
                className="textInputs"
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                value={price}
                placeholder="Input product price"
            />


            <select
                onChange={handleChange("category")}
                className="form-control"
            >
                <option>Please select a category</option>
                {categories &&
                    categories.map((c, i) => (
                        <option key={i} value={c._id} >
                            {c.name}
                        </option>
                    ))}
            </select>
            
            <input
                className="btn"
                className="textInputs"
                onChange={handleChange("quantity")}
                type="number"
                className="form-control"
                value={quantity}
                placeholder = "Product Quantity"
            />

            <UploadDiv>
                <label htmlFor="file-upload" className="upload-btn">
                    Choose multiple images to upload
                </label>
                <input
                    id="file-upload"
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image/*"
                    multiple
                />
                {renderUploads()}
            </UploadDiv>
            <hr/>
            <button>Update Product</button>
        </form>  </ProductFormDiv>)   	
    }

	return (
		<div>
            <HeaderContainer><h1> Update Product </h1></HeaderContainer>
			{newProductForm()}
		</div>
	)

}

const ProductFormDiv = styled.div`
    width: 70%;
    max-width: 960px;
    margin 25px auto;
    box-shadow: -5px 5px 7px #E5E5E5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    
    hr {
        width: 60%;
        color: white;
    }
    
    form {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 90%;
    }

    input[type=text], input[type=number]  {
        border: 0;
        border-bottom: 2px solid black;
        width: 60%;
        color: black;
        height: 30px;
    }

    textarea {
        border: 2px solid black;
        width: 90%;
        height: 100px;
    }

    textarea::placeholder {
        color:black;
    }

    input::placeholder {
        color: black;
    }

    select {
        appearance: none;
        width: 60%;
        border: 2px solid black;
        height: 40px;
        background-color: white;
        padding: 5px;
    }

    select:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid black;
        border-color: black;
    }

    button {
        width: 30%;
        height: 45px;
        border-radius: 10px;
        background-color: #22CCF2;
        border: 0;
        color: white;
    }

    @media (max-width: 768px) {
        width: 100%;
    }

`

const UploadDiv = styled.div`
    display: flex;
    flex-direction: column;
    img {
        width: 100px;
        height: 100px;
        border: 2px solid grey;
        margin-top: 10px;
    }

    input[type=file] {
        display: none;
    }

    .upload-btn {
        cursor: pointer;
        border: 2px solid black;
        color: black;
        background-color: white;
        padding: 8px 20px;
        border-radius: 8px;
        font-size: 16px;
    }

    .upload-btn:hover {
        border: 2px solid black;
        color: white;
        background-color: black;
    }
`


export default UpdateProduct;