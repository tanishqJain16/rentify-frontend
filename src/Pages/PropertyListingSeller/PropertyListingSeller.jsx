import React, { useEffect, useState } from 'react';
import "./PropertyListingSeller.css";
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import { useAddPropertyMutation, useGetUserPropertyQuery } from '../../Services/PropertyDetails';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import noData from "../../assets/noData.webp"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import toast from 'react-hot-toast';

function PropertyListingSeller() {
    const [openModal, setOpenModal] = useState(false);
    const [openPersonModel, setOpenPersonModel] = useState(false);

    const [body, setBody] = useState({
        propertyType: "Single family home",
        propertyLocation: "",
        propertyPrice: "",
        propertyArea: "",
        propertyOwner: localStorage.getItem('username'),
        propertyOwnerPhNumber: localStorage.getItem('phNumber'),
        propertyOwnerEmail: localStorage.getItem('email'),
        propertyImage: ""
    });

    const closePersonModalFun = () => {
        setOpenPersonModel(false);
    };

    const openPersonModalFun = () => {
        setOpenPersonModel(true);
    };

    const [addProperty, { data, error, isLoading, isSuccess }] = useAddPropertyMutation();
    const { data: propertiesData, error: propertiesError, isLoading: propertiesLoading, refetch: refetchProperties, isError: propertiesIsError, isSuccess: propertiesIsSuccess } = useGetUserPropertyQuery({
        email: localStorage.getItem('email')
    });

    useEffect(() => {
        if (propertiesLoading) {
            toast.loading('Fetching Registered properties...', { id: 'fetchingProperties' });
        } else if (propertiesIsError) {
            toast.error('Failed to fetch properties', { id: 'fetchingProperties' });
        } else if (propertiesIsSuccess) {
            toast.success('Properties fetched successfully', { id: 'fetchingProperties' });
        }
    }, [propertiesLoading, propertiesIsError, propertiesIsSuccess]);


    useEffect(() => {
        console.log(body);
    }, [body]);

    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logged out successfully');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000); // Redirect after 2 seconds
    };

    const openModalFun = () => {
        setOpenModal(true);
    };

    const closeModalFun = () => {
        setOpenModal(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handlePropertyType = (e) => {
        setBody({ ...body, propertyType: e.target.value });
    };

    const handleLocationChange = (e) => {
        setBody({ ...body, propertyLocation: e.target.value });
    };

    const handlePriceChange = (e) => {
        setBody({ ...body, propertyPrice: e.target.value });
    };

    const handleAreaChange = (e) => {
        setBody({ ...body, propertyArea: e.target.value });
    };

    const handlePropertyImageChange = (e) => {
        setBody({ ...body, propertyImage: e.target.value });
    };

    const handleChangeInBedrooms = (e) => {
        setBody({ ...body, noOfBedrooms: e.target.value });
    };

    const handleChangeInBathrooms = (e) => {
        setBody({ ...body, noOfBathrooms: e.target.value });
    };

    const handleChangeInHospitals = (e) => {
        setBody({ ...body, noOfHospitals: e.target.value });
    };

    const handleChangeInSchools = (e) => {
        setBody({ ...body, noOfSchools: e.target.value });
    };

    const handleAddProperty = (e) => {
        e.preventDefault();
        toast.promise(
            addProperty(body).unwrap()
                .then((response) => {
                    refetchProperties();
                    closeModalFun();
                    setBody({
                        propertyType: "Single family home",
                        propertyLocation: "",
                        propertyPrice: "",
                        propertyArea: "",
                        noOfBedrooms: 0,
                        noOfBathrooms: 0,
                        noOfHospitals: 0,
                        noOfSchools: 0,
                        propertyOwner: localStorage.getItem('username'),
                        propertyOwnerPhNumber: localStorage.getItem('phNumber'),
                        propertyOwnerEmail: localStorage.getItem('email'),
                        propertyImage: ""
                    });
                    return response.message;
                })
                .catch((error) => {
                    throw new Error(error.data.message);
                }),
            {
                loading: 'Adding property...',
                success: 'Property added successfully!',
                error: 'Failed to add property. Please try again.',
            }
        );
    };

    const style2 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className='sellerListingPage'>
            <Modal
                open={openPersonModel}
                onClose={closePersonModalFun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="deleteBtns">
                            <button className="addProperty" onClick={openModalFun}>Add Property</button>
                            <button className="logout" onClick={handleLogout}>Logout</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openModal}
                onClose={closeModalFun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Property
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleAddProperty}>
                            <div className="form-group">
                                <label htmlFor="type">Property Type</label>
                                <select name="type" id="propertyType" onChange={handlePropertyType}>
                                    <option value="Single family home">Single family home</option>
                                    <option value="Bungalow">Bungalow</option>
                                    <option value="Farmhouse">Farmhouse</option>
                                    <option value="Co-operative housing">Co-operative housing</option>
                                    <option value="Appartments">Appartments</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="propertyLocation"
                                    value={body.propertyLocation}
                                    onChange={handleLocationChange}
                                />
                            </div>
                            <div className="form-group" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div className="price">
                                    <label htmlFor="price">Price (in ₹)</label>
                                    <input
                                        type="number"
                                        id="propertyPrice"
                                        value={body.propertyPrice}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                                <div className="area">
                                    <label htmlFor="area">Area (in ft<sup>2</sup>)</label>
                                    <input
                                        type="number"
                                        id="propertyArea"
                                        value={body.propertyArea}
                                        onChange={handleAreaChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div className="dropdown">
                                    <label htmlFor="bedrooms">No. of bedrooms</label>
                                    <select name="bedrooms" id="noOfBedrooms" onChange={handleChangeInBedrooms}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <label htmlFor="bathrooms">No. of bathrooms</label>
                                    <select name="bathrooms" id="noOfBathrooms" onChange={handleChangeInBathrooms}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group" style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div className="dropdown">
                                    <label htmlFor="hospitals">Nearby Hospitals</label>
                                    <select name="hospitals" id="noOfHospitals" onChange={handleChangeInHospitals}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <label htmlFor="schools">Nearby Schools</label>
                                    <select name="schools" id="noOfSchools" onChange={handleChangeInSchools}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    id="propertyImage"
                                    value={body.propertyImage}
                                    onChange={handlePropertyImageChange}
                                />
                            </div>
                            <button type="submit">Add Property</button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <div className="sellerHeader">
                <div className="leftSellerHeader">
                    <h2>Listed Properties</h2>
                </div>
                <div className="rightSellerHeader">
                    <button className="addProperty" onClick={openModalFun}>Add Property</button>
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
                <div className="personIcon" onClick={openPersonModalFun}>
                    <PersonOutlineOutlinedIcon />
                </div>
            </div>
            <div className="listedProperties">
                {
                    propertiesData?.data.length === 0 && <div className="noDataDiv">
                        <img className='noDataImage' src={noData} alt="" />
                    </div>
                }
                {propertiesData && propertiesData.data.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
}

export default PropertyListingSeller;
