import {Pencil,User,Phone,MapPin,Mail,CalendarCheck,KeyRound,LogOut,ArrowLeft,UserRoundPen} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import useStore from '../store/useStore';

const Profile=()=>{

  const {isLogged,setLoggedIn,setCurrentUser,currUser} =useStore();
  const navigate=useNavigate();
  const [view,setView]=useState("profile");
  const [userData, setUserData] = useState(currUser||{
    firstName: '',
    lastName:'',
    email: '',
    phone: 'Not provided',
    address: 'Not provided'
  });
  const [tempData, setTempData] =useState({ ...userData });

  useEffect(() => {
    if (currUser) setUserData(currUser);
  }, [currUser]);
  
  
  const inputStyle = {
  backgroundColor: '#fdfcfb',
  border: '1px solid #e0d2bd',
  borderRadius: '10px',
  padding: '12px',
  fontSize: '15px'
};
   const handleSave = () => {

    const phoneRegex = /^[0-9]{10}$/;

    const updatedUser = {
      ...userData,
      firstName:tempData.firstName,
      lastName:tempData.lastName,
      phone: tempData.phone,
      address: tempData.address
    };
    if (!phoneRegex.test(tempData.phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return; // Stop the function here
    }
    if(tempData.firstName=="")
    {
      alert("Please fill the First Name");
      return;
    }
    if(tempData.address=="")
    {
      alert("Please fill the address");
      return;
    }
    

    setCurrentUser(updatedUser);
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsersArray = allUsers.map(u => 
    u.email === updatedUser.email ? updatedUser : u
  );
  localStorage.setItem('users', JSON.stringify(updatedUsersArray));
    setView("profile");
  };
  const handleEditClick = () => {
    setTempData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address
    });
    setView("edit");
  };
  return(
    
    <div style={{backgroundColor:"#FFFFFF",height:"100%",padding:"20px"}}>
      <div style={{backgroundColor:"#F8F3EE",height:"100%", minHeight:"620px" ,maxWidth:"980px",width:"100%",borderRadius:"20px",padding:"15px"}}>
      { view=== "profile" ? (
        <>
      <div className='d-flex justify-content-between align-items-center'>
      <h1>Account Setting and Profile</h1>
      <button onClick={handleEditClick} style={{padding:"7px",margin:"0px",borderRadius:"5px",backgroundColor:"#E8DED3",borderStyle:"none"}}className="btn btn-outline-dark btn-md  d-flex align-items-center gap-2"  type="button"><Pencil size={16} />Edit</button>
      </div>
      <div className='row g-4'>
        <div className='col-12 col-lg-7'>
          <div className='card soft-card p-3 p-md-4 shadow-sm' style={{borderRadius:"20px"}}>
            <div className='d-flex justify-content-center'>
                <div style={{width: '96px',
              height: '96px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: '#e6dccb',
              border: '3px solid #e0d2bd',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,.06)',
              fontWeight: '800',
              color: '#4a3b26',
              userSelect: 'none',
              paddingTop:"10px"
            }}> 
            <h1>{userData.firstName.charAt(0).toUpperCase()}</h1>
        </div>
        </div>
            <ProfileField
                    icon={<User size={18} />}
                    label="First Name:"
                    value={userData.firstName}
                    line={true}
                  />
            <ProfileField
                    icon={<User size={18} />}
                    label="Last Name:"
                    value={userData.lastName}
                    line={true}
                  />
                  <ProfileField
                    icon={<Phone size={18} />}
                    label="Mobile Number:"
                    value={userData.phone || "Not provided"}
                    line={true}
                  />
                  <ProfileField
                    icon={<MapPin size={18} />}
                    label="Address:"
                    value={userData.address || "Not provided"}
                    line={true}
                  />
                  <ProfileField
                    icon={<Mail size={18} />}
                    label="Email:"
                    value={userData.email}
                    helper="Email cannot be changed"
                    line={false}
                  />

        </div>
        </div>
            <div className="col-12 col-lg-5">
              <div className="card  mb-4 p-2 shadow-sm" style={{borderRadius:"10px"}}>
                  <div className="card-body d-flex align-items-center m-2" style={{backgroundColor:"#E8DED3",borderRadius:"5px"}}>
                    <div className="me-3 icon-badge">
                      <CalendarCheck size={30} className='mb-5' />
                    </div>
                    <div>
                      <div className="field-label mb-0">Membership Status</div>
                      <div className="fw-bold fs-5 pb-2">245 Days Remaining</div>
                      <button 
                          style={{ 
                          backgroundColor: '#946d61ff', // Deep Brown
                          color: '#FFFFFF',           // White
                          borderRadius: '8px',
                          transition: '0.3s',
                          borderStyle:'none'
                        }}
                        className="btn btn-outline-primary d-flex align-items-center border-2 rounded-pill px-4 py-2 mt-2">
                        <UserRoundPen size={18} />
                        <span className="ms-2 fw-semibold">Renew Membership</span>
                      </button>
                      </div>
                  </div>
                </div>
                
                <div className="card soft-card mb-4 shadow-sm">
                  <div className="card-body">
                    <div className="field-label mb-2">Access</div>
                    <ProfileField
                      icon={<KeyRound size={20}/>}
                      label="Change Password:"
                      value="Click to Change"
                      line={false}
                    />
                  </div>
                </div>
                <div className="mt-0 mt-lg-5 pt-lg-5 d-flex justify-content-center justify-content-lg-end pb-3"> {/*style={{marginTop:"170px",marginRight:"20px"}}*/}
                  <button
                    style={{backgroundColor:"#E8DED3",borderStyle:"none"}}
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    type="button"
                    onClick={()=>{
                      setLoggedIn(false);
                      setCurrentUser(null);
                      navigate('/login')
                    }}
                  >
                    <LogOut size={18} />
                    LOGOUT
                  </button>
                </div>
              




            </div>
      </div>
      </>
      ):(
        <>
    <div className="d-flex align-items-center gap-3 mb-4">
    <button 
      onClick={() => setView("profile")} 
      className="btn p-0 border-0 shadow-none"
      style={{ color: '#4a3b26' }}
    >
      <ArrowLeft size={24} />
    </button>
    <h1 className="mb-0">Edit Profile Details</h1>
  </div>

  <div className="card soft-card p-4 shadow-sm" style={{ borderRadius: "20px", border: 'none' }}>
    <form className="row g-4">
      {/* First Name */}
      <div className="col-md-6">
        <div className="d-flex align-items-center gap-2 mb-2">
          <User size={18} className="text-muted" />
          <label className="fw-bold mb-0 ">First Name</label>
        </div>
        <input 
          type="text" 
          className="form-control custom-input" 
          value={tempData.firstName}
          required
          onChange={(e) => setTempData({...tempData, firstName: e.target.value})}
          style={inputStyle}
        />
      </div>

      {/* Last Name */}
      <div className="col-md-6">
        <div className="d-flex align-items-center gap-2 mb-2">
          <User size={18} className="text-muted" />
          <label className="fw-bold mb-0">Last Name</label>
        </div>
        <input 
          type="text" 
          className="form-control" 
          value={tempData.lastName}
          onChange={(e) => setTempData({...tempData, lastName: e.target.value})}
          style={inputStyle}
        />
      </div>

      {/* Phone */}
      <div className="col-12">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Phone size={18} className="text-muted" />
          <label className="fw-bold mb-0">Phone Number</label>
        </div>
        <input 
          type="tel" 
          className="form-control" 
          value={tempData.phone}
          onChange={(e)=>{setTempData({...tempData,phone:e.target.value})}}
          style={inputStyle}
        />
      </div>

      {/* Address */}
      <div className="col-12">
        <div className="d-flex align-items-center gap-2 mb-2">
          <MapPin size={18} className="text-muted" />
          <label className="fw-bold mb-0">Address</label>
        </div>
        <textarea 
          className="form-control" 
          rows="3"
          value={tempData.address}
          onChange={(e)=>{setTempData({...tempData,address:e.target.value})}}
          style={inputStyle}
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="col-12 d-flex gap-3 mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="btn px-4 fw-bold"
          style={{ backgroundColor: "#E8DED3", border: "none", borderRadius: "8px" }}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => setView("profile")}
          className="btn btn-link text-decoration-none text-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</>      )
    }
      </div>
    </div>
  )
}

const ProfileField=({icon,label,value,line})=>
{
  return(
    <>
    <div className={`d-flex  align-items-start mb-3 ${line?'border-bottom':' '} pb-2`}>
      <span className='pe-3'>
        {icon}
      </span>
      <div className='d-flex flex-column lh-1'>
        <p className='mb-1 fw-bold'>{label}</p>
        <p className='mb-1 text-muted'>{value}</p>
      </div>
    </div>
    </>
  )
}

export default Profile;