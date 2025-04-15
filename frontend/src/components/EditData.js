import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { pink, purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import imageCompression from "browser-image-compression"
import axios from 'axios'
import { base_url } from '../Constant/ApiUrl'
import dayjs from 'dayjs';
import DialogActions from '@mui/material/DialogActions';
import { toast, Toaster } from "react-hot-toast";



const EditData = ({ editData, setOpen,refetch }) => {

    const [editinterName, seteditInterName] = useState(editData?.Name || "")
    const [editemail, seteditEmail] = useState(editData.Email || '')
    const [editaddress, seteditAddress] = useState(editData.Address || "")
    const [editcity, seteditCity] = useState(editData.City || '')
    const [editstate, seteditState] = useState(editData.State || '')
    const [editpincode, seteditPinCode] = useState(editData.PinCode || "")
    const [editcountry, seteditCountry] = useState(editData.Country || '')
    const [editphone, seteditPhone] = useState(editData.Phone || "")
    const [editcollegeName, seteditCollegeName] = useState(editData.College || "")
    const [editpursingDegree, seteditPursingDegree] = useState(editData.PursingDegree || "")
    const [edittopicPrj, seteditTopicPrj] = useState(editData.ProjectTopic || "")
    const [editbeginDate, seteditBeginDate] = useState(editData.BeginDate || "")
    const [editendDate, seteditEndDate] = useState(editData.EndDate || "")
    const [editamount, seteditAmount] = useState(editData.Amount || "")
    const [editselectedValue, seteditSelectedValue] = useState(editData.ResumeBonafide || "");
    const [editmode, seteditMode] = useState(editData.ModeofPayment || '')
    const [editPaymentmode, seteditPaymentmode] = useState(editData.MethodOfPayment || "")
    const [editapplicationDate, seteditApplicationDate] = useState(editData.ApplicationDate || '')
    const [editonlineAmount, seteditOnlineAmount] = useState(editData.OnlineAmount || "")
    const [edittotalAmount, seteditTotalAmount] = useState(editData.TotalAmount || '')
    const [editprojectExp, seteditProjectExp] = useState(editData.PrjReleventExp || '')
    const [editselectedOption, seteditSelectedOption] = useState(editData.StudentPursing || 'OnProgress')
    const [editselectedFileName, seteditSelectedFileName] = useState('Upload Files')
    const [editselectedFile, seteditSelectedFile] = useState(editData.bonafideFile || "")



    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleChange = (event) => {
        seteditSelectedValue(event.target.value);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (file) {
            const name = file.name
            const truncateName = name.length > 10 ? `${name.substring(0, 10)}...` : name
            seteditSelectedFileName(truncateName)

            const options = {
                fileType: "image/webp",
                useWebWorker: true
            }
            try {
                const compressionFile = await imageCompression(file, options)
                const render = new FileReader()
                render.onloadend = () => {
                    seteditSelectedFile(render.result)
                }
                render.readAsDataURL(compressionFile)
            }
            catch (error) {
                console.log("error in File compression", error)
            }


        }

    }



    //remaining

    const handleUpdate = async (e) => {
        e.preventDefault();
        const remainingAmt = edittotalAmount - editonlineAmount - editamount || 0;
    
        const updateData = {
            Id: editData.Id,
            interName: editinterName,
            email: editemail,
            address: editaddress,
            city: editcity,
            state: editstate,
            pincode: editpincode,
            country: editcountry,
            phone: editphone,
            college: editcollegeName,
            pursingDegree: editpursingDegree,
            topicPrj: edittopicPrj,
            selectedValue: editselectedValue,
            beginDate: editbeginDate ? dayjs(editbeginDate).format('YYYY-MM-DD') : null,
            endDate: editendDate ? dayjs(editendDate).format("YYYY-MM-DD") : null,
            applicationDate: editapplicationDate ? dayjs(editapplicationDate).format('YYYY-MM-DD') : null,
            TotalAmount: edittotalAmount,
            paymentmode: editPaymentmode,
            onlineAmount: editonlineAmount,
            amount: editamount,
            selectedOption: editselectedOption,
            projectExp: editprojectExp,
            mode: editmode,
            selectedFile: editselectedFile, // New file (if updated)
            previousFile: editData.bonafideFile, // Previous file to be deleted
            remainingAmount: remainingAmt,
        };
    
        try {
            const res = await axios.put(`${base_url}/intershipDetails.php`, updateData, {
                headers: { "Content-Type": "application/json" },
            });
    
            if (res.data.success) {
                toast.success(res.data.message || 'User updated successfully!');
                refetch();
                setOpen(false);
            } else {
                toast.error(res.data.message || 'Failed to update user.');
            }
        } catch (error) {
            console.log(`Error in editData ${error}`);
            toast.error('Error in updating data. Please try again.');
        }
    };

    return (
        <Box component="form"

            sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', alignItems: 'center', px: '12px', width: '100%', '& .MuiTextField-root': { m: 1, backgroundColor: 'white' } }}
            noValidate
            autoComplete="off">
                
            <h3>Update</h3>
            <Box sx={{ width: '80%' }}>
                <Box sx={{ display: 'flex', justifyContent: "center", borderRadius: '10px', width: '100%' }}>

                    <TextField
                        required
                        value={editinterName || ''}
                        onChange={(e) => seteditInterName(e.target.value)}
                        id="Name"
                        label="Name"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        required
                        id="email"
                        value={editemail || ''}
                        onChange={(e) => seteditEmail(e.target.value)}
                        label="Email"
                        sx={{ width: '50%' }}
                        size='small'
                    />
                    <TextField
                        required
                        id="Address"
                        sx={{ width: '100%' }}
                        value={editaddress || ''}
                        onChange={(e) => seteditAddress(e.target.value)}
                        label="Address"
                        size='small'
                    />
                    <TextField
                        required
                        id="city"
                        value={editcity || ''}
                        onChange={(e) => seteditCity(e.target.value)}
                        label="City"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100' }}>
                    <TextField
                        required
                        id="state"
                        value={editstate || ''}
                        onChange={(e) => seteditState(e.target.value)}
                        label="State"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        required
                        id="Pincode"
                        value={editpincode || ''}
                        onChange={(e) => seteditPinCode(e.target.value)}
                        label="PinCode"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        required
                        id="Country"
                        value={editcountry || ''}
                        onChange={(e) => seteditCountry(e.target.value)}
                        label="Country"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100' }}>

                    <TextField
                        required
                        id="Phone"
                        sx={{ width: '50%' }}
                        value={editphone || ''}
                        onChange={(e) => seteditPhone(e.target.value)}
                        label="Phone No"
                        size='small'
                    />
                    <TextField
                        required
                        id="ProjectTopic"
                        sx={{ width: '100%' }}
                        value={edittopicPrj || ''}
                        onChange={(e) => seteditTopicPrj(e.target.value)}
                        label="Project Topic"
                        size='small'
                    />
                    <TextField
                        required
                        id="college"
                        value={editcollegeName || ''}
                        onChange={(e) => seteditCollegeName(e.target.value)}
                        label="CollegeName"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        required
                        id="pursngDegree"
                        value={editpursingDegree || ''}
                        onChange={(e) => seteditPursingDegree(e.target.value)}
                        label="Pursing Degree"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Application Date" value={editapplicationDate ? dayjs(editapplicationDate) : null} onChange={(newValue) => seteditApplicationDate(newValue)} slotProps={{
                            textField: {
                                size: 'small',
                                sx: {
                                    width: '50%',
                                },
                            },
                        }}
                        />
                        <DatePicker label="Begin Date" value={editbeginDate ? dayjs(editbeginDate) : null} onChange={(newValue) => seteditBeginDate(newValue)} slotProps={{
                            textField: {
                                size: 'small',
                                sx: {
                                    width: '50%',
                                },
                            },
                        }}
                        />
                        <DatePicker label="End Date" size='small' value={editendDate ? dayjs(editendDate) : null} onChange={(newValue) => seteditEndDate(newValue)} slotProps={{
                            textField: {
                                size: 'small',
                                sx: {
                                    width: '50%',
                                },
                            },
                        }} />

                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">Is your resume and bonafide <br></br> Update in the mail?</FormLabel>
                    <Box sx={{ width: '50%' }}>
                        <FormControlLabel
                            value="yes"
                            control={<Radio color="success" />}
                            label="Yes"
                            checked={editselectedValue === 'yes'}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            value="no"
                            control={
                                <Radio
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                />
                            }
                            label="No"
                            checked={editselectedValue === 'no'}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ width: '50%' }}>
                        <Button
                            component="label"
                            role={undefined}
                            disabled={editselectedValue === 'no' || !editselectedValue}
                            tabIndex={editselectedValue === 'no' || !editselectedValue ? -1 : 0}
                            variant="contained"
                            sx={{ width: '100%', backgroundColor: 'blue' }}
                            startIcon={<CloudUploadIcon />}
                        >
                            {editselectedFile}
                            <VisuallyHiddenInput
                                type="file"
                                disabled={editselectedValue === 'no' || !editselectedValue}
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '12px', alignItems: 'center' }}>
                    <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">If you have any relevant experience <br></br> or project,please specify?</FormLabel>
                    <TextField
                        required
                        id="projectexp"
                        value={editprojectExp || ''}
                        onChange={(e) => seteditProjectExp(e.target.value)}
                        size='small'
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        required
                        id="total amount"
                        value={edittotalAmount || ''}
                        onChange={(e) => seteditTotalAmount(e.target.value)}
                        label="Total Amount"
                        size='small'
                        sx={{ width: '50%' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">Student Pursing*</FormLabel>
                    <Autocomplete
                        options={[{ label: "OnProgress", value: "OnProgress" }, { label: "Complete", value: "Complete" }]}
                        getOptionLabel={(option) => option.label}
                        value={editselectedOption ? { label: editselectedOption, value: editselectedOption } : null}
                        onChange={(_, newValue) => seteditSelectedOption(newValue?.value || "")}
                        size='small'
                        sx={{ width: '50%' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Type" variant="outlined" id="movieType-selection" required />
                        )}
                        clearOnEscape

                    />

                </Box>

                {/*payment  mode */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">Mode of Intership Payment</FormLabel>
                    <Box sx={{ width: '50%' }}>
                        <FormControlLabel
                            value="Online"
                            control={<Radio color="success" />}
                            label="Online"
                            checked={editmode === 'Online'}
                            onChange={(e) => seteditMode(e.target.value)}
                        />
                        <FormControlLabel
                            value="Offline"
                            control={
                                <Radio
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                />
                            }
                            label="Offline"
                            checked={editmode === 'Offline'}
                            onChange={(e) => seteditMode(e.target.value)}
                        />
                    </Box>

                    {editmode === 'Online' &&
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">Method of Payment</FormLabel>
                            <Box sx={{ width: '50%' }}>
                                <FormControlLabel
                                    value="Gpay"
                                    control={<Radio color="success" />}
                                    label="Gpay"
                                    checked={editPaymentmode === 'Gpay'}
                                    onChange={(e) => seteditPaymentmode(e.target.value)}
                                />
                                <FormControlLabel
                                    value="PhonePay"
                                    control={
                                        <Radio
                                            sx={{
                                                color: purple[800],
                                                '&.Mui-checked': {
                                                    color: purple[600],
                                                },
                                            }}
                                        />
                                    }
                                    label="PhonePay"
                                    checked={editPaymentmode === 'PhonePay'}
                                    onChange={(e) => seteditPaymentmode(e.target.value)}
                                />
                            </Box>
                        </Box>
                    }
                    {editmode === 'Offline' &&
                        <Box>
                            <TextField
                                required
                                id="amount"
                                value={editamount || ''}
                                onChange={(e) => seteditAmount(e.target.value)}
                                label="Amount"
                                size='small'
                                sx={{ width: '90%' }}
                            />
                        </Box>
                    }

                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {editPaymentmode && editmode === "Online" &&
                        <>
                            <TextField
                                required
                                id="OnlineAmount"
                                value={editonlineAmount || ''}
                                onChange={(e) => seteditOnlineAmount(e.target.value)}
                                label="Amount"
                                size='small'
                                sx={{ width: '50%' }}
                            />
                        </>

                    }
                </Box>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Close
                    </Button>
                    <Button sx={{ backgroundColor: "blue" }} variant="contained" onClick={handleUpdate}>
                        Update
                    </Button>
                </DialogActions>
            </Box>
        </Box>
    )
}

export default EditData