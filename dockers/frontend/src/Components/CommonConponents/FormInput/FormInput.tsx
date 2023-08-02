import { Button, Fade, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

interface FormInputProps extends TextInputProps {
    isPassword: boolean
}

const FormInput = (props: FormInputProps) => {

    return (
        <div style={{ width: '100%' }}>
            {props.isPassword ?
                <PwdInput handleChangeFunction={props.handleChangeFunction} title={props.title} /> :
                <TextInput handleChangeFunction={props.handleChangeFunction} title={props.title} />}
        </div>
    )
}

export default FormInput

interface TextInputProps {
    fullwidth?: boolean
    formSize?: 'small' | 'medium'
    idName?: string
    title: string
    handleChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
    formStyle?: React.CSSProperties
}

const TextInput = (props: TextInputProps) => {

    return (
        <TextField
            sx={{ width: '100%' }}
            fullWidth={props.fullwidth}
            size={props.formSize}
            style={props.formStyle ? props.formStyle : textStyle}
            id={props.idName}
            type='text'
            onChange={props.handleChangeFunction}
            label={props.title}
        />
    )
}

const PwdInput = (props: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <TextField
                sx={{ width: '100%' }}
                size={props.formSize}
                style={props.formStyle ? props.formStyle : textStyle}
                // id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                label={props.title}
                onChange={props.handleChangeFunction}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}

const textStyle = {
    backgroundColor: 'white',
    borderRadius: '6px',
}