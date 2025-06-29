import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from '../../../src/redux/features/auth/authApi';
import { setUser, logout } from '../../../src/redux/features/auth/authSlice';
import avatarImg from "../../../src/assets/avatar.png";
import ProfileImageUpload from './ProfileImageUpload';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, isSuccess }] = useEditProfileMutation();

  // Indian states and union territories
  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    // Union Territories
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    phone: '',
    shippingAddress: {
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    userId: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [stateError, setStateError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        profileImage: user.profileImage || '',
        phone: user.phone || '',
        shippingAddress: {
          address: user.shippingAddress?.address || '',
          city: user.shippingAddress?.city || '',
          state: user.shippingAddress?.state || '',
          pincode: user.shippingAddress?.pincode || ''
        },
        userId: user._id || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation
    if (name === 'phone') {
      // Allow only numeric characters and limit to 10 digits
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue,
        });
        
        // Validate phone number
        if (numericValue.length === 0) {
          setPhoneError('');
        } else if (numericValue.length < 10) {
          setPhoneError('Phone number must be 10 digits');
        } else if (numericValue.length === 10) {
          // Check if it starts with valid digits (6-9)
          if (/^[6-9]\d{9}$/.test(numericValue)) {
            setPhoneError('');
          } else {
            setPhoneError('Phone number must start with 6, 7, 8, or 9');
          }
        }
      }
      return;
    }
    
    if (name.startsWith('shippingAddress.')) {
      const field = name.split('.')[1];
      
      // Pincode validation
      if (field === 'pincode') {
        // Allow only numeric characters and limit to 6 digits
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 6) {
          setFormData({
            ...formData,
            shippingAddress: {
              ...formData.shippingAddress,
              [field]: numericValue
            }
          });
          
          // Validate pincode
          if (numericValue.length === 0) {
            setPincodeError('');
          } else if (numericValue.length < 6) {
            setPincodeError('Pincode must be 6 digits');
          } else if (numericValue.length === 6) {
            // Check if it's a valid 6-digit number (Indian pincode format)
            if (/^\d{6}$/.test(numericValue) && !numericValue.startsWith('0')) {
              setPincodeError('');
            } else if (numericValue.startsWith('0')) {
              setPincodeError('Pincode cannot start with 0');
            } else {
              setPincodeError('Invalid pincode format');
            }
          }
        }
        return;
      }
      
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before submission
    if (formData.phone && formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      alert('Phone number must start with 6, 7, 8, or 9 and be 10 digits long');
      return;
    }

    // Validate pincode before submission
    if (formData.shippingAddress.pincode && formData.shippingAddress.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }
    
    if (formData.shippingAddress.pincode && (!/^\d{6}$/.test(formData.shippingAddress.pincode) || formData.shippingAddress.pincode.startsWith('0'))) {
      alert('Pincode must be 6 digits and cannot start with 0');
      return;
    }

    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      phone: formData.phone,
      shippingAddress: formData.shippingAddress,
      // Remove userId - it will be extracted from token on backend
    };

    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser({ user: response.user })); // Fix: wrap in user object
      localStorage.setItem('user', JSON.stringify(response.user));
      alert('Profile updated successfully!');
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      console.error('Failed to update profile:', err);
      
      // Handle specific error cases
      if (err.status === 400 && err.data?.message?.includes('Phone number')) {
        alert(err.data.message);
        setPhoneError(err.data.message);
      } else if (err.status === 400 && err.data?.message?.includes('Pincode')) {
        alert(err.data.message);
        setPincodeError(err.data.message);
      } else if (err.status === 400 && err.data?.message?.includes('state')) {
        alert(err.data.message);
        setStateError(err.data.message);
      } else if (err.status === 401) {
        alert('Session expired. Please log in again.');
        // Don't redirect here - let PrivateRoute handle it
        dispatch(logout()); // This will trigger redirect through PrivateRoute
      } else if (err.status === 404) {
        alert('User not found. Please try logging in again.');
        dispatch(logout());
      } else {
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600 font-body">Manage your account information and preferences</p>
      </div>

      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={formData.profileImage || avatarImg}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white/50 shadow-lg"
              />
              {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div> */}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-2">
              {formData.username || 'N/A'}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{user?.email || 'No email'}</p>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-body font-medium text-gray-700 w-24 mb-1 sm:mb-0">Phone:</span>
                <span className="font-body text-gray-600">
                  {formData.phone ? `+91 ${formData.phone}` : 'Not provided'}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setPhoneError(''); // Clear any phone errors when opening modal
              setPincodeError(''); // Clear any pincode errors when opening modal
              setStateError(''); // Clear any state errors when opening modal
            }}
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 hover:border-primary/50 px-6 py-2 rounded-xl font-body font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-heading font-bold text-gray-900">Shipping Address</h3>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        {formData.shippingAddress?.address || formData.shippingAddress?.city || formData.shippingAddress?.state || formData.shippingAddress?.pincode ? (
          <div className="space-y-2">
            {formData.shippingAddress?.address && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-body font-medium text-gray-700 w-24 mb-1 sm:mb-0">Address:</span>
                <span className="font-body text-gray-600">{formData.shippingAddress.address}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.shippingAddress?.city && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-body font-medium text-gray-700 mb-1 sm:mb-0">City:</span>
                  <span className="font-body text-gray-600 sm:ml-2">{formData.shippingAddress.city}</span>
                </div>
              )}
              {formData.shippingAddress?.state && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-body font-medium text-gray-700 mb-1 sm:mb-0">State:</span>
                  <span className="font-body text-gray-600 sm:ml-2">{formData.shippingAddress.state}</span>
                </div>
              )}
              {formData.shippingAddress?.pincode && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-body font-medium text-gray-700 mb-1 sm:mb-0">Pincode:</span>
                  <span className="font-body text-gray-600 sm:ml-2">{formData.shippingAddress.pincode}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-body text-gray-500">No shipping address added yet</p>
            <p className="font-body text-sm text-gray-400 mt-1">Add your address to make checkout faster</p>
          </div>
        )}
      </div>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-body font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl font-body text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                {/* Profile Image Upload Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-heading font-semibold text-gray-900 mb-6 text-center">Profile Photo</h4>
                  <div className="flex justify-center">
                    <ProfileImageUpload
                      currentImage={formData.profileImage}
                      onImageUpdate={(imageUrl) => setFormData(prev => ({ ...prev, profileImage: imageUrl }))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-body font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 border rounded-xl font-body text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        phoneError 
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                          : 'border-gray-200 focus:ring-primary/50 focus:border-primary'
                      }`}
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                      pattern="[6-9][0-9]{9}"
                    />
                    {formData.phone && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {phoneError ? (
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone) ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600 font-body">{phoneError}</p>
                  )}
                  {formData.phone && !phoneError && formData.phone.length === 10 && (
                    <p className="mt-1 text-sm text-green-600 font-body">✓ Valid phone number</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 font-body">
                    Enter a 10-digit Indian mobile number starting with 6, 7, 8, or 9
                  </p>
                </div>

                {/* Shipping Address Section */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-heading font-semibold text-gray-900 mb-4">Shipping Address</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="shippingAddress.address" className="block text-sm font-body font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <textarea
                        name="shippingAddress.address"
                        value={formData.shippingAddress.address}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl font-body text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                        placeholder="Enter your full address"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="shippingAddress.city" className="block text-sm font-body font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.city"
                          value={formData.shippingAddress.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl font-body text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label htmlFor="shippingAddress.state" className="block text-sm font-body font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <div className="relative">
                          <select
                            name="shippingAddress.state"
                            value={formData.shippingAddress.state}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/50 border rounded-xl font-body text-gray-900 focus:outline-none focus:ring-2 transition-all appearance-none pr-10 cursor-pointer hover:border-gray-300 ${
                              stateError 
                                ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                                : 'border-gray-200 focus:ring-primary/50 focus:border-primary'
                            }`}
                          >
                            <option value="" className="text-gray-500">-- Select Your State --</option>
                            <optgroup label="States">
                              {indianStates.filter(state => !['Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'].includes(state)).map((state) => (
                                <option key={state} value={state} className="text-gray-900">
                                  {state}
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Union Territories">
                              {['Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'].map((ut) => (
                                <option key={ut} value={ut} className="text-gray-900">
                                  {ut}
                                </option>
                              ))}
                            </optgroup>
                          </select>
                          {/* Custom dropdown arrow with validation icon */}
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            {stateError ? (
                              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : formData.shippingAddress.state && indianStates.includes(formData.shippingAddress.state) ? (
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : null}
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {stateError && (
                          <p className="mt-1 text-sm text-red-600 font-body">{stateError}</p>
                        )}
                        {formData.shippingAddress.state && !stateError && indianStates.includes(formData.shippingAddress.state) && (
                          <p className="mt-1 text-sm text-green-600 font-body">✓ Valid state selected</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 font-body">
                          Choose from 28 states and 8 union territories of India
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shippingAddress.pincode" className="block text-sm font-body font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="shippingAddress.pincode"
                          value={formData.shippingAddress.pincode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/50 border rounded-xl font-body text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            pincodeError 
                              ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                              : 'border-gray-200 focus:ring-primary/50 focus:border-primary'
                          }`}
                          placeholder="Enter 6-digit pincode"
                          maxLength="6"
                          pattern="\d{6}"
                        />
                        {formData.shippingAddress.pincode && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {pincodeError ? (
                              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : formData.shippingAddress.pincode.length === 6 && /^\d{6}$/.test(formData.shippingAddress.pincode) && !formData.shippingAddress.pincode.startsWith('0') ? (
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : null}
                          </div>
                        )}
                      </div>
                      {pincodeError && (
                        <p className="mt-1 text-sm text-red-600 font-body">{pincodeError}</p>
                      )}
                      {formData.shippingAddress.pincode && !pincodeError && formData.shippingAddress.pincode.length === 6 && !formData.shippingAddress.pincode.startsWith('0') && (
                        <p className="mt-1 text-sm text-green-600 font-body">✓ Valid pincode</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500 font-body">
                        Enter a 6-digit Indian postal pincode (cannot start with 0)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl font-body font-medium transition-all duration-300 ${
                      isLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                {isError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-body text-red-600">Failed to update profile. Please try again.</p>
                  </div>
                )}
                {isSuccess && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm font-body text-green-600">Profile updated successfully!</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
