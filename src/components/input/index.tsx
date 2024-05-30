import { View } from 'react-native';
import { Input as I, InputProps } from 'react-native-elements';
import { SIZE, TEXT } from '../../ styles';

export default function Input({ ...props }: InputProps) {
  return (
    <I style={[
      TEXT.default,
      props.style,
    ]} {...props} />
  );
}
