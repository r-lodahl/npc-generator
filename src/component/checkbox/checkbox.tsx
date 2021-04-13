import React from 'react';
import { Field } from 'formik'

interface CheckboxProps {
    name: string;
    description: string;
}

export const CheckboxComponent = (props: CheckboxProps) => (
    <label>
        <Field type="checkbox" name={props.name} />
        {props.description}
    </label>
);
