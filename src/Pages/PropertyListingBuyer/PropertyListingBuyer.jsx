import React, { useEffect, useState } from 'react';
import './PropertyListingBuyer.css';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useGetAllPropertyQuery } from '../../Services/PropertyDetails';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Modal, Slider, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import noData from "../../assets/noData.webp"

function PropertyListingBuyer() {
    const { data, error, isError, isLoading, isSuccess } = useGetAllPropertyQuery();
    const [openFilterModel, setOpenFilterModel] = useState(false);
    const [sortedProperties, setSortedProperties] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [value, setValue] = React.useState([5000, 50000]);
    const [filteredLocation, setFilteredLocation] = useState('');

    useEffect(() => {
        if (data) {
            setSortedProperties(data.data);
        }
    }, [data]);

    useEffect(() => {
        if (isLoading) {
            toast.loading('Fetching Registered properties...', { id: 'fetchingProperties' });
        } else if (isError) {
            toast.error('Failed to fetch properties', { id: 'fetchingProperties' });
        } else if (isSuccess) {
            toast.success('Properties fetched successfully', { id: 'fetchingProperties' });
        }
    }, [isLoading, isError, isSuccess]);

    const closeFilterModalFun = () => {
        setOpenFilterModel(false);
    };

    const openFilterModalFun = () => {
        setOpenFilterModel(true);
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logged out successfully');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000); // Redirect after 2 seconds
    };

    const handleSortLowToHigh = () => {
        const sorted = [...sortedProperties].sort((a, b) => a.propertyPrice - b.propertyPrice);
        setSortedProperties(sorted);
        setSelectedFilter('lowToHigh');
    };

    const handleSortHighToLow = () => {
        const sorted = [...sortedProperties].sort((a, b) => b.propertyPrice - a.propertyPrice);
        setSortedProperties(sorted);
        setSelectedFilter('highToLow');
    };

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const filterButtonStyle = {
        backgroundColor: '#ff6b6b',
        color: 'white',
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const filteredData = data?.data?.filter((property) => property.propertyPrice >= value[0] && property.propertyPrice <= value[1]);
        setSortedProperties(filteredData);
    }, [value, data]);

    const handleLocationFilter = (e) => {
        setFilteredLocation(e.target.value);
        const filteredData = data?.data?.filter((property) => property.propertyLocation.toLowerCase().includes(e.target.value.toLowerCase()));
        setSortedProperties(filteredData);
    };

    const handleResetButton = () => {
        setFilteredLocation('');
        setValue([5000, 50000]);
        setSortedProperties(data?.data);
        setSelectedFilter(null);
    };

    return (
        <div className='buyerListingPage'>
            <Modal
                open={openFilterModel}
                onClose={closeFilterModalFun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Filters
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="dataFilters">
                            <div className="priceFilter">
                                <div
                                    className="lowToHigh"
                                    onClick={handleSortLowToHigh}
                                    style={selectedFilter === 'lowToHigh' ? filterButtonStyle : {}}
                                >
                                    Low to High
                                </div>
                                <div
                                    className="highToLow"
                                    onClick={handleSortHighToLow}
                                    style={selectedFilter === 'highToLow' ? filterButtonStyle : {}}
                                >
                                    High to Low
                                </div>
                            </div>
                            <div className="rangeSelector">
                                <label htmlFor="range">Price Range</label>
                                <Box sx={{ width: 300 }}>
                                    <Slider
                                        getAriaLabel={() => 'Price range'}
                                        value={value}
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        min={5000}
                                        max={50000}
                                        sx={{
                                            '& .MuiSlider-thumb': {
                                                color: "#F76262"
                                            },
                                            '& .MuiSlider-track': {
                                                color: "#F76262"
                                            },
                                        }} 
                                    />
                                </Box>
                            </div>
                            <div className="locationFilter">
                                <label htmlFor="location">Location</label>
                                <input type="text" value={filteredLocation} onChange={handleLocationFilter} />
                            </div>
                            <div className="resetFilterButtonDiv">
                                <button onClick={handleResetButton}>Reset</button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <div className="buyerHeader">
                <div className="leftBuyerHeader">
                    <h2>All Listed Properties</h2>
                </div>
                <div className="rightBuyerHeader">
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
                <div className="personIcon" onClick={handleLogout}>
                    <LogoutOutlinedIcon />
                </div>
            </div>
            {localStorage.getItem('profession') === 'buyer' &&
                <div className="filterDiv">
                    <div className="filters" onClick={openFilterModalFun}>
                        Filters <FilterAltOutlinedIcon />
                    </div>
                </div>
            }
            <div className="buyerListingArea" style={localStorage.getItem('profession') === 'buyer' ? { minHeight: "calc(100vh - 6.5rem)" } : {}}>
                {sortedProperties?.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
}

export default PropertyListingBuyer;
