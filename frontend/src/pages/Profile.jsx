import {
  Pencil,
  User,
  Phone,
  MapPin,
  Mail,
  CalendarCheck,
  KeyRound,
  LogOut,
} from 'lucide-react';
import profilePic from '../assets/profilepic.webp';

const Profile=()=>{
  return(
    <div style={{backgroundColor:"#FFFFFF",height:"100vh",padding:"20px"}}>
      <div style={{backgroundColor:"#F8F3EE", height:"620px" ,width:"980px",borderRadius:"20px",padding:"15px"}}>
      <div className='d-flex justify-content-between align-items-center'>
      <h1>Account Setting and Profile</h1>
      <button style={{padding:"7px",margin:"0px",borderRadius:"5px",backgroundColor:"#E8DED3",borderStyle:"none"}}className="btn btn-outline-dark btn-md  d-flex align-items-center gap-2"  type="button"><Pencil size={16} />Edit</button>
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
              userSelect: 'none'
            }}> 
        </div>
        </div>
            <ProfileField
                    icon={<User size={18} />}
                    label="First Name:"
                    value="Stephan"
                    line={true}
                  />
            <ProfileField
                    icon={<User size={18} />}
                    label="Last Name:"
                    value="Vaughan"
                    line={true}
                  />
                  <ProfileField
                    icon={<Phone size={18} />}
                    label="Mobile Number:"
                    value="+1 (555) 123-4567"
                    line={true}
                  />
                  <ProfileField
                    icon={<MapPin size={18} />}
                    label="Address:"
                    value="123 Library Lane, Booktown, UK"
                    line={true}
                  />
                  <ProfileField
                    icon={<Mail size={18} />}
                    label="Email:"
                    value="stephan.v@readowl.co"
                    helper="Email cannot be changed"
                    line={false}
                  />

        </div>
        </div>
            <div className="col-12 col-lg-5">
              <div className="card  mb-4 p-2 shadow-sm" style={{borderRadius:"10px"}}>
                  <div className="card-body d-flex align-items-center m-2" style={{backgroundColor:"#E8DED3",borderRadius:"5px"}}>
                    <div className="me-3 icon-badge">
                      <CalendarCheck size={30} />
                    </div>
                    <div>
                      <div className="field-label mb-0">Membership Status</div>
                      <div className="fw-bold fs-5">245 Days Remaining</div>
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
                <div className="d-flex justify-content-end" style={{marginTop:"220px",marginRight:"20px"}}>
                  <button
                    style={{backgroundColor:"#E8DED3",borderStyle:"none"}}
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    type="button"
                  >
                    <LogOut size={18} />
                    LOGOUT
                  </button>
                </div>
              




            </div>
      </div>
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