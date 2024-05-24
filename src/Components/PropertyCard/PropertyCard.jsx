import React, { useEffect, useState } from 'react';
import "./PropertyCard.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeletePropertyMutation, useGetUserPropertyQuery, useSendEmailMutation, useUpdatePropertyMutation } from '../../Services/PropertyDetails';
import { Box, Modal, Typography } from '@mui/material';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { toast } from 'react-hot-toast';

function PropertyCard(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openDetailsModel, setOpenDetailsModel] = useState(false);
    const [updateProperty] = useUpdatePropertyMutation();
    const [deleteProperty] = useDeletePropertyMutation();
    const { data: propertyData, error: propertyError, isLoading: propertyLoading, refetch: refetchProperties } = useGetUserPropertyQuery(
        { email: localStorage.getItem('email') }
    );

    const [body, setBody] = useState({
        propertyType: props?.property?.propertyType,
        propertyLocation: props?.property?.propertyLocation,
        propertyPrice: props?.property?.propertyPrice,
        propertyArea: props?.property?.propertyArea,
        noOfBedrooms: props?.property?.noOfBedrooms,
        noOfBathrooms: props?.property?.noOfBathrooms,
        noOfHospitals: props?.property?.noOfHospitals,
        noOfSchools: props?.property?.noOfSchools,
        propertyOwner: localStorage.getItem('username'),
        propertyOwnerPhNumber: localStorage.getItem('phNumber'),
        propertyOwnerEmail: localStorage.getItem('email'),
        propertyImage: props?.property?.propertyImage
    });

    useEffect(() => {
        console.log(body);
    }, [body]);

    const openDeleteModalFun = () => {
        setOpenDeleteModel(true);
    };

    const closeDeleteModalFun = () => {
        setOpenDeleteModel(false);
    };

    const openDetailsModalFun = () => {
        setOpenDetailsModel(true);
    };

    const closeDetailsModalFun = () => {
        setOpenDetailsModel(false);
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

    const handlePropertyImageChange = (e) => {
        setBody({ ...body, propertyImage: e.target.value });
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
    const style3 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [sendEmail, { data: sendEmailData, error: sendEmailError, isLoading: sendEmailIsLoading, isSuccess: sendEmailIsSuccess, isError: sendEmailIsError }] = useSendEmailMutation();

    const formatNumberToRupeesFormat = (number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
    };

    const improveTextString = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handlePropertyDelete = () => {
        toast.promise(
            deleteProperty({ id: props?.property?._id }).unwrap()
                .then((response) => {
                    refetchProperties();
                    closeDeleteModalFun();
                    return response.message;
                })
                .catch((error) => {
                    throw new Error(error.data.message);
                }),
            {
                loading: 'Deleting property...',
                success: 'Property deleted successfully!',
                error: 'Failed to delete property. Please try again.',
            }
        );
    };

    const openModalFun = () => {
        setOpenModal(true);
    };

    const closeModalFun = () => {
        setOpenModal(false);
    };

    const handlePropertyUpdate = (e) => {
        e.preventDefault();
        toast.promise(
            updateProperty({ id: props?.property?._id, body: body }).unwrap()
                .then((response) => {
                    refetchProperties();
                    closeModalFun();
                    return response.message;
                })
                .catch((error) => {
                    throw new Error(error.data.message);
                }),
            {
                loading: 'Updating property...',
                success: 'Property updated successfully!',
                error: 'Failed to update property. Please try again.',
            }
        );
    };

    function formatIndianPhoneNumber(number) {
        const numberStr = number.toString();
        if (numberStr.length !== 10) {
            throw new Error("Number must be exactly 10 digits");
        }
        return `+91 ${numberStr.slice(0, 5)}-${numberStr.slice(5)}`;
    }

    const handleSendEmail = () => {
        toast.promise(
            sendEmail({ 
                senderEmail: localStorage.getItem('email'),
                message:{
                    email: props?.property?.propertyOwnerEmail,
                    phNumber: props?.property?.propertyOwnerPhNumber,
                    name: props?.property?.propertyOwner,
                }
             }).unwrap()
                .then((response) => {
                    closeDetailsModalFun();
                    return response.message;
                })
                .catch((error) => {
                    throw new Error(error.data.message);
                }),
            {
                loading: 'Sending email...',
                success: 'Email sent to registered email ID!',
                error: 'Failed to send email. Please try again.',
            }
        );
    }

    return (
        <div className='propertyCard'>
            <Modal
                open={openDetailsModel}
                onClose={closeDetailsModalFun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Owner's Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="ownerDetails">
                           <div className="ownerName">
                            <PersonOutlineOutlinedIcon />
                            {improveTextString(props?.property?.propertyOwner)}
                           </div>
                           <div className="ownerEmail">
                            <EmailOutlinedIcon />
                            {props?.property?.propertyOwnerEmail}
                           </div>
                           <div className="ownerPhone">
                            <LocalPhoneOutlinedIcon />
                            {formatIndianPhoneNumber(props?.property?.propertyOwnerPhNumber)}
                           </div>
                           <button className="emailDetailsBtn" onClick={handleSendEmail}>
                            Email details
                           </button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openDeleteModel}
                onClose={closeDeleteModalFun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you Sure ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="deleteBtns">
                            <button className='deleteNoBtn' onClick={closeDeleteModalFun}>Cancel</button>
                            <button className='deleteYesBtn' onClick={handlePropertyDelete}>Delete</button>
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
                        Edit Property
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handlePropertyUpdate}>
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
                                        type="text"
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
                                    <select name="bedrooms" value={body.noOfBedrooms} id="noOfBedrooms" onChange={handleChangeInBedrooms}>
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
                                    <select name="bathrooms" value={body.noOfBathrooms} id="noOfBathrooms" onChange={handleChangeInBathrooms}>
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
                                    <select name="hospitals" value={body.noOfHospitals} id="noOfHospitals" onChange={handleChangeInHospitals}>
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
                                    <select name="schools" value={body.noOfSchools} id="noOfSchools" onChange={handleChangeInSchools}>
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
                            <button type="submit">Update Property</button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <img src={props?.property?.propertyImage} alt="" />
            <div className="propertyDetails">
                <div className="flatType">
                    {props?.property?.propertyType}
                </div>
                <div className="propertyOwner">
                <p><strong>Owner:</strong> {improveTextString(props?.property?.propertyOwner)}</p>
                </div>
                <div className="propertyLocation">
                    <p><strong>Location:</strong> {improveTextString(props?.property?.propertyLocation)}</p>
                </div>
                <div className="propertyPrice">
                    <p><strong>Price:</strong> {formatNumberToRupeesFormat(props?.property?.propertyPrice)}</p>
                </div>
                <div className="propertyPrice" style={{ marginBottom: "10px" }}>
                    <p><strong>Area:</strong> {props?.property?.propertyArea} (sq.ft)</p>
                </div>
                <div className="attributes">
                    <div className='bedroomsNumber'><strong><BedOutlinedIcon /></strong> {props?.property?.noOfBedrooms}</div>
                    <div className='bathroomsNumber'><strong><BathtubOutlinedIcon /></strong> {props?.property?.noOfBathrooms}</div>
                </div>
                <div className="attributes">
                    <div className='hospitalsNumber'><strong><LocalHospitalOutlinedIcon /></strong> {props?.property?.noOfHospitals}</div>
                    <div className='schoolsNumber'><strong><SchoolOutlinedIcon /></strong> {props?.property?.noOfSchools}</div>
                </div>
            </div>
            {localStorage.getItem('profession') === 'seller' && <div className="deleteProperty" onClick={openDeleteModalFun}>
                <DeleteOutlineIcon />
            </div>}
            {localStorage.getItem('profession') === 'seller' && <div className="showDetail">
                <button className="editPropertyBtn" onClick={openModalFun}>Edit Property</button>
            </div>}
            {localStorage.getItem('profession') === 'buyer' && <div className="showDetail">
                <button className="editPropertyBtn" onClick={openDetailsModalFun}>Get Details</button>
            </div>}
        </div>
    )
}

export default PropertyCard
