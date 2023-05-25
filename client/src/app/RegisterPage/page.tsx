'use client'
import React, { ChangeEvent } from 'react';

import { IUser, createUser } from '@/api/apiAuth';
import { Button } from '@/components/Button';

type Props = {}

const Page = (props: Props) => {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [rePassword,setRePassword] = React.useState('');
    const [checkPassword, setCheckPassword] = React.useState('');
    const [checkRePassword, setCheckRePassword] = React.useState('');
    const [checkEmail,setCheckEmail] = React.useState('');

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleRePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
    }

    function isEmailValid(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    

    const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(email === '') {
            setCheckEmail('you must enter your email!!!');
        }
        else if(!isEmailValid(email)) {
            setCheckEmail('your email is invalid, please try again!!!');
        }
        else {
            setCheckEmail('');
        }

        if(password === '') {
            setCheckPassword('you must enter your password!!!');
        }
        else if(password.length < 6) {
            setCheckPassword('Your password must be 6 characters long')
        }
        else if (password.length > 19) {
            setCheckPassword('Your password cannot be longer than 20 characters');
        }
        else{
            setCheckPassword('');
        }
        if(rePassword !== password && rePassword !== ''){
            setCheckRePassword('you are not enter the same password');
        }
        else{
            setCheckRePassword('');
        }

        if(checkEmail === '' && checkPassword === '' && checkRePassword === ''){
            let data:IUser = {email, password};
            const response = await createUser(data);
            if(response.error !== '') setCheckEmail(response.error);
        }

        
    }

  return (
    <div className='form-register_container'>
        <form className='form_register'>
            <div className='form-header'>Register</div>
            <div className='form_section' >
                <label className="form-adding_label">Email</label>
                <input 
                className="form_input" 
                type='email'
                value={email}
                onChange={(e) => handleEmail(e)}
                ></input>
                <div className='invalid-message'>
                    {(checkEmail !== '') && <div>
                        {checkEmail}
                    </div>}
                </div>
            </div>
            <div className='form_section'>
                <label className="form-adding_label">Password</label>
                <input
                type='password'
                className="form_input"
                value={password}
                onChange={(e) => handlePassword(e)}
                ></input>
                <div className='invalid-message'>
                    {(checkPassword !== '') && <div>
                        {checkPassword}
                    </div>}
                </div>
            </div>
            <div className='form_section'>
                <label className="form-adding_label">Enter Password again</label>
                <input 
                className="form_input" 
                type='password'
                value={rePassword}
                onChange={(e) => handleRePassword(e)}
                ></input>
                <div className='invalid-message'>
                    {(checkRePassword !== '') && <div>
                        {checkRePassword}
                    </div>}
                </div>
            </div>
            <Button
            primary 
            medium
            onClick={(e) => handleClick(e)}
            >Register</Button>
        </form>
    </div>
  )
};

export default Page;