import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [{name, email}, setLoggedInUser] = useContext(UserContext);
    // const {name, email} = loggedInUser;

    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">This field is required</span>}

            <input name="email" defaultValue={email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">This field is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Adress" />
            {errors.address && <span className="error">This field is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
            {errors.phone && <span className="error">This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;