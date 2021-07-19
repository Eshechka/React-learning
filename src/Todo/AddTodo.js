import React, { useState } from 'react';
// import React, {useContext} from 'react';
import PropTypes from 'prop-types';
// import contextRemove from '../contextRemove.js';



function AddTodo({ onCreate }) {
    // const [value, setValue] = useState('');
    const inputData = useInputValue();

    function submitHandler(event) {
        event.preventDefault();

        if (inputData.value().trim()) {
            onCreate(inputData.value());
            inputData.clear();
        }
    }

    function useInputValue(defaultValue = '') {
        const [value, setValue] = useState(defaultValue);

        return {
            bind: {
                value: value,
                onChange: (event) => setValue(event.target.value),
            },
            clear: () => setValue(''),
            value: () => value,
        };
    }

    return (
        <form 
            style={{ marginBottom: '1rem' }}
            onSubmit={submitHandler}
        >
            <input {...inputData.bind}/>
            <button type="submit"
            >add todo</button>
        </form>
        )
    }

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
