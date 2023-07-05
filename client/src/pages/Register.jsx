import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  isValidName,
  validatePassword,
  isValidEmail,
} from '../validations';
import { postForm } from '../axios/apiCalls';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!formData.email || !formData.name || !formData.password) {
        toast.error('Please fill in the credentials');
      } else {
        if (!isValidName(formData.name)) {
          toast.warn('Enter a valid name');
        }
        if(!isValidEmail(formData.email)){
            toast.warn("Enter valid email")
        }
        if (validatePassword(formData.password)) {
          toast.warn(validatePassword(formData.password));
        }else if(formData.password!==formData.confirmpassword){
          toast.error('password mismatch')
        }
        if (
          isValidName(formData.name) &&
          !validatePassword(formData.password) &&
          formData.password===formData.confirmpassword &&
          isValidEmail(formData.email)
        ) {
          delete formData.confirmpassword
          const { email } = formData
          const existUser = await postForm('/existUser',{email})
          console.log(existUser);
          if (existUser.data.success) {
            postForm('/register',formData).then(()=>{
              navigate('/login')
            })
          } else {
            toast.error('The email is already registered')
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center text-2xl font-semibold text-gray-00 dark:text-white"
          >
            {/* <img
              className="w-auto h-24 mr-2"
              src={imageUrl}
              alt="logo"
            /> */}
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-4">
              <h3 className='text-white text-2xl font-semibold text-center'>Register</h3>
              <form className="space-y-4 md:space-y-" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: Joe Doe"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="phone"
                >
                  Email
                </label>
                <input
                    type="name"
                    name="email"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: joedoe@gmail.com"
                    required=""
                    onChange={handleChange}
                  />
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                   Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-start">
                  <div id="recaptcha-container"> </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
