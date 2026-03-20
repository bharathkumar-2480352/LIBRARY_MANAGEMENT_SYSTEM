import { CircleUserRound, ShoppingBag, Bell, LogOut, User, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('default');

    // Membership Data
    const daysLeft = 14;
    const totalDays = 30;
    const progressWidth = (daysLeft / totalDays) * 100;

    return (
        <div 
            className="d-flex flex-column align-items-center" 
            style={{ backgroundColor: '#F9F4F0', minHeight: '100vh', paddingTop: '120px' }}
        >
            {view === 'default' ? (
                <div 
                    className="p-4 shadow-lg" 
                    style={{ backgroundColor: '#E8DED3', height: '450px', width: '750px', borderRadius: '12px' }}
                >
                    {/* TOP HEADER SECTION - Name and Timeline side by side INSIDE the card */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        
                        {/* Left: Avatar and Info */}
                        <div className="d-flex align-items-center">
                            <CircleUserRound size={80} strokeWidth={0.75} className="me-3" />
                            <div>
                                <p className="mb-0 fw-bold" style={{ fontSize: '1.2rem' }}>Your Name</p>
                                <p className="mb-0 text-muted small">yourname@gmail.com</p>
                            </div>
                        </div>

                        {/* Right: Timeline/Membership Info */}
                        <div className="p-3" style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                            borderRadius: '10px', 
                            width: '240px',
                            border: '1px solid rgba(178, 150, 125, 0.3)' 
                        }}>
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <span className="fw-bold small" style={{ color: "#B2967D", fontSize: '0.75rem' }}>LIBRARY ACCESS</span>
                                <Calendar size={14} style={{ color: "#B2967D" }} />
                            </div>
                            <div className="d-flex align-items-baseline">
                                <h4 className="fw-bold mb-0" style={{ color: "#5D4037" }}>{daysLeft}</h4>
                                <span className="ms-1 text-muted" style={{ fontSize: '0.8rem' }}>days left</span>
                            </div>
                            <div className="progress mt-2" style={{ height: '6px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                <div 
                                    className="progress-bar" 
                                    style={{ 
                                        width: `${progressWidth}%`, 
                                        backgroundColor: '#B2967D',
                                        borderRadius: '10px' 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    {/* Navigation Buttons */}
                    <div className="mt-3">
                        <ul className="list-unstyled">
                            <li className="mb-1">
                                <button className="btn btn-none d-flex w-100 justify-content-between align-items-center py-2" onClick={() => setView('EditProfile')}>
                                    <span><User size={18} className="me-3 opacity-50" />My Profile</span> 
                                    <ChevronRight size={24} strokeWidth={1} />
                                </button>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-none d-flex w-100 justify-content-between align-items-center py-2">
                                    <span><ShoppingBag size={18} className="me-3 opacity-50"/>Past Borrows</span> 
                                    <ChevronRight size={24} strokeWidth={1} />
                                </button>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-none d-flex w-100 justify-content-between align-items-center py-2">
                                    <span><Bell size={18} className="me-3 opacity-50" />Notifications</span>
                                    <ChevronRight size={24} strokeWidth={1} />
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-none d-flex w-100 justify-content-between align-items-center py-2" onClick={() => navigate('/login')}>
                                    <span><LogOut size={18} className="me-3 opacity-50"/>Log Out</span>
                                    <ChevronRight size={24} strokeWidth={1} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                /* EDIT PROFILE VIEW */
                <div 
                    className="p-4 shadow-lg" 
                    style={{ backgroundColor: '#E8DED3', width: '750px', borderRadius: '12px' }}
                >
                    <h2 className="mb-4" style={{ color: "#B2967D" }}>Edit Profile</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold" style={{ color: "#B2967D" }}>First Name</label>
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold" style={{ color: "#B2967D" }}>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold" style={{ color: "#B2967D" }}>Phone No</label>
                            <input type="tel" className="form-control" placeholder="Phone no" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold" style={{ color: "#B2967D" }}>Email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button 
                            className="btn px-4" 
                            style={{ backgroundColor: "#B2967D", color: "white" }}
                            onClick={() => setView('default')}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;