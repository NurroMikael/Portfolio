import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    ac: {
        backgroundColor: '#fff',
    }
});

const CharAutoComplete = (props) => {
    const { onSelect, ajaxQuery, label } = props
    const classes = useStyles()
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(true)

    const fetch = (event) => {
        setOptions([])

        if (event?.target?.value?.length > 0) {
            setInfo(false)
            setLoading(true)
            ajaxQuery(event).then(res => {
                setOptions(res)
                setLoading(false)
            }).catch((e) => {
                setError(e)
            })

        }
    }

    return (<>
        <Autocomplete
            //sx={{ width: 300 }}
            fullWidth
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            options={options}
            loading={loading}
            autoHighlight={true}
            onInputChange={fetch}
            selectOnFocus={true}
            onChange={((e, newValue) => {
                if (newValue == "") {
                    onSelect(null)
                } else {
                    onSelect(newValue)

                }
            })}
            renderInput={(params) => (
                <TextField
                    className={classes.ac}
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
        {error != null && (<Alert severity="error" >Error on api</Alert>)}
        {info && (<Alert severity="info">Select station by typing stations name!</Alert>)}

    </>
    );
}
export default CharAutoComplete
