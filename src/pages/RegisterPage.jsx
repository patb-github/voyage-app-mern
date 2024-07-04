import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        'http://localhost:3000/api/users/register',
        userData
      );

      if (response.status === 201) {
        setRegistrationSuccess(true);
        reset();
        navigate('/');
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      if (error.response) {
        setRegistrationError(
          error.response.data.message || 'Registration failed.'
        );
      } else {
        setRegistrationError('An error occurred during registration.');
      }
    }
  };

  const inputFields = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      validation: { required: 'First Name is required' },
    },
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name',
      validation: { required: 'Last Name is required' },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      },
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Password Confirmation',
      validation: {
        required: 'Confirm Password is required',
        validate: (value) =>
          value === getValues('password') || 'Passwords do not match',
      },
    },
  ];

  return (
    <div>
      <section className="Login">
        <div className="h-[370px] md:h-[93vh] bg-center bg-cover md:bg-no-repeat bg-[url('/bg-desktop.png')]">
          <div className="px-8 py-8 drop-shadow-xl md:hidden font-bold text-3xl text-white mb-8 ">
            <p>Enjoy the trip </p>
            <p>with Voyage</p>
          </div>
          <div className="min-h-[75vh] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white min-h-[500px] px-10 py-10 rounded-t-3xl md:rounded-3xl shadow-md w-full md:w-96">
              <div className="text-3xl font-bold text-blue-500 md:mb-8">
                <p className="drop-shadow-xl hidden md:block">
                  Enjoy the trip with Voyage
                </p>
              </div>
              <span className="text-3xl text-gray-800 font-bold">
                <p>New Account</p>
              </span>
              <form
                className="flex flex-col mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                {inputFields.map((field) => (
                  <div key={field.name}>
                    <span className="label-text">{field.placeholder}</span>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type={field.type}
                        className="grow"
                        placeholder={field.placeholder}
                        {...register(field.name, field.validation)}
                      />
                    </label>
                    {errors[field.name] && (
                      <p className="text-red-500">
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}

                {registrationSuccess && (
                  <p className="text-green-500">Registration successful!</p>
                )}
                {registrationError && (
                  <p className="text-red-500">{registrationError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-2 text-sm flex">
                <p>Already have an account? </p>
                <Link to="/login">
                  <p className="text-blue-500 hover:text-blue-700">Sign In</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
