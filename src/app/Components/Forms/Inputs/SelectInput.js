import React from 'react'

export const SelectInput = ({data}) => {
    return (
        <select>
            {
                data.map((dataItem, i) => (
                    <option key={i} value={dataItem.id}>{dataItem.name}</option>
                ))
            }
        </select>
    )
}

export default SelectInput