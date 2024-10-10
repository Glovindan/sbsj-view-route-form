import React, { useState } from 'react';

interface RouteTableFieldBoolProps {
    /** Значение */
    value?: boolean;
    /** Обработчик изменения значения */
    onChangeValue: (ev: any) => void
}

/** Поле выбора булева значения */
export default function RouteTableFieldBool(props: RouteTableFieldBoolProps) {
    const { onChangeValue, value } = props;

    return (
        <select className='route-input-field' onChange={onChangeValue} value={value ? '1' : '0'}>
            <option value="1">Да</option>
            <option value="0">Нет</option>
        </select>
    )
}