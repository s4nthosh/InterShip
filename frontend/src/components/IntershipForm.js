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
import axios from 'axios'
import {base_url} from '../Constant/ApiUrl'
import dayjs from 'dayjs';
import { toast, Toaster } from "react-hot-toast";



const IntershipForm = () => {

  const [interName, setInterName] = useState(null)
  const [email, setEmail] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [pincode, setPinCode] = useState(null)
  const [country, setCountry] = useState(null)
  const [phone, setPhone] = useState(null)
  const [collegeName, setCollegeName] = useState(null)
  const [pursingDegree, setPursingDegree] = useState(null)
  const [topicPrj, setTopicPrj] = useState(null)
  const [beginDate, setBeginDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [amount, setAmount] = useState(null)
  const [selectedValue, setSelectedValue] = useState('');
  const [mode, setMode] = useState('')
  const [Paymentmode, setPaymentmode] = useState('')
  const [applicationDate, setApplicationDate] = useState(null)
  const [onlineAmount, setOnlineAmount] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const [projectExp, setProjectExp] = useState(null)
  const [selectedOption, setSelectedOption] = useState('OnProgress')
  const [selectedFileName, setSelectedFileName] = useState('Upload Files')
  const [selectedFile, setSelectedFile] = useState('')




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
    setSelectedValue(event.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      const name = file.name
      const truncateName = name.length > 10 ? `${name.substring(0, 10)}...` : name
      setSelectedFileName(truncateName)
    }
    setSelectedFile(file)
  }


  const handleSave = async (e) => {
    e.preventDefault();
  
    const remainingAmt = totalAmount - (onlineAmount ? onlineAmount : amount || 0);
  
    const formData = new FormData();
    formData.append('selectedFile', selectedFile);
    formData.append('interName', interName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('pincode', pincode);
    formData.append('country', country);
    formData.append('phone', phone);
    formData.append('collegeName', collegeName);
    formData.append('pursingDegree', pursingDegree);
    formData.append('topicPrj', topicPrj);
    formData.append('selectedValue', selectedValue);
    formData.append('beginDate', beginDate ? dayjs(beginDate).format('YYYY-MM-DD') : '');
    formData.append('endDate', endDate ? dayjs(endDate).format('YYYY-MM-DD') : '');
    formData.append('applicationDate', applicationDate ? dayjs(applicationDate).format('YYYY-MM-DD') : '');
    formData.append('totalAmount', totalAmount);
    formData.append('Paymentmode', Paymentmode);
    formData.append('onlineAmount', onlineAmount);
    formData.append('amount', amount);
    formData.append('selectedOption', selectedOption);
    formData.append('projectExp', projectExp);
    formData.append('mode', mode);
    formData.append('remainingAmount', remainingAmt);
  
    try {
      const res = await axios.post(`${base_url}/intershipDetails.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.data.success) {
        toast.success(res.data.message || 'Data inserted successfully!');
      } else {
        toast.error(res.data.message || 'Failed to insert data.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('Error occurred while saving data.');
    }
    setInterName('')
    setEmail('')
    setAddress('')
    setAmount('')
    setApplicationDate(null)
    setBeginDate(null)
    setEndDate(null)
    setCity('')
    setCollegeName('')
    setMode('')
    setOnlineAmount('')
    setPaymentmode('')
    setPhone('')
    setProjectExp('')
    setPinCode('')
    setSelectedFile('')
    setSelectedFileName('Upload Files')
    setPursingDegree('')
    setPinCode('')
    setSelectedOption('OnProgress')
    setSelectedValue('')
    setCountry('')
    setTotalAmount('')
    setTopicPrj('')

  };
  
  return (
    <Box component="form"
      sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', alignItems: 'center', px: '12px', width: '100%', '& .MuiTextField-root': { m: 1, backgroundColor: 'white' } }}
      noValidate
      autoComplete="off">

        <Toaster
                position="top-center"
                reverseOrder={false}
              />
      <h3>Registation-Form</h3>
      <Box sx={{ width: '80%' }}>
        <Box sx={{ display: 'flex', justifyContent: "center", borderRadius: '10px', width: '100%' }}>

          <TextField
            required
            value={interName || ''}
            onChange={(e) => setInterName(e.target.value)}
            id="Name"
            label="Name"
            size='small'
            sx={{ width: '50%' }}
          />
          <TextField
            required
            id="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            sx={{ width: '50%' }}
            size='small'
          />
          <TextField
            required
            id="Address"
            sx={{ width: '100%' }}
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
            size='small'
          />
          <TextField
            required
            id="city"
            value={city || ''}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            size='small'
            sx={{ width: '50%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100' }}>
          <TextField
            required
            id="state"
            value={state || ''}
            onChange={(e) => setState(e.target.value)}
            label="State"
            size='small'
            sx={{ width: '50%' }}
          />
          <TextField
            required
            id="Pincode"
            value={pincode || ''}
            onChange={(e) => setPinCode(e.target.value)}
            label="PinCode"
            size='small'
            sx={{ width: '50%' }}
          />
          <TextField
            required
            id="Country"
            value={country || ''}
            onChange={(e) => setCountry(e.target.value)}
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
            value={phone || ''}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone No"
            size='small'
          />
          <TextField
            required
            id="ProjectTopic"
            sx={{ width: '100%' }}
            value={topicPrj || ''}
            onChange={(e) => setTopicPrj(e.target.value)}
            label="Project Topic"
            size='small'
          />
          <TextField
            required
            id="college"
            value={collegeName || ''}
            onChange={(e) => setCollegeName(e.target.value)}
            label="CollegeName"
            size='small'
            sx={{ width: '50%' }}
          />
          <TextField
            required
            id="pursngDegree"
            value={pursingDegree || ''}
            onChange={(e) => setPursingDegree(e.target.value)}
            label="Pursing Degree"
            size='small'
            sx={{ width: '50%' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Application Date" value={applicationDate ? dayjs(applicationDate) : null} onChange={(newValue) =>setApplicationDate(newValue)} slotProps={{
              textField: {
                size: 'small',
                sx: {
                  width: '50%',
                },
              },
            }}
            />
            <DatePicker label="Begin Date" value={beginDate ? dayjs(beginDate) : null} onChange={(newValue)=>setBeginDate(newValue)} slotProps={{
              textField: {
                size: 'small',
                sx: {
                  width: '50%',
                },
              },
            }}
            />
            <DatePicker label="End Date" size='small' value={endDate ? dayjs(endDate) : null} onChange={(newValue)=>setEndDate(newValue)} slotProps={{
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
              checked={selectedValue === 'yes'}
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
              checked={selectedValue === 'no'}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ width: '50%' }}>
            <Button
              component="label"
              role={undefined}
              disabled={selectedValue === 'no' || !selectedValue}
              tabIndex={selectedValue === 'no' || !selectedValue ? -1 : 0}
              variant="contained"
              sx={{ width: '100%', backgroundColor: 'blue' }}
              startIcon={<CloudUploadIcon />}
            >
              {selectedFileName}
              <VisuallyHiddenInput
                type="file"
                disabled={selectedValue === 'no' || !selectedValue}
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
            value={projectExp || ''}
            onChange={(e) => setProjectExp(e.target.value)}
            size='small'
            sx={{ width: '50%' }}
          />
          <TextField
            required
            id="total amount"
            value={totalAmount || ''}
            onChange={(e) => setTotalAmount(e.target.value)}
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
            value={selectedOption ? { label: selectedOption, value: selectedOption } : null}
            onChange={(_, newValue) => setSelectedOption(newValue?.value || "")}
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
              checked={mode === 'Online'}
              onChange={(e) => setMode(e.target.value)}
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
              checked={mode === 'Offline'}
              onChange={(e) => setMode(e.target.value)}
            />
          </Box>

          {mode === 'Online' &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FormLabel sx={{ width: '50%' }} id="demo-form-control-label-placement">Method of Payment</FormLabel>
              <Box sx={{ width: '50%' }}>
                <FormControlLabel
                  value="Gpay"
                  control={<Radio color="success" />}
                  label="Gpay"
                  checked={Paymentmode === 'Gpay'}
                  onChange={(e) => setPaymentmode(e.target.value)}
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
                  checked={Paymentmode === 'PhonePay'}
                  onChange={(e) => setPaymentmode(e.target.value)}
                />
              </Box>
            </Box>
          }
          {mode === 'Offline' &&
            <Box>
              <TextField
                required
                id="amount"
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount"
                size='small'
                sx={{ width: '90%' }}
              />
            </Box>
          }

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Paymentmode && mode === "Online" &&
            <>
              <TextField
                required
                id="OnlineAmount"
                value={onlineAmount || ''}
                onChange={(e) => setOnlineAmount(e.target.value)}
                label="Amount"
                size='small'
                sx={{ width: '50%' }}
              />
            </>

          }
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ backgroundColor: "blue" }} disabled={!interName} variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default IntershipForm