import React from 'react';
import {observer} from 'mobx-react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useLocalObservable} from 'mobx-react-lite';
import css from './searchInput.module.scss';

// @ts-ignore
const SearchInput = observer(({onSearchInput}) => {
    const data = useLocalObservable(() => ({
        inputValue: "",
    }));

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        data.inputValue = value;
    };

    const handleSearch = (event: any) => {
        if (event.key === "Enter" && onSearchInput) {
            onSearchInput(data.inputValue);
        }
    };

    return (
        <div>
            <TextField
                value={data.inputValue}
                onChange={handleInputChange}
                onKeyDown={handleSearch}
                placeholder="搜尋..."
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    style: {
                        borderRadius: '50px', // This will make the text field oval-shaped
                    },
                }}
            />
        </div>
    );
});

export default SearchInput;
