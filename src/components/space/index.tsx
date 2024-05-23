import {View} from 'react-native';

interface IProps {
  size: number;
}
export default function Space({size = 1}: IProps): React.JSX.Element {
  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
