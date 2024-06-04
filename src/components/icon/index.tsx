import I from 'react-native-vector-icons/FontAwesome6';
import { IconProps } from 'react-native-vector-icons/Icon';
import { SIZE } from '../../constants/size';

export default function Icon(props: IconProps) {
    return <I size={props.size || SIZE.DEFAULT} {...props} style={[
        {
            zIndex: 1
        },
        props.style
    ]}  />
}