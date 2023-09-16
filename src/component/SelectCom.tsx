import React, { useEffect, useState } from 'react';
import { Cascader } from 'antd';

export interface SelectItems {
    id: number;
    value: string | number;
    label: string;
    children?: SelectItems[];
}


interface SelectProps {
    title: string,
    options?: SelectItems[],
    style?: React.CSSProperties,
    updateCurType: (value: number) => void

}

const findId = (src: SelectItems[] | undefined, target: (string | number)[]): number => {
        src = src?.find((item) => item.label === target[0] as string)?.children;
    const item = src?.find((item) => item.value === target[1]);
    return item?.id ?? -1;
}

export default function SelectCom(props: SelectProps) {
    const getValue = (): (string | number)[] => {
        let items = props.options;
        let value: (string | number)[] = [];
        while (items !== undefined && items.length > 0) {
            value = [...value, items[0].value];
            items = items[0].children;
        }
        return value;
    }

    const [type, setType] = useState(getValue());

    useEffect(() => {
        const value = getValue();
        setType(value);
        const { updateCurType, options } = props;
        const id = findId(options, value);
        updateCurType(id);
    }, [props.options]);

    const onChange = (value: (string | number)[]) => {
        let items = props.options;
        setType(value);
        const id = findId(items, value);
        console.log(id);
        const { updateCurType } = props;
        updateCurType(id);
    };

    return (
        <div style={props.style}>
            {props.title}:  <Cascader options={props.options ?? []} onChange={onChange} placeholder="Please select" value={type} />
        </div>
    )
}
