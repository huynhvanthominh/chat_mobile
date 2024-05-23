import { View } from 'react-native';
import { Input as I, InputProps } from 'react-native-elements';

export default function Input({ ...props }: InputProps) {
  return (
      <I {...props} />
  );
}
